import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthQuery } from "../hooks/use-auth";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { data, isLoading } = useAuthQuery();

  if (isLoading) {
    return (
      <section className="page">
        <div className="panel">
          <h1>Checking your session...</h1>
          <p className="list-note">Please wait a moment while we open your private view.</p>
        </div>
      </section>
    );
  }

  if (!data?.user) {
    return <Navigate replace to="/" />;
  }

  return <>{children}</>;
}
