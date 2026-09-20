import { defineHastPlugin } from "satteri"

export const hastExternalLinksPlugin = defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = node.properties.href
      if (
        typeof href === "string" &&
        href.match(/^https?:\/\/(?!(blog.)?yuo.be\/)/gi)
      ) {
        ctx.setProperty(node, "rel", "noreferrer")
      }
    },
  },
})
