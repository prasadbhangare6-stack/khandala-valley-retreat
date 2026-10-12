"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { property } from "@/lib/data";
import { Reveal, EASE, Stagger, StaggerItem } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";
import { cn, createWhatsAppContactUrl } from "@/lib/utils";

type Fields = { name: string; email: string; phone: string; subject: string; message: string };

export function Contact() {
  const reduce = useReducedMotion();
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    subject: "Reservation enquiry",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!fields.name.trim()) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Please enter a valid email.";
    if (fields.phone.replace(/\D/g, "").length < 8) errs.phone = "Please enter a valid phone number.";
    if (fields.message.trim().length < 5) errs.message = "Please write a brief message or question.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) setSent(true);
  }

  function onWhatsAppSubmit() {
    if (validate()) {
      const url = createWhatsAppContactUrl({
        name: fields.name,
        subject: fields.subject,
        message: fields.message,
      });
      window.open(url, "_blank", "noopener,noreferrer");
      setSent(true);
    }
  }

  const activeWhatsAppUrl = createWhatsAppContactUrl({
    name: fields.name,
    subject: fields.subject,
    message: fields.message,
  });

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(800px_460px_at_6%_10%,rgba(185,143,90,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          {/* left — details */}
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-2">Contact</span>
              </div>
            </Reveal>

            <SplitHeading
              words={["We", "would", "love", "to", "hear", "from", "you."]}
              className="font-display text-display-l font-light leading-[1.05] text-ivory"
            />

            <Reveal delay={0.12}>
              <p className="body-lux mt-7 max-w-[32rem] text-ivory/72">
                Speak with the retreat’s front desk — open 24 hours — for reservations, group
                stays, transfers and anything that makes your visit easier.
              </p>
            </Reveal>

            <Stagger className="mt-12 space-y-7" stagger={0.1}>
              <StaggerItem>
                <a href={property.phoneHref} className="group flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ivory/15 text-brass-2 transition-colors duration-500 group-hover:border-brass">
                    <Phone className="h-4.5 w-4.5" strokeWidth={1.4} />
                  </span>
                  <span>
                    <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-ivory/45">
                      Call the property (Google listing)
                    </span>
                    <span className="mt-1.5 block font-display text-2xl text-ivory transition-colors group-hover:text-champagne">
                      {property.phone}
                    </span>
                  </span>
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href={property.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ivory/15 text-brass-2 transition-colors duration-500 group-hover:border-brass">
                    <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.4} />
                  </span>
                  <span>
                    <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-ivory/45">
                      WhatsApp — booking desk
                    </span>
                    <span className="mt-1.5 block font-display text-2xl text-ivory transition-colors group-hover:text-champagne">
                      {property.whatsapp}
                    </span>
                    <span className="mt-1.5 block text-[0.72rem] text-champagne/55">
                      Number as published on the property’s partner listing — confirm before launch.
                    </span>
                  </span>
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href={property.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ivory/15 text-brass-2 transition-colors duration-500 group-hover:border-brass">
                    <MapPin className="h-4.5 w-4.5" strokeWidth={1.4} />
                  </span>
                  <span>
                    <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-ivory/45">
                      Find us
                    </span>
                    <span className="mt-1.5 block text-[1.02rem] leading-relaxed text-ivory/85">
                      {property.address.line2}
                      <br />
                      {property.address.line3}
                    </span>
                  </span>
                </a>
              </StaggerItem>
            </Stagger>
          </div>

          {/* right — form */}
          <Reveal delay={0.15}>
            <div className="border border-ivory/12 bg-ink-2/70 p-7 md:p-10">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={false}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    noValidate
                  >
                    <h3 className="font-display text-2xl font-light text-ivory">
                      Send a message
                    </h3>
                    <p className="mt-2 text-[0.82rem] text-ivory/55">
                      Typical reply within one business day.
                    </p>

                    <div className="mt-8 space-y-6">
                      <div>
                        <label className="field-label !text-ivory/70" htmlFor="ct-name">Name</label>
                        <input
                          id="ct-name"
                          className={cn("field field-dark", errors.name && "field-error")}
                          value={fields.name}
                          onChange={(e) => setFields({ ...fields, name: e.target.value })}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                            <AlertCircle className="h-3 w-3" /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="field-label !text-ivory/70" htmlFor="ct-email">Email</label>
                          <input
                            id="ct-email"
                            type="email"
                            className={cn("field field-dark", errors.email && "field-error")}
                            value={fields.email}
                            onChange={(e) => setFields({ ...fields, email: e.target.value })}
                            placeholder="you@example.com"
                          />
                          {errors.email && (
                            <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                              <AlertCircle className="h-3 w-3" /> {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="field-label !text-ivory/70" htmlFor="ct-phone">Phone</label>
                          <input
                            id="ct-phone"
                            type="tel"
                            className={cn("field field-dark", errors.phone && "field-error")}
                            value={fields.phone}
                            onChange={(e) => setFields({ ...fields, phone: e.target.value })}
                            placeholder="+91 ..."
                          />
                          {errors.phone && (
                            <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                              <AlertCircle className="h-3 w-3" /> {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="field-label !text-ivory/70" htmlFor="ct-subject">Subject</label>
                        <select
                          id="ct-subject"
                          className="field field-dark"
                          value={fields.subject}
                          onChange={(e) => setFields({ ...fields, subject: e.target.value })}
                        >
                          <option>Reservation enquiry</option>
                          <option>Group / event booking</option>
                          <option>Dining</option>
                          <option>Transfers &amp; travel</option>
                          <option>General question</option>
                        </select>
                      </div>

                      <div>
                        <label className="field-label !text-ivory/70" htmlFor="ct-message">Message</label>
                        <textarea
                          id="ct-message"
                          rows={5}
                          className={cn("field field-dark resize-none", errors.message && "field-error")}
                          value={fields.message}
                          onChange={(e) => setFields({ ...fields, message: e.target.value })}
                          placeholder="Tell us about your stay…"
                        />
                        {errors.message && (
                          <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                            <AlertCircle className="h-3 w-3" /> {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-9 space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={onWhatsAppSubmit}
                          className="btn !bg-emerald-700 text-ivory hover:!bg-emerald-800 w-full"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Send via WhatsApp
                          </span>
                        </button>
                        <button type="submit" className="btn btn-brass w-full">
                          <span className="flex items-center justify-center gap-2">
                            Send Web Message
                            <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </span>
                        </button>
                      </div>
                      <div className="flex items-start gap-3 pt-2">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ivory/50" strokeWidth={1.5} />
                        <p className="text-[0.74rem] leading-relaxed text-ivory/50">
                          Direct Front Desk Dispatch — Your message is received by the on-site hospitality team. We reply promptly.
                        </p>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sent"
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <CheckCircle2 className="h-14 w-14 text-brass-2" strokeWidth={1.1} />
                    <h3 className="mt-8 font-display text-3xl font-light text-ivory">
                      Message Received
                    </h3>
                    <p className="mt-4 max-w-[26rem] text-[0.95rem] leading-relaxed text-ivory/70">
                      Thank you, {fields.name || "Guest"}. Your note regarding &ldquo;{fields.subject}&rdquo; has been submitted to the front desk.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <a
                        href={activeWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn !bg-emerald-700 text-ivory hover:!bg-emerald-800"
                      >
                        <span className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Continue on WhatsApp
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSent(false);
                          setFields({ name: "", email: "", phone: "", subject: "Reservation enquiry", message: "" });
                        }}
                        className="btn btn-ghost-light"
                      >
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
