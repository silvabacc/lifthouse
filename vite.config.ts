import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@backend": "/backend/",
      "@frontend": "/frontend/src/",
    },
  },
  plugins: [
    VitePWA({
      manifest: {
        icons: [
          {
            src: "/icons/512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
      },
    }),
    react(),
  ],
});
