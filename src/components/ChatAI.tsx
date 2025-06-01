
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { gptService } from "../lib/ai/gptService";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await gptService.sendSecureMessage(input, 
        "You are a wise spiritual guide helping users explore consciousness and metaphysical topics."
      );

      if (response.success && response.message) {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          text: response.message,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          text: response.error || "Sorry, I couldn't process your request.",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "An error occurred while processing your message.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-96">
      <CardHeader>
        <CardTitle className="text-lg">AI Spiritual Guide</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-80">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <Separator />
        
        <div className="p-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about consciousness, dreams, symbols..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? "..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAI;
