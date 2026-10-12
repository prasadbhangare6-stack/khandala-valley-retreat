# 🌿 Khandala Valley Retreat — Boutique Luxury Resort

[![Live Site](https://img.shields.io/badge/Live_Site-Vercel-black?style=for-the-badge&logo=vercel)](https://khandala-valley-retreat-lake.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A bespoke, animation-rich luxury hospitality web application for **Khandala Valley Retreat** (खंडाला वाली रिट्रीट) — a boutique resort hotel nestled in Kune Village, Khandala, near Lonavala, Maharashtra.

🌐 **Live Production Deployment:** [https://khandala-valley-retreat-lake.vercel.app](https://khandala-valley-retreat-lake.vercel.app)  
📦 **GitHub Repository:** [https://github.com/prasadbhangare6-stack/khandala-valley-retreat](https://github.com/prasadbhangare6-stack/khandala-valley-retreat)

---

## 🌟 Key Features & Functional Overview

### 1. 1-Click WhatsApp Booking & Lead Dispatch
Instead of forcing guests through complex checkouts or passive forms, the application transforms guest interest into immediate high-intent leads via direct WhatsApp routing.
- **Function:** `createWhatsAppBookingUrl({ roomName, checkIn, checkOut, nights, adults, children, name, notes })`
- **Location:** `src/lib/utils.ts`
- **How it works:** Formats an URL-encoded, human-readable reservation dispatch:
  ```text
  🌿 *Booking Enquiry — Khandala Valley Retreat*
  • *Guest Name:* Rahul Sharma
  • *Room Category:* Valley View Deluxe
  • *Dates:* Mon, 19 Oct 2026 to Wed, 21 Oct 2026 (2 nights)
  • *Guests:* 2 Adults, 1 Child
  • *Special Requests:* Early check-in requested

  Please let me know availability, current tariffs, and reservation confirmation details. Thank you!
  ```
- **Integrated in:**
  - **Booking Flow (`BookingSection.tsx`)**: Quick WhatsApp trigger in room results and in the final confirmation voucher.
  - **Room Modal (`RoomModal.tsx`)**: Instant enquiry button pre-filled with the selected room category.
  - **Contact Section (`Contact.tsx`)**: Dual-action web submit and instant WhatsApp message dispatch.

---

### 2. Multi-Step Reservation State Machine
A dynamic multi-stage booking experience designed without full-page reloads.
- **Location:** `src/components/BookingSection.tsx`
- **State Architecture:**
  - `stage === "form"`: Check-in, check-out, adults, and room selection with real-time validation (`validate()`).
  - `stage === "results"`: Displays real-time stay duration calculations (`nightsBetween`), party breakdowns, and filtered room inventory tiers.
  - `stage === "enquiry"`: Collects guest contact details with inline field-level validation (`validateEnquiry()`).
  - `stage === "done"`: Renders an elegant reservation receipt voucher with direct links to send via WhatsApp, call the front desk, or book another date.

---

### 3. Cross-Component Date & Guest State Synchronization
- **Function/Hook:** `BookingProvider` & `useBooking()`
- **Location:** `src/lib/booking-context.tsx`
- **How it works:** Uses React Context to share stay dates and party size between the **Hero Availability Bar** (`Hero.tsx`) at the top of the page and the **Main Booking Engine** (`BookingSection.tsx`) further down. Selecting dates at the top smoothly transfers state to the checkout stage.

---

### 4. Floating Mobile Action Bar
Over 70% of resort searches happen on mobile devices while travelers plan weekend getaways.
- **Component:** `MobileActionBar.tsx`
- **Features:**
  - Glassmorphic backdrop (`backdrop-blur-md bg-ink/95`) pinned to screen bottom (`md:hidden`).
  - Safe-area inset compliance for edge-to-edge iOS and Android screens (`pb-[max(0.6rem,env(safe-area-inset-bottom))]`).
  - Three instant touchpoints: **Call Property**, **WhatsApp Chat**, and **Reserve Now**.

---

### 5. Curated Sahyadri Luxury Design System
- **Palette:** Forest-night ink (`#0e1411`), champagne (`#e2d2b4`), antique brass (`#b98f5a`), warm ivory (`#f5efe4`), and terracota accents.
- **Typography:** Self-hosted Google Fonts via `next/font`:
  - **Cormorant Garamond:** High-contrast editorial display serif for titles and luxury cues.
  - **Jost:** Clean geometric sans-serif for body typography, forms, and technical metrics.
- **Motion Orchestration (`src/components/motion/`):**
  - `Reveal.tsx`: Intersection-observer scroll reveals with spring physics (`ease: [0.22, 1, 0.36, 1]`).
  - `ClipReveal.tsx`: Cinematic clip-path image reveals (`clip-path: inset(...)`).
  - `SplitHeading.tsx`: Staggered word-mask reveals for editorial headers.
  - `Magnetic.tsx`: Cursor-attracting physics buttons on desktop.
  - Full support for `prefers-reduced-motion` across all components.

---

### 6. Interactive Gallery with Accessible Lightbox
- **Component:** `src/components/Gallery.tsx`
- **Features:**
  - Editorial masonry grid highlighting pool decks, twilight bonfires, valley views, and dining.
  - Fullscreen lightbox modal with keyboard navigation (`Esc` to close, `ArrowLeft` / `ArrowRight` to navigate) and touch swipe gestures.

---

### 7. Production SEO & Structured Data (Schema.org)
- **JSON-LD Hotel Schema (`src/app/layout.tsx`):**
  - Injects machine-readable `Hotel` metadata (name, address, geo-coordinates, verified amenities, telephone, and map coordinates) for Google Rich Snippets.
- **Native Next.js Route Handlers:**
  - `src/app/robots.ts`: Crawl instructions for search engines.
  - `src/app/sitemap.ts`: Dynamic XML sitemap generation.
- **OpenGraph & Twitter Cards:** Preconfigured social sharing assets (`/images/hero-valley.jpg`).

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) | Fast compilation, static prerendering, edge hosting |
| **Language** | TypeScript (Strict Mode) | End-to-end type safety |
| **UI Library** | React 19 | Server & Client component architecture |
| **Styling** | Tailwind CSS 4 + Custom Design Tokens | Modular luxury layout, responsive grids |
| **Animation** | Framer Motion 14 | Smooth hardware-accelerated transitions & micro-interactions |
| **Icons** | Lucide React | Minimalist UI iconography |
| **Deployment** | Vercel Edge Network | Global CDN, automatic previews, instant SSL |

---

## 📁 Repository Directory Structure

```text
khandala-valley-retreat/
├── public/
│   ├── icon.svg                      # Custom vector wordmark icon
│   └── images/                       # High-resolution property photography
├── src/
│   ├── app/
│   │   ├── globals.css               # Design tokens, button styles, custom scrollbars
│   │   ├── layout.tsx                # Fonts, SEO metadata, JSON-LD Hotel schema
│   │   ├── page.tsx                  # Home page layout composition
│   │   ├── robots.ts                 # Search crawler instructions
│   │   └── sitemap.ts                # Automatic XML sitemap generator
│   ├── components/
│   │   ├── BookingSection.tsx        # Multi-stage booking & WhatsApp dispatch engine
│   │   ├── Contact.tsx               # Direct front desk dispatch & inquiry form
│   │   ├── Dining.tsx                # On-site restaurant & terrace dining showcase
│   │   ├── Experiences.tsx           # Pool, bonfire, and amenities grid
│   │   ├── Gallery.tsx               # Editorial masonry grid + interactive lightbox
│   │   ├── Hero.tsx                  # Full-bleed cinematic hero + availability bar
│   │   ├── Location.tsx              # Google Maps embed, driving distances, transit
│   │   ├── MobileActionBar.tsx       # Sticky mobile bottom bar (Call, WhatsApp, Book)
│   │   ├── PropertyIntro.tsx         # Verified stats & estate introduction
│   │   ├── Reviews.tsx               # Verified Google Maps rating & themes carousel
│   │   ├── RoomModal.tsx             # Room category details modal + WhatsApp action
│   │   ├── Rooms.tsx                 # Room inventory catalog & features
│   │   ├── SiteFooter.tsx            # Footer navigation, branding, copyright
│   │   ├── SiteHeader.tsx            # Glassmorphism header, progress bar, mobile drawer
│   │   └── motion/                   # Reusable animation primitives (Reveal, SplitHeading, Magnetic)
│   └── lib/
│       ├── booking-context.tsx       # React Context for cross-component date/guest state
│       ├── data.ts                   # Single source of truth for property content
│       └── utils.ts                  # Date calculations, CSS helpers & WhatsApp generators
├── next.config.ts                    # Next.js Turbopack configuration
├── tsconfig.json                     # TypeScript strict configuration
└── package.json                      # Dependencies and npm scripts
```

---

## 💻 Functions & Utilities Reference (`src/lib/`)

### `src/lib/utils.ts`
- **`createWhatsAppBookingUrl(params)`**: Generates an encoded WhatsApp API URL pre-filled with stay dates, nights, party size, room tier, and custom requests.
- **`createWhatsAppContactUrl(params)`**: Generates an encoded WhatsApp link for general front desk questions.
- **`nightsBetween(checkIn, checkOut)`**: Accurately calculates total nights between ISO date strings.
- **`formatDisplayDate(isoDate)`**: Formats `YYYY-MM-DD` strings into elegant dates (e.g. `Mon, 19 Oct 2026`).
- **`todayISO()` & `addDaysISO(iso, days)`**: Date helper utilities preventing past check-in selections.
- **`cn(...classes)`**: Lightweight classname concatenation utility.

### `src/lib/booking-context.tsx`
- **`useBooking()`**: Custom React hook returning `{ checkIn, setCheckIn, checkOut, setCheckOut, adults, setAdults, children, setChildren, rooms, setRooms }`.

### `src/lib/data.ts`
- **`property`**: Centralized verified property facts (phone numbers, WhatsApp numbers, coordinates, rating, check-in/out times).
- **`rooms`**: Room tiers (`Valley View Deluxe`, `Valley Suite`, `Patio Garden Room`) with features and imagery.
- **`services`**: Verified amenities (outdoor pool, restaurant, room service, parking, Wi-Fi, bonfire).
- **`nearby` & `travel`**: Verified distances to Kune Falls, Della Adventure, railway stations, and Pune Airport.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `20.x` or later
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/prasadbhangare6-stack/khandala-valley-retreat.git

# Navigate into the project
cd khandala-valley-retreat

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🚢 Deployment

The project is optimized for zero-configuration deployment on **Vercel**:

```bash
# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

---

## 📄 License & Attribution

Designed and developed for **Khandala Valley Retreat**. All rights reserved.
