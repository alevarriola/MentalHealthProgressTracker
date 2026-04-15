import { apiBaseUrl } from "../../../lib/api";

type GoogleLoginButtonProps = {
  className?: string;
  label?: string;
};

export function GoogleLoginButton({
  className,
  label = "Continue with Google"
}: GoogleLoginButtonProps) {
  return (
    <a
      className={["button", "button-primary", className].filter(Boolean).join(" ")}
      href={`${apiBaseUrl}/auth/google`}
    >
      {label}
    </a>
  );
}
