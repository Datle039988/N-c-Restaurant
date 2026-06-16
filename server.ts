import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dns from "dns";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables for local testing
dotenv.config();

// Ensure dns resolution is IPv4 first to prevent potential localhost resolution bottlenecks
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sockets, SMS & Email simulation logs
const simulatedNotificationsLogs: Array<{
  timestamp: string;
  type: "SMS" | "Email" | "CalendarSync";
  recipient: string;
  subject: string;
  content: string;
}> = [];

// Lazy-initialized Gemini Client
let geminiClientCache: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (geminiClientCache) return geminiClientCache;

  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
    console.warn("⚠️ GEMINI_API_KEY is not configured yet. The AI Assistant will run in simulated concierge mode.");
    return null;
  }

  geminiClientCache = new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
  return geminiClientCache;
}

// ----------------------------------------------------
// Master Context for our AI Concierge
// ----------------------------------------------------
const BRAND_HERITAGE_PROMPT = `
You are the elite "NƯỚC Restaurant AI Concierge" - a highly sophisticated, polite, and welcoming digital guest host of NƯỚC Restaurant by RuNam.
Your voice matches the standard of an ultra-premium French-Indochine Vietnamese fine dining venue.
Your response MUST be conversational, warm, and professional. Keep answers informative but concise.

NƯỚC RESTAURANT SPECIFICATIONS:
- Location: Thảo Điền, Thu Duc City, TP.HCM, situated right next to the river breeze, providing top-class tranquil views.
- Size: 1,600m² luxurious villa estate.
- Architecture:
  * Incorporates a historic, 200-year-old traditional Lim wood timber house disassembled and painstakingly transported and rebuilt from Tràng An (Hà Nội).
  * Spectacular massive Koi ponds, flowering lotus-and-water-lily garden channels.
  * Sleek glass aquariums, solid handcrafted copper bars, custom-carved silk lotus pendant light frames.
- Brand Family: An elite dining experience concept created by RuNam and the master curators of NISO Group.
- Team: Directed by Executive Chef Trần Huy Hoàng (25-year mastery, former head chef at Sofitel Metropole Hanoi) and Creative Director Patricia Mai.
- Dynamic Hospitality: Guest receptionists and tableside hosts welcome patrons in custom gold-plated silk Áo Dài, carrying on regional heritage with modern grace.
- Core Theme: "Luxury Vietnamese Heritage" with 128 traditional and avant-garde Vietnamese dishes and 128 drinks, celebrating the North, Central, and South.

POPULAR MENU SIGNATURES TO ADVISE:
1. Heritage Wagyu Beef Pho (Phở Bò Sườn Sụn) - 345,000₫. 12-hour bone broth slow-cooked to mahogany sweet perfection.
2. Sườn Bò Mỹ Nướng Ngói Vị Phở (Lava-stone Grilled Short-Ribs) - 680,000₫. Prime US rib infused with 9 traditional pho herbs and charred tableside. Chef's greatest masterpiece.
3. Mâm Thuyền Tam Vị Mắm (The Mekong Trio-Mắm Platter) - 365,000₫. Set of steamed organic pork, fermented mudfish paste, and catfish pate served on a restored Lim wood boat.
4. Cá Tuyết Đại Tây Dương Kho Tộ (Claypot Atlantic Cod) - 650,000₫. Flaky coldwater black cod caramelized inside country red-clay pots.
5. Bánh Mì Phở RuNam (295,000₫) - Fusion pairing of artisan sourdough baguette with seared Angus loin strips and condensed pho reduction dipping gravy.
6. Chả Giò Thanh Niên (255,000₫) - Legacy recipe since 1989 stuffed with sweet fresh Ca Mau ocean crab and organic minced pork.
7. Bánh Flan Trứng Lá Dứa Cơm Dừa Non (145,000₫) - Ultra-silky pandan and bird's nest flan served on young coconut meat.

SEATING SPACES:
1. waterside-garden ("Khu Vườn Bên Hồ Sông Sắc"): 100 outdoor seats under trees, koi ponds, and refreshing river wind.
2. floor-1 ("Nhà Gỗ Lim Cổ Tràng An"): 100 grand indoor climate-controlled seats under ancient wooden beams.
3. floor-2 ("VIP Salon & Private Lounge"): 80 seats, includes intimate noise-proof suites for state bank banquets and sunset view balconies.

BOOKING & ASSISTANCE INFORMATION:
- Open Hours: 7:00 AM - 10:30 PM Daily.
- Breakfast is served from 7:00 AM to 11:00 AM.
- If the guest expresses an intention to reserve a table (mentions names, date, number of people), encourage them to use the interactive reservation module on our page. Offer to answer questions about menu allergies, dietary preferences, or private dining rooms.
- Answer in Vietnamese if the guest speaks Vietnamese. Answer in English if the guest speaks English. Speak charmingly, incorporating terms like "Dạ", "NƯỚC Restaurant hân hạnh chào đón quý khách" (for Vietnamese queries).
`;

