# Khandala Valley Retreat — Premium Website Frontend

A bespoke, animation-rich luxury hospitality website for **Khandala Valley Retreat**
(खंडाला वाली रिट्रीट) — a resort hotel in Kune Village, Khandala, near Lonavala,
Maharashtra. Built as a client-ready design demonstration.

> **Demo notice.** This is a front-end demonstration. Availability search, enquiry forms
> and confirmations are simulated in the browser. No live inventory is checked, no data
> is transmitted, and no reservation is made.

---

## Stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)       |
| Language   | TypeScript (strict)                      |
| Styling    | Tailwind CSS 4 + custom design tokens    |
| Motion     | Framer Motion 14                         |
| Icons      | Lucide React                             |
| Typography | Cormorant Garamond + Jost (self-hosted via `next/font`) |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```bash
npm run build      # production build (statically prerendered home page)
npm start          # serve the production build
```

Deploys as a standard Next.js app to Vercel, Netlify, or any Node host:

```bash
npx vercel         # or: npx netlify deploy --build
```

Set the final canonical domain in `src/app/layout.tsx` (`metadataBase`, `alternates`)
before launch.

---

## Design direction

**Concept — “Where the hills hold the clouds.”** Monsoon light on the Sahyadris:
deep forest-night ink (`#0e1411`), warm ivory (`#f5efe4`), champagne (`#e2d2b4`)
and antique brass (`#b98f5a`); high-contrast serif display (Cormorant Garamond)
against a quiet geometric sans (Jost); full-bleed cinematic imagery, fine-line
rules, asymmetric editorial layouts and generous negative space.

**Motion language** — staggered word-mask headline reveals, clip-path image reveals,
gentle parallax with progressive image scaling, scroll-triggered staggered entrances,
animated underlines and arrow micro-interactions, animated mobile menu overlay,
gallery lightbox with keyboard + touch support, animated booking-form state machine.
All motion respects `prefers-reduced-motion`.

## Page structure

1. Cinematic hero (Ken Burns + parallax, staggered headline, dual CTA, scroll cue)
2. Overlapping availability bar (dates, guests, rooms → booking section)
3. Property introduction (editorial split, verified stats)
4. Rooms & suites (editorial rows, detail modal, enquiry CTAs)
5. Experiences & amenities (interactive panels, verified service icon grid)
6. Dining (verified facts + clearly marked working-title placeholder)
7. Immersive gallery (editorial masonry-style grid, lightbox)
8. Guest impressions (verified Google rating + summarised themes + labelled placeholder)
9. Location & surroundings (address, map embed, distances, directions)
10. Booking experience (validated multi-step simulated reservation flow)
11. Contact & WhatsApp (validated form with honest demo success state)
12. Footer (wordmark, links, policies placeholders, back-to-top)

---

## Content provenance & replacement guide

### Verified (public listings, accessed 12 Oct 2026)

Sources: Google Maps listing · Trip.com · Klook · Goibibo · MakeMyTrip · tiket.com ·
GuestReservations · Justdial · MTDC partner listing.

- Name: Khandala Valley Retreat (Google Maps, resort hotel, 3.8 · 131 reviews)
- Address: Plot No. 2, Behind Lokegaonkar Society, Dukes Den Colony, Kune Village,
  Khandala, Kune N.m., Maharashtra 410302 · Plus code Q9GJ+57
- Phone (Google listing): +91 81491 43728 · Alt listed: +91 84858 87965
- WhatsApp booking desk (MTDC partner listing): +91 922359 4601 — **confirm ownership before launch**
- Opened 2024 · 13 guestrooms · outdoor pool · on-site restaurant (à la carte) ·
  free parking · free Wi-Fi · 24-hour front desk · room service · concierge ·
  airport transfers · car hire · indoor games · bonfire · lawn/terrace/sun deck ·
  doctor on call · pet friendly
- Weekend breakfast (local cuisine) 8:30–10:30 AM, chargeable
- Check-in from 1:30 PM / check-out by 10:30 AM (OTA listings — confirm with property)
- Distances: Kune Falls 1.4 km · Monkey Hill 1.8 km · Della Adventure ~5-min drive ·
  Tamhini Ghat ~5 km · Ryewood Park ~5.4 km · Pawna Lake ~12.5 km · Wet N Joy ~17 km ·
  Pune Airport 60 km · Khandala Rly 4.4 km · Lonavala Rly 5.3 km
- Observed OTA rate on Google (Oct 2026): from about USD 258/night

### Illustrative — replace before production

| Item | Location | Replace with |
| ---- | -------- | ------------ |
| Photography (`public/images/*.jpg`) | Everywhere | The hotel's own image library (paths are ready in `src/lib/data.ts`) |
| Room categories (3 named) | `rooms` in `src/lib/data.ts` | Confirmed room types, bedding, occupancy, tariffs |
| Restaurant name “The Valley Table” | `dining` in `src/lib/data.ts` | Approved restaurant name + menu |
| Guest testimonial card | `Reviews.tsx` | Approved review quotes with reuse permission |
| Privacy / Terms / Cancellation links | `SiteFooter.tsx` | Real policy pages |
| WhatsApp number | `property.whatsapp` | Verified business WhatsApp line |
| Canonical domain | `src/app/layout.tsx` | Final domain |
| Check-in/out times | `property.checkIn/checkOut` | Property-confirmed times |

All data lives in **`src/lib/data.ts`** — one file controls the entire site.

## Accessibility

Semantic landmarks · skip link · keyboard-operable menu, modals, lightbox (arrows/Esc)
and forms · visible focus rings · labelled fields with inline validation ·
aria-live-free honest success states · contrast-checked palette ·
`prefers-reduced-motion` disables parallax, staggers and long transitions.

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, JSON-LD (Hotel schema, verified fields only)
    page.tsx          # section composition
    globals.css       # design tokens, buttons, fields, gallery grid, reduced-motion
  components/
    SiteHeader.tsx    # transparent → glass nav, scroll progress, mobile menu
    Hero.tsx          # cinematic hero + overlapping availability bar
    PropertyIntro.tsx # editorial story section
    Rooms.tsx         # room showcases + RoomModal
    Experiences.tsx   # amenity panels + service icon grid
    Dining.tsx        # dining section (working-title placeholder)
    Gallery.tsx       # editorial grid + accessible lightbox
    Reviews.tsx       # verified rating + theme carousel + labelled placeholder
    Location.tsx      # address, map embed, nearby, travel
    BookingSection.tsx# simulated multi-step booking flow
    Contact.tsx       # validated enquiry form + WhatsApp CTA
    SiteFooter.tsx    # footer + back-to-top
    motion/           # Reveal, ClipReveal, Stagger, SplitHeading, Magnetic
  lib/
    data.ts           # ALL property content (verified vs. illustrative)
    booking-context.tsx # shared booking form state
    utils.ts          # date/format helpers
public/
  images/             # illustrative photography (replace with real photos)
  icon.svg            # favicon
```
