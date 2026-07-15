import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Heart, Stethoscope, GraduationCap, HeartHandshake } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import EventsSection from "../components/site/EventsSection";
import CTASection from "../components/site/CTASection";
import VolunteerPopup from "../components/site/VolunteerPopup";
import SectionEyebrow from "../components/site/SectionEyebrow";

import heroAsset from "@/assets/hero.gif.asset.json";
const IMG_HERO = heroAsset.url;
const IMG_ABOUT =
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80";
const IMG_SERVICES =
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80";
const IMG_PROJECT_1 =
  "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?auto=format&fit=crop&w=1200&q=80";
const IMG_PROJECT_2 =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80";
const IMG_PROJECT_3 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";

const SERVICES = [
  { Icon: HeartHandshake, title: "Family support", desc: "Counselling, respite and long-term guidance for every parent walking this journey." },
  { Icon: Heart, title: "Health benefits", desc: "Regular check-ups, immunisation drives and coverage for critical treatment." },
  { Icon: GraduationCap, title: "Scholarships", desc: "Tuition and materials so learning never stops because of a diagnosis." },
  { Icon: Stethoscope, title: "Therapy", desc: "Occupational, speech and behavioural therapy delivered by certified specialists." },
];

const PROJECTS = [
  { image: IMG_PROJECT_1, title: "Mission Smile 1K: Outdoor charity", slug: "mission-smile-1k" },
  { image: IMG_PROJECT_2, title: "Weekly excursions", slug: "weekly-excursions" },
  { image: IMG_PROJECT_3, title: "Monthly public awareness", slug: "monthly-public-awareness" },
];

const DONATION_SPLIT = [
  { pct: 40, label: "child care home", color: "var(--brand)" },
  { pct: 35, label: "cleanliness program", color: "#8b7ff0" },
  { pct: 10, label: "excursions", color: "#f9cf64" },
  { pct: 10, label: "helping people", color: "#fff0ca" },
  { pct: 5, label: "feeding the poor", color: "#f38fbf" },
];

const SUPPORTERS = ["UNICEF", "Save the Children", "WHO", "Maharashtra Foundation", "Mumbai Trust", "Ford Fdn"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northrop Research Foundation — Inclusive care for children with special needs" },
      { name: "description", content: "A community-run NGO providing therapy, education and family support for children with special needs across India." },
      { property: "og:title", content: "Northrop Research Foundation — Inclusive care for children with special needs" },
      { property: "og:description", content: "Family support, therapy, education and health care for children with special needs." },
      { property: "og:image", content: IMG_HERO },
      { name: "twitter:image", content: IMG_HERO },
    ],
  }),
  component: Home,
});

