/**
 * Spinner Utility
 */
import { type Ora } from 'ora';
/**
 * Create a loading spinner
 */
export declare function createSpinner(text: string): Ora;
/**
 * Spinner helper methods
 */
export declare const spinner: {
    start(text: string): Ora;
    succeed(spinner: Ora, text?: string): void;
    fail(spinner: Ora, text?: string): void;
    warn(spinner: Ora, text?: string): void;
    info(spinner: Ora, text?: string): void;
};
//# sourceMappingURL=spinner.d.ts.map