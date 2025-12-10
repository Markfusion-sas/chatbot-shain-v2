import { ChatController } from '#controllers/Chat.controller.js';
import express from 'express';

const router = express.Router();
const chatController = new ChatController();

router.post('/', chatController.sendMessage);

export default router;
