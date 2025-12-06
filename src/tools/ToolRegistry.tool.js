import { MovementExecutor } from './executors/movement.executor.js';
import { movementsTool } from './movement.tool.js';

export class ToolRegistry {
  constructor(req) {
    this.req = req;
    this.tools = new Map();
    this.registerTools();
  }

  registerTools() {
    movementsTool.forEach(tool => {
      this.tools.set(tool.function.name, tool);
    });
  }

  getAllTools() {
    return Array.from(this.tools.values());
  }

  executeTool(toolName, data) {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`Tool no encontrada: ${toolName}`);
    }
    const executor = new MovementExecutor(this.req);
    return executor.execute(toolName, data);
  }
}
