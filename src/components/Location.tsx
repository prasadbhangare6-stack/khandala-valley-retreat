"use client";

import Image from "next/image";
import { MapPin, Navigation, Train, Plane, Clock } from "lucide-react";
import { property, nearby, travel } from "@/lib/data";
import { Reveal, Stagger, StaggerItem, ClipReveal } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

export function Location() {
  return (
    <section id="location" className="relative overflow-hidden bg-ink py-28 md:py-36">
      {/* full-bleed landscape band */}
      <div className="relative mb-20 h-[42svh] min-h-[300px] w-full overflow-hidden md:mb-28 md:h-[52svh]">
        <Image
          src="/images/valley-view.jpg"
          alt="Layered Sahyadri ridgelines near Khandala with mist and sunbeams (illustrative photography)"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10 lg:px-14">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-champagne">Location &amp; Surroundings</span>
              </div>
            </Reveal>
            <SplitHeading
              words={["In", "the", "heart", "of", "the", "ghats."]}
              className="max-w-[42rem] font-display text-display-l font-light leading-[1.04] text-ivory"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* address + map */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="border border-ivory/12 p-8 md:p-10">
                <div className="flex items-start gap-5">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brass-2" strokeWidth={1.4} />
                  <div>
                    <h3 className="font-display text-2xl font-light text-ivory">The Address</h3>
                    <address className="mt-4 not-italic text-[1.02rem] leading-[1.9] text-ivory/72">
                      {property.address.line1}
                      <br />
                      {property.address.line2}
                      <br />
                      {property.address.line3}
                    </address>
                    <p className="mt-4 text-[0.78rem] uppercase tracking-[0.22em] text-ivory/45">
                      Plus code · {property.address.plusCode}
                    </p>
                    <p className="mt-1.5 text-[0.78rem] text-ivory/45">
                      Coordinates {property.geo.lat}° N, {property.geo.lng}° E
                    </p>

                    <a
                      href={property.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-brass mt-8"
                    >
                      <span className="flex items-center gap-2">
                        <Navigation className="h-4 w-4" strokeWidth={1.5} />
                        Get Directions
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* map embed with graceful fallback */}
            <Reveal delay={0.15}>
              <div className="relative mt-6 h-[300px] overflow-hidden border border-ivory/12">
                <div className="absolute inset-0">
                  <Image
                    src="/images/valley-view.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover opacity-35"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-brass-2" strokeWidth={1.2} />
                </div>
                <iframe
                  title={`Map showing ${property.name}`}
                  src={property.mapsEmbed}
                  className="absolute inset-0 h-full w-full grayscale-[0.25]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, filter: "contrast(1.05) saturate(0.85) brightness(0.92)" }}
                />
              </div>
            </Reveal>

            {/* travel facts */}
            <Stagger className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
              {travel.map((t, i) => {
                const Icon = i === 0 ? Plane : i < 3 ? Train : Clock;
                return (
                  <StaggerItem key={t.label} y={16}>
                    <div className="flex items-start gap-3.5">
                      <Icon className="mt-1 h-4 w-4 shrink-0 text-brass-2" strokeWidth={1.4} />
                      <div>
                        <div className="text-[0.95rem] text-ivory/85">{t.detail}</div>
                        <div className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-ivory/45">
                          {t.label}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* nearby attractions */}
          <div className="lg:col-span-6">
            <Reveal>
              <h3 className="font-display text-display-s font-light text-ivory">
                Around the retreat
              </h3>
              <p className="mt-4 max-w-[28rem] text-[0.95rem] leading-relaxed text-ivory/60">
                Waterfalls, viewpoints and adventure parks sit within minutes of the property —
                distances below are from public listings and the Google Maps listing.
              </p>
            </Reveal>

            <ul className="mt-10">
              {nearby.map((n, i) => (
                <Reveal key={n.name} delay={i * 0.06}>
                  <li className="group flex items-baseline justify-between gap-6 border-b border-ivory/10 py-5">
                    <div className="flex items-baseline gap-5">
                      <span className="text-[0.62rem] uppercase tracking-[0.28em] text-brass-2/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[1.35rem] font-light text-ivory transition-colors duration-500 group-hover:text-champagne">
                        {n.name}
                      </span>
                    </div>
                    <span className="shrink-0 text-right text-[0.82rem] text-ivory/55">
                      {n.detail}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-12 border border-brass/30 p-8">
                <p className="font-display text-[1.45rem] font-light italic leading-snug text-champagne">
                  “Five minutes to Kune Falls. An hour of winding ghat light from Pune.”
                </p>
                <p className="mt-4 text-[0.78rem] leading-relaxed text-ivory/55">
                  Airport transfers and car hire can be arranged through the 24-hour front desk
                  (services per public listings — confirm at the time of booking).
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
