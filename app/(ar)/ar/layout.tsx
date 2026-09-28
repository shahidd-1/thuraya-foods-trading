import type { Metadata, Viewport } from 'next';
import { SiteShell, buildMetadata } from '@/components/layout/SiteShell';

export const metadata: Metadata = buildMetadata('ar');
export const viewport: Viewport = { themeColor: '#0F382E' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="ar">{children}</SiteShell>;
}
