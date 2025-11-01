import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-fade-in-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-message-bot flex items-center justify-center shadow-md">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-[var(--shadow-message)] transition-all duration-300 hover:shadow-lg",
          isUser
            ? "bg-gradient-message-user text-primary-foreground"
            : "bg-gradient-message-bot text-foreground border border-border"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message}</p>
        {timestamp && (
          <span className={cn(
            "text-xs mt-1 block opacity-70",
            isUser ? "text-primary-foreground" : "text-muted-foreground"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-message-user flex items-center justify-center shadow-md">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
