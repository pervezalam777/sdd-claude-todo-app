# Quickstart: Backup and Restore Validation

**Feature**: Backup and Restore for Todo Application  
**Date**: 2026-09-24

## Prerequisites

- Node.js 18+ installed
- Dependencies installed (`npm install`)
- Development server running (`npm run dev`)

## Validation Scenarios

### 1. Manual Backup Creation

**Purpose**: Verify backup file is created with correct format

**Steps**:
1. Open http://localhost:5173
2. Add a few test todos
3. Click "Backup" button
4. Verify file downloads as `todo-backup-YYYYMMDD-HHMMSS.json`

**Expected**:
- File downloads automatically
- Filename contains timestamp
- File is valid JSON
- Contains all todos with metadata

**Test Command**:
```bash
# Download the file, then verify:
jq '.version, .timestamp, .todoCount, .todos | length' downloaded-backup.json
```

---

### 2. Restore from Backup

**Purpose**: Verify todos are restored correctly

**Steps**:
1. Create a backup (see Scenario 1)
2. Move todos to a temporary backup location (optional)
3. Clear todos by deleting them
4. Click "Restore" and select backup file
5. Verify todos reappear

**Expected**:
- File selection works
- Backup metadata is displayed
- Todos are restored to original state
- All todo properties preserved (id, title, completed, etc.)

**Test Command**:
```bash
# Verify restore preserves data:
jq '.todos' backup-file.json > expected.json
# After restore, check store contains same data
```

---

### 3. Invalid File Handling

**Purpose**: Verify app handles invalid backups gracefully

**Steps**:
1. Create a fake backup file with invalid JSON
2. Attempt to restore with invalid file
3. Verify error message is shown

**Expected**:
- Error message displayed
- App state unchanged
- No data corruption

**Test Command**:
```bash
echo "not valid json { }}" > invalid-backup.json
# Attempt restore with this file
```

---

### 4. Auto-Backup Schedule

**Purpose**: Verify auto-backup settings can be configured

**Steps**:
1. Open backup panel
2. Enable auto-backup
3. Select interval (daily/weekly/monthly)
4. Verify settings persist after refresh

**Expected**:
- Settings save to sessionStorage
- UI reflects enabled state
- Interval selection updates state

---

### 5. Version Compatibility

**Purpose**: Verify version checking works

**Steps**:
1. Modify a backup file to have an incompatible version
2. Attempt restore
3. Verify error message indicates version mismatch

**Expected**:
- Clear error about version mismatch
- Restore not performed

---

## Integration Test

### End-to-End Workflow

```bash
# Start dev server
npm run dev

# In another terminal, run tests
npm test -- --run tests/integration/backup-restore.test.ts
```

**Test Script**:
```typescript
// Pseudo-test
1. Open app
2. Add 10 todos
3. Trigger backup
4. Delete all todos
5. Restore from backup
6. Verify 10 todos restored
7. Verify all properties preserved
```

---

## Performance Validation

### Backup Performance

**Requirements**:
- Create backup of 100 todos in <2 seconds
- Backup file size <100KB

**Test**:
```bash
# Create test with 100 todos, time the backup operation
# Should complete in under 2 seconds
```

### Restore Performance

**Requirements**:
- Restore 100 todos in <2 seconds
- UI remains responsive

**Test**:
```bash
# Time restore operation
# Should complete in under 2 seconds
```
