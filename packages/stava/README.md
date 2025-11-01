# Stava - Letter Practice App

A simple, colorful letter practice application for young children (3-4 years old) built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Bright, colorful interface designed for young children
- 🔤 Interactive letter grid (A-Z)
- 👆 Large, easy-to-click buttons
- 📱 Responsive design
- ⚡ Fast hot-reload development with Vite

## Local Development

### Using Skaffold (Recommended)

From the root of the monorepo:

```bash
skaffold dev
```

This will:
- Build the Docker container
- Deploy to local Kubernetes
- Enable hot-reloading for all file changes
- Make the app available at: http://localhost:3003
- Or via ingress: https://local.stava.zetterstrom.dev

### Direct Development (Without Docker)

```bash
cd packages/stava
pnpm dev
```

Visit http://localhost:5000

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 6** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS
- **pnpm** - Fast, efficient package manager

## Project Structure

```
stava/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML entry point
├── Dockerfile.dev       # Development Docker configuration
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts

```

## Future Ideas

- Sound effects when clicking letters
- Letter tracing activity
- Simple word building exercises
- Animations and celebrations
- Multiple language support
- Progress tracking

## Building for Production

```bash
pnpm build
```

The production build will be in the `dist/` directory.

---

Built with ❤️ for learning
