import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Gift,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/authContext";

const LostItemDetails = () => {

  

  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);


  const { user } = useAuth();

const isOwner =
  user &&
  item?.owner &&
  user._id === item.owner._id;

  useEffect(() => {
    // Crucial: Forces the viewport window to reset to the top when navigating here
    window.scrollTo(0, 0);
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const { data } = await API.get(`/lost/${id}`);
      setItem(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced Loading Layout to prevent middle-page layout jumping
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF0ED] flex flex-col items-center justify-center gap-3 font-sans">
        <Loader2 className="animate-spin text-[#5A735A]" size={32} />
        <p className="text-sm tracking-wide font-medium text-[#5A735A]/70 animate-pulse">
          Retrieving item profiles...
        </p>
      </div>
    );
  }

  // Enhanced Not Found Layout
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
          This post might have been removed, claimed, or the link provided is
          invalid.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-white text-sm font-medium transition hover:opacity-90"
        >
          <ArrowLeft size={16} /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0ED] font-sans antialiased text-black pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Navigation Action */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-5 py-2.5 text-sm font-medium hover:border-[#5A735A] transition shadow-sm"
          >
            <ArrowLeft size={16} />
            Back to feed
          </Link>
        </div>

        {/* Layout Workspace Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Media Column */}
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

          {/* Right Information Details Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span
                className={`inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase ${
                  item.type === "Found"
                    ? "bg-[#5A735A]/10 text-[#5A735A]"
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}
              >
                {item.type || "Lost"}
              </span>

              <h1 className="mt-4 text-4xl sm:text-5xl font-serif italic leading-tight text-black">
                {item.title}
              </h1>
            </div>

            {/* Structured Metadata Box Layout */}
            <div className="bg-white/60 rounded-2xl border border-black/5 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-sm backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#5A735A]/10 text-[#5A735A] shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-black/40 font-bold">
                    Location
                  </p>
                  <p className="text-sm font-medium text-black/80 mt-0.5 line-clamp-2">
                    {item.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-x border-black/5 pt-3 sm:pt-0 sm:px-3">
                <div className="p-2 rounded-lg bg-[#5A735A]/10 text-[#5A735A] shrink-0">
                  <Gift size={16} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-black/40 font-bold">
                    Reward Offered
                  </p>
                  <p className="text-sm font-semibold text-[#5A735A] mt-0.5">
                    {item.reward ? `₹${item.reward}` : "No Reward"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="p-2 rounded-lg bg-[#5A735A]/10 text-[#5A735A] shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-black/40 font-bold">
                    Report Date
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

            {/* Description Card Node */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight">
                Item Description
              </h2>
              <p className="text-black/70 text-base leading-relaxed bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
                {item.description ||
                  "No item description details were added by the author for this post."}
              </p>
            </div>

            {/* Security Guard Shield Notification */}
            <div className="rounded-2xl bg-white border border-black/5 p-5 shadow-sm flex gap-4 items-start">
              <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-black">
                  Privacy Protected Ecosystem
                </h3>
                <p className="mt-1 text-xs text-black/50 leading-relaxed">
                  Owner identification matrices are systematically hidden until
                  the cross-match criteria validation verification process
                  pipeline gets cleared successfully.
                </p>
              </div>
            </div>
{isOwner ? (
  <div className="block w-full rounded-2xl bg-gray-200 py-4 text-center text-base font-medium text-gray-600 cursor-not-allowed">
    This is your report
  </div>
) : (
  <Link
    to={`/claim/${item._id}`}
    className="block w-full rounded-2xl bg-[#5A735A] py-4 text-center text-base font-medium text-white transition-all duration-300 hover:bg-[#495e49] hover:shadow-lg hover:-translate-y-0.5"
  >
    I Found This
  </Link>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemDetails;
