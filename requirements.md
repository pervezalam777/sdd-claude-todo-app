# Todo Web Application - Requirements

## Functional Requirements

### User Stories

- **REQ-001**: As a user, I want to add new todos with a title and optional description
  - _Acceptance_:
    - Input field accepts text input
    - Pressing Enter or clicking "Add" creates a new todo
    - Empty titles are rejected
    - Form provides visual feedback for validation errors

- **REQ-002**: As a user, I want to mark todos as complete/incomplete
  - _Acceptance_:
    - Checkbox toggles completion status
    - Completed todos display with visual distinction (strikethrough, opacity)
    - Completion status is preserved on filter changes
    - Toggle action updates Redux store

- **REQ-003**: As a user, I want to delete todos
  - _Acceptance_:
    - Delete button removes the todo immediately
    - Removal is reflected in the Redux store
    - Deleted todo no longer appears in filtered lists

- **REQ-004**: As a user, I want to edit existing todos
  - _Acceptance_:
    - Clicking "Edit" enters edit mode
    - Changes are saved on Enter or blur
    - Cancel restores original value from store
    - Edit mode updates Redux store

- **REQ-005**: As a user, I want to filter todos by status
  - _Acceptance_:
    - Filter buttons: All, Active, Completed
    - Only matching todos display
    - Current filter is highlighted in UI
    - Filter state is persisted in Redux store

- **REQ-006**: As a user, I want to see todo statistics
  - _Acceptance_:
    - Shows count of total, active, and completed todos
    - Updates in real-time as todos change
    - Active count displayed in filter section

- **REQ-007**: As a user, I want to clear all completed todos
  - _Acceptance_:
    - Button removes all completed items from store
    - Active todos remain unchanged
    - Button only appears when completed todos exist

- **REQ-008**: As a user, I want todos to persist in session storage
  - _Acceptance_:
    - Todos survive page refresh using sessionStorage
    - Data clears when browser storage is cleared
    - Initial state loaded from sessionStorage on app mount

## Non-Functional Requirements

- **NFR-001**: Application must load within 1 second on standard devices
- **NFR-002**: UI must be responsive on mobile (320px+) and desktop
- **NFR-003**: No external dependencies beyond React, Redux Toolkit, and Vite
- **NFR-004**: All code must be written in TypeScript with strict type checking
- **NFR-005**: Bundle size must be under 100KB (gzipped)
- **NFR-006**: TypeScript compilation must pass without errors or warnings

## Tech Stack Requirements

- **Framework**: React 19.x (Latest stable)
- **Build Tool**: Vite (Latest stable)
- **Language**: TypeScript (Latest stable - v5.6+)
- **State Management**: Redux Toolkit (Latest stable - v2.2+)
- **Type Checking**: TypeScript strict mode enabled
- **Module System**: ES Modules (type: "module" in package.json)

## Migration Requirements

- **MR-001**: All `.jsx` files must be converted to `.tsx`
- **MR-002**: All `.js` files must be converted to `.ts`
- **MR-003**: Add `package.json` dependencies for React 19, Redux Toolkit, TypeScript
- **MR-004**: Update `vite.config.js` for TypeScript support
- **MR-005**: Create `tsconfig.json` with strict mode enabled
- **MR-006**: Add TypeScript type definitions for React 19
- **MR-007**: Migrate from `useReducer` to Redux Toolkit slices
- **MR-008**: Add Redux `Provider` to app root
- **MR-009**: Update component props to use TypeScript interfaces
- **MR-010**: Ensure all actions in Redux are properly typed

## Out of Scope

- User authentication
- Backend persistence (session storage only)
- Collaborative features
- Tags or categories
- Dark mode support
- Animation/transitions
