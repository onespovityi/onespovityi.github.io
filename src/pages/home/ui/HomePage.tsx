import { site } from '@/shared/config'
import { Seo } from '@/shared/ui/seo'
import { About } from '@/widgets/about'
import { Contact } from '@/widgets/contact'
import { DocumentFooter } from '@/widgets/document-footer'
import { DocumentHeader } from '@/widgets/document-header'
import { Experience } from '@/widgets/experience'
import { Offline } from '@/widgets/offline'
import { Projects } from '@/widgets/projects'
import { Stack } from '@/widgets/stack'
import { TableOfContents } from '@/widgets/table-of-contents'
import styles from './HomePage.module.css'

/**
 * Порядок в DOM как в спецификации: шапка, затем оглавление, затем разделы.
 * На широком экране оглавление уезжает в левую колонку и прилипает к верху.
 */
export function HomePage() {
  return (
    <main id="main" className={styles.layout}>
      <Seo
        title={`${site.name}: фронтенд-разработчик`}
        description="Фронтенд-разработчик на React и TypeScript: опыт в Смородине, Ab-Trade и Octopus Lab, пет-проекты и тестовые задания."
      />
      <div className={styles.head}>
        <DocumentHeader />
      </div>
      <div className={styles.toc}>
        <TableOfContents />
      </div>
      <div className={styles.body}>
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Offline />
        <Contact />
        <DocumentFooter />
      </div>
    </main>
  )
}
