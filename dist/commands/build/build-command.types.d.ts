/**
 * Build Command Type Definitions
 */
/**
 * Build command options
 */
export interface IBuildCommandOptions {
    ssr?: boolean;
    dev?: boolean;
    analyze?: boolean;
}
/**
 * Build configuration
 */
export interface IBuildConfig {
    ssr: boolean;
    dev: boolean;
    analyze: boolean;
    outDir: string;
}
//# sourceMappingURL=build-command.types.d.ts.map