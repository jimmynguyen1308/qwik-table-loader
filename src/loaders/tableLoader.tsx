import { component$, $ } from "@builder.io/qwik"
import type { JSXChildren, QRL } from "@builder.io/qwik"
import type { JSX } from "@builder.io/qwik/jsx-runtime"
import { param2string } from "../utils"

export type TableRecord = {
  [key: string]: JSXChildren
}

export interface ITableLoader {
  tData: Array<TableRecord>
  tHeadings?: {
    props?: any
    accessor?: QRL<(heading: string) => JSX.Element>
    options?: {
      transformHeads?: boolean
      tailwindClasses?: boolean
    }
  }
  tRows?: {
    props?: any
    accessor?: QRL<(heading: string) => JSX.Element>
    options?: {
      tailwindClasses?: boolean
    }
  }
  tCells?: {
    props?: any
    accessor?: QRL<(record: TableRecord, param: string) => JSX.Element>
    options?: {
      tailwindClasses?: boolean
    }
  }
}

export const tableLoader = $(
  ({
    tData,
    tHeadings = {
      props: undefined,
      accessor: undefined,
      options: {
        transformHeads: true,
        tailwindClasses: true,
      },
    },
    tRows = {
      props: undefined,
      accessor: undefined,
      options: {
        tailwindClasses: true,
      },
    },
    tCells = {
      props: undefined,
      accessor: undefined,
      options: {
        tailwindClasses: true,
      },
    },
  }: ITableLoader) => {
    const headingList = Object.keys(tData[0])

    /* RENDERING FUNCTIONS
     * @type: QRL<(params: unknown) => JSX.Element>
     * @desc: render table JSX elements based on default/input parameters
     */
    const renderHeading = $((heading: string) => (
      <th
        {...tHeadings.props}
        class={
          tHeadings?.props?.class
            ? tHeadings?.props?.class
            : tHeadings.options?.tailwindClasses
            ? "table-heading min-w-[100px] border border-slate-600 bg-gray-300 text-left"
            : "table-heading"
        }
      >
        {tHeadings.accessor
          ? tHeadings?.accessor(heading)
          : tHeadings.options?.transformHeads
          ? param2string(heading)
          : heading}
      </th>
    ))

    const renderCell = $((record: TableRecord, param: string) => (
      <td
        {...tCells.props}
        class={
          tCells?.props?.class
            ? tCells?.props?.class
            : tCells.options?.tailwindClasses
            ? "table-cell border border-slate-700"
            : "table-cell"
        }
      >
        {tCells.accessor ? tCells?.accessor(record, param) : record[param]}
      </td>
    ))

    const renderRow = $((record: TableRecord, headings: Array<string>) => (
      <tr
        {...tRows.props}
        class={
          tRows?.props?.class
            ? tRows?.props?.class
            : tRows.options?.tailwindClasses
            ? "table-row border border-slate-600"
            : "table-row"
        }
      >
        {headings.map((param: string) => renderCell(record, param))}
      </tr>
    ))

    /* RETURNED COMPONENTS
     * @type: component$
     * @desc: render JSX elements into big element blocks, ie. Head or Body
     */
    const Head = component$(() => (
      <tr>{headingList.map((heading: string) => renderHeading(heading))}</tr>
    ))

    const THead = component$(() => (
      <thead>
        <Head />
      </thead>
    ))

    const Body = component$(() => (
      <>{tData.map((record: TableRecord) => renderRow(record, headingList))}</>
    ))

    const TBody = component$(() => (
      <tbody>
        <Body />
      </tbody>
    ))

    return {
      Head,
      Body,
      THead,
      TBody,
    }
  }
)