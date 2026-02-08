/**
 * CLI Prototype: Initialize
 */
import { AddCommand } from '../commands/add/add-command.js';
import { BuildCommand } from '../commands/build/build-command.js';
import { CreateCommand } from '../commands/create/create-command.js';
import { GenerateCommand } from '../commands/generate/generate-command.js';
/**
 * Initialize CLI with commands
 */
export function initialize() {
    const internal = this;
    // Configure program
    internal._program
        .name(internal._config.name)
        .description(internal._config.description)
        .version(internal._config.version);
    // Register built-in commands
    this.registerCommand(new CreateCommand());
    this.registerCommand(new GenerateCommand());
    this.registerCommand(new AddCommand());
    this.registerCommand(new BuildCommand());
}
//# sourceMappingURL=initialize.js.map