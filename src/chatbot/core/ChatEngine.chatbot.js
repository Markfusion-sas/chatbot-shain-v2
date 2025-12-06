import { OpenAiService } from "#/services/ai/OpenAI.service.js";
import { ToolRegistry } from "#/tools/ToolRegistry.tool.js";
import { getSystemPrompt } from "../prompts/system.prompt.js";

export class ChatEngine {

    constructor() {
        this.aiService = new OpenAiService(); 
    }

    async processMessage({ userId, userMessage, req }) {
        try {
            // Crear ToolRegistry con el request (para auth)
            const toolRegistry = new ToolRegistry(req);

            //Construir mensajes
            const messages = [
                {role: 'system', content: getSystemPrompt()},
                {role: 'user', content: userMessage},
            ];

            //Primera llamada a la API
            let response = await this.aiService.chat({
                messages,
                tools: toolRegistry.getAllTools(),
            });

            //Procesar tool calls iterativamente
            const MAX_ITERATIONS = 5;
            let iteration = 0;

            while (
                response.choices?.[0]?.finish_reason === 'tool_calls' &&
                iteration < MAX_ITERATIONS
            ) {
                const toolCalls = response.choices[0].message.tool_calls;
                const toolResults = await this.executeTools(toolRegistry, toolCalls);

                // Agregar mensajes al contexto
                messages.push(response.choices[0].message);
                messages.push(...toolResults);

                //Llamada con los resultados
                response = await this.aiService.chat({
                    messages,
                    tools: toolRegistry.getAllTools(),
                });

                iteration++;
            }

            // Extraer respuesta final
            const finalMessage = 
                response.choices?.[0]?.message?.content ||
                'Lo siento, no pude generar una respuesta.';
            
            return {
                ok: true,
                message: finalMessage,
                metadata: {
                    toolCalls: iteration
                }
            };

        } catch (error) {
            console.error('[ChatEngine] Error:', error);
            return {
                ok: false,
                message: 'Ocurrió un error procesando tu mensaje',
                error: error.message,
            };
        }
    }

    async executeTools(toolRegistry, toolCalls) {
        const results = [];

        for ( const toolCall of toolCalls ) {
            const { name, arguments: argsString } = toolCall.function;
            let data = {};

            try {
                data = JSON.parse(argsString);
            } catch (error) {
                console.error('[ChatEngine] Error parsing args', error);
            }

            try {
                const result = await toolRegistry.executeTool(name, data);
                results.push({
                    toolCallId: toolCall.id,
                    role: 'tool',
                    name,
                    content: JSON.stringify(result),
                });
            } catch (error) {
                results.push({
                    toolCallId: toolCall.id,
                    role: 'tool',
                    name,
                    content: JSON.stringify({
                        success: false,
                        error: error.message,
                    }),
                })
            }
        }

        return results;
    }
}