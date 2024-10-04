import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@user": "/src/user",
      "@core": "/src/core",
      "@context": "/src/context",
      "@pages": "/src/pages",
      // Add other aliases as needed
    },
  },
});
