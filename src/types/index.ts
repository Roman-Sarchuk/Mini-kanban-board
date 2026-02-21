export interface Task {
  id: string
  columnId: string
  order: number
  title: string
}

export interface Column {
  id: string
  order: number
  title: string
}
