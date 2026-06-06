import React from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  HeartHandshake,
  MapPin,
  Map,
  Bell,
  Settings,
  Search,
} from "lucide-react";

const demoItems = [
  {
    id: 1,
    type: "Lost",
    title: "Black Wallet",
    location: "Kurukshetra University",
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200",
  },
  {
    id: 2,
    type: "Found",
    title: "iPhone 13 Pro",
    location: "Near Bus Stand",
    time: "Today",
    image: "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=200",
  },
  {
    id: 3,
    type: "Lost",
    title: "College ID Card",
    location: "Library Block",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200",
  },
  {
    id: 4,
    type: "Pending",
    title: "Blue Backpack",
    location: "Canteen Area",
    time: "2d ago",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200",
  },
  {
    id: 5,
    type: "Found",
    title: "Fastrack Watch",
    location: "Sports Ground",
    time: "3d ago",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=200",
  },
];

const stats = [
  {
    label: "Total Reports",
    value: 48,
    change: "↑ 12% this week",
    positive: true,
    icon: <ClipboardList size={18} color="#5A735A" />,
    iconBg: "bg-[#5A735A]/10",
  },
  {
    label: "Lost Items",
    value: 31,
    change: "↑ 4 new today",
    positive: false,
    icon: <AlertCircle size={18} color="#c0392b" />,
    iconBg: "bg-red-100",
  },
  {
    label: "Found Items",
    value: 17,
    change: "↑ 6% vs last week",
    positive: true,
    icon: <CheckCircle size={18} color="#5A735A" />,
    iconBg: "bg-[#5A735A]/10",
  },
  {
    label: "Reunited",
    value: 9,
    change: "↑ 2 this month",
    positive: true,
    icon: <HeartHandshake size={18} color="#8a5f00" />,
    iconBg: "bg-amber-100",
  },
];

const activity = [
  { color: "bg-[#5A735A]", text: "Your report Black Wallet got a match!", time: "Just now" },
  { color: "bg-blue-500", text: "Someone commented on iPhone 13", time: "1h ago" },
  { color: "bg-amber-400", text: "College ID Card marked as pending verification", time: "3h ago" },
  { color: "bg-red-500", text: "New lost item near Kurukshetra University", time: "5h ago" },
];

const weeklyData = [
  { day: "Mon", height: 45, lost: false },
  { day: "Tue", height: 70, lost: false },
  { day: "Wed", height: 35, lost: false },
  { day: "Thu", height: 85, lost: false },
  { day: "Fri", height: 55, lost: false },
  { day: "Sat", height: 40, lost: true },
  { day: "Sun", height: 20, lost: false, faded: true },
];

