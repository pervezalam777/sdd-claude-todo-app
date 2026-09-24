# Todo App - Spec-Driven Development

A modern Todo application built using Spec-Driven Development (SDD) methodology with React and Vite.

## Features

- **Add Todos** - Create new tasks with title and optional description
- **Mark Complete** - Toggle completion status with visual feedback
- **Edit Todos** - Modify existing todos inline
- **Delete Todos** - Remove tasks you no longer need
- **Filter** - View All, Active, or Completed todos
- **Statistics** - Real-time count of pending items
- **Clear Completed** - Quick cleanup of finished tasks
- **Persistent Storage** - Todos survive page refresh via sessionStorage

## Tech Stack

- **Framework**: React 18.x
- **Build Tool**: Vite
- **State Management**: useReducer + Context
- **Styling**: CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd todo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Spec-Driven Development

This project follows the SDD workflow:

1. **Specify** - Define requirements in `requirements.md`
2. **Plan** - Create technical design in `design.md`
3. **Tasks** - Break down work in `tasks.md`
4. **Implement** - Build against the spec
5. **Converge** - Verify against requirements

## Project Structure

```
todo-app/
├── src/
│   ├── components/       # React components
│   │   ├── TodoApp.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoFilter.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useTodos.js
│   ├── utils/           # Utility functions
│   │   └── id.js
│   ├── styles/          # Global styles
│   │   └── index.css
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── .specify/            # SDD configuration
├── requirements.md      # Feature requirements
├── design.md            # Technical design
├── tasks.md             # Implementation tasks
├── package.json
├── vite.config.js
└── README.md
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC