Build a complete frontend-only web platform called "Dharma Sangha" — a 
community management dashboard for a Buddhist religious community. 
Use React (Vite) + Tailwind CSS + react-router-dom. No backend — use 
mock JSON data and local/context state only. Everything must share one 
consistent design system across every screen — same fonts, same colors, 
same card style, same spacing rhythm, no visual drift between pages.

═══════════════════════════════════════════
GLOBAL DESIGN SYSTEM (apply identically everywhere)
═══════════════════════════════════════════
Theme name: "Zen Modern"

Colors (Tailwind theme extension):
- background: #FAF6EF (warm cream)
- surface: #FFFFFF, card border: #F1E9DA
- dark surface (for elevated/premium cards & dark sections): #1C1815
- primary / saffron: #E8A33D
- secondary / maroon: #7A2E2E
- accent / gold: #C9A227
- text-primary: #2B2420
- text-inverse: #F5EFE3 (for text on dark cards)
- text-muted: #8A7F6E
- success: #6B8E5A | warning: #D98E3C | danger: #B94A3F
- Full dark mode variant: background #1C1815, surface #26201A, 
  text #F1E9DA, keep saffron/gold accents identical

Typography:
- Headings/Display: "General Sans" (bold, 600–700 weight, tight 
  letter-spacing, large sizes for hero/landing headlines) — load via 
  Fontshare CDN
- Body/UI: "Inter" — all labels, table text, buttons, nav items
- Type scale: text-5xl/6xl bold for landing hero, text-2xl/3xl semibold 
  for page titles, text-sm for metadata/labels, tracking-tight on all 
  display headings

Visual language:
- rounded-2xl on all cards, rounded-full on pill badges and primary 
  buttons
- Soft shadows only (shadow-sm/shadow-md on hover), never harsh drop 
  shadows
- Icons: lucide-react, outline/thin style, consistent size (18–20px)
- Smooth 200ms transitions on all hover/active states
- Pill badges (rounded-full, small caps, bordered) used for role tags 
  and status labels throughout — e.g. "SUPER ADMIN", "ACTIVE", 
  "DRAFT"

═══════════════════════════════════════════
SCREEN 1 — PORTAL SELECTOR LANDING PAGE
═══════════════════════════════════════════
Full-height cream background page, centered content, no sidebar.

- Top center: small logo mark (lotus/geometric icon in a rounded dark 
  square) + wordmark "Dharma" + "Sangha" in accent color, e.g. 
  "Dharma[Sangha]" styled like a product logo
- Large bold headline: "Choose your portal" (General Sans, bold, 
  text-5xl/6xl, tight tracking)
- Subheading below in text-muted: "Select a workspace to continue to 
  your dashboard"
- Below: 3 cards in a row (desktop), stacked on mobile, each 
  rounded-3xl, generous padding:

  CARD 1 — "USER PORTAL" (lightest card, cream/white surface)
    - Icon in soft saffron-tinted rounded square (e.g. user/heart icon)
    - Pill badge top-right: "USER PORTAL" (outlined, saffron text)
    - Title: "Sangha Member" (bold)
    - Description: "Access teachings, meditation tracking, events, and 
      your community, all in one place."
    - Button: "Open Dashboard" — dark background, white text, 
      rounded-full, arrow icon, bottom-left aligned

  CARD 2 — "ADMIN PANEL" (mid card, subtle saffron-tinted surface)
    - Icon in rounded square (settings/calendar icon)
    - Pill badge: "ADMIN PANEL" (filled saffron background)
    - Title: "Center Admin"
    - Description: "Manage your center's members, teachings, events, 
      and local community activity."
    - Button: "Open Panel" — saffron/gold background, dark text, 
      rounded-full, arrow icon

  CARD 3 — "SUPER ADMIN" (darkest card, #1C1815 background, most 
  premium/elevated visual treatment — this is the highest-privilege 
  role so it should look the most authoritative)
    - Icon in dark rounded square with gold icon color
    - Pill badge: "SUPER ADMIN" (gold outline on dark)
    - Title in text-inverse (cream/white): "Platform Admin"
    - Description in muted light gray: "Oversee all centers, admins, 
      donations, and platform-wide operations."
    - Button: "Open Control Center" — gold/amber background, dark 
      text, rounded-full, arrow icon

