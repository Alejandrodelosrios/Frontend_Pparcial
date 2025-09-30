import { useUser } from "@/hooks/useUser"; // hook que maneja sesión
import ProtectedRoute from "@/components/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import { PathNames } from "./paths";
import Welcome from "@/pages/Welcome";
import Register from "@/pages/Register";
import Login from "@/modulos/gestion de usuarios/pages/Login";
import Dashboard from "@/pages/dashboard";
import CanvaPage from "@/modulos/Diagramas/pages/CanvaPage";
import HistorialPage from "@/modulos/gestion de proyectos/pages/HistorialPage";
import EndpointsPage from "@/modulos/Generacion de Backend/EndpointGenerado";
import { RestoreVersionsPage } from "@/modulos/gestion de proyectos/pages/VersionControl";

export default function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path={PathNames.WELCOME} element={<Welcome />} />
      <Route path={PathNames.REGISTER} element={<Register />} />
      <Route path={PathNames.LOGIN} element={<Login />} />

      {/* Páginas protegidas */}
      <Route
        path={PathNames.HOME}
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={PathNames.DIAGRAMA()}
        element={
          <ProtectedRoute user={user}>
            <CanvaPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={PathNames.HISTORIAL_CAMBIOS}
        element={
          <ProtectedRoute user={user}>
            <HistorialPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={PathNames.ENDPOINT_GENERADO}
        element={
          <ProtectedRoute user={user}>
            <EndpointsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={PathNames.RESTORE_VERSION}
        element={
          <ProtectedRoute user={user}>
            <RestoreVersionsPage />
          </ProtectedRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to={PathNames.WELCOME} replace />} />
    </Routes>
  );
}
