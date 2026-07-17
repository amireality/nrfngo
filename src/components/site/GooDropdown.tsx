"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";

export type DropdownItem = {
  label: string;
  onClick?: () => void;
};

type SpringConfig = {
  type: "spring";
  stiffness?: number;
  damping?: number;
  mass?: number;
  bounce?: number;
  visualDuration?: number;
};

export type GooDropdownProps = {
  trigger?: string;
  items?: DropdownItem[];
  width?: number;
  buttonWidth?: number;
  buttonHeight?: number;
  align?: "start" | "end";
  gap?: number;
  itemHeight?: number;
  buttonRadius?: number;
  panelRadius?: number;
  fill?: string;
  textColor?: string;
  gooStrength?: number;
  spring?: SpringConfig;
  className?: string;
};

const PANEL_PAD = 6;
const FILL = "#ececef";

const DEFAULT_ITEMS: DropdownItem[] = [];

const DEFAULT_SPRING: SpringConfig = {
  type: "spring",
  visualDuration: 0.3,
  bounce: 0.3,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function GooDropdown({
  trigger = "Share",
  items = DEFAULT_ITEMS,
  width = 160,
  buttonWidth = 90,
  buttonHeight = 36,
  align = "start",
  gap = 12,
  itemHeight = 36,
  buttonRadius = 12,
  panelRadius = 16,
  fill = FILL,
  textColor = "#000",
  gooStrength = 8,
  spring = DEFAULT_SPRING,
  className,
}: GooDropdownProps) {
  const [open, setOpen] = useState(false);
  const filterId = useId().replace(/[:]/g, "");

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const geo = useMemo(() => {
    const panelTop = buttonHeight + gap;
    const panelH = items.length * itemHeight + PANEL_PAD * 2;
    const btnX = align === "end" ? width - buttonWidth : 0;
    const closed = { x: btnX, y: 0, w: buttonWidth, h: buttonHeight, r: buttonRadius };
    const open = { x: 0, y: panelTop, w: width, h: panelH, r: panelRadius };
    return { panelTop, panelH, btnX, closed, open, layerH: panelTop + panelH };
  }, [items.length, width, align, gap, itemHeight, buttonRadius, panelRadius, buttonWidth, buttonHeight]);

  const shapeAt = useMemo(() => {
    const { closed, open } = geo;
    return (t: number) => {
      const x = lerp(closed.x, open.x, t);
      const y = lerp(closed.y, open.y, t);
      const w = lerp(closed.w, open.w, t);
      const h = lerp(closed.h, open.h, t);
      const r = lerp(closed.r, open.r, t);
      
      const top = y;
      const right = width - (x + w);
      const bottom = geo.layerH - (y + h);
      const left = x;
      
      return `inset(${top}px ${right}px ${bottom}px ${left}px round ${r}px)`;
    };
  }, [geo, width]);

  const closedShape = shapeAt(0);

  const progress = useMotionValue(0);

  useMotionValueEvent(progress, "change", (v) => {
    const shape = shapeAt(v);
    if (panelRef.current) panelRef.current.style.clipPath = shape;
    if (contentRef.current) contentRef.current.style.clipPath = shape;
  });

  useEffect(() => {
    const animation = animate(progress, open ? 1 : 0, spring);
    return () => animation.stop();
  }, [open, progress, spring]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (item: DropdownItem) => {
    item.onClick?.();
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`relative select-none ${className ?? ""}`}
      style={{ width, height: buttonHeight }}
    >
      <div className="absolute top-0 left-0" style={{ width, height: geo.layerH, zIndex: open ? 50 : 10 }}>
        <svg className="absolute h-0 w-0" aria-hidden>
          <defs>
            <filter id={filterId}>
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={gooStrength}
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        <div
          className="pointer-events-none absolute inset-0"
          style={{ filter: `url(#${filterId})` }}
        >
          <div
            className="absolute top-0"
            style={{
              left: geo.btnX,
              width: buttonWidth,
              height: buttonHeight,
              borderRadius: buttonRadius,
              background: fill,
            }}
          />
          <div
            ref={panelRef}
            className="absolute inset-0"
            style={{ background: fill, clipPath: closedShape }}
          />
        </div>

        <div className="absolute inset-0">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="absolute top-0 flex items-center justify-center text-[16px] font-bold"
            style={{
              left: geo.btnX,
              width: buttonWidth,
              height: buttonHeight,
              borderRadius: buttonRadius,
              color: textColor,
            }}
          >
            {trigger}
          </button>

          <div
            ref={contentRef}
            role="menu"
            className="absolute inset-0"
            style={{
              clipPath: closedShape,
              pointerEvents: open ? "auto" : "none",
            }}
          >
            <div
              className="absolute inset-x-0"
              style={{
                top: geo.panelTop,
                height: geo.panelH,
                padding: PANEL_PAD,
              }}
            >
              {items.map((item) => (
                <button
                  key={item.label}
                  role="menuitem"
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => select(item)}
                  style={{ height: itemHeight }}
                  className="flex w-full items-center rounded-[10px] px-3 text-left text-[15px] transition-colors hover:bg-black/10"
                >
                  <span style={{ color: textColor }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
