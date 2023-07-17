import { $ } from "@builder.io/qwik"
import type { TableRecord, FilterConfigs } from "../types"

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

export const filterTable = $(
  (
    records: Array<TableRecord>,
    headings: Array<string>,
    filterConfigs: FilterConfigs
  ) =>
    records.filter((record: TableRecord) => {
      let i = 0
      headings.map((param: string) => {
        if (
          record[param]
            ?.toString()
            .toLowerCase()
            .includes(filterConfigs.params[param].toString().toLowerCase())
        )
          ++i
      })
      if (i === Object.keys(filterConfigs.params).length) return record
    })
)

export const getTotalPages = (
  total_record: number,
  record_per_page: number
) => {
  return (
    Math.floor(total_record / record_per_page) +
    (total_record % record_per_page === 0 ? 0 : 1)
  )
}
