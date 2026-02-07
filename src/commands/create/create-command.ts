/**
 * Create Command
 */

import type { Command } from 'commander';
import { execa } from 'execa';
import inquirer from 'inquirer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ICommand } from '../../cli.types.js';
import * as fileSystem from '../../utils/file-system.js';
import { logger } from '../../utils/logger.js';
import * as packageManager from '../../utils/package-manager.js';
import { createSpinner } from '../../utils/spinner.js';
import * as template from '../../utils/template.js';
import type { ICreateCommandOptions } from './create-command.types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Create command implementation
 */
export class CreateCommand implements ICommand {
  name = 'create';
  description = 'Create a new Pulsar application';

  register(program: Command): void {
    program
      .command('create <app-name>')
      .description(this.description)
      .option('-t, --template <type>', 'Project template (basic, full, minimal)', 'basic')
      .option('--typescript', 'Use TypeScript', true)
      .option('--no-typescript', 'Use JavaScript')
      .option('--git', 'Initialize git repository', true)
      .option('--no-git', 'Skip git initialization')
      .option('-p, --package-manager <pm>', 'Package manager (npm, pnpm, yarn)', 'npm')
      .option('--no-install', 'Skip dependency installation')
      .action(async (appName: string, options: ICreateCommandOptions) => {
        await this.execute(appName, options);
      });
  }

  async execute(appName: string, options: ICreateCommandOptions): Promise<void> {
    try {
      // Validate app name
      if (!isValidAppName(appName)) {
        logger.error('Invalid app name. Use only letters, numbers, hyphens, and underscores.');
        process.exit(1);
      }

      const targetDir = path.resolve(process.cwd(), appName);

      // Check if directory already exists
      if (await fileSystem.directoryExists(targetDir)) {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `Directory ${appName} already exists. Overwrite?`,
            default: false
          }
        ]);

        if (!overwrite) {
          logger.info('Operation cancelled');
          process.exit(0);
        }

        await fileSystem.removeDirectory(targetDir);
      }

      // Get template type
      const templateType = options.template || 'basic';

      logger.newLine();
      logger.info(`Creating ${appName} with ${templateType} template...`);
      logger.newLine();

      // Copy template files
      const spinner = createSpinner('Copying template files...');
      spinner.start();

      const templatesDir = path.resolve(__dirname, '../../../templates');
      const templateDir = path.join(templatesDir, templateType);

      if (!await fileSystem.directoryExists(templateDir)) {
        spinner.fail(`Template ${templateType} not found`);
        process.exit(1);
      }

      await template.copyTemplate(templateDir, targetDir, {
        APP_NAME: appName
      });

      spinner.succeed('Template files copied');

      // Initialize git repository
      if (options.git) {
        const gitSpinner = createSpinner('Initializing git repository...');
        gitSpinner.start();

        try {
          await execa('git', ['init'], { cwd: targetDir });
          await execa('git', ['add', '.'], { cwd: targetDir });
          await execa('git', ['commit', '-m', 'Initial commit'], { cwd: targetDir });
          gitSpinner.succeed('Git repository initialized');
        } catch (error) {
          gitSpinner.warn('Git initialization failed (git may not be installed)');
        }
      }

      // Install dependencies
      if (options.install !== false) {
        const installSpinner = createSpinner('Installing dependencies...');
        installSpinner.start();

        try {
          const pm = (options.packageManager || 'npm') as 'npm' | 'pnpm' | 'yarn';

          // Verify package manager is installed
          const isInstalled = await packageManager.isPackageManagerInstalled(pm);
          if (!isInstalled) {
            installSpinner.warn(`${pm} is not installed. Skipping dependency installation.`);
          } else {
            await packageManager.installDependencies(pm, targetDir);
            installSpinner.succeed('Dependencies installed');
          }
        } catch (error) {
          installSpinner.fail('Dependency installation failed');
          logger.error((error as Error).message);
        }
      }

      logger.newLine();
      logger.success(`✨ Successfully created ${appName}!`);
      logger.newLine();
      logger.info('Next steps:');
      logger.info(`  cd ${appName}`);
      if (options.install === false) {
        logger.info(`  npm install`);
      }
      logger.info(`  npm run dev`);
      logger.newLine();

    } catch (error) {
      logger.error('Failed to create project');
      logger.error((error as Error).message);
      process.exit(1);
    }
  }
}

/**
 * Validate app name
 */
const isValidAppName = function isValidAppName(name: string): boolean {
  return /^[a-zA-Z0-9-_]+$/.test(name);
};
