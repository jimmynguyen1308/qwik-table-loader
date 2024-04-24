import { sortOrder } from "../constants"

export type SortOrders = (typeof sortOrder)[keyof typeof sortOrder]

export type SortConfig = {
  // Sortable parameter
  param: string
  // Sort order (0 = none, 1 = ascending, 2 = descending)
  order: SortOrders
}

export type SortOptions = {
  // Sortable parameters
  params: Array<string>
}
