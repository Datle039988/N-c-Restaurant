import React, { useState, useMemo } from "react";
import { Search, Compass, Clock, Award, ShieldCheck, Flame, X, Utensils } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS, OTHER_MENU_ITEMS, MenuItem } from "../data/restaurantData";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  language: "VI" | "EN";
}

export default function MenuSection({ language }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Parse custom items to conform to the standard MenuItem model
  const normalizedOtherItems: MenuItem[] = useMemo(() => {
    return OTHER_MENU_ITEMS.map((item, idx) => {
      // Parse price like "255k" to a number like 255000
      const numericPrice = parseInt(item.price.replace("k", ""), 10) * 1000;
      return {
        id: item.id,
        stt: 100 + idx,
        nameVi: item.titleVi,
        nameEn: item.titleEn,
        category: item.cat,
        price: numericPrice,
        isSignature: false,
        timeToServe: "12 phút",
        descriptionVi: `Khám phá mỹ thực độc đáo bậc nhất thuộc hệ sinh thái RuNam, chế biến từ nguyên liệu tươi organic dạt dào.`,
        descriptionEn: `Bespoke culinary item crafted meticulously by NƯỚC chefs, honoring centuries-old regional recipes.`,
        image: (item as any).image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
      };
    });
  }, []);

  // Concatenate deep rich items and normalized list to secure 122 total dishes!
  const masterMenu = useMemo(() => {
    return [...MENU_ITEMS, ...normalizedOtherItems];
  }, [normalizedOtherItems]);

  // Handle Search and Category matching
  const filteredMenuList = useMemo(() => {
    return masterMenu.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = 
        searchQuery === "" ||
        item.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descriptionVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [masterMenu, activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#FAF9F6] text-[#2C1F16] relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER AREA */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase block mb-3 font-semibold font-sans">
            {language === "VI" ? "THỰC ĐƠN DI SẢN" : "HERITAGE GASTRONOMY"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 font-medium text-[#2C1F16]">
            {language === "VI" ? "Cổ Mỹ Vị 122 Món Đặc Sắc" : "The 122 Masterpiece Creations"}
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-sm text-[#2C1F16]/75 font-sans font-light max-w-2xl mx-auto">
            {language === "VI"
              ? "Tuyển tập 122 món ăn tinh bọc của ẩm thực Việt Nam ba miền. Mỗi món ăn là một bức tranh đúc mộc đầy hương, dâng hiến vẹn nguyên bản sắc."
              : "A curated curation of exactly 122 culinary artworks celebrating Northern, Central, and Southern dynasties with modern flair."}
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="mb-12 space-y-6">
          
          {/* SEARCH INPUT */}
          <div className="relative max-w-md mx-auto border-b border-[#D4AF37]/35 focus-within:border-[#D4AF37] transition-all">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#C5A059]">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={language === "VI" ? "Tìm kiếm hương vị (Pho, gỏi, bò...)" : "Search flavor (Pho, crab, beef...)"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent text-[#2C1F16] placeholder-[#2C1F16]/40 text-sm font-sans focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#2C1F16]/50 hover:text-[#2C1F16]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* DYNAMIC SCROLLABLE CATEGORIES TABS */}
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto gap-3 pb-4 scrollbar-thin scrollbar-thumb-[#D4AF37]/20">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 text-xs font-serif tracking-widest uppercase cursor-pointer whitespace-nowrap transition-all duration-300 border ${
                activeCategory === "all"
                  ? "bg-[#122A26] border-[#D4AF37] text-[#FAF9F6]"
                  : "bg-transparent border-[#2C1F16]/10 text-[#2C1F16]/70 hover:border-[#122A26]/40 hover:text-[#122A26]"
              }`}
            >
              {language === "VI" ? "Toàn bộ" : "All Specialties"}
            </button>
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 text-xs font-serif tracking-widest uppercase cursor-pointer whitespace-nowrap transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#122A26] border-[#D4AF37] text-[#FAF9F6]"
                      : "bg-transparent border-[#2C1F16]/10 text-[#2C1F16]/70 hover:border-[#122A26]/40 hover:text-[#122A26]"
                  }`}
                >
                  {language === "VI" ? cat.labelVi : cat.labelEn}
                </button>
              );
            })}
          </div>

        </div>

        {/* STATS COUNT */}
        <div className="text-right text-xs text-[#C5A059] font-sans tracking-wide mb-6 uppercase">
          {language === "VI" 
            ? `Tìm thấy ${filteredMenuList.length} món ăn phù hợp` 
            : `Showing ${filteredMenuList.length} matching delicacies`}
        </div>

        {/* MAIN MEALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenuList.map((dish) => {
            return (
              <motion.div
                layout
                key={dish.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#D4AF37]/15 rounded-none overflow-hidden hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                {/* PHOTO CONTAINER */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#2C1F16]">
                  <img 
                    src={dish.image} 
                    alt={dish.nameEn} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-90 saturate-[0.8] hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* BADGES METADATA */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    {dish.isSignature && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1F16] text-[#D4AF37] border border-[#D4AF37] uppercase text-[9px] tracking-widest font-serif font-bold shadow-md">
                        <Award className="w-3 h-3 text-[#D4AF37]" />
                        <span>Signature</span>
                      </span>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white uppercase text-[8px] tracking-wider rounded-sm font-sans font-light">
                      <Clock className="w-2.5 h-2.5 text-[#C5A059]" />
                      <span>{dish.timeToServe}</span>
                    </span>
                  </div>
                </div>

                {/* DISH BRIEF TEXTS */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-lg md:text-xl font-semibold text-[#122A26] leading-tight">
                        {language === "VI" ? dish.nameVi : dish.nameEn}
                      </h3>
                      {/* Price Badge */}
                      <span className="font-serif text-sm md:text-base text-[#C5A059] font-bold shrink-0 whitespace-nowrap">
                        {dish.price.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    <p className="text-xs text-[#2C1F16]/70 leading-relaxed font-sans font-light line-clamp-3">
                      {language === "VI" ? dish.descriptionVi : dish.descriptionEn}
                    </p>
                  </div>

                  {/* BOTTOM ACTION */}
                  <div className="pt-5 mt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                    <span className="text-[10px] text-[#C5A059] uppercase tracking-[0.2em] font-sans font-medium">
                      Est. {dish.timeToServe}
                    </span>
                    <button
                      onClick={() => setSelectedDish(dish)}
                      className="px-4 py-2 border border-[#D4AF37]/45 text-[#C5A059] hover:bg-[#122A26] hover:text-[#FAF9F6] text-[10px] font-serif uppercase tracking-widest duration-300 transition-all cursor-pointer"
                    >
                      {language === "VI" ? "Xem Điển Tích" : "Tableside Specs"}
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* DETAILED TABLESIDE COUTRE RECIPE DRAWER */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Dark Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />
            
            {/* Sliding Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg h-full bg-[#FAF9F6] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto"
            >
              
              {/* TOP HEADER CONTROLS */}
              <div className="sticky top-0 bg-[#122A26] p-6 border-b border-[#D4AF37]/25 flex items-center justify-between text-[#FAF9F6]">
                <div className="flex items-center gap-3">
                  <div className="p-2 border border-[#D4AF37]/35 rounded bg-[#2C1F16]/50">
                    <Compass className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] block font-semibold font-sans">
                      {language === "VI" ? `STT ${selectedDish.stt} | MỸ VỊ DI SẢN` : `INDEX ${selectedDish.stt} | MAJESTIC SPECS`}
                    </span>
                    <h3 className="font-serif text-lg font-bold tracking-wide uppercase text-white">
                      {language === "VI" ? "ĐIỂN TÍCH MÓN ĂN" : "Tableside Gastronomy"}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDish(null)}
                  className="p-1 px-3 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#122A26] transition-colors rounded-sm text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* DRAWER SCROLL CONTENT */}
              <div className="p-8 space-y-8 flex-1 overflow-y-auto text-[#2C1F16]">
                
                {/* PHOTO STRETCH */}
                <div className="relative aspect-[16/10] w-full border border-[#D4AF37]/20 shadow-md">
                  <img src={selectedDish.image} alt={selectedDish.nameEn} referrerPolicy="no-referrer" className="w-full h-full object-cover filter saturate-75 brightness-90" />
                  {selectedDish.isSignature && (
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1F16] text-[#D4AF37] border border-[#D4AF37] uppercase text-[9px] tracking-widest font-serif font-bold shadow-md">
                      <Award className="w-3 h-3 text-[#D4AF37]" />
                      <span>Signature</span>
                    </div>
                  )}
                </div>

                {/* DISH DUAL NAMES & PRICES */}
                <div className="space-y-2 border-b border-[#D4AF37]/15 pb-6">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#122A26]">
                    {language === "VI" ? selectedDish.nameVi : selectedDish.nameEn}
                  </h2>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs uppercase tracking-[0.1em] text-[#C5A059] font-sans font-semibold">
                      {language === "VI" ? "Mã món: " : "Dish Index: "}STT #{selectedDish.stt}
                    </span>
                    <span className="font-serif text-xl text-[#C5A059] font-bold">
                      {selectedDish.price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>

                {/* SPECIFICATIONS GRID list */}
                <div className="space-y-6">
                  
                  {/* DETAIL 1: THE CULTURE SPIRIT */}
                  {selectedDish.spiritVi && (
                    <div className="space-y-2.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-serif block font-bold">
                        {language === "VI" ? "🏮 Tinh Thần Món Ăn:" : "🏮 Cultural Background:"}
                      </span>
                      <p className="text-sm font-serif italic leading-relaxed text-[#122A26] bg-[#C5A059]/5 border-l border-[#C5A059]/30 p-4">
                        {language === "VI" ? selectedDish.spiritVi : selectedDish.spiritEn}
                      </p>
                    </div>
                  )}

                  {/* DETAIL 2: THE INGREDIENTS COMPONENTS */}
                  {selectedDish.componentsVi && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-serif block font-bold">
                        {language === "VI" ? "🌽 Thành Phần Chính:" : "Components / Ingredients:"}
                      </span>
                      <p className="text-xs font-sans font-light leading-relaxed text-[#2C1F16]/80 text-justify">
                        {language === "VI" ? selectedDish.componentsVi : selectedDish.componentsEn}
                      </p>
                    </div>
                  )}

                  {/* DETAIL 3: ASSOCIATED SIDE SAUCES */}
                  {selectedDish.servedWithVi && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-serif block font-bold">
                        {language === "VI" ? "Sauce & Đồ Ăn Kèm:" : "Served with Side condiments:"}
                      </span>
                      <p className="text-xs font-sans font-light leading-relaxed text-[#2C1F16]/80">
                        {language === "VI" ? selectedDish.servedWithVi : selectedDish.servedWithEn}
                      </p>
                    </div>
                  )}

                  {/* DETAIL 4: CERAMIC PRESENTATION WARE */}
                  {selectedDish.presentationVi && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-serif block font-bold">
                        {language === "VI" ? "🍶 Phương Pháp Bày Trí:" : "Presentation / Dinnerware:"}
                      </span>
                      <p className="text-xs font-sans font-light leading-relaxed text-[#2C1F16]/80 text-justify">
                        {language === "VI" ? selectedDish.presentationVi : selectedDish.presentationEn}
                      </p>
                    </div>
                  )}

                  {/* DETAIL 5: IMPERIAL CUTLERY & FLATWARE */}
                  {selectedDish.cutleryVi && (
                    <div className="space-y-2 flex items-center gap-3 bg-[#2C1F16]/5 p-3.5 border border-[#D4AF37]/15">
                      <Utensils className="w-5 h-5 text-[#C5A059] shrink-0" />
                      <div className="text-xs">
                        <span className="uppercase tracking-wider text-[9px] text-[#C5A059] block font-bold">
                          {language === "VI" ? "Dụng Cụ Bày Biện Riêng:" : "Cutlery Flatware:"}
                        </span>
                        <span className="text-[#2C1F16]/85 font-sans">
                          {language === "VI" ? selectedDish.cutleryVi : selectedDish.cutleryEn}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* ACTION FOOTER */}
              <div className="sticky bottom-0 bg-white p-6 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <div className="flex flex-col text-[#2C1F16]/60 text-[10px] font-sans">
                  <span>Chế biến trực tiếp tại gian bếp NƯỚC</span>
                  <span>Thời gian chờ: {selectedDish.timeToServe}</span>
                </div>
                <button
                  onClick={() => setSelectedDish(null)}
                  className="px-6 py-3 bg-[#122A26] border border-[#D4AF37]/50 text-[#D4AF37] font-serif tracking-widest text-xs uppercase cursor-pointer hover:bg-[#D4AF37] hover:text-[#122A26] duration-300"
                >
                  {language === "VI" ? "Quay lại" : "Back to catalog"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
