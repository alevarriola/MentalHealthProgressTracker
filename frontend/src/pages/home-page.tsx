import { Link, useSearchParams } from "react-router-dom";
import { GoogleLoginButton } from "../features/auth/components/google-login-button";
import { useAuthQuery } from "../features/auth/hooks/use-auth";

export function HomePage() {
  const { data } = useAuthQuery();
  const [searchParams] = useSearchParams();
  const authError = searchParams.get("error");

  return (
    <section className="page">
      <div className="hero">
        <div className="status-badge">
          <span className="status-dot" />
          Daily reflection space
        </div>

        <h1>Track daily signals with a calmer, clearer flow.</h1>
        <p>
          A simple space to log how the day felt, notice patterns over time and
          keep the experience gentle rather than overwhelming.
        </p>

        {authError === "oauth_failed" ? (
          <div className="inline-alert error">
            Sign-in could not be completed. Please try again and choose an account.
          </div>
        ) : null}

        <div className="hero-actions">
          {data?.user ? (
            <Link className="button button-primary" to="/dashboard">
              Open dashboard
            </Link>
          ) : (
            <GoogleLoginButton label="Start check-in" />
          )}

          {data?.user ? (
            <Link className="button button-secondary" to="/dashboard#trends-overview">
              View trends
            </Link>
          ) : null}
        </div>
      </div>

      <div className="grid grid-three">
        <article className="panel">
          <h2>Private by default</h2>
          <p>
            Sign-in keeps personal data behind an authenticated flow before any
            health entries or trends are shown.
          </p>
        </article>

        <article className="panel">
          <h2>Fast daily entry</h2>
          <p>
            The form is designed to be short enough for a regular habit instead
            of feeling like a long clinical questionnaire.
          </p>
        </article>

        <article className="panel">
          <h2>Trend-focused</h2>
          <p>
            The dashboard will surface a few meaningful signals rather than too
            many charts competing for attention.
          </p>
        </article>
      </div>
    </section>
  );
}
