import { Link, useNavigate } from "@tanstack/react-router";
import { GooDropdown } from "./GooDropdown";

const COLS: { title: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    title: "Home",
    links: [
      { label: "Home", to: "/" },
      { label: "About us", to: "/about-us" },
      { label: "Team", to: "/about-us" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Projects", to: "/what-we-do" },
      { label: "Events", to: "/media" },
      { label: "Donate", to: "/donation" },
      { label: "Blog", to: "/media" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#3a4b1f] text-white px-6 md:px-[110px] py-[96px]">
      <div className="flex flex-col lg:flex-row justify-between gap-[64px]">
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span className="font-bold text-[20px] tracking-tight">Northrop Research</span>
          <span className="font-script text-[24px] text-brand-light -mt-1 self-end">Foundation</span>
        </Link>

        <div className="flex flex-row flex-nowrap items-start gap-4 md:gap-[32px] z-10 overflow-visible">
          {COLS.map((col) => (
            <div key={col.title} className="shrink-0">
              <GooDropdown
                trigger={col.title}
                items={col.links.map((l) => ({
                  label: l.label,
                  onClick: () => {
                    if (l.to) navigate({ to: l.to });
                    else if (l.href) window.open(l.href, "_blank");
                  },
                }))}
                width={140}
                buttonWidth={90}
                align="start"
                fill="#4f662a"
                textColor="#ffffff"
                gooStrength={14}
                spring={{ type: "spring", bounce: 0.7, visualDuration: 0.6 }}
              />
            </div>
          ))}
        </div>

        <div className="max-w-[420px]">
          <p className="font-bold text-[32px] lg:text-[40px] leading-[1.4]">
            Subscribe to get latest updates
          </p>
          <form
            className="flex gap-[8px] mt-[24px]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-white/30 rounded-[4px] px-[16px] py-[12px] bg-transparent text-white placeholder:text-white/40 outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="bg-white text-[color:var(--ink-soft)] px-[24px] py-[12px] rounded-[4px] text-[16px] font-medium shrink-0 hover:bg-brand-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <p className="mt-[64px] text-[13px] opacity-60">
        © {new Date().getFullYear()} Northrop Research Foundation. All rights reserved.
      </p>
    </footer>
  );
}
