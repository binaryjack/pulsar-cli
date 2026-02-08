/**
 * Create Command Type Definitions
 */
import type { PackageManagerType, TemplateTypeType } from '../../cli.types.js';
/**
 * Create command options
 */
export interface ICreateCommandOptions {
    template?: TemplateTypeType;
    typescript?: boolean;
    git?: boolean;
    packageManager?: PackageManagerType;
    install?: boolean;
}
/**
 * Project metadata
 */
export interface IProjectMetadata {
    name: string;
    path: string;
    template: TemplateTypeType;
    typescript: boolean;
    git: boolean;
    packageManager: PackageManagerType;
}
//# sourceMappingURL=create-command.types.d.ts.map