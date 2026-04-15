import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="shell">
      <section className="page">
        <div className="hero">
          <h1>Page not found.</h1>
          <p>The route you tried does not exist in this assessment build.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
