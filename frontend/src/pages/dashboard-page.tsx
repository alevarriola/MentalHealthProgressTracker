import { useMemo, useState } from "react";
import { useAuthQuery } from "../features/auth/hooks/use-auth";
import { DailyLogForm } from "../features/daily-log/components/daily-log-form";
import { TrendsChart } from "../features/dashboard/components/trends-chart";
import { useDashboardLogs } from "../features/dashboard/hooks/use-dashboard-logs";
import { useDashboardRealtime } from "../features/dashboard/hooks/use-dashboard-realtime";
import {
  buildDashboardSummary,
  buildTrendPoints
} from "../features/dashboard/lib/trends";
import type { DashboardRange } from "../features/dashboard/types";

export function DashboardPage() {
  const { data } = useAuthQuery();
  const [range, setRange] = useState<DashboardRange>("weekly");
  const logsQuery = useDashboardLogs(range);
  const realtime = useDashboardRealtime();

  const logs = logsQuery.data?.logs ?? [];
  const summary = useMemo(() => buildDashboardSummary(logs), [logs]);
  const trendData = useMemo(() => buildTrendPoints(logs, range), [logs, range]);

  return (
    <section className="page">
      <div className="hero">
        <div className="hero-header">
          <div className="status-badge">
            <span className="status-dot" />
            Personal dashboard
          </div>

          {data?.user ? (
            <div className="hero-user-inline">
              <strong>{data.user.displayName ?? data.user.email}</strong>
              <span>{data.user.email}</span>
            </div>
          ) : null}
        </div>

        <h1>Daily check-in first, trends right after.</h1>
        <p>
          Record today&apos;s signals below. Trend cards will fill in as your
          entries start building up.
        </p>
      </div>

      <DailyLogForm />

      <section className="panel dashboard-panel">
        <div className="dashboard-header">
          <div>
            <h2>Trends overview</h2>
            <p className="list-note">
              A compact view of mood, anxiety and stress over your recent entries.
            </p>
          </div>

          <div className="dashboard-controls">
            <span
              className={
                realtime.isConnected
                  ? "status-badge realtime-badge online"
                  : "status-badge realtime-badge"
              }
            >
              <span className="status-dot" />
              {realtime.isConnected ? "Realtime connected" : "Realtime reconnecting"}
            </span>

            <div className="range-toggle" aria-label="Trend range selector">
              <button
                className={range === "weekly" ? "toggle-chip active" : "toggle-chip"}
                onClick={() => setRange("weekly")}
                type="button"
              >
                Weekly
              </button>
              <button
                className={range === "monthly" ? "toggle-chip active" : "toggle-chip"}
                onClick={() => setRange("monthly")}
                type="button"
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-three">
          <article className="panel metric-card">
            <h3>Mood average</h3>
            <div className="stat">
              {summary.totalEntries ? summary.averageMood.toFixed(1) : "--"}
            </div>
            <p className="list-note">
              Based on {summary.totalEntries || 0} entries in this range.
            </p>
          </article>

          <article className="panel metric-card">
            <h3>Anxiety average</h3>
            <div className="stat">
              {summary.totalEntries ? summary.averageAnxiety.toFixed(1) : "--"}
            </div>
            <p className="list-note">Higher numbers mean more noticeable anxiety.</p>
          </article>

          <article className="panel metric-card">
            <h3>Stress average</h3>
            <div className="stat">
              {summary.totalEntries ? summary.averageStress.toFixed(1) : "--"}
            </div>
            <p className="list-note">A quick snapshot of recent pressure levels.</p>
          </article>
        </div>

        {logsQuery.isLoading ? (
          <div className="empty-state">
            <h3>Loading your recent entries...</h3>
            <p>We&apos;re preparing the dashboard view for this range.</p>
          </div>
        ) : null}

        {logsQuery.isError ? (
          <div className="empty-state">
            <h3>We couldn&apos;t load the dashboard just now.</h3>
            <p>Try refreshing after confirming the backend is still running.</p>
          </div>
        ) : null}

        {!logsQuery.isLoading && !logsQuery.isError && trendData.length === 0 ? (
          <div className="empty-state">
            <h3>No entries yet for this range.</h3>
            <p>
              Save your first daily log and the chart will start reflecting mood,
              anxiety and stress over time.
            </p>
          </div>
        ) : null}

        {!logsQuery.isLoading && !logsQuery.isError && trendData.length > 0 ? (
          <TrendsChart data={trendData} />
        ) : null}
      </section>

    </section>
  );
}
