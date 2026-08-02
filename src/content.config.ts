import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"
import { format, parseISO } from "date-fns"

import { londonTz, utcTz } from "@/lib"

const posts = defineCollection({
  loader: glob({
    base: "./src/posts",
    pattern: "**/*.md{x,}",
    generateId: ({ data: { date, is_imported: isImported, slug }, entry }) => {
      if (typeof date !== "string") throw new Error("date must be a string")

      const prefix = format(parseISO(date, { in: londonTz }), "yyyy/MM/dd", {
        in: isImported ? utcTz : londonTz,
      })

      const computedSlug =
        slug || entry.replace(/\/index.mdx?$/, "").replace(/^.*\//, "")

      return `${prefix}/${computedSlug}`
    },
  }),
  schema: ({ image }) =>
    z
      .object({
        comment_id: z.string().optional(),
        date: z.iso
          .date()
          .or(z.iso.datetime())
          .transform((date) => parseISO(date, { in: londonTz })),
        published_at: z.coerce.date().optional(),
        description: z.string().optional(),
        excerpt: z.string(),
        featured_post_index: z.number().optional(),
        image: z
          .object({
            src: image(),
            alt: z.string(),
          })
          .optional(),
        is_auto_excerpt: z.boolean().optional(),
        is_draft: z.boolean().default(false),
        is_imported: z.boolean().optional(),
        original_id: z.string().optional(),
        tags: z.array(z.string()).optional().default([]),
        title: z.string(),
        width: z.enum(["wide-1", "wide-2", "wide-3", "wide-4"]).optional(),
      })
      .transform(
        ({
          comment_id: commentId,
          excerpt,
          featured_post_index: featuredPostIndex,
          is_auto_excerpt: isAutoExcerpt,
          is_draft: isDraft,
          is_imported: _,
          published_at: publishedAt,
          original_id: originalId,
          ...data
        }) => ({
          ...data,
          commentId,
          featuredPostIndex,
          isAutoExcerpt,
          isDraft,
          publishedAt,
          originalId,
          excerpt:
            isAutoExcerpt && excerpt.length > 220
              ? excerpt.substring(0, excerpt.lastIndexOf(" ", 160)) + "…"
              : excerpt,
        }),
      ),
})

export const collections = { posts }
