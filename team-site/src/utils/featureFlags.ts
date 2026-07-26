export function featureFlags() {
  const showInsights =
    (typeof process !== 'undefined' && process.env && process.env.FEATURE_SHOW_INSIGHTS === 'true') ||
    (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_FEATURE_SHOW_INSIGHTS === 'true' || import.meta.env.FEATURE_SHOW_INSIGHTS === 'true'));

  return {
    task: 'T15',
    showInsights: Boolean(showInsights),
    valueRedacted: true,
  };
}

// Safe status logging
if (typeof console !== 'undefined' && console.log) {
  console.log('Feature flags status:', JSON.stringify(featureFlags()));
}
