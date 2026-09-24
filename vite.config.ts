import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
     base: "/",

  tanstackStart: {
    server: { entry: "server" },

    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      failOnError: true,
    },
  },

  vite: {
  base: "/cinenest-portfolio/",

  plugins: [
    nitro({
      preset: "node-server",
    }),
  ],
},
});
