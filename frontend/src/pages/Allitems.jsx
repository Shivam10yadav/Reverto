import React from "react";
import { Link } from "react-router-dom";
import { Search, Plus, ArrowRight } from "lucide-react";

const demoItems = [
  {
    id: 1,
    type: "Lost",
    title: "Black Wallet",
    location: "Kurukshetra University",
    time: "2 days ago",
    reward: "₹1000",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=900",
  },
  {
    id: 2,
    type: "Found",
    title: "iPhone 13",
    location: "Near Bus Stand",
    time: "Today",
    reward: null,
    image:
      "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=900",
  },
  {
    id: 3,
    type: "Lost",
    title: "College ID Card",
    location: "Library",
    time: "Yesterday",
    reward: "₹500",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
  },
   {
    id: 1,
    type: "Lost",
    title: "Black Wallet",
    location: "Kurukshetra University",
    time: "2 days ago",
    reward: "₹1000",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=900",
  },
  {
    id: 2,
    type: "Found",
    title: "iPhone 13",
    location: "Near Bus Stand",
    time: "Today",
    reward: null,
    image:
      "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=900",
  },
  {
    id: 3,
    type: "Lost",
    title: "College ID Card",
    location: "Library",
    time: "Yesterday",
    reward: "₹500",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
  },
];

const Allitems = () => {
  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#FDF0ED]/80 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl italic font-serif text-[#5A735A]"
          >
            Reverto
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/report-lost"
              className="hidden md:flex items-center gap-2 rounded-full bg-[#5A735A] px-5 py-3 text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              <Plus size={16} />
              Report Item
            </Link>

            <Link
              to="/dashboard"
              className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center font-semibold"
            >
              S
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-[#5A735A]/10 border border-[#5A735A]/20 px-4 py-2 text-sm font-medium text-[#5A735A]">
            Community Lost & Found
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-serif italic text-black leading-tight">
            Find what
            <span className="text-[#5A735A]"> matters.</span>
          </h1>

          <p className="mt-5 text-black/60 text-lg leading-8">
            Browse recent lost and found reports from your community and help
            reunite people with their belongings.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-3xl border border-black/5 p-3 shadow-sm flex items-center gap-3">
          <Search size={20} className="text-black/40 ml-2" />

          <input
            type="text"
            placeholder="Search wallets, phones, keys..."
            className="flex-1 bg-transparent outline-none text-black placeholder:text-black/40"
          />

          <button className="rounded-2xl bg-[#5A735A] px-6 py-3 text-white font-medium hover:scale-[1.02] transition-all">
            Search
          </button>
        </div>

        <div className="mt-8 flex gap-3">
          <button className="rounded-full bg-black text-white px-5 py-2 text-sm">
            All
          </button>

          <button className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm hover:border-[#5A735A]">
            Lost
          </button>

          <button className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm hover:border-[#5A735A]">
            Found
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {demoItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-[28px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="overflow-hidden h-60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      item.type === "Lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#5A735A]/10 text-[#5A735A]"
                    }`}
                  >
                    {item.type}
                  </span>

                  <span className="text-xs text-black/40">
                    {item.time}
                  </span>
                </div>

                <h2 className="text-2xl font-semibold text-black">
                  {item.title}
                </h2>

                <p className="mt-2 text-black/60">
                  {item.location}
                </p>

                {item.reward && (
                  <p className="mt-4 text-sm font-medium text-[#5A735A]">
                    Reward • {item.reward}
                  </p>
                )}

                <Link
                  to={`/item/${item.id}`}
                  className="mt-6 flex items-center justify-between border-t border-black/5 pt-5 text-sm font-medium group/link"
                >
                  View Details

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Allitems;