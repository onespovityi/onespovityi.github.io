import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cx } from '@/shared/lib/cx'
import styles from './CopyEmailButton.module.css'

type CopyEmailButtonProps = {
  email: string
  className?: string
}

const RESET_AFTER_MS = 2000

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => {
      setCopied(false)
    }, RESET_AFTER_MS)
    return () => {
      clearTimeout(timer)
    }
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // Буфер обмена недоступен (нет HTTPS или запрещено) — остаётся обычная ссылка mailto.
    }
  }

  return (
    <>
      <button type="button" className={cx(styles.root, copied && styles.copied, className)} onClick={() => void copy()}>
        {/* Обе иконки в DOM, видимую меняем кроссфейдом: масштаб, прозрачность и размытие. */}
        <span className={styles.icon} aria-hidden="true">
          <Copy size={14} className={styles.iconCopy} />
          <Check size={14} className={styles.iconCheck} />
        </span>
        {copied ? 'Скопировано' : 'Копировать'}
        {!copied && <span className={styles.visuallyHidden}> адрес почты</span>}
      </button>
      {/* Стабильная живая область: она уже есть в DOM, меняется только текст — так объявление надёжно. */}
      <span role="status" className={styles.visuallyHidden}>
        {copied ? 'Адрес почты скопирован' : ''}
      </span>
    </>
  )
}
