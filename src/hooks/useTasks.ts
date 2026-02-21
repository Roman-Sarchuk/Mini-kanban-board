import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
      id: uuidv4(),
      columnId: columnId,
      order: tasksInColumn.length,
      title,
    }

    setTasks(prev => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'order'>>) => {
    setTasks(prev => {
      const existingTask = prev.find(task => task.id === id)
      if (!existingTask) return prev

      const updatedTasks = prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )

      const updatedTask = updatedTasks.find(task => task.id === id)
      if (!updatedTask) return prev

      // Always normalize the original column
      let normalized = normalizeOrder(updatedTasks, existingTask.columnId)

      // If the task moved to a different column, normalize the new column as well
      if (updatedTask.columnId !== existingTask.columnId) {
        normalized = normalizeOrder(normalized, updatedTask.columnId)
      }

      return normalized
    })
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