const badgeClass = (type) => {
  if (type === "Lost") return "bg-red-100 text-red-600";
  if (type === "Found") return "bg-[#5A735A]/10 text-[#3d5c3d]";
  return "bg-amber-100 text-amber-800";
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#FDF0ED]/80 border-b border-black/5 px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl italic font-serif text-[#5A735A]">
          Reverto
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/report-lost"
            className="hidden md:flex items-center gap-2 rounded-full bg-[#5A735A] px-5 py-2.5 text-white text-sm font-medium transition-all hover:scale-105"
          >
            <Plus size={15} />
            Report Item
          </Link>
          <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
            S
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Greeting */}
        <div className="mb-7">
          <p className="text-sm text-black/40 mb-1">Saturday, June 6 · Yamuna Nagar</p>
          <h1 className="italic font-serif text-3xl text-[#5A735A] font-normal">
            Good morning, Siddharth.
          </h1>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/5 p-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.iconBg}`}>
                {s.icon}
              </div>
              <p className="text-xs text-black/45 font-medium mb-1">{s.label}</p>
              <p className="text-3xl font-semibold text-black leading-none mb-1">{s.value}</p>
              <p className={`text-xs ${s.positive ? "text-[#5A735A]" : "text-red-600"}`}>
                {s.change}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-5 mb-5">

          {/* Recent Reports */}
          <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <h2 className="text-sm font-semibold">Recent Reports</h2>
              <Link to="/items" className="text-xs text-[#5A735A] font-medium">View all →</Link>
            </div>
            {demoItems.map((item) => (
              <Link
                to={`/item/${item.id}`}
                key={item.id}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-black/[0.04] last:border-none hover:bg-black/[0.02] transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-black/45 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} />
                    {item.location}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${badgeClass(item.type)}`}>
                  {item.type}
                </span>
                <span className="text-xs text-black/35 flex-shrink-0 hidden sm:block">{item.time}</span>
              </Link>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">

            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
                <h2 className="text-sm font-semibold">Your Profile</h2>
                <button className="text-xs text-[#5A735A] font-medium">Edit</button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Siddharth</p>
                    <p className="text-xs text-black/45">siddharth@example.com</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[["5", "Reported"], ["2", "Found"], ["3", "Reunited"]].map(([n, l]) => (
                    <div key={l} className="bg-[#FDF0ED] rounded-xl p-2.5 text-center">
                      <p className="text-lg font-semibold text-[#5A735A]">{n}</p>
                      <p className="text-xs text-black/45 mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/report-lost"
                    className="flex items-center justify-center gap-1.5 bg-[#5A735A] text-white rounded-xl py-2.5 text-xs font-medium"
                  >
                    <Plus size={13} /> Report Lost
                  </Link>
                  <Link
                    to="/items"
                    className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all"
                  >
                    <Search size={13} /> Browse
                  </Link>
                  <button className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all">
                    <Bell size={13} /> Alerts
                  </button>
                  <button className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all">
                    <Settings size={13} /> Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-black/5">
                <h2 className="text-sm font-semibold">Recent Activity</h2>
              </div>
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3 border-b border-black/[0.04] last:border-none">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.color}`} />
                  <div>
                    <p className="text-xs text-black/70 leading-relaxed">{a.text}</p>
                    <p className="text-xs text-black/35 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Weekly Chart */}
          <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <h2 className="text-sm font-semibold">Weekly Activity</h2>
              <span className="text-xs text-black/40">This month</span>
            </div>
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-end gap-2 h-24">
                {weeklyData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className={`w-full rounded-t-lg transition-opacity hover:opacity-70 ${
                        d.lost ? "bg-red-400/70" : d.faded ? "bg-[#5A735A]/30" : "bg-[#5A735A]"
                      }`}
                      style={{ height: `${d.height}px` }}
                    />
                    <span className="text-[10px] text-black/40">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 px-5 py-3 border-t border-black/5">
              <div className="flex items-center gap-1.5 text-xs text-black/50">
                <div className="w-2 h-2 rounded-full bg-[#5A735A]" /> Found
              </div>
              <div className="flex items-center gap-1.5 text-xs text-black/50">
                <div className="w-2 h-2 rounded-full bg-red-400/70" /> Lost
              </div>
            </div>
          </div>

          {/* Hotspot Map */}
          <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <h2 className="text-sm font-semibold">Hotspot Map</h2>
              <span className="text-xs text-[#5A735A] font-medium cursor-pointer">Expand</span>
            </div>
            <div className="mx-5 my-4 h-40 bg-gradient-to-br from-[#e8f0e8] to-[#d4e4d4] rounded-2xl flex flex-col items-center justify-center gap-2">
              <Map size={32} color="#5A735A" className="opacity-50" />
              <span className="text-xs text-[#5A735A] font-medium">Kurukshetra · Yamuna Nagar</span>
            </div>
            <div className="flex gap-5 px-5 pb-4">
              {[
                { color: "bg-red-500", label: "University Gate" },
                { color: "bg-[#5A735A]", label: "Bus Stand" },
                { color: "bg-amber-400", label: "Library" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-1.5 text-xs text-black/50">
                  <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;