/**
 * Logger Utility
 */

import chalk from 'chalk';
import type { LogLevelType } from '../cli.types.js';

/**
 * Logger for CLI output
 */
export const logger = {
  info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  },

  success(message: string): void {
    console.log(chalk.green('✔'), message);
  },

  warning(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  },

  error(message: string): void {
    console.log(chalk.red('✖'), message);
  },

  debug(message: string): void {
    if (process.env.DEBUG) {
      console.log(chalk.gray('●'), message);
    }
  },

  log(level: LogLevelType, message: string): void {
    switch (level) {
      case 'info':
        this.info(message);
        break;
      case 'success':
        this.success(message);
        break;
      case 'warning':
        this.warning(message);
        break;
      case 'error':
        this.error(message);
        break;
      case 'debug':
        this.debug(message);
        break;
    }
  },

  newLine(): void {
    console.log();
  }
};
