import { Mail, MapPin, Phone } from 'lucide-react';
import { homePath, otherLocale, type Dictionary, type Locale } from '@/lib/i18n';
import { navIds, site } from '@/lib/site';
import { Logo } from './Logo';
import styles from './Footer.module.css';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();
  const switchLocale = otherLocale(locale);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Logo variant="light" />
          <p className={styles.legal}>{site.legalName[locale === 'ar' ? 'ar' : 'en']}</p>
          <p className={styles.about}>{t.footer.about}</p>
          <p className={styles.tagline}>{t.hero.kicker}</p>
        </div>

        <nav aria-labelledby="footer-explore" className={styles.col}>
          <h2 id="footer-explore" className={styles.heading}>
            {t.footer.explore}
          </h2>
          <ul className={styles.list}>
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-products" className={styles.col}>
          <h2 id="footer-products" className={styles.heading}>
            {t.footer.products}
          </h2>
          <ul className={styles.list}>
            {t.products.items.map((p) => (
              <li key={p.key}>
                <a href="#products">{p.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>{t.footer.contact}</h2>
          <ul className={`${styles.list} ${styles.contact}`}>
            <li>
              <MapPin size={18} aria-hidden />
              <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                {t.location.address}
              </a>
            </li>
            <li>
              <Phone size={18} aria-hidden />
              <a href={site.contact.phoneHref} dir="ltr">
                {site.contact.phoneDisplay}
              </a>
            </li>
            {site.contact.email && (
              <li>
                <Mail size={18} aria-hidden />
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
            )}
          </ul>
          <a href="#contact" className={`btn btn-accent ${styles.cta}`}>
            {t.footer.cta}
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>
            © {year} {site.legalName[locale]}. {t.footer.rights} {t.footer.cr} {site.crNumber}
          </p>
          <div className={styles.bottomLinks}>
            <a href={homePath(switchLocale)} hrefLang={switchLocale} lang={switchLocale}>
              {t.nav.switchTo}
            </a>
            <a href="#home">{t.footer.backToTop}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
