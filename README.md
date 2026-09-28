# Thuraya Foods Trading W.L.L. — Website (English + Arabic)

Next.js 15 (App Router) + TypeScript. Built on the client's brand book (`Thuraya_Foods_Trading_Brand_Book.pdf`).
English at `/`, Arabic (right-to-left) at `/ar`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000  and  http://localhost:3000/ar
npm run build
npm run typecheck
```

## Structure

```
app/
  (en)/layout.tsx, page.tsx      English root (lang="en", dir="ltr")
  (ar)/ar/layout.tsx, page.tsx   Arabic root  (lang="ar", dir="rtl")
  globals.css                    Brand tokens, buttons, RTL font switch
  icon.png                       Favicon
  sitemap.ts, robots.ts          SEO files for thurayafoodstrading.com
components/
  HomePage.tsx                   Composes all sections for a locale
  layout/                        SiteShell (html/body/fonts/metadata), Navbar, Footer, Logo
  sections/                      Hero, About, Products, Services, Process, Location, Quality, Contact, ContactForm
  ui/                            Photo (responsive Unsplash images), EnquireLink
lib/
  site.ts                        Legal names, CR number, phone/WhatsApp, email, maps link  <- edit here
  i18n/en.ts, i18n/ar.ts         ALL page text, one file per language (same shape, type-checked)
  content.ts                     Icons + product images matched to the translated items
  images.ts                      Image registry with photographer credits
  fonts.ts                       Montserrat + Lora (brand), IBM Plex Sans Arabic (Arabic)
```

To change any wording, edit `lib/i18n/en.ts` and the matching line in `lib/i18n/ar.ts`.
TypeScript will fail the build if the Arabic file is missing a key the English one has.

## Contact and enquiries

- Phone: +974 5560 8832 · Email: contact@thurayafoodstrading.com (both in `lib/site.ts`)
- The enquiry form sends to the inbox via Web3Forms (free):
  1. Go to web3forms.com, enter contact@thurayafoodstrading.com, and copy the access key they email you.
  2. Local: copy `.env.example` to `.env.local` and paste the key.
  3. Hosting: add `NEXT_PUBLIC_WEB3FORMS_KEY` as a build environment variable, then redeploy.
  Without the key the form falls back to opening the visitor's email app.

## Deploy (static export)

`npm run build` writes the finished site to `out/`. On Cloudflare Pages:
- Framework preset: None · Build command: `npm run build` · Output directory: `out`
- Environment variables: `NODE_VERSION=20`, `NEXT_PUBLIC_WEB3FORMS_KEY=<key>`

## Before launch

- Arabic copy should be reviewed by a native speaker on the client's side.
- Confirm product examples in `lib/i18n/*` (e.g. grocery items) with the client.
- Replace `site.contact.mapsUrl` with the exact Google Maps pin once the Google Business Profile exists.

## Photography

All photos are from Unsplash (free for commercial use under the Unsplash License), credits in `lib/images.ts`.
Consider downloading them into `public/images/` before production.
