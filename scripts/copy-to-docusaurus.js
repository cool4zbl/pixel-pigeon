import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) {
        throw new Error(`Source path ${src} does not exist`);
    }

    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(child => {
            copyRecursiveSync(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

const sourceDir = path.join(__dirname, '..', 'dist');
const destinationDir = path.join(__dirname, '..', '..', 'doodle', 'static', 'pixel-pigeon');

try {
    copyRecursiveSync(sourceDir, destinationDir);
    console.log(`Copied ${sourceDir} to ${destinationDir}`);
} catch (err) {
    console.error('Error copying files:', err);
    process.exit(1);
}
