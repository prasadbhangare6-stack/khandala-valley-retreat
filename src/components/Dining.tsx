"use client";

import Image from "next/image";
import { ArrowRight, Utensils } from "lucide-react";
import { dining } from "@/lib/data";
import { Reveal, ClipReveal, Stagger, StaggerItem } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

export function Dining() {
  return (
    <section id="dining" className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(900px_480px_at_12%_110%,rgba(185,143,90,0.12),transparent_62%)]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* image composition */}
          <div className="relative">
            <ClipReveal>
              <div className="relative aspect-[4/4.6] w-full overflow-hidden sm:aspect-[5/4.4] lg:aspect-[4/4.7]">
                <Image
                  src="/images/dining.jpg"
                  alt="Elegant terrace table set for dinner at dusk with the valley beyond (illustrative photography)"
                  fill
                  sizes="(max-width: 1024px) 100vw, 47vw"
                  className="object-cover"
                />
              </div>
            </ClipReveal>

            {/* small inset image */}
            <Reveal delay={0.25} className="absolute -bottom-10 right-2 hidden w-44 border-4 border-ink shadow-2xl sm:block lg:-right-8 lg:w-56">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/waterfall.jpg"
                  alt="Monsoon waterfall in the green hills near Khandala (illustrative photography)"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* text */}
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-2">{dining.label}</span>
              </div>
            </Reveal>

            <SplitHeading
              words={dining.heading.replace(".", "").split(" ")}
              className="font-display text-display-l font-light leading-[1.05] tracking-[-0.012em] text-ivory"
            />

            <Reveal delay={0.12}>
              <p className="body-lux mt-7 max-w-[33rem] text-ivory/72">{dining.body}</p>
            </Reveal>

            {/* restaurant badge */}
            <Reveal delay={0.18}>
              <div className="mt-8 inline-flex items-center gap-4 border border-brass/35 bg-brass/5 px-5 py-4">
                <Utensils className="h-4 w-4 text-brass-2" strokeWidth={1.4} />
                <div>
                  <p className="font-display text-xl italic text-champagne">{dining.workingTitle}</p>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.24em] text-ivory/60">
                    On-Site Restaurant &amp; Terrace Dining
                  </p>
                </div>
              </div>
            </Reveal>

            <Stagger className="mt-9 grid gap-4" stagger={0.08}>
              {dining.facts.map((f) => (
                <StaggerItem key={f} y={16}>
                  <div className="flex items-center gap-4 border-b border-ivory/10 pb-4">
                    <span className="h-1.5 w-1.5 rotate-45 bg-brass" />
                    <span className="text-[0.94rem] text-ivory/75">{f}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#contact" className="btn btn-brass">
                  <span>Enquire About Dining</span>
                </a>
                <a href="#gallery" className="btn btn-ghost-light group">
                  <span className="flex items-center gap-2">
                    See the Gallery
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
