import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, ArrowRight, ChevronDown, SlidersHorizontal, X, LayoutDashboard, LogOut } from "lucide-react";
import API from "../api/axios";
import { useAuth } from "../context/authContext";

const CATEGORIES = [
  "Electronics", "Wallet / Purse", "ID / Documents",
  "Keys", "Bag / Backpack", "Clothing", "Jewellery", "Other",
];

const Allitems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [activeType, setActiveType] = useState("all"); 
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [sort, setSort] = useState("newest");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    fetchItems();
  }, [activeType, search, category, location, time, sort]);

  const buildParams = () => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (location) params.location = location;
    if (time) params.time = time;
    if (sort) params.sort = sort;
    params.limit = 50;
    return params;
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = buildParams();

      if (activeType === "lost") {
        const { data } = await API.get("/lost", { params });
        setItems(data.items.map((i) => ({ ...i, type: "lost" })));
      } else if (activeType === "found") {
        const { data } = await API.get("/found", { params });
        setItems(data.items.map((i) => ({ ...i, type: "found" })));
      } else {
        const [lostRes, foundRes] = await Promise.all([
          API.get("/lost", { params }),
          API.get("/found", { params }),
        ]);
        const lost = lostRes.data.items.map((i) => ({ ...i, type: "lost" }));
        const found = foundRes.data.items.map((i) => ({ ...i, type: "found" }));
        
        const merged = [...lost, ...found].sort(
          (a, b) =>
            sort === "oldest"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(b.createdAt) - new Date(a.createdAt)
        );
        setItems(merged);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
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

  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setTime("");
    setSort("newest");
    setSearchInput("");
    setSearch("");
  };

  const hasActiveFilters = category || location || time || sort !== "newest" || search;

  const activeFilterCount = [category, location, time, sort !== "newest" ? sort : ""].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans pt-24">
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] px-6 py-3"
        >
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center font-bold text-white text-sm">
                R
              </div>
              <span className="italic font-serif text-xl tracking-wide text-[#111111] font-semibold">
                Reverto
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-xs mx-4 items-center gap-2 bg-white/80 border border-black/5 rounded-full px-4 py-1.5 shadow-sm">
              <Search size={14} className="text-black/35 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs text-black placeholder:text-black/35"
              />
              {searchInput && (
                <button onClick={() => setSearchInput("")}>
                  <X size={12} className="text-black/30 hover:text-black/60" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <div 
                    className="relative"
                    onMouseEnter={() => setReportDropdownOpen(true)}
                    onMouseLeave={() => setReportDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1.5 rounded-full bg-[#5A735A] px-4 py-2 text-white text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none">
                      <Plus size={14} />
                      <span className="hidden sm:block">Report</span>
                      <ChevronDown size={12} className="opacity-70" />
                    </button>
                    
                    <AnimatePresence>
                      {reportDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden"
                        >
                          <div className="px-4 py-2 border-b border-black/5">
                            <p className="text-[10px] text-black/40 font-medium uppercase tracking-wider">What happened?</p>
                          </div>
                          <Link to="/report-lost" className="flex items-center gap-3 px-4 py-3 text-xs font-medium text-black/70 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <span className="w-5 h-5 rounded-full bg-red-700 flex items-center justify-center text-xs"></span>
                            I Lost Something
                          </Link>
                          <Link to="/report-found" className="flex items-center gap-3 px-4 py-3 text-xs font-medium text-black/70 hover:bg-[#5A735A]/5 hover:text-[#5A735A] transition-colors">
                            <span className="w-5 h-5 rounded-full bg-[#5A735A] flex items-center justify-center text-xs"></span>
                            I Found Something
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button className="w-9 h-9 rounded-full bg-[#5A735A] text-white font-semibold text-sm flex items-center justify-center hover:scale-105 transition-all duration-200 focus:outline-none">
                      {user.name?.charAt(0).toUpperCase()}
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden"
                        >
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-black/5">
                            <p className="text-sm font-semibold text-black truncate">{user.name}</p>
                            <p className="text-xs text-black/45 truncate">{user.email}</p>
                          </div>

                          {/* Dashboard */}
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-black/70 hover:bg-[#5A735A]/5 hover:text-[#5A735A] transition-colors"
                          >
                            <LayoutDashboard size={15} />
                            Dashboard
                          </Link>

                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-black/5"
                          >
                            <LogOut size={15} />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="rounded-full border border-black/10 px-5 py-2 text-xs font-medium text-black/70 hover:border-black hover:text-black transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2 text-xs font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Get Started
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.nav>
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-[#5A735A]/10 border border-[#5A735A]/20 px-4 py-1.5 text-sm font-medium text-[#5A735A]">
            Community Lost & Found
          </span>
          <h1 className="mt-5 text-5xl md:text-6xl font-serif italic text-black leading-tight">
            Find what <span className="text-[#5A735A]">matters.</span>
          </h1>
          <p className="mt-4 text-black/55 text-lg leading-8">
            Browse lost and found reports from your community and help reunite people with their belongings.
          </p>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-black/5 p-2.5 shadow-sm flex items-center gap-3 max-w-2xl">
          <Search size={18} className="text-black/35 ml-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search wallets, phones, keys..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-black placeholder:text-black/35 text-sm"
          />
          {searchInput && (
            <button onClick={() => setSearchInput("")} className="text-black/30 hover:text-black/60 transition-colors">
              <X size={15} />
            </button>
          )}
          <button
            onClick={fetchItems}
            className="rounded-2xl bg-[#5A735A] px-5 py-2.5 text-white text-sm font-medium hover:scale-[1.02] transition-all"
          >
            Search
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            {[
              { key: "all", label: "All" },
              { key: "lost", label: "Lost" },
              { key: "found", label: "Found" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveType(key)}
                className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                  activeType === key
                    ? key === "lost"
                      ? "bg-red-500 text-white"
                      : key === "found"
                      ? "bg-[#5A735A] text-white"
                      : "bg-black text-white"
                    : "border border-black/10 bg-white hover:border-[#5A735A] hover:text-[#5A735A]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs text-red-500 font-medium hover:underline"
              >
                <X size={12} /> Clear filters
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border transition-all ${
                showFilters || activeFilterCount > 0
                  ? "bg-[#5A735A] text-white border-[#5A735A]"
                  : "bg-white border-black/10 text-black/70 hover:border-[#5A735A] hover:text-[#5A735A]"
              }`}
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-[#5A735A] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 bg-white rounded-3xl border border-black/5 shadow-sm p-6 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wide">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FDF0ED]/50 px-3 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors text-black/70"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wide">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Library, Gate 2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FDF0ED]/50 px-3 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors placeholder:text-black/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wide">Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FDF0ED]/50 px-3 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors text-black/70"
                >
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wide">Sort By</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FDF0ED]/50 px-3 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors text-black/70"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {!loading && items.length > 0 && (
          <p className="text-sm text-black/40 mb-5">
            Showing <span className="font-semibold text-black/60">{items.length}</span> item{items.length !== 1 ? "s" : ""}
            {activeType !== "all" && <span> · {activeType}</span>}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#5A735A] border-t-transparent animate-spin" />
              <p className="text-sm text-black/50 font-medium">Loading items...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-3xl font-serif italic text-black">No items found</h2>
            <p className="mt-3 text-black/55">
              {hasActiveFilters ? "Try adjusting your filters." : "Be the first to report a lost or found item."}
            </p>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="mt-6 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:border-[#5A735A] transition-all"
              >
                Clear Filters
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3 mt-8">
                <Link
                  to={user ? "/report-lost" : "/login"}
                  className="rounded-full bg-[#5A735A] px-6 py-3 text-white text-sm font-medium hover:scale-105 transition-all"
                >
                I Lost Something
                </Link>
                <Link
                  to={user ? "/report-found" : "/login"}
                  className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:border-[#5A735A] transition-all"
                >
                I Found Something
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item) => {
              const isOwner = user && item && String(user._id) === String(item.userId);
              return (
                <div
                  key={`${item.type}-${item._id}`}
                  className="group overflow-hidden rounded-[28px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="overflow-hidden h-56 relative">
                      <img
                        src={
                          item.images?.length > 0
                            ? item.images[0]
                            : "https://via.placeholder.com/600x400?text=No+Image"
                        }
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span
                        className={`absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
                          item.type === "lost"
                            ? "bg-red-500 text-white"
                            : "bg-[#5A735A] text-white"
                        }`}
                      >
                        {item.type === "lost" ? "Lost" : "Found"}
                      </span>
                    </div>

                    <div className="p-5 pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-black/5 text-black/50 capitalize">
                          {item.category || "Uncategorized"}
                        </span>
                        <span className="text-xs text-black/35">
                          {new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold text-black">{item.title}</h2>
                      <p className="mt-1.5 text-sm text-black/55 truncate">{item.location}</p>

                      {item.reward && (
                        <p className="mt-3 text-xs font-medium text-[#5A735A] bg-[#5A735A]/8 rounded-full px-3 py-1 w-fit">
                          Reward • ₹{item.reward}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-4 mt-4 border-t border-black/5 flex justify-end">
                    <Link
                      to={user ? `/${item.type}/${item._id}` : "/login"}
                      onClick={handleViewDetails}
                      className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2 text-xs font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <span>
                        {user ? (isOwner ? "View Your Report" : "View Details") : "Login to View"}
                      </span>
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Allitems;