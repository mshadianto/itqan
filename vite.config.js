import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from the custom domain root (https://itqan.mshadianto.id/),
// so assets must resolve from "/" — not "/itqan/" (that was for github.io/itqan).
export default defineConfig({
  base: "/",
  plugins: [react()],
});
