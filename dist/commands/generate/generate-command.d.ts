/**
 * Generate Command
 */
import type { Command } from 'commander';
import type { ICommand } from '../../cli.types.js';
import type { GeneratorTypeType, IGenerateCommandOptions } from './generate-command.types.js';
/**
 * Generate command implementation
 */
export declare class GenerateCommand implements ICommand {
    name: string;
    description: string;
    register(program: Command): void;
    execute(type: GeneratorTypeType, name: string, options: IGenerateCommandOptions): Promise<void>;
}
//# sourceMappingURL=generate-command.d.ts.map