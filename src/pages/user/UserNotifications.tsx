import { BookOpen, CalendarDays, MessageCircle, Heart } from "lucide-react";

const notifications = [
  { id: 1, type: "teaching", icon: BookOpen, title: "New teaching posted", body: "\"Uposatha Observance Guide\" by Bhikkhu Analayo is now available in the Dharma Library.", time: "2h ago", unread: true },
  { id: 2, type: "event", icon: CalendarDays, title: "Event reminder", body: "Vesak Full Moon Retreat begins in 7 days. You are registered.", time: "1d ago", unread: true },
  { id: 3, type: "forum", icon: MessageCircle, title: "Forum reply", body: "Priya Nair replied to your post: \"Dealing with restlessness during sitting meditation\"", time: "2d ago", unread: false },
  { id: 4, type: "donation", icon: Heart, title: "Donation confirmed", body: "Your donation of $100 to the Retreat Scholarship Fund has been received. Thank you.", time: "3d ago", unread: false },
  { id: 5, type: "teaching", icon: BookOpen, title: "New teaching posted", body: "\"Bodhicitta and Compassion Practice\" by Bhante Sujato is now available.", time: "5d ago", unread: false },
];

const iconBg: Record<string, string> = {
  teaching: "bg-[#FDF4E7] text-[#E8A33D]",
  event: "bg-[#E3EFF5] text-[#2E6B7A]",
  forum: "bg-[#EAE3F5] text-[#7A2E2E]",
  donation: "bg-[#E8F4E3] text-[#6B8E5A]",
};

export function UserNotifications() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Notifications</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">2 unread</p>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
              n.unread ? "bg-[#FDF4E7] border-[#F1E0B8]" : "bg-white border-[#F1E9DA]"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg[n.type]}`}>
              <n.icon size={17} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-[#2B2420] text-sm">{n.title}</p>
                <span className="text-xs text-[#B8A98C] flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-[#8A7F6E] mt-0.5 leading-relaxed">{n.body}</p>
            </div>
            {n.unread && <div className="w-2 h-2 rounded-full bg-[#E8A33D] flex-shrink-0 mt-1.5" />}
          </div>
        ))}
      </div>
    </div>
  );
}
