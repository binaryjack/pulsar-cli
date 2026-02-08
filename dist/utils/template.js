/**
 * Template rendering utility
 * Replaces {{VARIABLE}} placeholders with actual values
 */
import fs from 'fs-extra';
import * as path from 'path';
/**
 * Render a template string with provided variables
 */
export const renderTemplate = function renderTemplate(template, variables) {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
        const placeholder = `{{${key}}}`;
        result = result.replaceAll(placeholder, value);
    }
    return result;
};
/**
 * Copy and render template directory to target directory
 */
export const copyTemplate = async function copyTemplate(templateDir, targetDir, variables) {
    // Ensure target directory exists
    await fs.ensureDir(targetDir);
    // Read all files in template directory recursively
    const files = await getAllFiles(templateDir);
    for (const file of files) {
        const relativePath = path.relative(templateDir, file);
        const targetPath = path.join(targetDir, relativePath);
        // Remove .template extension from target path
        const finalTargetPath = targetPath.replace(/\.template$/, '');
        // Ensure target directory exists
        await fs.ensureDir(path.dirname(finalTargetPath));
        // Read, render, and write file
        const content = await fs.readFile(file, 'utf-8');
        const rendered = renderTemplate(content, variables);
        await fs.writeFile(finalTargetPath, rendered, 'utf-8');
    }
};
/**
 * Get all files recursively from a directory
 */
const getAllFiles = async function getAllFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const subFiles = await getAllFiles(fullPath);
            files.push(...subFiles);
        }
        else {
            files.push(fullPath);
        }
    }
    return files;
};
//# sourceMappingURL=template.js.map