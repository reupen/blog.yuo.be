import { tz } from "@date-fns/tz"
import { getCollection } from "astro:content"
import { compareDesc, isSameMonth } from "date-fns"

export async function getPosts() {
  const sortedPosts = (await getCollection("posts"))
    .filter((post) => !post.data.isDraft)
    .sort((left, right) => compareDesc(left.data.date, right.data.date))

  return sortedPosts.map((post, index) => ({
    ...post,
    isNewMonth:
      index === 0 ||
      !isSameMonth(sortedPosts[index - 1].data.date, post.data.date, {
        in: tz("Europe/London"),
      }),
  }))
}
