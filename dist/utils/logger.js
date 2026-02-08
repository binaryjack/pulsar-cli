/**
 * Logger Utility
 */
import chalk from 'chalk';
/**
 * Logger for CLI output
 */
export const logger = {
    info(message) {
        console.log(chalk.blue('ℹ'), message);
    },
    success(message) {
        console.log(chalk.green('✔'), message);
    },
    warning(message) {
        console.log(chalk.yellow('⚠'), message);
    },
    error(message) {
        console.log(chalk.red('✖'), message);
    },
    debug(message) {
        if (process.env.DEBUG) {
            console.log(chalk.gray('●'), message);
        }
    },
    log(level, message) {
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
    newLine() {
        console.log();
    }
};
//# sourceMappingURL=logger.js.map