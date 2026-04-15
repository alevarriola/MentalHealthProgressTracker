import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/layout/app-shell";
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
        element: <LoginPage />
      },
      {
        path: "dashboard",
        element: <DashboardPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
