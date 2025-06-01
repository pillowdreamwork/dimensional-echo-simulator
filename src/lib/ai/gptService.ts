
import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GPTResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Secure GPT service using Supabase Edge Functions
export class GPTService {
  private static instance: GPTService;
  
  private constructor() {}
  
  static getInstance(): GPTService {
    if (!GPTService.instance) {
      GPTService.instance = new GPTService();
    }
    return GPTService.instance;
  }

  async sendMessage(messages: ChatMessage[]): Promise<GPTResponse> {
    try {
      // Use Supabase Edge Function for secure API key management
      const { data, error } = await supabase.functions.invoke('chat-gpt', {
        body: { messages }
      });

      if (error) {
        console.error('GPT Service Error:', error);
        return {
          success: false,
          error: 'Failed to communicate with AI service. Please check your connection.'
        };
      }

      return {
        success: true,
        message: data?.message || 'No response received'
      };
    } catch (error) {
      console.error('Unexpected error in GPT service:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  // Validate and sanitize user input
  private sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .substring(0, 4000); // Limit length
  }

  async sendSecureMessage(userInput: string, context?: string): Promise<GPTResponse> {
    const sanitizedInput = this.sanitizeInput(userInput);
    
    if (!sanitizedInput) {
      return {
        success: false,
        error: 'Invalid input provided'
      };
    }

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: context || 'You are a helpful assistant focused on spiritual and metaphysical topics.'
      },
      {
        role: 'user',
        content: sanitizedInput
      }
    ];

    return this.sendMessage(messages);
  }
}

export const gptService = GPTService.getInstance();
