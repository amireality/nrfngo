import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import EventsSection from "../components/site/EventsSection";
import CTASection from "../components/site/CTASection";
import VolunteerPopup from "../components/site/VolunteerPopup";
import SectionEyebrow from "../components/site/SectionEyebrow";

const IMG_1 =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80";
const IMG_2 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
const IMG_3 =
  "https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&w=800&q=80";

const SIDE_POSTS = [
  { image: IMG_1, title: "Autism care day", date: "15th Nov 2022", excerpt: "How we ran the largest single-day autism family clinic in Bayelsa." },
  { image: IMG_2, title: "Down syndrome outreach", date: "8th Oct 2022", excerpt: "Partnering with Lagos General Hospital to reach 120 families in one weekend." },
  { image: IMG_3, title: "Caring for children with cerebral palsy", date: "22nd Sep 2022", excerpt: "Notes from our therapy team on progress-based care plans." },
];

const MORE = [
  { image: IMG_1, title: "Rebuilding Ola's classroom", date: "5th Jan 2023" },
  { image: IMG_2, title: "Volunteer diary: my first month", date: "28th Dec 2022" },
  { image: IMG_3, title: "Why we publish our budget", date: "14th Dec 2022" },
];

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — Northrop Research Foundation" },
      { name: "description", content: "News, notes and stories from the Northrop Research Foundation community." },
      { property: "og:title", content: "Media — Northrop Research Foundation" },
      { property: "og:description", content: "News and stories from our care programmes." },
      { property: "og:image", content: IMG_3 },
    ],
  }),
  component: Media,
});

function Media() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="bg-background min-h-screen">
      <Navbar variant="tint" />

      {/* Header + featured news */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[100px]">
        <div className="flex flex-col lg:flex-row justify-between gap-[48px]">
          <div className="max-w-[496px]">
            <SectionEyebrow>Top news</SectionEyebrow>
            <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.15]">
              Our goal is to provide inclusive care for children with special needs
            </h1>
            <p className="text-ink-muted text-[16px] leading-[1.7] mt-[16px]">
              A field report from our third year of the Mission Smile 1K programme — what worked,
              what didn't, and where we go next.
            </p>
            <button className="bg-brand hover:bg-brand-dark transition-colors px-[32px] py-[16px] rounded-[4px] text-brand-foreground text-[16px] font-medium mt-[32px]">
              Read more
            </button>
          </div>

          <div className="bg-white rounded-[20px] p-[24px] lg:w-[592px]">
            {SIDE_POSTS.map((p) => (
              <div key={p.title} className="flex gap-[16px] md:gap-[24px] mb-[24px] last:mb-0">
                <img alt="" className="rounded-[16px] object-cover h-[120px] w-[140px] md:h-[160px] md:w-[192px] shrink-0" src={p.image} />
                <div>
                  <p className="font-bold text-[18px] md:text-[20px] leading-[1.4]">{p.title}</p>
                  <p className="font-bold text-[13px] opacity-50 mt-[6px]">{p.date}</p>
                  <p className="text-ink-muted text-[14px] leading-[1.6] mt-[6px]">{p.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More stories */}
      <section className="px-6 md:px-[110px] py-[100px]">
        <SectionEyebrow>More stories</SectionEyebrow>
        <div className="grid md:grid-cols-3 gap-[24px] mt-[24px]">
          {MORE.map((p) => (
            <article key={p.title} className="rounded-[20px] overflow-hidden bg-[color:var(--brand-tint)] hover:-translate-y-1 transition-transform">
              <img alt="" src={p.image} className="h-[220px] w-full object-cover" />
              <div className="p-[24px]">
                <p className="font-bold text-[13px] opacity-60">{p.date}</p>
                <p className="font-bold text-[22px] leading-[1.4] mt-[8px]">{p.title}</p>
              </div>
            </article>
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