// ----------------------------------------------------
// Server-Side API Routes
// ----------------------------------------------------

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "alive", brand: "NƯỚC Restaurant by RuNam", timestamp: new Date().toISOString() });
});

// SUBMIT BOOKING
app.post("/api/booking", (req, res) => {
  try {
    const { name, email, phone, date, time, guests, area, notes, language } = req.body;

    // Server-side validation
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        errorVi: "Vui lòng cung cấp đầy đủ thông tin: Tên, Email, Điện thoại, Ngày, Giờ và Số khách.",
        errorEn: "Please fill in all required fields: Name, Email, Phone, Date, Time, and Guest count."
      });
    }

    const guestCount = parseInt(guests, 10);
    if (isNaN(guestCount) || guestCount <= 0) {
      return res.status(400).json({
        success: false,
        errorVi: "Số khách đặt bàn phải là số nguyên dương hợp lệ.",
        errorEn: "Guest count must be a valid positive integer."
      });
    }

    // Generate custom booking reference
    const bookingCode = `NUC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Simulate SMS notification
    const smsContent = language === "VI"
      ? `NUOC Restaurant xac nhan: Quy khach ${name.toUpperCase()} dat ban vao luc ${time} ngay ${date} cho ${guestCount} khach tai khu vuc ${area || "Tuy chon"}. Ma dat ban: ${bookingCode}. Hotline: 028.3744.1600.`
      : `NUOC Restaurant confirms: Guest ${name.toUpperCase()} has reserved a table for ${guestCount} Pax at ${time} on ${date} within our ${area || "Selected area"}. Code: ${bookingCode}. Support: +84 28 3744 1600.`;

    simulatedNotificationsLogs.push({
      timestamp: new Date().toLocaleTimeString(),
      type: "SMS",
      recipient: phone,
      subject: "Instant SMS Confirmation",
      content: smsContent
    });

    // Simulate Email confirmation
    const emailSubject = language === "VI"
      ? `🏛️ Xác nhận Đặt bàn Fine Dining thành công tại NƯỚC Restaurant | Mã đặt bàn: ${bookingCode}`
      : `🏛️ Confirmed: Your Premium Dining Reservation at NƯỚC Restaurant is Secured | Code: ${bookingCode}`;

    const emailContent = language === "VI"
      ? `Kính chào quý khách ${name},\n\nNƯỚC Restaurant by RuNam Thảo Điền chân thành cảm ơn quý khách đã tin chọn di sản của chúng tôi. Chúng tôi hân hạnh xác nhận lịch hẹn ẩm thực của quý vị:\n\n- Mã đặt bàn: ${bookingCode}\n- Ngày hẹn: ${date}\n- Giờ đón khách: ${time}\n- Số khách: ${guestCount} Pax\n- Khu vực ngồi: ${area}\n- Ghi chú riêng: ${notes || "Không có"}\n\n*Nhân viên phục vụ trong trang phục Áo Dài tơ lụa sẽ đón tiếp quý khách tại cổng gỗ Lim Thảo Điền.\n\nMọi yêu cầu sửa đổi, xin vui lòng gọi hotline đặt bàn: 028.3744.1600.\nHân hạnh được hầu tiếp quý vị tại không gian cổ kính bên hồ thủy sinh NƯỚC.`
      : `Dear Patron ${name},\n\nThank you for choosing NƯỚC Restaurant by RuNam in Thảo Điền. We are delighted to confirm your bespoke dining reservation:\n\n- Booking Reference: ${bookingCode}\n- Date: ${date}\n- Arrival Time: ${time}\n- Party Size: ${guestCount} Pax\n- Selected Zone: ${area}\n- Special Requests: ${notes || "None"}\n\n*Our hosts dressed in traditional gold-trimmed silk Ao Dai uniforms will be waiting to escort you under the ancient Lim-Wood timber frames.\n\nShould you find the need to modify your schedule, please call: +84 28 3744 1600.\nWarmest Regards,\nNƯỚC Guest Relations Office.`;

    simulatedNotificationsLogs.push({
      timestamp: new Date().toLocaleTimeString(),
      type: "Email",
      recipient: email,
      subject: emailSubject,
      content: emailContent
    });

    // Simulate Google Calendar Sync
    simulatedNotificationsLogs.push({
      timestamp: new Date().toLocaleTimeString(),
      type: "CalendarSync",
      recipient: email,
      subject: `Sync Calendar Reservation: NƯỚC Restaurant (${bookingCode})`,
      content: `Google Calendar synced event details successfully. Title: "Dinner at NƯỚC Restaurant by RuNam", Time: ${date}T${time}:00, Location: "1600m² Villa Thảo Điền, TP.HCM".`
    });

    // Forward the reservation data to Google Sheets (via user's Google Apps Script Web App)
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzT_7_quoWnpH4wkpcm9RB5hWkkgP85cLkmgyAYtAuMrFCaR-Q_5jqPNeTw1mOYh6fG/exec";
    fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingCode,
        name,
        email,
        phone,
        date,
        time,
        guests: guestCount,
        area: area || "Tùy chọn",
        notes: notes || "",
        dateTime: `${date} ${time}`,
        timestamp: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
      })
    })
      .then((response) => {
        console.log(`[Google Sheets Synced] Sent booking ${bookingCode} to Google Sheets. Status: ${response.status}`);
      })
      .catch((err) => {
        console.error(`[Google Sheets Sync ERROR] Failed to send data to Google Sheets:`, err);
      });

    // Limit log storage size to prevent overflow
    if (simulatedNotificationsLogs.length > 30) {
      simulatedNotificationsLogs.shift();
    }

    return res.status(200).json({
      success: true,
      bookingCode,
      messageVi: `Xác nhận đặt bàn trực tuyến thành công! Hệ thống đã gửi tin nhắn xác nhận tới số điện thoại và email riêng của quý vị.`,
      messageEn: `Bespoke booking confirmed successfully! A secure reservation file and SMS code have been routed to your phone and email.`,
      dispatchLog: {
        smsDispatched: true,
        emailDispatched: true,
        calendarSynced: true,
        code: bookingCode
      }
    });

  } catch (error: any) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      errorVi: "Đã xảy ra sự cố kỹ thuật trên hệ thống đặt bàn. Quý vị vui lòng liên hệ hotline: 028.3744.1600.",
      errorEn: "An unexpected error occurred in our reservations engine. Please contact Support: +84 28 3744 1600."
    });
  }
});

// GET SIMULATION LOGS (Allows users to see live SMS / Email traffic in the mock widget)
app.get("/api/booking/notifications-logs", (req, res) => {
  res.json({ logs: simulatedNotificationsLogs });
});

// GEMINI AI RESERVATION & CULTURAL CONCIERGE ASSISTANT
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userQuery } = req.body;
    if (!userQuery) {
      return res.status(400).json({ reply: "Dạ, NƯỚC Restaurant xin kính chào. Quý khách cần hỏi thông tin gì ạ?" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Mock Concierge engine to keep app stellar when API key is missing
      const queryLower = userQuery.toLowerCase();
      let responseText = "";

      if (queryLower.includes("đặt bàn") || queryLower.includes("book") || queryLower.includes("reserve") || queryLower.includes("bàn")) {
        responseText = `Dạ, để đặt bàn trực tuyến nhanh nhất tại NƯỚC Restaurant, quý khách có thể kéo xuống **Mục Đặt Bàn Hệ Thống trực quan** bên dưới. Hệ thống cho phép chọn ghế, khu vực Waterside Garden lộng gió hay Nhà Gỗ Lim tinh tế 200 năm tuổi và đồng bộ lịch Google hẹn rất tiện lợi ạ. Quý khách muốn em giải đáp thêm về thực đơn hay không gian không ạ?`;
      } else if (queryLower.includes("phở") || queryLower.includes("pho")) {
        responseText = `Dạ, tại NƯỚC có món **Phở Bò Sườn Sụn Sốt Phở nướng ngói độc quyền** (680.000đ) hầm nước cốt 12 tiếng cực kỳ đậm vị và món phở đuôi sườn hầm mềm tan sâu lắng. Ngoài ra, tinh hoa sáng còn có **Bánh Mì Phở RuNam** giao thoa giòn rụm chấm nước sốt sệt óng ánh (295.000đ) rất được ưa chuộng khách Nhật Bản dùng ạ.`;
      } else if (queryLower.includes("món chính") || queryLower.includes("menu") || queryLower.includes("thực đơn") || queryLower.includes("ăn gì")) {
        responseText = `Dạ, thực đơn của NƯỚC có 122 món ăn tinh hoa ba miền. Em gợi ý quý khách dùng thử 3 món Signature đỉnh cao nhất:
