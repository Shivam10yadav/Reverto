import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ShieldAlert,
  Loader2,
  PackageSearch,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";

const FoundItemDetail = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const { data } = await API.get(`/found/${id}`);
      setItem(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF0ED] flex flex-col items-center justify-center gap-3 font-sans">
        <Loader2 className="animate-spin text-[#5A735A]" size={32} />
        <p className="text-sm tracking-wide font-medium text-[#5A735A]/70 animate-pulse">
          Retrieving item details...
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#FDF0ED] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert size={28} />
        </div>
        <h2 className="text-2xl font-serif italic text-black">
          Item profile unavailable
        </h2>
        <p className="mt-2 text-black/50 text-sm max-w-xs">
          This post might have been removed, returned, or the link is invalid.
        </p>
        <Link
          to="/home"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-white text-sm font-medium transition hover:opacity-90"
        >
          <ArrowLeft size={16} /> Back to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans antialiased text-black pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">

        {/* Back */}
        <div className="flex items-center justify-between">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-5 py-2.5 text-sm font-medium hover:border-[#5A735A] transition shadow-sm"
          >
            <ArrowLeft size={16} />
            Back to feed
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Image */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white border border-black/5 shadow-sm aspect-[4/3] md:aspect-square lg:h-[540px] w-full">
              <img
                src={
                  item.images?.[0] ||
                  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=900"
                }
                alt={item.title}
                className="h-full w-full object-cover hover:scale-102 transition duration-500"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              {/* Found badge — always green */}
              <span className="inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase bg-[#5A735A]/10 text-[#5A735A] border border-[#5A735A]/20">
                Found
              </span>

              <h1 className="mt-4 text-4xl sm:text-5xl font-serif italic leading-tight text-black">
                {item.title}
              </h1>
            </div>

            {/* Metadata */}
            <div className="bg-white/60 rounded-2xl border border-black/5 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-sm backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#5A735A]/10 text-[#5A735A] shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-black/40 font-bold">
                    Found At
                  </p>
                  <p className="text-sm font-medium text-black/80 mt-0.5 line-clamp-2">
                    {item.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-black/5 pt-3 sm:pt-0 sm:pl-4">
                <div className="p-2 rounded-lg bg-[#5A735A]/10 text-[#5A735A] shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-black/40 font-bold">
                    Reported On
                  </p>
                  <p className="text-sm font-medium text-black/80 mt-0.5">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recent"}
                  </p>
                </div>
              </div>
            </div>

            {/* Category pill if present */}
            {item.category && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-black/50 uppercase tracking-wide">Category</span>
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                  {item.category}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight">
                Item Description
              </h2>
              <p className="text-black/70 text-base leading-relaxed bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
                {item.description ||
                  "No description was added by the finder for this post."}
              </p>
            </div>

            {/* Privacy notice */}
            <div className="rounded-2xl bg-white border border-black/5 p-5 shadow-sm flex gap-4 items-start">
              <div className="h-8 w-8 rounded-full bg-[#5A735A]/10 text-[#5A735A] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-black">
                  Privacy Protected
                </h3>
                <p className="mt-1 text-xs text-black/50 leading-relaxed">
                  The finder's contact details are hidden. Submit a claim to
                  verify ownership — if approved, contact details will be
                  shared privately.
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to={`/claim/${item._id}?type=found`}
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#5A735A] py-4 text-center text-base font-medium text-white transition-all duration-300 hover:bg-[#495e49] hover:shadow-lg hover:-translate-y-0.5"
            >
              <PackageSearch size={18} />
              This Is Mine — Claim It
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItemDetail;