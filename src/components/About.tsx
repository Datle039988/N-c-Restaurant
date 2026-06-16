import React from "react";
import { Landmark, Compass, Award, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import aboutImage1 from "../assets/images/regenerated_image_1781627931889.png";
// @ts-ignore
import aboutImage2 from "../assets/images/regenerated_image_1781627935679.png";

interface AboutProps {
  language: "VI" | "EN";
}

export default function About({ language }: AboutProps) {
  const points = [
    {
      icon: <Landmark className="w-6 h-6 text-[#D4AF37]" />,
      titleVi: "Nhà Cổ 200 Năm Tuổi",
      titleEn: "200-Year-Old Timber Architecture",
      descVi: "Khung nhà gỗ Lim nguyên bản được phục dựng hoàn hảo từ di sản Tràng An cổ kính.",
      descEn: "Authentic pre-industrial ironwood columns preserved and transported intact from ancient Hanoi."
    },
    {
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      titleVi: "Mỹ Vị Ba Miền Tinh Hoa",
      titleEn: "Masterful Gastronomy",
      descVi: "128 món ăn kết hợp tinh vị Bắc - Trung - Nam đạt tiêu chuẩn Fine Dining quốc tế.",
      descEn: "128 signature dishes celebrating structural complexity and regional recipes."
    },
    {
      icon: <Compass className="w-6 h-6 text-[#D4AF37]" />,
      titleVi: "Vị Trí Bên Bờ Sông Xanh",
      titleEn: "Thao Dien Oasis",
      descVi: "Tọa lạc giữa khuôn viên sầm uất 1,600m² bao quanh bởi sông lộng gió Thảo Điền.",
      descEn: "An sweeping 1,600m² coastal villa oasis wrapped in tranquil river breeze and central lily ponds."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />,
      titleVi: "Dịch Vụ Chân Thành Quý Phái",
      titleEn: "Sincere Hospitality",
      descVi: "Tableside hosts mặc áo dài thắt nơ nhã nhặn, tận hiến di sản với tất cả chân thành tột bực.",
      descEn: "Hosts in elegant silk Ao Dai uniforms deliver legendary care with pure mindfulness."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#FAF9F6] text-[#2C1F16] relative overflow-hidden">
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#122A26]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-72 h-72 bg-[#C5A059]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ROW 1: HEADER DESCRIPTION */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase block mb-3 font-semibold font-sans">
            {language === "VI" ? "CÂU CHUYỆN THƯƠNG HIỆU" : "THE SPIRIT & HERITAGE"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#2C1F16] mb-8 font-medium">
            {language === "VI" ? "Ý Nghĩa Tên Độc Bản: NƯỚC" : "The Dual Dimensions of NƯỚC"}
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-8" />
          <p className="font-serif italic text-lg text-[#2C1F16]/80 leading-relaxed font-light mb-6">
            {language === "VI"
              ? "Trong tâm thức tiếng Việt, 'Nước' mang hai tầng nghĩa thiêng liêng nhất: là Nguồn Nước - khởi thủy của vạn sự sống và của chén nước lèo hầm xương tinh túy; và cũng là Đất Nước - giang sơn gấm vóc ngàn năm văn hiến."
              : "In the depth of our native tongue, 'Nước' is a majestic homonym. It defines Water—the biological source of life and the soul of our 12-hour simmered broths; and it signifies the State or Nation—our ancestral lands of dynamic civilizations."}
          </p>
        </div>

        {/* ROW 2: BENTO STYLE CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* LEFT COLUMN: POETIC BRAND TEXT SUMMARY */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl text-[#122A26] font-medium leading-snug">
              {language === "VI" 
                ? "Thương Hiệu Thuộc Hệ Sinh Thái Cao Cấp RuNam / NISO Group"
                : "Curated by the Artisans of RuNam & NISO Group"}
            </h3>
            <p className="text-sm text-[#2C1F16]/75 leading-relaxed font-sans font-light">
              {language === "VI"
                ? "NƯỚC Restaurant không đơn thuần là một cơ sở ẩm thực sang trọng. Được bảo trợ và định hướng nghệ thuật bởi RuNam, nhà hàng là cuộc hành trình dựng xây một bảo tàng đương đại sống động, nơi nét thô ráp trầm mặc của gỗ cũ nghìn năm đối thoại chan hòa cùng rặng dương xỉ và sỏi đá lấp lánh."
                : "NƯỚC is more than an upscale dining outlet. Artistically directed by the visionary designers of RuNam, the estate is an active culinary gallery where ancient timber frames, custom bronze structures, and lush tropical flora engage in silent harmony."}
            </p>
            <p className="text-sm text-[#2C1F16]/75 leading-relaxed font-sans font-light">
              {language === "VI"
                ? "Bước chân qua phiến đá bước thềm cổ kính, quý vị lập tức được tách rời khỏi dòng chảy xô bồ của nhịp sống hiện đại Sài Gòn, để đắm mình vào tơ lụa nhã nhặn, để ngắm dòng nước vây quanh và thấu những giá trị sâu lắng nhất từ ẩm thực fine dining Việt Nam ba miền."
                : "The moment you cross our rustic stone-stepped entrance under Thảo Điền's blue sky, you are detached from modern urban noise, immediately immersed in flowing silk, water lilies, and the comforting aroma of hand-smoked Vietnamese culinary rituals."}
            </p>

            <div className="pt-4">
              <div className="border-l-2 border-[#D4AF37] pl-4 italic text-sm text-[#C5A059] font-serif">
                {language === "VI"
                  ? "“Nước lèo sủi tăm tắp, gạch cua sông vàng óng ánh, dải lụa sồi óng ả dệt nên bức tranh ẩm thực kiệt tác.”"
                  : "“Simmering bone broths, gold river crab paste, and long silk sashes weave an unforgettable tapestry.”"}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MAJESTIC HIGHLIGHTS GRAPHIC DISPLAY */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-8">
              {/* IMAGE BRICK 1 */}
              <div className="h-64 rounded-sm overflow-hidden border border-[#D4AF37]/20 shadow-md">
                <img 
                  src={aboutImage1} 
                  alt="Ancient Wood" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* CARD BRICK 1 */}
              <div className="bg-white p-6 border border-[#D4AF37]/15 shadow-sm rounded-sm">
                <Landmark className="w-8 h-8 text-[#C5A059] mb-4" />
                <h4 className="font-serif text-lg text-[#122A26] font-medium mb-2">
                  {language === "VI" ? "Dựng Lại Giữa Thảo Điền" : "Restored Lim Wood frames"}
                </h4>
                <p className="text-xs text-[#2C1F16]/70 leading-relaxed font-sans font-light">
                  {language === "VI"
                    ? "Ngôi nhà gỗ lim 200 tuổi được tháo lắp nguyên dải sồi nẹp, vận chuyển từ miền Bắc, thiết lập rường cột sừng sững bên hồ sen Thảo Điền."
                    : "The structure was painstakingly relocated from ancient royal delta lands, creating a highly cinematic interior ambiance."}
                </p>
              </div>
            </div>

            <div className="space-y-8 pt-0 sm:pt-12">
              {/* CARD BRICK 2 */}
              <div className="bg-white p-6 border border-[#D4AF37]/15 shadow-sm rounded-sm">
                <Compass className="w-8 h-8 text-[#C5A059] mb-4" />
                <h4 className="font-serif text-lg text-[#122A26] font-medium mb-2">
                  {language === "VI" ? "Thủy Sinh & Trầm Hương" : "Waterways & Tranquil Zen"}
                </h4>
                <p className="text-xs text-[#2C1F16]/70 leading-relaxed font-sans font-light">
                  {language === "VI"
                    ? "Hồ nước, cá thủy sinh sủi bọt ngọc và dải tinh dầu trầm quế mộc mạc dịu mắt, lập tức rũ bỏ những mệt mỏi phố thị."
                    : "Sensation of bubble streams, giant koi pools and organic cedarwood oils immediately soothe your senses."}
                </p>
              </div>
              {/* IMAGE BRICK 2 */}
              <div className="h-64 rounded-sm overflow-hidden border border-[#D4AF37]/20 shadow-md">
                <img 
                  src={aboutImage2} 
                  alt="Fine Culinary" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ROW 3: FOUR HIGHLIGHT POINTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#D4AF37]/25 pt-16">
          {points.map((point, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="space-y-4"
            >
              <div className="inline-block p-3 bg-[#122A26]/5 rounded-sm border border-[#D4AF37]/20">
                {point.icon}
              </div>
              <h4 className="font-serif text-lg text-[#122A26] font-semibold">
                {language === "VI" ? point.titleVi : point.titleEn}
              </h4>
              <p className="text-xs text-[#2C1F16]/70 leading-relaxed font-sans font-light">
                {language === "VI" ? point.descVi : point.descEn}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
