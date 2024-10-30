import { CommentCount, DiscussionEmbed } from "disqus-react"
import { useState } from "react"

interface CommentsProps {
  id: string
  title: string
  url: URL
}

export function Comments({ id, title, url }: CommentsProps) {
  const [hasComments, setHasComments] = useState<boolean>(false)

  const config = {
    identifier: id,
    title: title,
    url: url.toString(),
  }

  return (
    <>
      {!hasComments && (
        <div
          className="comments-link"
          onClick={() => {
            setHasComments(true)
          }}
        >
          <CommentCount config={config} shortname="reupen">
            Post a comment
          </CommentCount>
        </div>
      )}
      {hasComments && <DiscussionEmbed config={config} shortname="reupen" />}
    </>
  )
}
