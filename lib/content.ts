// Non-text data that pairs with the translated copy in lib/i18n.
import type { LucideIcon } from 'lucide-react';
import { BadgePercent, Handshake, Leaf, PackageCheck, Phone, ShieldCheck } from 'lucide-react';
import { images, type StockImage } from './images';

export const productImages: Record<string, StockImage> = {
  vegetables: images.vegetables,
  meat: images.meat,
  fish: images.fish,
  groceries: images.groceries,
};

// Same order as hero.points / services.items in the dictionaries
export const heroIcons: LucideIcon[] = [Handshake, Leaf, BadgePercent];
export const serviceIcons: LucideIcon[] = [Handshake, PackageCheck, Phone, ShieldCheck];
