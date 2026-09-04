import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, Building2, BookOpen, DollarSign, CalendarDays,
  BarChart2, Settings, FileText, ShieldCheck, Heart, Activity, Bell,
  MessageCircle, User, ChevronDown, ChevronRight, Menu, X, Headphones,
  Mail, Phone,
} from "lucide-react";
import { useRole } from "../context/RoleContext";

interface NavItem {
  label: string;
  icon: React.ElementType;
  to: string;
  badge?: number;
  children?: { label: string; to: string }[];
}

const superAdminNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/super-admin" },
  { label: "Admin Management", icon: ShieldCheck, to: "/super-admin/admins" },
  { label: "Sangha Centers", icon: Building2, to: "/super-admin/centers" },
  { label: "Global Users", icon: Users, to: "/super-admin/users" },
  { label: "Content Library", icon: BookOpen, to: "/super-admin/content" },
  { label: "Donations & Finance", icon: DollarSign, to: "/super-admin/donations" },
  { label: "Events Calendar", icon: CalendarDays, to: "/super-admin/events" },
  { label: "Reports", icon: BarChart2, to: "/super-admin/reports" },
  { label: "Settings", icon: Settings, to: "/super-admin/settings" },
  { label: "Audit Logs", icon: FileText, to: "/super-admin/audit" },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Members", icon: Users, to: "/admin/members", badge: 2 },
  {
    label: "Content Library", icon: BookOpen, to: "/admin/content",
    children: [
      { label: "Create New", to: "/admin/content/create" },
      { label: "All Teachings", to: "/admin/content" },
      { label: "My Uploads", to: "/admin/content/mine" },
      { label: "Featured", to: "/admin/content/featured" },
    ],
  },
  { label: "Events", icon: CalendarDays, to: "/admin/events" },
  { label: "Courses", icon: Activity, to: "/admin/courses" },
  { label: "Community", icon: MessageCircle, to: "/admin/community" },
  { label: "Donations", icon: DollarSign, to: "/admin/donations" },
  { label: "Announcements", icon: Bell, to: "/admin/announcements" },
  { label: "Reports", icon: BarChart2, to: "/admin/reports" },
];

const userNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/user" },
  { label: "Dharma Library", icon: BookOpen, to: "/user/library" },
  { label: "Meditation Tracker", icon: Activity, to: "/user/meditation" },
  { label: "Events & Retreats", icon: CalendarDays, to: "/user/events" },
  { label: "Sangha Connect", icon: MessageCircle, to: "/user/community" },
  { label: "My Courses", icon: FileText, to: "/user/courses" },
  { label: "Donations", icon: Heart, to: "/user/donations" },
  { label: "Notifications", icon: Bell, to: "/user/notifications" },
  { label: "Profile", icon: User, to: "/user/profile" },
];

function LotusIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="14" rx="4" ry="5" fill="currentColor" opacity="0.9" />
      <ellipse cx="7" cy="13" rx="3" ry="4" transform="rotate(-25 7 13)" fill="currentColor" opacity="0.7" />
      <ellipse cx="17" cy="13" rx="3" ry="4" transform="rotate(25 17 13)" fill="currentColor" opacity="0.7" />
      <ellipse cx="4" cy="11" rx="2.5" ry="3.5" transform="rotate(-45 4 11)" fill="currentColor" opacity="0.4" />
      <ellipse cx="20" cy="11" rx="2.5" ry="3.5" transform="rotate(45 20 11)" fill="currentColor" opacity="0.4" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="9" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { role, user } = useRole();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isJudaism = user?.communityType === "judaism";

  const communityUserNav = userNav.map((item) => {
    if (item.label === "Dharma Library") return { ...item, label: isJudaism ? "Torah Library" : "Dharma Library" };
    if (item.label === "Meditation Tracker") return { ...item, label: isJudaism ? "Prayer Tracker" : "Meditation Tracker" };
    if (item.label === "Events & Retreats") return { ...item, label: isJudaism ? "Events & Shabbat" : "Events & Retreats" };
    if (item.label === "Sangha Connect") return { ...item, label: isJudaism ? "Community Connect" : "Sangha Connect" };
    return item;
  });

  const communityAdminNav = adminNav.map((item) => {
    if (item.label === "Content Library") return { ...item, label: isJudaism ? "Torah Library" : "Content Library" };
    return item;
  });

  const navItems = role === "super-admin" ? superAdminNav : role === "admin" ? communityAdminNav : communityUserNav;
  const brand = isJudaism ? ["Torah", "Connect"] : ["Dharma", "Sangha"];
  const supportPhone = isJudaism ? "+1 (800) TORAH-1" : "+1 (800) DHARMA-1";
  const supportEmail = isJudaism ? "support@torahconnect.org" : "support@dharmasangha.org";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#F1E9DA]">
        <div className="w-9 h-9 rounded-xl bg-[#1C1815] flex items-center justify-center text-[#E8A33D] flex-shrink-0">
          <LotusIcon size={18} />
        </div>
        {!collapsed && (
          <div className="flex items-baseline gap-0.5 font-display font-bold text-lg text-[#2B2420]">
            {brand[0]}<span className="text-[#C9A227]">{brand[1]}</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-[#8A7F6E] hover:text-[#2B2420] transition-colors p-1 rounded-lg hover:bg-[#F1E9DA] cursor-pointer hidden md:block"
        >
          <Menu size={16} />
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto text-[#8A7F6E] md:hidden cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItem === item.label;

          return (
            <div key={item.label}>
              {hasChildren ? (
                <button
                  onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isExpanded
                      ? "bg-[#FDF4E7] text-[#E8A33D] border-l-2 border-[#E8A33D]"
                      : "text-[#8A7F6E] hover:bg-[#F5F0E8] hover:text-[#2B2420]"
                  }`}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </>
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.to.split("/").length <= 2}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-[#FDF4E7] text-[#E8A33D] border-l-2 border-[#E8A33D]"
                        : "text-[#8A7F6E] hover:bg-[#F5F0E8] hover:text-[#2B2420]"
                    }`
                  }
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="w-5 h-5 rounded-full bg-[#E8A33D] text-white text-[10px] font-bold flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )}

              {hasChildren && isExpanded && !collapsed && (
                <div className="ml-9 mt-1 space-y-0.5">
                  {item.children!.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      end
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 ${
                          isActive
                            ? "text-[#E8A33D] bg-[#FDF4E7]"
                            : "text-[#8A7F6E] hover:text-[#2B2420] hover:bg-[#F5F0E8]"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Support block */}
      {!collapsed && (
        <div className="border-t border-[#F1E9DA] px-4 py-4">
          <p className="text-xs font-semibold text-[#2B2420] mb-2">Need Help?</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] text-[#8A7F6E]">
              <Phone size={12} className="text-[#E8A33D]" />
              <span>{supportPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#8A7F6E]">
              <Mail size={12} className="text-[#E8A33D]" />
              <span>{supportEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#8A7F6E]">
              <Headphones size={12} className="text-[#E8A33D]" />
              <span>Live Chat Available</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl bg-white border border-[#F1E9DA] shadow-sm flex items-center justify-center text-[#8A7F6E] cursor-pointer"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full bg-[#FAF6EF] border-r border-[#F1E9DA] w-64 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-[#FAF6EF] border-r border-[#F1E9DA] transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
