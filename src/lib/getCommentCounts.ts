import ky from "ky"

export async function getCommentCounts(host: string, paths: string[]) {
  const response = await ky.post<{
    commentCounts?: Record<string, number>
  }>("https://comments.yuo.be/api/embed/comments/counts", {
    json: {
      host,
      paths,
    },
  })

  const { commentCounts } = await response.json()
  return commentCounts
}
