import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center p-4 bg-card border-t border-border shadow-[var(--shadow-soft)]"
    >
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about climate and agriculture..."
        disabled={disabled}
        className={cn(
          "flex-1 rounded-full bg-secondary border-border focus:ring-2 focus:ring-primary transition-all",
          "placeholder:text-muted-foreground"
        )}
      />
      <Button
        type="submit"
        disabled={disabled || !inputValue.trim()}
        size="icon"
        className="rounded-full bg-gradient-message-user hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
