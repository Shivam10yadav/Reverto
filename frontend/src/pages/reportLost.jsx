import React, { useState } from "react";
import { ArrowLeft, Upload, X, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const CATEGORIES = [
  "Electronics",
  "Wallet / Purse",
  "ID / Documents",
  "Keys",
  "Bag / Backpack",
  "Clothing",
  "Jewellery",
  "Other",
];

const ReportLost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    reward: "",
  });

  const [images, setImages] = useState([]); // File objects
  const [previews, setPreviews] = useState([]); // base64 preview URLs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 4) {
      setError("You can upload up to 4 images only.");
      return;
    }

    setError("");
    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.category || !form.location) {
      setError("Title, category and location are required.");
      return;
    }

    try {
      setLoading(true);

      // Use FormData to send files + fields together
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("reward", form.reward);
      images.forEach((img) => formData.append("images", img));

      await API.post("/lost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans px-6 py-10">
      {/* Blobs */}
      <div className="absolute top-24 left-20 h-48 w-48 rounded-full bg-[#5A735A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 h-56 w-56 rounded-full bg-black/5 blur-3xl pointer-events-none" />

      {/* Back button */}
      <Link
        to="/"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md text-black transition-all hover:-translate-x-1 hover:border-[#5A735A] hover:text-[#5A735A] mb-10"
      >
        <ArrowLeft size={18} />
      </Link>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex rounded-full border border-[#5A735A]/20 bg-[#5A735A]/10 px-4 py-1.5 text-sm font-medium text-[#5A735A] mb-4">
            Lost Item
          </span>
          <h1 className="italic font-serif text-4xl text-black font-light">
            Report a <span className="text-[#5A735A]">Lost Item</span>
          </h1>
          <p className="mt-2 text-black/55 text-sm leading-6">
            Fill in the details below. The more info you provide, the better
            your chances of getting it back.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.07)] space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Item Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Black Leather Wallet"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3.5 outline-none transition-all focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3.5 outline-none transition-all focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)] text-black/70"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Last Seen Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Kurukshetra University Library"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3.5 outline-none transition-all focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe the item — color, brand, any distinguishing features..."
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3.5 outline-none transition-all focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)] resize-none"
            />
          </div>

          {/* Reward */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Reward (optional)
            </label>
            <input
              type="text"
              name="reward"
              placeholder="e.g. ₹500"
              value={form.reward}
              onChange={handleChange}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3.5 outline-none transition-all focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)]"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Images (up to 4)
            </label>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt={`preview-${i}`}
                      className="w-full h-20 object-cover rounded-xl border border-black/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload box */}
            {images.length < 4 && (
              <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-black/15 rounded-2xl py-8 cursor-pointer hover:border-[#5A735A] transition-colors bg-white/50">
                <Upload size={22} className="text-black/30" />
                <span className="text-sm text-black/45">
                  Click to upload images
                </span>
                <span className="text-xs text-black/30">
                  JPG, PNG, WEBP · Max 5MB each
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#5A735A] py-4 text-white font-semibold text-lg transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportLost;
