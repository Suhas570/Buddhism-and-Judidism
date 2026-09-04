import { Users, BookOpen, CalendarDays, TrendingUp } from "lucide-react";
import { StatCard } from "../../components/StatCard";
import { PillBadge } from "../../components/PillBadge";
import { useApiList } from "../../lib/useApiList";
import type { Donation, Event, Teaching, User } from "../../lib/types";

export function AdminDashboard() {
  const { data: users } = useApiList<User>("/users?center=Bodhi Grove Sangha", "admin");
  const { data: teachings } = useApiList<Teaching>("/teachings?center=Bodhi Grove Sangha", "admin");
  const { data: donations } = useApiList<Donation>("/donations?center=Bodhi Grove Sangha", "admin");
  const { data: events } = useApiList<Event>("/events?center=Bodhi Grove Sangha&status=upcoming", "admin");
  const upcoming = events.slice(0, 3);
  const pendingUsers = users.filter((user) => user.status === "pending").length;
  const donationTotal = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Bodhi Grove Sangha</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Center dashboard - live data</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Members" value={users.length} sub={`${pendingUsers} pending approval`} icon={<Users size={18} />} trend={{ value: "Live data", positive: true }} />
        <StatCard label="Teachings" value={teachings.length} sub="Published content" icon={<BookOpen size={18} />} />
        <StatCard label="Upcoming Events" value={events.length} sub="Next events" icon={<CalendarDays size={18} />} />
        <StatCard label="Donations" value={`$${donationTotal.toLocaleString()}`} sub="Recorded gifts" icon={<TrendingUp size={18} />} trend={{ value: "Live total", positive: true }} />
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
        <h2 className="font-display font-semibold text-base text-[#2B2420] mb-5">Upcoming Events</h2>
        <div className="space-y-3">
          {upcoming.map((ev) => (
            <div key={ev.id} className="flex items-center justify-between py-3 border-b border-[#F9F5EE] last:border-0">
              <div>
                <p className="font-medium text-[#2B2420] text-sm">{ev.title}</p>
                <p className="text-xs text-[#8A7F6E] mt-0.5">{ev.date} - {ev.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8A7F6E]">{ev.registrations}/{ev.capacity}</span>
                <PillBadge label={ev.type} variant="muted" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1C1815] border border-[#3A3028] rounded-2xl p-6">
        <h2 className="font-display font-semibold text-base text-[#F5EFE3] mb-5">Engagement Snapshot</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Teaching Views", value: teachings.reduce((sum, teaching) => sum + teaching.views, 0), sub: "All content" },
            { label: "Forum Posts", value: "Live", sub: "Connected via moderation" },
            { label: "Course Items", value: teachings.filter((teaching) => teaching.category === "Course").length, sub: "Courses" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-1">{s.label}</p>
              <p className="font-display font-bold text-2xl text-[#E8A33D]">{s.value}</p>
              <p className="text-xs text-[#8A7F6E] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
