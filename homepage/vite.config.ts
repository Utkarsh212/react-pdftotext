import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/react-pdftotext/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Proxy configuration Example (If CORS issues force a proxy approach in Dev)
  // server: {
  //   proxy: {
  //     '/api/npm': {
  //       target: 'https://api.npmjs.org',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/npm/, '')
  //     }
  //   }
  // }
});
