import { getCollection } from "astro:content"

export async function getTags(): Promise<Set<string>> {
  const posts = await getCollection("posts")

  return new Set(
    (function* () {
      for (const post of posts) {
        yield* post.data.tags
      }
    })(),
  )
}
