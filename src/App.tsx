/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import AboutSpaces from "./components/AboutSpaces";
import MenuSection from "./components/MenuSection";
import ReservationSection from "./components/ReservationSection";
import EventsSection from "./components/EventsSection";
import AIChatBot from "./components/AIChatBot";
import FooterSection from "./components/FooterSection";
import { Star, MessageSquare } from "lucide-react";
import { CLIENT_REVIEWS } from "./data/restaurantData";
import { motion } from "motion/react";

export default function App() {
  const [language, setLanguage] = useState<"VI" | "EN">("VI");
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll handler to track currently view section index
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "spaces", "menu", "reservation", "events"];
      const scrollPosition = window.scrollY + 200; // offset for nav header height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C1F16] font-sans antialiased selection:bg-[#D4AF37]/35 selection:text-[#2C1F16]">
      
      {/* LUXURY NAVIGATION HEADER */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* THE CINEMATIC HERO SLIDESHOW */}
      <Hero language={language} scrollToSection={scrollToSection} />

      {/* POETIC CONSERVATION & HISTORIC LANDMARKS STORY */}
      <About language={language} />

      {/* THE 1.600m² ESTATE SEATING AREAS PREVIEW */}
      <AboutSpaces language={language} scrollToSection={scrollToSection} />

      {/* INTERACTIVE GASTRONOMY EXPLORER (122 DELICACIES CATALOG) */}
      <MenuSection language={language} />

      {/* REAL-TIME RESERVATION SYSTEM (FLOOR SEATS SELECTOR & TELEMETRY DISPATCH LOGS) */}
      <ReservationSection language={language} />

      {/* BANQUET PLANNING & GROUP DINING CONFIGURATIONS */}
      <EventsSection language={language} scrollToSection={scrollToSection} />

      {/* CURATED CRITICS & PLATFORM DEVIEWS (TripAdvisor, Google Reviews) */}
      <section className="py-24 bg-[#122A26] text-white border-y border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase block mb-3 font-semibold">
              {language === "VI" ? "Ý KIẾN KHÁCH QUÝ" : "GUEST SYMPOSIUMS"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 font-medium text-white">
              {language === "VI" ? "Dư Âm Khách Thưởng Thức" : "Curated Guest Feedback"}
            </h2>
            <div className="w-16 h-[1.5px] bg-[#D4AF37]/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CLIENT_REVIEWS.map((rev) => (
              <div 
                key={rev.id}
                className="bg-[#2C1F16]/55 border border-[#D4AF37]/15 p-8 flex flex-col justify-between rounded-sm shadow-xl"
              >
                <div className="space-y-4">
                  {/* Rating stars and platform */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A059] font-sans">
                      {rev.source}
                    </span>
                  </div>

                  {rev.title && (
                    <h4 className="font-serif text-md font-bold text-[#FAF9F6]">
                      "{rev.title}"
                    </h4>
                  )}

                  <p className="text-xs text-[#FAF9F6]/80 leading-relaxed font-sans font-light italic">
                    {language === "VI" ? rev.commentVi : rev.commentEn}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D4AF37]/10 flex items-center justify-between text-[11px] text-[#C5A059]">
                  <strong className="font-serif font-bold text-white">
                    {rev.author}
                  </strong>
                  <span>{rev.date}</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FLOATING COLLAPSIBLE CHATBOT CONCIERGE ASSISTANT */}
      <AIChatBot language={language} />

      {/* EXHAUSTIVE FOOTER (Contacts, Maps coordinates, and copyrights cards) */}
      <FooterSection language={language} scrollToSection={scrollToSection} />

    </div>
  );
}
