/**
 * Generate Command Type Definitions
 */

/**
 * Generator types
 */
export const GeneratorType = {
  COMPONENT: 'component',
  STORE: 'store',
  RESOURCE: 'resource',
  ROUTE: 'route',
  HOOK: 'hook',
  CONTEXT: 'context'
} as const;

export type GeneratorTypeType = typeof GeneratorType[keyof typeof GeneratorType];

/**
 * Generate command options
 */
export interface IGenerateCommandOptions {
  path?: string;
  typescript?: boolean;
  test?: boolean;
}
