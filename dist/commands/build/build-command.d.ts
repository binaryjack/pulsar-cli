/**
 * Build Command
 */
import type { Command } from 'commander';
import type { ICommand } from '../../cli.types.js';
import type { IBuildCommandOptions } from './build-command.types.js';
/**
 * Build command implementation
 */
export declare class BuildCommand implements ICommand {
    name: string;
    description: string;
    register(program: Command): void;
    execute(options: IBuildCommandOptions): Promise<void>;
}
//# sourceMappingURL=build-command.d.ts.map