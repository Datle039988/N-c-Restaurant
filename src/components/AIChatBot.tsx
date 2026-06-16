import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Loader2, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIChatBotProps {
  language: "VI" | "EN";
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIChatBot({ language }: AIChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: language === "VI" 
        ? "Dạ, NƯỚC Restaurant xin kính chào quý khách. Em là Trợ lý Ảo Concierge của nhà hàng. Quý khách cần em giải đáp gì về 122 món ăn tinh hoa hay đặt bàn hôm nay không ạ?"
        : "Warmest welcome to NƯỚC Restaurant by RuNam. I am your AI Heritage Concierge. May I guide you through our 122 masterpiece dishes or assist with table reservations today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Synchronize introductory message with language setting
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: language === "VI" 
          ? "Dạ, NƯỚC Restaurant xin kính chào quý khách. Em là Trợ lý Ảo Concierge của nhà hàng. Quý khách cần em giải đáp gì về 122 món ăn tinh hoa hay đặt bàn hôm nay không ạ?"
          : "Warmest welcome to NƯỚC Restaurant by RuNam. I am your AI Heritage Concierge. May I guide you through our 122 masterpiece dishes or assist with table reservations today?"
      }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal("");
    
    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.slice(-5), // pass recent history context,
          userQuery: userText
        })
      });

      if (!response.ok) throw new Error("API call error");

      const resJson = await response.json();
      setIsLoading(false);
      
      // Append bot response
      setMessages((prev) => [...prev, { sender: "bot", text: resJson.reply }]);

    } catch (err) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev, 
        { 
          sender: "bot", 
          text: language === "VI" 
            ? "Dạ, dường như có ngắt quãng nhỏ trong đường truyền kết nối AI. Nhưng NƯỚC Restaurant vẫn mở cửa đón khách liên tục. Quý khách hãy gởi đơn đặt bàn trực tiếp bên dưới nhé ạ!" 
            : "Apologies, it seems a temporary connection glitch has occurred. However, our main reservation desk is active online—please utilize the checkout form below." 
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-sans font-light">
      
      {/* TRIGGER FLOATING BUBBLE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-[#C5A059] hover:bg-[#D4AF37] border-2 border-[#122A26] rounded-full flex items-center justify-center text-[#2C1F16] cursor-pointer shadow-2xl transition-all duration-300 relative group"
          >
            {/* Pulsing indicator */}
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#122A26] opacity-75"></span>
              <span className="relative inline-flex rounded-full px-1 h-4 min-w-[16px] bg-[#122A26] text-[6.5px] text-[#D4AF37] font-bold items-center justify-center font-sans tracking-wider">NƯỚC</span>
            </span>

            <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLY PANEL ASSISTANT CONTAINER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="w-80 sm:w-96 h-[510px] bg-[#FAF9F6] border-2 border-[#D4AF37] shadow-2xl flex flex-col justify-between overflow-hidden rounded-xs text-[#2C1F16]"
          >
            
            {/* ASSISTANT CARD HEADER */}
            <div className="bg-[#122A26] p-4.5 border-b border-[#D4AF37]/35 flex items-center justify-between text-[#FAF9F6]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#C5A059]/10 border border-[#D4AF37] p-1.5 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#C5A059] block font-bold font-sans">
                    NƯỚC HERITAGE CO-PILOT
                  </span>
                  <p className="font-serif text-sm font-semibold tracking-wider text-white">
                    {language === "VI" ? "Trợ Lý Ảo Concierge" : "AI Dining Concierge"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#C5A059] hover:text-[#FAF9F6] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-sm transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CHAT LOG SCREEN */}
            <div className="flex-1 bg-[#122A26]/5 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#D4AF37]/25">
              {messages.map((msg, index) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    {isBot && (
                      <div className="w-6 h-6 rounded-full bg-[#122A26] border border-[#D4AF37] p-1 text-[8px] text-[#D4AF37] font-semibold text-center leading-tight mt-0.5 shrink-0 select-none">
                        水
                      </div>
                    )}
                    
                    <div className={`p-3 text-[12px] leading-relaxed max-w-[80%] rounded-xs ${
                      isBot 
                        ? "bg-white text-[#2C1F16] border border-[#D4AF37]/15 rounded-tl-none font-sans" 
                        : "bg-[#D4AF37] text-[#2C1F16] font-semibold rounded-tr-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#122A26] border border-[#D4AF37] p-1 text-[8px] text-[#D4AF37] font-semibold text-center leading-tight mt-0.5 shrink-0 select-none animate-spin">
                    水
                  </div>
                  <div className="p-3 text-xs bg-white text-[#2C1F16]/50 border border-[#D4AF37]/15 rounded-xs rounded-tl-none flex items-center gap-1.5 italic font-sans">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A059]" />
                    <span>NƯỚC is composing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* BOT ATRIBUTES LABELS */}
            <div className="px-4 py-2 border-t border-[#D4AF37]/15 bg-white text-[9px] text-[#C5A059] flex items-center gap-1 justify-center select-none font-serif">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Conducted securely on server-side via gemini-3.5-flash AI</span>
            </div>

            {/* USER RE INPUT CONTAINER */}
            <form onSubmit={handleSendMessage} className="bg-white p-3.5 border-t border-[#D4AF37]/25 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={language === "VI" ? "Hỏi về món ăn, địa chỉ, đặt bàn..." : "Ask recipe details, times, seats..."}
                className="flex-1 bg-[#122A26]/5 rounded-none py-2 px-3 focus:outline-none border-b border-[#D4AF37]/25 focus:border-[#D4AF37] text-xs font-sans text-[#2C1F16]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="p-2.5 bg-[#122A26] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#122A26] disabled:opacity-40 transition-colors cursor-pointer rounded-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
