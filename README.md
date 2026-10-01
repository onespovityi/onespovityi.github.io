# Портфолио — Олег Несповитый

Сайт-портфолио фронтенд-разработчика. Оформлен в стиле технических спецификаций (W3C, ECMA-262): оглавление сбоку, пронумерованные разделы, примечания и рисунки с подписями.

**Стек:** React 19, TypeScript, Vite, `vite-react-ssg` (страница заранее собирается в статический HTML), CSS Modules на чистом CSS, Feature-Sliced Design. Шрифты: Literata (текст), Geist (заголовки), Caveat (пометка на полях). Иконки — [Lucide](https://lucide.dev).

## Команды

```bash
npm install
npm run dev          # разработка, http://localhost:5173
npm run build        # типы → статическая сборка в dist/ → 404.html и sitemap.xml
npm run preview      # посмотреть собранный dist/
npm run lint         # ESLint + Stylelint
npm run format       # Prettier
npm run shots        # обновить скриншоты живых проектов в public/shots/
npm run images       # пересобрать фото из assets-src/photos/ в AVIF/WebP (public/photos/)
npm run check:toc    # проверить оглавление кликами в Chrome (нужен запущенный npm run preview)
```

Перед коммитом husky запускает lint-staged и проверку типов.

## Структура (FSD)

```
src/
  app/        точка входа, маршруты, дизайн-токены и глобальные стили
  pages/      home, not-found
  widgets/    document-header, table-of-contents, about, experience, projects, stack, offline, contact, document-footer
  features/   toggle-theme, copy-email
  entities/   case, project, profile — данные
  shared/     config (контакты, оглавление), lib (cx, use-active-section), ui: spec, photo, seo
```

Слайсы импортируются только через свой `index.ts`, за этим следит ESLint.

## Где править тексты

- оглавление, номера и заголовки разделов: `src/shared/config/outline.ts`
- тексты разделов: `src/widgets/*` (по виджету на раздел)
- опыт работы: `src/entities/case/model/cases.ts`
- проекты: `src/entities/project/model/projects.ts`
- стек и фото: `src/entities/profile/model/profile.ts`
- контакты и адрес сайта: `src/shared/config/site.ts`

Примитивы оформления (`Section`, `Note`, `Figure`) лежат в `src/shared/ui/spec`. `Section` сам берёт номер и заголовок из оглавления.

## Фото

Исходники лежат в `assets-src/photos/` и в репозиторий не попадают (см. `.gitignore`): в репозитории только готовые кадры в `public/photos/`. Кадрирование и размеры задаются в `scripts/optimize-images.mjs`. Компонент `Photo` отдаёт `<picture>` с AVIF и WebP и `srcset` под ширину экрана.

## Стили

Дизайн-токены (цвета, типографика, отступы) лежат в `src/app/styles/tokens.css`. Цвета заданы через `light-dark()`: тема следует за системой, а кнопка в шапке запоминает выбор. Стили компонента лежат рядом с ним в `*.module.css`.

## Деплой

GitHub Pages через `.github/workflows/deploy.yml`: push в `main` запускает линтеры и сборку, затем публикует сайт.

1. Создать репозиторий `onespovityi.github.io` и запушить код.
2. Settings → Pages → Source: **GitHub Actions**.
3. Для своего домена: добавить `public/CNAME` с доменом и поменять `url` в `src/shared/config/site.ts`, `SITE_URL` в `scripts/postbuild.mjs` и ссылку на sitemap в `public/robots.txt`.
