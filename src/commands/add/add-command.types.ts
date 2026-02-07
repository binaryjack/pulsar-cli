/**
 * Add Command Type Definitions
 */

/**
 * Integration types
 */
export const IntegrationType = {
  FORMULAR: 'formular.dev',
  TAILWIND: 'tailwind',
  ROUTER: 'router',
  STATE: 'state',
  TESTING: 'testing'
} as const;

export type IntegrationTypeType = typeof IntegrationType[keyof typeof IntegrationType];
