export function DashboardPage() {
  return (
    <section className="page">
      <div className="hero">
        <div className="status-badge">
          <span className="status-dot" />
          Dashboard scaffold
        </div>

        <h1>Weekly and monthly trend views will land here next.</h1>
        <p>
          This route will connect to `/api/logs`, subscribe to realtime updates
          and render the first chart cards once we build the daily log and data
          visualization milestones.
        </p>
      </div>

      <div className="grid grid-three">
        <article className="panel">
          <h2>Mood</h2>
          <p className="list-note">
            Placeholder card for the first trend line.
          </p>
          <div className="stat">--</div>
        </article>

        <article className="panel">
          <h2>Sleep</h2>
          <p className="list-note">
            Placeholder card for average sleep and quality.
          </p>
          <div className="stat">--</div>
        </article>

        <article className="panel">
          <h2>Stress</h2>
          <p className="list-note">
            Placeholder card for a weekly or monthly snapshot.
          </p>
          <div className="stat">--</div>
        </article>
      </div>
    </section>
  );
}
