import React, { useState } from "react";
import { ArrowLeft, ShieldCheck, PackageSearch } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import API from "../api/axios";

// Content differs based on whether user is claiming a lost post (finder) or found post (owner)
const FLOW = {
  lost: {
    icon: <ShieldCheck size={22} />,
    badge: "Lost Item",
    badgeColor: "bg-red-50 text-red-500 border border-red-100",
    title: "I Found This",
    subtitle: "Answer a few questions so the owner can verify you actually have their item.",
    itemModel: "LostItem",
    questions: [
      {
        name: "description",
        label: "Describe the item",
        placeholder: "Color, brand, size, condition...",
        required: true,
      },
      {
        name: "uniqueMarks",
        label: "Any unique marks, scratches or damage?",
        placeholder: "Sticker on the back, broken clasp, initials engraved...",
      },
      {
        name: "insideItems",
        label: "What was inside it? (if applicable)",
        placeholder: "Cards, cash, receipts, keys...",
      },
      {
        name: "extraProof",
        label: "Where exactly did you find it?",
        placeholder: "Near library entrance, canteen table 4, bus stop...",
      },
    ],
    submitLabel: "Submit — I Found This",
    successMsg: "Claim submitted! The owner will review your answers.",
  },
  found: {
    icon: <PackageSearch size={22} />,
    badge: "Found Item",
    badgeColor: "bg-[#5A735A]/10 text-[#5A735A] border border-[#5A735A]/20",
    title: "This Is Mine",
    subtitle: "Prove ownership by answering these questions. The finder will verify your answers.",
    itemModel: "FoundItem",
    questions: [
      {
        name: "description",
        label: "Describe your item",
        placeholder: "Color, brand, model, size, condition...",
        required: true,
      },
      {
        name: "uniqueMarks",
        label: "Any unique marks, scratches or personalisation?",
        placeholder: "Your name written inside, sticker, crack on corner...",
      },
      {
        name: "insideItems",
        label: "What was inside it when you lost it?",
        placeholder: "Cards, documents, cash, anything specific...",
      },
      {
        name: "extraProof",
        label: "Any additional proof of ownership?",
        placeholder: "Purchase receipt, serial number, photo with the item...",
      },
    ],
    submitLabel: "Submit — This Is Mine",
    successMsg: "Claim submitted! The finder will review your answers.",
  },
};

const ClaimItem = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Default to "lost" flow — found posts pass ?type=found
  const type = searchParams.get("type") === "found" ? "found" : "lost";
  const flow = FLOW[type];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    description: "",
    uniqueMarks: "",
    insideItems: "",
    extraProof: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description.trim()) {
      setError("Please describe the item before submitting.");
      return;
    }

    try {
      setLoading(true);
      await API.post("/claims", {
        itemId: id,
        itemModel: flow.itemModel,
        answers: form,
      });
      alert(flow.successMsg);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF0ED] py-12 px-5 font-sans">
      <div className="fixed top-20 left-10 h-64 w-64 rounded-full bg-[#5A735A]/8 blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 h-56 w-56 rounded-full bg-black/4 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">

        <Link
          to={-1}
          className="inline-flex items-center gap-2 mb-8 rounded-full bg-white border border-black/10 px-5 py-2.5 text-sm font-medium hover:border-[#5A735A] hover:text-[#5A735A] transition-all"
        >
          <ArrowLeft size={15} />
          Back
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-[32px] border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.07)] p-8">

          <div className="flex items-start gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-[#5A735A]/10 flex items-center justify-center text-[#5A735A] shrink-0">
              {flow.icon}
            </div>
            <div>
              <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full mb-2 ${flow.badgeColor}`}>
                {flow.badge}
              </span>
              <h1 className="text-3xl font-serif italic text-black">
                {flow.title}
              </h1>
              <p className="text-black/50 text-sm mt-1 leading-relaxed">
                {flow.subtitle}
              </p>
            </div>
          </div>

          <div className="border-t border-black/5 mb-8" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {flow.questions.map((q, i) => (
              <div key={q.name}>
                <label className="block text-sm font-medium text-black/70 mb-2">
                  {i + 1}. {q.label}
                  {q.required && <span className="text-red-400 ml-1">*</span>}
                </label>
                <textarea
                  rows={i === 0 ? 4 : 3}
                  name={q.name}
                  value={form[q.name]}
                  onChange={handleChange}
                  placeholder={q.placeholder}
                  required={q.required}
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-sm outline-none transition-all focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)] resize-none placeholder:text-black/30"
                />
              </div>
            ))}

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="rounded-2xl bg-[#5A735A]/5 border border-[#5A735A]/10 px-5 py-4 text-xs text-black/50 leading-relaxed">
               Your answers are only visible to the{" "}
              {type === "lost" ? "item owner" : "finder"}. Contact details are
              shared only after they approve your claim.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#5A735A] py-4 text-white font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : flow.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClaimItem;