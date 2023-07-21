import { useStore, useTask$, component$ } from "@builder.io/qwik"
import SortArrows from "./SortArrows"
import FilterInput from "./FilterInput"
import { param2string, sortTable } from "../utils"
import type {
  TableProps,
  TableRecord,
  TableData,
  SortConfigs,
  FilterConfigs,
} from "../types"

export default component$(
  ({
    tData,
    tHeadings,
    tColumns,
    tRows,
    tableOptions,
    sortOptions,
    filterOptions,
  }: TableProps) => {
    const sortConfigs = useStore<SortConfigs>({
      param: "",
      order: 0,
    })
    const filterConfigs = useStore<FilterConfigs>({
      params: {},
    })
    const tableData = useStore<TableData>({
      tData: tData,
      tHeadings: {
        headingList: Object.keys(tData[0]),
        classList: tHeadings?.classList || "table-heading",
        customHeadings: { ...tHeadings?.customHeadings },
        ...tHeadings,
      },
      tColumns: {
        classList: tColumns?.classList || "table-column",
        ...tColumns,
      },
      tRows: {
        classList: tRows?.classList || "table-row",
        ...tRows,
      },
      tableOptions: {
        classList: {
          table: tableOptions?.classList?.table || "table",
          thead: tableOptions?.classList?.thead || "table-head",
          theadWrapper:
            tableOptions?.classList?.theadWrapper ||
            "table-head-wrapper flex flex-col",
          headArrowWrapper:
            tableOptions?.classList?.headArrowWrapper ||
            "head-arrow-wrapper flex flex-row items-center justify-between gap-[10px]",
          sortArrows: {
            container:
              tableOptions?.classList?.sortArrows?.container ||
              "sort-arrow-container flex flex-col select-none cursor-pointer",
            arrowUp:
              tableOptions?.classList?.sortArrows?.arrowUp ||
              "sort-arrow-up mb-[-8.5px]",
            arrowDown:
              tableOptions?.classList?.sortArrows?.arrowDown ||
              "ort-arrow-down mb-[-8.5px]",
          },
          filterInput: {
            container:
              tableOptions?.classList?.filterInput?.container ||
              "filter-input-container relative min-h-[30px] flex items-center",
            input:
              tableOptions?.classList?.filterInput?.input ||
              "filter-input w-full bg-white font-normal text-black text-[14px] border rounded-md p-1",
          },
          tbody: tableOptions?.classList?.tbody || "table-body",
        },
        ...tableOptions,
      },
      sortOptions: {
        defaultColor: sortOptions?.defaultColor || "#aaa",
        highlightColor: sortOptions?.highlightColor || "#484848",
        ...sortOptions,
      },
      filterOptions: filterOptions,
    })
    useTask$(async ({ track }) => {
      track(() => [sortConfigs.param, sortConfigs.order, filterConfigs.params])
      const filteredData = tData.filter((record: TableRecord) => {
        let i = 0
        tableData.tHeadings.headingList.map((param: string) => {
          if (
            record[param]
              ?.toString()
              .toLowerCase()
              .includes(filterConfigs.params[param]?.toString().toLowerCase())
          )
            ++i
        })
        if (i === Object.keys(filterConfigs?.params).length) return record
      })

      if (sortConfigs.order === 0) {
        tableData.tData = filteredData
      } else {
        tableData.tData = await sortTable(
          filteredData,
          sortConfigs.param,
          sortConfigs.order === 1
        )
      }
    })

    return (
      <table class={tableData.tableOptions?.classList?.table}>
        <thead class={tableData.tableOptions?.classList?.thead}>
          <tr>
            {tableData.tHeadings.headingList.map(
              (heading: string, index: number) => (
                <th
                  key={index}
                  class={`
                    ${tableData.tHeadings.classList}
                    ${tableData.tColumns?.classList}
                    ${tableData.tColumns?.columnClassList?.[heading]}
                  `}
                >
                  <div class={tableData.tableOptions?.classList?.theadWrapper}>
                    <div
                      class={
                        tableData.tableOptions?.classList?.headArrowWrapper
                      }
                    >
                      {Object.keys(
                        tableData.tHeadings.customHeadings || []
                      ).includes(heading)
                        ? tableData.tHeadings.element$?.[heading](
                            tableData.tHeadings.customHeadings?.[heading]!
                          ) || tableData.tHeadings.customHeadings?.[heading]
                        : tableData.tHeadings.element$?.[heading]?.(
                            param2string(heading)
                          ) || param2string(heading)}
                      {tableData.sortOptions?.params?.includes(heading) && (
                        <SortArrows
                          heading={heading}
                          classList={
                            tableData.tableOptions?.classList?.sortArrows
                          }
                          sortConfigs={sortConfigs}
                          highlightColor={tableData.sortOptions.highlightColor}
                          defaultColor={tableData.sortOptions.defaultColor}
                        />
                      )}
                    </div>
                    {Object.keys(tableData.filterOptions?.params || []).length >
                      0 && (
                      <div
                        class={
                          tableData.tableOptions?.classList?.filterInput
                            ?.container
                        }
                      >
                        {tableData.filterOptions?.params?.[heading] ===
                        "search" ? (
                          <FilterInput
                            classList={
                              tableData.tableOptions?.classList?.filterInput
                                ?.input
                            }
                            heading={heading}
                            filterConfigs={filterConfigs}
                          />
                        ) : tableData.filterOptions?.params?.[heading] ===
                          "options" ? (
                          <></> // "options" filter feature (tba)
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody class={tableData.tableOptions?.classList?.tbody}>
          {tableData.tData.map((record: TableRecord, index: number) => {
            return (
              <tr key={index}>
                {tableData.tHeadings.headingList.map(
                  (param: string, index: number) => (
                    <td
                      key={index}
                      class={`
                        ${tableData.tRows?.classList}
                        ${tableData.tColumns?.classList}
                        ${tableData.tColumns?.columnClassList?.[param]}
                      `}
                    >
                      {tableData.tColumns?.element$?.[param]?.(record, param) ||
                        tableData.tColumns?.customColumns?.[param]?.(
                          record,
                          param
                        ) ||
                        record[param]}
                    </td>
                  )
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
)
