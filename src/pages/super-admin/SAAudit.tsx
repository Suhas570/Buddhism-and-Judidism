const auditLogs = [
  { id: 1, user: "Ananda Dev", action: "Created admin account", target: "Yuki Tanaka", timestamp: "2024-03-10 14:32:05", ip: "192.168.1.4" },
  { id: 2, user: "Ananda Dev", action: "Approved teaching", target: "Metta Sutta Commentary", timestamp: "2024-03-09 10:11:42", ip: "192.168.1.4" },
  { id: 3, user: "Sunita Rao", action: "Suspended user", target: "Rajan Pillai", timestamp: "2024-03-08 16:55:30", ip: "10.0.0.12" },
  { id: 4, user: "Marco Delgado", action: "Published event", target: "Weekend Vipassana Intensive", timestamp: "2024-03-07 09:20:18", ip: "10.0.0.15" },
  { id: 5, user: "Ananda Dev", action: "Updated permission matrix", target: "Content Admin role", timestamp: "2024-03-06 13:45:00", ip: "192.168.1.4" },
  { id: 6, user: "David Chen", action: "Exported donation report", target: "Feb 2024", timestamp: "2024-03-05 11:03:22", ip: "10.0.0.20" },
];

export function SAAudit() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Audit Logs</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Timestamped record of all admin actions</p>
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F1E9DA]">
              {["Timestamp", "User", "Action", "Target", "IP"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] px-5 py-3.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} className="border-b border-[#F9F5EE] last:border-0 hover:bg-[#FDFAF5] transition-colors">
                <td className="px-5 py-3.5 font-mono text-xs text-[#8A7F6E]">{log.timestamp}</td>
                <td className="px-5 py-3.5 font-medium text-[#2B2420]">{log.user}</td>
                <td className="px-5 py-3.5 text-[#2B2420]">{log.action}</td>
                <td className="px-5 py-3.5 text-[#8A7F6E]">{log.target}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-[#B8A98C]">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
