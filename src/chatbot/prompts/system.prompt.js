import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let systemPrompt = null;

export function getSystemPrompt() {
    if (systemPrompt) return systemPrompt;

    try {
        const promptPath = path.join(__dirname, './shainTextPrompt.txt');
        systemPrompt = fs.readFileSync(promptPath, 'utf-8');
        return systemPrompt;
    } catch (error) {
        console.warn('[prompt] No se pudo leer el archivo de prompt, usando default');
        systemPrompt = 'Eres SHAIN, un asistente inteligente para negocios. Responde con empatía y claridad.';
        return systemPrompt;
    }
}