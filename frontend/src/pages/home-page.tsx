import { Link } from "react-router-dom";

export function HomePage() {
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
          <Link className="button button-primary" to="/login">
            Start with authentication
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
            into the backend immediately.
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
