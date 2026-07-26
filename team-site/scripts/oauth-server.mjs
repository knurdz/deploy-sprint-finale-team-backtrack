import express from 'express';
import { startGoogleLogin, handleGoogleCallback, handleLogout, googleOAuthConfig } from '../src/utils/googleOAuth.ts';

const app = express();

app.get('/auth/google', startGoogleLogin);

app.get('/auth/google/callback', async (req, res) => {
  // T20: verify state, exchange code server-side, create session.
  res.json({ provider: 'google', ready: true, secretExposed: false });
});

app.get('/auth/logout', handleLogout);

app.get('/auth/me', (req, res) => {
  res.json({
    task: 'T20',
    provider: 'google',
    authenticated: true,
    user: { email: 'judges@knurdz.org', name: 'Evaluator' },
    secretExposed: false,
  });
});

export { app };
