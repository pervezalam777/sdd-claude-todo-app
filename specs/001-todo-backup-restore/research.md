# Research: Todo Backup and Restore

**Feature**: Backup and Restore for Todo Application  
**Date**: 2026-09-24

## Technical Decisions

### 1. Backup File Format

**Decision**: Use JSON format for backup files.

**Rationale**:
- Already used by the project (Redux state is JSON-serializable)
- Human-readable and editable if needed
- Easy to validate and parse
- Native browser support via `JSON.parse()` and `JSON.stringify()`
- Compatible with existing data model

**Alternatives considered**:
- CSV: Less suitable for nested data, would require custom parsing
- YAML: Requires external dependency
- Binary formats (Base64-encoded JSON): No benefit over plain JSON

---

### 2. File Download/Upload Mechanism

**Decision**: Use HTML5 File API with Blob for downloads and `<input type="file">` for uploads.

**Rationale**:
- No external dependencies required
- Native browser support across all modern browsers
- Direct file download without server round-trip
- Simple file selection via file input

**Alternatives considered**:
- Server-based upload: Unnecessary complexity, requires backend
- Drag-and-drop: Nice to have but not essential for v1

---

### 3. Storage Location for Backup Settings

**Decision**: Store backup schedule configuration in Redux store with sessionStorage persistence.

**Rationale**:
- Consistent with existing app architecture
- Backup schedule is part of app state
- sessionStorage persists across page refreshes
- Easy to clear if user clears browser data

**Alternatives considered**:
- localStorage: Overkill for non-critical settings
- Memory-only: Settings would reset on refresh

---

### 4. Backup File Naming

**Decision**: Use timestamp-based naming: `todo-backup-YYYYMMDD-HHMMSS.json`

**Rationale**:
- Chronologically sortable
- Human-readable
- Unique per backup (second-level precision)
- Clear purpose in filename

**Alternatives considered**:
- UUID-based: Less human-readable
- Sequential numbering: May have conflicts if multiple backups in same second

---

### 5. Version Compatibility Handling

**Decision**: Include version number in backup metadata. If restored version is newer than app version, show warning but allow restore. If backup is from much newer version, show error.

**Rationale**:
- Prevents data loss from version mismatch
- Allows minor version differences
- Protects against major breaking changes

**Implementation**: Store app version in backup. Compare with current version during restore.

---

### 6. Restore Behavior

**Decision**: Default to replacing current todos with backup data. Offer "merge" option as alternative.

**Rationale**:
- Predictable behavior (users expect restore to replace)
- Merge is complex (duplicate detection, timestamp conflicts)
- Users can manually merge by restoring to empty list first

---

## Integration Patterns

### 1. Redux Integration

**Pattern**: Add backup slice with actions for backup/restore operations.

```typescript
// backupSlice.ts
interface BackupState {
  lastBackup: number | null;
  autoBackupEnabled: boolean;
  autoBackupInterval: 'daily' | 'weekly' | 'monthly';
  backupHistory: BackupInfo[];
}

// Actions
- createBackup() -> Blob
- restoreBackup(data: string) -> Todo[]
- saveBackupSchedule(config: BackupSchedule)
```

### 2. Component Integration

**Pattern**: Add BackupPanel component in TodoApp, triggered by backup button.

```
TodoApp
  └─ BackupPanel (collapsible section)
      ├─ BackupControls (backup button, interval selector)
      └─ RestoreControls (file input, preview, restore button)
```

### 3. Service Layer

**Pattern**: Separate backup service for business logic.

```typescript
// backupService.ts
export function createBackup(todos: Todo[]): BackupFile
export function restoreBackup(data: string): Todo[]
export function validateBackup(data: unknown): boolean
```

---

## Research Questions Resolved

1. **Q**: What format should backup files use?
   - **A**: JSON (consistent with project, no dependencies)

2. **Q**: How to handle file downloads?
   - **A**: Blob + download attribute (native, no dependencies)

3. **Q**: How to handle file uploads?
   - **A**: FileReader API (native, no dependencies)

4. **Q**: Where to store backup settings?
   - **A**: Redux store with sessionStorage persistence

5. **Q**: What about backup versioning?
   - **A**: Include version in metadata, warn/error on mismatch

6. **Q**: How to handle restore conflicts?
   - **A**: Default to replace, offer merge option for future

---

## Open Questions for Clarification

None - all technical decisions can be made with reasonable defaults.
