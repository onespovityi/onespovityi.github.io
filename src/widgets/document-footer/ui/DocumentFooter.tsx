import { site } from '@/shared/config'
import styles from './DocumentFooter.module.css'

export function DocumentFooter() {
  return (
    <footer className={styles.root}>
      <p>
        Сайт собран на React 19, TypeScript и Vite и заранее отрисован в статический HTML.{' '}
        <a href={site.source}>Исходный код</a> открыт.
      </p>
    </footer>
  )
}
