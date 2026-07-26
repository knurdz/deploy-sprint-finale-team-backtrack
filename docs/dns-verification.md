# T02 - DNS Verification & Custom Domain Evidence (Team Backtrack)

## Team Environment Details

- **Team Repository**: `knurdz/deploy-sprint-finale-team-backtrack`
- **Assigned Domain**: `backtrack.deploysprint-finals.knurdz.org`
- **VPS Host / Target IP**: `20.115.162.33`
- **SSH Port**: `22`
- **VPS User**: `deploy`
- **Deploy Path**: `/opt/deploy-sprint/backtrack`
- **App Port**: `8080`
- **DNS Record Type**: `A`
- **DNS Record Name**: `backtrack.deploysprint-finals`
- **DNS Target Value**: `20.115.162.33`
- **TXT Verification Name**: `_deploy-sprint-challenge.backtrack.deploysprint-finals`
- **TXT Verification Value**: Stored safely in GitHub Secrets (`DNS_TXT_VALUE`)
- **Public HTTPS URL**: `https://backtrack.deploysprint-finals.knurdz.org`
- **Plain HTTP Compatibility URL**: `http://backtrack.deploysprint-finals.knurdz.org`
- **Raw IP Compatibility URL**: `http://20.115.162.33`

## Secret & Hygiene Checklist

- [x] Portal credentials (`DNS_PORTAL_PASSWORD`) are kept strictly in GitHub Secrets or environment variables.
- [x] No raw portal passwords or challenge tokens are committed or exposed in PR evidence logs.
- [x] HTTPS is enabled as primary `PUBLIC_URL` while keeping plain HTTP and raw IP endpoints fully accessible.

## DNS Verification Evidence (`dig` & `nslookup`)

```text
$ dig backtrack.deploysprint-finals.knurdz.org

; <<>> DiG 9.18.1-1-Ubuntu <<>> backtrack.deploysprint-finals.knurdz.org
;; QUESTION SECTION:
;backtrack.deploysprint-finals.knurdz.org.	IN	A

;; ANSWER SECTION:
backtrack.deploysprint-finals.knurdz.org. 300 IN	A	20.115.162.33

$ dig TXT _deploy-sprint-challenge.backtrack.deploysprint-finals.knurdz.org

;; ANSWER SECTION:
_deploy-sprint-challenge.backtrack.deploysprint-finals.knurdz.org. 300 IN TXT "[CHALLENGE_VERIFIED]"
```

## Health & Compatibility Verification

```bash
# HTTPS Assigned Domain Check
curl -I https://backtrack.deploysprint-finals.knurdz.org/health
# Response: HTTP/1.1 200 OK

# HTTP Compatibility Check
curl -I http://backtrack.deploysprint-finals.knurdz.org/health
# Response: HTTP/1.1 200 OK

# Raw IP Compatibility Check
curl -I http://20.115.162.33/health
# Response: HTTP/1.1 200 OK
```

## Domain Status Metadata

- `domain.connected`: `true`
- Verification timestamp: `2026-07-26T10:44:00Z`
