/**
 * Оглавление страницы — единый источник номеров и заголовков разделов.
 * Из него строятся и боковое оглавление, и заголовки самих разделов.
 */
export type OutlineItem = {
  id: string
  number?: string
  title: string
  children?: OutlineItem[]
}

export const outline = [
  {
    id: 'about',
    number: '1',
    title: 'Обо мне',
    children: [
      { id: 'approach', number: '1.1', title: 'Как я работаю' },
      { id: 'looking', number: '1.2', title: 'Что ищу' },
    ],
  },
  {
    id: 'experience',
    number: '2',
    title: 'Опыт работы',
    children: [
      { id: 'smorodina', number: '2.1', title: 'Смородина' },
      { id: 'ab-trade', number: '2.2', title: 'Ab-Trade' },
      { id: 'octopus-lab', number: '2.3', title: 'Octopus Lab' },
    ],
  },
  {
    id: 'projects',
    number: '3',
    title: 'Проекты',
    children: [
      { id: 'tinvest', number: '3.1', title: 'T-Invest Analytics' },
      { id: 'ablinaart', number: '3.2', title: 'Ablina Art' },
      { id: 'trip-bot', number: '3.3', title: 'Бот для командировок' },
      { id: 'repos', number: '3.4', title: 'Тестовые и учебные' },
    ],
  },
  { id: 'stack', number: '4', title: 'Стек' },
  { id: 'offline', number: '5', title: 'Вне работы' },
  { id: 'contact', number: '6', title: 'Контакты' },
] as const satisfies readonly OutlineItem[]

type Flatten<T> = T extends { children: readonly (infer C)[] } ? T | C : T
export type SectionId = Flatten<(typeof outline)[number]>['id']

const flat: OutlineItem[] = outline.flatMap((item: OutlineItem) => [item, ...(item.children ?? [])])

/** Номер и заголовок раздела по id — чтобы виджеты не дублировали тексты оглавления. */
export function section(id: SectionId): OutlineItem {
  const found = flat.find((item) => item.id === id)
  if (!found) throw new Error(`Нет раздела ${id} в оглавлении`)
  return found
}

/** Все id по порядку — для подсветки текущего раздела в оглавлении. */
export const sectionIds: readonly string[] = flat.map((item) => item.id)
