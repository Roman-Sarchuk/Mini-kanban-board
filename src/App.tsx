import { useEffect } from 'react'
import * as Sentry from '@sentry/react'

import './App.css'
import Kanban from './pages/Kanban/Kanban'

function App() {
  useEffect(() => {
    Sentry.setUser({
      id: 'student_001',
      email: 'student@example.com',
      segment: 'kanban_user',
    })

    return () => {
      Sentry.setUser(null)
    }
  }, [])

  return (
    <Kanban />
  )
}

export default App
