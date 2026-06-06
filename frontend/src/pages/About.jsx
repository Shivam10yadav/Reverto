import React from "react";
import {
  Search,
  PackageSearch,
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const features = [
    {
      icon: <Search size={22} className="text-[#5A735A]" />,
      title: "Report",
      text: "Post details about a lost or found item in just a few seconds with descriptions and images.",
    },
    {
      icon: <PackageSearch size={22} className="text-[#5A735A]" />,
      title: "Match",
      text: "People searching for their belongings can discover matching listings through smart filters.",
    },
    {
      icon: <ShieldCheck size={22} className="text-[#5A735A]" />,
      title: "Verify",
      text: "Owners answer private verification questions before any item is handed over.",
    },
    {
      icon: <MessageCircle size={22} className="text-[#5A735A]" />,
      title: "Reconnect",
      text: "Once verified, both users can safely communicate and arrange the return.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDF0ED] text-[#111111] pt-32 pb-24">
      <Link
        to="/"
        className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md text-black transition-all duration-300 hover:-translate-x-1 hover:border-[#5A735A] hover:text-[#5A735A]"
      >
        <ArrowLeft size={20} strokeWidth={2.2} />
      </Link>
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        <section className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-[#5A735A]/10 text-[#5A735A] text-xs font-semibold tracking-widest uppercase">
            About Reverto
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
            Helping people reconnect with
            <span className="text-[#5A735A]"> what they've lost.</span>
          </h1>

          <p className="mt-8 text-lg text-black/60 leading-8 max-w-3xl mx-auto">
            Every day, wallets, phones, keys, ID cards, and important belongings
            disappear. Most are never recovered—not because they can't be found,
            but because people don't know where to look. Reverto creates one
            trusted place where communities help each other recover what
            matters.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-[32px] p-10 border border-black/5">
            <p className="text-[#5A735A] text-xs font-bold uppercase tracking-[0.2em]">
              The Problem
            </p>

            <h2 className="mt-4 text-3xl font-bold">Lost & Found is broken.</h2>

            <p className="mt-6 text-black/60 leading-8">
              Today, people rely on WhatsApp groups, Instagram stories, Facebook
              posts, and paper notices. Information gets scattered, fake claims
              become common, and personal phone numbers are exposed publicly.
            </p>
          </div>

          <div className="bg-[#111111] rounded-[32px] p-10 text-white">
            <p className="text-[#5A735A] text-xs font-bold uppercase tracking-[0.2em]">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Build a safer way to reconnect.
            </h2>

            <p className="mt-6 text-white/70 leading-8">
              Reverto protects user privacy while making it easier for honest
              people to return lost belongings through verification and secure
              communication.
            </p>
          </div>
        </section>

        <section className="space-y-12">
          <div className="text-center">
            <span className="text-[#5A735A] uppercase text-xs tracking-[0.2em] font-bold">
              How It Works
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              From lost to found.
            </h2>
          </div>

          <div className="bg-white rounded-[36px] border border-black/5 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
              <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-[1px] bg-black/10"></div>

              <div className="relative text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-[#5A735A] text-white flex items-center justify-center font-semibold relative z-10">
                  1
                </div>

                <h3 className="mt-5 text-lg font-semibold">Report</h3>

                <p className="mt-3 text-sm text-black/60 leading-7">
                  Create a lost or found listing with a few details and optional
                  images.
                </p>
              </div>

              <div className="relative text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-[#5A735A] text-white flex items-center justify-center font-semibold relative z-10">
                  2
                </div>

                <h3 className="mt-5 text-lg font-semibold">Discover</h3>

                <p className="mt-3 text-sm text-black/60 leading-7">
                  Community members search and browse listings to find possible
                  matches.
                </p>
              </div>

              <div className="relative text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-[#5A735A] text-white flex items-center justify-center font-semibold relative z-10">
                  3
                </div>

                <h3 className="mt-5 text-lg font-semibold">Verify</h3>

                <p className="mt-3 text-sm text-black/60 leading-7">
                  Private claim questions help confirm true ownership before
                  connecting users.
                </p>
              </div>

              <div className="relative text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-[#5A735A] text-white flex items-center justify-center font-semibold relative z-10">
                  4
                </div>

                <h3 className="mt-5 text-lg font-semibold">Reconnect</h3>

                <p className="mt-3 text-sm text-black/60 leading-7">
                  Once approved, both people can safely communicate and complete
                  the return.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[36px] bg-white p-10 md:p-16 border border-black/5 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Trust is built into every step.
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-black/60 leading-8">
            Personal information stays private. Ownership is verified through
            claim questions. Communication only opens after approval, reducing
            fraud and creating a safer recovery experience for everyone.
          </p>

          <div className="mt-10 inline-flex rounded-full bg-[#5A735A] px-8 py-4 text-white font-medium">
            Helping people reconnect with what they've lost.
          </div>
        </section>
      </div>
    </main>
  );
}
