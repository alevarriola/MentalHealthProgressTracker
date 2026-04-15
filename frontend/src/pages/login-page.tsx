import { GoogleLoginButton } from "../features/auth/components/google-login-button";

export function LoginPage() {
  return (
    <section className="page">
      <div className="hero">
        <div className="status-badge">
          <span className="status-dot" />
          Google OAuth backend connected
        </div>

        <h1>Sign in before logging daily progress.</h1>
        <p>
          The backend authentication flow is already live. After signing in, the
          app keeps your session and unlocks the protected dashboard flow.
        </p>

        <div className="button-row">
          <GoogleLoginButton />
        </div>

        <ul className="mini-list">
          <li>Google handles authentication and redirects back to the app.</li>
          <li>Your session cookie stays on the backend for safer auth handling.</li>
          <li>Protected routes only render when `/api/auth/me` confirms the user.</li>
        </ul>
      </div>
    </section>
  );
}
