import { site } from '@/shared/config'
import { Seo } from '@/shared/ui/seo'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <main className={styles.root}>
      <Seo title={`Страница не найдена — ${site.name}`} description="Такой страницы нет." path="/404/" noindex />
      <p className={styles.code}>Ошибка 404</p>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p>Возможно, ссылка устарела или в адресе опечатка.</p>
      <p>
        <a href="/">На главную</a>
      </p>
    </main>
  )
}
