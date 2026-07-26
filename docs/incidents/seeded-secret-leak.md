# Seeded Secret Leak Drill & Prevention Record

## Incident Overview
During the T27 Secret Leak Drill, a seeded token pattern was identified. 

## Cleanup & Rotation Verification
1. **Source Code Cleanup**: Removed all occurrences of the seeded test token pattern from repository source code and workflow files.
2. **Automated Secret Scanning**: Integrated a strict T27 secret scanner into the CI workflow (`.github/workflows/ci.yml`) to scan for private keys, personal access tokens (`github_pat_`, `ghp_`), and secret key patterns before build steps.
3. **Secret Storage Policy**: All API keys and tokens must be stored exclusively in GitHub Secrets and injected via server-side environment variables without exposure to client-side bundles (`VITE_`).

## Verification
- T27 automated secret scan: **PASSED**
- Raw secret patterns in repository: **0 found**
