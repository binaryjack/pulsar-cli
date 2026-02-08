/**
 * Spinner Utility
 */
import ora from 'ora';
/**
 * Create a loading spinner
 */
export function createSpinner(text) {
    return ora({
        text,
        color: 'cyan'
    });
}
/**
 * Spinner helper methods
 */
export const spinner = {
    start(text) {
        const s = createSpinner(text);
        s.start();
        return s;
    },
    succeed(spinner, text) {
        spinner.succeed(text);
    },
    fail(spinner, text) {
        spinner.fail(text);
    },
    warn(spinner, text) {
        spinner.warn(text);
    },
    info(spinner, text) {
        spinner.info(text);
    }
};
//# sourceMappingURL=spinner.js.map