export const param2string = (str: string) => {
  let returnVal: string = ""

  // Convert camel case
  const camelCaseWords = str.replace(/([A-Z])/g, " $1")
  const result =
    camelCaseWords.charAt(0).toUpperCase() + camelCaseWords.slice(1)

  // Convert snake case
  const snakeCaseWords = result.split("_")
  snakeCaseWords.forEach(
    (word: string, index: number) =>
      (returnVal +=
        word?.charAt(0).toUpperCase() +
        word?.slice(1) +
        (index === snakeCaseWords.length - 1 ? "" : " "))
  )

  return returnVal
}

export const string2param = (str: string, method: "snake" | "camel") =>
  method === "snake"
    ? str.toLowerCase().replaceAll(" ", "_")
    : str.charAt(0).toLowerCase() + str.slice(1).replaceAll(" ", "")
