"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./Reveal";

type SplitHeadingProps = {
  words: string[];
  className?: string;
  /** render as h1/h2/h3 */
  level?: 1 | 2 | 3;
  delay?: number;
  /** split by word (default) or by character */
  mode?: "word" | "line-fade";
  once?: boolean;
};

/**
 * Word-by-word staggered heading reveal with a soft rising mask per word.
 */
export function SplitHeading({
  words,
  className,
  level = 2,
  delay = 0,
  mode = "word",
  once = true,
}: SplitHeadingProps) {
  const reduce = useReducedMotion();
  const Heading = level === 1 ? "h1" : level === 2 ? "h2" : "h3";

  if (reduce) {
    return <Heading className={className}>{words.join(" ")}</Heading>;
  }

  return (
    <Heading className={className}>
      <span className="sr-only">{words.join(" ")}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-10% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.075, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.06em]"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "112%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 1.02, ease: EASE },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Heading>
  );
}
