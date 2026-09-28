import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${site.url}/`, ar: `${site.url}/ar` };
  return [
    { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: `${site.url}/ar`, changeFrequency: 'monthly', priority: 0.9, alternates: { languages } },
  ];
}
