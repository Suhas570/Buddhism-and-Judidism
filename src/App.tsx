import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider, useRole } from "./context/RoleContext";
import { LandingPage } from "./pages/LandingPage";
import { AppLayout } from "./layouts/AppLayout";
import { SuperAdminRoutes } from "./routes/SuperAdminRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { UserRoutes } from "./routes/UserRoutes";

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole: string }) {
  const { role } = useRole();
  if (role !== requiredRole) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Navigate to="/" replace />} />

      <Route
        path="/super-admin/*"
        element={
          <ProtectedRoute requiredRole="super-admin">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<SuperAdminRoutes />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<AdminRoutes />} />
      </Route>

      <Route
        path="/user/*"
        element={
          <ProtectedRoute requiredRole="user">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<UserRoutes />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RoleProvider>
  );
}
