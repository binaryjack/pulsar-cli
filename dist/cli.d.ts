/**
 * CLI Main Entry Point
 */
import { Command } from 'commander';
import type { ICLIConfig, ICommand } from './cli.types.js';
/**
 * CLI class following prototype-based pattern
 */
export declare const CLI: new (config?: Partial<ICLIConfig>) => ICLI;
/**
 * CLI interface
 */
export interface ICLI {
    _config: ICLIConfig;
    _program: Command;
    _commands: ICommand[];
    _initialize: () => void;
    registerCommand: (command: ICommand) => void;
    run: (argv: string[]) => Promise<void>;
}
/**
 * Internal interface with private properties
 */
export interface ICLIInternal extends ICLI {
    _config: ICLIConfig;
    _program: Command;
    _commands: ICommand[];
}
//# sourceMappingURL=cli.d.ts.map