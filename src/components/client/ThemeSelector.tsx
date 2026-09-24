import {
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react"
import clsx from "clsx"
import { useId, useRef, useState } from "react"

const items = [
  {
    id: "auto",
    text: "Automatic",
    iconClass: "byb-icon byb-icon-circle-half-stroke",
  },
  { id: "light", text: "Light", iconClass: "byb-icon byb-icon-sun" },
  { id: "dark", text: "Dark", iconClass: "byb-icon byb-icon-moon" },
]

export function ThemeSelector({ className, ...rest }: { className: string }) {
  // eslint-disable-next-line @eslint-react/purity
  const currentTheme = localStorage.getItem("theme")
  const initialSelectedIndex = Math.max(
    0,
    items.findIndex((item) => item.id === currentTheme),
  )
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const [activeIndex, setActiveIndex] = useState<number | null>(
    initialSelectedIndex,
  )
  const listRef = useRef<(HTMLElement | null)[]>([])
  const listItemsTextRef = useRef<(string | null)[]>(
    items.map((item) => item.text),
  )
  const labelId = useId()

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

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "select" })
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    selectedIndex,
  })
  const typeahead = useTypeahead(context, {
    listRef: listItemsTextRef,
    activeIndex,
    onMatch: setActiveIndex,
    selectedIndex,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation, typeahead],
  )

  const selectItem = (index: number) => {
    const theme = items[index].id
    setSelectedIndex(index)
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme
    setIsOpen(false)
  }

  return (
    <div className={className} {...rest}>
      <button
        aria-labelledby={labelId}
        className="theme-selector-button"
        ref={refs.setReference}
        type="button"
        {...getReferenceProps()}
      >
        <span id={labelId} className="theme-selector-label">
          {items[selectedIndex] && (
            <i
              aria-hidden="true"
              className={items[selectedIndex].iconClass}
            ></i>
          )}
          <span>Theme</span>
        </span>
      </button>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <ul
              aria-labelledby={labelId}
              className={clsx("theme-selector-menu")}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {items.map((item, index) => (
                <li
                  className={clsx(index == activeIndex && "highlight")}
                  key={item.id}
                  ref={(node) => {
                    listRef.current[index] = node
                  }}
                  tabIndex={activeIndex === index ? 0 : -1}
                  {...getItemProps({
                    onClick: () => selectItem(index),
                    onKeyDown(event) {
                      if (event.key === "Enter") {
                        event.preventDefault()
                        selectItem(index)
                      }

                      if (event.key === " ") {
                        event.preventDefault()
                        selectItem(index)
                      }
                    },
                  })}
                >
                  <span>
                    {selectedIndex == index && (
                      <i
                        aria-hidden="true"
                        className="byb-icon byb-icon-circle"
                      ></i>
                    )}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  )
}
