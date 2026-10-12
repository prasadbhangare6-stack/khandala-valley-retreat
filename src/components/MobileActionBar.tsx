"use client";

import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { property } from "@/lib/data";

export function MobileActionBar() {
  return (
    <aside
      aria-label="Quick contact and reservations"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brass/25 bg-ink/95 px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href={property.phoneHref}
          className="flex flex-1 flex-col items-center justify-center rounded py-1.5 text-ivory/85 transition-colors active:bg-ivory/5"
          aria-label="Call property front desk"
        >
          <Phone className="h-4 w-4 text-champagne" strokeWidth={1.8} />
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ivory/75">
            Call
          </span>
        </a>

        <div className="h-6 w-px bg-ivory/15" aria-hidden />

        <a
          href={property.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center rounded py-1.5 text-ivory/85 transition-colors active:bg-ivory/5"
          aria-label="Chat with reservations on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-emerald-400" strokeWidth={1.8} />
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ivory/75">
            WhatsApp
          </span>
        </a>

        <a
          href="#book"
          className="flex flex-[1.4] items-center justify-center gap-1.5 border border-brass/50 bg-brass px-3 py-2.5 text-ink shadow transition-colors hover:bg-brass-2 active:scale-[0.98]"
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={1.8} />
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em]">
            Reserve
          </span>
        </a>
      </div>
    </aside>
  );
}
