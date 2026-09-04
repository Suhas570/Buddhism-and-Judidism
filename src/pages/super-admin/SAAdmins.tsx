import { useState, type FormEvent } from "react";
import { Mail, Search } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { Button } from "../../components/Button";
import { apiSend } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { Admin } from "../../lib/types";

const emptyAdmin = {
  name: "",
  email: "",
  phone: "",
  center: "Bodhi Grove Sangha",
  role: "Center Admin" as const,
};

export function SAAdmins() {
  const { data: admins, setData: setAdmins } = useApiList<Admin>("/admins", "super-admin");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAdmin);
  const [search, setSearch] = useState("");
  const filtered = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase()) ||
    admin.email.toLowerCase().includes(search.toLowerCase())
  );

  async function submitAdmin(event: FormEvent) {
    event.preventDefault();
    const admin = await apiSend<Admin>(
      "/admins",
      {
        method: "POST",
        body: JSON.stringify({
          ...form,
          status: "active",
          since: new Date().toISOString().slice(0, 10),
        }),
      },
      "super-admin",
    );
    setAdmins((items) => [admin, ...items]);
    setForm(emptyAdmin);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Admin Management</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">{admins.length} admins across all centers</p>
        </div>
        <Button variant="saffron" onClick={() => setShowForm((value) => !value)}>Add Admin</Button>
      </div>

      {showForm && (
        <form onSubmit={submitAdmin} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-6 gap-3">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required placeholder="Center" value={form.center} onChange={(e) => setForm({ ...form, center: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Admin["role"] })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm">
            <option>Center Admin</option>
            <option>Content Admin</option>
          </select>
          <Button type="submit" variant="dark">Save Admin</Button>
        </form>
      )}

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F6E]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search admins..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-[#F1E9DA] rounded-full text-sm focus:outline-none focus:border-[#E8A33D] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((admin) => (
          <div key={admin.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#1C1815] text-[#E8A33D] flex items-center justify-center font-display font-bold text-base">
                  {admin.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-[#2B2420] text-sm">{admin.name}</p>
                  <p className="text-xs text-[#8A7F6E]">{admin.role}</p>
                </div>
              </div>
              <PillBadge label={admin.status} variant={admin.status === "active" ? "success" : "danger"} />
            </div>

            <div className="space-y-2 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Center</p>
                  <p className="text-xs font-medium text-[#2B2420] leading-tight">{admin.center}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Since</p>
                  <p className="text-xs font-medium text-[#2B2420]">{admin.since}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#F1E9DA] pt-3 flex items-center gap-3">
              <a href={`mailto:${admin.email}`} className="flex items-center gap-1.5 text-xs text-[#8A7F6E] hover:text-[#E8A33D] transition-colors">
                <Mail size={13} /> {admin.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
