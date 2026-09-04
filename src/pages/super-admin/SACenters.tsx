import { useState, type FormEvent } from "react";
import { MapPin, Users, User } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { Button } from "../../components/Button";
import { apiSend } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { Center } from "../../lib/types";

const emptyCenter = {
  name: "",
  location: "",
  headMonk: "",
  founded: new Date().getFullYear().toString(),
};

export function SACenters() {
  const { data: centers, setData: setCenters } = useApiList<Center>("/centers", "super-admin");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyCenter);

  async function submitCenter(event: FormEvent) {
    event.preventDefault();
    const center = await apiSend<Center>(
      "/centers",
      {
        method: "POST",
        body: JSON.stringify({
          ...form,
          memberCount: 0,
          adminCount: 0,
          status: "active",
        }),
      },
      "super-admin",
    );
    setCenters((items) => [center, ...items]);
    setForm(emptyCenter);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Sangha Centers</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">{centers.length} registered centers</p>
        </div>
        <Button variant="saffron" onClick={() => setShowForm((value) => !value)}>Add Center</Button>
      </div>

      {showForm && (
        <form onSubmit={submitCenter} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-5 gap-3">
          <input required placeholder="Center name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="md:col-span-2 px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required placeholder="Head monk" value={form.headMonk} onChange={(e) => setForm({ ...form, headMonk: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <Button type="submit" variant="dark">Save Center</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {centers.map((center) => (
          <div key={center.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-6 hover:shadow-md transition-all duration-200 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF4E7] flex items-center justify-center text-[#E8A33D] font-bold">C</div>
              <PillBadge label={center.status} variant="success" />
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-[#2B2420] leading-tight mb-1">{center.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-[#8A7F6E]">
                <MapPin size={12} />
                <span>{center.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Head Monk</p>
                <div className="flex items-center gap-1.5">
                  <User size={12} className="text-[#E8A33D]" />
                  <p className="text-xs font-medium text-[#2B2420]">{center.headMonk}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Founded</p>
                <p className="text-xs font-medium text-[#2B2420]">{center.founded}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Members</p>
                <div className="flex items-center gap-1.5">
                  <Users size={12} className="text-[#E8A33D]" />
                  <p className="text-xs font-medium text-[#2B2420]">{center.memberCount}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">Admins</p>
                <p className="text-xs font-medium text-[#2B2420]">{center.adminCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
