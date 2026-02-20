import { useState, useEffect } from 'react'
import type { Task } from '../types'

const STORAGE_KEY = 'my-kanban-tasks'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    try {
      return JSON.parse(stored) as Task[]
    } catch {
      return []
    }
  })

  // For dev only: clear tasks in local storage on every reload
  // useEffect(() => {
  //   setTasks([]);
  // }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (columnId: string, title: string) => {
    const tasksInColumn = tasks.filter(t => t.columnId === columnId)

    const newTask: Task = {
      id: crypto.randomUUID(),
      columnId,
      order: tasksInColumn.length,
      title,
    }

    setTasks(prev => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id'>>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => {
      const taskToDelete = prev.find(t => t.id === id)
      if (!taskToDelete) return prev

      const filtered = prev.filter(t => t.id !== id)

      return normalizeOrder(filtered, taskToDelete.columnId)
    })
  }

  const moveTask = (
    id: string,
    newColumnId: string,
    newOrder: number
  ) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id)
      if (!task) return prev
      if (task.columnId === newColumnId && task.order === newOrder) return prev

      let updatedTasks = prev.map(t =>
        t.id === id ? { ...t, columnId: newColumnId, order: newOrder } : t
      )

      // normalize old column
      updatedTasks = normalizeOrder(updatedTasks, task.columnId)

      if (task.columnId !== newColumnId) {
        // normalize new column
        updatedTasks = normalizeOrder(updatedTasks, newColumnId)
      }

      return updatedTasks
    })
  }

  return { tasks, addTask, updateTask, deleteTask, moveTask }
}

function normalizeOrder(tasks: Task[], columnId: string): Task[] {
  const columnTasks = tasks
    .filter(t => t.columnId === columnId)
    .sort((a, b) => a.order - b.order)

  return tasks.map(task => {
    if (task.columnId !== columnId) return task

    const index = columnTasks.findIndex(t => t.id === task.id)

    return { ...task, order: index }
  })
}