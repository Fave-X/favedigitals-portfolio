"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

/**
 * Subtle cursor-tracked tilt for the hero portrait. Strictly decorative:
 * the wrapper is not interactive (no link, no button), so keyboard focus,
 * tab order and screen readers are unaffected.
 *
 * Enabled only when the user has NOT requested reduced motion AND the device
 * has a fine pointer (hover-capable). Otherwise the portrait is rendered
 * completely static (no listeners, no transform, no transition).
 */
export function ProfileTilt({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(!reduce.matches && finePointer.matches);
    update();
    reduce.addEventListener("change", update);
    finePointer.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      finePointer.removeEventListener("change", update);
    };
  }, []);

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    /* Max 3deg tilt + 1.5% scale: perceptible but professional. */
    el.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) scale(1.015)`;
  };

  const handleLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = "";
  };

  return (
    <div className="[perspective:900px]">
      <div
        ref={innerRef}
        onPointerMove={enabled ? handleMove : undefined}
        onPointerLeave={enabled ? handleLeave : undefined}
        className={`border border-line ${
          enabled
            ? "will-change-transform [transition:transform_250ms_cubic-bezier(0.16,1,0.3,1)]"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
