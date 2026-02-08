/**
 * Create Command
 */
import type { Command } from 'commander';
import type { ICommand } from '../../cli.types.js';
import type { ICreateCommandOptions } from './create-command.types.js';
/**
 * Create command implementation
 */
export declare class CreateCommand implements ICommand {
    name: string;
    description: string;
    register(program: Command): void;
    execute(appName: string, options: ICreateCommandOptions): Promise<void>;
}
//# sourceMappingURL=create-command.d.ts.map