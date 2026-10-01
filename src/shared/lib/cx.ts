/** Склеивает классы, пропуская пустые значения: cx(styles.root, isActive && styles.active). */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
