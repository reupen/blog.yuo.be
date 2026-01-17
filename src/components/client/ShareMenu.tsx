import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react"
import clsx from "clsx"
import queryString from "query-string"
import { useRef, useState } from "react"

export function ShareMenu({ url, title }: { url: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const makeUrl = (url: string, queryParams: Record<string, string>) =>
    queryString.stringifyUrl({ url, query: queryParams })

  const items = [
    {
      id: "copy-url",
      text: "Copy link",
      iconClass: "fa-solid fa-copy",
      condition: () =>
        typeof navigator !== "undefined" && !!navigator.clipboard?.writeText,
      run: async () => {
        try {
          await navigator.clipboard.writeText(url)
        } catch (error) {
          alert("Failed to copy link to clipboard")
          console.error("Failed to copy link to clipboard", error)
        }
      },
    },
    {
      id: "reddit",
      text: "Reddit",
      iconClass: "fa-brands fa-reddit",
      url: () => makeUrl("https://reddit.com/submit", { url, title }),
    },
    {
      id: "hn",
      text: "Hacker News",
      iconClass: "fa-brands fa-hacker-news",
      url: () =>
        makeUrl("https://news.ycombinator.com/submitlink", {
          t: title,
          u: url,
        }),
    },
    {
      id: "bluesky",
      text: "Bluesky",
      iconClass: "fa-brands fa-bluesky",
      url: () =>
        makeUrl("https://bsky.app/intent/compose", {
          text: `${title} ${url}`,
        }),
    },
    {
      id: "x",
      text: "X",
      iconClass: "fa-brands fa-x-twitter",
      url: () =>
        makeUrl("https://x.com/intent/tweet", { text: `${title} ${url}` }),
    },
  ].filter((item) => !item.condition || item.condition())

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [
      offset({ mainAxis: 10, crossAxis: -10 }),
      shift({ padding: 9 }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const listRef = useRef<(HTMLElement | null)[]>([])

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "menu" })
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation],
  )

  // See https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/
  return (
    <div className="share-container">
      <button
        className="share-button"
        ref={refs.setReference}
        {...getReferenceProps()}
        type="button"
      >
        <i aria-hidden="true" className="fa-solid fa-share-nodes"></i>
        &#x2004;Share
      </button>
      {isOpen && (
        <FloatingPortal>
          <>
            <ul
              className="share-menu"
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {items.map((item, index) => {
                return (
                  <li key={item.id} role="none">
                    <a
                      className={clsx(activeIndex === index && "highlight")}
                      href={item.url ? item.url() : "#"}
                      ref={(node) => {
                        listRef.current[index] = node
                      }}
                      tabIndex={activeIndex === index ? 0 : -1}
                      {...getItemProps()}
                      onClick={(event) => {
                        item.run?.()
                        setIsOpen(false)
                        if (!item.url) {
                          event.preventDefault()
                        }
                      }}
                      rel={item.url ? "noreferrer" : undefined}
                      role="menuitem"
                      target={item.url ? "_blank" : undefined}
                    >
                      <i aria-hidden="true" className={item.iconClass}></i>
                      <span>{item.text}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </>
        </FloatingPortal>
      )}
    </div>
  )
}
