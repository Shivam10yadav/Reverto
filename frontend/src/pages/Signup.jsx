import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Signup = () => {

    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSignup = async (e) => {
  e.preventDefault();

  const { data } = await API.post("/auth/register", {
    name,
    email,
    password,
  });

  setUser(data.user);
  navigate("/home");
};
  return (
    <div className="min-h-screen bg-[#FDF0ED] flex items-center justify-center px-6 py-6 font-sans overflow-hidden relative">
      <div className="absolute top-24 left-20 h-48 w-48 rounded-full bg-[#5A735A]/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-56 w-56 rounded-full bg-black/5 blur-3xl"></div>

      <Link
        to="/"
        className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md text-black transition-all duration-300 hover:-translate-x-1 hover:border-[#5A735A] hover:text-[#5A735A]"
      >
        <ArrowLeft size={20} strokeWidth={2.2} />
      </Link>

      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_460px] gap-10 items-center">
        <div className="hidden lg:flex flex-col">
          <div className="inline-flex w-fit rounded-full border border-[#5A735A]/20 bg-[#5A735A]/10 px-4 py-2 text-sm font-medium text-[#5A735A]">
            Community Lost & Found
          </div>

          <h1 className="italic font-serif mt-8 text-7xl xl:text-8xl font-light tracking-tight text-[#5A735A]">
            Join Us
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-black/65">
            Become a part of a community that helps people recover what matters
            most. Create your account and start making a difference.
          </p>

          <div className="mt-16 flex gap-5">
            <div className="h-20 w-20 rounded-full border-2 border-[#5A735A]/20 bg-white"></div>

            <div className="mt-10 h-14 w-14 rounded-full bg-[#5A735A]/20"></div>

            <div className="h-28 w-28 rounded-full border border-black/10 bg-white/70"></div>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/80 border border-white/60 rounded-[36px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <h2 className="text-3xl font-bold text-black">Create Account</h2>

          <p className="mt-2 text-black/60">
            Start your Reverto journey today.
          </p>

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-black/70">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                  value={name}
                 onChange={(e) => setName(e.target.value)}
 className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-black/70">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-black/70">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={email}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-black/70">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-[#5A735A] focus:shadow-[0_0_0_4px_rgba(90,115,90,0.08)]"
              />
            </div>

            <button className="w-full rounded-2xl bg-[#5A735A] py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              Create Account
            </button>

            <button
              type="button"
              className="w-full rounded-2xl border border-black/10 bg-white py-3 font-medium  transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
            >
              Continue with Google
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-xs text-black/40">OR</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <p className="mt-5 text-center text-sm text-black/60">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#5A735A]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
