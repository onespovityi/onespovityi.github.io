/** Небольшие репозитории с GitHub: тестовые задания, учебные и пет-проекты. Описания — по исходному коду. */
export type Repo = {
  name: string
  text: string
  stack: string
}

const GITHUB = 'https://github.com/onespovityi'

export const repos: (Repo & { href: string })[] = [
  {
    name: 'DummyApp',
    text: 'Вход через DummyJSON API с уведомлениями об ошибках.',
    stack: 'React, TypeScript, Redux Toolkit, PrimeReact',
  },
  {
    name: 'skills_checker',
    text: 'Тестовое задание Valantis: каталог товаров из API с подписью запросов через md5, поиск по выбранному полю, пагинация.',
    stack: 'React, TypeScript, Redux Toolkit',
  },
  {
    name: 'cryptocurrency-conversion',
    text: 'Конвертер Bitcoin, Ethereum и Tether по курсам CoinCap API.',
    stack: 'React, TypeScript, Axios',
  },
  {
    name: 'currency-pair-rates',
    text: 'Таблица курсов валютных пар, которая опрашивает три источника данных.',
    stack: 'React, TypeScript, Axios',
  },
  {
    name: 'React-admin',
    text: 'Админ-панель на React Admin с данными из JSONPlaceholder.',
    stack: 'React Admin, TypeScript',
  },
  {
    name: 'my-app-nextjs',
    text: 'Сайт на Next.js App Router: блог, портфолио, регистрация и вход через NextAuth, посты в MongoDB, тёмная тема.',
    stack: 'Next.js, NextAuth, Mongoose, SWR',
  },
  {
    name: 'countries-api-app',
    text: 'Справочник стран: список карточек и отдельная страница для каждой страны.',
    stack: 'Next.js, TypeScript, Tailwind CSS',
  },
  {
    name: 'star-wars',
    text: 'Персонажи «Звёздных войн»: фильтр по цвету глаз, пагинация, карточка в модальном окне, перевод интерфейса.',
    stack: 'React, MUI, i18next, React Router',
  },
  {
    name: 'calculator',
    text: 'Калькулятор.',
    stack: 'React, TypeScript, MUI',
  },
  {
    name: 'stickerSmash-react-native',
    text: 'Учебное приложение на Expo: выбор фото из галереи, стикеры, сохранение картинки.',
    stack: 'React Native, Expo',
  },
].map((repo) => ({ ...repo, href: `${GITHUB}/${repo.name}` }))
