import express from 'express';
import chatRoutes from './chat.routes.js';
import { ChatController } from '#controllers/Chat.controller.js';

const router = express.Router();
const chatController = new ChatController();

// Health check
router.get('/health', chatController.health);

// Rutas del chat
router.use('/chat', chatRoutes);

export default router;
