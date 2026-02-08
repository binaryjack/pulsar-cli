/**
 * CLI Prototype: Run
 */
import { logger } from '../utils/logger.js';
/**
 * Run the CLI with provided arguments
 */
export async function run(argv) {
    const internal = this;
    try {
        await internal._program.parseAsync(argv);
    }
    catch (error) {
        logger.error('CLI execution failed');
        if (error instanceof Error) {
            logger.error(error.message);
        }
        process.exit(1);
    }
}
//# sourceMappingURL=run.js.map