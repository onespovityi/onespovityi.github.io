import type { SectionId } from '@/shared/config'

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  /** Совпадает с id раздела в оглавлении. */
  slug: SectionId
  title: string
  kind: string
  text: string
  points: string[]
  stack: string[]
  links: ProjectLink[]
  /** Скриншот живого сайта, если проект можно открыть. */
  shot?: string
}
