import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/layout/app-shell";
import { ProtectedRoute } from "../features/auth/components/protected-route";
import { PublicOnlyRoute } from "../features/auth/components/public-only-route";
import { DashboardPage } from "../pages/dashboard-page";
import { HomePage } from "../pages/home-page";
import { LoginPage } from "../pages/login-page";
import { NotFoundPage } from "../pages/not-found-page";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        )
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
