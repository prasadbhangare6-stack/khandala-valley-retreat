"use client";

import Image from "next/image";
import {
  Waves,
  UtensilsCrossed,
  ConciergeBell,
  Wifi,
  Car,
  BellRing,
  PlaneTakeoff,
  KeyRound,
  Gamepad2,
  Flame,
  PawPrint,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { experiencePanels, services } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  utensils: UtensilsCrossed,
  concierge: ConciergeBell,
  wifi: Wifi,
  car: Car,
  roomService: BellRing,
  plane: PlaneTakeoff,
  key: KeyRound,
  gamepad: Gamepad2,
  fire: Flame,
  pawPrint: PawPrint,
  stethoscope: Stethoscope,
};

export function Experiences() {
  return (
    <section id="experiences" className="relative overflow-hidden bg-ivory-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        {/* heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-3">Experiences &amp; Amenities</span>
              </div>
            </Reveal>
            <SplitHeading
              words={["Days", "shaped", "by", "the", "valley."]}
              className="font-display text-display-l font-light leading-[1.04] tracking-[-0.012em] text-ink"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="body-lux text-ink/72">
              Swim above the treeline, gather around the fire as the valley cools, and let the
              lawn and terraces hold the rest of the day.
            </p>
          </Reveal>
        </div>

        {/* interactive image panels */}
        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-7">
          {experiencePanels.map((panel, i) => (
            <Reveal key={panel.title} delay={i * 0.12} className={i === 1 ? "md:mt-14" : ""}>
              <article className="group img-zoom relative overflow-hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={panel.image}
                    alt={panel.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 32vw"
                    className="object-cover"
                  />
                  <div className="scrim-soft absolute inset-0" aria-hidden />
                  {/* hover lift of caption */}
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="mb-3 block h-px w-10 bg-champagne transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20" />
                    <h3 className="font-display text-[1.75rem] font-light text-ivory">
                      {panel.title}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-[0.88rem] leading-relaxed text-ivory/80 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-h-40 group-hover:opacity-100">
                      {panel.copy}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* services strip */}
        <Reveal delay={0.1}>
          <div className="mt-20 border-t border-ink/10 pt-14 md:mt-24">
            <p className="eyebrow mb-10 text-stone">At your service — verified amenities</p>
            <Stagger className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-6" stagger={0.055}>
              {services.map((s) => {
                const Icon = iconMap[s.icon] ?? Waves;
                return (
                  <StaggerItem key={s.label} y={18}>
                    <div className="group flex flex-col items-start gap-3.5">
                      <span className="flex h-11 w-11 items-center justify-center border border-ink/12 text-brass-3 transition-colors duration-500 group-hover:border-brass group-hover:bg-brass/8">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.3} />
                      </span>
                      <span className="text-[0.82rem] leading-snug text-ink/75">{s.label}</span>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
