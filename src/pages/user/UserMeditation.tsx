import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { meditationHeatmap } from "../../data/chartData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

const sessions = [
  { id: 1, date: "2024-03-09", duration: "30 min", type: "Anapanasati", notes: "Stable concentration, less wandering" },
  { id: 2, date: "2024-03-08", duration: "20 min", type: "Metta", notes: "Extended loving-kindness to difficult person" },
  { id: 3, date: "2024-03-07", duration: "45 min", type: "Vipassana", notes: "Deep body scan, noticed impermanence clearly" },
  { id: 4, date: "2024-03-06", duration: "15 min", type: "Anapanasati", notes: "Short sit before work" },
  { id: 5, date: "2024-03-05", duration: "30 min", type: "Walking Meditation", notes: "Outdoor walking at the park" },
];

function intensityColor(minutes: number) {
  if (minutes === 0) return "#F1E9DA";
  if (minutes < 15) return "#F5D99C";
  if (minutes < 30) return "#E8A33D";
  return "#C98A28";
}

export function UserMeditation() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  function reset() { setRunning(false); setSeconds(0); }

  const weeks = [];
  for (let w = 0; w < 13; w++) {
    weeks.push(meditationHeatmap.slice(w * 7, w * 7 + 7));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Meditation Tracker</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">21-day streak · 1,240 total minutes</p>
      </div>

      {/* Timer */}
      <div className="bg-[#1C1815] border border-[#3A3028] rounded-2xl p-8 flex flex-col items-center gap-6">
        <p className="text-[#8A7F6E] text-xs uppercase tracking-widest">Session Timer</p>
        <div className="font-display font-bold text-7xl text-[#F5EFE3] tracking-tight tabular-nums">
          {formatTime(seconds)}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="w-11 h-11 rounded-full bg-[#2A2018] text-[#8A7F6E] flex items-center justify-center hover:text-[#F5EFE3] transition-colors cursor-pointer"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setRunning(!running)}
            className="w-16 h-16 rounded-full bg-[#E8A33D] text-[#1C1815] flex items-center justify-center hover:bg-[#C98A28] transition-colors cursor-pointer shadow-lg"
          >
            {running ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
        </div>
        <p className="text-xs text-[#8A7F6E]">
          {running ? "Session in progress — sit with awareness" : "Press play to begin your session"}
        </p>
      </div>

      {/* Heatmap */}
      <div className="bg-white border border-[#F1E9DA] rounded-2xl p-6">
        <h2 className="font-display font-semibold text-[#2B2420] mb-4">Practice Calendar (13 weeks)</h2>
        <div className="flex gap-1 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-[9px] text-[#B8A98C] w-5 text-center flex-shrink-0">{d}</div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex gap-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.minutes} min`}
                  style={{ backgroundColor: intensityColor(day.minutes) }}
                  className="w-5 h-5 rounded-sm flex-shrink-0 cursor-default transition-opacity hover:opacity-75"
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] text-[#8A7F6E]">Less</span>
          {["#F1E9DA", "#F5D99C", "#E8A33D", "#C98A28"].map((c) => (
            <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[10px] text-[#8A7F6E]">More</span>
        </div>
      </div>

      {/* Session history */}
      <div className="bg-white border border-[#F1E9DA] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F1E9DA]">
          <h2 className="font-display font-semibold text-[#2B2420]">Session History</h2>
        </div>
        <div className="divide-y divide-[#F9F5EE]">
          {sessions.map((s) => (
            <div key={s.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-[#2B2420] text-sm">{s.type}</p>
                <p className="text-xs text-[#8A7F6E] mt-0.5 italic">{s.notes}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-[#E8A33D]">{s.duration}</p>
                <p className="text-xs text-[#B8A98C]">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
