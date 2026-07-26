/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_RELEASE_ID?: string;
  readonly VITE_COMMIT_SHA?: string;
  readonly VITE_PUBLIC_DEPLOY_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const process: {
  env: Record<string, string | undefined>;
};
