import { $ } from "@builder.io/qwik"
import type { CellData, FilterValue } from "../types"

export const param2Text = $((param: string) => {
  // Special cases
  if (param === "id") {
    return "ID"
  }

  let returnVal: string = ""

  // Convert camel case
  const camelCaseWords = param.replace(/([A-Z])/g, " $1")
  const result =
    camelCaseWords.charAt(0).toUpperCase() + camelCaseWords.slice(1)

  // Convert snake case
  const snakeCaseWords = result.split(/_|-/)
  snakeCaseWords.forEach(
    (word: string, index: number) =>
      (returnVal +=
        word.charAt(0).toUpperCase() +
        word.slice(1) +
        (index === snakeCaseWords.length - 1 ? "" : " "))
  )

  return returnVal
})

export const value2Options = (data: Array<CellData>, param: string) => {
  const optionsMap = new Map()
  let i = 0
  data.map((record: CellData) => {
    if (!optionsMap.has(record[param])) {
      optionsMap.set(record[param], i)
      ++i
    }
  })
  return Array.from(optionsMap, ([name]) => ({
    key: name,
    value: name,
  })) as Array<FilterValue>
}
