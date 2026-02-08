/**
 * Create CLI Factory Function
 */
import { CLI } from './cli.js';
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
export function createCLI(config) {
    return new CLI(config);
}
export { CLI };
//# sourceMappingURL=create-cli.js.map