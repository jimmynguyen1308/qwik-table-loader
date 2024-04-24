import { component$ } from "@builder.io/qwik"
import { TBodyProps, CellData } from "../types"

export default component$(
  ({ data, headings, classNames, element }: TBodyProps) => {
    return (
      <tbody class={classNames.tbody}>
        {data.map((record: CellData, index: number) => {
          return (
            <tr key={index} class={classNames.tr}>
              {headings.map((heading: string) => (
                <td
                  key={heading}
                  class={`${classNames.td}${classNames.tcol?.[heading] ? " " + classNames.tcol?.[heading] : ""}`}
                >
                  {element?.[heading]?.(record, heading) || record[heading]}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    )
  },
)
