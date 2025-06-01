// Unified GPT Service for Dimensional Echo Simulator
// Supports GPT-4 and GPT-3.5, with fallback and streaming

import type { ChatCompletionRequestMessage } from 'openai';

const GPT4_MODEL = 'gpt-4';
const GPT35_MODEL = 'gpt-3.5-turbo';

// This function assumes you have a backend proxy or environment variable for the OpenAI API key
const OPENAI_API_URL = process.env.OPENAI_API_URL || '/api/openai';

export async function askGPT(prompt: string, opts?: { model?: string; systemPrompt?: string }): Promise<string> {
  const model = opts?.model || GPT4_MODEL;
  const systemPrompt = opts?.systemPrompt || 'You are a quantum archetype AI assistant for a dimensional simulator.';
  const messages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];
  try {
    const res = await fetch(OPENAI_API_URL + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 512 })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (err) {
    // Fallback to GPT-3.5 if GPT-4 fails
    if (model !== GPT35_MODEL) {
      return askGPT(prompt, { ...opts, model: GPT35_MODEL });
    }
    return 'AI unavailable.';
  }
}

// Streaming support (for real-time UI feedback)
export async function* streamGPT(prompt: string, opts?: { model?: string; systemPrompt?: string }) {
  const model = opts?.model || GPT4_MODEL;
  const systemPrompt = opts?.systemPrompt || 'You are a quantum archetype AI assistant for a dimensional simulator.';
  const messages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];
  const res = await fetch(OPENAI_API_URL + '/chat/completions/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 512 })
  });
  const reader = res.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let done = false;
  let buffer = '';
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    // Assume each chunk is a JSON line with { delta: { content: string } }
    const lines = buffer.split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
      try {
        const chunk = JSON.parse(lines[i]);
        yield chunk.choices?.[0]?.delta?.content || '';
      } catch {}
    }
    buffer = lines[lines.length - 1];
  }
}

// Recursive type for nested tensor values
export type NestedTensor = number | NestedTensor[];

// Example usage elsewhere:
// interface SomeTensor {
//   values: NestedTensor;
// }
