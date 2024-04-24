import { filterType } from "../constants"

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
  options?: {
    [key: string]: Array<FilterValue>
  }
}

export type FilterValue = {
  key: string | number | boolean
  value: string | number | boolean
}
