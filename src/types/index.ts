export interface Task {
  id: string
  columnId: string
  title: string
  /**
   * @deprecated This property is kept for backward compatibility with
   * existing localStorage data and should not be used in new code.
   */
  order?: number
}

export interface Column {
  id: string
  title: string
}
