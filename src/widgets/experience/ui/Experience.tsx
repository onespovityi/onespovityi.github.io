import { cases, type CaseStudy } from '@/entities/case'
import { Section } from '@/shared/ui/spec'
import styles from './Experience.module.css'

export function Experience() {
  return (
    <Section id="experience">
      <p>Коммерческая разработка с 2022 года, от последнего места к первому.</p>
      {cases.map((item) => (
        <CaseSection key={item.slug} item={item} />
      ))}
    </Section>
  )
}

function CaseSection({ item }: { item: CaseStudy }) {
  return (
    <Section id={item.slug}>
      <dl className={styles.meta}>
        <dt>Период</dt>
        <dd>
          {item.period} ({item.duration})
        </dd>
        <dt>Роль</dt>
        <dd>{item.role}</dd>
        <dt>Команда</dt>
        <dd>{item.team}</dd>
        <dt>Область</dt>
        <dd>{item.domain}</dd>
      </dl>

      <p>{item.lead}</p>

      {item.groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <h4 className={styles.groupTitle}>{group.title}</h4>
          <ul className={styles.items}>
            {group.items.map((highlight) => (
              <li key={highlight.title}>
                <strong>{highlight.title}.</strong> {highlight.text}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <table className={styles.results}>
        <caption>Результаты</caption>
        <thead>
          <tr>
            <th scope="col">Значение</th>
            <th scope="col">Показатель</th>
          </tr>
        </thead>
        <tbody>
          {item.metrics.map((metric) => (
            <tr key={metric.label}>
              <td className={styles.value}>{metric.value}</td>
              <td>{metric.label}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.stack}>
        <strong>Стек:</strong> {item.stack.join(', ')}.
      </p>
    </Section>
  )
}
