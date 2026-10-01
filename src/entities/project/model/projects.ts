import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'tinvest',
    title: 'T-Invest Analytics',
    kind: 'Пет-проект · финансы',
    text: 'Аналитика по моим счетам в Т-Инвестициях: ИИС и брокерский. Показывает то, чего нет в официальном приложении: реальную доходность, ребалансировку, план по ИИС и скринеры облигаций.',
    points: [
      'XIRR, TWR, доходность к погашению, дюрация и максимальная просадка считаются на клиенте',
      'Кеш TanStack Query хранится в IndexedDB, свечи докачиваются только с последней известной даты',
      'Токены не попадают в браузер: запросы идут через прокси, который подставляет их на стороне Node',
    ],
    stack: ['React 19', 'TypeScript', 'TanStack Query', 'IndexedDB', 'React Router 7', 'CSS Modules', 'SVG-графики'],
    links: [{ label: 'Код на GitHub', href: 'https://github.com/onespovityi/tinvest-analytics' }],
  },
  {
    slug: 'ablinaart',
    title: 'Ablina Art',
    kind: 'Коммерческий сайт',
    text: 'Сайт студии рисования в Таганроге: портфолио работ, отзывы, цены, FAQ и запись на занятия. Статический HTML, строгие заголовки безопасности и CSP.',
    points: [],
    stack: ['React 19', 'TypeScript', 'Vite', 'Prerender', 'Netlify'],
    links: [{ label: 'ablinaart.netlify.app', href: 'https://ablinaart.netlify.app' }],
    shot: '/shots/ablinaart.webp',
  },
  {
    slug: 'trip-bot',
    title: 'Бот для командировок',
    kind: 'Внутренний инструмент',
    text: 'Telegram-бот, в котором команда оформляет заявки на командировки. Каждое утро бот сам собирает отчёт в Excel и отправляет его на почту.',
    points: [],
    stack: ['Node.js', 'Telegram Bot API', 'SQLite', 'ExcelJS', 'node-cron', 'Nodemailer'],
    links: [],
  },
]
