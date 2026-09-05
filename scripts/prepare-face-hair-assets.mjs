import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const manifest = JSON.parse(await fs.readFile('docs/face-hair-image-prompts.json', 'utf8'));
const detailPhotos = {
  'neem-acne-control-face-wash': '17.14.20 (1)',
  'lemon-fruits-extract-brightening-face-wash': '17.14.18 (1)',
  'skin-repair-night-gel': '17.14.22 (1)',
  'ayurvedic-herbal-hair-mask': '17.14.19',
};

for (const asset of manifest.assets) {
  const folder = asset.slug === 'ayurvedic-herbal-hair-mask' ? 'hair-care' : 'face-care';
  const directory = path.join('public/images', folder);
  await fs.mkdir(directory, { recursive: true });
  const root = path.join(directory, asset.slug);
  const source = asset.correction?.source ?? asset.source;
  // File conversion only; visual edits are performed by the image-generation tool.
  await sharp(source).resize(1254, 1254, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toFile(`${root}-hero.webp`);
  await sharp(source).resize(800, 800, { fit: 'inside', withoutEnlargement: true }).png().toFile(`${root}-hero.png`);
  await fs.copyFile(asset.reference, `${root}-original.jpg`);
  if (detailPhotos[asset.slug]) {
    const sourcePhoto = path.join(path.dirname(asset.reference), `WhatsApp Image 2026-09-05 at ${detailPhotos[asset.slug]}.jpeg`);
    await fs.copyFile(sourcePhoto, `${root}-detail.jpg`);
  }
  console.log(`Prepared ${asset.slug}`);
}
