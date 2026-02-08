/**
 * Package Manager Detection and Utilities
 */
import { execa } from 'execa';
import { fileExists } from './file-system.js';
/**
 * Detect which package manager is being used
 */
export async function detectPackageManager(cwd = process.cwd()) {
    // Check lock files
    if (await fileExists(`${cwd}/pnpm-lock.yaml`)) {
        return 'pnpm';
    }
    if (await fileExists(`${cwd}/yarn.lock`)) {
        return 'yarn';
    }
    if (await fileExists(`${cwd}/package-lock.json`)) {
        return 'npm';
    }
    // Default to npm
    return 'npm';
}
/**
 * Check if package manager is installed
 */
export async function isPackageManagerInstalled(pm) {
    try {
        await execa(pm, ['--version']);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Install dependencies using specified package manager
 */
export async function installDependencies(pm, cwd) {
    const args = pm === 'yarn' ? [] : ['install'];
    await execa(pm, args, { cwd, stdio: 'inherit' });
}
/**
 * Add dependencies using specified package manager
 */
export async function addDependencies(pm, packages, options = {}) {
    const { dev = false, cwd = process.cwd() } = options;
    const args = [];
    if (pm === 'npm') {
        args.push('install', dev ? '--save-dev' : '--save');
    }
    else if (pm === 'yarn') {
        args.push('add', dev ? '--dev' : '');
    }
    else if (pm === 'pnpm') {
        args.push('add', dev ? '--save-dev' : '');
    }
    args.push(...packages);
    await execa(pm, args.filter(Boolean), { cwd, stdio: 'inherit' });
}
/**
 * Get install command as string
 */
export function getInstallCommand(pm) {
    switch (pm) {
        case 'yarn':
            return 'yarn';
        case 'pnpm':
            return 'pnpm install';
        case 'npm':
        default:
            return 'npm install';
    }
}
//# sourceMappingURL=package-manager.js.map