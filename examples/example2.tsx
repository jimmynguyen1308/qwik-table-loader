import { component$, $ } from "@builder.io/qwik"
import TableLoader, { value2Options, filterType } from "qwik-table-loader"
import { CellData } from "qwik-table-loader/lib-types/types"

export default component$(() => {
  // Given this is your raw data
  // If it is optimized (data types are string or number), you can parse to the table directly
  const tData: CellData[] = [
    {
      id: 1,
      brand_name: "Apple",
      device: "iPhone 15 Pro Max",
      description: "This is the description for the iPhone 15 Pro Max",
      year: 2023,
    },
    {
      id: 2,
      brand_name: "Apple",
      device: "Apple Vision Pro",
      description: "This is the description for the Apple Vision Pro",
      year: 2024,
    },
    {
      id: 3,
      brand_name: "Samsung",
      device: "Samsung Galaxy Z Fold 5",
      description: "This is the description for the iPhone Vision Pro",
      year: 2023,
    },
  ]

  // You can generate option lists for your filters using the fuction value2Options() from the lib
  const brandOptions = value2Options(tData, "brand_name")
  const yearOptions = value2Options(tData, "year")

  // Custom format table cell "year"
  const formatYear = $((record: CellData, heading: string) => {
    const currentYear = new Date().getFullYear()
    if (record[heading] === currentYear) {
      return (
        <span class="rounded-md bg-green-400 p-1 px-2 text-sm text-white">
          {record[heading]}
        </span>
      )
    }
    return (
      <span class="rounded-md bg-gray-400 p-1 px-2 text-sm text-white">
        {record[heading]}
      </span>
    )
  })

  return (
    <>
      <TableLoader
        // Your optimized data.
        tData={tData}
        // Your custom elements based on the column types
        element={{
          year: formatYear,
        }}
        tableOptions={{
          // For pure CSS, you can attach class names and add .css file styling those classes
          // For TailwindCSS, this is where you customize your table styling
          classNames: {
            table: "my-6 mx-3",
            thead: "",
            th: "p-2 px-4 border border-transparent border-b-black",
            thContent: "h-full flex flex-col gap-1 min-w-[30px]",
            thText:
              "min-h-[24px] flex flex-row items-center justify-between gap-2",
            // Arrows' size, default color and highlight color should be store like this format in sortContainer
            sortContainer:
              "flex flex-col -mr-1 size-[20] default-[#aaa] highlight-[#000]",
            sortArrowUp: "-mb-[7px]",
            sortArrowDown: "-mt-[7px]",
            filterContainer: "min-h-[24px]",
            filterInput:
              "w-full outline-none border border-[#aaa] text-black font-light p-1 px-2 rounded-md",
            tbody: "border-[3px] border-transparent border-t-black",
            td: "p-3",
            // Custom class names based on column name
            tcol: {
              id: "max-w-[80px] border border-transparent border-r-black",
              brand_name:
                "max-w-[160px] border border-transparent border-r-black",
              device: "max-w-[240px] border border-transparent border-r-black",
              description: "w-[240px] border border-transparent border-r-black",
            },
          },
          // Sort options: choose which columns to have the sort feature included
          sortOptions: {
            params: ["id", "brand_name", "device", "year"],
          },
          filterOptions: {
            // You can use the filterType enum, or simply type "search" or "options"
            params: {
              brand_name: filterType.OPTIONS,
              device: filterType.SEARCH,
              year: filterType.OPTIONS,
            },
            // If a column has "options" filter, it needs to have an option list
            // Otherwise, the options will be blank
            options: {
              brand_name: brandOptions,
              year: yearOptions,
            },
          },
        }}
      />
    </>
  )
})
