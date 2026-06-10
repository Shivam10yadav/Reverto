import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import API from "../api/axios";

export function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] px-6 py-3"
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center font-bold text-white text-sm">
              R
            </div>
            <span className="italic font-serif text-xl tracking-wide text-[#111111] font-semibold">
              Reverto
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#hero" className="hover:text-black transition-colors duration-200">Hero</a>
            <Link to="/about" className="hover:text-black transition-colors duration-200">About</Link>
            <Link to="/success-stories" className="hover:text-black transition-colors duration-200">Success</Link>
            <a href="#features" className="hover:text-black transition-colors duration-200">Features</a>
            <a href="#howitworks" className="hover:text-black transition-colors duration-200">How It Works</a>
            <a href="#faq" className="hover:text-black transition-colors duration-200">FAQ</a>
            <a href="#contact" className="hover:text-black transition-colors duration-200">Contact</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="w-9 h-9 rounded-full bg-[#5A735A] text-white font-semibold text-sm flex items-center justify-center hover:scale-105 transition-all duration-200 focus:outline-none">
                  {user.name?.charAt(0).toUpperCase()}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-black/5">
                        <p className="text-sm font-semibold text-black truncate">{user.name}</p>
                        <p className="text-xs text-black/45 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-black/70 hover:bg-[#5A735A]/5 hover:text-[#5A735A] transition-colors"
                      >
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={15} />
                        Logout 
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-full border border-black/10 px-5 py-2 text-xs font-medium text-black/70 hover:border-black hover:text-black transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2 text-xs font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get Started
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}