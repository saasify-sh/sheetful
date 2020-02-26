export interface Any {
  [key: string]: any
}

export interface SheetRow {
  [key: string]: any
}

export interface QueryParams {
  [key: string]: string
}

export interface SheetGetRowsOptions {
  offset?: number
  limit?: number
  query?: QueryParams
}
