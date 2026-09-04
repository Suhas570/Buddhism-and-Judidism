export type Center = {
  id: number;
  communityType: "buddhism" | "judaism";
  name: string;
  location: string;
  headMonk: string;
  memberCount: number;
  adminCount: number;
  status: "active" | "inactive";
  founded: string;
};

export type User = {
  id: number;
  communityType: "buddhism" | "judaism";
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  role: "member" | "admin";
  center: string;
  status: "active" | "pending" | "suspended";
  joined: string;
  avatar: string | null;
};

export type Admin = {
  id: number;
  communityType: "buddhism" | "judaism";
  name: string;
  email: string;
  phone: string;
  center: string;
  role: "Center Admin" | "Content Admin";
  status: "active" | "inactive";
  since: string;
};

export type Teaching = {
  id: number;
  communityType: "buddhism" | "judaism";
  title: string;
  category: string;
  author: string;
  center: string;
  status: "published" | "draft";
  duration: string;
  views: number;
  date: string;
  featured: boolean;
};

export type Event = {
  id: number;
  communityType: "buddhism" | "judaism";
  title: string;
  type: string;
  center: string;
  date: string;
  endDate: string;
  location: string;
  registrations: number;
  capacity: number;
  status: "upcoming" | "completed" | "cancelled";
};

export type Donation = {
  id: number;
  communityType: "buddhism" | "judaism";
  donor: string;
  amount: number;
  center: string;
  date: string;
  method: string;
  purpose: string;
};

export type ForumPost = {
  id: number;
  communityType: "buddhism" | "judaism";
  author: string;
  title: string;
  preview: string;
  likes: number;
  replies: number;
  category: string;
  date: string;
  status: "approved" | "pending" | "rejected";
};

export type StudyGroup = {
  id: number;
  communityType: "buddhism" | "judaism";
  name: string;
  members: number;
  nextMeeting: string;
  facilitator: string;
};

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  streak: number;
  meditationMinutes: number;
  role: "user" | "admin" | "super-admin";
  communityType: "buddhism" | "judaism";
};

export type DashboardSummary = {
  role: "user" | "admin" | "super-admin";
  totals: {
    centers: number;
    members: number;
    admins: number;
    teachings: number;
    publishedTeachings: number;
    upcomingEvents: number;
    forumPosts: number;
    approvedForumPosts: number;
    donations: number;
  };
  recent: {
    users: User[];
    donations: Donation[];
    events: Event[];
    teachings: Teaching[];
  };
};
