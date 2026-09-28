import { MessageCircle } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import { whatsappLink } from '@/lib/site';
import styles from './WhatsAppFloat.module.css';

export function WhatsAppFloat({ t }: { t: Dictionary }) {
  return (
    <a
      href={whatsappLink(t.whatsappFloat.message)}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label={t.whatsappFloat.label}
    >
      <MessageCircle size={26} aria-hidden />
      <span className={styles.label}>{t.whatsappFloat.label}</span>
    </a>
  );
}
