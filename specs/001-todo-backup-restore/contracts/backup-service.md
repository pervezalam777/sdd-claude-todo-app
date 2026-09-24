# Contract: Backup Service

**Feature**: Backup and Restore for Todo Application  
**Date**: 2026-09-24

## Service: backupService.ts

### createBackup(todos: Todo[]): BackupFile

Creates a backup file from the current todo list.

**Parameters**:
- `todos`: Array of Todo objects to backup

**Returns**: BackupFile object

**Throws**:
- Error: If todos array is null/undefined
- Error: If any todo is invalid

**Behavior**:
1. Validates each todo has required fields
2. Creates backup metadata (version, timestamp, count)
3. Returns complete backup file

---

### restoreBackup(data: string): Todo[]

Restores todos from a backup file string.

**Parameters**:
- `data`: JSON string of backup file

**Returns**: Array of Todo objects

**Throws**:
- Error: If data is not valid JSON
- Error: If backup format is invalid
- Error: If version is incompatible

**Behavior**:
1. Parses JSON data
2. Validates backup structure
3. Checks version compatibility
4. Returns validated todos array

---

### validateBackup(data: unknown): boolean

Validates backup file structure without throwing errors.

**Parameters**:
- `data`: Unknown data to validate

**Returns**: true if valid backup file, false otherwise

**Behavior**:
1. Checks if data is object
2. Verifies required fields exist
3. Validates types

---

### getVersion(): string

Returns current app version.

**Returns**: Version string (e.g., "1.0.0")

---

### formatBackupFilename(): string

Generates backup filename with timestamp.

**Returns**: String in format "todo-backup-YYYYMMDD-HHMMSS.json"

---

## Contract: UI Components

### BackupPanel

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `lastBackup` | number \| null | No | Timestamp of last backup |
| `autoBackupEnabled` | boolean | No | Auto-backup toggle state |
| `autoBackupInterval` | 'daily'\|'weekly'\|'monthly' | No | Auto-backup frequency |
| `onBackup` | () => void | Yes | Trigger backup creation |
| `onRestore` | (file: File) => void | Yes | Trigger restore from file |
| `onScheduleChange` | (config: BackupSchedule) => void | Yes | Update backup schedule |

**Events**:
- `onBackup`: User clicked backup button
- `onRestore`: User selected file for restore
- `onScheduleChange`: User modified auto-backup settings

---

## Data Flow Contracts

### Backup Creation

```
UI: User clicks "Backup"
    ↓
Component: Call backupService.createBackup(todos)
    ↓
Service: Validate todos, create BackupFile
    ↓
Service: Generate download URL from Blob
    ↓
UI: File downloads automatically
```

### Restore Process

```
UI: User selects file
    ↓
Component: Read file with FileReader
    ↓
Component: Call backupService.restoreBackup(data)
    ↓
Service: Validate and parse JSON
    ↓
Service: Return Todo[] or error
    ↓
UI: Show preview OR error message
    ↓
UI: User confirms → Dispatch restore action
```