Clicking any card's button routes to that role's dashboard shell 
(store selected role in React context — no real auth, just a role 
switch for this frontend demo).

═══════════════════════════════════════════
SHARED APP SHELL (used by all 3 dashboards after landing)
═══════════════════════════════════════════
FIXED LEFT SIDEBAR (~250px, sticky, full height)
- Top: logo + wordmark + collapse toggle icon
- Flat nav list, lucide-react icons, nav items differ per role (see 
  below); one item can be expandable with nested sub-links (indented, 
  shown when parent expanded)
- Active nav item: soft saffron-tinted background + saffron left border
- Optional small count badge on one nav item (e.g. Community: 2)
- Bottom-anchored support block (divider above it): "Need Help?" 
  heading, hotline number, email, small icon row

TOPBAR (right of sidebar, full width)
- Left: dropdown filter + search input with icon
- Right: primary CTA button (role-specific label, saffron/gold, 
  rounded-full), notification bell (with dot indicator), message icon, 
  avatar with role pill badge + dropdown chevron (shows current role, 
  with a "Switch Portal" option that routes back to landing page)

TOOLBAR ROW (below topbar, above main content, subtle bottom border)
- Left: secondary dropdown (context-specific, e.g. "My Content") + 
  "Filter" button with icon
- Right: "Sort by" dropdown, grid/list view toggle (two icon buttons, 
  active filled dark), "Export" button (outline), primary dark button 
  with dropdown chevron (context-specific action, e.g. "Add Content")

CARD GRID PATTERN (used for all list-style content: teachings, 
members, events, donations, admins, centers — reuse this exact card 
component everywhere, only the fields/data change)
- 3 columns desktop, 2 tablet, 1 mobile, gap-6
- Each card: rounded-2xl, white surface, soft border, hover:shadow-md
- Top row: bold title (can wrap 2 lines) + checkbox top-right
- 2x2 metadata grid below (label in small caps text-muted above value 
  in medium-weight text-primary) — must align identically across every 
  card in the grid, this precision is critical
- "Contributors/Members" label + overlapping circular avatar stack 
  (max 4 shown + "+N" overflow bubble)
- Thin divider line
- Bottom icon row: view, edit, share/message, call/download, delete — 
  muted gray default, saffron on hover, evenly spaced

═══════════════════════════════════════════
SCREEN 2 — SUPER ADMIN DASHBOARD (uses shared shell)
═══════════════════════════════════════════
Nav: Dashboard, Admin Management, Sangha Centers, Users (global), 
Content Library, Donations & Finance, Events Calendar, Reports, 
Settings, Audit Logs

Sections:
1. Overview — KPI stat cards (Total Members, Active Centers, Total 
   Admins, Monthly Donations) + line chart (member growth) + bar chart 
   (donations by center) + recent activity feed
2. Admin Management — card grid of admins (name, assigned center, 
   status badge, contact icons) using the shared card pattern
3. Sangha Centers — card grid of centers (name, location, head monk, 
   member count)
4. Global Users — card grid or table toggle, searchable/filterable, 
   role badges, suspend/activate action
5. Content Library oversight — card grid of all teachings across 
   centers with approve/feature actions
6. Donations & Finance — table + summary stat cards, filter by 
   center/date, export button
7. Events Calendar — full calendar view of retreats/festivals across 
   all centers
8. Reports & Analytics — charts: engagement, donation trends, 
   center-wise comparison
9. Settings — role/permission matrix, branding, notifications
10. Audit Logs — timestamped action table

═══════════════════════════════════════════
SCREEN 3 — ADMIN DASHBOARD (uses shared shell)
═══════════════════════════════════════════
Nav: Dashboard, Members, Content Library (expandable: Create New, All 
Teachings, My Uploads, Featured), Events, Courses, Community, 
Donations, Announcements, Reports

Sections:
1. Center Dashboard — local KPI cards + upcoming events + engagement 
   snapshot
