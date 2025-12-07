import { ChatEngine } from '#/chatbot/core/ChatEngine.chatbot.js';

export class ChatController {
  constructor() {
    this.ChatEngine = new ChatEngine();
  }

  sendMessage = async (req, res, next) => {
    try {
      const { message, text, userId } = req.body;

      const userMessage = message || text;

      if (!userMessage || typeof userMessage !== 'string') {
        return res.status(400).json({
          ok: false,
          error: 'El campo "message" o "text" es requerido',
        });
      }

      // Usar userId del body o generar uno temporal
      const effectiveUserId = userId || req.ip || 'anonymous';

      const result = await this.ChatEngine.processMessage({
        userId: effectiveUserId,
        userMessage,
        req,
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  health = (req, res) => {
    res.json({
      ok: true,
      service: 'SHAIN Chatbot',
      timestamp: new Date().toISOString(),
    });
  };
}
