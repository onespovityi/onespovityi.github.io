import { ThemeToggle } from '@/features/toggle-theme'
import { site } from '@/shared/config'
import styles from './DocumentHeader.module.css'

const updated = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${__BUILD_DATE__}T00:00:00Z`))

/** Шапка страницы: имя, роль и короткие сведения списком определений. */
export function DocumentHeader() {
  return (
    <header className={styles.root}>
      <div className={styles.top}>
        <a href="/" className={styles.logo} aria-label={`${site.name}, на главную`}>
          ОН
        </a>
        <ThemeToggle />
      </div>

      <h1 className={styles.title}>{site.name}</h1>
      <p className={styles.subtitle}>Фронтенд-разработчик · React, TypeScript</p>

      <dl className={styles.meta}>
        <dt>Город:</dt>
        <dd>Таганрог, готов к переезду в Москву</dd>
        <dt>Формат:</dt>
        <dd>полная занятость, удалённо или в офисе</dd>
        <dt>Связь:</dt>
        <dd>
          <a href={site.telegram}>Telegram {site.telegramHandle}</a>, <a href={`mailto:${site.email}`}>{site.email}</a>,{' '}
          <a href={site.github}>GitHub</a>
        </dd>
        <dt>Обновлено:</dt>
        <dd>
          <time dateTime={__BUILD_DATE__}>{updated}</time>
        </dd>
      </dl>
    </header>
  )
}
