import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Stethoscope, GraduationCap, Home as HomeIcon, HeartPulse, Megaphone } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import EventsSection from "../components/site/EventsSection";
import CTASection from "../components/site/CTASection";
import VolunteerPopup from "../components/site/VolunteerPopup";
import SectionEyebrow from "../components/site/SectionEyebrow";

const IMG_HERO =
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80";
const IMG_1 =
  "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?auto=format&fit=crop&w=1200&q=80";
const IMG_2 =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80";
const IMG_3 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";

const FEATURES = [
  { Icon: Users, title: "Family support", desc: "Counselling, respite care and long-term guidance for every parent walking this journey." },
  { Icon: HeartPulse, title: "Health benefits", desc: "Regular check-ups, immunisation drives and cover for critical treatment." },
  { Icon: GraduationCap, title: "Education", desc: "Inclusive schooling and after-school programmes tailored to each child's plan." },
  { Icon: HomeIcon, title: "Basic amenities", desc: "Nutrition, clothing, safe shelter and daily essentials that never negotiate." },
  { Icon: Stethoscope, title: "Therapy", desc: "Occupational, speech and behavioural therapy delivered by certified specialists." },
  { Icon: Megaphone, title: "Public outreach", desc: "Awareness campaigns and community events that break the stigma at the root." },
];

const PROJECTS = [
  { image: IMG_1, title: "Mission Smile 1K: Outdoor charity", desc: "Community outreach across 12 villages with 1,000+ children served.", slug: "mission-smile-1k" },
  { image: IMG_2, title: "Weekly excursions", desc: "Every Saturday, we take our children on structured outdoor days.", slug: "weekly-excursions" },
  { image: IMG_3, title: "Monthly public awareness", desc: "Talks, workshops and radio shows to change the conversation.", slug: "monthly-public-awareness" },
];

export const Route = createFileRoute("/what-we-do")({
  head: () => ({
    meta: [
      { title: "What we do — largerthani" },
      { name: "description", content: "Family support, therapy, education, health and outreach — the six pillars of our work." },
      { property: "og:title", content: "What we do — largerthani" },
      { property: "og:description", content: "The six pillars of our work with children with special needs." },
      { property: "og:image", content: IMG_HERO },
    ],
  }),
  component: WhatWeDo,
});

function WhatWeDo() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="flex flex-col lg:flex-row justify-between items-start gap-[48px] px-6 md:px-[110px] pt-[100px] pb-[60px]">
        <div className="max-w-[594px]">
          <SectionEyebrow>What we do</SectionEyebrow>
          <h1 className="font-bold text-[42px] md:text-[56px] leading-[1.15]">
            We are working cross-country
          </h1>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[16px]">
            Across three states and a network of over 200 volunteers, we build the surrounding
            infrastructure — therapy, schooling, family income support and community awareness —
            so no child is defined by their diagnosis.
          </p>
        </div>
        <div className="h-[300px] lg:h-[384px] w-full lg:w-[476px] rounded-[20px] overflow-hidden">
          <img alt="" className="object-cover size-full" src={IMG_HERO} />
        </div>
      </section>

      {/* Features grid on light green */}
      <section className="bg-brand-light py-[100px] px-6 md:px-[110px]">
        <h2 className="font-bold text-[32px] md:text-[48px] leading-[1.15] max-w-[680px] mb-[64px]">
          What we do for our kids with special needs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[48px] gap-y-[56px]">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title}>
              <Icon className="size-8 text-brand-dark" strokeWidth={1.75} />
              <p className="font-bold text-[22px] mt-[20px]">{title}</p>
              <p className="text-ink-muted text-[15px] leading-[1.6] mt-[8px] max-w-[332px]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 md:px-[110px] py-[100px]" id="projects">
        <SectionEyebrow>Projects we have done</SectionEyebrow>
        <h2 className="font-bold text-[32px] md:text-[48px] leading-[1.15] max-w-[640px] mb-[50px]">
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
                <div>
                  <p className="font-bold text-[24px] md:text-[28px] text-white leading-[1.35]">{p.title}</p>
                  <p className="text-white/85 text-[15px] leading-[1.6] mt-[12px]">{p.desc}</p>
                </div>
                <span className="backdrop-blur-md bg-white/95 self-start px-[24px] py-[12px] rounded-[4px] text-[color:var(--ink-soft)] text-[15px] font-medium">
                  Learn more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection onVolunteerClick={() => setPopup(true)} />
      <EventsSection />
      <Footer />
      <VolunteerPopup open={popup} onClose={() => setPopup(false)} />
    </div>
  );
}
