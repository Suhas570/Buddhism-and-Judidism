export function SASettings() {
  const roles = ["Super Admin", "Center Admin", "Content Admin", "Member"];
  const permissions = ["Manage Centers", "Manage Users", "Manage Content", "Manage Admins", "View Reports", "Manage Donations", "Send Announcements"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Settings</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Role permissions and platform configuration</p>
      </div>

      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
        <h2 className="font-display font-semibold text-base text-[#2B2420] mb-5">Role & Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F1E9DA]">
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] pb-3 pr-6">Permission</th>
                {roles.map((r) => (
                  <th key={r} className="text-center text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] pb-3 px-3">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, i) => {
                const matrix = [
                  [true, true, true, false],
                  [true, true, false, false],
                  [true, true, true, false],
                  [true, false, false, false],
                  [true, true, false, false],
                  [true, false, false, false],
                  [true, true, false, false],
                ];
                return (
                  <tr key={perm} className="border-b border-[#F9F5EE] last:border-0">
                    <td className="py-3 pr-6 text-[#2B2420] font-medium">{perm}</td>
                    {roles.map((r, j) => (
                      <td key={r} className="py-3 px-3 text-center">
                        <span className={`inline-block w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center mx-auto ${matrix[i][j] ? "bg-[#E8F4E3] text-[#6B8E5A]" : "bg-[#F5F0E8] text-[#C8BFB0]"}`}>
                          {matrix[i][j] ? "✓" : "—"}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
