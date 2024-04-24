# `qwik-table-loader`

![image](https://img.shields.io/badge/Qwik-E10098?style=for-the-badge&logo=lightning&logoColor=white) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

By [`@jimmynguyen1308`](https://github.com/jimmynguyen1308)

## Overview

`qwik-table-loader` is a table library for [Qwik](https://qwik.builder.io/) which was inspired by [Tanstack Table](https://tanstack.com/table/) during early stages of the development process.

With recent devlopment from Qwik, the library shifts its own direction to fit Qwik's new directions.

## Docs

- [Features](#features)
- [Usage](#usage)
- [API](#api)
- [Read More](#read-more)

## Features

### v0.1.0 (another overhaul to fit Qwik development directions)

- Rebuild the whole library using Qwik component library template, so the package is waaaaay cleaner and lighter
- Make changes to parameter naming & component structure (see [API](#api) for more details)
- Add new filter type "options"
- Add examples (screenshots, code & instructions)

### v0.0.8

[Documentation](https://www.npmjs.com/package/qwik-table-loader/v/0.0.8)

- Clean up package dependencies & unused files.

### v.0.0.7 (overhaul, more dynamic and s-table version)

[Documentation](https://www.npmjs.com/package/qwik-table-loader/v/0.0.7)

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

pnpm...

```bash
pnpm install -D qwik-table-loader
```

or bun...

```bash
bun install -D qwik-table-loader
```

... I don't care I'm not your dad.

### 2. Add to codebase

Import the library and add it to the codebase. Here the example of what you can import from the library...

```typescript
import TableLoader, { value2Options, filterType } from "qwik-table-loader"
import { CellData, FilterValue } from "qwik-table-loader/lib-types/types"
```

### 3. Develop & customize

In order to build and style the table component to be something like this...

![](https://raw.githubusercontent.com/jimmynguyen1308/qwik-table-loader/master/examples/screenshot-example-1.png)

Please check [API](#api) along with the examples [here](https://github.com/jimmynguyen1308/qwiktable/tree/master/examples/README.md) for in-depth instructions

## API

This section contains information about the overall structure of the so-called `TableLoader`, its properties, default values and related utilities.

### `TableLoader`

- Type: Function Component
- Props: `TableData` (see below)

You can choose to add different properties to `TableLoader` components in order to display your data onto the table, add features such as sort & filter, as well as style the table using class names.

```typescript
type CellData = {
  [key: string]: JSXOutput
}

type TableData = {
  // Table data (data optimization recommended)
  tData: Array<CellData>
  // Customized elements for table cells based on the column types
  element?: {
    [key: string]: QRL<(record: CellData, param: string) => JSXOutput>
  }
  // Table options
  tableOptions?: {
    // Custom headings
    customHeadings?: {
      [heading: string]: string
    }
    // List of class names (see 4. Default Class Names for more)
    classNames?: TableClassNames
    // Sort options
    sortOptions?: {
      // Sortable parameters
      params: Array<string>
    }
    // Filter options
    filterOptions?: {
      // Filter types based on parameters
      params: {
        [key: string]: FilterTypes
      }
      // Filter options (for "options"-typed filters)
      options?: {
        [key: string]: Array<FilterValue>
      }
    }
  }
}
```

#### 1. tData

- Type: `Array<CellData>`
- Required: `true`

Table data. This property is the ONLY mandatory one in order to generate table (duh). Data optimization, meaning converting them into simple types such as string, number or boolean, is recommended in order to enable other features.

#### 2. element _(renamed from element$, 'cuz Qwik hates it)_

- Type: `QRL<(record: CellData, param: string) => JSXOutput>`

Custom element to be rendered instead of plain data from `tData`. For example:

```typescript
// it can be like this...
const formatStatus = $((record: CellData, param: string) => {
  switch (record[param]) {
    case 0:
      return "Inactive"
    case 1:
      return "Active"
    default:
      return "Unknown"
  }
})

// or it can be like this...
const formatCell = $((record: CellData, param: string) => (
  <span class="bg-green-400 rounded-md p-1">
    {record[param]}
  </span>
))
```

For detailed use cases, check out my [examples](https://github.com/jimmynguyen1308/qwiktable/tree/master/examples/README.md).

#### 3. tableOptions.customHeadings

- Type: `{ [heading: string]: string }`

Configure this property to render given headings into custom ones as you wish. For example:

```typescript
tableOptions: {
  customHeadings: {
    id: "Product ID",
    dob: "Date of Birth",
    some_random_key: "Custom Heading"
  }
  // ...
}
```

#### 4. tableOptions.classNames

- Type: `TableClassNames`
- Default: `defaultClassNames` (see below)

Collection of class names within the `TableLoader`. It is highly recommended to configure this for table styling, with **TailwindCSS** or otherwise.

Here are the default class names (which include some names for **TailwindCSS** styling)...

```typescript
// For pure CSS, you can attach class names and add .css file styling those classes
// For TailwindCSS, this is where you customize your table styling
export const defaultClassNames: TableClassNames = {
  table: "table my-6 mx-3 border-2 border-[#333]",
  thead: "table-head bg-gray-600 border-2 border-[#333]",
  th: "table-heading text-white border border-[#333] p-2 px-4",
  thContent: "table-heading-content h-full flex flex-col gap-1 min-w-[30px]",
  thText:
    "table-heading-text min-h-[24px] flex flex-row items-center justify-between gap-2",
  // Arrows' size, default color and highlight color should be store like this format in sortContainer
  sortContainer: `sort-container flex flex-col -mr-1 size-[20] default-[#ccc] highlight-[#fff]`,
  sortArrowUp: "sort-arrow-up -mb-[7px]",
  sortArrowDown: "sort-arrow-down -mt-[7px]",
  filterContainer: "filter-container min-h-[24px]",
  filterInput:
    "filter-input w-full outline-none text-black font-light p-1 px-2 rounded-md",
  tbody: "table-body bg-gray-100",
  tr: "table-row border border-[#ccc]",
  td: "table-cell border border-[#ccc] p-1 px-3",
}
```

And here is how those class names are placed within the table...

```html
<table class="defaultClassNames.table">
  <!-- Table header -->
  <thead class="defaultClassNames.thead">
    <tr>
      <th class="defaultClassNames.th customClassNames.tCol[heading]">
        <div class="defaultClassNames.thContent">
          <div class="tableOptions.classList.thText">
            {/* table heading here... */}
            <div class="defaultClassNames.sortContainer">
              <svg class="defaultClassNames.sortArrowUp"></svg>
              <svg class="defaultClassNames.sortArrowDown"></svg>
            </div>
          </div>
          <div class="defaultClassNames.filterContainer">
            <!-- For "search" filter -->
            <input class="defaultClassNames.filterInput" />
            <!-- For "options" filter -->
            <select class="defaultClassNames.filterInput"></select>
          </div>
        </div>
      </th>
    </tr>
  </thead>
  <!-- Table body -->
  <tbody class="defaultClassNames.tbody">
    <tr class="defaultClassNames.tr">
      <td class="defaultClassNames.td customClassNames.tCol[heading]">
        {/* table data here... */}
      </td>
    </tr>
  </tbody>
</table>
```

(For **TailwindCSS**) the default class lists also include some basic classes for TailwindCSS. Simply change the class lists to make changes to the default styling.

#### 5. sortOptions

- Type: `{ params: string[] }`

Contains configuration options for `TableLoader` sorting feature.

**Params:** Parameters that you wish to have the sorting feature. For example:

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
}
```

#### 6. filterOptions

Contains configuration options for `TableLoader` filtering feature.

**filterOptions.params**

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

**filterOptions.options**

- Type: `{ [key: string]: FilterValue[] }`

Options which required in "options"-typed filters

For detailed use cases, check out my [examples](https://github.com/jimmynguyen1308/qwiktable/tree/master/examples/README.md).

## Read More

- [Qwik Documentation](https://qwik.builder.io/docs/)
