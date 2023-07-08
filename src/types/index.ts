import type { JSXChildren, QRL } from "@builder.io/qwik"
import type { JSX } from "@builder.io/qwik/jsx-runtime"

export type TableRecord = {
  [key: string]: JSXChildren
}

export interface ITableLoader {
  tData: Array<TableRecord>
  transformHeads?: boolean
  tHeadings?: {
    props?: {
      class?: string
      [key: string]: JSXChildren
    }
    element$?: QRL<(heading: string) => JSX.Element>
  }
  tRows?: {
    props?: {
      class?: string
      [key: string]: JSXChildren
    }
  }
  tCells?: {
    props?: {
      class?: string
      [key: string]: JSXChildren
    }
    element$?: QRL<(record: TableRecord, param: string) => JSX.Element>
  }
}
