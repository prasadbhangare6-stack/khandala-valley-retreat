import { BookingProvider } from "@/lib/booking-context";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { PropertyIntro } from "@/components/PropertyIntro";
import { Rooms } from "@/components/Rooms";
import { Experiences } from "@/components/Experiences";
import { Dining } from "@/components/Dining";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Location } from "@/components/Location";
import { BookingSection } from "@/components/BookingSection";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";

export default function HomePage() {
  return (
    <BookingProvider>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brass focus:px-5 focus:py-3 focus:text-[0.72rem] focus:uppercase focus:tracking-[0.22em] focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main className="pb-14 md:pb-0">
        <Hero />
        <PropertyIntro />
        <Rooms />
        <Experiences />
        <Dining />
        <Gallery />
        <Reviews />
        <Location />
        <BookingSection />
        <Contact />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </BookingProvider>
  );
}
