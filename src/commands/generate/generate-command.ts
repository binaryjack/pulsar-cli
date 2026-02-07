/**
 * Generate Command
 */

import type { Command } from 'commander';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ICommand } from '../../cli.types.js';
import * as fileSystem from '../../utils/file-system.js';
import { logger } from '../../utils/logger.js';
import { createSpinner } from '../../utils/spinner.js';
import * as template from '../../utils/template.js';
import type { GeneratorTypeType, IGenerateCommandOptions } from './generate-command.types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate command implementation
 */
export class GenerateCommand implements ICommand {
  name = 'generate';
  description = 'Generate code from templates';

  register(program: Command): void {
    program
      .command('generate <type> <name>')
      .alias('g')
      .description(this.description)
      .option('-p, --path <dir>', 'Output directory', './src')
      .option('--typescript', 'Generate TypeScript', true)
      .option('--no-typescript', 'Generate JavaScript')
      .option('--test', 'Generate test file')
      .action(async (type: GeneratorTypeType, name: string, options: IGenerateCommandOptions) => {
        await this.execute(type, name, options);
      });
  }

  async execute(type: GeneratorTypeType, name: string, options: IGenerateCommandOptions): Promise<void> {
    try {
      // Validate generator type
      const validTypes = ['component', 'store', 'resource', 'route', 'hook', 'context'];
      if (!validTypes.includes(type)) {
        logger.error(`Invalid generator type: ${type}`);
        logger.info(`Valid types: ${validTypes.join(', ')}`);
        process.exit(1);
      }

      const spinner = createSpinner(`Generating ${type}...`);
      spinner.start();

      // Prepare variables
      const pascalName = toPascalCase(name);
      const camelName = toCamelCase(name);
      const kebabName = toKebabCase(name);
      
      const variables: Record<string, string> = {
        COMPONENT_NAME: pascalName,
        COMPONENT_FILE: kebabName,
        STORE_NAME: pascalName,
        STORE_NAME_LOWER: camelName,
        STORE_FILE: kebabName,
        RESOURCE_NAME: pascalName,
        RESOURCE_NAME_LOWER: camelName,
        HOOK_NAME: pascalName,
        HOOK_FILE: kebabName,
        CONTEXT_NAME: pascalName
      };

      // Determine file extension
      const ext = options.typescript ? 'ts' : 'js';
      const jsxExt = options.typescript ? 'tsx' : 'jsx';
      
      // Get template path
      const templatesDir = path.resolve(__dirname, '../../../templates/generators');
      let templateFile: string;
      let fileExt: string;

      switch (type) {
        case 'component':
        case 'context':
          templateFile = `${type}.${jsxExt}.template`;
          fileExt = jsxExt;
          break;
        case 'store':
        case 'resource':
        case 'hook':
          templateFile = `${type}.${ext}.template`;
          fileExt = ext;
          break;
        default:
          spinner.fail(`Generator type ${type} not implemented yet`);
          process.exit(1);
      }

      const templatePath = path.join(templatesDir, templateFile);
      
      if (!await fileSystem.fileExists(templatePath)) {
        spinner.fail(`Template not found: ${templateFile}`);
        process.exit(1);
      }

      // Read and render template
      const templateContent = await fileSystem.readFile(templatePath);
      const rendered = template.renderTemplate(templateContent, variables);

      // Write output file
      const outputDir = path.resolve(process.cwd(), options.path || './src');
      await fileSystem.ensureDirectory(outputDir);
      
      const outputFile = path.join(outputDir, `${kebabName}.${fileExt}`);
      await fileSystem.writeFile(outputFile, rendered);

      spinner.succeed(`Generated ${type}: ${outputFile}`);

      // Generate test file if requested
      if (options.test) {
        const testSpinner = createSpinner('Generating test file...');
        testSpinner.start();

        const testTemplateFile = `${type}.test.${fileExt}.template`;
        const testTemplatePath = path.join(templatesDir, testTemplateFile);

        if (await fileSystem.fileExists(testTemplatePath)) {
          const testTemplateContent = await fileSystem.readFile(testTemplatePath);
          const testRendered = template.renderTemplate(testTemplateContent, variables);
          
          const testOutputFile = path.join(outputDir, `${kebabName}.test.${fileExt}`);
          await fileSystem.writeFile(testOutputFile, testRendered);

          testSpinner.succeed(`Generated test: ${testOutputFile}`);
        } else {
          testSpinner.warn(`Test template not available for ${type}`);
        }
      }

      logger.newLine();

    } catch (error) {
      logger.error('Failed to generate code');
      logger.error((error as Error).message);
      process.exit(1);
    }
  }
}

/**
 * Convert string to PascalCase
 */
const toPascalCase = (str: string): string => {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

/**
 * Convert string to camelCase
 */
const toCamelCase = (str: string): string => {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

/**
 * Convert string to kebab-case
 */
const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};
