import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://<user>.github.io/itqan/ — base must match the repo name.
export default defineConfig({
  base: "/itqan/",
  plugins: [react()],
});
