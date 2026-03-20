[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/Roman-Sarchuk/Mini-kanban-board/ci-cd.yml?branch=main&label=CI%2FCD)](https://github.com/Roman-Sarchuk/Mini-kanban-board/actions/workflows/ci-cd.yml)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# [![Typing SVG](https://readme-typing-svg.demolab.com?font=Permanent+Marker&size=40&duration=4000&pause=2000&color=D9A518&vCenter=true&width=350&height=70&lines=Mini-Kanban)](https://git.io/typing-svg)

A lightweight, drag-and-drop Kanban board built with modern React patterns. Created as a portfolio project to showcase frontend engineering skills.

This project demonstrates:
- complex state management using custom hooks
- drag-and-drop interactions with `@dnd-kit`
- scalable component architecture
- testing strategy (unit + E2E)
- responsive UI design

---

## 🚀 Live demo

👉 https://mini-kanban-board-kohl.vercel.app/

<img src="https://github.com/user-attachments/assets/0d78e15c-8931-4322-9581-3bb8cf524e4b" width="100%" />

---

## 🧠 Why I built this

This project was created as a portfolio piece to practice and demonstrate:

- advanced React patterns (hooks, composition)
- drag-and-drop UX
- client-side persistence strategies
- testing approaches (Vitest + Cypress)
- building scalable and maintainable frontend architecture

---

## ✨ Features

### Core functionality
- Drag-and-drop task movement across columns (`@dnd-kit`)
- Column management (create, rename, reorder, delete)
- Task CRUD with inline editing

### UX & persistence
- Real-time task grouping by column
- Local storage persistence
- Fully responsive layout (mobile, tablet, desktop)

### Quality & tooling
- Unit & component testing (Vitest)
- End-to-end testing (Cypress)
- Code quality via ESLint
- Analytics/monitoring (PostHog, Sentry)

---

## 🛠 Tech Stack

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

---

## 🏗 Architecture

- State is managed via custom hooks (`useColumns`, `useTasks`)
- Components are modular and reusable
- Drag-and-drop is implemented with controlled state via `@dnd-kit`
- Local storage is used for persistence (no backend)
- Clear separation between UI, logic, and types

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Run locally

```bash
git clone https://github.com/Roman-Sarchuk/Mini-kanban-board.git
cd Mini-kanban-board
npm install
npm run dev
```

---

## 🧪 Testing

- Unit & component tests with Vitest
- End-to-end testing with Cypress

Run tests:

```bash
npm run test
npm run cypress:run
```

---

## 5. 📂 Project Structure

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

## 🗺 Roadmap
- Task details (description, priority, due date)
- Filtering, search, and sorting
- Dark mode / theming
- Backend integration (Supabase / Firebase)
- Real-time collaboration

---

If you found this project helpful, consider starring the repository.
