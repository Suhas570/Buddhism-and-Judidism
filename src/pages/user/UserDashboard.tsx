import { useEffect, useState } from "react";
import { Flame, BookOpen, CalendarDays } from "lucide-react";
import { apiGet } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { CurrentUser, Event, Teaching } from "../../lib/types";

const dharmaQuotes = [
  "\"Peace comes from within. Do not seek it without.\" - The Buddha",
  "\"The mind is everything. What you think you become.\" - The Buddha",
  "\"You yourself, as much as anybody in the entire universe, deserve your love and affection.\" - The Buddha",
];

const quote = dharmaQuotes[0];

export function UserDashboard() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const { data: events } = useApiList<Event>("/events?status=upcoming", "user");
  const { data: teachings } = useApiList<Teaching>("/teachings?status=published", "user");
  const nextEvent = events[0];
  const recentTeaching = teachings.find((t) => t.status === "published");

  useEffect(() => {
    apiGet<CurrentUser>("/me", "user").then(setCurrentUser);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-[#1C1815] border border-[#3A3028] rounded-2xl px-7 py-6 flex items-center justify-between gap-6">
        <div>
          <p className="text-[#8A7F6E] text-xs uppercase tracking-wider mb-1">Welcome back</p>
          <h1 className="font-display font-bold text-2xl text-[#F5EFE3] tracking-tight">{currentUser?.name ?? "Member"}</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">Bodhi Grove Sangha - Member since 2022</p>
        </div>
        <div className="flex items-center gap-2 bg-[#2A2018] rounded-2xl px-5 py-4 flex-shrink-0">
          <Flame size={22} className="text-[#E8A33D]" />
          <div>
            <p className="font-display font-bold text-3xl text-[#E8A33D] leading-none">{currentUser?.streak ?? 0}</p>
            <p className="text-[10px] text-[#8A7F6E] mt-0.5">day streak</p>
          </div>
        </div>
      </div>

      <div className="bg-[#FDF4E7] border border-[#F1E0B8] rounded-2xl px-6 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A227] mb-1.5">Dharma Quote of the Day</p>
        <p className="text-sm text-[#7A6A50] italic leading-relaxed">{quote}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#F1E9DA] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={16} className="text-[#E8A33D]" />
            <h2 className="font-display font-semibold text-[#2B2420]">Next Event</h2>
          </div>
          <h3 className="font-display font-bold text-lg text-[#2B2420] leading-tight mb-2">{nextEvent?.title ?? "No upcoming event"}</h3>
          <p className="text-sm text-[#8A7F6E] mb-1">{nextEvent ? `${nextEvent.date} - ${nextEvent.location}` : "Check back soon"}</p>
          {nextEvent && <p className="text-xs text-[#B8A98C]">{nextEvent.registrations} registered - {nextEvent.capacity - nextEvent.registrations} spots left</p>}
          <button className="mt-4 text-sm font-medium text-[#E8A33D] hover:underline cursor-pointer">Register Now</button>
        </div>

        {recentTeaching && (
          <div className="bg-white border border-[#F1E9DA] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-[#E8A33D]" />
              <h2 className="font-display font-semibold text-[#2B2420]">Continue Learning</h2>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] bg-[#F5F0E8] rounded-full px-2 py-0.5">
              {recentTeaching.category}
            </span>
            <h3 className="font-display font-bold text-base text-[#2B2420] mt-2 mb-1 leading-tight">{recentTeaching.title}</h3>
            <p className="text-xs text-[#8A7F6E]">by {recentTeaching.author} - {recentTeaching.duration}</p>
            <div className="mt-4 h-1.5 bg-[#F1E9DA] rounded-full overflow-hidden">
              <div className="h-full bg-[#E8A33D] rounded-full w-2/5" />
            </div>
            <p className="text-[10px] text-[#8A7F6E] mt-1">40% complete</p>
          </div>
        )}
      </div>
    </div>
  );
}
