import { NavLink, Outlet } from "react-router-dom";

function navClassName({ isActive }: { isActive: boolean }) {
  return isActive ? "nav-link active" : "nav-link";
}

export function AppShell() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">Assessment Build</span>
          <span className="brand-title">Mental Health Progress Tracker</span>
        </div>

        <nav className="nav-links" aria-label="Primary">
          <NavLink className={navClassName} to="/">
            Home
          </NavLink>
          <NavLink className={navClassName} to="/login">
            Login
          </NavLink>
          <NavLink className={navClassName} to="/dashboard">
            Dashboard
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