- **Ngói Sườn Bò Mỹ Vị Phở Sài Gòn** (680.000₫);
- **Cua Cà Mau Sốt Me Rừng Đất Đỏ** (580.000₫) chua ngọt kích thích;
- **Cá Tuyết Đen Kho Tộ truyền thống** (650.000₫) béo ngọt bùi ngậy tan trong miệng. Quý khách có thể xem toàn bộ menu HD ở trang thực đơn ngay trên này ạ!`;
      } else if (queryLower.includes("không gian") || queryLower.includes("địa chỉ") || queryLower.includes("ở đâu") || queryLower.includes("address") || queryLower.includes("space")) {
        responseText = `Dạ, NƯỚC Restaurant hân hạnh tọa lạc tại bán đảo xanh **Thảo Điền, Thuận Đức, TP.HCM**. Không gian rộng lớn 1.600m² của chúng tôi sở hữu Gian Nhà Gỗ Lim Cổ Tràng An hơn 200 tuổi lộng lẫy và hồ Koi ngọc, rặng tre mát rượi đón gió sông. Quý khách muốn trải nghiệm ngồi ngoài trời mát gió hay phòng VIP cách âm mát rượu trầm ấm ạ?`;
      } else {
        responseText = `Dạ, em là Trợ lý Ảo NƯỚC Concierge hân hạnh được hỗ trợ. (Hệ thống hiện đang chạy Chế độ Mô phỏng Giao tiếp Doanh Nghiệp). Nhà hàng gỗ lim cổ 1600m² Thảo Điền mở cửa từ 7h00 sáng đến 22h00 tối đón tiếp gia đình và tiệc đối tác ạ. Quý khách có thể hỏi em bất kỳ món ăn nào trong 122 món hay không gian ngồi ạ.`;
      }

      return res.json({ reply: responseText, simulates: true });
    }

    // Format chat history for generateContent
    const queryHistoryPrompt = messages || [];
    const formattedContents = [
      { role: "user", parts: [{ text: BRAND_HERITAGE_PROMPT }] },
      ...queryHistoryPrompt.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
      { role: "user", parts: [{ text: userQuery }] }
    ];

    const modelResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        temperature: 0.7,
        topP: 0.95,
        systemInstruction: BRAND_HERITAGE_PROMPT
      }
    });

    const reply = modelResponse.text || "Dạ, NƯỚC xin hân hạnh được ghi nhận ý kiến quý khách.";
    return res.json({ reply, simulates: false });

  } catch (error: any) {
    console.error("Gemini assistant error:", error);
    res.status(500).json({
      reply: "Dạ, dường như có ngắt quãng sương muối nhỏ trong đường truyền kết nối AI. Nhưng NƯỚC Restaurant vẫn mở cửa đón khách liên tục. Quý khách vui lòng điền thông tin đặt bàn ngay biểu mẫu bên cạnh để chúng em dọn bàn sẵn nhé ạ!"
    });
  }
});

// ----------------------------------------------------
// Start Full-Stack Server or Hot-Middleware
// ----------------------------------------------------
async function startServer() {
  // Mount Vite middleware for hot loading assets in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Mount Vite asset handling middleware
    app.use(vite.middlewares);
  } else {
    // Serve static files inside bundled dist in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=============================================================`);
    console.log(`🏛️ NƯỚC RESTAURANT FULL-STACK SERVER BOOTED`);
    console.log(`🏛️ Live preview url: http://localhost:${PORT}`);
    console.log(`🏛️ Core service bound safely to host 0.0.0.0 and port ${PORT}`);
    console.log(`=============================================================`);
  });
}

startServer();
