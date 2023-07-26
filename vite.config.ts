import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "next/image": path.resolve(__dirname, "./.ladle/unoptimized-image.tsx"),
      "next/link": path.resolve(__dirname, "./.ladle/unoptimized-link.tsx"),
    },
  },
})
