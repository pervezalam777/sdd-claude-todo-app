# Data Model: Backup and Restore

**Feature**: Backup and Restore for Todo Application  
**Date**: 2026-09-24

## Entities

### BackupFile

Represents a backup of all todos at a point in time.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | Yes | App version that created the backup (e.g., "1.0.0") |
| `timestamp` | number | Yes | Unix timestamp when backup was created |
| `todoCount` | number | Yes | Number of todos in the backup |
| `todos` | Todo[] | Yes | Array of todo objects |
| `userId` | string | No | Optional user identifier for future sync |

### BackupSchedule

Configuration for automatic backups.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `enabled` | boolean | Yes | Whether auto-backup is active |
| `interval` | 'daily' \| 'weekly' \| 'monthly' | Yes | Backup frequency |
| `lastBackup` | number \| null | Yes | Unix timestamp of last automatic backup |

### BackupInfo

Metadata about a backup file (for history display).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timestamp` | number | Yes | When backup was created |
| `filePath` | string | Yes | Name of backup file |
| `todoCount` | number | Yes | Number of todos in backup |

### RestorePreview

Data shown to user before restore.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timestamp` | number | Yes | When backup was created |
| `todoCount` | number | Yes | Number of todos in backup |
| `version` | string | Yes | App version that created backup |

## State Transitions

### Backup Flow

```
User Action (Backup)
    ↓
Create Backup File (JSON)
    ↓
Save to File System (Download)
    ↓
Update Last Backup Timestamp
```

### Restore Flow

```
User Action (Select File)
    ↓
Read Backup File
    ↓
Validate File Format
    ↓
Validate Version Compatibility
    ↓
Show Preview to User
    ↓
User Confirms
    ↓
Replace/Update Todo List
    ↓
Persist to Store
```

## Validation Rules

### Backup File Validation

1. Must be valid JSON
2. Must contain `version`, `timestamp`, `todoCount`, and `todos` fields
3. `version` must be a string
4. `timestamp` must be a valid number
5. `todoCount` must match array length of `todos`
6. Each todo must have valid structure (id, title, completed, createdAt)

### Version Compatibility

- **Same version**: Allow restore
- **Older app, newer backup**: Show warning, allow restore
- **Newer app, older backup**: Allow restore (data may lack new fields)
- **Major version mismatch**: Show error

## Relationship to Existing Models

### Todo (existing)

Backup files contain full Todo objects, matching the existing `Todo` type:

```typescript
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
```

### BackupState (new)

Added to Redux store:

```typescript
interface BackupState {
  lastBackup: number | null;
  autoBackupEnabled: boolean;
  autoBackupInterval: 'daily' | 'weekly' | 'monthly';
  backupHistory: BackupInfo[];
}
```

## File Structure Example

```json
{
  "version": "1.0.0",
  "timestamp": 1727184000000,
  "todoCount": 5,
  "todos": [
    {
      "id": "abc-123",
      "title": "Complete project",
      "description": "Submit for review",
      "completed": false,
      "createdAt": 1727180000000
    }
  ]
}
```
