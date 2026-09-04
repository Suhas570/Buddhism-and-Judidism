import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../../components/Button";

const sent = [
  { id: 1, title: "Vesak Retreat Registration Open", body: "Dear Sangha, registration for the Vesak Full Moon Retreat is now open. Please register early as spaces are limited.", date: "2024-03-08", recipients: 148 },
  { id: 2, title: "New Teaching Added: Metta Sutta", body: "Bhante Sujato has added a new teaching on the Metta Sutta. Available now in the Dharma Library.", date: "2024-03-05", recipients: 148 },
  { id: 3, title: "Uposatha Day Schedule", body: "A reminder that this month's Uposatha observance will be held on April 8th. All are welcome.", date: "2024-03-01", recipients: 148 },
];

export function AdminAnnouncements() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Announcements</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Broadcast messages to all center members</p>
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-semibold text-[#2B2420]">Compose Announcement</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement title..."
          className="w-full px-4 py-2.5 bg-[#FAF6EF] border border-[#F1E9DA] rounded-xl text-sm text-[#2B2420] placeholder-[#8A7F6E] focus:outline-none focus:border-[#E8A33D] transition-colors"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your message to all 148 members..."
          rows={5}
          className="w-full px-4 py-2.5 bg-[#FAF6EF] border border-[#F1E9DA] rounded-xl text-sm text-[#2B2420] placeholder-[#8A7F6E] focus:outline-none focus:border-[#E8A33D] transition-colors resize-none"
        />
        <div className="flex justify-end">
          <Button variant="saffron" icon={<Send size={14} />}>Broadcast to All Members</Button>
        </div>
      </div>

      <div>
        <h2 className="font-display font-semibold text-sm text-[#8A7F6E] uppercase tracking-wider mb-3">Sent History</h2>
        <div className="space-y-3">
          {sent.map((a) => (
            <div key={a.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-[#2B2420] text-sm">{a.title}</h3>
                <span className="text-xs text-[#B8A98C] flex-shrink-0 ml-4">{a.date}</span>
              </div>
              <p className="text-xs text-[#8A7F6E] mt-1.5 line-clamp-2">{a.body}</p>
              <p className="text-[10px] text-[#B8A98C] mt-2">Sent to {a.recipients} members</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
