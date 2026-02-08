/**
 * Package Manager Detection and Utilities
 */
import type { PackageManagerType } from '../cli.types.js';
/**
 * Detect which package manager is being used
 */
export declare function detectPackageManager(cwd?: string): Promise<PackageManagerType>;
/**
 * Check if package manager is installed
 */
export declare function isPackageManagerInstalled(pm: PackageManagerType): Promise<boolean>;
/**
 * Install dependencies using specified package manager
 */
export declare function installDependencies(pm: PackageManagerType, cwd: string): Promise<void>;
/**
 * Add dependencies using specified package manager
 */
export declare function addDependencies(pm: PackageManagerType, packages: string[], options?: {
    dev?: boolean;
    cwd?: string;
}): Promise<void>;
/**
 * Get install command as string
 */
export declare function getInstallCommand(pm: PackageManagerType): string;
//# sourceMappingURL=package-manager.d.ts.map