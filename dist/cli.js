/**
 * CLI Main Entry Point
 */
import { Command } from 'commander';
/**
 * CLI class following prototype-based pattern
 */
export const CLI = function (config) {
    // Private properties using Object.defineProperty
    Object.defineProperty(this, '_config', {
        value: {
            version: config?.version || '0.8.0-alpha',
            name: config?.name || 'pulsar',
            description: config?.description || 'Pulsar Framework CLI'
        },
        writable: false,
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(this, '_program', {
        value: new Command(),
        writable: false,
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(this, '_commands', {
        value: [],
        writable: false,
        enumerable: false,
        configurable: false
    });
    // Initialize CLI
    this._initialize();
};
//# sourceMappingURL=cli.js.map