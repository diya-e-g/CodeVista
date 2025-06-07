// Import the HTTP router from Convex to define API routes
import { httpRouter } from "convex/server";

// Import `httpAction` to define async handlers for HTTP endpoints
import { httpAction } from "./_generated/server";

// Import the WebhookEvent type to define structure for Clerk events
import { WebhookEvent } from "@clerk/nextjs/server";

// Import Webhook from Svix to verify the integrity of incoming webhooks
import { Webhook } from "svix";

// Auto-generated API reference to call backend Convex functions (e.g., mutations)
import { api } from "./_generated/api";

// Create a new instance of the Convex HTTP router
const http = httpRouter();

// Define a new HTTP route for receiving Clerk webhooks
http.route({
  path: "/clerk-webhook",  // URL path that Clerk will send webhook events to
  method: "POST",          // Webhooks use POST method to send data securely

  // `httpAction` allows defining server-side logic for this HTTP request
  handler: httpAction(async (ctx, request) => {
    // Get the secret used to verify the webhook (stored securely in environment)
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    // If the secret is not set, stop execution with an error
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    // Extract the special headers sent by Clerk/Svix for security verification
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    /**
     * ❓ What is Svix?
     * Clerk uses a service called Svix to send webhooks securely.
     * Svix ensures that the data being sent hasn't been modified (like HMAC).
     * These 3 headers are used to verify the authenticity of the webhook.
     */

    // If any of the headers are missing, reject the request
    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("No svix headers found", {
        status: 400, // 🔁 400 Bad Request: Something is wrong with the client's request
      });
    }

    // Parse the incoming request body (the webhook payload)
    const payload = await request.json();
    const body = JSON.stringify(payload); // Convert back to string for signature verification

    // Create a Svix Webhook instance with our secret
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;

    try {
      // Verify the webhook using Svix's verify method
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      // ❌ If verification fails, it may be a malicious or invalid request
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    // 📌 Extract the event type (e.g., "user.created", "user.deleted", etc.)
    const eventType = evt.type;

    // ✅ We only handle the `user.created` event here
    if (eventType === "user.created") {
      // Destructure the relevant user info from the event payload
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses[0].email_address; // Get primary email
      const name = `${first_name || ""} ${last_name || ""}`.trim(); // Combine first and last name

      try {
        /**
         * ❓ What is a mutation in Convex?
         * A mutation is a server-side function used to write or update data in the database.
         * In this case, we're calling the `syncUser` mutation to store user data from Clerk.
         */
        await ctx.runMutation(api.users.syncUser, {
          clerkId: id,     // Clerk's unique user ID
          email,           // User email
          name,            // Full name
          image: image_url // Profile image URL
        });
      } catch (error) {
        // If there's an issue with storing the user, return an error response
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 }); 
        /**
         * 🔁 500 Internal Server Error: Something went wrong on the server side
         */
      }
    }

    // 🎉 Return success response if webhook is handled correctly
    return new Response("Webhook processed successfully", { status: 200 });
    /**
     * 🔁 200 OK: Everything worked as expected
     */
  }),
});

// Export the HTTP router so Convex can use this file to handle requests
export default http;
