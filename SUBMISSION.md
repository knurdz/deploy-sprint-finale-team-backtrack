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
| T05 | #2 | team-site/src/utils/config.ts | Implemented runtime config separation with VITE_ build variable and secret token |
| T06 | #11 | .github/workflows/ci.yml | Configured CI build gate with Node 20, npm ci, npm run build, and site-dist artifact upload |
| T07 | #17 | team-site/src/components/WeatherWidget.tsx | Integrated OpenWeather widget with deploy-time API key fetching and safe weather status evidence |
| T08 |  |  |  |
| T09 |  |  |  |
| T10 | #13 | team-site/src/components/ContactForm.tsx | Integrated Web3Forms contact service with WEB3FORMS_ACCESS_KEY secret |
| T11 |  |  |  |
| T12 |  |  |  |
| T13 |  |  |  |
| T14 |  |  |  |
| T15 |  |  |  |
| T16 |  |  |  |
| T17 |  |  |  |
| T18 |  |  |  |
| T19 |  |  |  |
| T20 |  |  |  |
| T21 |  |  |  |
| T22 |  |  |  |
| T23 |  |  |  |
| T24 |  |  |  |
| T25 |  |  |  |
| T26 |  |  |  |
| T27 |  |  |  |
| T28 |  |  |  |
| T29 |  |  |  |
| T30 |  |  |  |

## Public Notes

List anything judges should know without exposing credentials or private infrastructure details.