function Home() {
  const [popup, setPopup] = useState(false);

  // Build the donation donut gradient
  let acc = 0;
  const gradient = DONATION_SPLIT.map((d) => {
    const from = acc;
    acc += d.pct;
    return `${d.color} ${from}% ${acc}%`;
  }).join(", ");

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="relative w-full flex items-end"
        style={{ aspectRatio: "1920 / 804" }}
      >
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          src={IMG_HERO}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 55%, transparent 80%)",
          }}
        />
        <div className="relative z-10 w-full px-5 md:px-[110px] pb-4 md:pb-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
            <Link
              to="/donation"
              className="bg-brand hover:bg-brand-dark transition-colors px-4 py-2 md:px-8 md:py-4 rounded-[4px] text-brand-foreground text-sm md:text-base font-medium"
            >
              Donate
            </Link>
            <Link
              to="/what-we-do"
              className="backdrop-blur-md bg-white/95 hover:bg-white transition-colors px-4 py-2 md:px-8 md:py-4 rounded-[4px] text-ink-soft text-sm md:text-base font-medium"
            >
              What we do
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="flex flex-col lg:flex-row justify-between gap-[48px] lg:gap-[64px] px-6 md:px-[110px] py-[100px]">
        <div className="max-w-[607px]">
          <SectionEyebrow>Know About us</SectionEyebrow>
          <h2 className="font-bold text-[36px] md:text-[48px] leading-[1.15]">
            We provide a place for children with special needs
          </h2>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[24px] whitespace-pre-line">
            {`Northrop Research Foundation started in 2016 as a weekend visit programme to a single orphanage in Maharashtra. Six years on, we run therapy centres, scholarship programmes and family support groups across three states.

Every child under our care has a personalised plan built by therapists, teachers and — most importantly — the family. We are honest with our numbers and open about how your donations are spent.`}
          </p>
          <Link
            to="/about-us"
            className="inline-block bg-brand hover:bg-brand-dark transition-colors px-[32px] py-[16px] rounded-[4px] text-brand-foreground text-[16px] font-medium mt-[32px]"
          >
            Learn more
          </Link>
        </div>
        <div className="relative h-[420px] lg:h-[578px] lg:w-[480px] rounded-[20px] overflow-hidden shrink-0">
          <img alt="Children playing" className="absolute inset-0 object-cover size-full" src={IMG_ABOUT} />
          <div className="absolute inset-0 bg-black/30" />
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[72px] rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
            <Play className="size-8 text-ink" fill="currentColor" />
          </button>
        </div>
      </section>

      {/* Supporters */}
      <section className="px-6 md:px-[110px] pb-[60px]">
        <p className="uppercase text-[14px] tracking-[2px] mb-[24px] text-ink-muted">Our supporters</p>
        <div className="flex flex-wrap items-center gap-x-[48px] gap-y-[16px] opacity-70">
          {SUPPORTERS.map((s) => (
            <span key={s} className="font-bold text-[20px] text-ink">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* What we do (light green bg) */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[100px] flex flex-col lg:flex-row justify-between gap-[48px] lg:gap-[64px]">
        <div className="max-w-[608px]">
          <h2 className="font-bold text-[36px] md:text-[48px] leading-[1.15]">
            Some services we provide for our children
          </h2>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[16px]">
            Every family that walks through our doors gets a plan tailored to their child — not a
            one-size-fits-all program. Here's what that looks like day-to-day.
          </p>
          <div className="space-y-[24px] mt-[48px] border-l-2 border-ink/20 pl-[24px]">
            {SERVICES.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-[16px]">
                <Icon className="size-7 text-ink shrink-0 mt-1" strokeWidth={1.75} />
                <div>
                  <p className="font-bold text-[22px] text-ink">{title}</p>
                  <p className="text-ink-muted text-[16px] leading-[1.6]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[420px] lg:h-[658px] lg:w-[480px] rounded-[20px] overflow-hidden shrink-0">
          <img alt="" className="object-cover size-full" src={IMG_SERVICES} />
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 md:px-[110px] py-[100px]">
        <SectionEyebrow>Projects we have done</SectionEyebrow>
        <h2 className="font-bold text-[36px] md:text-[48px] leading-[1.15] max-w-[640px] mb-[50px]">
          We are creating a place where children with special needs can thrive
        </h2>
        <div className="grid md:grid-cols-3 gap-[20px]">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="relative h-[421px] rounded-[20px] overflow-hidden group"
            >
              <img alt="" className="absolute inset-0 object-cover size-full transition-transform group-hover:scale-105" src={p.image} />
              <div className="absolute inset-0 bg-[color:var(--ink)] opacity-55" />
              <div className="absolute inset-0 flex flex-col justify-between p-[32px]">
                <p className="font-bold text-[24px] md:text-[28px] text-white leading-[1.35]">{p.title}</p>
                <span className="backdrop-blur-md bg-white/95 self-start px-[24px] py-[12px] rounded-[4px] text-[color:var(--ink-soft)] text-[15px] font-medium">
                  Learn more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Donation breakdown */}
      <section className="bg-[color:var(--ink)] text-white px-6 md:px-[110px] py-[100px] flex flex-col lg:flex-row justify-between items-center gap-[64px]">
        <div className="max-w-[626px]">
          <h2 className="font-bold text-[36px] md:text-[48px] leading-[1.15]">
            How we spend your donations and where it goes
          </h2>
          <p className="opacity-70 text-[16px] leading-[1.6] mt-[16px]">
            We understand that when you make a donation, you want to know exactly where your money
            is going, and we pledge to be transparent.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[40px] gap-y-[16px] mt-[48px]">
            {DONATION_SPLIT.map((d) => (
              <div key={d.label} className="flex items-center gap-[12px]">
                <span
                  className="size-[16px] rounded-[4px] shrink-0"
                  style={{ backgroundColor: d.color }}
                />
                <p className="text-[16px] font-medium">
                  {d.pct}% {d.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="size-[280px] md:size-[375px] rounded-full shrink-0"
          style={{ background: `conic-gradient(${gradient})` }}
        />
      </section>

      <CTASection onVolunteerClick={() => setPopup(true)} />
      <EventsSection />
      <Footer />
      <VolunteerPopup open={popup} onClose={() => setPopup(false)} />
    </div>
  );
}
