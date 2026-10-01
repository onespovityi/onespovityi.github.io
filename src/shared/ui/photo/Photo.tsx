import { cx } from '@/shared/lib/cx'
import styles from './Photo.module.css'

type PhotoProps = {
  /** Имя из scripts/optimize-images.mjs: файлы лежат в /photos/{name}-{width}.{avif,webp}. */
  name: string
  widths: readonly number[]
  alt: string
  /** Пропорции исходного кадра — чтобы место под фото резервировалось до загрузки. */
  width: number
  height: number
  sizes: string
  /** Фото на первом экране: грузим сразу и с высоким приоритетом (влияет на LCP). */
  priority?: boolean
  className?: string
}

export function Photo({ name, widths, alt, width, height, sizes, priority = false, className }: PhotoProps) {
  const srcSet = (format: 'avif' | 'webp') => widths.map((w) => `/photos/${name}-${w}.${format} ${w}w`).join(', ')
  const fallback = `/photos/${name}-${widths[widths.length - 1] ?? widths[0]}.webp`

  return (
    <picture className={cx(styles.root, className)}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        className={styles.image}
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  )
}
