export type BaseClassNames = {
  // Class name for <td> tag
  td?: string
  // Custom class name for each column (identified by heading name)
  tcol?: {
    [heading: string]: string
  }
}

export type THeadClassNames = BaseClassNames & {
  // Class name for <thead> tag
  thead?: string
  // Class name for <th> tag
  th?: string
  // Class name containing header content (text, sort arrows and filter input)
  thContent?: string
  // Class name containing header text & sort arrows
  thText?: string
  // Class name containing sort arrows
  sortContainer?: string
  // Class name for sort arrow UP
  sortArrowUp?: string
  // Class name for sort arrow DOWN
  sortArrowDown?: string
  // Class name containing filter input
  filterContainer?: string
  // Class name for filter input
  filterInput?: string
}

export type TBodyClassNames = BaseClassNames & {
  // Class name for <tbody> tag
  tbody?: string
  // Class name for <tr> tag
  tr?: string
}

export type TableClassNames = TBodyClassNames &
  THeadClassNames & {
    // Class name for <table> tag
    table?: string
  }
