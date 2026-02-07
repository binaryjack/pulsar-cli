/**
 * Build Command
 */

import type { Command } from 'commander';
import { execa } from 'execa';
import type { ICommand } from '../../cli.types.js';
import * as fileSystem from '../../utils/file-system.js';
import { logger } from '../../utils/logger.js';
import * as packageManager from '../../utils/package-manager.js';
import { createSpinner } from '../../utils/spinner.js';
import type { IBuildCommandOptions } from './build-command.types.js';

/**
 * Build command implementation
 */
export class BuildCommand implements ICommand {
  name = 'build';
  description = 'Build the application for production';

  register(program: Command): void {
    program
      .command('build')
      .description(this.description)
      .option('--ssr', 'Enable server-side rendering')
      .option('--dev', 'Development build')
      .option('--analyze', 'Analyze bundle size')
      .action(async (options: IBuildCommandOptions) => {
        await this.execute(options);
      });
  }

  async execute(options: IBuildCommandOptions): Promise<void> {
    try {
      const cwd = process.cwd();
      
      // Check if vite.config exists
      const viteConfigExists = 
        await fileSystem.fileExists(`${cwd}/vite.config.ts`) ||
        await fileSystem.fileExists(`${cwd}/vite.config.js`);

      if (!viteConfigExists) {
        logger.error('No vite.config.ts/js found in the current directory');
        logger.info('Make sure you are in a Pulsar project directory');
        process.exit(1);
      }

      logger.newLine();
      logger.info('Building application...');
      logger.newLine();

      // Build arguments
      const buildArgs: string[] = ['build'];
      
      if (options.dev) {
        buildArgs.push('--mode', 'development');
      }

      if (options.ssr) {
        buildArgs.push('--ssr');
      }

      // Detect package manager
      const pm = await packageManager.detectPackageManager(cwd);
      const runCommand = packageManager.getInstallCommand(pm);

      const spinner = createSpinner('Building with Vite...');
      spinner.start();

      try {
        // Run vite build
        const result = await execa(pm, [...runCommand.split(' '), 'vite', ...buildArgs], {
          cwd,
          stdio: 'pipe'
        });

        spinner.succeed('Build completed');

        // Show build output
        if (result.stdout) {
          logger.newLine();
          logger.info('Build output:');
          console.log(result.stdout);
        }

        // Analyze bundle if requested
        if (options.analyze) {
          logger.newLine();
          logger.info('Bundle analysis:');
          logger.info('Install rollup-plugin-visualizer for detailed bundle analysis');
          logger.info('Add it to your vite.config.ts plugins array');
        }

        logger.newLine();
        logger.success('✨ Build completed successfully!');
        logger.newLine();

        // Show output location
        logger.info('Output directory: ./dist');
        logger.info('Run `npm run preview` to test the production build');
        logger.newLine();

      } catch (error) {
        spinner.fail('Build failed');
        
        if (error && typeof error === 'object' && 'stderr' in error) {
          const execaError = error as { stderr: string };
          logger.error(execaError.stderr);
        }
        
        throw error;
      }

    } catch (error) {
      logger.error('Failed to build application');
      logger.error((error as Error).message);
      process.exit(1);
    }
  }
}
