import { CopyEmailButton } from '@/features/copy-email'
import { site } from '@/shared/config'
import { Section } from '@/shared/ui/spec'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <Section id="contact">
      <p>Быстрее всего отвечаю в Telegram. Резюме пришлю по запросу.</p>
      <dl className={styles.channels}>
        <dt>Telegram</dt>
        <dd>
          <a href={site.telegram}>{site.telegramHandle}</a>
        </dd>
        <dt>Почта</dt>
        <dd className={styles.email}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <CopyEmailButton email={site.email} />
        </dd>
        <dt>GitHub</dt>
        <dd>
          <a href={site.github}>github.com/{site.githubHandle}</a>
        </dd>
      </dl>
    </Section>
  )
}
