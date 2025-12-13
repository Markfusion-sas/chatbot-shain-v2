import { bookingsTool } from './booking.tool.js';
import { businessTool } from './business.tool.js';
import { BookingExecutor } from './executors/Booking.executor.js';
import { BusinessExecutor } from './executors/Business.executor.js';
import { MovementExecutor } from './executors/Movement.executor.js';
import { UserExecutor } from './executors/User.executor.js';
import { movementsTool } from './movement.tool.js';
import { usersTool } from './user.tool.js';

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

    usersTool.forEach(tool => {
      this.tools.set(tool.function.name, tool);
    });

    bookingsTool.forEach(tool => {
      this.tools.set(tool.function.name, tool);
    });

    businessTool.forEach(tool => {
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
    let executor = {};
    if (toolName.includes('Movement')) {
      executor = new MovementExecutor(this.req);
    } else if (toolName.includes('User')) {
      executor = new UserExecutor(this.req);
    } else if (toolName.includes('Booking')) {
      executor = new BookingExecutor(this.req);
    } else if (toolName.includes('Business')) {
      executor = new BusinessExecutor(this.req);
    }

    return executor.execute(toolName, data);
  }
}
