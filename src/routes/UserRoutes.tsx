import { Routes, Route, Navigate } from "react-router-dom";
import { UserDashboard } from "../pages/user/UserDashboard";
import { UserLibrary } from "../pages/user/UserLibrary";
import { UserMeditation } from "../pages/user/UserMeditation";
import { UserEvents } from "../pages/user/UserEvents";
import { UserCommunity } from "../pages/user/UserCommunity";
import { UserDonations } from "../pages/user/UserDonations";
import { UserNotifications } from "../pages/user/UserNotifications";
import { UserProfile } from "../pages/user/UserProfile";

export function UserRoutes() {
  return (
    <Routes>
      <Route index element={<UserDashboard />} />
      <Route path="library" element={<UserLibrary />} />
      <Route path="meditation" element={<UserMeditation />} />
      <Route path="events" element={<UserEvents />} />
      <Route path="community" element={<UserCommunity />} />
      <Route path="courses" element={<UserDashboard />} />
      <Route path="donations" element={<UserDonations />} />
      <Route path="notifications" element={<UserNotifications />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  );
}
