
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent } from './ui/card';
import { useToast } from '../hooks/use-toast';
import { getModule } from '../lib/engine';

// Message type
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SiderAIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: 'Welcome to Sider AI. How can I assist with your dimensional exploration today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Get the SiderAI module
  const siderAI = getModule('siderAI');
  const pillowDreamwork = getModule('pillowDreamwork');
  const simulationCore = getModule('simulationCore');
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Get current context for better AI responses
      const context = {
        dimension: simulationCore?.getCurrentState()?.dimensions?.current || 1,
        dreamState: pillowDreamwork?.getDreamState() || { inDream: false },
        timestamp: new Date().toISOString()
      };
      
      // Update siderAI context
      siderAI?.updateContext(context);
      
      // Get suggestions based on user input and context
      const suggestions = siderAI?.getSuggestions({
        ...context,
        userInput: input
      }) || [];
      
      // Process response with delay to feel more natural
      setTimeout(() => {
        // Get a random suggestion or fallback response
        const aiResponse = suggestions.length > 0 
          ? suggestions[Math.floor(Math.random() * suggestions.length)]
          : "I'm processing that through the dimensional fields. Could you elaborate further?";
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsProcessing(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error processing message:", error);
      toast({
        title: "Communication Error",
        description: "There was a problem connecting to the AI across dimensions.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <Card className="flex flex-col h-80 bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-2 gap-2">
          <Bot className="h-5 w-5 text-quantum-gold" />
          <h3 className="text-quantum-gold text-sm font-medium">Sider AI Assistant</h3>
        </div>
        
        {/* Messages area */}
        <ScrollArea className="flex-grow mb-3 pr-2">
          <div className="space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm 
                    ${message.sender === 'user' 
                    ? 'bg-quantum-purple/30 text-quantum-purple' 
                    : 'bg-quantum-gold/20 text-quantum-gold'}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
        </ScrollArea>
        
        {/* Input area */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask Sider AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="bg-quantum-dark/60 border-quantum-blue/30 focus-visible:ring-quantum-gold text-foreground"
          />
          <Button
            size="icon"
            variant="outline" 
            onClick={handleSendMessage}
            disabled={isProcessing || !input.trim()}
            className="border-quantum-blue/30 text-quantum-gold hover:bg-quantum-gold/20"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiderAIChatbot;
