/**
 * CLI Type Definitions
 */

import type { Command } from 'commander';

/**
 * CLI configuration
 */
export interface ICLIConfig {
  version: string;
  name: string;
  description: string;
}

/**
 * Command interface
 */
export interface ICommand {
  name: string;
  description: string;
  register: (program: Command) => void;
}

/**
 * Logger levels
 */
export const LogLevel = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEBUG: 'debug'
} as const;

export type LogLevelType = typeof LogLevel[keyof typeof LogLevel];

/**
 * Package manager types
 */
export const PackageManager = {
  NPM: 'npm',
  PNPM: 'pnpm',
  YARN: 'yarn'
} as const;

export type PackageManagerType = typeof PackageManager[keyof typeof PackageManager];

/**
 * Template types
 */
export const TemplateType = {
  BASIC: 'basic',
  FULL: 'full',
  MINIMAL: 'minimal'
} as const;

export type TemplateTypeType = typeof TemplateType[keyof typeof TemplateType];
