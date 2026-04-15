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
          The backend authentication flow is already live. This page is the
          frontend entry point that will later gain session awareness and logout
          controls.
        </p>

        <div className="button-row">
          <GoogleLoginButton />
        </div>
      </div>
    </section>
  );
}
