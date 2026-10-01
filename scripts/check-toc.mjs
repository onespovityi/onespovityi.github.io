/* global window, document, scrollY, requestAnimationFrame, cancelAnimationFrame */
// Проверка оглавления в настоящем Chrome. Нужен запущенный превью: npm run build && npm run preview.
// Запуск: npm run check:toc
// Клики по оглавлению: каждый кадр записываем подсвеченный пункт и позицию прокрутки.
// Ожидание: после клика подсветка меняется не больше одного раза — сразу на цель, без перебора
// промежуточных разделов; прокрутка не разворачивается; потом колесо мыши снова двигает подсветку.
import { chromium } from 'playwright-core'

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4173/'
const b = await chromium.launch({ channel: 'chrome' })
let fails = 0
const check = (ok, msg) => {
  if (!ok) fails++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${msg}`)
}

for (const [w, h] of [
  [1440, 900],
  [390, 844],
]) {
  console.log(`--- ${w}×${h}`)
  const p = await b.newPage({ viewport: { width: w, height: h } })
  const errors = []
  p.on('pageerror', (e) => errors.push(e.message))
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await p.goto(BASE, { waitUntil: 'networkidle' })
  const current = () =>
    p.evaluate(() => document.querySelector('nav [aria-current="location"]')?.getAttribute('href') ?? '—')

  for (const id of ['looking', 'contact', 'smorodina', 'stack', 'repos', 'about']) {
    const before = await current()
    await p.evaluate((before) => {
      window.__changes = []
      window.__dirs = []
      let last = before,
        lastY = Math.round(scrollY)
      const tick = () => {
        const cur = document.querySelector('nav [aria-current="location"]')?.getAttribute('href') ?? '—'
        const y = Math.round(scrollY)
        if (cur !== last) window.__changes.push(cur)
        if (y !== lastY) window.__dirs.push(Math.sign(y - lastY))
        last = cur
        lastY = y
        window.__raf = requestAnimationFrame(tick)
      }
      tick()
    }, before)
    // На мобильном оглавление стоит в потоке страницы: сначала доезжаем до него, как это сделал бы человек.
    await p.locator(`nav a[href="#${id}"]`).scrollIntoViewIfNeeded()
    // Ждём, пока подготовительная прокрутка к оглавлению (плавная) полностью остановится.
    await p.waitForFunction(
      () =>
        new Promise((r) => {
          const y = scrollY
          setTimeout(() => r(scrollY === y), 150)
        }),
      null,
      { timeout: 5000 },
    )
    await p.evaluate(() => {
      window.__changes = []
      window.__dirs = []
    })
    await p.locator(`nav a[href="#${id}"]`).click()
    await p.waitForTimeout(1800)
    const { changes, dirs } = await p.evaluate(() => {
      cancelAnimationFrame(window.__raf)
      return { changes: window.__changes, dirs: window.__dirs }
    })
    const reversals = dirs.filter((d, i) => i > 0 && d !== dirs[i - 1]).length
    const final = await current()
    check(
      final === `#${id}` && changes.length <= 1 && reversals === 0,
      `клик #${id}: смен подсветки ${changes.length} [${changes.join(' → ') || 'без смен'}], итог ${final}, разворотов прокрутки ${reversals}`,
    )
  }

  // После клика колесо мыши снимает фиксацию: подсветка снова следует за прокруткой.
  await p.locator('nav a[href="#about"]').scrollIntoViewIfNeeded()
  await p.locator('nav a[href="#about"]').click()
  await p.waitForTimeout(1500)
  await p.mouse.move(w / 2, h / 2)
  for (let i = 0; i < 12; i++) {
    await p.mouse.wheel(0, 400)
    await p.waitForTimeout(60)
  }
  await p.waitForTimeout(700)
  const afterWheel = await current()
  check(afterWheel !== '#about' && afterWheel !== '—', `колесо после клика: подсветка ушла с #about на ${afterWheel}`)
  check(errors.length === 0, `ошибок в консоли: ${errors.length}`)
  await p.close()
}
// Открытие по ссылке с якорем: подсвечен именно этот раздел, даже короткий.
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto(`${BASE}#looking`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(800)
  const cur = await p.evaluate(() => document.querySelector('nav [aria-current="location"]')?.getAttribute('href'))
  check(cur === '#looking', `открытие по ссылке /#looking: подсвечен ${cur}`)
  await p.close()
}
console.log(`провалов: ${fails}`)
await b.close()
process.exit(fails ? 1 : 0)
