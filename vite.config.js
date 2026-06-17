import { defineConfig } from "vite";

export default defineConfig({
  base: "/audi-elite/",
  server: {
    host: true,
  },
  build: {
    outDir: "dist",
  },
});
