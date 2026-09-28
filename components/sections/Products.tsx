import { Photo } from '@/components/ui/Photo';
import { EnquireLink } from '@/components/ui/EnquireLink';
import { productImages } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n';
import styles from './Products.module.css';

export function Products({ t }: { t: Dictionary }) {
  return (
    <section id="products" className={`section ${styles.section}`} aria-labelledby="products-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <h2 id="products-title" className="section-title">
              {t.products.title}
            </h2>
            <p className="section-intro">{t.products.intro}</p>
          </div>
          <a href="#contact" className="btn btn-secondary">
            {t.products.cta}
          </a>
        </div>

        <ul className={styles.grid}>
          {t.products.items.map((product) => (
            <li key={product.key} className={styles.card}>
              <div className={styles.imgWrap}>
                <Photo
                  image={productImages[product.key]}
                  sizes="(min-width: 1080px) 280px, (min-width: 640px) 45vw, 90vw"
                  className={styles.img}
                  widths={[400, 600, 900]}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.examples}>
                  <span className="sr-only">{t.products.includes} </span>
                  {product.examples.join(t.listSeparator)}
                </p>
                <EnquireLink category={product.key} className={styles.enquire}>
                  {t.products.enquire}
                </EnquireLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
