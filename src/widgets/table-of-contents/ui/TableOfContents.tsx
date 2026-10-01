import { outline, sectionIds, type OutlineItem } from '@/shared/config'
import { cx } from '@/shared/lib/cx'
import { useActiveSection } from '@/shared/lib/use-active-section'
import styles from './TableOfContents.module.css'

/** Оглавление: на широком экране висит слева, на узком стоит в потоке после шапки. */
export function TableOfContents() {
  const [active, select] = useActiveSection(sectionIds)

  const renderItems = (items: readonly OutlineItem[]) => (
    <ol className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={cx(styles.link, active === item.id && styles.active)}
            aria-current={active === item.id ? 'location' : undefined}
            onClick={() => {
              select(item.id)
            }}
          >
            {item.number && <span className={styles.secno}>{item.number}</span>}
            {item.title}
          </a>
          {item.children && renderItems(item.children)}
        </li>
      ))}
    </ol>
  )

  return (
    <nav className={styles.root} aria-labelledby="toc-title">
      <h2 id="toc-title" className={styles.title}>
        Содержание
      </h2>
      {renderItems(outline)}
    </nav>
  )
}
