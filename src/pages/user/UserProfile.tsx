import { useState } from "react";

export function UserProfile() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({ teachings: true, events: true, forum: false, donations: true });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Profile & Settings</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#1C1815] text-[#E8A33D] flex items-center justify-center font-display font-bold text-2xl">
            AD
          </div>
          <div>
            <p className="font-display font-bold text-lg text-[#2B2420]">Ananda Dev</p>
            <p className="text-sm text-[#8A7F6E]">Sangha Member · Bodhi Grove Sangha</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Ananda Dev", type: "text" },
            { label: "Email", value: "ananda@dharmasangha.org", type: "email" },
            { label: "Phone", value: "+1 415-555-0299", type: "tel" },
            { label: "Location", value: "San Francisco, CA", type: "text" },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] mb-1">{f.label}</label>
              <input
                defaultValue={f.value}
                type={f.type}
                className="w-full px-4 py-2.5 bg-[#FAF6EF] border border-[#F1E9DA] rounded-xl text-sm text-[#2B2420] focus:outline-none focus:border-[#E8A33D] transition-colors"
              />
            </div>
          ))}
        </div>

        <button className="px-5 py-2 bg-[#E8A33D] text-[#2B2420] font-semibold text-sm rounded-full hover:bg-[#C98A28] transition-colors cursor-pointer">
          Save Changes
        </button>
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-semibold text-[#2B2420]">Notification Preferences</h2>
        {Object.entries(notifications).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-[#F9F5EE] last:border-0">
            <p className="text-sm text-[#2B2420] capitalize">{key === "teachings" ? "New Teaching Posted" : key === "events" ? "Event Reminders" : key === "forum" ? "Forum Replies" : "Donation Receipts"}</p>
            <button
              onClick={() => setNotifications((prev) => ({ ...prev, [key]: !val }))}
              className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${val ? "bg-[#E8A33D]" : "bg-[#D4C8B5]"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${val ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-semibold text-[#2B2420]">Dark Mode</h2>
            <p className="text-xs text-[#8A7F6E] mt-0.5">Toggle dark / light theme</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${darkMode ? "bg-[#E8A33D]" : "bg-[#D4C8B5]"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
