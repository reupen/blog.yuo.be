import ky from "ky"

export async function getCommentCounts(
  host: string,
  paths: string[],
  origin?: string,
) {
  const response = await ky.post<{
    commentCounts?: Record<string, number>
  }>("https://comments.yuo.be/api/embed/comments/counts", {
    headers: origin ? { origin } : undefined,
    json: {
      host,
      paths,
    },
  })

  const { commentCounts } = await response.json()
  return commentCounts
}
