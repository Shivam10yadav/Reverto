import React, { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const ClaimItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    description: "",
    uniqueMarks: "",
    insideItems: "",
    extraProof: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/claims", {
        itemId: id,
        itemModel: "LostItem",
        answers: form,
      });

      alert("Claim submitted successfully.");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF0ED] py-12 px-5">
      <div className="max-w-3xl mx-auto">

        <Link
          to={-1}
          className="inline-flex items-center gap-2 mb-6 rounded-full bg-white border border-black/10 px-5 py-2"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="bg-white rounded-[32px] border border-black/5 p-8 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-[#5A735A]/10 flex items-center justify-center text-[#5A735A]">
              <ShieldCheck />
            </div>

            <div>
              <h1 className="text-4xl font-serif italic font-semibold text-[#5A735A]">
                Claim This Item
              </h1>

              <p className="text-black/50 text-sm mt-1">
                Help the owner verify that this item belongs to you.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 font-medium">
                Describe the item
              </label>

              <textarea
                rows="4"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 p-4 outline-none focus:border-[#5A735A]"
                placeholder="Color, brand, condition..."
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Unique marks or scratches
              </label>

              <textarea
                rows="3"
                name="uniqueMarks"
                value={form.uniqueMarks}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 p-4 outline-none focus:border-[#5A735A]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                What was inside it?
              </label>

              <textarea
                rows="3"
                name="insideItems"
                value={form.insideItems}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 p-4 outline-none focus:border-[#5A735A]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Additional proof
              </label>

              <textarea
                rows="3"
                name="extraProof"
                value={form.extraProof}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 p-4 outline-none focus:border-[#5A735A]"
                placeholder="Receipt, serial number, purchase details..."
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-[#5A735A] py-4 text-white font-semibold hover:scale-[1.01] transition"
            >
              {loading ? "Submitting..." : "Submit Claim"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ClaimItem;