import { useStore, useTask$, component$ } from "@builder.io/qwik"
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import { sortOrder, filterType } from "../constants"
import { defaultClassNames } from "../constants"
import { sortTable } from "../utils/table.utils"
import type {
  TableData,
  CellData,
  TableConfigs,
  THeadClassNames,
  TBodyClassNames,
} from "../types"

export default component$(({ tData, element, tableOptions }: TableData) => {
  const table = useStore<TableConfigs>({
    data: tData,
    sortConfig: {
      param: "",
      order: 0,
    },
    filterConfig: {
      params: {},
    },
  })
  const headings = Object.keys(tData[0])
  const theadClassNames: THeadClassNames = {
    thead: tableOptions?.classNames?.thead || defaultClassNames.thead,
    th: tableOptions?.classNames?.th || defaultClassNames.th,
    thContent:
      tableOptions?.classNames?.thContent || defaultClassNames.thContent,
    thText: tableOptions?.classNames?.thText || defaultClassNames.thText,
    sortContainer:
      tableOptions?.classNames?.sortContainer ||
      defaultClassNames.sortContainer,
    sortArrowUp:
      tableOptions?.classNames?.sortArrowUp || defaultClassNames.sortArrowUp,
    sortArrowDown:
      tableOptions?.classNames?.sortArrowDown ||
      defaultClassNames.sortArrowDown,
    filterContainer:
      tableOptions?.classNames?.filterContainer ||
      defaultClassNames.filterContainer,
    filterInput:
      tableOptions?.classNames?.filterInput || defaultClassNames.filterInput,
    td: tableOptions?.classNames?.td || defaultClassNames.td,
    tcol: tableOptions?.classNames?.tcol || undefined,
  }
  const tbodyClassNames: TBodyClassNames = {
    tbody: tableOptions?.classNames?.tbody || defaultClassNames.tbody,
    tr: tableOptions?.classNames?.tr || defaultClassNames.tr,
    td: tableOptions?.classNames?.td || defaultClassNames.td,
    tcol: tableOptions?.classNames?.tcol || undefined,
  }

  useTask$(async ({ track }) => {
    track(() => [
      table.sortConfig.param,
      table.sortConfig.order,
      table.filterConfig.params,
    ])

    // Filter data by running through all available filters
    const filteredData = tData.filter((record: CellData) => {
      let i = 0
      headings.map((id: string) => {
        if (tableOptions?.filterOptions?.params?.[id] === filterType.SEARCH) {
          if (
            record[id]
              ?.toString()
              .toLowerCase()
              .includes(table.filterConfig.params[id]?.toString().toLowerCase())
          ) {
            ++i
          }
        } else if (
          tableOptions?.filterOptions?.params?.[id] === filterType.OPTIONS
        ) {
          if (
            record[id]?.toString() ===
              table.filterConfig.params[id]?.toString() ||
            table.filterConfig.params[id] === "---"
          )
            ++i
        }
      })
      if (i === Object.keys(table.filterConfig.params).length) return record
    })

    // Return original data if no sort order was specified
    // Otherwise, sort and return data with specified sort order
    if (table.sortConfig.order === sortOrder.NONE) {
      table.data = filteredData
    } else {
      table.data = await sortTable(
        filteredData,
        table.sortConfig.param,
        table.sortConfig.order === sortOrder.ASCENDING
      )
    }
  })

  return (
    <table class={tableOptions?.classNames?.table || defaultClassNames.table}>
      <TableHeader
        headings={headings}
        customHeadings={tableOptions?.customHeadings}
        classNames={theadClassNames}
        sortOptions={tableOptions?.sortOptions}
        sortConfig={table.sortConfig}
        filterOptions={tableOptions?.filterOptions}
        filterConfig={table.filterConfig}
      />
      <TableBody
        data={table.data}
        headings={headings}
        classNames={tbodyClassNames}
        element={element}
      />
    </table>
  )
})
