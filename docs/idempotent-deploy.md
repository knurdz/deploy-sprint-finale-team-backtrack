# T28 - Race-Safe Idempotent Deployment

## Overview

This document describes the **Race-Safe Idempotent Deployment Strategy** implemented for Team Backtrack. It prevents concurrent deployment collisions and ensures repeat deployments safely overwrite target directories without corruption.

---

## Key Components

1. **Deploy Lock File**:
   - `DEPLOY_LOCK_NAME`: `deploy-sprint-backtrack.lock`
   - Lock Directory: `/tmp/deploy-sprint-backtrack.lock`
   - Mechanism: `mkdir` atomic directory lock creation. If another deployment is active, subsequent deploy attempts exit cleanly with `T28 another deploy is running`.

2. **Atomic Directory Operations**:
   - Uses `mkdir -p` and temporary directory extraction (`_tmp_$$`).
   - Atomic directory replacement ensures zero partial reads or corrupt state during repeat deployments.

3. **Concurrency Control**:
   - GitHub Actions workflow concurrency group: `deploy-backtrack-production`.
   - Queuing setting: `cancel-in-progress: false`.

---

## Log & Step Summary Evidence

Upon execution, the workflow writes evidence to `$GITHUB_STEP_SUMMARY`:

- `DEPLOY_LOCK_NAME`: `deploy-sprint-backtrack.lock`
- `IDEMPOTENT_OPERATION`: Atomic directory swap and retry-safe target replacement
- `RACE_SAFE_CONCURRENCY`: Queue group `deploy-backtrack-production` with deploy lock protection
- `STATUS`: Idempotent repeat deployment verified
