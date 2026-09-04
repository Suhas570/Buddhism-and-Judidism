export const memberGrowth = [
  { month: "Sep", members: 234 },
  { month: "Oct", members: 261 },
  { month: "Nov", members: 278 },
  { month: "Dec", members: 285 },
  { month: "Jan", members: 298 },
  { month: "Feb", members: 302 },
  { month: "Mar", members: 309 },
];

export const donationsByCenter = [
  { center: "Bodhi Grove", amount: 4200 },
  { center: "Lotus Path", amount: 2800 },
  { center: "Serene Mt.", amount: 1420 },
];

export const meditationHeatmap = Array.from({ length: 91 }, (_, i) => ({
  day: i,
  minutes: Math.random() > 0.3 ? Math.floor(Math.random() * 45) + 10 : 0,
}));

export const engagementData = [
  { month: "Sep", teachings: 12, events: 3, forum: 28 },
  { month: "Oct", teachings: 18, events: 4, forum: 35 },
  { month: "Nov", teachings: 14, events: 5, forum: 42 },
  { month: "Dec", teachings: 10, events: 6, forum: 38 },
  { month: "Jan", teachings: 22, events: 4, forum: 51 },
  { month: "Feb", teachings: 26, events: 7, forum: 63 },
  { month: "Mar", teachings: 31, events: 5, forum: 58 },
];
