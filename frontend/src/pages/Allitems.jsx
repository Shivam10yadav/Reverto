import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, ArrowRight, ChevronDown } from "lucide-react";
import API from "../api/axios";
import { useAuth } from "../context/authContext";

const Allitems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await API.get("/lost");
      setItems(data.items);
    } catch (error) {
      console.log(error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF0ED] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#5A735A] border-t-transparent animate-spin" />
          <p className="text-sm text-black/50 font-medium">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#FDF0ED]/80 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">R</div>
            <span className="text-xl italic font-serif text-[#5A735A]">Reverto</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-sm items-center gap-2 bg-white border border-black/8 rounded-full px-4 py-2 shadow-sm">
            <Search size={15} className="text-black/35 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search items..."
              className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-black/35"
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {user ? (
              <>
                <div className="relative group">
                  <button className="flex items-center gap-2 rounded-full bg-[#5A735A] px-4 py-2.5 text-white text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <Plus size={15} />
                    <span className="hidden sm:block">Report</span>
                    <ChevronDown size={13} className="opacity-70" />
                  </button>

                  <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
                    <div className="w-52 bg-white rounded-2xl border border-black/5 shadow-xl overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-black/5">
                        <p className="text-xs text-black/40 font-medium uppercase tracking-wider">What happened?</p>
                      </div>
                      <Link
                        to="/report-lost"
                        className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-black/70 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-base">😔</span>
                        I Lost Something
                      </Link>
                      <Link
                        to="/report-found"
                        className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-black/70 hover:bg-[#5A735A]/5 hover:text-[#5A735A] transition-colors"
                      >
                        <span className="w-7 h-7 rounded-full bg-[#5A735A]/10 flex items-center justify-center text-base">🎉</span>
                        I Found Something
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold hover:scale-105 transition-all"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black/70 hover:border-black hover:text-black transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-[#5A735A] px-4 py-2.5 text-sm font-medium text-white hover:scale-105 hover:shadow-md transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-[#5A735A]/10 border border-[#5A735A]/20 px-4 py-1.5 text-sm font-medium text-[#5A735A]">
            Community Lost & Found
          </span>
          <h1 className="mt-5 text-5xl md:text-6xl font-serif italic text-black leading-tight">
            Find what <span className="text-[#5A735A]">matters.</span>
          </h1>
          <p className="mt-4 text-black/55 text-lg leading-8">
            Browse recent lost and found reports from your community and help
            reunite people with their belongings.
          </p>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-black/5 p-2.5 shadow-sm flex items-center gap-3 max-w-2xl">
          <Search size={18} className="text-black/35 ml-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search wallets, phones, keys..."
            className="flex-1 bg-transparent outline-none text-black placeholder:text-black/35 text-sm"
          />
          <button className="rounded-2xl bg-[#5A735A] px-5 py-2.5 text-white text-sm font-medium hover:scale-[1.02] transition-all">
            Search
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          <button className="rounded-full bg-black text-white px-5 py-2 text-xs font-medium">All</button>
          <button className="rounded-full border border-black/10 bg-white px-5 py-2 text-xs font-medium hover:border-[#5A735A] hover:text-[#5A735A] transition-colors">Lost</button>
          <button className="rounded-full border border-black/10 bg-white px-5 py-2 text-xs font-medium hover:border-[#5A735A] hover:text-[#5A735A] transition-colors">Found</button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-3xl font-serif italic text-black">No items found</h2>
            <p className="mt-3 text-black/55">Be the first to report a lost item.</p>
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
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-[28px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="overflow-hidden h-56">
                  <img
                    src={item.images?.length > 0 ? item.images[0] : "https://via.placeholder.com/600x400?text=No+Image"}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                      item.status === "lost" ? "bg-red-100 text-red-600" : "bg-[#5A735A]/10 text-[#5A735A]"
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-black/35">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-black">{item.title}</h2>
                  <p className="mt-1.5 text-sm text-black/55">{item.location}</p>

                  {item.reward > 0 && (
                    <p className="mt-3 text-xs font-medium text-[#5A735A] bg-[#5A735A]/8 rounded-full px-3 py-1 w-fit">
                      Reward • ₹{item.reward}
                    </p>
                  )}

                  <Link
                    to={`/lost/${item._id}`}
                    onClick={handleViewDetails}
                    className="mt-4 flex items-center justify-between border-t border-black/5 pt-4 text-sm font-medium group/link text-black/70 hover:text-black transition-colors"
                  >
                    <span>{user ? "View Details" : "Login to View"}</span>
                    <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center group-hover/link:bg-[#5A735A] group-hover/link:text-white transition-all">
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Allitems;