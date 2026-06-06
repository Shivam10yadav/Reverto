import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Shield, ArrowRight, CheckCircle, Plus, Minus } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Stats } from '../components/stats';
import { Features } from '../components/features';
import { HowItWorks } from '../components/HowItWorks';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

// --- SHARED ANIMATION CONFIGS ---
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

// --- MAIN HOME COMPONENT ASSEMBLY ---
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF0ED] text-[#111111] font-sans selection:bg-[#D4E4D4] selection:text-black antialiased">
      <Navbar />
      
      {/* SECTION 1: PINK BACKGROUND */}
      <Hero />         
      
      {/* SECTION 2: WHITE BACKGROUND */}
      <Stats/>        
      
      {/* SECTION 3: PINK BACKGROUND */}
      <Features />     
      
      {/* SECTION 4: WHITE BACKGROUND */}
      <HowItWorks />   
      
      {/* SECTION 5: PINK BACKGROUND */}
      <FAQ />          
      
      {/* SECTION 6: WHITE BACKGROUND */}
      <Contact />      
      
      <Footer />
    </div>
  );
}