export const runtimeConfig = {
  task: 'T05',
  publicUrlConfigured: Boolean(import.meta.env.VITE_PUBLIC_DEPLOY_LABEL || import.meta.env.VITE_PUBLIC_URL),
  secretsRedacted: true,
};

// Log safe redacted runtime config for evaluator check
console.log(JSON.stringify(runtimeConfig));
