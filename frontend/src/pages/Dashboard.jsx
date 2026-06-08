import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/authContext";
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
  ChevronRight,
  Clock,
  XCircle,
  Eye,
  Package,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const StatusPill = ({ status }) => {
  const map = {
    pending: "bg-amber-100 text-amber-700",
    accepted: "bg-[#5A735A]/10 text-[#5A735A]",
    rejected: "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-3 py-1 rounded-full capitalize ${map[status] || "bg-black/5 text-black/50"}`}
    >
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

// ─── main ────────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("Overview");
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
  const [selectedClaim, setSelectedClaim] = useState(null); // for inbox detail modal
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

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

  // Accept or reject a claim (owner action)
  const handleClaimAction = async (claimId, action) => {
    try {
      setActionLoading(true);
      setActionMsg("");
      await API.patch(`/claims/${claimId}`, { status: action });
      setActionMsg(
        action === "accepted" ? "✅ Claim accepted!" : "❌ Claim rejected.",
      );
      setSelectedClaim(null);
      fetchDashboard(); // refresh
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
            <Plus size={15} /> Report Item
          </Link>
          <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Greeting */}
        <div className="mb-7">
          <p className="text-sm text-black/40 mb-1">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="italic font-serif text-3xl text-[#5A735A] font-normal">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 17
                ? "afternoon"
                : "evening"}
            , {user?.name?.split(" ")[0]}.
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
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.iconBg}`}
              >
                {s.icon}
              </div>
              <p className="text-xs text-black/45 font-medium mb-1">
                {s.label}
              </p>
              <p className="text-3xl font-semibold text-black leading-none">
                {s.value}
              </p>
            </button>
          ))}
        </div>

        {/* Action message */}
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
                activeTab === tab
                  ? "bg-[#5A735A] text-white shadow-sm"
                  : "text-black/50 hover:text-black"
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

        {/* ── TAB: OVERVIEW ─────────────────────────────────────────────── */}
        {activeTab === "Overview" && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-5">
            {/* Recent Reports */}
            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
                <h2 className="text-sm font-semibold">My Reports</h2>
                <Link to="/home" className="text-xs text-[#5A735A] font-medium">
                  View all →
                </Link>
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
                        src={
                          item.images?.[0] ||
                          "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500"
                        }
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-black/45 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} />
                          {item.location}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${isLost ? "bg-red-100 text-red-600" : "bg-[#5A735A]/10 text-[#5A735A]"}`}
                      >
                        {isLost ? "Lost" : "Found"}
                      </span>
                    </Link>
                  );
                })}
              {dashboard.lostItems.length === 0 &&
                dashboard.foundItems.length === 0 && (
                  <div className="py-12 text-center text-black/40 text-sm">
                    No reports yet.{" "}
                    <Link
                      to="/report-lost"
                      className="text-[#5A735A] font-medium underline"
                    >
                      Report one now
                    </Link>
                  </div>
                )}
            </div>

            {/* Right col */}
            <div className="flex flex-col gap-5">
              {/* Profile */}
              <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
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
                      [ownerData.approvedClaims.length, "Returned"],
                    ].map(([n, l]) => (
                      <div
                        key={l}
                        className="bg-[#FDF0ED] rounded-xl p-2.5 text-center"
                      >
                        <p className="text-lg font-semibold text-[#5A735A]">
                          {n}
                        </p>
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
                      to="/report-found"
                      className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all"
                    >
                      <Package size={13} /> Report Found
                    </Link>
                    <Link
                      to="/home"
                      className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all"
                    >
                      <Search size={13} /> Browse
                    </Link>
                    <button className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl py-2.5 text-xs font-medium hover:bg-black hover:text-white transition-all">
                      <Settings size={13} /> Settings
                    </button>
                  </div>
                </div>
              </div>

              {/* Weekly chart */}
              <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
                  <h2 className="text-sm font-semibold">Weekly Activity</h2>
                  <span className="text-xs text-black/40">This week</span>
                </div>
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-end gap-2 h-24">
                    {weeklyData.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1 flex-1"
                      >
                        <div
                          className={`w-full rounded-t-lg ${d.lost ? "bg-red-400/70" : d.faded ? "bg-[#5A735A]/30" : "bg-[#5A735A]"}`}
                          style={{ height: `${d.height}px` }}
                        />
                        <span className="text-[10px] text-black/40">
                          {d.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: MY CLAIMS ────────────────────────────────────────────── */}
        {activeTab === "My Claims" && (
          <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-black/5">
              <h2 className="text-sm font-semibold">Claims I Submitted</h2>
              <p className="text-xs text-black/40 mt-0.5">
                Items you've claimed — waiting for owner/finder to review
              </p>
            </div>

            {dashboard.myClaims.length === 0 ? (
              <div className="py-16 text-center">
                <HeartHandshake
                  size={36}
                  className="mx-auto text-black/20 mb-3"
                />
                <p className="text-sm text-black/40">
                  You haven't claimed any items yet.
                </p>
                <Link
                  to="/home"
                  className="mt-4 inline-block text-xs text-[#5A735A] font-medium underline"
                >
                  Browse items
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-black/[0.04]">
                {dashboard.myClaims.map((claim) => (
                  <div
                    key={claim._id}
                    className="px-5 py-4 flex items-start gap-4"
                  >
                    {/* Item image */}
                    <div className="w-14 h-14 rounded-xl bg-[#FDF0ED] flex-shrink-0 overflow-hidden">
                      {claim.item?.images?.[0] ? (
                        <img
                          src={claim.item.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black/20">
                          <Package size={20} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="text-sm font-semibold truncate">
                          {claim.item?.title || "Item"}
                        </p>
                        <StatusPill status={claim.status} />
                      </div>

                      <p className="text-xs text-black/45 mt-1 flex items-center gap-1">
                        <MapPin size={10} />
                        {claim.item?.location || "—"}
                      </p>

                      <p className="text-xs text-black/35 mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        Submitted {fmtDate(claim.createdAt)}
                      </p>

                      {/* Status message */}
                      {claim.status === "pending" && (
                        <p className="mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5 w-fit">
                          ⏳ Waiting for review
                        </p>
                      )}
                      {claim.status === "accepted" && (
                        <p className="mt-2 text-xs text-[#5A735A] bg-[#5A735A]/8 rounded-lg px-3 py-1.5 w-fit">
                          ✅ Accepted — contact the owner to arrange return
                        </p>
                      )}
                      {claim.status === "rejected" && (
                        <p className="mt-2 text-xs text-red-500 bg-red-50 rounded-lg px-3 py-1.5 w-fit">
                          ❌ Rejected — your answers didn't match
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: CLAIMS INBOX ─────────────────────────────────────────── */}
        {activeTab === "Claims Inbox" && (
          <div className="space-y-4">
            {/* Selected claim detail panel */}
            {selectedClaim && (
              <div className="bg-white rounded-3xl border border-[#5A735A]/20 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 bg-[#5A735A]/5">
                  <div>
                    <h3 className="text-sm font-semibold">Reviewing Claim</h3>
                    <p className="text-xs text-black/40 mt-0.5">
                      from {selectedClaim.claimant?.name || "Someone"} ·{" "}
                      {fmtDate(selectedClaim.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedClaim(null)}
                    className="text-xs text-black/40 hover:text-black font-medium"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Claimant info */}
                  <div className="flex items-center gap-3 bg-[#FDF0ED] rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {selectedClaim.claimant?.name?.charAt(0).toUpperCase() ||
                        "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedClaim.claimant?.name || "—"}
                      </p>
                      <p className="text-xs text-black/45">
                        {selectedClaim.claimant?.email || "—"}
                      </p>
                    </div>
                    <StatusPill status={selectedClaim.status} />
                  </div>

                  {/* Answers */}
                  <div className="space-y-3">
                    {[
                      ["Describe the item", selectedClaim.answers?.description],
                      [
                        "Unique marks or scratches",
                        selectedClaim.answers?.uniqueMarks,
                      ],
                      [
                        "What was inside it?",
                        selectedClaim.answers?.insideItems,
                      ],
                      [
                        "Additional proof / where found",
                        selectedClaim.answers?.extraProof,
                      ],
                    ].map(([q, a]) =>
                      a ? (
                        <div
                          key={q}
                          className="bg-[#FDF0ED]/60 rounded-2xl p-4"
                        >
                          <p className="text-[11px] uppercase tracking-wide text-black/40 font-bold mb-1">
                            {q}
                          </p>
                          <p className="text-sm text-black/80 leading-relaxed">
                            {a}
                          </p>
                        </div>
                      ) : null,
                    )}
                  </div>

                  {/* Actions — only show if pending */}
                  {selectedClaim.status === "pending" && (
                    <div className="flex gap-3 pt-2">
                      <button
                        disabled={actionLoading}
                        onClick={() =>
                          handleClaimAction(selectedClaim._id, "accepted")
                        }
                        className="flex-1 rounded-2xl bg-[#5A735A] py-3.5 text-white font-semibold text-sm hover:scale-[1.02] transition-all disabled:opacity-60"
                      >
                        {actionLoading ? "Processing..." : "✅ Accept Claim"}
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={() =>
                          handleClaimAction(selectedClaim._id, "rejected")
                        }
                        className="flex-1 rounded-2xl bg-red-50 border border-red-200 py-3.5 text-red-600 font-semibold text-sm hover:bg-red-100 transition-all disabled:opacity-60"
                      >
                        {actionLoading ? "Processing..." : "❌ Reject Claim"}
                      </button>
                    </div>
                  )}

                  {selectedClaim.status !== "pending" && (
                    <p className="text-center text-xs text-black/40 pt-2">
                      This claim has already been{" "}
                      <strong>{selectedClaim.status}</strong>.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Claims list */}
            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Claims on My Items</h2>
                  <p className="text-xs text-black/40 mt-0.5">
                    People claiming your lost/found posts
                  </p>
                </div>
                {ownerData.pendingClaims.length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2.5 py-1">
                    {ownerData.pendingClaims.length} pending
                  </span>
                )}
              </div>

              {allInboxClaims.length === 0 ? (
                <div className="py-16 text-center">
                  <ClipboardList
                    size={36}
                    className="mx-auto text-black/20 mb-3"
                  />
                  <p className="text-sm text-black/40">
                    No one has claimed your items yet.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-black/[0.04]">
                  {allInboxClaims.map((claim) => (
                    <button
                      key={claim._id}
                      onClick={() => setSelectedClaim(claim)}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-black/[0.02] transition-colors"
                    >
                      {/* Claimant avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#5A735A]/10 text-[#5A735A] flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {claim.claimant?.name?.charAt(0).toUpperCase() || "?"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-semibold">
                            {claim.claimant?.name || "Someone"}
                          </p>
                          <StatusPill status={claim.status} />
                        </div>
                        <p className="text-xs text-black/50 truncate mt-0.5">
                          claiming:{" "}
                          <span className="font-medium">
                            {claim.item?.title || "your item"}
                          </span>
                        </p>
                        <p className="text-xs text-black/30 mt-0.5 flex items-center gap-1">
                          <Clock size={10} /> {fmtDate(claim.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {claim.status === "pending" && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
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
