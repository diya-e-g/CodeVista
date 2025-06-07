// Importing Convex’s value validators to define and validate argument types
import { v } from "convex/values";

// Importing Convex's mutation and query helpers to define database functions
import { mutation, query } from "./_generated/server";

/**
 * ✅ syncUser: Mutation to add a new user to the "users" table
 *
 * ❓ What is a mutation?
 * A mutation is a server-side function in Convex used to **write** or **update** data in the database.
 */
export const syncUser = mutation({
  // Define and validate the arguments passed to this mutation
  args: {
    name: v.string(),         // Required string for user's name
    email: v.string(),        // Required string for user's email
    clerkId: v.string(),      // Required string for user's Clerk ID
    image: v.optional(v.string()), // Optional profile image URL (can be undefined or null)
  },

  // Handler contains the logic to insert user only if they don't already exist
  handler: async (ctx, args) => {
    // Check if user already exists using their Clerk ID
    const existingUser = await ctx.db
      .query("users") // Query the "users" table
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId)) // Find where clerkId matches
      .first(); // Return the first match or null if none

    if (existingUser) return; // If user already exists, skip insertion

    // Insert a new user record with default role "candidate"
    return await ctx.db.insert("users", {
      ...args,            // Spread name, email, clerkId, image
      role: "candidate",  // Default role assigned to all new users
    });
  },
});

/**
 * ✅ getUsers: Query to return all users in the "users" table
 *
 * ❓ What is a query?
 * A query is a read-only server-side function used to **fetch** data from the database.
 */
export const getUsers = query({
  handler: async (ctx) => {
    // Get identity of the current authenticated user
    const identity = await ctx.auth.getUserIdentity();

    // If user is not logged in, throw an error
    if (!identity) throw new Error("User is not authenticated");

    // Fetch and return all users from the "users" table
    const users = await ctx.db.query("users").collect();

    return users;
  },
});

/**
 * ✅ getUserByClerkId: Query to fetch a user by their Clerk ID
 *
 * Used when we need to fetch a specific user for login/profile sync.
 */
export const getUserByClerkId = query({
  // Define and validate the input argument
  args: { clerkId: v.string() }, // Required Clerk ID of user to fetch

  handler: async (ctx, args) => {
    // Search users table using an index on `clerkId`
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId)) // Uses indexed query
      .first(); // Return the first match (should be unique)

    return user;
  },
});
