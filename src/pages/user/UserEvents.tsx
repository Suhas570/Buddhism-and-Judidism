import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { apiGet, apiSend } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { Event } from "../../lib/types";

export function UserEvents() {
  const { data: events, setData: setEvents } = useApiList<Event>("/events?status=upcoming", "user");
  const [myRegistered, setMyRegistered] = useState<Event[]>([]);
  const registeredIds = new Set(myRegistered.map((event) => event.id));

  useEffect(() => {
    apiGet<Event[]>("/event-registrations/mine", "user").then(setMyRegistered);
  }, []);

  async function register(eventItem: Event) {
    const result = await apiSend<{ event: Event }>(
      `/events/${eventItem.id}/register`,
      { method: "POST" },
      "user",
    );
    setEvents((items) => items.map((item) => item.id === eventItem.id ? result.event : item));
    setMyRegistered((items) => items.some((item) => item.id === result.event.id) ? items : [result.event, ...items]);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Events & Retreats</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Upcoming community events</p>
      </div>

      <div>
        <h2 className="font-display font-semibold text-sm text-[#8A7F6E] uppercase tracking-wider mb-4">All Upcoming Events</h2>
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
                <div className="flex items-center gap-2"><Users size={13} className="text-[#E8A33D]" />{ev.registrations}/{ev.capacity} spots filled</div>
              </div>
              <div className="h-1.5 bg-[#F1E9DA] rounded-full overflow-hidden">
                <div className="h-full bg-[#E8A33D] rounded-full" style={{ width: `${(ev.registrations / ev.capacity) * 100}%` }} />
              </div>
              <button
                disabled={registeredIds.has(ev.id) || ev.registrations >= ev.capacity}
                onClick={() => register(ev)}
                className="w-full text-sm font-semibold text-[#2B2420] bg-[#FDF4E7] border border-[#F1E0B8] rounded-full py-2.5 hover:bg-[#F5E8C8] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-default"
              >
                {registeredIds.has(ev.id) ? "Registered" : ev.registrations >= ev.capacity ? "Full" : "Register"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display font-semibold text-sm text-[#8A7F6E] uppercase tracking-wider mb-4">My Registered Events</h2>
        <div className="space-y-3">
          {myRegistered.map((ev) => (
            <div key={ev.id} className="bg-[#FDF4E7] border border-[#F1E0B8] rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-[#2B2420] text-sm">{ev.title}</p>
                <p className="text-xs text-[#8A7F6E] mt-0.5">{ev.date} - {ev.location}</p>
              </div>
              <PillBadge label="Registered" variant="success" />
            </div>
          ))}
          {myRegistered.length === 0 && (
            <p className="text-sm text-[#8A7F6E] bg-white border border-[#F1E9DA] rounded-2xl px-5 py-4">No registrations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
