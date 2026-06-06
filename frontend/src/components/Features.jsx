import { motion } from "framer-motion";
import { MapPin, SearchAlert, Shield } from "lucide-react";
import { fadeIn, staggerContainer } from "../utils/animations.js";

export function Features() {
  const features = [
    {
      icon: <SearchAlert className="text-[#435743]" size={24} />,
      title: "Smart Matching Engine",
      description:
        "Our cross-referencing system scans geolocation, tags, and item descriptions instantly to flag potential ownership matches as they happen.",
    },
    {
      icon: <Shield className="text-[#435743]" size={24} />,
      title: "Secure Verification",
      description:
        "No public handoffs or exposed numbers. Prove ownership via private, encrypted parameters and select secure local meetup hubs.",
    },
    {
      icon: <MapPin className="text-[#435743]" size={24} />,
      title: "Hyper-Local Mapping",
      description:
        "Drop a micro-pin exactly where you last remember your item. Finders can map discoveries without publicizing sensitive details.",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#FDF0ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-widest text-[#5A735A] font-bold block mb-3">
            Core Infrastructure
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#111111] tracking-tight font-medium">
            Designed for human honesty, backed by airtight utility.
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feat, index) => (
            <motion.div
              variants={fadeIn}
              key={index}
              className="bg-[#FFFFFF] border border-black/[0.02] rounded-3xl p-8 hover:shadow-xl hover:shadow-[#5A735A]/5 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF2EA] flex items-center justify-center mb-8">
                  {feat.icon}
                </div>
                <h3 className="font-serif text-xl text-[#111111] font-semibold mb-4">
                  {feat.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
