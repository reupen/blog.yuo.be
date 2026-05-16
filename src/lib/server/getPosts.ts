import { tz } from "@date-fns/tz"
import { getCollection } from "astro:content"
import { compareDesc, isSameMonth, isSameYear } from "date-fns"

export async function getPosts(tag?: string) {
  const sortedPosts = (await getCollection("posts"))
    .filter(
      (post) => !post.data.isDraft && (!tag || post.data.tags.includes(tag)),
    )
    .sort((left, right) => compareDesc(left.data.date, right.data.date))

  return sortedPosts.map((post, index) => ({
    ...post,
    isNewMonth:
      index === 0 ||
      !isSameMonth(sortedPosts[index - 1].data.date, post.data.date, {
        in: tz("Europe/London"),
      }),
    isNewYear:
      index === 0 ||
      !isSameYear(sortedPosts[index - 1].data.date, post.data.date, {
        in: tz("Europe/London"),
      }),
  }))
}

export type Post = Awaited<ReturnType<typeof getPosts>>[0]
