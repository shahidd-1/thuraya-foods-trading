import { Photo } from '@/components/ui/Photo';
import { heroIcons } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n';
import { images } from '@/lib/images';
import styles from './Hero.module.css';

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <Photo image={images.dohaSkyline} sizes="100vw" priority className={styles.bg} widths={[800, 1200, 1800, 2400]} />
      <div className={styles.shade} aria-hidden />

      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>{t.hero.kicker}</p>
        <h1 id="hero-title" className={styles.title}>
          {t.hero.title[0]}
          <br />
          {t.hero.title[1]}
        </h1>
        <span className={styles.rule} aria-hidden />
        <p className={styles.lead}>{t.hero.lead}</p>
        <div className={styles.ctas}>
          <a href="#products" className="btn btn-accent">
            {t.hero.primary}
          </a>
          <a href="#contact" className="btn btn-ghost-light">
            {t.hero.secondary}
          </a>
        </div>
      </div>

      <div className={styles.strip}>
        <ul className={`container ${styles.points}`}>
          {t.hero.points.map(({ title, text }, i) => {
            const Icon = heroIcons[i];
            return (
              <li key={title} className={styles.point}>
                <Icon size={22} aria-hidden className={styles.icon} />
                <div>
                  <p className={styles.pointTitle}>{title}</p>
                  <p className={styles.pointText}>{text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
