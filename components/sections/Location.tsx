import { Mail, MapPin, Phone } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import type { Dictionary } from '@/lib/i18n';
import { images } from '@/lib/images';
import { mailtoLink, site } from '@/lib/site';
import styles from './Location.module.css';

export function Location({ t }: { t: Dictionary }) {
  return (
    <section id="location" className={`section ${styles.section}`} aria-labelledby="location-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="location-title" className="section-title">
            {t.location.title}
          </h2>
          <p className="section-intro">{t.location.intro}</p>

          <dl className={styles.facts}>
            <div>
              <dt>{t.location.addressLabel}</dt>
              <dd>{t.location.address}</dd>
            </div>
            <div>
              <dt>{t.location.ordersLabel}</dt>
              <dd>{t.location.orders}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <a href={mailtoLink(t.email.subject)} className="btn btn-primary">
              <Mail size={18} aria-hidden />
              {t.location.email}
            </a>
            <a href={site.contact.phoneHref} className="btn btn-secondary">
              <Phone size={18} aria-hidden />
              {t.location.call}
            </a>
          </div>
          <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.maps}>
            <MapPin size={18} aria-hidden />
            {t.location.maps}
          </a>
        </div>

        <div className={styles.panel}>
          <Photo image={images.dohaNight} sizes="(min-width: 960px) 50vw, 90vw" className={styles.panelImg} />
          <div className={styles.panelShade} aria-hidden />
          <div className={styles.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/thuraya-mark-light.png" alt="" width={64} height={59} className={styles.mark} />
            <p className={styles.cardName}>{t.brandName}</p>
            <p className={styles.cardAddress}>{t.location.address}</p>
            <p className={styles.cardPhone} dir="ltr">
              {site.contact.phoneDisplay}
            </p>
            <p className={styles.cardEmail} dir="ltr">
              {site.contact.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
