import { component$, useResource$, Resource, $ } from "@builder.io/qwik"
import { tableLoader } from "../loaders/tableLoader"

export default component$(() => {
  const tData = useResource$(async () => {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1/comments"
    ).then((response) => response.json())
    const { THead, TBody } = await tableLoader({
      tData: data,
      transformHeads: true,
      tHeadings: {
        props: {
          class:
            "table-heading min-w-[100px] border border-slate-600 bg-gray-300 text-left",
        },
        element$: $((heading) => (
          <div onClick$={$(() => console.log(`${heading} clicked`))}>
            {heading}
          </div>
        )),
      },
      tCells: {
        props: {
          class: "bg-rose-500",
        },
        element$: $((record, param) => (
          <div class="text-white">{record[param]}</div>
        )),
      },
    })
    return { THead, TBody }
  })
  return (
    <Resource
      value={tData}
      onPending={() => <></>}
      onResolved={({ THead, TBody }) => (
        <table>
          <thead>
            <THead />
          </thead>
          <tbody>
            <TBody />
          </tbody>
        </table>
      )}
    />
  )
})
