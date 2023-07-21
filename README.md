# `qwik-table-loader`

![image](https://img.shields.io/badge/Qwik-E10098?style=for-the-badge&logo=lightning&logoColor=white) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

By [`@jimmynguyen1308`](https://github.com/jimmynguyen1308)

## Overview

`qwik-table-loader` is a table library for [Qwik](https://qwik.builder.io/) which is _(heavily)_ inspired by [Tanstack Table](https://tanstack.com/table/).

## Docs

- [Features](#features)
- [Usage](#usage)
- [API](#api)
- [Read More](#read-more)

## Features

### v.0.0.7 (overhaul, more dynamic and s-table version)

- Use `TableLoader` component to render table.
- Customize table elements & features by parsing properties into `TableLoader`.
- Include built-in methods for sophisticated table functionalities.
- Support **TypeScript** and **TailwindCSS**.

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

Import the library and add it to the codebase

```typescript
import { component$, $ } from "@builder.io/qwik"
import TableLoader from "qwik-table-loader/components/TableLoader"
import type { TableRecord } from "qwik-table-loader/types"
import { data } from "~/__mocked__/data"

export default component$(() => {
  const tData: TableRecord[] = data
  const tHeadings = {
    classList: "bg-gray-500 text-left text-white",
    customHeadings: {
      id: "Product ID",
    },
    element$: $((heading: string) => `Product:${heading}`),
  }
  const tRows = {
    classList: "p-2 py-6",
  }
  return <TableLoader tData={tData} tHeadings={tHeadings} tRows={tRows} />
})
```

(For **TailwindCSS**) Add the component library directory to `tailwind.config.js` file

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // your src directory
    "./node_modules/qwik-table-loader/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Customize loader's properties

In order to customize the table, simply provide your desired properties to the `TableLoader` (see [API](#api) for more details).

## API

### 1. `TableLoader` properties

You can choose to add different properties to `TableLoader` components in order to configure and customize the table's data, custom features (i.e. sorting and filtering), and class lists.

```typescript
type TableProps = {
  tData: Array<TableRecord>
  tHeadings?: {
    classList?: string
    customHeadings?: {
      [key: string]: string
    }
    element$?: {
      [key: string]: QRL<(heading: string) => JSXNode | string>
    }
  }
  tColumns?: {
    classList?: string
    columnClassList?: {
      [key: string]: string
    }
    customColumns?: {
      [key: string]: QRL<(record: TableRecord, param: string) => string>
    }
    element$?: {
      [key: string]: QRL<
        (record: TableRecord, param: string) => JSXNode | string
      >
    }
  }
  tRows?: {
    classList?: string
  }
  tableOptions?: {
    classList?: {
      table?: string
      thead?: string
      theadWrapper?: string
      headArrowWrapper?: string
      sortArrows?: {
        container?: string
        arrowUp?: string
        arrowDown?: string
      }
      filterInput?: {
        container?: string
        input?: string
      }
      tbody?: string
    }
  }
  sortOptions?: {
    params?: Array<string>
    defaultColor?: string
    highlightColor?: string
  }
  filterOptions?: {
    params?: {
      [key: string]: "search" | "options" // "options" filter T.B.D.
    }
  }
}
```

#### 1.1. tData

- Type: `Array<TableRecord>`
- Required: `true`

Table data. This property is the ONLY mandatory one in order to generate table.

#### 1.2. tHeadings

Table heading properties. Including the configures affecting the `<thead>` part of the table.

#### 1.2.1. tHeadings.classList

- Type: `string`
- Default: `"table-heading"`

Table heading class list. Customize this property for styling purposes.

#### 1.2.2. tHeadings.customHeadings

- Type: `{ [key: string]: string }`

Configure this property to render given headings into custom ones as you wish. For example:

```typescript
tHeadings: {
  customHeadings: {
    id: "Product ID",
    dob: "Date of Birth",
    some_random_key: "Custom Heading"
  }
}
```

#### 1.2.3. tHeadings.element$

- Type: `{ [key: string]: QRL<(heading: string) => JSXNode | string> }`

Configure this property to render given headings into custom ones as you wish. Similar to `tHeadings.customHeadings`, BUT the return values can be elements also. For example:

```typescript
tHeadings: {
  customHeadings: {
    prodId: $((heading: string) => "Product ID"),
    some_random_key: $((heading: string) => (
      <span class="text-rose-500">{heading}</span>
    ))
  }
}
```

#### 1.3. tColumns

Table column properties. Including the configures affecting table columns.

#### 1.3.1. tColumns.classList

- Type: `string`
- Default: `"table-column"`

Table column class list. Customize this property for styling purposes.

#### 1.3.2. tColumns.columnClassList

- Type: `{ [key: string]: string }`

Configure this property to add custom class list to columns as you wish (for styling purposes). For example:

```typescript
tColumns: {
  columnClassList: {
    id: "w-[50px]",
    description: "max-w-[200px]"
  }
}
```

#### 1.3.3. tColumns.customColumms

- Type: `{ [key: string]: QRL<(record: TableRecord, param: string) => string> }`

Configure this property to render custom columns as you wish. Similar to `tColumns.element$`; however, this is most likely to be used for the filter feature in future updates (not developed). For example:

```typescript
tColumns: {
  customColumns: {
    status: $((record: TableRecord, param: string) => {
      switch (record[param]) {
        case 0:
          return "Inactive"
        case 1:
          return "Active"
        default:
          return "Unknown"
      }
    })
  }
}
```

#### 1.3.4. tColumns.element$

- Type: `{ [key: string]: QRL<(record: TableRecord, param: string) => JSXNode | string> }`

Configure this property to render custom columns as you wish. Similar to `tColumns.customColumns`, BUT the return values can be elements also. For example:

```typescript
tColumns: {
  customColumns: {
    status: $((record: TableRecord, param: string) => {
      switch (record[param]) {
        case 0:
          return <span class="text-[#f00]">Inactive</span>
        case 1:
          return <span class="text-[#0f0]">Active</span>
        default:
          return <span>Unknown</span>
      }
    })
  }
}
```

#### 1.4. tRows

Table row properties. Including the configures affecting table rows _(excluding the table heading row)_.

#### 1.4.1. tRows.classList

- Type: `string`
- Default: `"table-row"`

Table row class list. Customize this property for styling purposes.

#### 1.5. tableOptions

Contains general configuration options for the table.

#### 1.5.1. tableOptions.classList

Table class lists. Customize this property for styling purposes, given the overall structure of `TableLoader` component...

```typescript
return (
  <table class={tableOptions.classList.table}>
    <thead class={tableOptions.classList.thead}>
      <tr>
        <th
          class={`
            ${tHeadings.classList}
            ${tColumns.classList}
            ${ttColumns.columnClassList[heading]}
          `}
        >
          <div class={tableOptions.classList.theadWrapper}>
            <div class={tableOptions.classList.headArrowWrapper}>
              {/* table heading here... */}
              <SortArrows
                classList={{
                  container: tableOptions.classList.sortArrows.container,
                  arrowUp: tableOptions.classList.sortArrows.arrowUp,
                  arrowDown: tableOptions.classList.sortArrows.arrowDown,
                }}
              />
            </div>
            <div class={tableOptions.classList.filterInput.container}>
              <FilterInput class={tableOptions.classList.filterInput.input}>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class={tableOptions.classList.tbody}>
      <tr>
        <td
          class={`
            ${tRows.classList}
            ${tColumns.classList}
            ${tColumns.columnClassList[param]}
          `}
        >
          {/* table data here... */}
        </td>
      </tr>
    </tbody>
  </table>
)
```

(For **TailwindCSS**) the default class lists also include some basic classes for TailwindCSS. Simply change the class lists to make changes to the default styling.

#### 1.6. sortOptions

Contains configuration options for `TableLoader` sorting feature.

#### 1.6.1. sortOptions.params

- Type: `string[]`

Parameters that you wish to have the sorting feature. For example:

```typescript
const tData = [
  {
    id: 1,
    name: "Jon Doe",
    dob: "1991-01-01",
    note: "notes for Jon",
  },
  {
    id: 2,
    name: "Jane Doe",
    dob: "1992-02-02",
    note: "notes for Jane",
  },
]

const sortOptions = {
  params: ["id", "name", "dob"], // sorting button will show in these columns
  defaultColor: "black",
  highlightColor: "#f00",
}
```

#### 1.6.2. sortOptions.defaultColor & sortOptions.highlightColor

- Type: `string`

Colors of the sorting arrow SVGs when the sorting feature is toggled on (`highlightColor`) and toggled off (`defaultColor`). Since it's parsed directly into the SVG, it supports all color types (i.e. plain text, hex code, RGB, etc.)

#### 1.7. filterOptions

Contains configuration options for `TableLoader` filtering feature.

#### 1.7.1. filterOptions.params

- Type: `{ [key: string]: "search" | "options" }`

Parameters that you wish to have the filtering feature. For example:

```typescript
const filterOptions = {
  params: {
    id: "search",
    dob: "search",
    status: "options",
  },
}
```

The "search" filter is ready to be used. The "options" filter, on the other hand, is not yet developed. Hopefully it will be updated in future updates.

### 2. Methods

Including built-in methods for sophisticated table functionalities. See [here](https://github.com/jimmynguyen1308/qwiktable/tree/master/utils).

## Read More

- [Qwik Documentation](https://qwik.builder.io/docs/)
