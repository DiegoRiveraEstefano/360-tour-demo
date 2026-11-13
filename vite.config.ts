import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: "esnext",
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          viewer: ["@photo-sphere-viewer/core", "@photo-sphere-viewer/autorotate-plugin"],
          preact: ["preact", "preact/hooks"],
        },
      },
    },
  },
});
