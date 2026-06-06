import { motion } from "framer-motion";

export function Navbar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] px-6 py-3"
      >
        <div className="flex justify-between items-center">
          {/* Logo Brand Block */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center font-bold text-white text-sm">
              R
            </div>
            <span className="font-serif text-lg tracking-wide text-[#111111] font-semibold">
              reverto
            </span>
          </div>

          {/* Navigation Link Interactivity */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#hero" className="hover:text-black transition-colors duration-200">Hero</a>
            <a href="#features" className="hover:text-black transition-colors duration-200">Features</a>
            <a href="#howitworks" className="hover:text-black transition-colors duration-200">How It Works</a>
            <a href="#faq" className="hover:text-black transition-colors duration-200">FAQ</a>
            <a href="#contact" className="hover:text-black transition-colors duration-200">Contact</a>
            <a href="#footer" className="hover:text-black transition-colors duration-200">Footer</a>
          </div>

          {/* Call To Action Block */}
          <div>
            <button className="bg-[#111111] text-white hover:bg-black px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-[1.02]">
              Launch App
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}