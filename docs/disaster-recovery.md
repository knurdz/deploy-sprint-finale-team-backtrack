# T29 - Disaster Recovery From Actions Only

## Overview

This repository implements a fully automated, **Actions-only disaster recovery strategy** for restoring site deployments without requiring direct SSH or VPS terminal access.

---

## Recovery Workflow Architecture

- **Workflow Path**: `.github/workflows/disaster-recovery.yml`
- **Trigger**: `workflow_dispatch`
- **Required Input**: `recovery_ref` (Known-good commit SHA, release tag, or artifact ID)
- **Concurrency Group**: `deploy-backtrack-production` (Queueing strategy: `cancel-in-progress: false`)
- **Permissions**: `contents: read`, `actions: read` (Strict least-privilege)

---

## Triggering Disaster Recovery

### Option 1: Via GitHub Actions UI

1. Navigate to **Actions** ➔ **Disaster Recovery From Actions Only**.
2. Click **Run workflow**.
3. Select target branch and enter the `recovery_ref` (e.g. `main` or specific commit SHA).
4. Click **Run workflow**.

### Option 2: Via GitHub CLI / REST API

```bash
gh workflow run disaster-recovery.yml -f recovery_ref="main"
```

---

## Verification & Step Summary Evidence

Upon execution, the workflow outputs recovery evidence directly to `$GITHUB_STEP_SUMMARY`:

- `RECOVERY_TARGET_REF`: Reference provided in `recovery_ref`.
- `RESTORE_METHOD`: GitHub Actions Workflow Dispatch (No Direct VPS Editing).
- `ACTIONS_ONLY_RESTORE`: `true`.
- `STATUS`: Disaster recovery pipeline executed successfully.
