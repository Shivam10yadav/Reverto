import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const defaultStories = [
  {
    id: 1,
    name: "Aryan Singh",
    initials: "AS",
    item: "Laptop Bag",
    location: "Kurukshetra University",
    time: "11 hours",
    story: "Lost my laptop bag outside the library. Reported it on Reverto at 9pm — by next morning someone had already posted it as found. Got it back with everything inside.",
    featured: true,
  },
  {
    id: 2,
    name: "Priya Kaur",
    initials: "PK",
    item: "Wallet",
    location: "Chandigarh",
    time: "2 days",
    story: "My wallet had my ID, ATM card, everything. Someone found it in the canteen and posted it here. Claim verified in minutes.",
    featured: false,
  },
  {
    id: 3,
    name: "Mohit Rao",
    initials: "MR",
    item: "Earbuds",
    location: "Delhi Metro",
    time: "1 day",
    story: "Left my earbuds on the metro. Never thought I'd see them again. Someone posted it on Reverto and I claimed it the same evening.",
    featured: false,
  },
];

export function SuccessStories() {
  const [stories, setStories] = useState(defaultStories);
  const [form, setForm] = useState({ name: "", item: "", location: "", time: "", story: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const getInitials = (name) =>
    name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.story.trim()) {
      setError("Name and story are required.");
      return;
    }
    setError("");
    setStories([
      ...stories,
      {
        id: Date.now(),
        name: form.name,
        initials: getInitials(form.name),
        item: form.item,
        location: form.location,
        time: form.time,
        story: form.story,
        featured: false,
        isNew: true,
      },
    ]);
    setForm({ name: "", item: "", location: "", time: "", story: "" });
  };

  return (
    <section className="min-h-screen bg-[#FDF0ED] py-24 px-6">

       
      <div className="max-w-4xl mx-auto">
         <Link
        to="/"
        className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md text-black transition-all duration-300 hover:-translate-x-1 hover:border-[#5A735A] hover:text-[#5A735A]"
      >
        <ArrowLeft size={20} strokeWidth={2.2} />
      </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="font-sans uppercase tracking-[0.2em] text-xs font-bold text-[#5A735A] block mb-4">
            Community Stories
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#111111] font-medium leading-[1.1] mb-6">
            Items found,{" "}
            <span className="italic text-[#5A735A] font-light">connections made</span>.
          </h1>
          <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
            Real stories from people who lost something important — and got it back through the Reverto community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-black/8 p-8 mb-16"
        >
          <h2 className="font-serif text-2xl font-normal mb-1">Share your story</h2>
          <p className="text-sm text-gray-400 mb-7">Got your item back? Tell the community how it happened.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="bg-gray-50 border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Item recovered</label>
                <input
                  name="item"
                  value={form.item}
                  onChange={handleChange}
                  placeholder="Black wallet, MacBook..."
                  className="bg-gray-50 border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="KU Library, Delhi Metro..."
                  className="bg-gray-50 border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">How long did it take?</label>
                <input
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  placeholder="2 days, 6 hours..."
                  className="bg-gray-50 border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your story</label>
              <textarea
                name="story"
                value={form.story}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what happened — how you lost it, who found it, and how Reverto helped..."
                className="bg-gray-50 border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5A735A] transition-colors resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="bg-[#111111] text-white font-medium px-8 py-3.5 rounded-full flex items-center gap-2 group transition-all duration-300 hover:bg-black"
            >
              Post story
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A735A] block mb-7">
          Recovery stories
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {stories.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`rounded-2xl border p-7 ${
                s.featured
                  ? "sm:col-span-2 bg-[#111111] border-transparent text-white"
                  : "bg-white border-black/7"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                    s.featured
                      ? "bg-white/15 text-white"
                      : "bg-[#E1F5EE] text-[#0F6E56]"
                  }`}
                >
                  {s.featured ? "⭐ Featured" : "Returned"}
                </span>
                {s.isNew && (
                  <span className="text-xs font-bold bg-[#5A735A] text-white px-2 py-0.5 rounded-full">New</span>
                )}
              </div>

              <p
                className={`font-serif leading-relaxed mb-6 ${
                  s.featured ? "text-xl text-white" : "text-lg text-[#111]"
                }`}
              >
                "{s.story}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                    s.featured ? "bg-white/15 text-white" : "bg-[#E1F5EE] text-[#0F6E56]"
                  }`}
                >
                  {s.initials}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${s.featured ? "text-white" : "text-[#111]"}`}>{s.name}</p>
                  <p className={`text-xs ${s.featured ? "text-white/50" : "text-gray-400"}`}>
                    {s.location}{s.time ? ` · Recovered in ${s.time}` : ""}
                  </p>
                </div>
                {s.item && (
                  <span
                    className={`ml-auto text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${
                      s.featured ? "bg-white/10 text-white/80" : "bg-[#E1F5EE] text-[#5A735A]"
                    }`}
                  >
                    {s.item}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}