import { useAuthQuery } from "../features/auth/hooks/use-auth";
import { DailyLogForm } from "../features/daily-log/components/daily-log-form";

export function DashboardPage() {
  const { data } = useAuthQuery();

  return (
    <section className="page">
      <div className="hero">
        <div className="status-badge">
          <span className="status-dot" />
          Personal dashboard
        </div>

        <h1>Daily check-in first, trends right after.</h1>
        <p>
          Record today&apos;s signals below. Trend cards will fill in as your
          entries start building up.
        </p>

        {data?.user ? (
          <div className="hero-user">
            <strong>{data.user.displayName ?? data.user.email}</strong>
            <span>{data.user.email}</span>
          </div>
        ) : null}
      </div>

      <DailyLogForm />

      <div className="grid grid-three">
        <article className="panel">
          <h2>Mood</h2>
          <p className="list-note">No trend data yet.</p>
          <div className="stat">Soon</div>
        </article>

        <article className="panel">
          <h2>Sleep</h2>
          <p className="list-note">Your first entries will shape this view.</p>
          <div className="stat">Soon</div>
        </article>

        <article className="panel">
          <h2>Stress</h2>
          <p className="list-note">A clearer weekly snapshot will appear here.</p>
          <div className="stat">Soon</div>
        </article>
      </div>
    </section>
  );
}
