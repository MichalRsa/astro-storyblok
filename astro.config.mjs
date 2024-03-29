import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import storyblok from "@storyblok/astro";
import basicSsl from "@vitejs/plugin-basic-ssl";
import netlify from "@astrojs/netlify";

import isPreview from "./src/utils/isPreview";
import { loadEnv } from "vite";
const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: isPreview(),
      components: {
        page: "storyblok/Page",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        hero: "storyblok/Hero",
        teaser: "storyblok/Teaser",
        "popular-articles": "storyblok/PopularArticles",
        "all-articles": "storyblok/AllArticles",
        article: "storyblok/Article",
      },
    }),
    tailwind(),
    sitemap(),
  ],
  output: isPreview() ? "server" : "static",
  ...(env.STORYBLOK_ENV === "development" && {
    vite: {
      plugins: [basicSsl()],
      server: {
        https: true,
      },
    },
  }),
  adapter: netlify(),
});
