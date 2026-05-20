"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sharp = require('sharp');
const POSTS_DIR = path.resolve(__dirname, '../assets/img/posts');
const CARD_SUFFIX = '@card';
const AVIF_QUALITY = 55;
const WEBP_QUALITY = 75;
async function optimizeImage(imagePath) {
    try {
        const ext = path.extname(imagePath);
        const baseName = path.basename(imagePath, ext);
        const dir = path.dirname(imagePath);
        if (!baseName.includes(CARD_SUFFIX) && !imagePath.includes('@720w')) {
            return null;
        }
        if (ext === '.avif') {
            return null;
        }
        const avifPath = path.join(dir, `${baseName}.avif`);
        const webpPath = path.join(dir, `${baseName}.webp`);
        const metadata = await sharp(imagePath).metadata();
        const width = metadata.width;
        if (!fs.existsSync(avifPath)) {
            await sharp(imagePath)
                .avif({ quality: AVIF_QUALITY })
                .toFile(avifPath);
            console.log(`✓ Generated AVIF: ${path.relative(POSTS_DIR, avifPath)}`);
        }
        if (ext !== '.webp' && !fs.existsSync(webpPath)) {
            await sharp(imagePath)
                .webp({ quality: WEBP_QUALITY })
                .toFile(webpPath);
            console.log(`✓ Generated WebP: ${path.relative(POSTS_DIR, webpPath)}`);
        }
        return {
            original: imagePath,
            avif: avifPath,
            webp: webpPath,
            width
        };
    }
    catch (error) {
        console.error(`✗ Error processing ${imagePath}:`, error);
        return null;
    }
}
async function findAndOptimizeImages() {
    try {
        if (!fs.existsSync(POSTS_DIR)) {
            console.log('Posts directory not found, skipping image optimization');
            return;
        }
        console.log('🖼️  Scanning for images to optimize...');
        const files = fs.readdirSync(POSTS_DIR, { recursive: true });
        const imageFiles = files.filter((f) => {
            const fullPath = path.join(POSTS_DIR, f);
            const stat = fs.statSync(fullPath);
            if (!stat.isFile())
                return false;
            const ext = path.extname(fullPath).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        });
        console.log(`Found ${imageFiles.length} image files`);
        let optimizedCount = 0;
        for (const file of imageFiles) {
            const fullPath = typeof file === 'string' ? path.join(POSTS_DIR, file) : file;
            const result = await optimizeImage(fullPath);
            if (result)
                optimizedCount++;
        }
        console.log(`\n✅ Image optimization complete: ${optimizedCount} variants generated`);
    }
    catch (error) {
        console.error('Error during batch image optimization:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    findAndOptimizeImages();
}
module.exports = { optimizeImage, findAndOptimizeImages };
//# sourceMappingURL=batch-image-optimizer.js.map