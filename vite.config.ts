import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        content: resolve(__dirname, "src/scripts/content.ts"),
        serviceworker: resolve(__dirname, "src/scripts/serviceworker.ts"),
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
