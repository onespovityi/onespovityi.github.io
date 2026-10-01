import { photos } from '@/entities/profile'
import { Photo } from '@/shared/ui/photo'
import { Figure, Note, Section } from '@/shared/ui/spec'
import styles from './About.module.css'

export function About() {
  return (
    <Section id="about">
      <Figure index={1} caption="Это я." className={styles.portrait}>
        <Photo {...photos.portrait} sizes="(width < 40rem) 100vw, 15rem" priority className={styles.photo} />
      </Figure>

      <p>
        Я фронтенд-разработчик, пишу на React и TypeScript с 2022 года. Последние два года вёл фронтенд-команду из
        четырёх человек в Смородине, сервисе автопутешествий: оценивал и распределял задачи, выпускал релизы, проводил
        технические собеседования.
      </p>
      <p>
        Мои сильные стороны — производительность и работа с легаси. Перевёл сборку с Webpack на Vite, и она стала идти
        30 секунд вместо нескольких минут. Занимался Core Web Vitals, переводил проекты на TypeScript, не останавливая
        разработку, покрывал тестами критичную бизнес-логику.
      </p>

      <Section id="approach">
        <p>
          Довожу задачи до конца. Перед началом задаю много уточняющих вопросов, чтобы покрыть все области задачи
          целиком.
        </p>
        <Note>
          <p>Вопросов действительно будет много.</p>
        </Note>
      </Section>

      <Section id="looking">
        <p>
          Хочу в хорошую команду на сильный проект — и просто работать. Полная занятость, Москва или удалённо. Живу в
          Таганроге, к переезду готов.
        </p>
      </Section>
    </Section>
  )
}
