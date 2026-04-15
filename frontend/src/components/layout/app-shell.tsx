import { RouteLogger } from "../../app/route-logger";
import { NavLink, Outlet } from "react-router-dom";
import { AuthStatus } from "../../features/auth/components/auth-status";
import { useAuthQuery } from "../../features/auth/hooks/use-auth";

function navClassName({ isActive }: { isActive: boolean }) {
  return isActive ? "nav-link active" : "nav-link";
}

export function AppShell() {
  const { data } = useAuthQuery();

  return (
    <div className="shell">
      <RouteLogger />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">Assessment Build</span>
          <span className="brand-title">Mental Health Progress Tracker</span>
        </div>

        <div className="topbar-actions">
          <nav className="nav-links" aria-label="Primary">
            <NavLink className={navClassName} to="/">
              Home
            </NavLink>
            {data?.user ? (
              <NavLink className={navClassName} to="/dashboard">
                Dashboard
              </NavLink>
            ) : null}
          </nav>

          <AuthStatus />
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
