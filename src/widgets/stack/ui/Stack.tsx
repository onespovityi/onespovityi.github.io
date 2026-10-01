import { skills } from '@/entities/profile'
import { Section } from '@/shared/ui/spec'
import styles from './Stack.module.css'

export function Stack() {
  return (
    <Section id="stack">
      <dl className={styles.list}>
        {skills.map((group) => (
          <div key={group.title} className={styles.row}>
            <dt>{group.title}</dt>
            <dd>{group.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
