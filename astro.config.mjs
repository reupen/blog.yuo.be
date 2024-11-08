import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://blog.yuo.be",
  integrations: [
    sitemap(),
    compress({
      CSS: false,
      HTML: false,
      Image: false,
      JavaScript: false,
      SVG: true,
    }),
    mdx(),
    react(),
  ],
  markdown: {
    shikiConfig: {
      defaultColor: false,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  trailingSlash: "always",
  vite: {
    assetsInclude: ["**/*.7z"],
  },
})
