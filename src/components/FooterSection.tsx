import React from "react";
import { Clock, Phone, Mail, MapPin, Landmark, Instagram, Facebook, Compass } from "lucide-react";
// @ts-ignore
import nuocLogo from "../assets/images/nuoc_logo_1781628170172.jpg";

interface FooterSectionProps {
  language: "VI" | "EN";
  scrollToSection: (id: string) => void;
}

export default function FooterSection({ language, scrollToSection }: FooterSectionProps) {
  return (
    <footer className="bg-[#2C1F16] text-[#FAF9F6]/80 pt-20 pb-12 border-t border-[#D4AF37]/25 relative text-sans font-light">
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute left-6 bottom-6 text-[#D4AF37]/5 text-9xl font-serif select-none pointer-events-none">
        水
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ROW 1: MASTER CARDS LOGO AND DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/15">
          
          {/* LOGO DESCRIPTION CARD (4/12 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-1.5 border border-[#D4AF37]/30 bg-[#122A26] rounded-sm w-10 h-10 flex items-center justify-center">
                <img 
                  src={nuocLogo} 
                  alt="Nước Logo" 
                  className="w-8 h-8 object-contain rounded-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl tracking-widest font-semibold text-[#FAF9F6] uppercase leading-none">
                  NƯỚC
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase mt-1 select-none">
                  RESTAURANT by RuNam
                </p>
              </div>
            </div>
            
            <p className="text-xs text-[#FAF9F6]/70 leading-relaxed text-justify">
              {language === "VI"
                ? "Dẫn lối di sản văn hóa Việt Nam bước vào thế giới mỹ thực Fine Dining cao cấp bằng lối thiết kế lim kiến trúc, koi nước và ẩm thực ba miền sâu lắng tinh hoa được bảo trợ bởi NISO Group."
                : "Escorting Vietnamese cultural values into global fine dining tiers with ancient timbers, watergardens, and mastercraft culinary configurations backed by NISO Group."}
            </p>

            {/* SOCIAL SHARES ICON LINKS */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] transition-all rounded-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] transition-all rounded-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* CONTACT INFO CARD (4/12 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-serif text-[#D4AF37] text-md uppercase font-bold tracking-widest border-b border-[#D4AF37]/15 pb-2.5">
              {language === "VI" ? "Liên Hệ" : "Contacts"}
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong>NƯỚC Reservation Desk:</strong>
                  <p className="text-[#FAF9F6]/70 leading-normal">
                    {language === "VI" ? "659C đường số 10, phường An Khánh, TP.HCM" : "659C Street 10, An Khanh Ward, Ho Chi Minh City, Vietnam"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+84 (0) 28 3744 1600 / 028 3744 1601</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="hover:underline">reservation@nuocrunam.com</span>
              </div>
            </div>
          </div>

          {/* OPERATIONS TIMES CARD (4/12 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-serif text-[#D4AF37] text-md uppercase font-bold tracking-widest border-b border-[#D4AF37]/15 pb-2.5">
              {language === "VI" ? "Giờ Phục Vụ" : "Hours of Operations"}
            </h4>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start gap-3.5">
                <Clock className="w-4.5 h-4.5 text-[#D4AF37] shrink-0 mt-1" />
                <div className="space-y-1">
                  <strong>{language === "VI" ? "Thứ Hai - Chủ Nhật Daily:" : "Monday - Sunday Daily:"}</strong>
                  <p className="text-[#FAF9F6]/75">07:00 AM – 10:30 PM (22:30)</p>
                  <p className="text-[10px] text-[#C5A059]">
                    {language === "VI" ? "*Điểm tâm sáng phục vụ 07:00 AM - 11:00 AM" : "*Traditional Breakfast serves from 07:00 AM to 11:00 AM"}
                  </p>
                  <p className="text-[10px] text-[#C5A059]">
                    {language === "VI" ? "*Giờ nhận gọi món cuối (Last Order): 10:00 PM" : "*Last culinary order taken at 10:00 PM (22:00)"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-[#D4AF37]/15 bg-[#122A26]/20 text-[10px] leading-relaxed text-[#C5A059]">
              {language === "VI"
                ? "“Nước” by RuNam kết hợp hoàn hảo giữa ẩm thực và nghệ cảm. Kiến trúc nhà Lim ngát cỏ và gió sông Thảo Điền."
                : "“Nước” by RuNam captures architectural gold frames and botanical water canals next to Thu Duc river beds."}
            </div>
          </div>

        </div>

        {/* ROW 2: BOTTOM COPYRIGHT AND LICENSE */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#FAF9F6]/45 font-sans">
          <p>© 2026 NƯỚC Restaurant by RuNam. All Rights Reserved. Under license of NISO Group Joint Stock Company.</p>
          <div className="flex gap-6">
            <span>Powered by Gemini Artificial Intelligence</span>
            <span>Made with 🏛️ Heritage Spirit</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
