import { component$, $ } from "@builder.io/qwik"
import type { TableRecord, ITableLoader } from "../types"
import { param2string } from "../utils"

export const tableLoader = $(
  ({
    tData,
    transformHeads = true,
    tHeadings,
    tRows,
    tCells,
  }: ITableLoader) => {
    const headingList = Object.keys(tData[0])

    /* RENDERING FUNCTIONS
     * @type: QRL<(params: unknown) => JSX.Element>
     * @desc: render table JSX elements based on default/input parameters
     */
    const renderHeading = $((heading: string) => (
      <th
        {...tHeadings?.props}
        class={
          tHeadings?.props?.class ? tHeadings.props.class : "table-heading"
        }
      >
        {tHeadings?.element$
          ? tHeadings.element$(heading)
          : transformHeads
          ? param2string(heading)
          : heading}
      </th>
    ))

    const renderCell = $((record: TableRecord, param: string) => (
      <td
        {...tCells?.props}
        class={tCells?.props?.class ? tCells.props.class : "table-cell"}
      >
        {tCells?.element$ ? tCells.element$(record, param) : record[param]}
      </td>
    ))

    const renderRow = $((record: TableRecord, headings: Array<string>) => (
      <tr
        {...tRows?.props}
        class={tRows?.props?.class ? tRows.props.class : "table-row"}
      >
        {headings.map((param: string) => renderCell(record, param))}
      </tr>
    ))

    /* RETURN COMPONENTS
     * @type: component$
     * @desc: render JSX elements into big element blocks, ie. Head or Body
     */

    const THead = component$(() => (
      <tr>{headingList.map((heading: string) => renderHeading(heading))}</tr>
    ))

    const TBody = component$(() => (
      <>{tData.map((record: TableRecord) => renderRow(record, headingList))}</>
    ))

    return {
      THead,
      TBody,
    }
  }
)
