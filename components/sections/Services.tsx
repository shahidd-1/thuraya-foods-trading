import { Photo } from '@/components/ui/Photo';
import { serviceIcons } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n';
import { images } from '@/lib/images';
import styles from './Services.module.css';

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="services" className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <h2 id="services-title" className={`section-title ${styles.title}`}>
            {t.services.title}
          </h2>
          <p className={`section-intro ${styles.introText}`}>{t.services.intro}</p>
          <Photo image={images.loading} sizes="(min-width: 960px) 40vw, 90vw" className={styles.img} />
        </div>

        <ul className={styles.list}>
          {t.services.items.map(({ title, description }, i) => {
            const Icon = serviceIcons[i];
            return (
              <li key={title} className={styles.item}>
                <Icon size={28} aria-hidden className={styles.icon} />
                <h3 className={styles.itemTitle}>{title}</h3>
                <p className={styles.itemText}>{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
