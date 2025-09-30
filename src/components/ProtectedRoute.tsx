import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: any; // puede ser tu tipo de usuario
  children: JSX.Element;
}

export default function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) {
    // Redirige al login si no hay usuario
    return <Navigate to="/login" replace />;
  }

  return children;
}
