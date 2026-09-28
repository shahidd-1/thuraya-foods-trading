import type { Metadata } from 'next';
import { dictionaries, dirFor, homePath, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';
import { lora, montserrat, plexArabic } from '@/lib/fonts';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import '@/app/globals.css';

export function buildMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: homePath(locale),
      languages: { en: '/', ar: '/ar' },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_QA' : 'en_QA',
      images: ['/images/thuraya-logo.png'],
    },
  };
}

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = dictionaries[locale];
  const fonts = [montserrat.variable, lora.variable, locale === 'ar' ? plexArabic.variable : '']
    .filter(Boolean)
    .join(' ');

  return (
    <html lang={locale} dir={dirFor(locale)} className={fonts}>
      <body>
        <a href="#main" className="skip-link">
          {t.a11y.skip}
        </a>
        <Navbar locale={locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}
