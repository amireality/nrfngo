import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const EVENTS = [
  { date: "13", month: "apr", title: "A day with our wonderful children", slug: "day-with-wonderful-children" },
  { date: "25", month: "apr", title: "Seminar: Caring for children with autism", slug: "seminar-caring-for-autism" },
];

export default function EventsSection() {
  return (
    <section className="px-6 md:px-[110px] py-[100px]">
      <div className="flex items-center gap-[24px] mb-[48px]">
        <h2 className="font-medium text-[32px] md:text-[40px] leading-[1.4] shrink-0">Our Events</h2>
        <hr className="flex-1 border-hairline" />
      </div>
      <div className="grid md:grid-cols-2 gap-[24px]">
        {EVENTS.map((e) => (
          <Link
            key={e.slug}
            to="/events/$slug"
            params={{ slug: e.slug }}
            className="bg-brand rounded-[20px] p-[32px] md:p-[40px] flex items-center gap-[24px] md:gap-[40px] transition-transform hover:-translate-y-1"
          >
            <div className="text-center shrink-0">
              <p className="text-[48px] leading-[1.2] font-medium text-ink">{e.date}</p>
              <p className="text-[14px] tracking-[2px] uppercase font-medium text-ink">{e.month}</p>
            </div>
            <div className="flex-1">
              <p className="uppercase text-[13px] tracking-[2px] font-medium text-ink/80 mb-[8px]">
                Next Events
              </p>
              <p className="font-bold text-[22px] md:text-[28px] leading-[1.5] text-ink">{e.title}</p>
            </div>
            <span className="size-[56px] shrink-0 rounded-full bg-ink text-white flex items-center justify-center">
              <ArrowUpRight className="size-6" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
