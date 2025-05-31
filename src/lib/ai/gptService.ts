import { OpenAI } from 'openai';

// You can swap between GPT-4 and GPT-3.5 here
const GPT_MODEL = 'gpt-4'; // or 'gpt-3.5-turbo'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true // For browser-based dev, remove in prod
});

export async function askGPT(prompt: string, opts?: { model?: string, systemPrompt?: string }) {
  const model = opts?.model || GPT_MODEL;
  const systemPrompt = opts?.systemPrompt || 'You are a quantum archetype AI assistant for a dimensional simulator.';
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 512
  });
  return response.choices[0]?.message?.content || '';
}

// Streaming support for real-time UI (optional)
export async function* streamGPT(prompt: string, opts?: { model?: string, systemPrompt?: string }) {
  const model = opts?.model || GPT_MODEL;
  const systemPrompt = opts?.systemPrompt || 'You are a quantum archetype AI assistant for a dimensional simulator.';
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];
  const stream = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 512,
    stream: true
  });
  for await (const chunk of stream) {
    yield chunk.choices[0]?.delta?.content || '';
  }
}
