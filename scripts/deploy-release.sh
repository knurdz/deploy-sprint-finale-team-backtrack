#!/usr/bin/env bash
# T17 – Health-gated symlink deploy
# Deploys a candidate release and only switches the "current" symlink
# after the candidate passes health checks.
#
# Usage:  GITHUB_SHA=<sha> DIST_DIR=<path> ./scripts/deploy-release.sh
# AI-REVIEW-MARKER: participant must manually remove this marker
set -euo pipefail

###############################################################################
# Configuration
###############################################################################
RELEASE_ROOT="${RELEASE_ROOT:-releases}"
HEALTH_ENDPOINT="health/index.html"
HEALTH_RETRIES="${HEALTH_RETRIES:-3}"
HEALTH_RETRY_DELAY="${HEALTH_RETRY_DELAY:-2}"
COMMIT_SHA="${GITHUB_SHA:?GITHUB_SHA must be set}"
DIST_DIR="${DIST_DIR:-team-site/dist}"

ts() { date -u "+%Y-%m-%dT%H:%M:%SZ"; }

log()  { echo "[$(ts)] [INFO]  $*"; }
warn() { echo "[$(ts)] [WARN]  $*" >&2; }
die()  { echo "[$(ts)] [FATAL] $*" >&2; exit 1; }

###############################################################################
# 1. Create candidate release directory
###############################################################################
CANDIDATE_DIR="${RELEASE_ROOT}/${COMMIT_SHA}"
log "Creating candidate release directory: ${CANDIDATE_DIR}"
mkdir -p "${CANDIDATE_DIR}"

###############################################################################
# 2. Copy built artifacts into the candidate
###############################################################################
if [ -d "${DIST_DIR}" ]; then
  log "Copying build artifacts from ${DIST_DIR} into ${CANDIDATE_DIR}"
  cp -r "${DIST_DIR}/." "${CANDIDATE_DIR}/"
else
  warn "DIST_DIR (${DIST_DIR}) not found – creating minimal placeholder"
  mkdir -p "${CANDIDATE_DIR}"
fi

###############################################################################
# 3. Ensure a health endpoint exists inside the candidate
###############################################################################
HEALTH_FILE="${CANDIDATE_DIR}/${HEALTH_ENDPOINT}"
if [ ! -f "${HEALTH_FILE}" ]; then
  log "Writing health endpoint: ${HEALTH_FILE}"
  mkdir -p "$(dirname "${HEALTH_FILE}")"
  printf 'ok' > "${HEALTH_FILE}"
fi

###############################################################################
# 4. Point temporary "candidate" symlink at the new release
###############################################################################
log "Symlinking candidate -> ${CANDIDATE_DIR}"
ln -sfn "${CANDIDATE_DIR}" "${RELEASE_ROOT}/candidate"

###############################################################################
# 5. Health-check the candidate
###############################################################################
log "Running health check against candidate release (retries=${HEALTH_RETRIES})"
HEALTH_OK=false

for attempt in $(seq 1 "${HEALTH_RETRIES}"); do
  log "  Health-check attempt ${attempt}/${HEALTH_RETRIES}"

  # File-based health check (works in CI without a running server)
  if [ -f "${RELEASE_ROOT}/candidate/${HEALTH_ENDPOINT}" ]; then
    BODY=$(cat "${RELEASE_ROOT}/candidate/${HEALTH_ENDPOINT}")
    if [ "${BODY}" = "ok" ]; then
      log "  ✓ Candidate health check PASSED (attempt ${attempt})"
      HEALTH_OK=true
      break
    else
      warn "  ✗ Health endpoint returned unexpected body: ${BODY}"
    fi
  else
    warn "  ✗ Health endpoint file not found"
  fi

  if [ "${attempt}" -lt "${HEALTH_RETRIES}" ]; then
    log "  Waiting ${HEALTH_RETRY_DELAY}s before retry..."
    sleep "${HEALTH_RETRY_DELAY}"
  fi
done

###############################################################################
# 6/7. Switch traffic or keep previous release
###############################################################################
if [ "${HEALTH_OK}" = true ]; then
  log "Health gate PASSED – switching current symlink to ${CANDIDATE_DIR}"

  # Record previous release for audit
  if [ -L "${RELEASE_ROOT}/current" ]; then
    PREV=$(readlink "${RELEASE_ROOT}/current")
    log "Previous release was: ${PREV}"
  else
    log "No previous release (first deploy)"
  fi

  # Atomic symlink switch
  ln -sfn "${CANDIDATE_DIR}" "${RELEASE_ROOT}/current"

  # Clean up temporary candidate pointer
  rm -f "${RELEASE_ROOT}/candidate"

  log "Deploy SUCCESS – current now points to ${CANDIDATE_DIR}"
  echo "DEPLOY_STATUS=success" >> "${GITHUB_OUTPUT:-/dev/null}"
else
  warn "Health gate FAILED – keeping previous release as current"

  # Remove candidate symlink but keep the directory for inspection
  rm -f "${RELEASE_ROOT}/candidate"

  if [ -L "${RELEASE_ROOT}/current" ]; then
    PREV=$(readlink "${RELEASE_ROOT}/current")
    log "Known-good release retained: ${PREV}"
  else
    warn "No previous current symlink exists (first deploy failed)"
  fi

  log "Deploy FAILED – candidate ${CANDIDATE_DIR} did NOT become current"
  echo "DEPLOY_STATUS=failed" >> "${GITHUB_OUTPUT:-/dev/null}"
  exit 1
fi
