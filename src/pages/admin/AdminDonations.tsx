import { StatCard } from "../../components/StatCard";
import { DollarSign, Heart, TrendingUp, Users } from "lucide-react";
import { useApiList } from "../../lib/useApiList";
import type { Donation } from "../../lib/types";

export function AdminDonations() {
  const { data: donations } = useApiList<Donation>("/donations?center=Bodhi Grove Sangha", "admin");
  const centerDonations = donations.filter((d) => d.center === "Bodhi Grove Sangha");
  const total = centerDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const avgDonation = centerDonations.length ? Math.round(total / centerDonations.length) : 0;
  const donors = new Set(centerDonations.map((donation) => donation.donor)).size;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Donations</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Bodhi Grove Sangha financial overview</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="This Month" value={`$${total.toLocaleString()}`} icon={<DollarSign size={18} />} trend={{ value: "Live total", positive: true }} />
        <StatCard label="All Time" value={`$${total.toLocaleString()}`} icon={<TrendingUp size={18} />} />
        <StatCard label="Avg Donation" value={`$${avgDonation}`} icon={<Heart size={18} />} />
        <StatCard label="Donors" value={donors} icon={<Users size={18} />} />
      </div>
      <div className="bg-white border border-[#F1E9DA] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F1E9DA] flex items-center justify-between">
          <h2 className="font-display font-semibold text-[#2B2420]">Donation Records</h2>
          <button className="text-xs text-[#E8A33D] font-medium hover:underline cursor-pointer">Export</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F1E9DA]">
              {["Donor", "Amount", "Purpose", "Method", "Date"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {centerDonations.map((d) => (
              <tr key={d.id} className="border-b border-[#F9F5EE] last:border-0 hover:bg-[#FDFAF5] transition-colors">
                <td className="px-5 py-3 font-medium text-[#2B2420]">{d.donor}</td>
                <td className="px-5 py-3 font-semibold text-[#6B8E5A]">${d.amount}</td>
                <td className="px-5 py-3 text-[#2B2420]">{d.purpose}</td>
                <td className="px-5 py-3 text-[#8A7F6E]">{d.method}</td>
                <td className="px-5 py-3 text-[#8A7F6E]">{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
