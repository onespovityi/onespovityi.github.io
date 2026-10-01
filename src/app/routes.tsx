import type { RouteRecord } from 'vite-react-ssg'
import { HomePage } from '@/pages/home'

export const routes: RouteRecord[] = [
  {
    path: '/',
    children: [
      // Всё на одной странице с оглавлением; якоря и восстановление прокрутки — на стороне браузера.
      { index: true, element: <HomePage /> },
      // Пререндерится в dist/404/index.html, после сборки копируется в dist/404.html для GitHub Pages.
      {
        path: '404',
        lazy: () => import('@/pages/not-found').then(({ NotFoundPage }) => ({ Component: NotFoundPage })),
      },
      { path: '*', lazy: () => import('@/pages/not-found').then(({ NotFoundPage }) => ({ Component: NotFoundPage })) },
    ],
  },
]
