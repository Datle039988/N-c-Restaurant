import React from "react";
import { Sparkles, Calendar, GlassWater, Landmark } from "lucide-react";
import { motion } from "motion/react";

interface EventsSectionProps {
  language: "VI" | "EN";
  scrollToSection: (id: string) => void;
}

export default function EventsSection({ language, scrollToSection }: EventsSectionProps) {
  const events = [
    {
      icon: <Landmark className="w-6 h-6 text-[#D4AF37]" />,
      titleVi: "Tiệc Doanh Nghiệp Cao Cấp",
      titleEn: "Bespoke Corporate Banquets",
      descVi: "Phòng VIP kín đáo cách âm tột bậc, hỗ trợ máy chiếu, bàn tròn lớn đục tay và danh mục rượu vang Opus One thượng thặng đãi khách.",
      descEn: "Discrete acoustic VIP suites equipped with round Lim-wood tables and selective premium vintage lineups, perfect for VIP diplomat dinners.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      titleVi: "Hôn Lễ Di Sản Truyền Thống",
      titleEn: "Imperial Heritage Weddings",
      descVi: "Không gian tiệc cưới tối giản mà uy nghiêm bên bờ hồ nước lộng gió dệt lá sen non, đón tiếp lên tới 280 khách dâng hiến vẹn nguyên.",
      descEn: "A cinematic waterside set cushioned under drapes of fresh lotus blooms, capturing the eternal romantic soul of Vietnamese ceremonies."
    },
    {
      icon: <GlassWater className="w-6 h-6 text-[#D4AF37]" />,
      titleVi: "Dạ Tiệc Kỷ Niệm Độc Bản",
      titleEn: "Anniversaries & Curated Salons",
      descVi: "Xếp đặt dải hoa tươi, nến ấm, kết hợp trình diễn nhạc Việt truyền thống (đơn ca tài tử, đàn bầu thỉu sĩ) theo yêu cầu riêng lẻ.",
      descEn: "Warm candlelight ambiance coupled with private acoustic live ensembles of traditional Vietnamese instruments (Dan Bau, Dan Tranh) on request."
    }
  ];

  return (
    <section id="events" className="py-24 bg-[#FAF9F6] text-[#2C1F16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase block mb-3 font-semibold font-sans">
            {language === "VI" ? "DẠ YẾN DI SẢN" : "EXCLUSIVE CELEBRATIONS"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 font-medium text-[#2C1F16]">
            {language === "VI" ? "Trải Nghiệm Dạ Tiệc Riêng Tư" : "Private Dining & Events"}
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto" />
        </div>

        {/* 3 PANEL LUXURY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white border border-[#D4AF37]/15 p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative rounded-sm"
            >
              {/* Gold floral decorative crest */}
              <div className="absolute top-4 right-4 text-[#D4AF37]/30 select-none font-serif text-2xl">
                ✦
              </div>

              <div className="space-y-6">
                <div className="inline-block p-3.5 bg-[#122A26]/5 rounded-sm border border-[#D4AF37]/20 text-[#D4AF37]">
                  {evt.icon}
                </div>
                
                <h3 className="font-serif text-xl text-[#122A26] font-semibold leading-tight">
                  {language === "VI" ? evt.titleVi : evt.titleEn}
                </h3>
                
                <p className="text-xs text-[#2C1F16]/75 leading-relaxed font-sans font-light text-justify">
                  {language === "VI" ? evt.descVi : evt.descEn}
                </p>
              </div>

              <div className="pt-8 mt-4 border-t border-[#D4AF37]/10 flex items-center justify-between">
                <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">
                  {language === "VI" ? "• Cấu trúc độc bản" : "• Tailor-made"}
                </span>
                <button
                  onClick={() => scrollToSection("reservation")}
                  className="text-xs text-[#D4AF37] hover:underline font-serif tracking-widest uppercase font-bold cursor-pointer"
                >
                  {language === "VI" ? "Gởi Yêu Cầu" : "Send Inquiry"}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* BANQUET HIGHLIGHT SUMMARY SECTION */}
        <div className="mt-16 bg-[#122A26] text-[#FAF9F6] p-8 md:p-12 border border-[#D4AF37]/30 rounded-none flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h3 className="font-serif text-2xl text-[#D4AF37] font-medium leading-none">
              {language === "VI" ? "Dành Cho Sự Kiện Lớn & Bao Trọn Biệt Thự?" : "Bespoke Grand Corporate buyouts?"}
            </h3>
            <p className="text-xs text-[#FAF9F6]/80 leading-relaxed font-sans font-light">
              {language === "VI"
                ? "NƯỚC Restaurant cung cấp dịch vụ bao trọn gói toàn bộ biệt thự sân vườn cổ kính 1.600m² chứa tới 280 khách, cung cấp đầu bếp phục vụ riêng tư dâng hiến và trình diễn đàn bầu cổ cầm lãng mạn vô song."
                : "Secure exclusive reservation of our entire 1,600m² heritage estate for high diplomacy banquets, accommodating up to 280 VIP patrons with custom menu mapping."}
            </p>
          </div>
          <button
            onClick={() => scrollToSection("reservation")}
            className="px-8 py-4 bg-[#D4AF37] hover:bg-[#FAF9F6] text-[#2C1F16] hover:text-[#122A26] transition-all font-serif tracking-[0.2em] uppercase text-xs font-bold whitespace-nowrap cursor-pointer shadow-lg"
          >
            {language === "VI" ? "LIÊN HỆ QUẢN LÝ TIỆC" : "ACQUIRE QUOTE"}
          </button>
        </div>

      </div>
    </section>
  );
}
