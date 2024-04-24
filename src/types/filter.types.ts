import { filterType } from "../constants"

export type FilterTypes = (typeof filterType)[keyof typeof filterType]

export type FilterConfig = {
  params: {
    // Filter keywords
    [key: string]: string
  }
}

export type FilterOptions = {
  // Filter types based on parameters
  params: {
    [key: string]: FilterTypes
  }
  // Filter options (for "options"-typed filters)
  options?: {
    [key: string]: Array<FilterValue>
  }
}

export type FilterValue = {
  key: string | number | boolean
  value: string | number | boolean
}
