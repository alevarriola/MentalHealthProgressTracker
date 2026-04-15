import { apiBaseUrl } from "../../../lib/api";

export function GoogleLoginButton() {
  return (
    <a className="button button-primary" href={`${apiBaseUrl}/auth/google`}>
      Continue with Google
    </a>
  );
}
