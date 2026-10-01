import { useCallback, useEffect, useRef, useState } from 'react'

/** Линия активации: раздел считается текущим, когда его верх поднялся выше этой отметки. */
const ACTIVATION_OFFSET_PX = 96

/** Клавиши, которыми пользователь прокручивает страницу сам. */
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '])

/**
 * Раздел, который сейчас читают, — для подсветки пункта оглавления.
 *
 * Активен последний раздел, чей верх поднялся выше линии активации; подразделы идут в ids
 * после родителя, поэтому выигрывает самый вложенный. Внизу страницы активен последний раздел.
 *
 * select(id) — для клика по оглавлению: подсветка сразу встаёт на выбранный пункт и не меняется,
 * пока страница плавно едет к разделу и после этого — пока пользователь сам не начнёт прокручивать.
 * Иначе по пути подсветка перебирает все промежуточные разделы и мерцает.
 */
export function useActiveSection(ids: readonly string[]): [string | null, (id: string) => void] {
  const [active, setActive] = useState<string | null>(null)
  const pinned = useRef(false)

  const compute = useCallback(() => {
    if (pinned.current) return
    const root = document.documentElement
    if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
      setActive(ids.at(-1) ?? null)
      return
    }
    const current = ids.findLast((id) => {
      const element = document.getElementById(id)
      return element !== null && element.getBoundingClientRect().top <= ACTIVATION_OFFSET_PX
    })
    setActive(current ?? null)
  }, [ids])

  const select = useCallback((id: string) => {
    pinned.current = true
    setActive(id)
  }, [])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(compute)
    }
    // Любое собственное действие пользователя снимает фиксацию после клика по оглавлению.
    const release = () => {
      if (!pinned.current) return
      pinned.current = false
      compute()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) release()
    }

    // Начальное состояние — в следующем кадре, после гидрации и прокрутки браузера к якорю.
    // Пришли по ссылке с якорем — подсвечиваем именно его, даже если раздел короткий.
    frame = requestAnimationFrame(() => {
      const fromHash = decodeURIComponent(window.location.hash.slice(1))
      if (ids.includes(fromHash)) select(fromHash)
      else compute()
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchstart', release, { passive: true })
    // pointerdown срабатывает раньше click: клик по оглавлению сначала снимет фиксацию, а select поставит новую.
    window.addEventListener('pointerdown', release, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchstart', release)
      window.removeEventListener('pointerdown', release)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [ids, compute, select])

  return [active, select]
}
