import { Mail, MapPin, Phone } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import { mailtoLink, site } from '@/lib/site';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

type Detail = {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  ltr?: boolean;
};

export function Contact({ t }: { t: Dictionary }) {
  const details: Detail[] = [
    { icon: Phone, label: t.contact.callLabel, value: site.contact.phoneDisplay, href: site.contact.phoneHref, ltr: true },
    { icon: Mail, label: t.contact.emailLabel, value: site.contact.email, href: mailtoLink(t.email.subject), ltr: true },
    { icon: MapPin, label: t.contact.locationLabel, value: t.location.address, href: site.contact.mapsUrl, external: true },
  ];

  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="contact-title" className={`section-title ${styles.title}`}>
            {t.contact.title}
          </h2>
          <p className={`section-intro ${styles.intro}`}>{t.contact.intro}</p>

          <ul className={styles.details}>
            {details.map(({ icon: Icon, label, value, href, external, ltr }) => (
              <li key={label} className={styles.detail}>
                <span className={styles.iconWrap}>
                  <Icon size={20} aria-hidden />
                </span>
                <div>
                  <p className={styles.detailLabel}>{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className={styles.detailValue}
                      dir={ltr ? 'ltr' : undefined}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className={styles.detailValue}>{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm t={t} />
      </div>
    </section>
  );
}
