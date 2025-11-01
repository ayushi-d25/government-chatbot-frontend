import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 mb-4 animate-fade-in-up">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-message-bot flex items-center justify-center shadow-md">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      
      <div className="bg-gradient-message-bot border border-border rounded-2xl px-4 py-3 shadow-[var(--shadow-message)]">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
