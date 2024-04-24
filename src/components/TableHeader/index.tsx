import { component$ } from "@builder.io/qwik"
import SortArrows from "./SortArrows"
import FilterInput from "./FilterInput"
import { param2Text } from "../../utils/string.utils"
import type { THeadProps } from "../../types"

export default component$(
  ({
    headings,
    customHeadings,
    classNames,
    sortOptions,
    sortConfig,
    filterOptions,
    filterConfig,
  }: THeadProps) => {
    return (
      <thead class={classNames.thead}>
        <tr>
          {headings.map((heading: string) => (
            <th
              key={heading}
              class={`${classNames.th}${classNames.tcol?.[heading] ? " " + classNames.tcol?.[heading] : ""}`}
            >
              <div class={classNames.thContent}>
                <div class={classNames.thText}>
                  {customHeadings?.[heading] || param2Text(heading)}
                  {sortOptions?.params.includes(heading) ? (
                    <SortArrows
                      heading={heading}
                      classNames={classNames}
                      sortConfig={sortConfig}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {filterOptions?.params ? (
                  Object.keys(filterOptions?.params).includes(heading) ? (
                    <div class={classNames.filterContainer}>
                      <FilterInput
                        heading={heading}
                        classNames={classNames}
                        filterType={filterOptions?.params?.[heading]}
                        filterConfig={filterConfig}
                        options={filterOptions.options?.[heading]}
                      />
                    </div>
                  ) : (
                    <div class={classNames.filterContainer}></div>
                  )
                ) : (
                  <></>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    )
  }
)
