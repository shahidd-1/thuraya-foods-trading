'use client';

import { useEffect, useRef, useState } from 'react';
import { ENQUIRE_EVENT } from '@/lib/events';
import type { Dictionary } from '@/lib/i18n';
import { mailtoLink, site } from '@/lib/site';
import styles from './Contact.module.css';

type Values = {
  name: string;
  company: string;
  contact: string;
  category: string;
  quantity: string;
  message: string;
};

type Field = keyof Values;
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'failed';

const initialValues: Values = { name: '', company: '', contact: '', category: '', quantity: '', message: '' };

// Web3Forms access key (free, tied to contact@thurayafoodstrading.com).
// Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local and in the hosting build settings.
// Without it the form falls back to opening the visitor's email app.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function ContactForm({ t }: { t: Dictionary }) {
  const f = t.contact.form;
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const botRef = useRef<HTMLInputElement>(null);

  // Product cards preselect the category (by key)
  useEffect(() => {
    const onEnquire = (e: Event) => {
      setValues((v) => ({ ...v, category: (e as CustomEvent<string>).detail }));
      setStatus('idle');
    };
    window.addEventListener(ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(ENQUIRE_EVENT, onEnquire);
  }, []);

  const validate = () => {
    const found: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) found.name = f.errors.name;
    if (!values.company.trim()) found.company = f.errors.company;
    if (!values.contact.trim()) found.contact = f.errors.contact;
    if (values.message.trim().length < 10) found.message = f.errors.message;
    return found;
  };

  const update =
    (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validate();
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Spam bots tick the hidden checkbox; silently accept and drop.
    if (botRef.current?.checked) {
      setStatus('sent');
      return;
    }

    const categoryName = t.products.items.find((p) => p.key === values.category)?.name ?? f.notSpecified;
    const subject = `${t.email.subject}: ${values.company}`;
    const summary = [
      `${f.name}: ${values.name}`,
      `${f.company}: ${values.company}`,
      `${f.contact}: ${values.contact}`,
      `${f.category}: ${categoryName}`,
      `${f.quantity}: ${values.quantity || f.notSpecified}`,
      '',
      values.message,
    ].join('\n');

    if (!WEB3FORMS_KEY) {
      window.location.href = mailtoLink(subject, summary);
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: `${values.name} (${values.company})`,
          // Lets the team press "Reply" when the visitor gave an email address
          ...(values.contact.includes('@') ? { replyto: values.contact.trim() } : {}),
          [f.name]: values.name,
          [f.company]: values.company,
          [f.contact]: values.contact,
          [f.category]: categoryName,
          [f.quantity]: values.quantity || f.notSpecified,
          [f.message]: values.message,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (res.ok && data?.success) {
        setStatus('sent');
        setValues(initialValues);
      } else {
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
    }
  };

  const fieldProps = (field: Field) => ({
    id: `enquiry-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `enquiry-${field}-error` : undefined,
  });

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`enquiry-${field}-error`} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <h3 id="form-title" className={styles.formTitle}>
        {f.title}
      </h3>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="enquiry-name">{f.name}</label>
          <input type="text" autoComplete="name" {...fieldProps('name')} />
          {error('name')}
        </div>
        <div className={styles.field}>
          <label htmlFor="enquiry-company">{f.company}</label>
          <input type="text" autoComplete="organization" {...fieldProps('company')} />
          {error('company')}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="enquiry-contact">{f.contact}</label>
          <input type="text" autoComplete="email" dir="auto" {...fieldProps('contact')} />
          {error('contact')}
        </div>
        <div className={styles.field}>
          <label htmlFor="enquiry-category">
            {f.category} <span className={styles.optional}>{f.optional}</span>
          </label>
          <select {...fieldProps('category')}>
            <option value="">{f.notSure}</option>
            {t.products.items.map((p) => (
              <option key={p.key} value={p.key}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="enquiry-quantity">
          {f.quantity} <span className={styles.optional}>{f.optional}</span>
        </label>
        <input type="text" placeholder={f.quantityPlaceholder} {...fieldProps('quantity')} />
      </div>

      <div className={styles.field}>
        <label htmlFor="enquiry-message">{f.message}</label>
        <textarea rows={4} {...fieldProps('message')} />
        {error('message')}
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <input ref={botRef} type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden />

      <button type="submit" className={`btn btn-accent ${styles.submit}`} disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : f.submit}
      </button>
      <p className={styles.note}>{f.note}</p>

      <p role="status" className={`${styles.status} ${status === 'failed' ? styles.statusError : ''}`}>
        {status === 'sent' && f.sent}
        {status === 'mailto' && f.mailto}
        {status === 'failed' && (
          <>
            {f.failed}{' '}
            <a href={mailtoLink(t.email.subject)} dir="ltr">
              {site.contact.email}
            </a>
          </>
        )}
      </p>
    </form>
  );
}
