import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const systemLight = () => window.matchMedia('(prefers-color-scheme: light)')

/** Тема, которая сейчас на экране: выбранная вручную (data-theme) или системная. */
function getActiveTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return systemLight().matches ? 'light' : 'dark'
}

/** Следим и за data-theme на <html>, и за системной темой. */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  const media = systemLight()
  media.addEventListener('change', onChange)
  return () => {
    observer.disconnect()
    media.removeEventListener('change', onChange)
  }
}

/** Текущая тема; null при пререндере, где её не узнать. */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, getActiveTheme, () => null)
}

/**
 * Смена темы разом меняет цвета почти всех элементов. Чтобы их transition не сработали
 * одновременно и переключение не «размазалось», на один кадр отключаем все переходы.
 */
function withoutTransitions(apply: () => void): void {
  const style = document.createElement('style')
  style.textContent = '*,*::before,*::after{transition:none!important}'
  document.head.append(style)
  apply()
  document.body.getBoundingClientRect() // принудительный reflow, пока переходы выключены
  requestAnimationFrame(() => {
    style.remove()
  })
}

export function toggleTheme(): void {
  const next: Theme = getActiveTheme() === 'dark' ? 'light' : 'dark'
  withoutTransitions(() => {
    document.documentElement.dataset.theme = next
  })
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // В приватном режиме хранилище может быть недоступно: тема просто не запомнится.
  }
}
