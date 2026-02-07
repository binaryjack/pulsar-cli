/**
 * CLI Prototype: Run
 */

import type { ICLI, ICLIInternal } from '../cli.js';
import { logger } from '../utils/logger.js';

/**
 * Run the CLI with provided arguments
 */
export async function run(this: ICLI, argv: string[]): Promise<void> {
  const internal = this as ICLIInternal;
  
  try {
    await internal._program.parseAsync(argv);
  } catch (error) {
    logger.error('CLI execution failed');
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}
