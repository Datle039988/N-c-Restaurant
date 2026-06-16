import React, { useState } from "react";
import { Menu, X, Landmark, Compass, Calendar, BookOpen, Bot, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import nuocLogo from "../assets/images/nuoc_logo_1781628170172.jpg";

interface HeaderProps {
  language: "VI" | "EN";
  setLanguage: (lang: "VI" | "EN") => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Header({ language, setLanguage, activeSection, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "about", labelVi: "Chuyện Bản Sắc", labelEn: "Our Story" },
    { id: "spaces", labelVi: "Không Gian", labelEn: "The Estate" },
    { id: "menu", labelVi: "Thực Đơn", labelEn: "Gastronomy" },
    { id: "reservation", labelVi: "Xem Ghế & Đặt Bàn", labelEn: "Reservations" },
    { id: "events", labelVi: "Dạ Yến", labelEn: "Elite Events" },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#122A26]/95 backdrop-blur-md border-b border-[#D4AF37]/20 text-[#FAF9F6] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick("hero")}
        >
          <div className="relative p-2 border border-[#D4AF37]/30 bg-[#2C1F16]/50 rounded-sm group-hover:border-[#D4AF37] transition-all duration-300">
            <img 
              src={nuocLogo} 
              alt="Nước Logo" 
              className="w-8 h-8 object-contain rounded-sm"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rotation-45 border border-[#122A26]" />
          </div>
          <div>
            <h1 className="font-serif text-2xl tracking-widest font-semibold text-[#FAF9F6] group-hover:text-[#D4AF37]/90 transition-colors uppercase leading-none">
              NƯỚC
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase mt-1 select-none font-sans">
              RESTAURANT by RuNam
            </p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8 font-serif text-sm tracking-widest uppercase">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-1 py-2 cursor-pointer transition-colors duration-300 hover:text-[#D4AF37] ${
                  isActive ? "text-[#D4AF37] font-semibold" : "text-[#FAF9F6]/80"
                }`}
              >
                {language === "VI" ? item.labelVi : item.labelEn}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* CONTROLS (LANGUAGE TOGGLE / RESERVATION BUTTON) */}
        <div className="hidden md:flex items-center gap-6">
          {/* LANGUAGE SELECTOR */}
          <div className="flex items-center border border-[#D4AF37]/30 bg-[#2C1F16]/30 rounded-full p-1 text-xs">
            <button
              onClick={() => setLanguage("VI")}
              className={`px-3 py-1.5 rounded-full font-sans transition-all duration-300 tracking-wider ${
                language === "VI" 
                  ? "bg-[#D4AF37] text-[#2C1F16] font-bold" 
                  : "text-[#FAF9F6]/60 hover:text-[#FAF9F6]"
              }`}
            >
              VI
            </button>
            <button
              onClick={() => setLanguage("EN")}
              className={`px-3 py-1.5 rounded-full font-sans transition-all duration-300 tracking-wider ${
                language === "EN" 
                  ? "bg-[#D4AF37] text-[#2C1F16] font-bold" 
                  : "text-[#FAF9F6]/60 hover:text-[#FAF9F6]"
              }`}
            >
              EN
            </button>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={() => handleNavClick("reservation")}
            className="group relative px-6 py-3 cursor-pointer bg-[#2C1F16] text-[#FAF9F6] border border-[#D4AF37] rounded-none hover:bg-[#D4AF37] hover:text-[#2C1F16] transition-all duration-500 overflow-hidden text-xs font-serif tracking-[0.2em] uppercase"
          >
            <span className="relative z-10 font-bold">
              {language === "VI" ? "ĐẶT BÀN NGAY" : "RESERVE NOW"}
            </span>
            <div className="absolute inset-0 w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500 -z-0" />
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* LANGUAGE SELECTOR FOR MOBILE HEADER */}
          <button
            onClick={() => setLanguage(language === "VI" ? "EN" : "VI")}
            className="flex items-center gap-1.5 border border-[#D4AF37]/30 rounded px-2.5 py-1 text-xs font-sans text-[#FAF9F6]"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{language}</span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-[#D4AF37]/30 bg-[#2C1F16]/30 text-[#FAF9F6] rounded-sm hover:border-[#D4AF37] transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-[#D4AF37]/20 bg-[#122A26] overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-3 flex flex-col items-stretch text-center font-serif tracking-widest text-sm uppercase">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-3.5 border-b border-[#D4AF37]/10 text-center ${
                    activeSection === item.id ? "text-[#D4AF37] font-semibold" : "text-[#FAF9F6]/80"
                  }`}
                >
                  {language === "VI" ? item.labelVi : item.labelEn}
                </button>
              ))}

              <button
                onClick={() => handleNavClick("reservation")}
                className="w-full mt-4 py-4 bg-[#D4AF37] text-[#2C1F16] font-bold text-xs tracking-widest"
              >
                {language === "VI" ? "ĐẶT BÀN TRỰC TUYẾN" : "RESERVE ONLINE"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
