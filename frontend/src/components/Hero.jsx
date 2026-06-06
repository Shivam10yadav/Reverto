import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


export function Hero() {
  return (
    <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-[#FDF0ED]">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans uppercase tracking-[0.2em] text-xs font-bold text-[#5A735A] block mb-6">
            Introducing Reverto
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#111111] tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto font-medium">
            Bringing what’s lost back to <span className="italic text-[#5A735A] font-light">where it belongs</span>.
          </h1>
          <p className="font-sans text-gray-700 text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            A community-driven sanctuary for misplaced belongings. Securely report, search, and reconnect with your items through a network built on trust.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto bg-[#111111] text-white hover:bg-black font-medium px-8 py-4 rounded-full flex items-center justify-center gap-2 group transition-all duration-300 shadow-md">
            Report a Lost Item
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-transparent text-[#111111] border border-black/20 hover:bg-black/5 font-medium px-8 py-4 rounded-full transition-colors duration-300">
            Browse Found Catalog
          </button>
        </motion.div>
      </div>
    </section>
  );
}