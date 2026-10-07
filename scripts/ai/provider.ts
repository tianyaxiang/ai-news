import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import type { LanguageModelV1 } from 'ai';
import { setting } from '../lib/runtime.js';

export type AIProviderName = 'openai' | 'anthropic' | 'google' | 'deepseek';

interface ProviderFactory {
  create(): LanguageModelV1;
}

const providers: Record<AIProviderName, ProviderFactory> = {
  openai: {
    create() {
      const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
      return openai(process.env.AI_MODEL ?? 'gpt-4o') as LanguageModelV1;
    },
  },
  anthropic: {
    create() {
      const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      return anthropic(process.env.AI_MODEL ?? 'claude-sonnet-4-20250514') as LanguageModelV1;
    },
  },
  google: {
    create() {
      const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
      return google(process.env.AI_MODEL ?? 'gemini-2.0-flash') as LanguageModelV1;
    },
  },
  deepseek: {
    create() {
      // DeepSeek uses OpenAI-compatible API
      const deepseek = createOpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com',
      });
      return deepseek(process.env.AI_MODEL ?? 'deepseek-chat') as LanguageModelV1;
    },
  },
};

export function getModel(): LanguageModelV1 {
  const providerName = (process.env.AI_PROVIDER ?? 'openai') as AIProviderName;
  const factory = providers[providerName];
  if (!factory) {
    const available = Object.keys(providers).join(', ');
    throw new Error(`Unknown AI provider "${providerName}". Available: ${available}`);
  }
  return factory.create();
}

export const aiMetrics = { calls: 0, promptTokens: 0, completionTokens: 0, durationMs: 0 };

export async function aiGenerate(prompt: string): Promise<string> {
  const start = Date.now();
  try {
    const { text, finishReason, usage } = await generateText({
      model: getModel(), prompt, maxTokens: 16000,
      maxRetries: 2,
      abortSignal: AbortSignal.timeout(setting('AI_TIMEOUT_MS', 180000, 600000)),
    });
    aiMetrics.promptTokens += usage.promptTokens || 0;
    aiMetrics.completionTokens += usage.completionTokens || 0;
    if (finishReason !== 'stop' || !text.trim()) {
      throw new Error(`Incomplete AI response: ${finishReason}`);
    }
    return text;
  } finally {
    aiMetrics.calls++;
    aiMetrics.durationMs += Date.now() - start;
  }
}

export async function aiJson<T>(prompt: string, validate: (value: unknown) => T): Promise<T> {
  let error: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const text = await aiGenerate(prompt + '\nReturn only valid JSON. Do not wrap it in Markdown fences.');
      return validate(JSON.parse(text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()));
    } catch (err) { error = err; }
  }
  throw error;
}
