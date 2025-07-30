# 💻 CodeVista

**CodeVista** is a modern coding interview platform built with a powerful tech stack and real-time collaboration features to simulate a real-world interview experience.

🌐 [Live Demo](https://code-vista-three.vercel.app)

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Backend as a Service**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Video & Screen Sharing**: [Stream](https://getstream.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.dev/)

---

## ✨ Features

- 🎥 **Video Calls** – Real-time face-to-face interaction  
- 🖥️ **Screen Sharing** – Share your screen with interviewers  
- 🎬 **Screen Recording** – Record interview sessions for review  
- 🔒 **Authentication & Authorization** – Secure login via Clerk  
- 🧑‍💻 **Collaborative Coding** – Work together in real-time  
- 🧩 **Clean UI** – Built with Tailwind CSS and shadcn components  

---

## 📂 Project Structure

```

.
├── convex/                 # Convex backend functions
├── public/                 # Static assets
├── src/                    # App source code
│   ├── components/         # Reusable components
│   ├── pages/              # Next.js pages
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utility functions
│   └── styles/             # Global styles (if any)
├── components.json
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
├── requirements.txt       
└── .gitignore

````

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/diya-e-g/CodeVista.git
cd CodeVista
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CONVEX_DEPLOYMENT=your_convex_deployment_id
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
```

> Ensure you have set up accounts for [Clerk](https://clerk.dev), [Convex](https://www.convex.dev), and [Stream](https://getstream.io/).

### 4. Run the Development Server

```bash
npm run dev
```

---

## 🚀 Deployment

This project is already deployed on **Vercel**:
🔗 [https://code-vista-three.vercel.app](https://code-vista-three.vercel.app)

To deploy your own version:

1. Push your repo to GitHub
2. Connect the repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel settings

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin my-feature`
5. Open a Pull Request
