import { useEffect, useState, type FormEvent } from "react";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { apiGet, apiSend } from "../../lib/api";
import { PillBadge } from "../../components/PillBadge";
import { Button } from "../../components/Button";
import type { User } from "../../lib/types";

const emptyMember = {
  name: "",
  email: "",
};

export function AdminMembers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyMember);

  useEffect(() => {
    apiGet<User[]>("/users?center=Bodhi Grove Sangha", "admin").then(setUsers);
  }, []);

  async function inviteMember(event: FormEvent) {
    event.preventDefault();
    const member = await apiSend<User>(
      "/users",
      {
        method: "POST",
        body: JSON.stringify({
          ...form,
          role: "member",
          center: "Bodhi Grove Sangha",
          status: "pending",
          joined: new Date().toISOString().slice(0, 10),
          avatar: null,
        }),
      },
      "admin",
    );
    setUsers((items) => [member, ...items]);
    setForm(emptyMember);
    setShowForm(false);
  }

  async function updateStatus(user: User, status: User["status"]) {
    const updated = await apiSend<User>(
      `/users/${user.id}`,
      { method: "PATCH", body: JSON.stringify({ status }) },
      "admin",
    );
    setUsers((items) => items.map((item) => item.id === user.id ? updated : item));
  }

  const centerUsers = users.filter((u) => u.center === "Bodhi Grove Sangha");
  const filtered = centerUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const pending = filtered.filter((u) => u.status === "pending");
  const rest = filtered.filter((u) => u.status !== "pending");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Members</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">Bodhi Grove Sangha - {centerUsers.length} members</p>
        </div>
        <Button variant="saffron" onClick={() => setShowForm((value) => !value)}>Invite Member</Button>
      </div>

      {showForm && (
        <form onSubmit={inviteMember} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input required placeholder="Member name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <Button type="submit" variant="dark">Save Invitation</Button>
        </form>
      )}

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F6E]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members..." className="w-full pl-9 pr-4 py-2 bg-white border border-[#F1E9DA] rounded-full text-sm focus:outline-none focus:border-[#E8A33D] transition-colors" />
      </div>

      {pending.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-sm text-[#8A7F6E] uppercase tracking-wider mb-3">Pending Approval</h2>
          <div className="space-y-2">
            {pending.map((u) => (
              <div key={u.id} className="bg-[#FDF4E7] border border-[#F1E0B8] rounded-2xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1C1815] text-[#E8A33D] flex items-center justify-center font-bold text-sm">
                    {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2B2420] text-sm">{u.name}</p>
                    <p className="text-xs text-[#8A7F6E]">{u.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(u, "active")} className="flex items-center gap-1.5 text-xs text-[#6B8E5A] font-medium bg-white border border-[#6B8E5A]/30 rounded-full px-3 py-1.5 hover:bg-[#E8F4E3] transition-colors cursor-pointer">
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button onClick={() => updateStatus(u, "suspended")} className="flex items-center gap-1.5 text-xs text-[#B94A3F] font-medium bg-white border border-[#B94A3F]/30 rounded-full px-3 py-1.5 hover:bg-[#F9E8E7] transition-colors cursor-pointer">
                    <XCircle size={13} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((u) => (
          <div key={u.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C1815] text-[#E8A33D] flex items-center justify-center font-bold text-sm font-display">
                  {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-[#2B2420] text-sm">{u.name}</p>
                  <p className="text-xs text-[#8A7F6E]">{u.email}</p>
                </div>
              </div>
              <PillBadge label={u.status} variant={u.status === "active" ? "success" : "danger"} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Role</p>
                <p className="text-xs font-medium text-[#2B2420] capitalize">{u.role}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Joined</p>
                <p className="text-xs font-medium text-[#2B2420]">{u.joined}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
