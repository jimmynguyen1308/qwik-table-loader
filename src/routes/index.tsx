import { component$, useResource$, Resource } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"
import { tableLoader } from "~/loaders/tableLoader"
import { mocked } from "~/__mock__/data"

export default component$(() => {
  const test = useResource$(async () => {
    const { Head, Body, THead, TBody } = await tableLoader({
      tData: mocked,
    })
    return { Head, Body, THead, TBody }
  })

  return (
    <>
      <Resource
        value={test}
        onPending={() => <></>}
        onResolved={({ Head, Body }) => (
          <table>
            <thead>
              <Head />
            </thead>
            <tbody>
              <Body />
            </tbody>
          </table>
        )}
      />
      <br />
      <Resource
        value={test}
        onPending={() => <></>}
        onResolved={({ THead, TBody }) => (
          <table>
            <THead />
            <TBody />
          </table>
        )}
      />
    </>
  )
})

export const head: DocumentHead = {
  title: "Qwiktable: Test Component",
  meta: [
    {
      name: "description",
      content: "Example for Qwiktable",
    },
  ],
}
