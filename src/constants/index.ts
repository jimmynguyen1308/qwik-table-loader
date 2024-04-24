import { TableClassNames } from "../types"

export const sortOrder = {
  NONE: 0,
  ASCENDING: 1,
  DESENDING: 2,
} as const

export const filterType = {
  SEARCH: "search",
  OPTIONS: "options",
} as const

export const arrowConfig = {
  size: 20,
  defaultColor: "#ccc",
  highlightColor: "#fff",
}

export const defaultClassNames: TableClassNames = {
  table: "table my-6 mx-3 border-2 border-[#333]",
  thead: "table-head bg-gray-600 border-2 border-[#333]",
  th: "table-heading text-white border border-[#333] p-2 px-4",
  thContent: "table-heading-content h-full flex flex-col gap-1 min-w-[30px]",
  thText:
    "table-heading-text min-h-[24px] flex flex-row items-center justify-between gap-2",
  sortContainer: `sort-container flex flex-col -mr-1 size-[${arrowConfig.size}] default-[${arrowConfig.defaultColor}] highlight-[${arrowConfig.highlightColor}]`,
  sortArrowUp: "sort-arrow-up -mb-[7px]",
  sortArrowDown: "sort-arrow-down -mt-[7px]",
  filterContainer: "filter-container min-h-[24px]",
  filterInput:
    "filter-input w-full outline-none text-black font-light p-1 px-2 rounded-md",
  tbody: "table-body bg-gray-100",
  tr: "table-row border border-[#ccc]",
  td: "table-cell border border-[#ccc] p-1 px-3",
}
