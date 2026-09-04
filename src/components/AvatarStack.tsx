interface AvatarStackProps {
  names: string[];
  max?: number;
}

const COLORS = ["#E8A33D", "#7A2E2E", "#6B8E5A", "#C9A227", "#8A7F6E"];

export function AvatarStack({ names, max = 4 }: AvatarStackProps) {
  const shown = names.slice(0, max);
  const overflow = names.length - max;

  return (
    <div className="flex items-center">
      {shown.map((name, i) => {
        const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
        const bg = COLORS[i % COLORS.length];
        return (
          <div
            key={i}
            title={name}
            style={{ backgroundColor: bg, marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i }}
            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-semibold relative flex-shrink-0"
          >
            {initials}
          </div>
        );
      })}
      {overflow > 0 && (
        <div
          style={{ marginLeft: -8, zIndex: 0 }}
          className="w-7 h-7 rounded-full border-2 border-white bg-[#F1E9DA] flex items-center justify-center text-[9px] font-semibold text-[#8A7F6E] flex-shrink-0"
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
