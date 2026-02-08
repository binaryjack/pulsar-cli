/**
 * File System Utilities
 */
/**
 * Check if a directory exists
 */
export declare function directoryExists(dir: string): Promise<boolean>;
/**
 * Check if a file exists
 */
export declare function fileExists(file: string): Promise<boolean>;
/**
 * Create a directory recursively
 */
export declare function ensureDirectory(dir: string): Promise<void>;
/**
 * Write file with content
 */
export declare function writeFile(file: string, content: string): Promise<void>;
/**
 * Read file content
 */
export declare function readFile(file: string): Promise<string>;
/**
 * Copy directory recursively
 */
export declare function copyDirectory(src: string, dest: string): Promise<void>;
/**
 * Remove directory recursively
 */
export declare function removeDirectory(dir: string): Promise<void>;
/**
 * Check if directory is empty
 */
export declare function isDirectoryEmpty(dir: string): Promise<boolean>;
//# sourceMappingURL=file-system.d.ts.map