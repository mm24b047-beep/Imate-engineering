import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// SINGLEFILE=1 builds one self-contained index.html (used for previews); default is the normal optimised multi-chunk build.
const single = process.env.SINGLEFILE === "1";

export default defineConfig({
  plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
  build: single
    ? { target: "es2020" }
    : {
        target: "es2020",
        cssCodeSplit: true,
        rollupOptions: { output: { manualChunks: { vendor: ["react", "react-dom", "react-router-dom"] } } },
      },
});
