import { Link } from "@tanstack/react-router";

export default function CTASection({ onVolunteerClick }: { onVolunteerClick?: () => void }) {
  return (
    <section className="px-6 md:px-[110px] py-[80px]">
      <div className="relative min-h-[384px] rounded-[20px] overflow-hidden flex items-center justify-center text-center px-6 py-16">
        <img
          alt=""
          className="absolute inset-0 object-cover size-full"
          src="https://images.unsplash.com/photo-1497375638960-ca368c7231e4?auto=format&fit=crop&w=1600&q=80"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-[805px]">
          <p className="font-bold text-[32px] md:text-[48px] leading-[1.2] text-white">
            You can contribute to provide a place for children with special needs!
          </p>
          <div className="flex flex-wrap gap-[16px] justify-center mt-[32px]">
            <button
              onClick={onVolunteerClick}
              className="bg-brand hover:bg-brand-dark transition-colors px-[32px] py-[16px] rounded-[4px] text-brand-foreground text-[16px] font-medium"
            >
              Join as a volunteer
            </button>
            <Link
              to="/donation"
              className="backdrop-blur-md bg-white/95 hover:bg-white transition-colors px-[32px] py-[16px] rounded-[4px] text-[color:var(--ink-soft)] text-[16px] font-medium"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
