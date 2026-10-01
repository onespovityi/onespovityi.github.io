import { toggleTheme, useTheme } from '../model/theme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const theme = useTheme()

  return (
    <button
      type="button"
      className={styles.root}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
      </svg>
    </button>
  )
}
