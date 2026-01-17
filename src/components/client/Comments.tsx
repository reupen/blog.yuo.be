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
  const commentCount = data?.[pathname] ?? 0
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
          <i aria-hidden="true" className="fa-solid fa-comment"></i>&#x2004;
          {!commentsLoaded && <>Show comments</>}
          {commentsLoaded && commentCount === 0 && <>Post a comment</>}
          {commentCount > 0 && (
            <>
              Show {commentCount} comment{commentCount !== 1 && "s"}
            </>
          )}
        </div>
      )}
      {isCommentsVisible && (
        <>
          <h2 className="comments-header">Comments</h2>
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
