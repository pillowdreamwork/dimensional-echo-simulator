
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { WandSparklesIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getEngineModules } from '../lib/engine';

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface SupportiveAICompanionProps {
  currentDimension: number;
  dimensionalEffects?: string[];
}

const SupportiveAICompanion: React.FC<SupportiveAICompanionProps> = ({
  currentDimension,
  dimensionalEffects = []
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  
  // Get engine modules
  const { mythicAI, siderAI } = getEngineModules();
  
  // Send welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "ai",
          content: "Welcome, seeker. I'm your companion on this dimensional journey. How are you feeling as we explore these realms together?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);
  
  // Suggestions based on current dimension
  const getSuggestions = () => {
    const baseSuggestions = [
      "What does this dimension feel like to you?",
      "I'm confused by something I'm experiencing...",
      "How can I interpret the symbols I'm seeing?",
      "What practices can deepen my experience here?",
      "I need guidance on navigating this dimension"
    ];
    
    // Get suggestions from SiderAI if available
    if (siderAI && typeof siderAI.getSuggestions === 'function') {
      try {
        const aiSuggestions = siderAI.getSuggestions({ dimension: currentDimension });
        return aiSuggestions.length > 0 ? aiSuggestions : baseSuggestions;
      } catch (e) {
        return baseSuggestions;
      }
    }
    
    return baseSuggestions;
  };
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate AI response (or use mythicAI if available)
    setTimeout(() => {
      let response = "";
      
      // Try to use mythicAI if available
      if (mythicAI && typeof mythicAI.interactWithArchetype === 'function') {
        try {
          const interaction = mythicAI.interactWithArchetype("Guide", {
            message: inputMessage,
            dimension: currentDimension
          });
          response = interaction.response || generateFallbackResponse(inputMessage);
        } catch (e) {
          response = generateFallbackResponse(inputMessage);
        }
      } else {
        response = generateFallbackResponse(inputMessage);
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Notification for clarity
      if (response.includes("clarity") || response.includes("understand") || response.includes("insight")) {
        toast({
          title: "Insight Received",
          description: "A new understanding has been integrated into your journey",
          duration: 3000,
        });
      }
    }, 1500);
  };
  
  // Generate a supportive response if the AI module is not available
  const generateFallbackResponse = (message: string) => {
    const responses = [
      "I sense your curiosity about this dimension. Stay present with what arises, and remember there's no right or wrong way to experience these realms.",
      "The symbols and feelings you're experiencing are unique to your journey. Trust your inner wisdom as you navigate these energies.",
      "Your question reflects a deep desire for understanding. Sometimes the answers come not from seeking but from allowing yourself to simply be in the experience.",
      "This is a safe space to explore whatever emerges. The confusion or clarity you feel are both valuable parts of your journey.",
      "I'm here to support you through every dimension you explore. What you're experiencing is perfectly aligned with where you need to be right now."
    ];
    
    const dimensionSpecific = [
      "In this dimension, feelings might be more vivid than thoughts. Allow yourself to feel without needing to analyze everything.",
      "The patterns you're noticing have significance. Your consciousness is recognizing connections that words can't always describe.",
      "Remember to breathe deeply as you navigate this space. Your breath is an anchor that connects all dimensional experiences."
    ];
    
    // Select a random response
    const baseResponses = [...responses, ...dimensionSpecific];
    return baseResponses[Math.floor(Math.random() * baseResponses.length)];
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };
  
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <WandSparklesIcon className="mr-2 text-quantum-teal" size={18} />
            Quantum Guide
          </CardTitle>
          <Badge variant={isTyping ? "default" : "outline"} className={isTyping ? "bg-quantum-teal" : "bg-quantum-teal/20 text-quantum-teal"}>
            {isTyping ? "Responding..." : "Listening"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "ai" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/guide-avatar.png" />
                  <AvatarFallback className="bg-quantum-teal/20 text-quantum-teal">QG</AvatarFallback>
                </Avatar>
              )}
              
              <div 
                className={`max-w-[80%] p-3 rounded-md ${
                  message.role === "user" 
                    ? "bg-quantum-purple/20 text-quantum-purple ml-auto" 
                    : "bg-quantum-teal/20 text-quantum-teal"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {message.role === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarFallback className="bg-quantum-purple/20 text-quantum-purple">ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-quantum-teal/20 text-quantum-teal">QG</AvatarFallback>
              </Avatar>
              <div className="bg-quantum-teal/20 text-quantum-teal p-3 rounded-md">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-quantum-teal animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-quantum-teal animate-pulse delay-150"></div>
                  <div className="h-2 w-2 rounded-full bg-quantum-teal animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {getSuggestions().slice(0, 3).map((suggestion, i) => (
              <Badge 
                key={i}
                variant="outline" 
                className="bg-quantum-teal/10 hover:bg-quantum-teal/20 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Ask for guidance or share your experience..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="bg-quantum-dark/50 border-quantum-teal/30"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-quantum-teal hover:bg-quantum-teal/90"
              disabled={!inputMessage.trim() || isTyping}
            >
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportiveAICompanion;
