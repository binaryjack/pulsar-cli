/**
 * CLI Main Entry Point
 */

import { Command } from 'commander';
import type { ICLIConfig, ICommand } from './cli.types.js';

/**
 * CLI class following prototype-based pattern
 */
export const CLI = function(this: ICLI, config?: Partial<ICLIConfig>) {
  // Private properties using Object.defineProperty
  Object.defineProperty(this, '_config', {
    value: {
      version: config?.version || '0.8.0-alpha',
      name: config?.name || 'pulsar',
      description: config?.description || 'Pulsar Framework CLI'
    },
    writable: false,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(this, '_program', {
    value: new Command(),
    writable: false,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(this, '_commands', {
    value: [],
    writable: false,
    enumerable: false,
    configurable: false
  });

  // Initialize CLI
  this._initialize();
} as unknown as new (config?: Partial<ICLIConfig>) => ICLI;

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
