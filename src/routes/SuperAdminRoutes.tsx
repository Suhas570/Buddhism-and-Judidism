import { Routes, Route, Navigate } from "react-router-dom";
import { SADashboard } from "../pages/super-admin/SADashboard";
import { SAAdmins } from "../pages/super-admin/SAAdmins";
import { SACenters } from "../pages/super-admin/SACenters";
import { SAUsers } from "../pages/super-admin/SAUsers";
import { SAContent } from "../pages/super-admin/SAContent";
import { SADonations } from "../pages/super-admin/SADonations";
import { SAEvents } from "../pages/super-admin/SAEvents";
import { SAReports } from "../pages/super-admin/SAReports";
import { SASettings } from "../pages/super-admin/SASettings";
import { SAAudit } from "../pages/super-admin/SAAudit";

export function SuperAdminRoutes() {
  return (
    <Routes>
      <Route index element={<SADashboard />} />
      <Route path="admins" element={<SAAdmins />} />
      <Route path="centers" element={<SACenters />} />
      <Route path="users" element={<SAUsers />} />
      <Route path="content" element={<SAContent />} />
      <Route path="donations" element={<SADonations />} />
      <Route path="events" element={<SAEvents />} />
      <Route path="reports" element={<SAReports />} />
      <Route path="settings" element={<SASettings />} />
      <Route path="audit" element={<SAAudit />} />
      <Route path="*" element={<Navigate to="/super-admin" replace />} />
    </Routes>
  );
}
