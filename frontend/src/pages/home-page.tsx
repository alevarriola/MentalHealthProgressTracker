import { Link } from "react-router-dom";
import { useAuthQuery } from "../features/auth/hooks/use-auth";

export function HomePage() {
  const { data } = useAuthQuery();
  const ctaTo = data?.user ? "/dashboard" : "/login";
  const ctaLabel = data?.user ? "Go to dashboard" : "Start with authentication";

  return (
    <section className="page">
      <div className="hero">
        <div className="status-badge">
          <span className="status-dot" />
          Frontend bootstrap ready
        </div>

        <h1>Track daily signals with a calmer, clearer flow.</h1>
        <p>
          This frontend shell is ready for Google auth, daily logs, charts and
          real-time dashboard refreshes without needing to restructure the app
          later.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to={ctaTo}>
            {ctaLabel}
          </Link>
          <Link className="button button-secondary" to="/dashboard">
            Preview dashboard shell
          </Link>
        </div>
      </div>

      <div className="grid grid-three">
        <article className="panel">
          <h2>Auth-ready</h2>
          <p>
            Router and providers are in place so the Google login flow can plug
            into the backend immediately, including protected routes and session
            state.
          </p>
        </article>

        <article className="panel">
          <h2>Feature-oriented</h2>
          <p>
            The structure leaves room for separate auth, daily-log and dashboard
            modules without tangling logic into pages.
          </p>
        </article>

        <article className="panel">
          <h2>Realtime-ready</h2>
          <p>
            The app is prepared to subscribe to `dashboard:updated` and refetch
            chart data when new logs arrive.
          </p>
        </article>
      </div>
    </section>
  );
}
