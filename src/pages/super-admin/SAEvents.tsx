import { useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { Button } from "../../components/Button";
import { apiSend } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { Event } from "../../lib/types";

const typeColors: Record<string, string> = {
  Retreat: "bg-[#E8F4E3] text-[#6B8E5A]",
  Intensive: "bg-[#FDF4E7] text-[#E8A33D]",
  Ceremony: "bg-[#EAE3F5] text-[#7A2E2E]",
  Orientation: "bg-[#E3EFF5] text-[#2E6B7A]",
  Meditation: "bg-[#F5F0E8] text-[#8A7F6E]",
};

const emptyEvent = {
  title: "",
  type: "Meditation",
  center: "Bodhi Grove Sangha",
  date: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  location: "",
  capacity: 25,
};

export function SAEvents() {
  const { data: events, setData: setEvents } = useApiList<Event>("/events", "super-admin");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyEvent);

  async function submitEvent(event: FormEvent) {
    event.preventDefault();
    const created = await apiSend<Event>(
      "/events",
      {
        method: "POST",
        body: JSON.stringify({
          ...form,
          registrations: 0,
          status: "upcoming",
        }),
      },
      "super-admin",
    );
    setEvents((items) => [created, ...items]);
    setForm(emptyEvent);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Events Calendar</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">Upcoming retreats & events across all centers</p>
        </div>
        <Button variant="saffron" onClick={() => setShowForm((value) => !value)}>Create Event</Button>
      </div>

      {showForm && (
        <form onSubmit={submitEvent} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-7 gap-3">
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="md:col-span-2 px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required placeholder="Center" value={form.center} onChange={(e) => setForm({ ...form, center: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm">
            <option>Meditation</option>
            <option>Retreat</option>
            <option>Intensive</option>
            <option>Ceremony</option>
            <option>Orientation</option>
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, endDate: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <Button variant="dark" type="submit">Save Event</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 hover:shadow-md transition-all duration-200 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeColors[ev.type] || "bg-[#F5F0E8] text-[#8A7F6E]"}`}>
                {ev.type}
              </span>
              <PillBadge label={ev.status} variant="success" />
            </div>

            <h3 className="font-display font-bold text-base text-[#2B2420] leading-tight">{ev.title}</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#8A7F6E]">
                <CalendarDays size={13} className="text-[#E8A33D]" />
                <span>{ev.date}{ev.endDate !== ev.date ? ` -> ${ev.endDate}` : ""}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8A7F6E]">
                <MapPin size={13} className="text-[#E8A33D]" />
                <span>{ev.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8A7F6E]">
                <Users size={13} className="text-[#E8A33D]" />
                <span>{ev.registrations} / {ev.capacity} registered</span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="h-1.5 bg-[#F1E9DA] rounded-full overflow-hidden">
                <div className="h-full bg-[#E8A33D] rounded-full transition-all" style={{ width: `${(ev.registrations / ev.capacity) * 100}%` }} />
              </div>
              <p className="text-[10px] text-[#8A7F6E] mt-1">{ev.capacity - ev.registrations} spots remaining</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
