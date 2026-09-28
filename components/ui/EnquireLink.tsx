'use client';

import { ENQUIRE_EVENT } from '@/lib/events';

type EnquireLinkProps = {
  category: string;
  className?: string;
  children: React.ReactNode;
};

/** Jumps to the enquiry form and preselects the product category. */
export function EnquireLink({ category, className, children }: EnquireLinkProps) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(ENQUIRE_EVENT, { detail: category }))}
    >
      {children}
    </a>
  );
}
