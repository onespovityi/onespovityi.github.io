// Готовит фотографии для сайта: кадрирует исходники из assets-src/photos/
// и сохраняет в public/photos/ в AVIF и WebP в нескольких ширинах для srcset.
// Запуск: npm run images (после замены исходников).
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const src = (name) => fileURLToPath(new URL(`../assets-src/photos/${name}`, import.meta.url))
const out = (name) => fileURLToPath(new URL(`../public/photos/${name}`, import.meta.url))

const photos = [
  {
    // Портрет на первом экране, кадр 4:5.
    name: 'portrait',
    file: 'portrait.jpg',
    crop: { left: 90, top: 120, width: 1400, height: 1750 },
    widths: [480, 800, 1200],
  },
  {
    // Детское фото в блоке «Обо мне». Правая часть кадра с другим человеком обрезана.
    name: 'childhood',
    file: 'childhood.jpg',
    crop: { left: 0, top: 110, width: 865, height: 953 },
    widths: [480, 865],
  },
]

await mkdir(out(''), { recursive: true })

for (const photo of photos) {
  const base = sharp(src(photo.file)).rotate().extract(photo.crop)
  for (const width of photo.widths) {
    const resized = base.clone().resize({ width, withoutEnlargement: true })
    await resized
      .clone()
      .avif({ quality: 55, effort: 6 })
      .toFile(out(`${photo.name}-${width}.avif`))
    await resized
      .clone()
      .webp({ quality: 78 })
      .toFile(out(`${photo.name}-${width}.webp`))
  }
  console.log(`${photo.name}: ${photo.widths.join(', ')}px`)
}
