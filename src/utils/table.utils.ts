import { $ } from "@builder.io/qwik"
import type { TableRecord } from "../types"

export const sortTable = $(
  (data: Array<TableRecord>, param: string, isAscending: boolean) => {
    const sortedData = isAscending
      ? [...data].sort((a, b) => {
          if (a[param]! < b[param]!) return -1
          if (a[param]! > b[param]!) return 1
          return 0
        })
      : [...data].sort((a, b) => {
          if (b[param]! < a[param]!) return -1
          if (b[param]! > a[param]!) return 1
          return 0
        })
    return sortedData
  }
)

export const searchTable = (
  data: Array<TableRecord>,
  params: Array<string>,
  keyword: string
) =>
  data.filter((record: TableRecord) => {
    let i = 0
    params.forEach((param: string) => {
      record[param]?.toString().toLowerCase().includes(keyword.toLowerCase()) &&
        ++i
      return
    })
    if (i > 0) return record
  })

export const getTotalPages = (
  total_record: number,
  record_per_page: number
) => {
  return (
    Math.floor(total_record / record_per_page) +
    (total_record % record_per_page === 0 ? 0 : 1)
  )
}
