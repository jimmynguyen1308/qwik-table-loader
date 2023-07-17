import { useStore, useTask$, component$ } from "@builder.io/qwik"
import SortArrows from "./SortArrows"
import FilterInput from "./FilterInput"
import { param2string, sortTable, filterTable } from "../utils"
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
        customHeadings: { ...tHeadings.customHeadings },
        ...tHeadings,
      },
      tColumns: {
        ...tColumns,
      },
      tRows: {
        ...tRows,
      },
      tableOptions: {
        ...tableOptions,
      },
      sortOptions: {
        defaultColor: sortOptions?.defaultColor || "#aaa",
        highlightColor: sortOptions?.highlightColor || "#484848",
        ...sortOptions,
      },
      filterOptions: {
        ...filterOptions,
      },
    })

    useTask$(async ({ track }) => {
      track(() => [sortConfigs.param, sortConfigs.order, filterConfigs.params])

      const filteredData = await filterTable(
        tData,
        tableData.tHeadings.headingList,
        filterConfigs
      )

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
      <table class={tableData.tableOptions?.classList}>
        <thead>
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
                  <div class="flex flex-col">
                    <div class="flex flex-row items-center justify-between gap-[10px]">
                      {Object.keys(
                        tableData.tHeadings.customHeadings || []
                      ).includes(heading)
                        ? tableData.tHeadings.element$[heading](
                            tableData.tHeadings.customHeadings?.[heading]!
                          ) || tableData.tHeadings.customHeadings?.[heading]
                        : tableData.tHeadings.element$[heading](
                            param2string(heading)
                          ) || param2string(heading)}
                      {tableData.sortOptions?.params?.includes(heading) && (
                        <SortArrows
                          heading={heading}
                          classList={{
                            container: "",
                            arrowUp: "",
                            arrowDown: "",
                          }}
                          sortConfigs={sortConfigs}
                          highlightColor={tableData.sortOptions.highlightColor}
                          defaultColor={tableData.sortOptions.defaultColor}
                        />
                      )}
                    </div>
                    {Object.keys(tableData.filterOptions?.params || []).length >
                      0 && (
                      <div class="relative min-h-[30px] flex items-center">
                        {tableData.filterOptions?.params?.[heading] ===
                        "search" ? (
                          <FilterInput
                            classList={""}
                            heading={heading}
                            filterConfigs={filterConfigs}
                          />
                        ) : tableData.filterOptions?.params?.[heading] ===
                          "options" ? (
                          <></>
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
        <tbody>
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
