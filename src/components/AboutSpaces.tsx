import React, { useState } from "react";
import { Trees, Warehouse, Compass, CheckCircle2, ChevronRight } from "lucide-react";
import { FLOOR_SPACES } from "../data/restaurantData";
import { motion } from "motion/react";
// @ts-ignore
import regeneratedImage from "../assets/images/regenerated_image_1781689958674.png";

interface AboutSpacesProps {
  language: "VI" | "EN";
  scrollToSection: (id: string) => void;
}

export default function AboutSpaces({ language, scrollToSection }: AboutSpacesProps) {
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);

  const spacesImages = [
    regeneratedImage, // Garden/Outdoor pond
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", // Intricate Lim House Indoor
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", // VIP Private suite / Dining
  ];

  const spacesIcons = [
    <Trees className="w-5 h-5" />,
    <Warehouse className="w-5 h-5" />,
    <Compass className="w-5 h-5" />
  ];

  const activeSpace = FLOOR_SPACES[selectedSpaceIndex];

  return (
    <section id="spaces" className="py-24 bg-[#122A26] text-[#FAF9F6] border-y border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase block mb-3 font-semibold font-sans">
            {language === "VI" ? "KIỆT TÁC KHỒNG GIAN" : "UNCOMPROMISING ARCHITECTURE"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6 font-medium text-[#FAF9F6]">
            {language === "VI" ? "Khám Phá Khuôn Viên 1.600m²" : "Explore the 1,600m² Heritage Estate"}
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/50 mx-auto" />
        </div>

        {/* INTERACTIVE SPLIT INTERACTION PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: SPACE LIST SWITCHER & DESCRIPTIONS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            
            {/* BUTTON SELECTORS */}
            <div className="space-y-4">
              {FLOOR_SPACES.map((space, idx) => {
                const isSelected = selectedSpaceIndex === idx;
                return (
                  <button
                    key={space.id}
                    onClick={() => setSelectedSpaceIndex(idx)}
                    className={`w-full text-left p-6 border transition-all duration-500 rounded-none relative overflow-hidden flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? "bg-[#2C1F16] border-[#D4AF37] text-[#FAF9F6] shadow-xl" 
                        : "bg-transparent border-[#D4AF37]/15 text-[#FAF9F6]/60 hover:border-[#D4AF37]/45 hover:text-[#FAF9F6]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-sm border ${
                        isSelected ? "bg-[#D4AF37]/15 border-[#D4AF37]" : "bg-white/5 border-white/10"
                      }`}>
                        {spacesIcons[idx]}
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-semibold">
                          {language === "VI" ? space.nameVi : space.nameEn}
                        </h4>
                        <p className="text-xs text-[#C5A059] font-sans mt-0.5">
                          {language === "VI" ? space.capacity : space.capacityEn}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-500 ${
                      isSelected ? "translate-x-1 text-[#D4AF37]" : "text-[#D4AF37]/35"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* DYNAMIC TEXT DISPLAY */}
            <div className="bg-[#2C1F16]/40 p-8 border border-[#D4AF37]/10 space-y-6">
              <h3 className="font-serif text-2xl text-[#D4AF37] font-medium leading-none">
                {language === "VI" ? activeSpace.nameVi : activeSpace.nameEn}
              </h3>
              
              <p className="text-sm text-[#FAF9F6]/80 leading-relaxed font-sans font-light">
                {language === "VI" ? activeSpace.descriptionVi : activeSpace.descriptionEn}
              </p>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] block mb-3 font-semibold font-serif">
                  {language === "VI" ? "Điểm Nhấn Độc Đáo:" : "Ambiance Highlights:"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(language === "VI" ? activeSpace.highlightsVi : activeSpace.highlightsEn).map((high, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-[#FAF9F6]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="font-sans font-light">{high}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* REDIRECT TO RESERVATIONS WITH PRE-CHOSEN ZONE */}
              <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <span className="text-xs text-[#FAF9F6]/60 font-sans italic">
                  {language === "VI" 
                    ? "*Khuyên dùng: Đặt trước tối thiểu 48 tiếng cho tiệc VIP." 
                    : "*Recommended: Secure slots 48 hours early for VIPs."}
                </span>
                <button
                  onClick={() => scrollToSection("reservation")}
                  className="text-xs text-[#D4AF37] font-serif hover:underline tracking-widest uppercase font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === "VI" ? "Chọn Khu Vực Này" : "Select This Zone"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT: PHOTO GRAPHICS STAGGERED GRID */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#D4AF37]/25 shadow-2xl bg-[#2C1F16]">
              {/* Dynamic image based on active highlight selection */}
              <motion.img
                key={selectedSpaceIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 0.8 }}
                src={spacesImages[selectedSpaceIndex]}
                alt={activeSpace.nameEn}
                className="w-full h-full object-cover object-center filter saturate-75 brightness-95"
              />
              
              {/* LUXURY BRONZE CORNER ANCHORS */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#D4AF37] z-10" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#D4AF37] z-10" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#D4AF37] z-10" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#D4AF37] z-10" />
            </div>

            <div className="mt-4 flex gap-3 text-xs justify-center items-center font-serif text-[#C5A059]/65">
              <span>{language === "VI" ? "Cổ kính" : "Ancient Heritage"}</span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
              <span>{language === "VI" ? "Sang trọng" : "Sleek Luxury"}</span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
              <span>{language === "VI" ? "Độc bản" : "One-of-a-Kind"}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
