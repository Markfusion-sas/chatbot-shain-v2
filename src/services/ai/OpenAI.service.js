import { aiConfig } from '#config/ai.config.js';
import OpenAI from 'openai';

export class OpenAiService {
  constructor() {
    this.client = new OpenAI({ apiKey: aiConfig.apikey });
    this.model = aiConfig.model;
  }

  async chat({ messages, tools, tool_choice = 'auto' }) {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages,
        tools,
        tool_choice,
        temperature: aiConfig.temperature,
        max_tokens: aiConfig.maxTokens,
      });

      return response;
    } catch (error) {
      console.error('[OpenAI] Error:', error.message);
      throw error;
    }
  }
}
