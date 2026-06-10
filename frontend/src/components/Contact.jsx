import React from "react";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import { RiTwitterXFill, RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FFFFFF] border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="bg-[#FDF0ED]/50 border border-black/[0.02] rounded-[2.5rem] p-8 md:p-16 lg:p-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#5A735A] font-bold block">
                Institutional Integration
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] font-medium tracking-tight leading-[1.15]">
                Partner with <span className="italic font-light">reverto</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Are you an institutional entity, public transit manager, or high-traffic venue? Connect with us to unify lost & found frameworks under one centralized community hub.
              </p>
            </div>
            
          

            <div className="space-y-3 pt-4 border-t border-black/[0.04]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">Direct Channels</h4>
              <div className="flex flex-wrap items-center gap-3">
                
                <a 
                  href="mailto:partner@reverto.com" 
                  className="flex items-center gap-2 h-10 px-4 rounded-xl border border-black/[0.06] bg-white text-xs font-medium text-gray-700 hover:text-black hover:border-black/20 transition-all duration-200 shadow-sm"
                >
                  <FiMail size={14} className="text-[#5A735A]" />
                  <span>partner@reverto.com</span>
                </a>

                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl border border-black/[0.06] bg-white text-gray-600 hover:text-black hover:border-black/20 flex items-center justify-center transition-all duration-200 shadow-sm" 
                  aria-label="Twitter X"
                >
                  <RiTwitterXFill size={16} />
                </a>
                
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl border border-black/[0.06] bg-white text-gray-600 hover:text-black hover:border-black/20 flex items-center justify-center transition-all duration-200 shadow-sm" 
                  aria-label="GitHub"
                >
                  <RiGithubFill size={18} />
                </a>

                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl border border-black/[0.06] bg-white text-gray-600 hover:text-black hover:border-black/20 flex items-center justify-center transition-all duration-200 shadow-sm" 
                  aria-label="LinkedIn"
                >
                  <RiLinkedinBoxFill size={20} />
                </a>

              </div>
            </div>
          </div>

          <form className="lg:col-span-7 w-full bg-white border border-black/[0.03] rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(90,115,90,0.03)] space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500 pl-1">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Alex Carter" 
                  className="w-full bg-[#FDF0ED]/30 border border-black/[0.06] rounded-xl px-5 py-3.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#5A735A] focus:bg-white transition-all duration-200" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500 pl-1">Work Email</label>
                <input 
                  type="email" 
                  placeholder="alex@organization.com" 
                  className="w-full bg-[#FDF0ED]/30 border border-black/[0.06] rounded-xl px-5 py-3.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#5A735A] focus:bg-white transition-all duration-200" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500 pl-1">Organization Name</label>
              <input 
                type="text" 
                placeholder="Transit Authority Inc." 
                className="w-full bg-[#FDF0ED]/30 border border-black/[0.06] rounded-xl px-5 py-3.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#5A735A] focus:bg-white transition-all duration-200" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500 pl-1">Message</label>
              <textarea 
                placeholder="Tell us about your hub infrastructure or integration timeline..." 
                rows={4} 
                className="w-full bg-[#FDF0ED]/30 border border-black/[0.06] rounded-xl px-5 py-3.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#5A735A] focus:bg-white transition-all duration-200 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#111111] text-white hover:bg-black active:scale-[0.99] font-medium py-4 rounded-xl text-sm transition-all duration-200 shadow-md shadow-black/5"
            >
              Submit Partnership Inquiry
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}