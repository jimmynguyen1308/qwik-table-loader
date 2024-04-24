import { component$, $ } from "@builder.io/qwik"
import { arrowConfig, sortOrder } from "../../constants"
import type { QwikIntrinsicElements } from "@builder.io/qwik"
import type { SortArrows, SortOrders } from "../../types"

const SvgArrowUp = (props: QwikIntrinsicElements["svg"], key: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path fill="currentColor" d="m7 14l5-5l5 5H7Z"></path>
    </svg>
  )
}
const SvgArrowDown = (props: QwikIntrinsicElements["svg"], key: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path fill="currentColor" d="m12 15l-5-5h10l-5 5Z"></path>
    </svg>
  )
}

export default component$(({ heading, classNames, sortConfig }: SortArrows) => {
  let size: number = arrowConfig.size
  let defaultColor: string = arrowConfig.defaultColor
  let highlightColor: string = arrowConfig.highlightColor
  classNames.sortContainer?.split(" ").map((c: string) => {
    if (c.includes("size-[")) {
      size = Number(c.substring(6, c.length - 1))
    } else if (c.includes("default-[")) {
      defaultColor = c.substring(9, c.length - 1)
    } else if (c.includes("highlight-[")) {
      highlightColor = c.substring(11, c.length - 1)
    }
  })

  const handleClick = $(() => {
    if (sortConfig.param === heading) {
      sortConfig.order = ((sortConfig.order + 1) % 3) as SortOrders
    } else {
      sortConfig.param = heading
      sortConfig.order = sortOrder.ASCENDING
    }
  })

  return (
    <div class={classNames.sortContainer} onClick$={handleClick}>
      <SvgArrowUp
        class={classNames.sortArrowUp}
        width={size}
        height={size}
        color={
          sortConfig.param === heading &&
          sortConfig.order === sortOrder.ASCENDING
            ? highlightColor
            : defaultColor
        }
      />
      <SvgArrowDown
        class={classNames.sortArrowDown}
        width={size}
        height={size}
        color={
          sortConfig.param === heading &&
          sortConfig.order === sortOrder.DESENDING
            ? highlightColor
            : defaultColor
        }
      />
    </div>
  )
})
