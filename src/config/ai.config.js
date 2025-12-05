import { OPENAI_API_KEY, OPENAI_MODEL } from './env.config.js';

export const aiConfig = {
  provider: 'openai',
  apikey: OPENAI_API_KEY,
  model: OPENAI_MODEL || 'gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 2000,
};

if (!aiConfig.apikey) {
  console.error('[ai] OPENAI_API_KEY no configurada');
}
