// Снимает скриншоты живых проектов и сохраняет их в public/shots/ в WebP.
// Использует установленный Chrome, отдельный браузер качать не нужно.
// Запуск: npm run shots            — все
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import sharp from 'sharp'

const targets = {
  ablinaart: 'https://ablinaart.netlify.app',
}

const only = process.argv.slice(2)
const list = Object.entries(targets).filter(([key]) => only.length === 0 || only.includes(key))
const outDir = new URL('../public/shots/', import.meta.url)
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

for (const [key, url] of list) {
  process.stdout.write(`${key}: ${url} … `)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
  // Даём отработать анимациям появления на первом экране.
  await page.waitForTimeout(2500)
  const png = await page.screenshot({ type: 'png' })
  await sharp(png)
    .resize(1440)
    .webp({ quality: 82 })
    .toFile(fileURLToPath(new URL(`${key}.webp`, outDir)))
  console.log('ok')
}

await browser.close()
