import mdxRenderer from "@astrojs/mdx/server.js"
import reactRenderer from "@astrojs/react/server.js"
import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { experimental_AstroContainer } from "astro/container"
import { render } from "astro:content"
import { format } from "date-fns"
import { transform, walk } from "ultrahtml"
import sanitize from "ultrahtml/transformers/sanitize"

import { getPosts } from "@/lib/server"

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error(`${context.site} is falsey`)
  }

  const container = await experimental_AstroContainer.create()
  container.addServerRenderer({ renderer: mdxRenderer, name: "MDX" })
  container.addServerRenderer({ renderer: reactRenderer, name: "react" })

  return rss({
    xmlns: { "yuo-be": "http://blog.yuo.be/rss/2026" },
    title: "Reupen’s blog",
    description:
      "A blog about computing, tech, programming, photography and more.",
    site: context.site,
    stylesheet: "/rss.xsl",
    customData: `<language>en-gb</language>
<yuo-be:canonicalUrl>${encodeURI(new URL("/rss.xml", context.site).toString())}</yuo-be:canonicalUrl>`,
    items: await Promise.all(
      (await getPosts()).slice(0, 50).map((post) =>
        (async () => ({
          title: post.data.title,
          pubDate: post.data.date,
          description: post.data.excerpt,
          link: `/${post.id}`,
          customData: `<yuo-be:pubDateIso>${post.data.date.toISOString()}</yuo-be:pubDateIso>
<yuo-be:pubDateFormatted>${format(post.data.date, "d MMMM yyyy")}</yuo-be:pubDateFormatted>`,
          content: await transform(
            await container.renderToString((await render(post)).Content),
            [
              async (node) => {
                await walk(node, (node) => {
                  if (node.attributes?.href)
                    node.attributes.href = node.attributes.href.replaceAll(
                      /^\//g,
                      context.site,
                    )

                  if (node.attributes?.src)
                    node.attributes.src = node.attributes.src.replaceAll(
                      /^\//g,
                      context.site,
                    )

                  if (node.attributes?.srcset)
                    node.attributes.srcset = node.attributes.srcset.replaceAll(
                      /(^|, )\//g,
                      context.site,
                    )
                })
                return node
              },
              sanitize({ dropElements: ["script", "style"] }),
            ],
          ),
        }))(),
      ),
    ),
  })
}
