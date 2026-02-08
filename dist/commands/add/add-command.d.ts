/**
 * Add Command
 */
import type { Command } from 'commander';
import type { ICommand } from '../../cli.types.js';
import type { IntegrationTypeType } from './add-command.types.js';
/**
 * Add command implementation
 */
export declare class AddCommand implements ICommand {
    name: string;
    description: string;
    register(program: Command): void;
    execute(integration: IntegrationTypeType): Promise<void>;
}
//# sourceMappingURL=add-command.d.ts.map