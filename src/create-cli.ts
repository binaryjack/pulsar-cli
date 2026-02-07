/**
 * Create CLI Factory Function
 */

import type { ICLI } from './cli.js';
import { CLI } from './cli.js';
import type { ICLIConfig } from './cli.types.js';

// Attach prototype methods
import { initialize } from './prototype/initialize.js';
import { registerCommand } from './prototype/register-command.js';
import { run } from './prototype/run.js';

CLI.prototype._initialize = initialize;
CLI.prototype.registerCommand = registerCommand;
CLI.prototype.run = run;

/**
 * Factory function to create CLI instance
 */
export function createCLI(config?: Partial<ICLIConfig>): ICLI {
  return new (CLI as any)(config);
}

export { CLI };
export type { ICLI };

