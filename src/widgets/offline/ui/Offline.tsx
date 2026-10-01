import { photos } from '@/entities/profile'
import { projects } from '@/entities/project'
import { Photo } from '@/shared/ui/photo'
import { Figure, Section } from '@/shared/ui/spec'
import styles from './Offline.module.css'

/** Номер рисунка: портрет, затем скриншоты проектов, затем этот. */
const figureIndex = 2 + projects.filter((project) => project.shot).length

export function Offline() {
  return (
    <Section id="offline">
      <p>Играю в мини-футбол в Национальной мини-футбольной лиге (НМЛ) и в шахматы.</p>

      <Figure index={figureIndex} caption="Уже тогда писал код" className={styles.figure}>
        <div className={styles.frame}>
          <Photo {...photos.childhood} sizes="(width < 40rem) 80vw, 18rem" className={styles.photo} />
          {/* Единственная рукописная пометка на полях — как карандашом на распечатке. */}
          <p className={styles.marginNote} aria-hidden="true">
            это я
          </p>
        </div>
      </Figure>
    </Section>
  )
}
