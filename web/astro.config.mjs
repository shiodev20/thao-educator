import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { languages, defaultLanguage } from "../shared/languages.ts";

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    // sitemap-index.xml (+ hreflang links between languages). Needs SITE_URL; without it the build skips it.
    sitemap({
      filter: (page) => !/\/(404|seed-images)(\/|$)/.test(new URL(page).pathname),
      i18n: { defaultLocale: defaultLanguage, locales: Object.fromEntries(languages.map((l) => [l.id, l.id])) },
    }),
  ],
  vite: { server: { fs: { allow: [".."] } } },
});
