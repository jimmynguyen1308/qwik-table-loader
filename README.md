# `qwik-table-loader`

![image](https://img.shields.io/badge/Qwik-E10098?style=for-the-badge&logo=lightning&logoColor=white) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

By [`@jimmynguyen1308`](https://github.com/jimmynguyen1308)

## Overview

`qwik-table-loader` is a table library for [Qwik](https://qwik.builder.io/) which is _(heavily)_ inspired by [Tanstack Table](https://tanstack.com/table/).

```typescript
import { component$, useResource$, Resource } from "@builder.io/qwik"
import { tableLoader } from "qwik-table-loader"
import { mocked } from "~/__mocked__/data"

export default component$(() => {
  const tData = useResource$(async () => {
    const { THead, TBody } = await tableLoader({
      tData: mocked,
    })
    return { THead, TBody }
  })

  return (
    <Resource
      value={tData}
      onResolved={({ THead, TBody }) => (
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
  )
})
```

## Docs

- [Features](#features)
- [Usage](#usage)
- [API](#api)
- [Tips](#tips)
- [Read More](#read-more)

## Features

### v.0.0.5 (first s-table version)

- Use `tableLoader` to generate table JSX elements: _&lt;THead /&gt; and &lt;TBody /&gt;_.
- Customize table elements by parsing properties into `tableLoader`.
- Built-in methods for sophisticated table functionalities.
- **TypeScript** and **TailwindCSS** friendly.

## Usage

### 1. Install the library

You can use either npm...

```bash
npm install -D qwik-table-loader
```

Yarn...

```bash
yarn add -D qwik-table-loader
```

or pnpm...

```bash
pnpm install -D qwik-table-loader
```

... I don't care I'm not your dad.

### 2. Add to codebase

Import the library

```typescript
import {
  component$,
  useSignal,
  useResource$,
  Resource,
  $,
} from "@builder.io/qwik"
import { tableLoader, sortTable } from "qwik-table-loader"
import type { TableRecord } from "qwik-table-loader"
import LoadingSpinner from "~/components/loading-spinner"
import { mocked } from "~/__mocked__/data"
```

You must wrap the table data inside `useResource$`, and the return element inside `Resource`. To put it in other frameworks' language: **The data must be memoized**.

```typescript
export default component$(() => {
  const data = useSignal<TableRecord[]>(mocked)

  const tData = useResource$(async ({ track }) => {
    track(() => data)
    const { THead, TBody } = await tableLoader({
      tData: data,
      transformHeads: true,
      tailwindClasses: true,
      tHeadings: {
        props: {
          class: "bg-rose-500 text-white"
          onClick$: $(() => onClickFunc())
        }
        element$: $((heading) => (
          <div onClick$={$(() => sortTable(data, heading, true))}>
            {heading}
          </div>
        )),
      },
    })
    return { THead, TBody }
  })

  return (
    <Resource
      value={tData}
      onPending={() => <LoadingSpinner />}
      onResolved={({ THead, TBody }) => (
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
  )
})
```

### 3. Customize loader's properties

In order to customize the table, simply provide your desired properties to the `tableLoader` (see [API](#api) for more details).

### 4. Add table functions

Such methods including _search_, _filter_ or _sort_ can be found the library as well for your convenience (see [API](#api) for more details).

## API

### 1. `tableLoader`

These properties can be set in `tableLoader` during memoization.

| Property              | Type                                                     | Description                                                                                                                                                           | Required                         |
| --------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| tData                 | Record[]                                                 | Table data _(must be memoized)_.                                                                                                                                      | ✅                               |
| transformHeads        | boolean                                                  | Checkbox if you want to transform your data params to headings (ie. turn "date_received" to "Date Received"). Support both `snakeCaseParams` and `camel_case_params`. | ❌ (default = `true`)            |
| tHeadings             | Object                                                   | Customize table headings here!                                                                                                                                        | ❌                               |
| tHeadings.props       | { [key: string]: JSXChildren }                           | Add props to all &lt;th&gt; tags.                                                                                                                                     | ❌                               |
| tHeadings.props.class | string                                                   | Add class list to all &lt;th&gt; tags. For `TailwindCSS` users, you can change your classes here.                                                                     | ❌ (default = `"table-heading"`) |
| tHeadings.accessor    | QRL<(heading: string) => JSX.Element>                    | Render custom JSX elements inside all &lt;th&gt; tags.                                                                                                                | ❌                               |
| tRows                 | Object                                                   | Customize table rows here!                                                                                                                                            | ❌                               |
| tRows.props           | { [key: string]: JSXChildren }                           | Add props to all &lt;tr&gt; tags.                                                                                                                                     | ❌                               |
| tRows.props.class     | string                                                   | Add class list to all &lt;tr&gt; tags. For `TailwindCSS` users, you can change your classes here.                                                                     | ❌ (default = `"table-row"`)     |
| tCells                | Object                                                   | Customize table cells here!                                                                                                                                           | ❌                               |
| tCells.props          | { [key: string]: JSXChildren }                           | Add props to all &lt;td&gt; tags.                                                                                                                                     | ❌                               |
| tCells.props.class    | string                                                   | Add class list to all &lt;td&gt; tags. For `TailwindCSS` users, you can change your classes here.                                                                     | ❌ (default = `"table-cell"`)    |
| tCells.accessor       | QRL<(record: TableRecord, param: string) => JSX.Element> | Render custom JSX elements inside all &lt;td&gt; tags.                                                                                                                | ❌                               |

### 2. `tableLoader` Return Components

These are the components returned by `tableLoader`.

| Component   | Type         | Description                                                  |
| ----------- | ------------ | ------------------------------------------------------------ |
| `<THead />` | `component$` | List of table headers. Must be wrapped in &lt;thead&gt; tag. |
| `<TBody />` | `component$` | Table body. Must be wrapped in &lt;tbody&gt; tag.            |

### 3. Methods

These methods support sophisticated table functions apart from generating table data. They can be imported directly from the library, same as `tableLoader`.

| Method            | Parameters                                               | Description                                                                                                             |
| ----------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `param2string()`  | str: `string`                                            | Convert `snake_case_param` or `camelCaseParam` to string. Used in table headings.                                       |
| `string2param()`  | str: `string`, method: `"snake" or "camel"`              | Convert string to `snake_case` or `camelCase`, opposed to `param2string()` method.                                      |
| `sortTable()`     | data: `Record[]`, param: `string`, isAcending: `boolean` | Sort table data with given heading (`param`) in ascending order (isAcending=`true`) or descending (isAcending=`false`). |
| `searchTable()`   | data: `Record[]`, params: `string[]`, keyword: `string`  | Search table data base with given headings (`params`) and keyword (`keyword`). Can be used in search or filter inputs.  |
| `getTotalPages()` | total_record: `number`, record_per_page: `number`        | Calculate total pages. Can be used in paginating table records.                                                         |

## Tips

- Make sure to name your param in your data in either `snake_case` or `camelCase` for `transformHeads` feature to work properly...

```typescript
const data = {
  name: "Jon Doe", // OK
  date_of_birth: "1990/01/01", // OK
  timeZone: "UTC+08:00", // OK
  // ...
}
```

- The table `props` property has type `[key: string]: JSXChildren` in which `JSXChildren` does NOT include `QRL`. Therefore, you should only add basic `props` such as ID or class; for event handlers like `onClick$` or `onFocus$` for example, try to add those in a separate element in the `element$` property instead.

- Check out some examples located in the folder `/example` in the library.

## Read More

- [Qwik Documentation](https://qwik.builder.io/docs/)
