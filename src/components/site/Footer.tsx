import { Link } from "@tanstack/react-router";

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
  return (
    <footer className="bg-[color:var(--ink)] text-white px-6 md:px-[110px] py-[96px]">
      <div className="flex flex-col lg:flex-row justify-between gap-[64px]">
        <Link to="/" className="flex items-baseline shrink-0">
          <span className="font-bold text-[24px]">largerthan</span>
          <span className="font-script text-[25px]" style={{ marginLeft: -4 }}>
            i
          </span>
        </Link>

        <div className="flex flex-wrap gap-[64px]">
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="font-bold text-[16px] mb-[16px]">{col.title}</p>
              <ul className="space-y-[12px]">
                {col.links.map((l) => (
                  <li key={l.label} className="opacity-80 text-[14px]">
                    {l.to ? (
                      <Link to={l.to} className="hover:opacity-100">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="hover:opacity-100">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
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
