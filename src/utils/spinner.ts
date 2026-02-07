/**
 * Spinner Utility
 */

import ora, { type Ora } from 'ora';

/**
 * Create a loading spinner
 */
export function createSpinner(text: string): Ora {
  return ora({
    text,
    color: 'cyan'
  });
}

/**
 * Spinner helper methods
 */
export const spinner = {
  start(text: string): Ora {
    const s = createSpinner(text);
    s.start();
    return s;
  },

  succeed(spinner: Ora, text?: string): void {
    spinner.succeed(text);
  },

  fail(spinner: Ora, text?: string): void {
    spinner.fail(text);
  },

  warn(spinner: Ora, text?: string): void {
    spinner.warn(text);
  },

  info(spinner: Ora, text?: string): void {
    spinner.info(text);
  }
};
