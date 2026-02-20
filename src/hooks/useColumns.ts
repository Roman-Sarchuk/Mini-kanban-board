import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { type Column } from '../types'

const STORAGE_KEY = 'my-kanban-columns'

export function useColumns() {
  const [columns, setColumns] = useState<Column[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    try {
      return JSON.parse(stored) as Column[]
    } catch {
      return []
    }
  })
  
  // For dev only: clear tasks in local storage on every reload
  // useEffect(() => {
  //   setTasks([]);
  // }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
  }, [columns])

  const addColumn = (title: string) => {
    const newColumn: Column = {
      id: uuidv4(),
      order: columns.length,
      title,
    }

    setColumns(prev => [...prev, newColumn])
  }

  const updateColumn = (id: string, updates: Partial<Omit<Column, 'id'>>) => {
    setColumns(prev => {
      const existingColumn = prev.find(column => column.id === id)
      if (!existingColumn) return prev

      const updatedColumns = prev.map(column =>
        column.id === id ? { ...column, ...updates } : column
      )

      const updatedColumn = updatedColumns.find(column => column.id === id)
      if (!updatedColumn) return prev

      return normalizeOrder(updatedColumns)
    })
  }

  const deleteColumn = (id: string) => {
    setColumns(prev => {
      const columnToDelete = prev.find(c => c.id === id)
      if (!columnToDelete) return prev

      const filtered = prev.filter(c => c.id !== id)

      return normalizeOrder(filtered)
    })
  }

  const moveColumn = (
    id: string,
    newOrder: number
  ) => {
    setColumns(prev => {
      const column = prev.find(c => c.id === id)
      if (!column) return prev
      if (column.order === newOrder) return prev

      let updatedColumns = prev.map(c =>
        c.id === id ? { ...c, order: newOrder } : c
      )

      return normalizeOrder(updatedColumns)
    })
  }

  return { columns, addColumn, updateColumn, deleteColumn, moveColumn }
}

function normalizeOrder(columns: Column[]): Column[] {
  const sortedColumns = columns.sort((a, b) => a.order - b.order)

  return columns.map(column => {
    const index = sortedColumns.findIndex(c => c.id === column.id)

    return { ...column, order: index }
  })
}