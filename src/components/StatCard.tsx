import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  trend?: { value: string; positive: boolean };
  dark?: boolean;
}

export function StatCard({ label, value, sub, icon, trend, dark = false }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-shadow duration-200 hover:shadow-md ${
        dark
          ? "bg-[#1C1815] border-[#3A3028] text-[#F5EFE3]"
          : "bg-white border-[#F1E9DA] text-[#2B2420]"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold uppercase tracking-wider ${dark ? "text-[#8A7F6E]" : "text-[#8A7F6E]"}`}>
          {label}
        </span>
        {icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${dark ? "bg-[#2A2018]" : "bg-[#FDF4E7]"}`}>
            <span className="text-[#E8A33D]">{icon}</span>
          </div>
        )}
      </div>
      <div className={`text-3xl font-bold font-display tracking-tight mb-1 ${dark ? "text-[#F5EFE3]" : "text-[#2B2420]"}`}>
        {value}
      </div>
      {sub && <p className={`text-xs ${dark ? "text-[#8A7F6E]" : "text-[#8A7F6E]"}`}>{sub}</p>}
      {trend && (
        <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trend.positive ? "text-[#6B8E5A]" : "text-[#B94A3F]"}`}>
          <span>{trend.positive ? "↑" : "↓"}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
