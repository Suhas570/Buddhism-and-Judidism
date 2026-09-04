import { Eye, Pencil, Share2, Download, Trash2 } from "lucide-react";
import { AvatarStack } from "./AvatarStack";
import { PillBadge } from "./PillBadge";

interface Meta {
  label: string;
  value: string | number;
}

interface ContentCardProps {
  title: string;
  meta: [Meta, Meta, Meta, Meta];
  contributors?: string[];
  contributorsLabel?: string;
  statusBadge?: { label: string; variant: "success" | "danger" | "warning" | "muted" | "saffron" };
  typeBadge?: string;
  checked?: boolean;
  onCheck?: () => void;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ContentCard({
  title,
  meta,
  contributors = [],
  contributorsLabel = "Contributors",
  statusBadge,
  typeBadge,
  checked,
  onCheck,
  onView,
  onEdit,
  onDelete,
}: ContentCardProps) {
  return (
    <div className="bg-white border border-[#F1E9DA] rounded-2xl p-5 hover:shadow-md transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          {typeBadge && <PillBadge label={typeBadge} variant="muted" />}
          <h3 className="font-semibold text-[#2B2420] leading-tight font-display text-sm line-clamp-2">{title}</h3>
        </div>
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="w-4 h-4 mt-0.5 rounded accent-[#E8A33D] flex-shrink-0 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {meta.map((m, i) => (
          <div key={i}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-0.5">{m.label}</p>
            <p className="text-sm font-medium text-[#2B2420] truncate">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E]">{contributorsLabel}</p>
          {contributors.length > 0 ? (
            <AvatarStack names={contributors} />
          ) : (
            <span className="text-xs text-[#8A7F6E]">—</span>
          )}
        </div>
        {statusBadge && <PillBadge label={statusBadge.label} variant={statusBadge.variant} />}
      </div>

      <div className="border-t border-[#F1E9DA] pt-3 flex items-center justify-between">
        {[
          { icon: Eye, action: onView, title: "View" },
          { icon: Pencil, action: onEdit, title: "Edit" },
          { icon: Share2, action: undefined, title: "Share" },
          { icon: Download, action: undefined, title: "Download" },
          { icon: Trash2, action: onDelete, title: "Delete" },
        ].map(({ icon: Icon, action, title: t }) => (
          <button
            key={t}
            title={t}
            onClick={action}
            className="p-1.5 rounded-lg text-[#C8BFB0] hover:text-[#E8A33D] hover:bg-[#FDF4E7] transition-colors duration-150 cursor-pointer"
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
