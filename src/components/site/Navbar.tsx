import { Link, useRouterState } from "@tanstack/react-router";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about-us" },
  { label: "What We Do", to: "/what-we-do" },
  { label: "Media", to: "/media" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar({ variant = "default" }: { variant?: "default" | "tint" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bg = variant === "tint" ? "bg-[color:var(--brand-tint)]" : "bg-white/90";

  return (
    <nav
      className={`${bg} backdrop-blur-md border-b border-black/10 sticky top-0 z-50 flex items-center justify-between px-6 md:px-[110px] py-[18px]`}
    >
      <Link to="/" className="flex items-baseline">
        <span className="font-bold text-[24px] text-ink">largerthan</span>
        <span className="font-script text-[25px] text-ink" style={{ marginLeft: -4 }}>
          i
        </span>
      </Link>

      <div className="hidden md:flex gap-[40px] text-[16px] font-medium">
        {NAV_LINKS.map((l) => {
          const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              className={active ? "text-ink" : "text-ink-muted hover:text-ink transition-colors"}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      <Link
        to="/donation"
        className="bg-[color:var(--ink-soft)] text-white px-[32px] py-[12px] rounded-[4px] text-[16px] font-medium hover:opacity-90 transition-opacity"
      >
        Donate
      </Link>
    </nav>
  );
}
