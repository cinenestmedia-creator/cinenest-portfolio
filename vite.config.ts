import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/cinenest-portfolio/",
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
