import { component$, $ } from "@builder.io/qwik"
import { sortOrder } from "../../constants"
import type { QwikIntrinsicElements } from "@builder.io/qwik"
import type { SortOrders } from "../../types"

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

export default component$(({ heading, sortConfig }: any) => {
  const handleClick = $(() => {
    if (sortConfig.param === heading) {
      sortConfig.order = ((sortConfig.order + 1) % 3) as SortOrders
    } else {
      sortConfig.param = heading
      sortConfig.order = 1
    }
  })

  return (
    <div onClick$={handleClick}>
      <SvgArrowUp
        class={""}
        width={24}
        height={24}
        color={
          sortConfig.param === heading &&
          sortConfig.order === sortOrder.ASCENDING
            ? "#fff"
            : "#ccc"
        }
      />
      <SvgArrowDown
        class={""}
        width={24}
        height={24}
        color={
          sortConfig.param === heading &&
          sortConfig.order === sortOrder.DESENDING
            ? "#fff"
            : "#ccc"
        }
      />
    </div>
  )
})
