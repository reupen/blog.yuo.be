import rss from "@astrojs/rss"
import type { APIContext } from "astro"

import { getPosts } from "@/lib/server"

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error(`${context.site} is falsey`)
  }

  return rss({
    title: "Reupen’s blog",
    description: "A personal blog",
    site: context.site,
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/${post.data.slugPrefix}/${post.id}`,
    })),
    customData: `<language>en-gb</language>`,
  })
}
