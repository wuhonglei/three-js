import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    port: 5174,
    strictPort: false,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
