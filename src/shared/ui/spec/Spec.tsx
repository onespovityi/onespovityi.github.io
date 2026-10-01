import type { ReactNode } from 'react'
import { section, type SectionId } from '@/shared/config'
import { cx } from '@/shared/lib/cx'
import styles from './Spec.module.css'

/* Примитивы в стиле технической спецификации: разделы с номерами, примечания, рисунки. */

type HeadingProps = {
  level: 2 | 3
  id: string
  /** Куда ведёт «§»: id раздела, к которому относится заголовок. */
  anchor: string
  /** Номер раздела: «2», «4.1». Пусто — для ненумерованных разделов. */
  number?: string
  children: string
}

/** Заголовок раздела с номером и якорем «§» на полях, как в спецификациях W3C. */
function Heading({ level, id, anchor, number, children }: HeadingProps) {
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <Tag id={id} className={cx(styles.heading, level === 2 ? styles.h2 : styles.h3)}>
      {number && <span className={styles.secno}>{number}. </span>}
      {children}
      <a className={styles.selfLink} href={`#${anchor}`} aria-label={`Ссылка на раздел «${children}»`}>
        §
      </a>
    </Tag>
  )
}

type SectionProps = {
  id: SectionId
  children: ReactNode
  className?: string
}

/**
 * Раздел документа: номер и заголовок берутся из оглавления, уровень — из глубины номера.
 * id стоит на самом <section>, а не на заголовке: так подсветка в оглавлении видит весь раздел целиком.
 */
export function Section({ id, children, className }: SectionProps) {
  const { number, title } = section(id)
  const level = number?.includes('.') ? 3 : 2
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <Heading level={level} id={`${id}-title`} anchor={id} number={number}>
        {title}
      </Heading>
      {children}
    </section>
  )
}

type BoxProps = {
  children: ReactNode
  className?: string
}

/** Ненормативное примечание: зелёная плашка с меткой. */
export function Note({ children, className }: BoxProps) {
  return (
    <aside className={cx(styles.note, className)}>
      <p className={styles.noteLabel}>Примечание</p>
      {children}
    </aside>
  )
}

type FigureProps = {
  index: number
  caption: ReactNode
  children: ReactNode
  className?: string
}

/** Пронумерованный рисунок с подписью «Рисунок 1. …». */
export function Figure({ index, caption, children, className }: FigureProps) {
  return (
    <figure className={cx(styles.figure, className)}>
      {children}
      <figcaption className={styles.figcaption}>
        <span className={styles.figno}>Рисунок {index}.</span> {caption}
      </figcaption>
    </figure>
  )
}