2. Members — card grid, approve pending members, view/edit profile
3. Content Library — card grid pattern exactly as specified above, 
   populated with real Buddhist teaching titles (see sample data below)
4. Events — create/edit meditation sessions & retreats, RSVP list 
   per event, calendar + card view toggle
5. Courses & Programs — card grid with progress/enrollment stats
6. Community Moderation — forum thread/comment queue cards, 
   approve/hide/delete actions
7. Donations — table of donations received by this center + summary 
   card
8. Announcements — compose/broadcast form + sent history list
9. Reports — attendance charts, engagement summary

═══════════════════════════════════════════
SCREEN 4 — USER DASHBOARD (uses shared shell)
═══════════════════════════════════════════
Nav: Dashboard, Dharma Library, Meditation Tracker, Events & Retreats, 
Sangha Connect, My Courses, Donations, Notifications, Profile

Sections:
1. Personal Dashboard — greeting card, meditation streak counter, 
   upcoming events reminder, "continue learning" card, dharma 
   quote-of-the-day banner
2. Dharma Library — card grid pattern, filterable by category 
   (Sutra, Dharma Talk, Meditation Guide, Course, Article)
3. Meditation Tracker — session timer widget, GitHub-style streak 
   heatmap calendar, session history list
4. Events & Retreats — card grid of upcoming events with register 
   button + "My Registered Events" section
5. Sangha Connect — community forum feed (post cards with like/reply 
   counts), study groups list
6. My Courses — enrolled courses with progress bars, continue button
7. Donations — donation form (preset amounts + custom input) + 
   donation history table
8. Notifications — list of alerts (new teaching posted, event 
   reminder, forum reply)
9. Profile & Settings — avatar, personal info form, notification 
   preferences, dark/light mode toggle

═══════════════════════════════════════════
SAMPLE MOCK DATA (use realistic Buddhist-context content, not 
placeholder lorem ipsum)
═══════════════════════════════════════════
Teachings: "Metta Sutta — Loving Kindness", "Heart Sutra Commentary", 
"Vesak Day Dharma Talk", "Vipassana Foundations (Course)", "Anapanasati 
— Breath Meditation Guide", "Right Speech in Daily Life", "Bodhicitta 
and Compassion Practice", "Uposatha Observance Guide"

Events: "Vesak Full Moon Retreat", "Weekend Vipassana Intensive", 
"Uposatha Day Observance", "New Member Orientation Sit", "Loving 
Kindness Meditation Circle"

Centers: names like "Bodhi Grove Sangha", "Lotus Path Meditation 
Center", "Serene Mountain Vihara"

═══════════════════════════════════════════
TECHNICAL REQUIREMENTS
═══════════════════════════════════════════
- React (Vite) + Tailwind CSS + react-router-dom for all routing 
  (landing page + 3 dashboard route groups)
- recharts for all charts/graphs
- lucide-react for all icons
- Load "General Sans" via Fontshare CDN link in index.html, "Inter" 
  via Google Fonts, wire both into tailwind.config as fontFamily.display 
  and fontFamily.sans
- Fully responsive: mobile (sidebar becomes slide-out drawer, toolbar 
  wraps), tablet (sidebar icon-rail), desktop (full sidebar)
- Mock data organized in a /data folder as separate JSON files (users, 
  centers, events, courses, donations, forum posts, admins)
- Reusable shared components: Sidebar, Topbar, Toolbar, ContentCard, 
  StatCard, AvatarStack, StatusBadge, ViewToggle, Modal, Button, 
  PillBadge, EmptyState, LoadingSkeleton
- Role stored in React context; "Switch Portal" in topbar avatar 
  dropdown returns to the landing page and clears the selected role
- Accessible: visible keyboard focus states, sufficient color contrast, 
  semantic HTML throughout
- No console errors, no broken imports, no unused/missing route 
  definitions — verify every nav link resolves to a real page before 
  finishing

Build with a clean, organized folder structure: /components, /pages, 
/layouts, /data, /context, /routes. Prioritize absolute visual 
consistency — the landing page, and all 3 dashboards, must look like 
they came from the same product, not three different templates.