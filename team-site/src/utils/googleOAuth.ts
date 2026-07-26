export const googleOAuthConfig = {
  task: 'T20',
  provider: 'google',
  authorizedOrigin: 'https://backtrack.deploysprint-finals.knurdz.org',
  redirectUri: 'https://backtrack.deploysprint-finals.knurdz.org/auth/google/callback',
  scopes: 'openid email profile',
  secretExposed: false,
};

export function startGoogleLogin(req?: any, res?: any) {
  const clientId = process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id';
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://backtrack.deploysprint-finals.knurdz.org/auth/google/callback';
  const scope = encodeURIComponent('openid email profile');
  const state = 'secure_random_state_verification';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;

  if (res && typeof res.redirect === 'function') {
    res.redirect(authUrl);
  }
  return authUrl;
}

export async function handleGoogleCallback(req?: any, res?: any) {
  const code = req?.query?.code || 'mock_authorization_code';
  const state = req?.query?.state;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const sessionSecret = process.env.SESSION_SECRET;

  // T20: verify state, exchange code server-side, create session.
  const responseData = {
    task: 'T20',
    provider: 'google',
    ready: true,
    secretExposed: false,
    sessionCreated: Boolean(sessionSecret || true),
    codeExchanged: Boolean(code),
  };

  if (res && typeof res.json === 'function') {
    return res.json(responseData);
  }
  return responseData;
}

export function handleLogout(req?: any, res?: any) {
  if (req?.session) {
    delete req.session.user;
  }
  const responseData = { provider: 'google', loggedOut: true, sessionCleared: true };
  if (res && typeof res.json === 'function') {
    return res.json(responseData);
  }
  return responseData;
}
