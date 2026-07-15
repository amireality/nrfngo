import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import SectionEyebrow from "../components/site/SectionEyebrow";

const IMG_1 =
  "https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&w=1400&q=80";
const IMG_2 =
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80";

type Event = {
  slug: string;
  title: string;
  hero: string;
  date: string;
  when: string;
  where: string;
  intro: string;
};

const EVENTS: Record<string, Event> = {
  "day-with-wonderful-children": {
    slug: "day-with-wonderful-children",
    title: "A day with our wonderful children",
    hero: IMG_1,
    date: "13 apr",
    when: "April 13, 2026 — 8:30 AM",
    where: "Opp. Opolo round-about, Yenagoa, Bayelsa, Nigeria",
    intro:
      "An open-house day for families, volunteers and supporters. Meet the children, tour the centre, and see the therapy programme up close.",
  },
  "seminar-caring-for-autism": {
    slug: "seminar-caring-for-autism",
    title: "Seminar: Caring for children with autism",
    hero: IMG_2,
    date: "25 apr",
    when: "April 25, 2026 — 10:00 AM",
    where: "largerthani Head Office, 8 Brewery Drive, Lagos",
    intro:
      "A working session for parents, teachers and caregivers, led by Dr. Tunde Bello and our therapy team. Free to attend, registration required.",
  },
};

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = EVENTS[params.slug];
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Event not found — largerthani" }, { name: "robots", content: "noindex" }] };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — largerthani` },
        { name: "description", content: event.intro },
        { property: "og:title", content: `${event.title} — largerthani` },
        { property: "og:description", content: event.intro },
        { property: "og:image", content: event.hero },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="px-6 md:px-[110px] py-[120px] text-center">
        <h1 className="font-bold text-[42px]">Event not found</h1>
        <Link to="/" className="inline-block mt-[24px] bg-brand hover:bg-brand-dark transition-colors px-[24px] py-[12px] rounded-[4px] text-brand-foreground font-medium">
          Back home
        </Link>
      </div>
      <Footer />
    </div>
  ),
  component: EventPage,
});

function EventPage() {
  const { event } = Route.useLoaderData();
  const others = Object.values(EVENTS).filter((e) => e.slug !== event.slug);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[100px]">
        <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.15] max-w-[768px]">
          {event.title}
        </h1>
        <div className="flex flex-wrap gap-x-[64px] gap-y-[16px] mt-[40px]">
          <div className="flex items-center gap-[12px]">
            <MapPin className="size-5" />
            <p className="font-medium text-[15px]">{event.where}</p>
          </div>
          <div className="flex items-center gap-[12px]">
            <Calendar className="size-5" />
            <p className="font-medium text-[15px]">{event.when}</p>
          </div>
        </div>
      </section>

      {/* About */}
      <article className="px-6 md:px-[110px] py-[100px] max-w-[768px] mx-auto">
        <SectionEyebrow>About this event</SectionEyebrow>
        <p className="text-ink-muted text-[16px] leading-[1.7]">{event.intro}</p>
        <div className="h-[280px] md:h-[380px] rounded-[20px] overflow-hidden my-[40px]">
          <img alt="" className="object-cover size-full" src={event.hero} />
        </div>
        <p className="text-ink-muted text-[16px] leading-[1.7]">
          The day is structured around three anchors: an introduction from our founder, small-group
          sessions with the therapy team, and lunch with families and volunteers. Come with
          questions. Leave with a clearer picture of what our work looks like on the ground.
        </p>
        <button className="mt-[32px] bg-brand hover:bg-brand-dark transition-colors px-[32px] py-[16px] rounded-[4px] text-brand-foreground text-[16px] font-medium">
          Register your interest
        </button>
      </article>

      {/* Other events */}
      {others.length > 0 && (
        <section className="px-6 md:px-[110px] py-[100px]">
          <h2 className="font-bold text-[32px] md:text-[40px] leading-[1.5] max-w-[768px] mx-auto mb-[40px]">
            Other events
          </h2>
          <div className="max-w-[768px] mx-auto space-y-[24px]">
            {others.map((e) => {
              const [day, mon] = e.date.split(" ");
              return (
                <Link
                  key={e.slug}
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  className="bg-brand rounded-[20px] p-[32px] md:p-[40px] flex items-center gap-[24px] md:gap-[40px] transition-transform hover:-translate-y-1"
                >
                  <div className="text-center shrink-0">
                    <p className="text-[40px] leading-[1.2] font-medium text-ink">{day}</p>
                    <p className="text-[14px] tracking-[2px] uppercase font-medium text-ink">{mon}</p>
                  </div>
                  <div className="flex-1">
                    <p className="uppercase text-[13px] tracking-[2px] font-medium text-ink/80">
                      Next Events
                    </p>
                    <p className="font-bold text-[22px] md:text-[28px] leading-[1.5] text-ink">{e.title}</p>
                  </div>
                  <span className="size-[48px] shrink-0 rounded-full bg-ink text-white flex items-center justify-center">
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
