import { useState } from "react"
import useSWR from "swr"

import { getCommentCounts } from "@/lib/getCommentCounts.ts"

interface Props {
  initialCommentCounts: Record<string, number> | undefined
  pathname: string
}

export function Comments({ initialCommentCounts, pathname }: Props) {
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false)
  const { data } = useSWR(
    `comment-counts-${pathname}`,
    async () => getCommentCounts(window.location.host, [pathname]),
    { fallbackData: initialCommentCounts },
  )
  const commentCount = data?.[pathname]
  const commentsLoaded = Boolean(data)

  return (
    <>
      {!isCommentsVisible && (
        <div
          className="comments-link"
          onClick={() => {
            setIsCommentsVisible(true)
          }}
        >
          {!commentsLoaded && <>Show comments</>}
          {commentsLoaded && !commentCount && <>Post a comment</>}
          {commentCount && (
            <>
              Show {commentCount} comment{commentCount !== 1 && "s"}
            </>
          )}
        </div>
      )}
      {isCommentsVisible && (
        <>
          <h2>Comments</h2>
          <comentario-comments
            page-id={pathname}
            theme="custom"
            no-fonts
          ></comentario-comments>
        </>
      )}
    </>
  )
}
