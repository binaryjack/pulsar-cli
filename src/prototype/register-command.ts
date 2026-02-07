/**
 * CLI Prototype: Register Command
 */

import type { ICLI, ICLIInternal } from '../cli.js';
import type { ICommand } from '../cli.types.js';

/**
 * Register a command with the CLI
 */
export function registerCommand(this: ICLI, command: ICommand): void {
  const internal = this as ICLIInternal;
  
  // Add to commands list
  internal._commands.push(command);
  
  // Register with commander
  command.register(internal._program);
}
