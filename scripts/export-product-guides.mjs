import fs from 'node:fs/promises';
import sharp from 'sharp';

const base = process.argv[2] ?? 'http://localhost:3002';
const { assets } = JSON.parse(await fs.readFile('docs/face-hair-image-prompts.json', 'utf8'));
for (const asset of assets) {
  const response = await fetch(`${base}/products/${asset.slug}/guide.png`);
  if (!response.ok || !response.headers.get('content-type')?.includes('image/png')) throw new Error(`${asset.slug}: guide response ${response.status} ${await response.text()}`);
  const data = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(data).metadata();
  if (metadata.width !== 1200 || metadata.height !== 1700) throw new Error(`${asset.slug}: unexpected guide dimensions`);
  const folder = asset.slug === 'ayurvedic-herbal-hair-mask' ? 'hair-care' : 'face-care';
  await fs.writeFile(`public/images/${folder}/${asset.slug}-complete-guide.png`, data);
  console.log(`Exported ${asset.slug}: ${metadata.width} × ${metadata.height}`);
}
