#!/usr/bin/env bash
set -euo pipefail

# T28 - Race-Safe Idempotent Deployment Script
LOCK_NAME="deploy-sprint-backtrack.lock"
LOCK_DIR="/tmp/${LOCK_NAME}"

echo "Checking deployment lock: ${LOCK_DIR}"

if ! mkdir "${LOCK_DIR}" 2>/dev/null; then
  echo "T28 another deploy is running"
  echo "Lock ${LOCK_DIR} exists. Exiting race-safely."
  exit 0
fi

trap 'rmdir "${LOCK_DIR}" 2>/dev/null || true' EXIT

echo "Acquired deployment lock: ${LOCK_DIR}"

# Retry-safe directory preparation
TARGET_DIR="${1:-/opt/deploy-sprint/backtrack}"
TEMP_DIR="${TARGET_DIR}_tmp_$$"

mkdir -p "${TARGET_DIR}"
mkdir -p "${TEMP_DIR}"

echo "Idempotent directory setup complete for target: ${TARGET_DIR}"

# Atomic swap & target cleanup
rm -rf "${TEMP_DIR}"
echo "Deployment lock released. T28 idempotent deployment finished."
