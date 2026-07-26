export const turnstileStatus = {
  task: 'T24',
  provider: 'cloudflare-turnstile',
  siteKeyPublic: true,
  secretKeyServerOnly: (() => {
    try {
      if (typeof process !== 'undefined' && process.env) {
        return Boolean(process.env.TURNSTILE_SECRET_KEY);
      }
    } catch (_) {}
    return false;
  })(),
  secretRedacted: true,
  allowedHostname: 'backtrack.deploysprint-finals.knurdz.org',
};

// Safe status logging
if (typeof console !== 'undefined' && console.log) {
  console.log('Turnstile status:', JSON.stringify(turnstileStatus));
}
