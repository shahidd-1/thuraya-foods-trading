import { ar } from './ar';
import { en, type Dictionary } from './en';

export type Locale = 'en' | 'ar';
export type { Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const homePath = (locale: Locale) => (locale === 'ar' ? '/ar' : '/');
export const otherLocale = (locale: Locale): Locale => (locale === 'ar' ? 'en' : 'ar');
export const dirFor = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');
