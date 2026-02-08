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
export declare const LogLevel: {
    readonly INFO: "info";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly ERROR: "error";
    readonly DEBUG: "debug";
};
export type LogLevelType = typeof LogLevel[keyof typeof LogLevel];
/**
 * Package manager types
 */
export declare const PackageManager: {
    readonly NPM: "npm";
    readonly PNPM: "pnpm";
    readonly YARN: "yarn";
};
export type PackageManagerType = typeof PackageManager[keyof typeof PackageManager];
/**
 * Template types
 */
export declare const TemplateType: {
    readonly BASIC: "basic";
    readonly FULL: "full";
    readonly MINIMAL: "minimal";
};
export type TemplateTypeType = typeof TemplateType[keyof typeof TemplateType];
//# sourceMappingURL=cli.types.d.ts.map