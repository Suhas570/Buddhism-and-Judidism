import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, ChevronDown, Search, ArrowLeft } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { Button } from "../components/Button";
import { PillBadge } from "../components/PillBadge";

const roleLabels: Record<string, string> = {
  "super-admin": "Platform Admin",
  admin: "Center Admin",
  user: "Sangha Member",
};

const ctaLabels: Record<string, string> = {
  "super-admin": "Add Center",
  admin: "Add Teaching",
  user: "Book a Retreat",
};

const roleBadgeVariant: Record<string, "saffron" | "gold-outline" | "muted"> = {
  "super-admin": "gold-outline",
  admin: "saffron",
  user: "muted",
};

export function Topbar() {
  const { role, user, logout } = useRole();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function switchPortal() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-30 bg-[#FAF6EF]/80 backdrop-blur-md border-b border-[#F1E9DA] px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 max-w-sm">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F6E]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#F1E9DA] rounded-full text-sm text-[#2B2420] placeholder-[#8A7F6E] focus:outline-none focus:border-[#E8A33D] transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {role && (
          <Button variant="saffron" size="sm">
            {ctaLabels[role]}
          </Button>
        )}

        <button className="relative w-9 h-9 rounded-full bg-white border border-[#F1E9DA] flex items-center justify-center text-[#8A7F6E] hover:text-[#2B2420] hover:border-[#D4C8B5] transition-colors cursor-pointer">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
        </button>

        <button className="w-9 h-9 rounded-full bg-white border border-[#F1E9DA] flex items-center justify-center text-[#8A7F6E] hover:text-[#2B2420] hover:border-[#D4C8B5] transition-colors cursor-pointer">
          <MessageCircle size={16} />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white border border-[#F1E9DA] rounded-full pl-2 pr-3 py-1.5 hover:border-[#D4C8B5] transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#1C1815] text-[#E8A33D] flex items-center justify-center text-xs font-bold font-display">
              AD
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-[#2B2420] leading-none mb-0.5">{user?.name ?? "Member"}</p>
              {role && <PillBadge label={roleLabels[role] || ""} variant={roleBadgeVariant[role] || "muted"} />}
            </div>
            <ChevronDown size={14} className="text-[#8A7F6E]" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#F1E9DA] rounded-2xl shadow-lg z-20 py-2 overflow-hidden">
                <div className="px-4 py-2 border-b border-[#F1E9DA]">
                  <p className="text-xs font-semibold text-[#2B2420]">{user?.name ?? "Member"}</p>
                  <p className="text-[11px] text-[#8A7F6E]">{user?.email ?? ""}</p>
                </div>
                <button className="w-full text-left px-4 py-2.5 text-sm text-[#2B2420] hover:bg-[#F5F0E8] transition-colors flex items-center gap-2 cursor-pointer">
                  Profile Settings
                </button>
                <button
                  onClick={switchPortal}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#E8A33D] hover:bg-[#FDF4E7] transition-colors flex items-center gap-2 font-medium cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
