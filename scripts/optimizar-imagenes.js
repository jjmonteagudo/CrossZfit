// Convierte imágenes (JPG/PNG) a WebP optimizado en src/img.
// Uso: npm run images -- ruta/foto1.jpg ruta/foto2.png [--ancho=1200]
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const args = process.argv.slice(2);
const anchoArg = args.find((a) => a.startsWith('--ancho='));
const anchoMax = anchoArg ? Number(anchoArg.split('=')[1]) : 1600;
const archivos = args.filter((a) => !a.startsWith('--'));

if (archivos.length === 0) {
  console.log('Uso: npm run images -- foto.jpg [otra.png] [--ancho=1200]');
  process.exit(1);
}

await fs.mkdir('src/img', { recursive: true });

for (const archivo of archivos) {
  const nombre = path.basename(archivo, path.extname(archivo)).toLowerCase();
  const destino = path.join('src/img', `${nombre}.webp`);
  const info = await sharp(archivo)
    .rotate()
    .resize({ width: anchoMax, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(destino);
  const antes = (await fs.stat(archivo)).size;
  console.log(`${archivo} -> ${destino}  ${Math.round(antes / 1024)} KB -> ${Math.round(info.size / 1024)} KB`);
}
