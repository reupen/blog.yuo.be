import { autoUpdate, offset, shift, useFloating } from "@floating-ui/react-dom"
import clsx from "clsx"
import { useSelect } from "downshift"
import { mergeRefs } from "react-merge-refs"

export function ThemeSelector({ className, ...rest }: { className: string }) {
  const items = [
    {
      id: "auto",
      text: "Automatic",
      iconClass: "fa-solid fa-circle-half-stroke",
    },
    { id: "light", text: "Light", iconClass: "fa-regular fa-sun" },
    { id: "dark", text: "Dark", iconClass: "fa-solid fa-moon" },
  ]

  const currentTheme = localStorage.getItem("theme")

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString: (item) => item?.text ?? "",
    defaultSelectedItem:
      items.find((item) => item.id == currentTheme) ?? items[0],
    onSelectedItemChange: ({ selectedItem }) => {
      localStorage.setItem("theme", selectedItem.id)
      document.documentElement.className = selectedItem.id
    },
  })

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [
      offset({ mainAxis: 10, crossAxis: -10 }),
      shift({ padding: 10 }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const { ref: toggleButtonRef, ...toggleButtonProps } = getToggleButtonProps()
  const { ref: menuRef, ...menuProps } = getMenuProps()

  return (
    <div className={className} {...rest}>
      <div
        className="theme-selector-button"
        ref={mergeRefs([refs.setReference, toggleButtonRef])}
        {...toggleButtonProps}
      >
        <label {...getLabelProps()}>
          {selectedItem && (
            <i aria-hidden="true" className={selectedItem.iconClass}></i>
          )}
          <span>Theme</span>
        </label>
      </div>
      <ul
        className={clsx("theme-selector-menu", !isOpen && "hidden")}
        ref={mergeRefs([refs.setFloating, menuRef])}
        style={floatingStyles}
        {...menuProps}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={clsx(highlightedIndex === index && "highlight")}
              key={item.id}
              {...getItemProps({ item, index })}
            >
              <span>
                {selectedItem?.id === item.id && (
                  <i aria-hidden="true" className="fa-solid fa-circle"></i>
                )}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
