import { useEffect, useState } from "react"

import { getCommentCounts } from "@/lib/getCommentCounts.ts"

interface Props {
  initialCommentCounts: Record<string, number> | undefined
  pathname: string
}

export function Comments({ initialCommentCounts, pathname }: Props) {
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false)
  const [commentCount, setCommentCount] = useState(
    initialCommentCounts?.[pathname] ?? 0,
  )
  useEffect(() => {
    ;(async () => {
      try {
        const fetchedCommentCounts = await getCommentCounts(
          window.location.host,
          [pathname],
        )

        if (fetchedCommentCounts) {
          setCommentCount(fetchedCommentCounts[pathname] ?? 0)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [pathname])

  return (
    <>
      {!isCommentsVisible && (
        <div
          className="comments-link"
          onClick={() => {
            setIsCommentsVisible(true)
          }}
        >
          <i
            aria-hidden="true"
            className="byb-icon byb-icon-comment byb-icon-mobile-fw"
          ></i>
          &#x2004;
          {commentCount === 0 && <>Post a comment</>}
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
