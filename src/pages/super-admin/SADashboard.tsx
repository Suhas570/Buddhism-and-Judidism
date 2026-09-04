import { useEffect, useState } from "react";
import { Users, Building2, ShieldCheck, DollarSign, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { StatCard } from "../../components/StatCard";
import { memberGrowth, donationsByCenter } from "../../data/chartData";
import { apiGet } from "../../lib/api";
import type { DashboardSummary } from "../../lib/types";

const typeColors: Record<string, string> = {
  member: "bg-[#E8F4E3] text-[#6B8E5A]",
  content: "bg-[#FDF4E7] text-[#E8A33D]",
  donation: "bg-[#EAE3F5] text-[#7A2E2E]",
  event: "bg-[#E3EFF5] text-[#2E6B7A]",
};

export function SADashboard() {
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    apiGet<DashboardSummary>("/dashboard", "super-admin").then(setDashboard);
  }, []);

  const recentActivity = dashboard
    ? [
        ...dashboard.recent.users.slice(0, 2).map((user) => ({
          id: `user-${user.id}`,
          action: "Member record",
          detail: `${user.name} - ${user.center}`,
          time: user.joined,
          type: "member",
        })),
        ...dashboard.recent.teachings.slice(0, 2).map((teaching) => ({
          id: `teaching-${teaching.id}`,
          action: "Teaching",
          detail: `${teaching.title} by ${teaching.author}`,
          time: teaching.date,
          type: "content",
        })),
        ...dashboard.recent.donations.slice(0, 2).map((donation) => ({
          id: `donation-${donation.id}`,
          action: "Donation received",
          detail: `$${donation.amount} from ${donation.donor} - ${donation.purpose}`,
          time: donation.date,
          type: "donation",
        })),
        ...dashboard.recent.events.slice(0, 2).map((event) => ({
          id: `event-${event.id}`,
          action: "Event",
          detail: `${event.title} - ${event.center}`,
          time: event.date,
          type: "event",
        })),
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Platform Overview</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">All centers - live database data</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Members" value={dashboard?.totals.members ?? 0} sub="Across all centers" icon={<Users size={18} />} trend={{ value: "MongoDB live", positive: true }} />
        <StatCard label="Active Centers" value={dashboard?.totals.centers ?? 0} sub="Registered centers" icon={<Building2 size={18} />} />
        <StatCard label="Total Admins" value={dashboard?.totals.admins ?? 0} sub="Platform admins" icon={<ShieldCheck size={18} />} />
        <StatCard label="Donations" value={`$${(dashboard?.totals.donations ?? 0).toLocaleString()}`} sub="Recorded gifts" icon={<DollarSign size={18} />} trend={{ value: "Live total", positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-[#E8A33D]" />
            <h2 className="font-display font-semibold text-base text-[#2B2420]">Member Growth</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={memberGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1E9DA" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #F1E9DA", borderRadius: 12, fontSize: 12 }} cursor={{ stroke: "#F1E9DA" }} />
              <Line type="monotone" dataKey="members" stroke="#E8A33D" strokeWidth={2.5} dot={{ r: 3, fill: "#E8A33D", strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <DollarSign size={16} className="text-[#E8A33D]" />
            <h2 className="font-display font-semibold text-base text-[#2B2420]">Donations by Center</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={donationsByCenter} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1E9DA" />
              <XAxis dataKey="center" tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#8A7F6E" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #F1E9DA", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => [`$${v}`, "Amount"]} />
              <Bar dataKey="amount" fill="#E8A33D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Activity size={16} className="text-[#E8A33D]" />
          <h2 className="font-display font-semibold text-base text-[#2B2420]">Recent Activity</h2>
        </div>
        <div className="space-y-3">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-3 py-2.5 border-b border-[#F9F5EE] last:border-0">
              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mt-0.5 ${typeColors[item.type]}`}>
                {item.type}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2B2420]">{item.action}</p>
                <p className="text-xs text-[#8A7F6E] truncate">{item.detail}</p>
              </div>
              <span className="text-xs text-[#B8A98C] flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
