import styles from './Logo.module.css';

type LogoProps = {
  /** "dark" for light backgrounds, "light" (reversed) for dark green backgrounds. */
  variant?: 'dark' | 'light';
  className?: string;
};

/** Horizontal lockup: brand mark + THURAYA / FOODS TRADING wordmark (kept in English in both languages). */
export function Logo({ variant = 'dark', className }: LogoProps) {
  const src = variant === 'light' ? '/images/thuraya-mark-light.png' : '/images/thuraya-mark.png';
  return (
    <span
      className={[styles.logo, variant === 'light' ? styles.light : '', className].filter(Boolean).join(' ')}
      dir="ltr"
      lang="en"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={48} height={44} className={styles.mark} />
      <span className={styles.wordmark}>
        <span className={styles.name}>Thuraya</span>
        <span className={styles.sub}>Foods Trading</span>
      </span>
    </span>
  );
}
