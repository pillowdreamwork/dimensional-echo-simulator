import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getEngineModules } from '../lib/engine';
import { analyzeSymbolPattern } from '../utils/quantum';
import { askGPT, streamGPT } from '../lib/ai/gptService';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const ChatAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { siderAI } = getEngineModules();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [streamed, setStreamed] = useState('');

  // Add initial greeting
  useEffect(() => {
    const initialMessage = {
      id: 'initial',
      text: "Welcome to SiderAI. I can assist with dimensional navigation, dream interpretation, and quantum field manipulation. How can I help your journey today?",
      sender: 'ai' as const,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      setTimeout(() => {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }, 100);
    }
  }, [messages]);
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsThinking(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setStreamed('');
    
    // Use streaming for real-time feedback
    let aiResponse = '';
    for await (const chunk of streamGPT(input)) {
      aiResponse += chunk;
      setStreamed(aiResponse);
    }
    
    setMessages(msgs => [...msgs, { role: 'assistant', content: aiResponse }]);
    setIsThinking(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card className="chat-ai bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-quantum-blue">SiderAI Assistant</CardTitle>
          <Badge variant="outline" className="bg-quantum-blue/20 text-quantum-blue">
            {isThinking ? "Thinking..." : "Online"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-quantum-purple/30 text-white' 
                      : 'bg-quantum-blue/30 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-quantum-blue/20 rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-quantum-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-quantum-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-quantum-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask SiderAI about dimensions, symbols, or rituals..."
            disabled={isThinking}
            className="flex-grow"
          />
          <Button 
            onClick={sendMessage} 
            disabled={isThinking || !input.trim()}
            className="bg-quantum-blue hover:bg-quantum-blue/80"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAI;
