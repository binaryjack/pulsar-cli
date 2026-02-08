/**
 * Create CLI Factory Function
 */
import type { ICLI } from './cli.js';
import { CLI } from './cli.js';
import type { ICLIConfig } from './cli.types.js';
/**
 * Factory function to create CLI instance
 */
export declare function createCLI(config?: Partial<ICLIConfig>): ICLI;
export { CLI };
export type { ICLI };
//# sourceMappingURL=create-cli.d.ts.map