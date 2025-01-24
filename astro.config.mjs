import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import { defineConfig } from "astro/config"
import rehypeExternalLinks from "rehype-external-links"

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
    mdx(),
    react(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["noreferrer"],
        },
      ],
    ],
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
