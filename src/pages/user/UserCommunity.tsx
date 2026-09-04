import { Heart, MessageCircle, Users } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { useApiList } from "../../lib/useApiList";
import type { ForumPost, StudyGroup } from "../../lib/types";

export function UserCommunity() {
  const { data: forumPosts } = useApiList<ForumPost>("/forum/posts?status=approved", "user");
  const { data: studyGroups } = useApiList<StudyGroup>("/forum/study-groups", "user");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Sangha Connect</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Community forum and study groups</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-display font-semibold text-sm text-[#8A7F6E] uppercase tracking-wider">Recent Posts</h2>
        {forumPosts.filter((p) => p.status === "approved").map((post) => (
          <div key={post.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1C1815] text-[#E8A33D] flex items-center justify-center font-bold text-sm flex-shrink-0 font-display">
                {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#2B2420]">{post.author}</span>
                  <PillBadge label={post.category} variant="muted" />
                  <span className="text-xs text-[#B8A98C] ml-auto">{post.date}</span>
                </div>
                <h3 className="font-display font-semibold text-[#2B2420] text-sm mb-1.5">{post.title}</h3>
                <p className="text-xs text-[#8A7F6E] leading-relaxed line-clamp-3">{post.preview}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-[#8A7F6E] hover:text-[#E8A33D] transition-colors cursor-pointer">
                    <Heart size={13} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-[#8A7F6E] hover:text-[#E8A33D] transition-colors cursor-pointer">
                    <MessageCircle size={13} /> {post.replies} replies
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-display font-semibold text-sm text-[#8A7F6E] uppercase tracking-wider mb-4">Study Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studyGroups.map((g) => (
            <div key={g.id} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-[#FDF4E7] flex items-center justify-center mb-3">
                <Users size={18} className="text-[#E8A33D]" />
              </div>
              <h3 className="font-display font-semibold text-[#2B2420] text-sm mb-1">{g.name}</h3>
              <p className="text-xs text-[#8A7F6E]">Facilitated by {g.facilitator}</p>
              <p className="text-xs text-[#8A7F6E] mt-0.5">{g.members} members · Next: {g.nextMeeting}</p>
              <button className="mt-4 w-full text-xs font-semibold text-[#E8A33D] border border-[#E8A33D]/30 rounded-full py-2 hover:bg-[#FDF4E7] transition-colors cursor-pointer">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
