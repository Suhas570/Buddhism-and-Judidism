interface PillBadgeProps {
  label: string;
  variant?: "saffron" | "saffron-outline" | "gold-outline" | "dark-gold" | "success" | "danger" | "warning" | "muted";
  size?: "sm" | "xs";
}

const variants: Record<string, string> = {
  saffron: "bg-[#E8A33D] text-[#2B2420] border border-[#E8A33D]",
  "saffron-outline": "border border-[#E8A33D] text-[#E8A33D] bg-transparent",
  "gold-outline": "border border-[#C9A227] text-[#C9A227] bg-transparent",
  "dark-gold": "border border-[#C9A227] text-[#C9A227] bg-transparent",
  success: "bg-[#EAF2E6] text-[#6B8E5A] border border-[#6B8E5A]/30",
  danger: "bg-[#F9E8E7] text-[#B94A3F] border border-[#B94A3F]/30",
  warning: "bg-[#FEF3E2] text-[#D98E3C] border border-[#D98E3C]/30",
  muted: "bg-[#F5F0E8] text-[#8A7F6E] border border-[#D4C8B5]",
};

export function PillBadge({ label, variant = "muted", size = "xs" }: PillBadgeProps) {
  const sizeClasses = size === "xs" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1";
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold tracking-wider uppercase ${sizeClasses} ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
