import { $, inlinedQrl, QRL, JSXNode } from "@builder.io/qwik"
import TableLoader from "./components/TableLoader"
import { CellData } from "./types"

export default () => {
  const data: Array<CellData> = [
    {
      id: 1,
      name: "No",
    },
    {
      id: 2,
      name: "AAA",
    },
  ]

  const test = $((record: CellData, heading: string) => {
    return "ABC" + record[heading]
  })

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <p class="text-2xl text-red">Warning!</p>
        <TableLoader
          tData={data}
          // @ts-ignore
          element={{
            name: test,
          }}
          tableOptions={{
            customHeadings: {
              id: "Product ID",
            },
            classNames: {
              th: "bg-gray-300 text-white",
              tcol: {
                id: "first-column",
              },
            },
            sortOptions: {
              params: ["id", "name"],
            },
            filterOptions: {
              params: {
                name: "search",
              },
              values: {
                name: test,
              },
            },
          }}
        />
      </body>
    </>
  )
}

// values: {
//   name: (record: CellData, heading: string) =>
//     `BBB:${record[heading]}`,
// },
