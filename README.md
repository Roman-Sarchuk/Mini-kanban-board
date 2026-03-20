[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/Roman-Sarchuk/Mini-kanban-board/ci-cd.yml?branch=main&label=CI%2FCD)](https://github.com/Roman-Sarchuk/Mini-kanban-board/actions/workflows/ci-cd.yml)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# Mini-Kanban

A lightweight, drag-and-drop Kanban board application for task management.

This project demonstrates:
- complex state management with custom hooks
- drag-and-drop interactions using @dnd-kit
- scalable component architecture
- testing strategy (unit + E2E)

Live demo: https://mini-kanban-board-kohl.vercel.app/

<img width="1898" height="961" alt="image" src="https://github.com/user-attachments/assets/0d78e15c-8931-4322-9581-3bb8cf524e4b" />

## 2. Features
### Core functionality
- Drag-and-drop tasks across columns (`@dnd-kit`)
- Column management (create, rename, reorder, delete)
- Task CRUD with inline editing
### UX & persistence
- Real-time grouping by column
- Local storage persistence
- Responsive layout (mobile → desktop)
### Quality & tooling
- Unit + component tests (Vitest)
- E2E tests (Cypress)
- Optional analytics (PostHog, Sentry)

## 3. Tech Stack

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)

![dnd-kit](https://img.shields.io/badge/dnd--kit-Drag%20%26%20Drop-0F172A)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-Scoped%20Styles-1572B6?logo=css3&logoColor=white)

![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-E2E-17202C?logo=cypress&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-Code%20Quality-4B32C3?logo=eslint&logoColor=white)

![PostHog](https://img.shields.io/badge/PostHog-Analytics-000000)
![Sentry](https://img.shields.io/badge/Sentry-Monitoring-362D59?logo=sentry&logoColor=white)

## 4. Installation & Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Run locally

```bash
git clone https://github.com/your-username/Mini-kanban-board.git
cd mini-kanban-board
npm install
npm run dev
```

App runs at: `http://localhost:5173`

### Useful scripts

```bash
npm run build          # Production build
npm run preview        # Preview production build
npm run lint           # Lint codebase
npm run test           # Run unit/component tests (watch)
npm run test:coverage  # Run tests with coverage
npm run cypress:open   # Open Cypress UI
npm run cypress:run    # Run Cypress headless
```

## 5. Project Structure

```text
mini-kanban/
├─ src/
│  ├─ analytics/          # Event tracking and analytics hooks
│  ├─ components/         # Reusable UI pieces (Column, Card, AddField, etc.)
│  ├─ hooks/              # Core board logic (useColumns, useTasks)
│  ├─ icons/              # Icon components
│  ├─ pages/Kanban/       # Main Kanban page
│  ├─ types/              # TypeScript models/interfaces
│  ├─ App.tsx
│  └─ main.tsx
├─ cypress/               # End-to-end tests
├─ public/                # Static assets
├─ vitest.config.ts
├─ cypress.config.ts
└─ package.json
```

---

If you found this project helpful, consider starring the repository.
