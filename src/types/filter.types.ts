import { filterType } from "../constants"
import type { QRL } from "@builder.io/qwik"
import type { CellData } from "./table.types"

export type FilterTypes = (typeof filterType)[keyof typeof filterType]

export type FilterConfig = {
  params: {
    [key: string]: string
  }
}

export type FilterOptions = {
  params: {
    [key: string]: FilterTypes
  }
  values?: {
    [key: string]: QRL<(record: CellData, param: string) => string | number>
  }
}
