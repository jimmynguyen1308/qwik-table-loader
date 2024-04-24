import { component$ } from "@builder.io/qwik"
import SortArrows from "./SortArrows"
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
              class={`${classNames.th} ${classNames.td}${classNames.tcol?.[heading] ? " " + classNames.tcol?.[heading] : ""}`}
            >
              {customHeadings?.[heading] || param2Text(heading)}
              {sortOptions?.params.includes(heading) ? (
                <SortArrows heading={heading} sortConfig={sortConfig} />
              ) : (
                <></>
              )}
            </th>
          ))}
        </tr>
      </thead>
    )
  },
)
