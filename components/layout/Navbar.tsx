'use client';

import { useEffect, useState } from 'react';
import { Languages, Menu, Phone, X } from 'lucide-react';
import { homePath, otherLocale, type Dictionary, type Locale } from '@/lib/i18n';
import { navIds, site } from '@/lib/site';
import { Logo } from './Logo';
import styles from './Navbar.module.css';

type NavbarProps = { locale: Locale; t: Dictionary };

export function Navbar({ locale, t }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const switchLocale = otherLocale(locale);

  // Border/shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav item for the section in view
  useEffect(() => {
    const sections = navIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape, close when resized to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const desktop = window.matchMedia('(min-width: 1080px)');
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  const langSwitch = (className: string) => (
    <a href={homePath(switchLocale)} hrefLang={switchLocale} lang={switchLocale} className={className}>
      <Languages size={18} aria-hidden />
      {t.nav.switchTo}
    </a>
  );

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <div className={`container ${styles.bar}`}>
        <a href="#home" className={styles.brand} aria-label={`${site.name[locale]}, ${t.a11y.home}`} onClick={close}>
          <Logo />
        </a>

        <nav aria-label={t.a11y.mainNav} className={styles.desktopNav}>
          <ul className={styles.links}>
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={styles.link} aria-current={active === id ? 'location' : undefined}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {langSwitch(styles.lang)}
          <a href="#contact" className={`btn btn-primary ${styles.cta}`}>
            {t.nav.cta}
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.drawer} hidden={!open}>
        <nav aria-label={t.a11y.mobileNav} className="container">
          <ul className={styles.mobileLinks}>
            {navIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.mobileLink}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={close}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.mobileActions}>
            <a href="#contact" className="btn btn-accent" onClick={close}>
              {t.nav.mobileCta}
            </a>
            <a href={site.contact.phoneHref} className={styles.phone}>
              <Phone size={18} aria-hidden />
              <span dir="ltr">{site.contact.phoneDisplay}</span>
            </a>
            {langSwitch(styles.mobileLang)}
          </div>
        </nav>
      </div>
    </header>
  );
}
