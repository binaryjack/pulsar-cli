/**
 * Logger Utility
 */
import type { LogLevelType } from '../cli.types.js';
/**
 * Logger for CLI output
 */
export declare const logger: {
    info(message: string): void;
    success(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    log(level: LogLevelType, message: string): void;
    newLine(): void;
};
//# sourceMappingURL=logger.d.ts.map