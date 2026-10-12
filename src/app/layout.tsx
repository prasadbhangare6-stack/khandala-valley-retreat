import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { property } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const SITE_URL = "https://khandalavalleyretreat.com"; // placeholder — set canonical domain at launch

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Khandala Valley Retreat | A Boutique Valley Resort in Khandala, Near Lonavala",
    template: "%s | Khandala Valley Retreat",
  },
  description:
    "Khandala Valley Retreat is a thirteen-room resort in the Sahyadri hills of Khandala, near Lonavala — with an outdoor pool, on-site restaurant, lawns and valley views. Five minutes from Kune Falls. Enquire about your stay.",
  keywords: [
    "Khandala Valley Retreat",
    "Khandala resort",
    "Lonavala hotel",
    "Sahyadri retreat",
    "Kune Village Khandala",
    "resort near Kune Falls",
    "Khandala hotel with pool",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: property.name,
    title: "Khandala Valley Retreat | Where the hills hold the clouds",
    description:
      "Thirteen guestrooms in the green valley above Kune — an outdoor pool, long mountain light, and Kune Falls five minutes away.",
    images: [{ url: "/images/hero-valley.jpg", width: 1600, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khandala Valley Retreat",
    description:
      "A thirteen-room retreat in the Sahyadri hills near Lonavala. Pool, restaurant, valley views.",
    images: ["/images/hero-valley.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#0e1411",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: property.name,
  alternateName: property.nameHi,
  description:
    "A thirteen-room resort in the Sahyadri hills of Khandala, near Lonavala, with an outdoor pool, on-site restaurant and valley views.",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${property.address.line1}, ${property.address.line2}`,
    addressLocality: "Khandala",
    addressRegion: "Maharashtra",
    postalCode: "410302",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: property.geo.lat,
    longitude: property.geo.lng,
  },
  telephone: property.phone,
  url: SITE_URL,
  sameAs: [property.mapsUrl],
  numberOfRooms: property.roomsCount,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Outdoor swimming pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "24-hour front desk", value: true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
