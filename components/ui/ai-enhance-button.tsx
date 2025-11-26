import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "./button";

interface AIEnhanceButtonProps {
  text: string;
  type: "summary" | "experience";
  context?: string;
  onEnhanced: (enhancedText: string) => void;
  disabled?: boolean;
}

export function AIEnhanceButton({
  text,
  type,
  context,
  onEnhanced,
  disabled,
}: AIEnhanceButtonProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    if (!text.trim()) {
      alert("Please enter some text first");
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, type, context }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance text");
      }

      const data = await response.json();
      onEnhanced(data.enhancedText);
    } catch (error) {
      console.error("Enhancement error:", error);
      alert("Failed to enhance text. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleEnhance}
      disabled={disabled || isEnhancing || !text.trim()}
      size="sm"
      variant="ghost"
      className="absolute right-2 top-2 h-8 gap-1.5 text-xs bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border border-purple-200 text-purple-700 disabled:opacity-50"
    >
      {isEnhancing ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Enhancing...
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5" />
          AI Enhance
        </>
      )}
    </Button>
  );
}
