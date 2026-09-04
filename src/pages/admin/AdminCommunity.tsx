import { CheckCircle, EyeOff, Trash2 } from "lucide-react";
import { PillBadge } from "../../components/PillBadge";
import { useApiList } from "../../lib/useApiList";
import type { ForumPost } from "../../lib/types";

export function AdminCommunity() {
  const { data: forumPosts } = useApiList<ForumPost>("/forum/posts", "admin");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Community Moderation</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Review and moderate forum posts</p>
      </div>

      <div className="space-y-3">
        {forumPosts.map((post) => (
          <div key={post.id} className={`bg-white border rounded-2xl p-5 transition-all duration-200 hover:shadow-md ${post.status === "pending" ? "border-[#F1E0B8]" : "border-[#F1E9DA]"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <PillBadge label={post.category} variant="muted" />
                  <PillBadge label={post.status} variant={post.status === "approved" ? "success" : "warning"} />
                </div>
                <h3 className="font-display font-semibold text-[#2B2420] mb-1">{post.title}</h3>
                <p className="text-sm text-[#8A7F6E] line-clamp-2">{post.preview}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-[#B8A98C]">
                  <span>by {post.author}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.likes} likes</span>
                  <span>·</span>
                  <span>{post.replies} replies</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                {post.status === "pending" && (
                  <button className="flex items-center gap-1.5 text-xs text-[#6B8E5A] font-medium bg-[#E8F4E3] rounded-full px-3 py-1.5 hover:bg-[#D0E8C8] transition-colors cursor-pointer">
                    <CheckCircle size={13} /> Approve
                  </button>
                )}
                <button className="flex items-center gap-1.5 text-xs text-[#8A7F6E] font-medium bg-[#F5F0E8] rounded-full px-3 py-1.5 hover:bg-[#EDE5D8] transition-colors cursor-pointer">
                  <EyeOff size={13} /> Hide
                </button>
                <button className="flex items-center gap-1.5 text-xs text-[#B94A3F] font-medium bg-[#F9E8E7] rounded-full px-3 py-1.5 hover:bg-[#F0D0CE] transition-colors cursor-pointer">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
