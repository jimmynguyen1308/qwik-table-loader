import type { JSXChildren, QRL } from "@builder.io/qwik"

export type TableRecord = {
  [key: string]: JSXChildren
}

export type TableData = {
  tData: Array<TableRecord>
  tHeadings: {
    headingList: Array<string>
    classList?: string
    customHeadings?: {
      [key: string]: string
    }
    element$?: {
      [key: string]: QRL<(heading: string) => any>
    }
  }
  tColumns?: {
    classList?: string
    columnClassList?: {
      [key: string]: string
    }
    customColumns?: {
      [key: string]: any
    }
    element$?: {
      [key: string]: QRL<(record: TableRecord, param: string) => any>
    }
  }
  tRows?: {
    classList?: string
  }
  tableOptions?: {
    classList?: string
    sortArrowsClassList?: {
      container?: string
      arrowUp?: string
      arrowDown?: string
    }
    filterInputClassList?: string
  }
  sortOptions?: {
    params?: Array<string>
    defaultColor: string
    highlightColor: string
  }
  filterOptions?: {
    params?: {
      [key: string]: "search" | "options"
    }
    filterClassList?: string
  }
}

export type SortConfigs = {
  param: string
  order: 0 | 1 | 2 // 0 = default, 1 = ascending, 2 = descending
}

export type FilterConfigs = {
  params: {
    [key: string]: string
  }
}

export type TableProps = {
  tData: Array<TableRecord>
  tHeadings?: {
    classList?: string
    customHeadings?: {
      [key: string]: string
    }
    element$?: {
      [key: string]: QRL<(heading: string) => any>
    }
  }
  tColumns?: {
    classList?: string
    columnClassList?: {
      [key: string]: string
    }
    customColumns?: {
      [key: string]: QRL<(record: TableRecord, param: string) => any>
    }
    element$?: {
      [key: string]: QRL<(record: TableRecord, param: string) => any>
    }
  }
  tRows?: {
    classList?: string
  }
  tableOptions?: {
    classList?: string
    sortArrowsClassList?: {
      container?: string
      arrowUp?: string
      arrowDown?: string
    }
    filterInputClassList?: string
  }
  sortOptions?: {
    params?: Array<string>
    defaultColor?: string
    highlightColor?: string
  }
  filterOptions?: {
    params?: {
      [key: string]: "search" | "options"
    }
    filterClassList?: string
  }
}

export type SortArrowsProps = {
  heading: string
  classList?: {
    container?: string
    arrowUp?: string
    arrowDown?: string
  }
  sortConfigs: SortConfigs
  highlightColor: string
  defaultColor: string
}

export type FilterInputProps = {
  classList?: string
  heading: string
  filterConfigs: FilterConfigs
}
