/**
 * Add Command
 */
import * as path from 'path';
import * as fileSystem from '../../utils/file-system.js';
import { logger } from '../../utils/logger.js';
import * as packageManager from '../../utils/package-manager.js';
import { createSpinner } from '../../utils/spinner.js';
/**
 * Integration configurations
 */
const integrations = {
    'formular.dev': {
        packages: ['@pulsar-framework/formular.dev'],
        instructions: [
            'Import FormProvider and wrap your app',
            'Use createForm() to create forms',
            'See https://github.com/pulsarframework/formular.dev'
        ]
    },
    'tailwind': {
        packages: ['tailwindcss', 'postcss', 'autoprefixer'],
        devPackages: ['tailwindcss', 'postcss', 'autoprefixer'],
        files: [
            {
                path: 'tailwind.config.js',
                content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
            },
            {
                path: 'postcss.config.js',
                content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
            },
            {
                path: 'src/index.css',
                content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`
            }
        ],
        instructions: [
            'Import ./src/index.css in your main file',
            'Start using Tailwind classes in your components'
        ]
    },
    'router': {
        packages: ['@pulsar-framework/router'],
        instructions: [
            'Import Router, Route from @pulsar-framework/router',
            'Wrap your app with <Router>',
            'Define routes with <Route path="/" component={Component} />'
        ]
    },
    'state': {
        packages: [],
        instructions: [
            'State management is built into Pulsar',
            'Use createStore() for global state',
            'Use createSignal() for local state'
        ]
    },
    'testing': {
        packages: [],
        devPackages: ['@testing-library/react', '@testing-library/jest-dom', '@vitest/ui'],
        files: [
            {
                path: 'vitest.config.ts',
                content: `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
`
            },
            {
                path: 'src/setupTests.ts',
                content: `import '@testing-library/jest-dom';
`
            }
        ],
        instructions: [
            'Run tests with: npm test',
            'Use @testing-library/react for component testing'
        ]
    }
};
/**
 * Add command implementation
 */
export class AddCommand {
    name = 'add';
    description = 'Add pre-configured integrations';
    register(program) {
        program
            .command('add <integration>')
            .description(this.description)
            .action(async (integration) => {
            await this.execute(integration);
        });
    }
    async execute(integration) {
        try {
            // Validate integration
            if (!integrations[integration]) {
                logger.error(`Unknown integration: ${integration}`);
                logger.info(`Available integrations: ${Object.keys(integrations).join(', ')}`);
                process.exit(1);
            }
            const config = integrations[integration];
            logger.newLine();
            logger.info(`Adding ${integration} integration...`);
            logger.newLine();
            // Detect package manager
            const cwd = process.cwd();
            const pm = await packageManager.detectPackageManager(cwd);
            // Install packages
            if (config.packages && config.packages.length > 0) {
                const spinner = createSpinner('Installing dependencies...');
                spinner.start();
                try {
                    await packageManager.addDependencies(pm, config.packages, { cwd });
                    spinner.succeed('Dependencies installed');
                }
                catch (error) {
                    spinner.fail('Failed to install dependencies');
                    throw error;
                }
            }
            // Install dev packages
            if (config.devPackages && config.devPackages.length > 0) {
                const devSpinner = createSpinner('Installing dev dependencies...');
                devSpinner.start();
                try {
                    await packageManager.addDependencies(pm, config.devPackages, { dev: true, cwd });
                    devSpinner.succeed('Dev dependencies installed');
                }
                catch (error) {
                    devSpinner.fail('Failed to install dev dependencies');
                    throw error;
                }
            }
            // Create configuration files
            if (config.files && config.files.length > 0) {
                const fileSpinner = createSpinner('Creating configuration files...');
                fileSpinner.start();
                for (const file of config.files) {
                    const filePath = path.join(cwd, file.path);
                    await fileSystem.writeFile(filePath, file.content);
                }
                fileSpinner.succeed('Configuration files created');
            }
            logger.newLine();
            logger.success(`✨ Successfully added ${integration}!`);
            logger.newLine();
            // Show instructions
            if (config.instructions && config.instructions.length > 0) {
                logger.info('Next steps:');
                for (const instruction of config.instructions) {
                    logger.info(`  • ${instruction}`);
                }
                logger.newLine();
            }
        }
        catch (error) {
            logger.error('Failed to add integration');
            logger.error(error.message);
            process.exit(1);
        }
    }
}
//# sourceMappingURL=add-command.js.map