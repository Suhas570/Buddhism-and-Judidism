import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminMembers } from "../pages/admin/AdminMembers";
import { AdminContent } from "../pages/admin/AdminContent";
import { AdminEvents } from "../pages/admin/AdminEvents";
import { AdminCommunity } from "../pages/admin/AdminCommunity";
import { AdminDonations } from "../pages/admin/AdminDonations";
import { AdminAnnouncements } from "../pages/admin/AdminAnnouncements";
import { AdminReports } from "../pages/admin/AdminReports";

export function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="members" element={<AdminMembers />} />
      <Route path="content" element={<AdminContent />} />
      <Route path="content/*" element={<AdminContent />} />
      <Route path="events" element={<AdminEvents />} />
      <Route path="courses" element={<AdminDashboard />} />
      <Route path="community" element={<AdminCommunity />} />
      <Route path="donations" element={<AdminDonations />} />
      <Route path="announcements" element={<AdminAnnouncements />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
