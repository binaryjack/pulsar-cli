/**
 * CLI Prototype: Register Command
 */
/**
 * Register a command with the CLI
 */
export function registerCommand(command) {
    const internal = this;
    // Add to commands list
    internal._commands.push(command);
    // Register with commander
    command.register(internal._program);
}
//# sourceMappingURL=register-command.js.map