import { GoogleLoginButton } from "../features/auth/components/google-login-button";

export function LoginPage() {
  return (
    <section className="page">
      <div className="hero">
        <div className="status-badge">
          <span className="status-dot" />
          Secure sign-in
        </div>

        <h1>Sign in before logging daily progress.</h1>
        <p>
          Continue with Google to keep your daily entries tied to your own
          account and unlock the private dashboard area.
        </p>

        <div className="button-row">
          <GoogleLoginButton />
        </div>

        <ul className="mini-list">
          <li>Your entries stay behind a signed-in session.</li>
          <li>You can come back later and keep building the same history.</li>
          <li>The dashboard opens only after your session is confirmed.</li>
        </ul>
      </div>
    </section>
  );
}
