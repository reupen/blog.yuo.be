import { useEffect, useState } from "react"

import { getCommentCounts } from "@/lib/getCommentCounts.ts"

const COMENTARIO_SCRIPT_URL = "https://comments.yuo.be/comentario.js"

interface Props {
  initialCommentCounts: Record<string, number> | undefined
  pathname: string
}

export function Comments({ initialCommentCounts, pathname }: Props) {
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false)
  const [commentCount, setCommentCount] = useState(
    initialCommentCounts?.[pathname] ?? 0,
  )
  const [isComentarioLoaded, setIsComentarioLoaded] = useState<boolean>(false)
  const [isComentarioLoadingShown, setIsComentarioLoadingShown] =
    useState<boolean>(false)
  const [comentarioLoadError, setComentarioLoadError] = useState<
    unknown | null
  >(null)

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

  const showComments = () => {
    ;(async () => {
      try {
        await import(/* @vite-ignore */ COMENTARIO_SCRIPT_URL)
        setIsComentarioLoaded(true)
      } catch (error) {
        console.error(error)
        setComentarioLoadError(error)
      }
    })()
    setIsCommentsVisible(true)
    setTimeout(() => {
      setIsComentarioLoadingShown(true)
    }, 1_000)
  }

  return (
    <>
      {!isCommentsVisible && (
        <button className="comments-link" onClick={showComments} type="button">
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
        </button>
      )}
      {isCommentsVisible && (
        <>
          <h2 className="comments-header">Comments</h2>
          {comentarioLoadError && "Error loading Comentario"}
          {!isComentarioLoaded &&
            isComentarioLoadingShown &&
            "Loading comments…"}
          {isComentarioLoaded && (
            <comentario-comments
              page-id={pathname}
              theme="custom"
              no-fonts
            ></comentario-comments>
          )}
        </>
      )}
    </>
  )
}
