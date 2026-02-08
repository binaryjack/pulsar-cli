/**
 * File System Utilities
 */
import fs from 'fs-extra';
import path from 'path';
/**
 * Check if a directory exists
 */
export async function directoryExists(dir) {
    try {
        const stat = await fs.stat(dir);
        return stat.isDirectory();
    }
    catch {
        return false;
    }
}
/**
 * Check if a file exists
 */
export async function fileExists(file) {
    try {
        const stat = await fs.stat(file);
        return stat.isFile();
    }
    catch {
        return false;
    }
}
/**
 * Create a directory recursively
 */
export async function ensureDirectory(dir) {
    await fs.ensureDir(dir);
}
/**
 * Write file with content
 */
export async function writeFile(file, content) {
    await fs.ensureDir(path.dirname(file));
    await fs.writeFile(file, content, 'utf-8');
}
/**
 * Read file content
 */
export async function readFile(file) {
    return fs.readFile(file, 'utf-8');
}
/**
 * Copy directory recursively
 */
export async function copyDirectory(src, dest) {
    await fs.copy(src, dest);
}
/**
 * Remove directory recursively
 */
export async function removeDirectory(dir) {
    await fs.remove(dir);
}
/**
 * Check if directory is empty
 */
export async function isDirectoryEmpty(dir) {
    if (!(await directoryExists(dir))) {
        return true;
    }
    const files = await fs.readdir(dir);
    return files.length === 0;
}
//# sourceMappingURL=file-system.js.map