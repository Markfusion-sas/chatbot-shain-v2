import { REDIS_URL } from '#config/env.config.js';
import { createClient } from 'redis';

export class RedisMemory {
  constructor(maxMessages = 20) {
    this.maxMessages = maxMessages;
    this.client = createClient({
      url: REDIS_URL,
    });
    this.connect();
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log('[Redis] conectado');
    }
  }

  async getHistory(userId) {
    try {
      const key = `chat:${userId}`;
      const data = await this.client.get(key);
      return data && typeof data === 'string' ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Redis] Error getting history:', error);
      return [];
    }
  }

  async addMessage(userId, role, content) {
    try {
      const key = `chat:${userId}`;
      let history = await this.getHistory(userId);

      history.push({ role, content });

      //Mantener ultimos mensajes
      if (history.length > this.maxMessages) {
        history = history.slice(-this.maxMessages);
      }

      await this.client.setEx(key, 604800, JSON.stringify(history));
    } catch (error) {
      console.error('[Redis] Error agregando mensaje:', error);
    }
  }

  async clearHistory(userId) {
    try {
      const key = `chat:${userId}`;
      await this.client.del(key);
    } catch (error) {
      console.error('[Redis] Error clearing history:', error);
    }
  }

  async disconnect() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }
}
