import path from "path"
import { defineConfig } from "vite"

const UNOPTIMIZED_IMAGE_PATH = "./.ladle/unoptimized-image.tsx"
const UNOPTIMIZED_LINK_PATH = "./.ladle/unoptimized-link.tsx"

export default defineConfig({
  resolve: {
    alias: {
      "next/image": path.resolve(__dirname, UNOPTIMIZED_IMAGE_PATH),
      "next/link": path.resolve(__dirname, UNOPTIMIZED_LINK_PATH),
    },
  },
})
