import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";


export function FAQ() {
  const faqs = [
    { q: "How does Reverto verify if someone is the true owner?", a: "We protect ownership validation using a blind-question structure. Claimants must submit private proof specifications (e.g., specific decals, unique scratches, lock screen configurations) which are validated by the finder before communication bridges unlock." },
    { q: "Is my location exposed when I post an item?", a: "Never. Reverto relies on fuzzy-geography boundaries. It maps items within wide sectors, giving prospective finders a general radius without publicizing your exact routines, residence, or workplace." },
    { q: "Can reward handoffs be handled securely via the web app?", a: "Yes, you can optionally configure token gestures or shipping bounties natively. Funds are safely held in escrow and released directly to the finder once safe arrival is logged." }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#FDF0ED]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#111111] font-medium">Frequently Addressed Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => <FAQItem key={idx} q={faq.q} a={faq.a} />)}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-black/[0.04] bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-5 flex justify-between items-center text-left text-[#111111] font-medium hover:bg-black/[0.01]">
        <span className="font-sans text-sm md:text-base pr-4 font-semibold">{q}</span>
        {isOpen ? <Minus size={18} className="text-[#5A735A] shrink-0" /> : <Plus size={18} className="text-gray-400 shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-black/[0.02] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}