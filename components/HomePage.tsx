import { dictionaries, type Locale } from '@/lib/i18n';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Products } from './sections/Products';
import { Services } from './sections/Services';
import { Process } from './sections/Process';
import { Location } from './sections/Location';
import { Quality } from './sections/Quality';
import { Contact } from './sections/Contact';

export function HomePage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <>
      <Hero t={t} />
      <About t={t} />
      <Products t={t} />
      <Services t={t} />
      <Process t={t} />
      <Location t={t} />
      <Quality t={t} />
      <Contact t={t} />
    </>
  );
}
