import type { JSXChildren, QRL, JSXNode } from "@builder.io/qwik"

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
      [key: string]: QRL<(heading: string) => JSXNode | string>
    }
  }
  tColumns?: {
    classList?: string
    columnClassList?: {
      [key: string]: string
    }
    customColumns?: {
      [key: string]: QRL<(record: TableRecord, param: string) => string> // for filter feature (tba)
    }
    element$?: {
      [key: string]: QRL<
        (record: TableRecord, param: string) => JSXNode | string
      >
    }
  }
  tRows?: {
    classList?: string
  }
  tableOptions?: {
    classList?: {
      table?: string
      thead?: string
      theadWrapper?: string
      headArrowWrapper?: string
      sortArrows?: {
        container?: string
        arrowUp?: string
        arrowDown?: string
      }
      filterInput?: {
        container?: string
        input?: string
      }
      tbody?: string
    }
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
      [key: string]: QRL<(heading: string) => JSXNode | string>
    }
  }
  tColumns?: {
    classList?: string
    columnClassList?: {
      [key: string]: string
    }
    customColumns?: {
      [key: string]: QRL<(record: TableRecord, param: string) => string>
    }
    element$?: {
      [key: string]: QRL<
        (record: TableRecord, param: string) => JSXNode | string
      >
    }
  }
  tRows?: {
    classList?: string
  }
  tableOptions?: {
    classList?: {
      table?: string
      thead?: string
      theadWrapper?: string
      headArrowWrapper?: string
      sortArrows?: {
        container?: string
        arrowUp?: string
        arrowDown?: string
      }
      filterInput?: {
        container?: string
        input?: string
      }
      tbody?: string
    }
  }
  sortOptions?: {
    params?: Array<string>
    defaultColor?: string
    highlightColor?: string
  }
  filterOptions?: {
    params?: {
      [key: string]: "search" | "options" // for filter feature (tba)
    }
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
