// Доводит dist/ до готовности к GitHub Pages:
// - 404.html, который Pages отдаёт на несуществующие адреса;
// - sitemap.xml по всем пререндеренным страницам;
// - .nojekyll, чтобы Pages не игнорировал файлы и папки с подчёркиванием.
import { copyFile, readdir, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://onespovityi.github.io'
const dist = fileURLToPath(new URL('../dist/', import.meta.url))

await copyFile(join(dist, '404', 'index.html'), join(dist, '404.html'))
await writeFile(join(dist, '.nojekyll'), '')

const pages = (await readdir(dist, { recursive: true }))
  .filter((file) => file.endsWith('index.html') && !file.startsWith('404'))
  .map((file) => {
    const dir = relative('.', file.slice(0, -'index.html'.length)).split(sep).join('/')
    return dir ? `/${dir}/` : '/'
  })
  .sort()

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)

console.log(`postbuild: 404.html, .nojekyll, sitemap.xml (${pages.length} стр.)`)
