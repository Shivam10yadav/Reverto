import React from "react";

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#FDF0ED] text-gray-600 text-sm border-t border-black/[0.04] pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid: Info + Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 pb-16 border-b border-black/[0.04]">
          {/* Brand & Newsletter Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                R
              </div>
              <span className="font-serif text-xl tracking-wide text-[#111111] font-semibold">
                reverto
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
              Building a secure, community-driven ecosystem for lost items.
              Reconnecting misplaced belongings through cryptographic safety
              parameters.
            </p>

            {/* Newsletter Subscription Block */}
            <div className="space-y-2 max-w-sm pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Network Updates
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#FDF0ED]/50 border border-black/[0.06] rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none focus:border-[#5A735A] transition-colors"
                />
                <button className="bg-[#111111] text-white hover:bg-black px-4 py-2.5 rounded-xl text-xs font-medium transition-colors shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <a
                  href="#features"
                  className="hover:text-black transition-colors"
                >
                  Reverto Engine
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Verify Escrow
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Global Hub Map
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Mobile Application
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-black transition-colors"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-black transition-colors">
                  Help Center / FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Institutional
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Transit Partners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Enterprise Suite
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Airport Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Developer API
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: System Status / Trust */}
        </div>

        {/* Bottom Utility Metadata Row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400">
          <p>
            &copy; 2026 Reverto Technology Inc. The Reverto network structure is
            patently protected.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Cookie Configurations
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
