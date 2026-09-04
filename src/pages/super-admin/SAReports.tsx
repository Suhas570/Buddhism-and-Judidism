import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { engagementData } from "../../data/chartData";

export function SAReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Reports & Analytics</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Platform-wide engagement and growth insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
          <h2 className="font-display font-semibold text-base text-[#2B2420] mb-5">Content Engagement</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={engagementData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1E9DA" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #F1E9DA", borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#8A7F6E" }} />
              <Bar dataKey="teachings" fill="#E8A33D" radius={[4, 4, 0, 0]} name="Teachings" />
              <Bar dataKey="events" fill="#C9A227" radius={[4, 4, 0, 0]} name="Events" />
              <Bar dataKey="forum" fill="#7A2E2E" radius={[4, 4, 0, 0]} name="Forum Posts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
          <h2 className="font-display font-semibold text-base text-[#2B2420] mb-5">Forum Activity Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1E9DA" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #F1E9DA", borderRadius: 12, fontSize: 12 }} />
              <Line type="monotone" dataKey="forum" stroke="#7A2E2E" strokeWidth={2.5} dot={{ r: 3, fill: "#7A2E2E", strokeWidth: 0 }} name="Forum Posts" />
              <Line type="monotone" dataKey="teachings" stroke="#E8A33D" strokeWidth={2.5} dot={{ r: 3, fill: "#E8A33D", strokeWidth: 0 }} name="Teachings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
