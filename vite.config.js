import { defineConfig } from "vite";

export default defineConfig({
  base: "/Audi-Elite/",
  server: {
    host: true,
  },
  build: {
    outDir: "dist",
  },
});
