import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthQuery } from "../hooks/use-auth";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const { data, isLoading } = useAuthQuery();

  if (isLoading) {
    return (
      <section className="page">
        <div className="panel">
          <h1>Checking your session...</h1>
          <p className="list-note">
            We are confirming your Google login before loading protected content.
          </p>
        </div>
      </section>
    );
  }

  if (!data?.user) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <>{children}</>;
}
