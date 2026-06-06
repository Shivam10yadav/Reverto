import { motion } from "framer-motion";
import { fadeIn } from "../utils/animations";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Log the Incident",
      desc: "Pinpoint where the item parted ways or where you uncovered it. Add vital traits like engravings, lock screens, or custom tags.",
    },
    {
      num: "02",
      title: "Automated Verification",
      desc: "When a potential match occurs, our escrow communication forces ownership confirmation questions before any contact details exchange.",
    },
    {
      num: "03",
      title: "Safe Reconnection",
      desc: "Coordinate returns smoothly through built-in partner drop-off spots, or arrange a secure safe-zone meeting.",
    },
  ];

  return (
    <section
      id="howitworks"
      className="py-24 bg-[#FFFFFF] border-y border-black/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs uppercase tracking-widest text-[#5A735A] font-bold block mb-3">
              The Blueprint
            </span>
            <h2 className="font-serif text-4xl text-[#111111] font-medium tracking-tight mb-6">
              Simple steps to reverse a loss.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We stripped away complex tracking setups to craft an immediate,
              community-supported recovery loop.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                key={idx}
                className="flex gap-6 md:gap-10 pb-12 border-b border-black/[0.06] last:border-0"
              >
                <span className="font-serif text-3xl md:text-4xl text-[#5A735A]/50 font-light tracking-tighter">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-[#111111] font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
