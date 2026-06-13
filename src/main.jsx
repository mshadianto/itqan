import React from "react";
import { createRoot } from "react-dom/client";
import App from "../Itqan_Prep.jsx";

/* The component was authored for the Claude Artifacts runtime, which injects an
   async `window.storage` KV store. Outside that sandbox (e.g. GitHub Pages) we
   back it with localStorage so progress/streaks/SRS still persist. */
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    get: async (key) => {
      const v = localStorage.getItem(key);
      return v == null ? null : { value: v };
    },
    set: async (key, value) => {
      localStorage.setItem(key, value);
    },
    delete: async (key) => {
      localStorage.removeItem(key);
    },
  };
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
