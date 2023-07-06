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
    const { Head, Body } = await tableLoader({
      tData: mocked,
    })
    return { Head, Body }
  })

  return (
    <Resource
      value={tData}
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
  )
})
```

## Features

### v.0.0.3

- Use `tableLoader` to generate table JSX elements such as: _&lt;Head /&gt;, &lt;Body /&gt;, &lt;THead /&gt; and &lt;TBody /&gt;_.
- Customize table elements by parsing properties to `tableLoader`.
- **TypeScript** and **TailwindCSS** friendly (I think).

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

Import the library...

```typescript
import { component$, useResource$, Resource } from "@builder.io/qwik"
import { tableLoader } from "qwik-table-loader"
```

You must wrap the table data inside `useResource$`, and the return element inside `Resource`. To put it in other frameworks' language: **The data must be memoized**.

```typescript
export default component$(() => {
  const tData = useResource$(async () => {
    const { THead, TBody } = await tableLoader({
      tData: mocked,
      transformHeads: true,
      tailwindClasses: true,
      tHeadings: {
        props: {
          class: "bg-rose-500 text-white"
          onClick$: $(() => onClickFunc())
        }
        accessor: $((heading) => <><Icon />{heading}</>),
      },
    })
    return { THead, TBody }
  })

  return (
    <Resource
      value={tData}
      onResolved={({ THead, TBody }) => (
        <table>
          <THead />
          <TBody />
        </table>
      )}
    />
  )
})
```

### 3. Customize loader's properties

In order to customize the table, simply provide your desired properties to the `tableLoader`. See the section below for more.

## API

| Property              | Type                                                     | Description                                                                                                                                                           | Required | Default   |
| --------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| tData                 | Record[]                                                 | Table data _(must be memoized)_.                                                                                                                                      | `true`   | undefined |
| transformHeads        | boolean                                                  | Checkbox if you want to transform your data params to headings (ie. turn "date_received" to "Date Received"). Support both `snakeCaseParams` and `camel_case_params`. | `false`  | `true`    |
| tailwindClasses       | boolean                                                  | Checkbox if you want to include the library's default Tailwind classes to the return components. You can always customize the classes using `accessor` (see below).   | `false`  | `true`    |
| tHeadings             | Object                                                   | Customize table headings here!                                                                                                                                        | `false`  | undefined |
| tHeadings.props       | { [key: string]: JSXChildren }                           | Add props to all &lt;th&gt; tags.                                                                                                                                     | `false`  | undefined |
| tHeadings.props.class | string                                                   | Add class list to all &lt;th&gt; tags. For `TailwindCSS` users, you can add your classes here.                                                                        | `false`  | undefined |
| tHeadings.accessor    | QRL<(heading: string) => JSX.Element>                    | Render custom JSX elements inside all &lt;th&gt; tags.                                                                                                                | `false`  | undefined |
| tRows                 | Object                                                   | Customize table rows here!                                                                                                                                            | `false`  | undefined |
| tRows.props           | { [key: string]: JSXChildren }                           | Add props to all &lt;tr&gt; tags.                                                                                                                                     | `false`  | undefined |
| tRows.props.class     | string                                                   | Add class list to all &lt;tr&gt; tags. For `TailwindCSS` users, you can add your classes here.                                                                        | `false`  | undefined |
| tCells                | Object                                                   | Customize table cells here!                                                                                                                                           | `false`  | undefined |
| tCells.props          | { [key: string]: JSXChildren }                           | Add props to all &lt;td&gt; tags.                                                                                                                                     | `false`  | undefined |
| tCells.props.class    | string                                                   | Add class list to all &lt;td&gt; tags. For `TailwindCSS` users, you can add your classes here.                                                                        | `false`  | undefined |
| tCells.accessor       | QRL<(record: TableRecord, param: string) => JSX.Element> | Render custom JSX elements inside all &lt;td&gt; tags.                                                                                                                | `false`  | undefined |
