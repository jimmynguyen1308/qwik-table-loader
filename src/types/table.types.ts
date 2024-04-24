import type { JSXOutput, QRL } from "@builder.io/qwik"
import {
  THeadClassNames,
  TBodyClassNames,
  TableClassNames,
} from "./class.types"
import { SortConfig, SortOptions } from "./sort.types"
import {
  FilterConfig,
  FilterOptions,
  FilterTypes,
  FilterValue,
} from "./filter.types"

export type THeadProps = {
  // List of table headings
  headings: Array<string>
  // Custom headings
  customHeadings:
    | undefined
    | {
        [heading: string]: string
      }
  // List of class names within <thead> tag
  classNames: THeadClassNames
  // Sort options
  sortOptions: SortOptions | undefined
  // Sort config
  sortConfig: SortConfig
  // Filter options
  filterOptions: FilterOptions | undefined
  // Filter config
  filterConfig: FilterConfig
}

export type SortArrows = {
  // Heading
  heading: string
  // List of class names
  classNames: THeadClassNames
  // Sort config
  sortConfig: SortConfig
}

export type FilterInput = {
  // Heading
  heading: string
  // List of class names
  classNames: THeadClassNames
  // Filter type
  filterType: FilterTypes
  // Filter config
  filterConfig: FilterConfig
  // Filter options
  options?: Array<FilterValue>
}

export type CellData = {
  [key: string]: JSXOutput
}

export type TBodyProps = {
  // Table data
  data: Array<CellData>
  // List of table headings
  headings: Array<string>
  // List of class names within <tbody> tag
  classNames: TBodyClassNames
  // Rendered elements
  element?: {
    [key: string]: QRL<(record: CellData, param: string) => JSXOutput>
  }
}

export type TableData = {
  // Table data
  tData: Array<CellData>
  // Rendered elements
  element?: {
    [key: string]: QRL<(record: CellData, param: string) => JSXOutput>
  }
  // Table options
  tableOptions?: {
    // Custom headings
    customHeadings?: {
      [heading: string]: string
    }
    // List of class names
    classNames?: TableClassNames
    // Sort options
    sortOptions?: SortOptions
    // Filter options
    filterOptions?: FilterOptions
  }
}

export type TableConfigs = {
  // Table data
  data: Array<CellData>
  // Sort configuration
  sortConfig: SortConfig
  // Filter configuration
  filterConfig: FilterConfig
}
