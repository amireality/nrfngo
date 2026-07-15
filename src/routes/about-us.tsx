import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Twitter, Linkedin, Award } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import EventsSection from "../components/site/EventsSection";
import CTASection from "../components/site/CTASection";
import VolunteerPopup from "../components/site/VolunteerPopup";
import SectionEyebrow from "../components/site/SectionEyebrow";

const IMG_MISSION =
  "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80";
const IMG_TEAM_1 =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80";
const IMG_TEAM_2 =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80";
const IMG_TEAM_3 =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80";
const IMG_TEAM_4 =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80";
const IMG_FOUNDER =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80";

const TEAM = [
  { name: "Amaka Okwuosa", role: "Executive Director", img: IMG_TEAM_1 },
  { name: "Dr. Tunde Bello", role: "Head of Therapy", img: IMG_TEAM_2 },
  { name: "Ifeoma Chukwu", role: "Programmes Lead", img: IMG_TEAM_3 },
  { name: "Samuel Ayodele", role: "Community Manager", img: IMG_TEAM_4 },
];

const AWARDS = [
  { year: "2023", title: "Best Community NGO — West Africa Impact Awards" },
  { year: "2022", title: "UNICEF Partner of the Year (Nigeria)" },
  { year: "2021", title: "Children's Rights Advocate of the Year" },
];

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About us — Northrop Research Foundation" },
      { name: "description", content: "Meet the team behind Northrop Research Foundation — a Bayelsa-founded NGO for children with special needs." },
      { property: "og:title", content: "About us — Northrop Research Foundation" },
      { property: "og:description", content: "The people, mission and story behind our care programmes." },
      { property: "og:image", content: IMG_FOUNDER },
    ],
  }),
  component: AboutUs,
});

function AboutUs() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[100px] flex flex-col lg:flex-row justify-between gap-[48px]">
        <div className="max-w-[594px]">
          <SectionEyebrow>About us</SectionEyebrow>
          <h1 className="font-bold text-[42px] md:text-[56px] leading-[1.15]">
            We're a small team doing large things for children with special needs
          </h1>
        </div>
        <p className="max-w-[480px] text-ink-muted text-[16px] leading-[1.7]">
          Northrop Research Foundation was founded in 2016 in Bayelsa, Nigeria. What started as a weekend visit
          programme has grown into three therapy centres and a network of 200+ volunteers,
          supporting more than 230 children every day.
        </p>
      </section>

      {/* Mission */}
      <section className="px-6 md:px-[110px] py-[100px] flex flex-col lg:flex-row gap-[48px] lg:gap-[80px] items-center">
        <div className="lg:w-1/2 h-[400px] lg:h-[520px] rounded-[20px] overflow-hidden">
          <img alt="Team at work" src={IMG_MISSION} className="object-cover size-full" />
        </div>
        <div className="lg:w-1/2">
          <SectionEyebrow>Our mission</SectionEyebrow>
          <h2 className="font-bold text-[32px] md:text-[42px] leading-[1.2]">
            To make sure no child is defined by their diagnosis
          </h2>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[24px]">
            We build the surrounding infrastructure — therapy, schooling, family income support and
            community awareness — so families don't have to pick between care and survival. Every
            programme is co-designed with parents and reviewed by our medical board.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-[40px]">
            <div>
              <p className="font-bold text-[36px] text-brand-dark">230+</p>
              <p className="text-[14px] text-ink-muted">children under care</p>
            </div>
            <div>
              <p className="font-bold text-[36px] text-brand-dark">3</p>
              <p className="text-[14px] text-ink-muted">therapy centres</p>
            </div>
            <div>
              <p className="font-bold text-[36px] text-brand-dark">200+</p>
              <p className="text-[14px] text-ink-muted">active volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[color:var(--brand-tint)] px-6 md:px-[110px] py-[100px]">
        <SectionEyebrow>Our team</SectionEyebrow>
        <h2 className="font-bold text-[32px] md:text-[48px] leading-[1.15] max-w-[640px]">
          Meet the people making it happen
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[24px] mt-[48px]">
          {TEAM.map((t) => (
            <div key={t.name}>
              <div className="aspect-[4/5] rounded-[20px] overflow-hidden">
                <img alt={t.name} src={t.img} className="object-cover size-full" />
              </div>
              <p className="font-bold text-[20px] mt-[16px]">{t.name}</p>
              <p className="text-ink-muted text-[14px]">{t.role}</p>
              <div className="flex gap-[12px] mt-[12px] text-ink-muted">
                <Facebook className="size-4" />
                <Twitter className="size-4" />
                <Linkedin className="size-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder note */}
      <section className="px-6 md:px-[110px] py-[100px] flex flex-col lg:flex-row gap-[48px] items-center">
        <div className="lg:w-[420px] shrink-0">
          <div className="aspect-square rounded-[20px] overflow-hidden">
            <img alt="Founder" src={IMG_FOUNDER} className="object-cover size-full" />
          </div>
          <p className="font-bold text-[22px] mt-[20px]">Amaka Okwuosa</p>
          <p className="text-ink-muted text-[14px]">Founder & Executive Director</p>
        </div>
        <div className="flex-1 max-w-[640px]">
          <SectionEyebrow>A note from our founder</SectionEyebrow>
          <blockquote className="font-bold text-[24px] md:text-[32px] leading-[1.35]">
            "Every child is larger than the sum of what a diagnosis says about them. Our job is to
            make sure the world catches up."
          </blockquote>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[24px]">
            I started Northrop Research Foundation after my nephew Chidi was diagnosed with autism at four. What I
            saw wasn't a lack of love — it was a lack of infrastructure. Six years on, we've built
            some of that infrastructure. There's more to build.
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[100px]">
        <SectionEyebrow>Awards & recognition</SectionEyebrow>
        <div className="grid md:grid-cols-3 gap-[24px] mt-[24px]">
          {AWARDS.map((a) => (
            <div key={a.year} className="bg-white p-[32px] rounded-[20px]">
              <Award className="size-8 text-brand-dark" strokeWidth={1.75} />
              <p className="font-bold text-[20px] mt-[24px]">{a.title}</p>
              <p className="text-ink-muted text-[14px] mt-[8px]">{a.year}</p>
            </div>
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
