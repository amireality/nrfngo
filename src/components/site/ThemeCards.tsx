"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

// imports of the images
import themeEducationAsset from "@/assets/theme_education_1784287021947.png";
import themeHealthcareAsset from "@/assets/theme_healthcare_1784287032350.png";
import themeCommunityAsset from "@/assets/theme_community_1784287069145.png";

type Card = {
  title: string;
  description: string;
  skeleton: React.ReactNode;
  className: string;
  config: {
    y: number;
    zIndex: number;
    x?: number;
    rotate: number;
  };
};

type SpringConfig = {
  type: "spring";
  bounce?: number;
  visualDuration?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export interface CardsProps {
  spring?: SpringConfig;
  activeScale?: number;
  cardSpacing?: number;
}

const defaultSpring: SpringConfig = {
  type: "spring",
  visualDuration: 0.6,
  bounce: 0.25,
};

export const ThemeCards = ({
  spring = defaultSpring,
  activeScale = 1.15,
  cardSpacing = 180,
}: CardsProps = {}) => {
  const cards: Card[] = [
    {
      title: "Education",
      description: "Tuition, materials and personalized learning plans for every child.",
      skeleton: <img src={themeEducationAsset} className="h-40 md:h-50 w-full rounded-xl object-cover" />,
      className: "bg-[#8f9f6e] [&_h2]:text-white",
      config: { y: -20, rotate: -10, zIndex: 2 },
    },
    {
      title: "Healthcare",
      description: "Therapy, regular check-ups, and coverage for critical treatments.",
      skeleton: <img src={themeHealthcareAsset} className="h-40 md:h-50 w-full rounded-xl object-cover" />,
      className: "bg-[#556b2f] [&_p]:text-white [&_h2]:text-white",
      config: { y: 20, rotate: 5, zIndex: 3 },
    },
    {
      title: "Community",
      description: "Building strong support networks for families walking this journey together.",
      skeleton: <img src={themeCommunityAsset} className="h-40 md:h-50 w-full rounded-xl object-cover" />,
      className: "bg-[#3a4b1f] [&_h2]:text-white",
      config: { y: -40, rotate: -5, zIndex: 4 },
    },
  ];

  const [active, setActive] = useState<Card | null>(null);
  const [spacing, setSpacing] = useState(cardSpacing);

  const ref = useRef<HTMLDivElement>(null);

  const cardSpring = spring;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setSpacing(mq.matches ? cardSpacing : Math.round(cardSpacing * 0.39));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [cardSpacing]);

  const middle = (cards.length - 1) / 2;

  const isAnyCardActive = () => {
    return active?.title;
  };

  const isCurrentActive = (card: Card) => {
    return active?.title === card.title;
  };
  return (
    <div className="relative flex h-[500px] lg:h-[600px] w-full items-center justify-center overflow-hidden py-10">
      <motion.div
        ref={ref}
        onClick={() => setActive(null)}
        className="relative mx-auto flex h-[350px] lg:h-[450px] w-full max-w-5xl items-center justify-center [--height:320px] [--width:240px] lg:[--height:400px] lg:[--width:300px]"
      >
        {cards.map((card, index) => {
          const offsetX = (index - middle) * spacing;
          return (
            <motion.div key={card.title}>
              <motion.button
                initial={{ x: 0, scale: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(card);
                }}
                animate={{
                  y: isCurrentActive(card) ? 0 : isAnyCardActive() ? 400 : card.config.y,
                  x: isCurrentActive(card) ? 0 : isAnyCardActive() ? offsetX * 0.4 : offsetX,
                  rotate: isCurrentActive(card) ? 0 : isAnyCardActive() ? 0.2 * card.config.rotate : card.config.rotate,
                  scale: isCurrentActive(card) ? activeScale : isAnyCardActive() ? 0.7 : 1,
                }}
                whileHover={{
                  scale: isCurrentActive(card) ? activeScale : isAnyCardActive() ? 0.7 : 1.05,
                }}
                transition={cardSpring}
                style={{
                  width: `var(--width)`,
                  height: `var(--height)`,
                  marginLeft: `calc(var(--width) / -2)`,
                  marginTop: `calc(var(--height) / -2)`,
                  zIndex: isCurrentActive(card) ? 50 : card.config.zIndex,
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 flex cursor-pointer flex-col items-start justify-start overflow-hidden rounded-2xl p-2 md:p-4 shadow-xl border-4 border-white/20",
                  card.className,
                )}
              >
                {card.skeleton}
                <div className="mt-5 w-full">
                  <motion.h2
                    layoutId={card.title + "title"}
                    className="font-bold text-left text-xl md:text-3xl"
                  >
                    {card.title}
                  </motion.h2>
                  <AnimatePresence mode="popLayout">
                    {active?.title === card.title && (
                      <motion.p
                        layoutId={card.title + "description"}
                        initial={{ opacity: 0, x: 20, y: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, y: 0, height: 100 }}
                        exit={{ opacity: 0, x: 40, y: 40 }}
                        transition={cardSpring}
                        className="mt-3 text-left text-sm text-white/90 md:text-base leading-relaxed"
                      >
                        {card.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
