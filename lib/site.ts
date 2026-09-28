// Central brand + contact config (not translated).
export const site = {
  name: { en: 'Thuraya Foods Trading', ar: 'ثريا فودز للتجارة' },
  legalName: { en: 'Thuraya Foods Trading W.L.L.', ar: 'ثريا فودز للتجارة ذ.م.م' },
  crNumber: '251064',
  url: 'https://thurayafoodstrading.com',
  contact: {
    phoneDisplay: '+974 5560 8832',
    phoneHref: 'tel:+97455608832',
    email: 'contact@thurayafoodstrading.com',
    // TODO: replace with the exact Google Maps pin link once the Google Business Profile exists.
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Thuraya+Foods+Trading+Salwa+Road+Doha',
  },
} as const;

export const navIds = ['home', 'about', 'products', 'services', 'location', 'quality', 'contact'] as const;
export type NavId = (typeof navIds)[number];

export const mailtoLink = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${site.contact.email}${query ? `?${query}` : ''}`;
};
