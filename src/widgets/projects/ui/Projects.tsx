import { projects, repos, type Project } from '@/entities/project'
import { Figure, Section } from '@/shared/ui/spec'
import styles from './Projects.module.css'

/** Рисунок 1 — портрет в разделе «Обо мне», дальше по порядку скриншоты проектов. */
const FIRST_FIGURE = 2
const withShots = projects.filter((project) => project.shot)

export function Projects() {
  return (
    <Section id="projects">
      <p>Пет-проекты и сайты, которые я сделал сам, плюс тестовые задания и учебные репозитории.</p>
      {projects.map((project) => (
        <ProjectSection key={project.slug} project={project} figureIndex={FIRST_FIGURE + withShots.indexOf(project)} />
      ))}
      <Repos />
    </Section>
  )
}

/** Мелкие репозитории одной таблицей: живые демо на Vercel и Netlify уже не открываются, поэтому только код. */
function Repos() {
  return (
    <Section id="repos">
      <table className={styles.repos}>
        <thead>
          <tr>
            <th scope="col">Репозиторий</th>
            <th scope="col">Что это</th>
            <th scope="col">Стек</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.name}>
              <td>
                <a href={repo.href}>{repo.name}</a>
              </td>
              <td>{repo.text}</td>
              <td className={styles.repoStack}>{repo.stack}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.more}>
        Остальное — на <a href="https://github.com/onespovityi">GitHub</a>.
      </p>
    </Section>
  )
}

function ProjectSection({ project, figureIndex }: { project: Project; figureIndex: number }) {
  return (
    <Section id={project.slug}>
      <p className={styles.kind}>{project.kind}</p>
      <p>{project.text}</p>
      {project.points.length > 0 && (
        <ul className={styles.points}>
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      {project.shot && (
        <Figure index={figureIndex} caption={`Главная страница ${project.links[0]?.label ?? project.title}.`}>
          <img
            className={styles.shot}
            src={project.shot}
            alt={`Главная страница сайта ${project.title}`}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
          />
        </Figure>
      )}

      <p className={styles.footer}>
        <strong>Стек:</strong> {project.stack.join(', ')}.
        {project.links.map((link) => (
          <span key={link.href}>
            {' '}
            <a href={link.href}>{link.label}</a>.
          </span>
        ))}
      </p>
    </Section>
  )
}
