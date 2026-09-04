import { useState } from "react";
import { Search } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { useApiList } from "../../lib/useApiList";
import type { User } from "../../lib/types";

export function SAUsers() {
  const [search, setSearch] = useState("");
  const { data: users } = useApiList<User>("/users", "super-admin");
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Global Users</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">{users.length} registered members</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F6E]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search members..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-[#F1E9DA] rounded-full text-sm focus:outline-none focus:border-[#E8A33D] transition-colors"
        />
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F1E9DA]">
              {["Name", "Email", "Center", "Role", "Status", "Joined", "Actions"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] px-5 py-3.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-[#F9F5EE] last:border-0 hover:bg-[#FDFAF5] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1C1815] text-[#E8A33D] flex items-center justify-center text-xs font-bold font-display flex-shrink-0">
                      {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="font-medium text-[#2B2420]">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[#8A7F6E]">{user.email}</td>
                <td className="px-5 py-3.5 text-[#2B2420]">{user.center}</td>
                <td className="px-5 py-3.5">
                  <PillBadge label={user.role} variant="muted" />
                </td>
                <td className="px-5 py-3.5">
                  <PillBadge
                    label={user.status}
                    variant={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "danger"}
                  />
                </td>
                <td className="px-5 py-3.5 text-[#8A7F6E]">{user.joined}</td>
                <td className="px-5 py-3.5">
                  <button className="text-xs text-[#E8A33D] hover:underline font-medium cursor-pointer">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
