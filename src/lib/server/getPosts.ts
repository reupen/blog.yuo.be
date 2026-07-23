import { tz } from "@date-fns/tz"
import { getCollection } from "astro:content"
import { compareDesc, isSameMonth, isSameYear } from "date-fns"

type BasePost = Awaited<ReturnType<typeof getCollection<"posts">>>[0]

type FeaturedPost = BasePost & {
  data: BasePost["data"] & { featuredPostIndex: number }
}

const hasFeaturedPostsIndex = (post: BasePost): post is FeaturedPost =>
  post.data.featuredPostIndex !== undefined

export async function getFeaturedPosts() {
  return (await getCollection("posts", hasFeaturedPostsIndex)).sort(
    (left, right) => left.data.featuredPostIndex - right.data.featuredPostIndex,
  )
}

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
