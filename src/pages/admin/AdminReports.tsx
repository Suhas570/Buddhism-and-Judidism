import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { engagementData } from "../../data/chartData";

export function AdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Reports</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Center attendance and engagement summary</p>
      </div>
      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
        <h2 className="font-display font-semibold text-base text-[#2B2420] mb-5">Monthly Engagement</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={engagementData} barSize={22}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1E9DA" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #F1E9DA", borderRadius: 12, fontSize: 12 }} />
            <Bar dataKey="teachings" fill="#E8A33D" radius={[4, 4, 0, 0]} name="Teachings Viewed" />
            <Bar dataKey="forum" fill="#7A2E2E" radius={[4, 4, 0, 0]} name="Forum Posts" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
