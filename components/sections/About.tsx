import { Photo } from '@/components/ui/Photo';
import type { Dictionary } from '@/lib/i18n';
import { images } from '@/lib/images';
import styles from './About.module.css';

export function About({ t }: { t: Dictionary }) {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="about-title" className="section-title">
            {t.about.title}
          </h2>
          <p className="section-intro">{t.about.intro}</p>
          <blockquote className={styles.promise}>
            <p>{t.about.promise}</p>
          </blockquote>
        </div>

        <div className={styles.media}>
          <Photo image={images.warehouse} sizes="(min-width: 960px) 40vw, 90vw" className={styles.mainImg} />
          <Photo
            image={images.flourSacks}
            sizes="(min-width: 960px) 20vw, 45vw"
            className={styles.insetImg}
            widths={[400, 600, 900]}
          />
        </div>
      </div>

      <div className={`container ${styles.customers}`}>
        <h3 className={styles.customersTitle}>{t.about.customersTitle}</h3>
        <ul className={styles.customerList}>
          {t.about.customers.map((c) => (
            <li key={c.title}>
              <p className={styles.customerName}>{c.title}</p>
              <p className={styles.customerText}>{c.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
