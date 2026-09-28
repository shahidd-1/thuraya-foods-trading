import type { Dictionary } from '@/lib/i18n';
import styles from './Process.module.css';

export function Process({ t }: { t: Dictionary }) {
  return (
    <section className="section" aria-labelledby="process-title">
      <div className="container">
        <h2 id="process-title" className="section-title">
          {t.process.title}
        </h2>
        <p className="section-intro">{t.process.intro}</p>

        <ol className={styles.steps}>
          {t.process.steps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.num} aria-hidden>
                {i + 1}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
