import { tz } from "@date-fns/tz"
import { z, defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { format } from "date-fns"

const posts = defineCollection({
  loader: glob({
    base: "./src/posts",
    pattern: "**/*.md{x,}",
  }),
  schema: z
    .object({
      comment_id: z.string().optional(),
      date: z.date(),
      is_draft: z.boolean().default(false),
      is_wide: z.boolean().default(false),
      excerpt: z.string(),
      is_auto_excerpt: z.boolean().optional(),
      is_imported: z.boolean().optional(),
      title: z.string(),
    })
    .transform(
      ({
        comment_id: commentId,
        excerpt,
        is_auto_excerpt,
        is_draft: isDraft,
        is_imported: isImported,
        is_wide: isWide,
        ...data
      }) => ({
        ...data,
        commentId,
        isDraft,
        isWide,
        excerpt:
          is_auto_excerpt && excerpt.length > 220
            ? excerpt.substring(0, excerpt.lastIndexOf(" ", 160)) + "…"
            : excerpt,
        slugPrefix: format(data.date, "yyyy/MM/dd", {
          in: isImported ? tz("UTC") : tz("Europe/London"),
        }),
      }),
    ),
})

export const collections = { posts }
