import { satteri } from "@astrojs/markdown-satteri"
import mdx from "@astrojs/mdx"
import preact from "@astrojs/preact"
import sitemap from "@astrojs/sitemap"
import umami from "@yeskunall/astro-umami"
import compress from "astro-compress"
import { defineConfig } from "astro/config"

import { hastExternalLinksPlugin, shikiConfig } from "@/lib"

export default defineConfig({
  site:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4321"
      : "https://blog.yuo.be",
  image: {
    service: {
      entrypoint: "./src/lib/imageService",
    },
  },
  integrations: [
    sitemap(),
    compress({
      CSS: false,
      HTML: false,
      Image: false,
      JavaScript: false,
      SVG: true,
    }),
    preact({ compat: true }),
    mdx(),
    ...(process.env.UMAMI_ID ? [umami({ id: process.env.UMAMI_ID })] : []),
  ],
  markdown: {
    processor: satteri({
      hastPlugins: [hastExternalLinksPlugin],
    }),
    shikiConfig,
  },
  trailingSlash: "always",
  vite: {
    assetsInclude: ["**/*.7z"],
    resolve: {
      tsconfigPaths: true,
    },
  },
})
