"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

// imports of the images
import themeEducationAsset from "@/assets/theme_education_1784287021947.png";
import themeHealthcareAsset from "@/assets/theme_healthcare_1784287032350.png";
import themeCommunityAsset from "@/assets/theme_community_1784287069145.png";
import projectSmileAsset from "@/assets/project_smile_1784287111245.png";
import projectExcursionAsset from "@/assets/project_excursion_1784287121692.png";

const PaintBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#182613]">
    <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-[100%] bg-[#4f772d] mix-blend-screen blur-[60px] md:blur-[90px] opacity-70 animate-blob" />
    <div className="absolute top-[20%] -right-[10%] w-[80%] h-[80%] rounded-[100%] bg-[#90a955] mix-blend-screen blur-[60px] md:blur-[90px] opacity-70 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-[100%] bg-[#31572c] mix-blend-screen blur-[60px] md:blur-[90px] opacity-70 animate-blob animation-delay-4000" />
  </div>
);

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
  cardSpacing = 160,
}: CardsProps = {}) => {
  const cards: Card[] = [
    {
      title: "Education",
      description: "Tuition, materials and personalized learning plans for every child.",
      skeleton: <img src={themeEducationAsset} className="h-32 md:h-40 w-full rounded-xl object-cover" />,
      className: "bg-orange-500 text-white",
      config: { y: -20, rotate: -12, zIndex: 2 },
    },
    {
      title: "Healthcare",
      description: "Therapy, regular check-ups, and coverage for critical treatments.",
      skeleton: <img src={themeHealthcareAsset} className="h-32 md:h-40 w-full rounded-xl object-cover" />,
      className: "bg-blue-500 text-white",
      config: { y: 20, rotate: -4, zIndex: 3 },
    },
    {
      title: "Community",
      description: "Building strong support networks for families walking this journey together.",
      skeleton: <img src={themeCommunityAsset} className="h-32 md:h-40 w-full rounded-xl object-cover" />,
      className: "bg-purple-500 text-white",
      config: { y: -30, rotate: 6, zIndex: 4 },
    },
    {
      title: "Empowerment",
      description: "Providing resources and skills for sustainable livelihoods.",
      skeleton: <img src={projectSmileAsset} className="h-32 md:h-40 w-full rounded-xl object-cover" />,
      className: "bg-pink-500 text-white",
      config: { y: 15, rotate: 14, zIndex: 5 },
    },
    {
      title: "Environment",
      description: "Fostering awareness and care for our natural surroundings.",
      skeleton: <img src={projectExcursionAsset} className="h-32 md:h-40 w-full rounded-xl object-cover" />,
      className: "bg-teal-500 text-white",
      config: { y: -10, rotate: -6, zIndex: 6 },
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
      setSpacing(mq.matches ? cardSpacing : Math.round(cardSpacing * 0.45));
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
    <div className="relative flex h-[600px] lg:h-[750px] w-full items-center justify-center overflow-hidden rounded-[24px]">
      <PaintBackground />
      <motion.div
        ref={ref}
        onClick={() => setActive(null)}
        className="relative z-10 mx-auto flex h-full w-full max-w-5xl items-center justify-center [--height:340px] [--width:260px] lg:[--height:440px] lg:[--width:320px]"
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
                  y: isCurrentActive(card) ? -40 : isAnyCardActive() ? 220 : card.config.y,
                  x: isCurrentActive(card) ? 0 : isAnyCardActive() ? offsetX * 0.25 : offsetX,
                  rotate: isCurrentActive(card) ? 0 : isAnyCardActive() ? 0.3 * card.config.rotate : card.config.rotate,
                  scale: isCurrentActive(card) ? activeScale : isAnyCardActive() ? 0.75 : 1,
                }}
                whileHover={{
                  scale: isCurrentActive(card) ? activeScale : isAnyCardActive() ? 0.8 : 1.05,
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
                  "absolute top-1/2 left-1/2 flex cursor-pointer flex-col items-start justify-start overflow-hidden rounded-2xl p-3 md:p-5 shadow-2xl border border-white/10",
                  card.className,
                )}
              >
                {card.skeleton}
                <div className="mt-4 w-full">
                  <motion.h2
                    layoutId={card.title + "title"}
                    className="font-bold text-left text-xl md:text-3xl text-white"
                  >
                    {card.title}
                  </motion.h2>
                  <AnimatePresence mode="popLayout">
                    {active?.title === card.title && (
                      <motion.div
                        layoutId={card.title + "description"}
                        initial={{ opacity: 0, x: 20, y: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, y: 0, height: 130 }}
                        exit={{ opacity: 0, x: 40, y: 40, height: 0 }}
                        transition={cardSpring}
                        className="mt-3 flex flex-col items-start gap-4"
                      >
                        <p className="text-left text-sm text-white/90 md:text-base leading-relaxed">
                          {card.description}
                        </p>
                        <button className="px-5 py-2 mt-auto rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors shadow-sm">
                          Explore Theme
                        </button>
                      </motion.div>
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
