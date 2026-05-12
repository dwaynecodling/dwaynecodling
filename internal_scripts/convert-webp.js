const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../assets/img/posts');

async function convertDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await convertDir(fullPath);
        } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
            const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
            if (fs.existsSync(webpPath)) {
                console.log(`skip  ${path.relative(postsDir, webpPath)}`);
                continue;
            }
            try {
                await sharp(fullPath).webp({ quality: 82 }).toFile(webpPath);
                console.log(`done  ${path.relative(postsDir, webpPath)}`);
            } catch (e) {
                console.error(`fail  ${path.relative(postsDir, fullPath)}: ${e.message}`);
            }
        }
    }
}

const prefix = process.argv[2];

async function run() {
    if (prefix) {
        const dirs = fs.readdirSync(postsDir).filter(d => d.startsWith(prefix));
        for (const dir of dirs) await convertDir(path.join(postsDir, dir));
    } else {
        await convertDir(postsDir);
    }
    console.log('\nAll done.');
}

run();
