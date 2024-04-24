import { component$, $ } from "@builder.io/qwik"
import { filterType as ftype } from "../../constants"
import type { FilterInput, FilterValue } from "../../types"

export default component$(
  ({ heading, classNames, filterType, filterConfig, options }: FilterInput) => {
    const handleFilter = $(
      // eslint-disable-next-line
      (event: any) =>
        (filterConfig.params = {
          ...filterConfig.params,
          [heading]: event?.target?.value,
        })
    )

    switch (filterType) {
      case ftype.SEARCH:
        return (
          <input
            type="text"
            class={classNames.filterInput}
            onInput$={handleFilter}
          />
        )
      case ftype.OPTIONS:
        return (
          <select
            name={heading}
            id={heading}
            class={classNames.filterInput}
            value={"---"}
            onChange$={handleFilter}
          >
            <option value="---">---</option>
            {options?.map((option: FilterValue, index: number) => {
              return (
                <option key={index} value={option?.key?.toString()}>
                  {option?.value?.toString()}
                </option>
              )
            })}
          </select>
        )
      default:
        return <></>
    }
  }
)
