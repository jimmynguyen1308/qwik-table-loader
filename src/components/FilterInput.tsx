import { component$, $ } from "@builder.io/qwik"
import type { FilterInputProps } from "../types"

export default component$(
  ({ classList, heading, filterConfigs }: FilterInputProps) => (
    <input
      type="text"
      class={
        classList ||
        "w-full bg-white font-normal text-black text-[14px] border rounded-md p-1"
      }
      onInput$={$(
        (event: any) =>
          (filterConfigs.params = {
            ...filterConfigs.params,
            [heading]: event.target?.value,
          })
      )}
    />
  )
)
