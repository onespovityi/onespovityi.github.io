/** Стек по группам — раздел «7. Стек» оформлен как список определений. */
export const skills: { title: string; items: string[] }[] = [
  { title: 'Основа', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { title: 'Состояние и данные', items: ['Redux Toolkit', 'RTK Query', 'TanStack Query', 'REST API', 'GraphQL'] },
  { title: 'Сборка', items: ['Vite', 'Webpack', 'Next.js', 'SSG', 'Node.js', 'Git'] },
  { title: 'Интерфейс', items: ['CSS Modules', 'Sass / SCSS', 'MUI', 'PrimeReact', 'React Admin'] },
  { title: 'Качество', items: ['Jest', 'React Testing Library', 'Core Web Vitals', 'Lighthouse'] },
  { title: 'Продукт', items: ['GA4', 'Яндекс.Метрика', 'A/B-тесты', 'техническое SEO', 'Яндекс.Карты API'] },
]

export const photos = {
  portrait: {
    name: 'portrait',
    widths: [480, 800, 1200],
    width: 1400,
    height: 1750,
    alt: 'Олег на галечном пляже у моря, вечер',
  },
  childhood: {
    name: 'childhood',
    widths: [480, 865],
    width: 865,
    height: 953,
    alt: 'Олег в детстве за компьютером с ЭЛТ-монитором',
  },
} as const
