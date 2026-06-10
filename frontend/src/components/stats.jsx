import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  viewport: { once: true, margin: "-100px" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-100px" }
};

export function Stats() {
  const stats = [
    { 
      number: "14k+", 
      label: "Items Reunited",
      desc: "Successfully matched and safely returned back into the hands of their rightful owners worldwide."
    },
    { 
      number: "98%", 
      label: "Verified Safe Returns",
      desc: "Our double-blind ownership parameter checks completely eliminate false claims and scam handoffs."
    },
    { 
      number: "24m", 
      label: "Average Match Time",
      desc: "From the moment an incident is logged, our smart indexing engine flags potential overlapping matches instantly."
    },
  ];

  return (
    <section className="bg-[#FFFFFF] py-24 md:py-32 border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#5A735A] font-bold block mb-3">
            Ecosystem Metrics
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111111] font-medium tracking-tight">
            A network built entirely on speed, integrity, and absolute verification.
          </h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              variants={fadeIn} 
              key={index} 
              className="bg-[#FDF0ED]/40 border border-black/[0.02] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:shadow-xl hover:shadow-[#5A735A]/5 transition-all duration-300"
            >
              <div>
                <h3 className="font-serif text-6xl md:text-7xl text-[#111111] font-bold tracking-tight mb-4">
                  {stat.number}
                </h3>
                <p className="text-xs tracking-widest uppercase text-[#5A735A] font-bold mb-4">
                  {stat.label}
                </p>
              </div>
              
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed border-t border-black/[0.04] pt-4 mt-4">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}