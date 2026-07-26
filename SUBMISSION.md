# Deploy Sprint Finale Submission

Complete this file on `main` as tasks are completed. Do not paste secrets, private keys, token values, or screenshots that reveal credentials.

## Team

- Team name: backtrack
- Team members: inusha-thathsara, sadissanushka, jayanathsp-24, kaushalyawijesiri0-lang
- Live IP URL: http://20.115.162.33
- Assigned domain URL: https://backtrack.deploysprint-finals.knurdz.org
- Repository URL: https://github.com/knurdz/deploy-sprint-finale-team-backtrack

## Release Evidence

- Current production commit: 363ac6cc483d574662e5c726b64c9417e3bd9b1f
- Current artifact/image identifier: site-dist-363ac6cc483d574662e5c726b64c9417e3bd9b1f
- Current deployment workflow run: 30192244792
- Current release manifest path or URL: http://20.115.162.33/status
- Notes on live evidence or fallback evidence: All live endpoints (/health, /status, domain, contact service, weather widget) active and healthy.

## Score Summary

- Automated points out of 800: Pending dashboard calculation
- Judge points out of 200: Pending judge evaluation
- Final total points out of 1000: Pending

## Completed Tasks

Use this section for short public notes and links. Full task instructions and checks are in the finalist dashboard.

| Task | PR | Evidence | Notes |
| --- | --- | --- | --- |
| T01 | #5 | http://20.115.162.33/health | Deployed team site with health and status evidence |
| T02 | #6 | https://backtrack.deploysprint-finals.knurdz.org/status | Connected custom domain with A record, TXT challenge, and status metadata |
| T03 | #7 | .github/workflows/deploy.yml | Configured single artifact build and deployment flow |
| T04 | #12 | .github/workflows/rollback.yml | Implemented workflow_dispatch rollback workflow with release_ref input |
| T05 |  |  |  |
| T06 | #31 | .github/workflows/ci.yml | Configured CI build gate with Node 20, npm ci, npm run build, and site-dist artifact upload |
| T07 | #29 | team-site/src/components/WeatherWidget.tsx | Integrated OpenWeather widget with deploy-time API key fetching and safe weather status evidence |
| T08 | #20 | team-site/src/components/LearningVelocity.tsx | Rebased organizer feature branch task-assets/rebase-feature bringing in LearningVelocity component |
| T09 | #25 | team-site/src/data/deadlines.ts | Merged task-assets/conflict-merge preserving both repo-setup-checkpoint and merge-conflict-lab deadline cards |
| T10 | #13 | team-site/src/components/ContactForm.tsx | Integrated Web3Forms contact service with WEB3FORMS_ACCESS_KEY secret |
| T11 | #27 | .github/workflows/preview.yml | Configured PR preview workflow publishing preview artifact and workflow summary evidence |
| T12 | #23 | .github/workflows/ci.yml | Configured lockfile-based npm caching using setup-node with cache-dependency-path team-site/package-lock.json and npm ci |
| T13 | #22 | team-site/src/components/ReleaseReadiness.tsx | Applied feature bundle with release readiness component, test script, and removed internal AI markers |
| T14 | #28 | team-site/Dockerfile | Created multi-stage production Dockerfile using node:20-alpine and nginx:alpine |
| T15 | #30 | team-site/src/utils/featureFlags.ts | Runtime feature flag FEATURE_SHOW_INSIGHTS integrated with safe redacted status evidence |

| T16 | #32 | team-site/scripts/send-email-alert.mjs | Integrated Resend transactional email alert script with safe RESEND_API_KEY secret handling and status evidence |
| T17 |  |  |  |
| T18 | #32 | .github/workflows/ci.yml | Built Docker container image deploy-sprint/team-site:$GITHUB_SHA and submitted containerized deploy request on APP_PORT 8080 |
| T19 |  |  |  |
| T20 | Pending | team-site/src/utils/googleOAuth.ts | Implemented server-side Google OAuth routes (/auth/google, callback, logout, me) with GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and SESSION_SECRET |
| T19 | #34 | .github/workflows/deploy.yml | Implemented post-deploy smoke tests validating /, /health, and /status with non-zero failure exit code |
| T20 |  |  |  |
| T21 |  |  |  |
| T22 | #43 | docker-compose.yml | Created docker-compose.yml for app runtime using project name deploy-sprint-backtrack and placeholder .env template |
| T21 | [T21] Least-Privilege And Concurrency | .github/workflows/deploy.yml | Configured least-privilege permissions (contents: read, actions: read) and deploy-backtrack-production concurrency group with safe cancellation behavior |
| T22 |  |  |  |
| T23 | [T23] Release Evidence Manifest | release-manifest.json | Generated release evidence manifest containing commit SHA, artifact identity, workflow run ID, deploy time, and task markers |
| T24 |  |  |  |
| T25 |  |  |  |
| T26 |  |  |  |
| T27 |  |  |  |
| T28 | [T28] Race-Safe Idempotent Deploy | .github/workflows/deploy.yml | Implemented race-safe deployment lock (deploy-sprint-backtrack.lock), retry-safe directory operations, and idempotent rerun logs |
| T29 | [T29] Disaster Recovery From Actions Only | .github/workflows/disaster-recovery.yml | Implemented Actions-only disaster recovery workflow with recovery_ref input, step summary evidence, and zero direct VPS editing |
| T30 |  |  |  |

## Public Notes

List anything judges should know without exposing credentials or private infrastructure details.
