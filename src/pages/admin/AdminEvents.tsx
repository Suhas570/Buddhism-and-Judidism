import { useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { Button } from "../../components/Button";
import { apiSend } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { Event } from "../../lib/types";

const emptyEvent = {
  title: "",
  type: "Meditation",
  date: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  location: "Bodhi Grove Sangha",
  capacity: 25,
};

export function AdminEvents() {
  const { data: events, setData: setEvents } = useApiList<Event>("/events?center=Bodhi Grove Sangha", "admin");
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
          center: "Bodhi Grove Sangha",
          registrations: 0,
          status: "upcoming",
        }),
      },
      "admin",
    );
    setEvents((items) => [created, ...items]);
    setForm(emptyEvent);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Events</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">Manage retreats & meditation sessions</p>
        </div>
        <Button variant="saffron" onClick={() => setShowForm((value) => !value)}>Create Event</Button>
      </div>

      {showForm && (
        <form onSubmit={submitEvent} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-6 gap-3">
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="md:col-span-2 px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm">
            <option>Meditation</option>
            <option>Retreat</option>
            <option>Intensive</option>
            <option>Ceremony</option>
            <option>Orientation</option>
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, endDate: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input type="number" min={1} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <Button variant="dark" type="submit">Save Event</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 hover:shadow-md transition-all duration-200 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <PillBadge label={ev.type} variant="muted" />
              <PillBadge label={ev.status} variant="success" />
            </div>
            <h3 className="font-display font-bold text-base text-[#2B2420]">{ev.title}</h3>
            <div className="space-y-1.5 text-xs text-[#8A7F6E]">
              <div className="flex items-center gap-2"><CalendarDays size={13} className="text-[#E8A33D]" />{ev.date}</div>
              <div className="flex items-center gap-2"><MapPin size={13} className="text-[#E8A33D]" />{ev.location}</div>
              <div className="flex items-center gap-2"><Users size={13} className="text-[#E8A33D]" />{ev.registrations}/{ev.capacity} registered</div>
            </div>
            <div className="h-1.5 bg-[#F1E9DA] rounded-full overflow-hidden">
              <div className="h-full bg-[#E8A33D] rounded-full" style={{ width: `${(ev.registrations / ev.capacity) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
