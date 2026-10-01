import type { SectionId } from '@/shared/config'

/** Измеримый результат: «+25%» и пояснение. */
export type Metric = {
  value: string
  label: string
}

export type CaseHighlight = {
  title: string
  text: string
}

export type CaseGroup = {
  title: string
  items: CaseHighlight[]
}

export type CaseStudy = {
  /** Совпадает с id раздела в оглавлении. */
  slug: SectionId
  company: string
  period: string
  duration: string
  role: string
  team: string
  domain: string
  /** Одна строка для списка на главной. */
  summary: string
  /** Вводный абзац на странице кейса. */
  lead: string
  metrics: Metric[]
  groups: CaseGroup[]
  stack: string[]
}
