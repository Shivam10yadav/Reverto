import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Map } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FDF0ED] px-6 py-24">
      <div className="max-w-xl mx-auto text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 bg-[#5A735A]/10 rounded-2xl flex items-center justify-center mx-auto mb-8"
        >
          <Map size={28} color="#5A735A" />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="font-sans uppercase tracking-[0.2em] text-xs font-bold text-[#5A735A] block mb-4">
            Error 404
          </span>
          
          <h1 className="font-serif text-4xl md:text-5xl text-[#111111] tracking-tight mb-6 font-medium">
            Lost your <span className="italic text-[#5A735A] font-light">way?</span>
          </h1>
          
          <p className="font-sans text-gray-700 text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
            The page you are looking for doesn't exist or has been moved. Let's get you back to track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-[#111111] text-white hover:bg-black font-medium px-8 py-3.5 rounded-full text-sm group transition-all duration-300 shadow-sm mx-auto"
          >
            Go Back Home
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}