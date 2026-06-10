import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import API from "../api/axios";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";
import {
  Plus,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  HeartHandshake,
  MapPin,
  Bell,
  Settings,
  Search,
  ChevronRight,
  Clock,
  Eye,
  Package,
  LogOut,
  ArrowRight,
  Home,
  Send,
  Loader2,
  X,
  MessageCircle,
  Lock,
} from "lucide-react";

// ─── socket singleton ─────────────────────────────────────────────────────────
let socket = null;
const getSocket = (token) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      auth: { token },
      withCredentials: true,
    });
  }
  return socket;
};

// ─── helpers ──────────────────────────────────────────────────────────────────
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

const StatusPill = ({ status }) => {
  const map = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-[#5A735A]/10 text-[#5A735A]",
    rejected: "bg-red-100 text-red-600",
  };
  return (
    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full capitalize ${map[status] || "bg-black/5 text-black/50"}`}>
      {status}
    </span>
  );
};

const TABS = ["Overview", "My Claims", "Claims Inbox"];

const weeklyData = [
  { day: "Mon", height: 45, lost: false },
  { day: "Tue", height: 70, lost: false },
  { day: "Wed", height: 35, lost: false },
  { day: "Thu", height: 85, lost: false },
  { day: "Fri", height: 55, lost: false },
  { day: "Sat", height: 40, lost: true },
  { day: "Sun", height: 20, lost: false, faded: true },
];

// ─── inline chat panel ────────────────────────────────────────────────────────
const ChatPanel = ({ claim, user, token, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const claimId = claim._id;

  // figure out other person
  const otherPerson =
    claim.claimantId?._id === user._id || claim.claimantId === user._id
      ? claim.ownerId
      : claim.claimantId;

 useEffect(() => {
  fetchMessages();

 

  const s = getSocket(token);

 

  s.emit("join_room", { claimId });

  s.on("joined_room", () => {
    s.emit("mark_read", { claimId });
  });

  s.on("new_message", (msg) => {


    setMessages((prev) =>
      prev.find((m) => m._id === msg._id)
        ? prev
        : [...prev, msg]
    );

    s.emit("mark_read", { claimId });
  });

  return () => {
    s.off("connect");
    s.off("connect_error");
    s.off("error");
    s.off("joined_room");
    s.off("new_message");
  };
}, [claimId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get(`/messages/${claimId}`);
      setMessages(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    const s = getSocket(token);
    setSending(true);
    s.emit("send_message", { claimId, text: text.trim() });
    setText("");
    inputRef.current?.focus();
    setSending(false);
  };

  const myId = user?._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl border border-[#5A735A]/20 shadow-lg overflow-hidden flex flex-col"
      style={{ height: "520px" }}
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5 bg-[#5A735A]/5 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-[#5A735A] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          {otherPerson?.name?.charAt(0).toUpperCase() || "?"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">
            {otherPerson?.name || "User"}
          </p>
          <p className="text-xs text-black/40 truncate">
            re: {claim.itemId?.title || "item"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-[#5A735A] text-white px-2 py-0.5 rounded-full font-medium">
            Approved
          </span>
          <button
            onClick={onClose}
            className="h-7 w-7 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-all"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Privacy note */}
      <div className="mx-4 mt-3 mb-1 rounded-xl bg-[#5A735A]/5 border border-[#5A735A]/10 px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <Lock size={11} className="text-[#5A735A] flex-shrink-0" />
        <p className="text-[11px] text-[#5A735A]/70">
          Private conversation — arrange the return safely.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={20} className="animate-spin text-[#5A735A]" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-black/25">
            <MessageCircle size={28} />
            <p className="text-xs">Say hello to start arranging the return!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine =
              msg.senderId?._id === myId || msg.senderId === myId;
            return (
              <div
                key={msg._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1`}
              >
                {!isMine && (
                  <div className="w-6 h-6 rounded-full bg-[#5A735A]/20 text-[#5A735A] flex items-center justify-center text-[10px] font-bold mr-1.5 flex-shrink-0 self-end mb-1">
                    {otherPerson?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <div className={`max-w-[72%] flex flex-col gap-0.5 ${isMine ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                      isMine
                        ? "bg-[#5A735A] text-white rounded-br-sm"
                        : "bg-[#FDF0ED] text-black/80 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-black/25 px-1">
                    {fmtTime(msg.createdAt)}
                    {isMine && <span className="ml-1">{msg.read ? "✓✓" : "✓"}</span>}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-black/5 flex-shrink-0">
        <form
          onSubmit={sendMessage}
          className="flex items-center gap-2 bg-[#FDF0ED] rounded-xl border border-black/8 px-3 py-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-black/30"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="h-7 w-7 rounded-lg bg-[#5A735A] text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-all flex-shrink-0"
          >
            <Send size={12} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// ─── main dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user, setUser, token } = useAuth();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Overview");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboard, setDashboard] = useState({
    lostItems: [],
    foundItems: [],
    myClaims: [],
  });
  const [ownerData, setOwnerData] = useState({
    totalClaims: 0,
    pendingClaims: [],
    approvedClaims: [],
    rejectedClaims: [],
  });
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activeChatClaim, setActiveChatClaim] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const [myData, owner] = await Promise.all([
        API.get("/dashboard/me"),
        API.get("/dashboard/owner"),
      ]);
      setDashboard(myData.data);
      setOwnerData(owner.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaimAction = async (claimId, action) => {
    try {
      setActionLoading(true);
      setActionMsg("");
      await API.patch(`/claims/${claimId}/verify`, {
        action: action === "accepted" ? "approve" : "reject",
      });
      setActionMsg(
        action === "accepted"
          ? " Claim accepted! You can now chat with them."
          : " Claim rejected."
      );
      setSelectedClaim(null);
      fetchDashboard();
    } catch (err) {
      setActionMsg(err.response?.data?.message || "Something went wrong.");
    } finally {
      setActionLoading(false);
    }
  };

  const allInboxClaims = [
    ...ownerData.pendingClaims,
    ...ownerData.approvedClaims,
    ...ownerData.rejectedClaims,
  ];

  const stats = [
    {
      label: "My Lost Reports",
      value: dashboard.lostItems.length,
      icon: <AlertCircle size={18} color="#c0392b" />,
      iconBg: "bg-red-100",
    },
    {
      label: "My Found Reports",
      value: dashboard.foundItems.length,
      icon: <CheckCircle size={18} color="#5A735A" />,
      iconBg: "bg-[#5A735A]/10",
    },
    {
      label: "Incoming Claims",
      value: ownerData.pendingClaims.length,
      icon: <ClipboardList size={18} color="#5A735A" />,
      iconBg: "bg-[#5A735A]/10",
    },
    {
      label: "My Claims",
      value: dashboard.myClaims.length,
      icon: <HeartHandshake size={18} color="#8a5f00" />,
      iconBg: "bg-amber-100",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans pt-24">
      {/* Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] px-6 py-3"
        >
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center font-bold text-white text-sm">F</div>
              <span className="italic font-serif text-xl tracking-wide text-[#111111] font-semibold">FindBack</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to="/report-lost"
                className="hidden md:flex items-center gap-2 rounded-full bg-[#5A735A] px-5 py-2 text-xs font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Plus size={14} /> Report Item
              </Link>
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="w-9 h-9 rounded-full bg-[#5A735A] text-white font-semibold text-sm flex items-center justify-center hover:scale-105 transition-all">
                    {user.name?.charAt(0).toUpperCase()}
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-black/5 shadow-xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-black/5">
                          <p className="text-sm font-semibold text-black truncate">{user.name}</p>
                          <p className="text-xs text-black/45 truncate">{user.email}</p>
                        </div>
                        <Link to="/home" className="flex items-center gap-3 px-4 py-3 text-sm text-black/70 hover:bg-[#5A735A]/5 hover:text-[#5A735A] transition-colors">
                          <Home size={15} /> Home
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-black/5"
                        >
                          <LogOut size={15} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="rounded-full border border-black/10 px-5 py-2 text-xs font-medium text-black/70 hover:border-black hover:text-black transition-all">Login</Link>
                  <Link to="/signup" className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2 text-xs font-medium text-white transition-all hover:scale-105 hover:shadow-lg">
                    Get Started <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Greeting */}
        <div className="mb-7">
          <p className="text-sm text-black/40 mb-1">
            {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="italic font-serif text-3xl text-[#5A735A] font-normal">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {user?.name?.split(" ")[0]}.
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                if (s.label === "My Claims") setActiveTab("My Claims");
                if (s.label === "Incoming Claims") setActiveTab("Claims Inbox");
              }}
              className="bg-white rounded-2xl border border-black/5 p-5 text-left hover:border-[#5A735A]/30 transition-all cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.iconBg}`}>{s.icon}</div>
              <p className="text-xs text-black/45 font-medium mb-1">{s.label}</p>
              <p className="text-3xl font-semibold text-black leading-none">{s.value}</p>
            </button>
          ))}
        </div>

        {actionMsg && (
          <div className="mb-4 bg-white rounded-2xl border border-black/5 px-5 py-3 text-sm text-black/70">
            {actionMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-2xl border border-black/5 p-1.5 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
                activeTab === tab ? "bg-[#5A735A] text-white shadow-sm" : "text-black/50 hover:text-black"
              }`}
            >
              {tab}
              {tab === "Claims Inbox" && ownerData.pendingClaims.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                  {ownerData.pendingClaims.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "Overview" && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-5">
            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
                <h2 className="text-sm font-semibold">My Reports</h2>
                <Link to="/home" className="text-xs text-[#5A735A] font-medium">View all →</Link>
              </div>
              {[...dashboard.lostItems, ...dashboard.foundItems]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 6)
                .map((item) => {
                  const isLost = !!item.owner;
                  return (
                    <Link
                      to={`/${isLost ? "lost" : "found"}/${item._id}`}
                      key={item._id}
                      className="flex items-center gap-4 px-5 py-3.5 border-b border-black/[0.04] last:border-none hover:bg-black/[0.02] transition-colors"
                    >
                      <img
                        src={item.images?.[0] || "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500"}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-black/45 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} />{item.location}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
                        item.status === "returned" ? "bg-emerald-100 text-emerald-700"
                        : item.status === "claimed" ? "bg-amber-100 text-amber-700"
                        : isLost ? "bg-red-100 text-red-600"
                        : "bg-[#5A735A]/10 text-[#5A735A]"
                      }`}>
                        {item.status === "returned" ? "Returned" : item.status === "claimed" ? "Claimed" : isLost ? "Lost" : "Found"}
                      </span>
                    </Link>
                  );
                })}
              {dashboard.lostItems.length === 0 && dashboard.foundItems.length === 0 && (
                <div className="py-12 text-center text-black/40 text-sm">
                  No reports yet.{" "}
                  <Link to="/report-lost" className="text-[#5A735A] font-medium underline">Report one now</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
                <div className="px-5 py-4 border-b border-black/5">
                  <h2 className="text-sm font-semibold">Your Profile</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-black/45">{user?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      [dashboard.lostItems.length, "Reported"],
                      [dashboard.foundItems.length, "Found"],
                      [[...dashboard.lostItems, ...dashboard.foundItems].filter((i) => i.status === "returned").length, "Returned"],
                    ].map(([n, l]) => (
                      <div key={l} className="bg-[#FDF0ED] rounded-xl p-2.5 text-center">
                        <p className="text-lg font-semibold text-[#5A735A]">{n}</p>
                        <p className="text-xs text-black/45 mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/report-lost" className="flex items-center justify-center gap-1.5 bg-[#5A735A] text-white rounded-xl py-2.5 text-xs font-medium">
                      <Plus size={13} /> Report Lost
                    </Link>
                    <Link to="/report-found" className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all">
                      <Package size={13} /> Report Found
                    </Link>
                    <Link to="/home" className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all">
                      <Search size={13} /> Browse
                    </Link>
                    <button className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all">
                      <Settings size={13} /> Settings
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
                  <h2 className="text-sm font-semibold">Weekly Activity</h2>
                  <span className="text-xs text-black/40">This week</span>
                </div>
                <div className="px-5 pt-4 pb-4">
                  <div className="flex items-end gap-2 h-24">
                    {weeklyData.map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <div
                          className={`w-full rounded-t-lg ${d.lost ? "bg-red-400/70" : d.faded ? "bg-[#5A735A]/30" : "bg-[#5A735A]"}`}
                          style={{ height: `${d.height}px` }}
                        />
                        <span className="text-[10px] text-black/40">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MY CLAIMS ── */}
        {activeTab === "My Claims" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-black/5">
                <h2 className="text-sm font-semibold">Claims I Submitted</h2>
                <p className="text-xs text-black/40 mt-0.5">Items you've claimed — waiting for owner/finder to review</p>
              </div>
              {dashboard.myClaims.length === 0 ? (
                <div className="py-16 text-center">
                  <HeartHandshake size={36} className="mx-auto text-black/20 mb-3" />
                  <p className="text-sm text-black/40">You haven't claimed any items yet.</p>
                  <Link to="/home" className="mt-4 inline-block text-xs text-[#5A735A] font-medium underline">Browse items</Link>
                </div>
              ) : (
                <div className="divide-y divide-black/[0.04]">
                  {dashboard.myClaims.map((claim) => (
                    <div key={claim._id} className="px-5 py-4 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#FDF0ED] flex-shrink-0 overflow-hidden">
                        {claim.itemId?.images?.[0] ? (
                          <img src={claim.itemId.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-black/20">
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <p className="text-sm font-semibold truncate">{claim.itemId?.title || "Item"}</p>
                          <StatusPill status={claim.status} />
                        </div>
                        <p className="text-xs text-black/45 mt-1 flex items-center gap-1">
                          <MapPin size={10} />{claim.itemId?.location || "—"}
                        </p>
                        <p className="text-xs text-black/35 mt-1 flex items-center gap-1">
                          <Clock size={10} />Submitted {fmtDate(claim.createdAt)}
                        </p>
                        {claim.status === "pending" && (
                          <p className="mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5 w-fit">⏳ Waiting for review</p>
                        )}
                        {claim.status === "approved" && (
                          <div className="mt-2 flex items-center gap-2 flex-wrap">
                            <p className="text-xs text-[#5A735A] bg-[#5A735A]/8 rounded-lg px-3 py-1.5">✅ Approved — chat to arrange return</p>
                            <button
                              onClick={() => setActiveChatClaim(activeChatClaim?._id === claim._id ? null : claim)}
                              className="flex items-center gap-1.5 text-xs font-medium bg-[#5A735A] text-white rounded-lg px-3 py-1.5 hover:scale-105 transition-all"
                            >
                              <MessageCircle size={12} />
                              {activeChatClaim?._id === claim._id ? "Close Chat" : "Open Chat"}
                            </button>
                          </div>
                        )}
                        {claim.status === "rejected" && (
                          <p className="mt-2 text-xs text-red-500 bg-red-50 rounded-lg px-3 py-1.5 w-fit">❌ Rejected — your answers didn't match</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inline chat panel for My Claims tab */}
            <AnimatePresence>
              {activeChatClaim && activeTab === "My Claims" && (
                <ChatPanel
                  claim={activeChatClaim}
                  user={user}
                  token={token}
                  onClose={() => setActiveChatClaim(null)}
                />
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── CLAIMS INBOX ── */}
        {activeTab === "Claims Inbox" && (
          <div className="space-y-4">
            {/* Claim detail panel */}
            {selectedClaim && (
              <div className="bg-white rounded-3xl border border-[#5A735A]/20 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 bg-[#5A735A]/5">
                  <div>
                    <h3 className="text-sm font-semibold">Reviewing Claim</h3>
                    <p className="text-xs text-black/40 mt-0.5">
                      from {selectedClaim.claimantId?.name || "Someone"} · {fmtDate(selectedClaim.createdAt)}
                    </p>
                  </div>
                  <button onClick={() => setSelectedClaim(null)} className="text-xs text-black/40 hover:text-black font-medium">
                    Close ✕
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  {/* Score bar */}
                  <div className="bg-[#FDF0ED] rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-black/50 uppercase tracking-wide">Match Score</p>
                      <span className={`text-sm font-bold ${
                        selectedClaim.score >= 70 ? "text-[#5A735A]"
                        : selectedClaim.score >= 40 ? "text-amber-600"
                        : "text-red-500"
                      }`}>
                        {selectedClaim.score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-black/8 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          selectedClaim.score >= 70 ? "bg-[#5A735A]"
                          : selectedClaim.score >= 40 ? "bg-amber-400"
                          : "bg-red-400"
                        }`}
                        style={{ width: `${selectedClaim.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-black/40 mt-1.5">
                      {selectedClaim.score >= 70
                        ? "Strong match — likely the real owner"
                        : selectedClaim.score >= 40
                        ? "Partial match — review answers carefully"
                        : "Weak match — answers may not match"}
                    </p>
                  </div>

                  {/* Claimant info */}
                  <div className="flex items-center gap-3 bg-[#FDF0ED] rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {selectedClaim.claimantId?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{selectedClaim.claimantId?.name || "—"}</p>
                      <p className="text-xs text-black/45">{selectedClaim.claimantId?.email || "—"}</p>
                    </div>
                    <StatusPill status={selectedClaim.status} />
                  </div>

                  {/* Answers */}
                  <div className="space-y-3">
                    {[
                      ["Describe the item", selectedClaim.answers?.description],
                      ["Unique marks or scratches", selectedClaim.answers?.uniqueMarks],
                      ["What was inside it?", selectedClaim.answers?.insideItems],
                      ["Additional proof / where found", selectedClaim.answers?.extraProof],
                    ].map(([q, a]) =>
                      a ? (
                        <div key={q} className="bg-[#FDF0ED]/60 rounded-2xl p-4">
                          <p className="text-[11px] uppercase tracking-wide text-black/40 font-bold mb-1">{q}</p>
                          <p className="text-sm text-black/80 leading-relaxed">{a}</p>
                        </div>
                      ) : null
                    )}
                  </div>

                  {/* Accept/Reject buttons */}
                  {selectedClaim.status === "pending" && (
                    <div className="flex gap-3 pt-2">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleClaimAction(selectedClaim._id, "accepted")}
                        className="flex-1 rounded-2xl bg-[#5A735A] py-3.5 text-white font-semibold text-sm hover:scale-[1.02] transition-all disabled:opacity-60"
                      >
                        {actionLoading ? "Processing..." : "✅ Accept Claim"}
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleClaimAction(selectedClaim._id, "rejected")}
                        className="flex-1 rounded-2xl bg-red-50 border border-red-200 py-3.5 text-red-600 font-semibold text-sm hover:bg-red-100 transition-all disabled:opacity-60"
                      >
                        {actionLoading ? "Processing..." : "❌ Reject Claim"}
                      </button>
                    </div>
                  )}

                  {/* Chat button if approved */}
                  {selectedClaim.status === "approved" && (
                    <button
                      onClick={() => {
                        setActiveChatClaim(activeChatClaim?._id === selectedClaim._id ? null : selectedClaim);
                        setSelectedClaim(null);
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#5A735A] py-3.5 text-white font-semibold text-sm hover:scale-[1.02] transition-all"
                    >
                      <MessageCircle size={16} />
                      {activeChatClaim?._id === selectedClaim._id ? "Close Chat" : "Open Chat"}
                    </button>
                  )}

                  {selectedClaim.status === "rejected" && (
                    <p className="text-center text-xs text-black/40 pt-2">
                      This claim has been <strong>rejected</strong>.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Inline chat panel for Claims Inbox tab */}
            <AnimatePresence>
              {activeChatClaim && activeTab === "Claims Inbox" && (
                <ChatPanel
                  claim={activeChatClaim}
                  user={user}
                  token={token}
                  onClose={() => setActiveChatClaim(null)}
                />
              )}
            </AnimatePresence>

            {/* Claims list */}
            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Claims on My Items</h2>
                  <p className="text-xs text-black/40 mt-0.5">People claiming your lost/found posts</p>
                </div>
                {ownerData.pendingClaims.length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2.5 py-1">
                    {ownerData.pendingClaims.length} pending
                  </span>
                )}
              </div>
              {allInboxClaims.length === 0 ? (
                <div className="py-16 text-center">
                  <ClipboardList size={36} className="mx-auto text-black/20 mb-3" />
                  <p className="text-sm text-black/40">No one has claimed your items yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-black/[0.04]">
                  {allInboxClaims.map((claim) => (
                    <button
                      key={claim._id}
                      onClick={() => {
                        setSelectedClaim(claim);
                        setActiveChatClaim(null);
                      }}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-black/[0.02] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#5A735A]/10 text-[#5A735A] flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {claim.claimantId?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{claim.claimantId?.name || "Someone"}</p>
                          <StatusPill status={claim.status} />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-black/50 truncate">
                            claiming: <span className="font-medium">{claim.itemId?.title || "your item"}</span>
                          </p>
                          <span className="text-[11px] font-semibold text-[#5A735A] bg-[#5A735A]/10 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                            {claim.score}/100
                          </span>
                        </div>
                        <p className="text-xs text-black/30 mt-0.5 flex items-center gap-1">
                          <Clock size={10} /> {fmtDate(claim.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {claim.status === "pending" && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                        {claim.status === "approved" && <MessageCircle size={14} className="text-[#5A735A]" />}
                        <Eye size={15} className="text-black/30" />
                        <ChevronRight size={15} className="text-black/30" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

