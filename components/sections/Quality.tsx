import { Photo } from '@/components/ui/Photo';
import type { Dictionary } from '@/lib/i18n';
import { images } from '@/lib/images';
import styles from './Quality.module.css';

export function Quality({ t }: { t: Dictionary }) {
  return (
    <section id="quality" className="section" aria-labelledby="quality-title">
      <div className={`container ${styles.grid}`}>
        <Photo
          image={images.inspection}
          sizes="(min-width: 960px) 45vw, 90vw"
          className={styles.img}
        />
        <div>
          <h2 id="quality-title" className="section-title">
            {t.quality.title}
          </h2>
          <p className="section-intro">{t.quality.intro}</p>
          <dl className={styles.points}>
            {t.quality.points.map((point) => (
              <div key={point.title} className={styles.point}>
                <dt>{point.title}</dt>
                <dd>{point.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
