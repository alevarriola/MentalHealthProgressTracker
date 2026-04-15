import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthQuery } from "../hooks/use-auth";

export function PublicOnlyRoute({ children }: PropsWithChildren) {
  const { data, isLoading } = useAuthQuery();

  if (isLoading) {
    return (
      <section className="page">
        <div className="panel">
          <h1>Checking your session...</h1>
          <p className="list-note">We are confirming whether you are already signed in.</p>
        </div>
      </section>
    );
  }

  if (data?.user) {
    return <Navigate replace to="/dashboard" />;
  }

  return <>{children}</>;
}
