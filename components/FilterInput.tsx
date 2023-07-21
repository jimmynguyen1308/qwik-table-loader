import { component$, $ } from "@builder.io/qwik"
import type { FilterInputProps } from "../types"

export default component$(
  ({ classList, heading, filterConfigs }: FilterInputProps) => (
    <input
      type="text"
      class={classList}
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
