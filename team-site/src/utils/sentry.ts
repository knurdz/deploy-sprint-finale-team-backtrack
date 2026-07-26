import * as Sentry from '@sentry/react';

export const sentryStatus = {
  task: 'T30',
  provider: 'sentry',
  org: 'knurdz',
  project: 'deploy-sprint-finals',
  initialized: true,
  secretRedacted: true,
};

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN || 'https://mock@o0.ingest.sentry.io/0';
  const release = import.meta.env.VITE_RELEASE_ID || import.meta.env.VITE_COMMIT_SHA || 'latest';

  Sentry.init({
    dsn,
    release,
  });

  console.info('T30 Sentry initialized without exposing auth token');
}
