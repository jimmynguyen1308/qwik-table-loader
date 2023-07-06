import type { JSXChildren, QRL } from "@builder.io/qwik"
import type { JSX } from "@builder.io/qwik/jsx-runtime"

export type TableRecord = {
  [key: string]: JSXChildren
}

export interface ITableLoader {
  tData: Array<TableRecord>
  transformHeads?: boolean
  tailwindClasses?: boolean
  tHeadings?: {
    props?: any
    accessor?: QRL<(heading: string) => JSX.Element>
  }
  tRows?: {
    props?: any
    accessor?: QRL<(heading: string) => JSX.Element>
  }
  tCells?: {
    props?: any
    accessor?: QRL<(record: TableRecord, param: string) => JSX.Element>
  }
}
