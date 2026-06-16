import React from "react";
import { ArrowRight, Compass, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import nuocLogo from "../assets/images/nuoc_logo_1781628170172.jpg";

interface HeroProps {
  language: "VI" | "EN";
  scrollToSection: (id: string) => void;
}

export default function Hero({ language, scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#2C1F16]">
      
      {/* CINEMATIC BACKDROP SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/55 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920" 
          alt="Nước Ambiance"
          className="w-full h-full object-cover object-center scale-105 filter saturate-75 brightness-75 select-none"
        />
        
        {/* POETIC GENTLE WAVE WATER OVERLAY */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#122A26] to-transparent z-15 pointer-events-none" />
      </div>

      {/* LUXURY BRONZE LATTICE GRID FRAME */}
      <div className="absolute inset-8 border border-[#D4AF37]/10 z-20 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/45" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/45" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/45" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/45" />
      </div>

      {/* MAIN TEXT OVERLAYS */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 text-center text-[#FAF9F6] pt-12">
        
        {/* LOGO SYMBOL */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <div className="w-12 h-12 border border-[#D4AF37]/40 flex items-center justify-center rounded-sm bg-[#122A26]/80 bg-opacity-70 p-1">
            <img 
              src={nuocLogo} 
              alt="Nước Logo" 
              className="w-10 h-10 object-contain rounded-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* METADATA SLIDER */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 border-y border-[#D4AF37]/20 px-6 py-2.5 mb-8 text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-sans font-light"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>An Khánh, TP. HCM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50" />
          <span>Estate 1,600m²</span>
        </motion.div>

        {/* PRIMARY SLOGAN */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-tight mb-6 font-medium text-gradient bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6] to-[#FAF9F6]/80 text-[#FAF9F6]"
        >
          {language === "VI" ? "Hồn Việt Khơi Nguồn Tinh Hoa" : "Taste the Soul of Vietnam"}
        </motion.h2>

        {/* Brand secondary motto */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="font-serif italic text-lg sm:text-xl text-[#FAF9F6]/85 max-w-2xl mx-auto mb-12 font-thin"
        >
          {language === "VI" 
            ? "Một tuyệt tác Fine Dining mang đậm bản chất di sản đất Việt bên rặng dừa lộng gió của bán đảo Thảo Điền."
            : "An exquisite Fine Dining masterpiece woven into centuries-old timber frames and central lotus lily waterscapes."}
        </motion.p>

        {/* ACTIONS BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          
          {/* ACTION 1: RESERVATION */}
          <button
            onClick={() => scrollToSection("reservation")}
            className="group relative w-full sm:w-auto px-10 py-5 bg-[#C5A059] text-[#2C1F16] border border-[#C5A059] rounded-none hover:bg-transparent hover:text-white transition-all duration-500 font-serif tracking-[0.2em] uppercase text-xs font-bold shadow-xl cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {language === "VI" ? "ĐẶT BÀN NGAY" : "RESERVE A TABLE"}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-[#2C1F16] scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-500 -z-0" />
          </button>

          {/* ACTION 2: EXPLORE MENU */}
          <button
            onClick={() => scrollToSection("menu")}
            className="group w-full sm:w-auto px-10 py-5 bg-[#2C1F16]/75 hover:bg-[#FAF9F6]/10 text-[#FAF9F6] border border-[#D4AF37]/50 rounded-none transition-all duration-500 font-serif tracking-[0.2em] uppercase text-xs cursor-pointer shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              {language === "VI" ? "KHÁM PHÁ THỰC ĐƠN" : "EXPLORE THE MENU"}
            </span>
          </button>
        </motion.div>

        {/* FLOATING HOVER AMBIANCE INFO */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059]/80 font-serif"
        >
          <span>Scroll</span>
          <div className="w-[1px] h-10 bg-[#D4AF37]/35 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 40], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 h-3 bg-[#D4AF37]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
