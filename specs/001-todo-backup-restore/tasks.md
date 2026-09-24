# Tasks: Todo Backup and Restore

**Input**: Design documents from `/specs/001-todo-backup-restore/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included for User Story 1 (MVP). Tests for User Stories 2 and 3 are OPTIONAL.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify project structure matches plan (src/components/, src/store/, src/hooks/, src/services/, src/types/)
- [ ] T002 Verify TypeScript configuration (tsconfig.json with strict mode enabled)
- [ ] T003 Verify development dependencies (vite, eslint, vitest, @testing-library/react)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create `src/types/backup.ts` - Define BackupFile, BackupSchedule, BackupInfo, RestorePreview interfaces
- [ ] T005 Create `src/store/backupSlice.ts` - Define backup state and reducer with actions:
  - `setLastBackup(timestamp: number)`
  - `setAutoBackupEnabled(enabled: boolean)`
  - `setAutoBackupInterval(interval: 'daily' | 'weekly' | 'monthly')`
  - `addBackupToHistory(info: BackupInfo)`
- [ ] T006 [P] Add backup reducer to store in `src/store/index.ts`
- [ ] T007 [P] Add backup selectors to `src/store/selectors.ts`:
  - `selectBackupState`
  - `selectLastBackup`
  - `selectAutoBackupEnabled`
  - `selectAutoBackupInterval`
  - `selectBackupHistory`
- [ ] T008 Create `src/services/backupService.ts` - Implement:
  - `createBackup(todos: Todo[]): BackupFile`
  - `restoreBackup(data: string): Todo[]`
  - `validateBackup(data: unknown): boolean`
  - `getVersion(): string`
  - `formatBackupFilename(): string`
- [ ] T009 Create `src/hooks/useBackup.ts` - Custom hook exposing:
  - `backupTodos()` - trigger backup
  - `restoreFromBackup(file: File)` - trigger restore
  - `backupState` - current backup configuration
  - `lastBackup` - timestamp of last backup
  - `autoBackupEnabled` - auto-backup toggle state

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Backup All Todos (Priority: P1) 🎯 MVP

**Goal**: Allow users to create backup files of all todos and restore them from backup files

**Independent Test**: Add several todos, perform backup, clear session storage, restore from backup, verify all todos recovered

### Implementation for User Story 1

- [ ] T010 Create `src/components/BackupPanel.tsx` - UI component with:
  - BackupControls: Backup button, interval selector (daily/weekly/monthly), auto-backup toggle
  - RestoreControls: File input, backup metadata preview, restore button, clear/merge options
  - Error display for invalid files and version mismatches
- [ ] T011 Update `src/components/TodoApp.tsx` - Integrate BackupPanel component below main content
- [ ] T012 Add `backupTodos()` action to `src/store/todosSlice.ts` - Clear todos and load from backup
- [ ] T013 Implement file download in `src/services/backupService.ts`:
  - Generate Blob from BackupFile JSON
  - Create download URL
  - Trigger download with filename `todo-backup-YYYYMMDD-HHMMSS.json`
- [ ] T014 Implement file upload/reading in `src/services/backupService.ts`:
  - Use FileReader to read uploaded file
  - Call restoreBackup with file contents
  - Return parsed todos or error
- [ ] T015 Add version compatibility check in `src/services/backupService.ts`:
  - Compare backup version with app version
  - Show warning for older app with newer backup
  - Show error for major version mismatch
- [ ] T016 Add sessionStorage persistence in `src/services/backupService.ts`:
  - Save backup schedule config to sessionStorage
  - Load backup schedule on app mount

**Checkpoint**: User Story 1 fully functional - users can backup and restore todos manually

---

## Phase 4: User Story 2 - Export/Import for Portability (Priority: P2)

**Goal**: Allow users to export todos to files and import them from files for portability

**Independent Test**: Export todos to file, verify file can be opened and read, import file to add todos to list

### Implementation for User Story 2

- [ ] T017 [P] Update `src/services/backupService.ts` - Add export format validation:
  - Accept both JSON and Base64-encoded JSON
  - Auto-detect format from file content
  - Normalize to internal BackupFile format
- [ ] T018 [P] Update `src/components/BackupPanel.tsx` - Add export-only mode option:
  - Option to export without restoring
  - Option to add imported todos to existing list (merge)
  - Option to replace existing todos (default)
- [ ] T019 Update `src/store/todosSlice.ts` - Add `mergeBackup(todos: Todo[])` action:
  - Append imported todos to existing list
  - Deduplicate by ID (keep newer)
  - Preserve original todo order for non-duplicates

**Checkpoint**: User Story 2 fully functional - users can export/import for portability

---

## Phase 5: User Story 3 - Automatic Backup on Schedule (Priority: P3)

**Goal**: Automatically create backups at user-defined intervals

**Independent Test**: Enable auto-backup, wait for scheduled time (or simulate), verify backup file created

### Implementation for User Story 3

- [ ] T020 Add auto-backup timer in `src/hooks/useBackup.ts`:
  - Check last backup timestamp vs current time
  - Calculate time until next backup based on interval
  - Set setTimeout for next backup
- [ ] T021 [P] Implement backup trigger in `src/hooks/useBackup.ts`:
  - Auto-backup function calls backupTodos
  - Updates lastBackup timestamp in store
  - Adds to backup history
  - Displays notification on completion
- [ ] T022 [P] Add scheduler config to `src/store/backupSlice.ts`:
  - `setBackupInterval(interval: 'daily' | 'weekly' | 'monthly')`
  - Calculate next backup timestamp from interval
- [ ] T023 Update `src/components/BackupPanel.tsx` - Add status display:
  - Next scheduled backup time
  - Time remaining until backup
  - Last successful backup timestamp

**Checkpoint**: User Story 3 fully functional - automatic backups work as configured

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T024 [P] Add error boundary in `src/components/BackupPanel.tsx` - Handle backup/restore errors gracefully
- [ ] T025 [P] Add loading states - Show spinner during backup/restore operations
- [ ] T026 [P] Add user notifications - Toast/snackbar for:
  - Backup completed successfully
  - Restore completed successfully
  - Backup failed with reason
  - Restore failed with reason
- [ ] T027 [P] Add backup history display - Show list of past backups with:
  - Timestamp
  - Todo count
  - Button to restore from specific backup
- [ ] T028 [P] Performance optimization - For large todo lists (1000+ items):
  - Use Web Worker for backup creation
  - Show progress indicator during backup
- [ ] T029 [P] Add unit tests for backupService in `tests/unit/backupService.test.ts`
- [ ] T030 [P] Add unit tests for backupSlice in `tests/unit/backupSlice.test.ts`
- [ ] T031 [P] Add integration tests for backup/restore flow in `tests/integration/backup-restore.test.ts`
- [ ] T032 Run `npm run build` - Verify no TypeScript errors
- [ ] T033 Run `npm run test` - Verify all tests pass
- [ ] T034 Run quickstart.md validation scenarios
- [ ] T035 Verify bundle size under 100KB (gzipped)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Core implementation (models, services) first
- UI integration after services are ready
- Testing can be parallel to implementation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch models and services in parallel:
Task: "Create BackupFile, BackupSchedule interfaces in src/types/backup.ts"
Task: "Create backupSlice with reducer in src/store/backupSlice.ts"

# Launch component and service in parallel:
Task: "Create BackupPanel component in src/components/BackupPanel.tsx"
Task: "Implement backup/restore logic in src/services/backupService.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
