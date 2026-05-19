import * as fs from 'fs';
import * as path from 'path';
const sharp = require('sharp');

interface ImageVariant {
  original: string;
  avif: string;
  webp: string;
  width?: number;
}

const POSTS_DIR = path.resolve(__dirname, '../assets/img/posts');
const CARD_SUFFIX = '@card';
const AVIF_QUALITY = 55;
const WEBP_QUALITY = 75;

async function optimizeImage(imagePath: string): Promise<ImageVariant | null> {
  try {
    const ext = path.extname(imagePath);
    const baseName = path.basename(imagePath, ext);
    const dir = path.dirname(imagePath);

    // Only process @card variants and main images
    if (!baseName.includes(CARD_SUFFIX) && !imagePath.includes('@720w')) {
      return null;
    }

    // Skip if already a .avif file
    if (ext === '.avif') {
      return null;
    }

    const avifPath = path.join(dir, `${baseName}.avif`);
    const webpPath = path.join(dir, `${baseName}.webp`);

    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const width = metadata.width;

    // Generate AVIF
    if (!fs.existsSync(avifPath)) {
      await sharp(imagePath)
        .avif({ quality: AVIF_QUALITY })
        .toFile(avifPath);
      console.log(`✓ Generated AVIF: ${path.relative(POSTS_DIR, avifPath)}`);
    }

    // Generate WebP only if source is not already .webp
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
  } catch (error) {
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
    const imageFiles = files.filter((f: string) => {
      const fullPath = typeof f === 'string' ? path.join(POSTS_DIR, f) : f;
      const stat = fs.statSync(fullPath);
      if (!stat.isFile()) return false;

      const ext = path.extname(fullPath).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} image files`);

    let optimizedCount = 0;
    for (const file of imageFiles) {
      const fullPath = typeof file === 'string' ? path.join(POSTS_DIR, file) : file;
      const result = await optimizeImage(fullPath);
      if (result) optimizedCount++;
    }

    console.log(`\n✅ Image optimization complete: ${optimizedCount} variants generated`);
  } catch (error) {
    console.error('Error during batch image optimization:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  findAndOptimizeImages();
}

module.exports = { optimizeImage, findAndOptimizeImages };
