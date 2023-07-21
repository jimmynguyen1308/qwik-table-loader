import { component$, $ } from "@builder.io/qwik"
import type { QwikIntrinsicElements } from "@builder.io/qwik"
import type { SortArrowsProps } from "../types"

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

export default component$(
  ({
    heading,
    classList = {
      container: "flex flex-col select-none cursor-pointer",
      arrowUp: "mb-[-8.5px]",
      arrowDown: "mb-[-8.5px]",
    },
    sortConfigs,
    highlightColor,
    defaultColor,
  }: SortArrowsProps) => (
    <div
      class={classList.container}
      onClick$={$(() => {
        if (sortConfigs.param === heading) {
          sortConfigs.order = ((sortConfigs.order + 1) % 3) as 0 | 1 | 2
        } else {
          sortConfigs.param = heading
          sortConfigs.order = 1
        }
      })}
    >
      <SvgArrowUp
        class={classList.arrowUp}
        width={24}
        height={24}
        color={
          sortConfigs.param === heading && sortConfigs.order === 1
            ? highlightColor
            : defaultColor
        }
      />
      <SvgArrowDown
        class={classList.arrowDown}
        width={24}
        height={24}
        color={
          sortConfigs.param === heading && sortConfigs.order === 2
            ? highlightColor
            : defaultColor
        }
      />
    </div>
  )
)
