import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react()
  ],
  css: {
    modules: {
      // You can define how class names get converted (optional)
      localsConvention: "camelCaseOnly",
    },
  },
});
