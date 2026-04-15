import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logFrontendInfo } from "../lib/logger";

export function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    logFrontendInfo("route_view", {
      path: location.pathname
    });
  }, [location.pathname]);

  return null;
}
