/**
 * Template rendering utility
 * Replaces {{VARIABLE}} placeholders with actual values
 */
/**
 * Render a template string with provided variables
 */
export declare const renderTemplate: (template: string, variables: Record<string, string>) => string;
/**
 * Copy and render template directory to target directory
 */
export declare const copyTemplate: (templateDir: string, targetDir: string, variables: Record<string, string>) => Promise<void>;
//# sourceMappingURL=template.d.ts.map