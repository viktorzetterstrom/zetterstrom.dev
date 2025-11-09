import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3004,
    allowedHosts: ["local.wdng.zetterstrom.dev", "localhost"],
  },
  optimizeDeps: {
    include: ["@ai-sdk/react"],
  },
  resolve: {
    conditions: ["module", "browser", "development|production"],
  },
})
