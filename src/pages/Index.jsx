import { useState, useRef, useEffect } from "react";
import { Cloud } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import ThemeToggle from "@/components/ThemeToggle";
import axios from "axios";
import weatherHero from "@/assets/weather-hero.jpg";

const Index = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "Hello! 👋 I'm your Climate and Agricultural Data Insight Assistant. I can provide you with real-time climate and agricultural insights. Ask me anything about weather patterns, crop recommendations, or agricultural data!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        message: userMessage.text,
      });

      const { data } = res;

      let rawAnswer = data?.answer ?? data?.reply ?? data?.response ?? null;

      if (rawAnswer && typeof rawAnswer !== "string") {
        try {
          rawAnswer = JSON.stringify(rawAnswer);
        } catch (e) {
          rawAnswer = String(rawAnswer);
        }
      }

      const cleanAnswer = (text) => {
        if (!text) return "";
        let t = text;
        t = t.replace(/\*\*(.*?)\*\*/gs, "$1");
        t = t.replace(/\*(.*?)\*/gs, "$1");
        t = t.replace(/`+/g, "");
        t = t
          .split("\n")
          .filter((line) => !/^\s*[-*_]{3,}\s*$/.test(line))
          .map((line) => {
            return line.replace(/^\s*([*\-+]\s+|\d+\.\s+)/, "").trimRight();
          })
          .map((line) => line.replace(/^\s*\*\s?/, ""));
        t = t.join("\n").trim();
        return t;
      };

      const response = cleanAnswer(rawAnswer);

      const botMessage = {
        id: `bot-${Date.now()}`,
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("[Index] handleSendMessage error", error);
      setIsTyping(false);
      console.error("Failed to get response. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="relative bg-gradient-sky shadow-[var(--shadow-soft)] overflow-hidden">
        <img
          src={weatherHero}
          alt="Climate and agriculture background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 px-6 py-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-card/90 backdrop-blur-sm p-3 rounded-2xl shadow-md">
              <Cloud className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-card">
                Climate and Agricultural Data Insight Assistant
              </h1>
              <p className="text-sm text-card/80">
                Real-time climate and agricultural insights
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </main>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default Index;
