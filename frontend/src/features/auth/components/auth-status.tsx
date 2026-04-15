import { useNavigate } from "react-router-dom";
import { useAuthQuery, useLogoutMutation } from "../hooks/use-auth";
import { GoogleLoginButton } from "./google-login-button";

export function AuthStatus() {
  const { data, isLoading } = useAuthQuery();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <span className="auth-chip">Checking session...</span>;
  }

  if (!data?.user) {
    return (
      <GoogleLoginButton
        className="button-compact topbar-signin"
        label="Continue with Google"
      />
    );
  }

  return (
    <div className="auth-profile">
      {data.user.avatarUrl ? (
        <img
          alt={data.user.displayName ?? data.user.email}
          className="avatar"
          src={data.user.avatarUrl}
        />
      ) : (
        <div className="avatar avatar-fallback">
          {(data.user.displayName ?? data.user.email).slice(0, 1).toUpperCase()}
        </div>
      )}

      <div className="auth-copy">
        <strong>{data.user.displayName ?? "Signed in"}</strong>
        <span>{data.user.email}</span>
      </div>

      <button
        className="button button-secondary button-compact"
        disabled={logoutMutation.isPending}
        onClick={() =>
          logoutMutation.mutate(undefined, {
            onSuccess: () => {
              navigate("/", { replace: true });
            }
          })
        }
        type="button"
      >
        {logoutMutation.isPending ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}
