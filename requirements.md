# Todo Web Application - Requirements

## Functional Requirements

### User Stories

- **REQ-001**: As a user, I want to add new todos with a title and optional description
  - _Acceptance_:
    - Input field accepts text input
    - Pressing Enter or clicking "Add" creates a new todo
    - Empty titles are rejected

- **REQ-002**: As a user, I want to mark todos as complete/incomplete
  - _Acceptance_:
    - Checkbox toggles completion status
    - Completed todos display with visual distinction
    - Completion status is preserved on filter changes

- **REQ-003**: As a user, I want to delete todos
  - _Acceptance_:
    - Delete button removes the todo
    - Removal is immediate

- **REQ-004**: As a user, I want to edit existing todos
  - _Acceptance_:
    - Clicking "Edit" enters edit mode
    - Changes are saved on Enter or blur
    - Cancel restores original value

- **REQ-005**: As a user, I want to filter todos by status
  - _Acceptance_:
    - Filter buttons: All, Active, Completed
    - Only matching todos display
    - Current filter is highlighted

- **REQ-006**: As a user, I want to see todo statistics
  - _Acceptance_:
    - Shows count of total, active, and completed todos
    - Updates in real-time

- **REQ-007**: As a user, I want to clear all completed todos
  - _Acceptance_:
    - Button removes all completed items
    - Active todos remain

- **REQ-008**: As a user, I want todos to persist in session storage
  - _Acceptance_:
    - Todos survive page refresh
    - Data clears on browser clear

## Non-Functional Requirements

- **NFR-001**: Application must load within 1 second on standard devices
- **NFR-002**: UI must be responsive on mobile (320px+) and desktop
- **NFR-003**: No external dependencies beyond React and Vite

## Out of Scope

- User authentication
- Backend persistence (session storage only)
- Collaborative features
- Tags or categories