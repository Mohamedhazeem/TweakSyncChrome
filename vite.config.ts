import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Inspect from "vite-plugin-inspect";
import path, { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    ...(process.env.NODE_ENV === "development"
      ? [
          Inspect({
            build: true,
            outputDir: ".vite-inspect",
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // sourcemap: true,
    // chunkSizeWarningLimit: 1024,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        content: resolve(__dirname, "src/extension/content.ts"),
        serviceworker: resolve(__dirname, "src/extension/serviceWorker.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === "serviceworker" || chunk.name === "content"
            ? "scripts/[name].js" // Output filename for service worker
            : "[name].[hash].js"; // Output filename for other chunks
        },
      },
    },
  },
});
