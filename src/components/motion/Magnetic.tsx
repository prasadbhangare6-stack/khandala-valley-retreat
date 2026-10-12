"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Magnetic hover wrapper for desktop pointers. Falls back to a plain element
 * on touch devices and for users who prefer reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isFine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  const active = !reduce && isFine;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x, y });
  }

  function onLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={active ? { x: offset.x, y: offset.y } : undefined}
      transition={{ type: "spring", stiffness: 160, damping: 16, mass: 0.45 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
