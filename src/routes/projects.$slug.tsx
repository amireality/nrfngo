import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Calendar, TrendingUp, MapPin } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import CTASection from "../components/site/CTASection";
import VolunteerPopup from "../components/site/VolunteerPopup";
import SectionEyebrow from "../components/site/SectionEyebrow";

const IMG_1 =
  "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?auto=format&fit=crop&w=1400&q=80";
const IMG_2 =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80";
const IMG_3 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80";

type Project = {
  slug: string;
  title: string;
  hero: string;
  intro: string;
  stats: { label: string; value: string; Icon: typeof Users }[];
};

const PROJECTS: Record<string, Project> = {
  "mission-smile-1k": {
    slug: "mission-smile-1k",
    title: "Mission Smile 1K: Outdoor charity outreach",
    hero: IMG_1,
    intro:
      "A twelve-village outreach across Bayelsa and Delta states designed to reach children who have never had access to specialist care.",
    stats: [
      { Icon: Users, value: "1,240", label: "People served" },
      { Icon: Calendar, value: "20+", label: "Orphanage visits in 2 months" },
      { Icon: MapPin, value: "12", label: "Villages reached" },
      { Icon: TrendingUp, value: "₦1.2M", label: "Raised for this initiative" },
    ],
  },
  "weekly-excursions": {
    slug: "weekly-excursions",
    title: "Weekly excursions",
    hero: IMG_2,
    intro:
      "Every Saturday, our children go out — parks, museums, botanical gardens. Structured outdoor time is core to therapy, not an extra.",
    stats: [
      { Icon: Users, value: "60", label: "Children per week" },
      { Icon: Calendar, value: "48", label: "Excursions in 2022" },
      { Icon: MapPin, value: "12", label: "Partner venues" },
      { Icon: TrendingUp, value: "94%", label: "Family satisfaction" },
    ],
  },
  "monthly-public-awareness": {
    slug: "monthly-public-awareness",
    title: "Monthly public awareness",
    hero: IMG_3,
    intro:
      "Radio shows, community talks and school workshops that break the stigma at the root — before it becomes a barrier to care.",
    stats: [
      { Icon: Users, value: "8,000+", label: "Direct reach per month" },
      { Icon: Calendar, value: "12", label: "Events per year" },
      { Icon: MapPin, value: "3", label: "States covered" },
      { Icon: TrendingUp, value: "37%", label: "Increase in referrals" },
    ],
  },
};

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS[params.slug];
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — largerthani" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — largerthani` },
        { name: "description", content: project.intro },
        { property: "og:title", content: `${project.title} — largerthani` },
        { property: "og:description", content: project.intro },
        { property: "og:image", content: project.hero },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="px-6 md:px-[110px] py-[120px] text-center">
        <h1 className="font-bold text-[42px]">Project not found</h1>
        <p className="text-ink-muted mt-[12px]">The project you're looking for doesn't exist.</p>
        <Link to="/what-we-do" className="inline-block mt-[24px] bg-brand hover:bg-brand-dark transition-colors px-[24px] py-[12px] rounded-[4px] text-brand-foreground font-medium">
          See all projects
        </Link>
      </div>
      <Footer />
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const [popup, setPopup] = useState(false);
  const others = Object.values(PROJECTS).filter((p) => p.slug !== project.slug);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Post body */}
      <article className="px-6 md:px-[110px] py-[100px] max-w-[832px] mx-auto">
        <SectionEyebrow>Our project</SectionEyebrow>
        <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.15]">{project.title}</h1>
        <p className="text-ink-muted text-[16px] leading-[1.7] mt-[24px]">{project.intro}</p>

        <div className="text-ink-muted text-[16px] leading-[1.7] mt-[24px] space-y-[16px]">
          <p>
            The programme runs on a rolling three-month cycle. In each cycle we identify a cluster
            of underserved communities, partner with the local health authority, and set up mobile
            clinics staffed by therapists, paediatricians and volunteer teachers.
          </p>
          <p>
            Every intake is followed up. We don't run a one-off clinic and disappear — that's what
            makes this different from a typical outreach programme.
          </p>
        </div>

        <div className="h-[280px] md:h-[400px] rounded-[20px] overflow-hidden my-[40px]">
          <img alt="" className="object-cover size-full" src={project.hero} />
        </div>

        <h2 className="font-bold text-[32px] md:text-[42px] leading-[1.2] mt-[16px]">
          What made it work
        </h2>
        <p className="text-ink-muted text-[16px] leading-[1.7] mt-[16px]">
          Three things — none of them technology.
        </p>
        <ul className="list-disc ml-[20px] font-medium text-[16px] mt-[16px] space-y-[8px]">
          <li>Existing relationships with local health workers, built over years.</li>
          <li>Long-term follow-up baked into the intake, not tacked on after.</li>
          <li>Honest, published data on what's working and what isn't.</li>
        </ul>
      </article>

      {/* Stats */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[64px] gap-y-[40px] max-w-[900px] mx-auto">
          {project.stats.map(({ Icon, value, label }) => (
            <div key={label} className="flex gap-[20px] items-start">
              <Icon className="size-8 text-brand-dark shrink-0 mt-1" strokeWidth={1.75} />
              <div>
                <p className="font-bold text-[28px] leading-[1.2]">{value}</p>
                <p className="text-ink-muted text-[15px] leading-[1.6] mt-[4px]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More projects */}
      <section className="px-6 md:px-[110px] py-[100px]">
        <SectionEyebrow>More projects</SectionEyebrow>
        <div className="grid md:grid-cols-2 gap-[20px] mt-[24px]">
          {others.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="relative h-[300px] rounded-[20px] overflow-hidden group"
            >
              <img alt="" className="absolute inset-0 object-cover size-full transition-transform group-hover:scale-105" src={p.hero} />
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

      <CTASection onVolunteerClick={() => setPopup(true)} />
      <Footer />
      <VolunteerPopup open={popup} onClose={() => setPopup(false)} />
    </div>
  );
}
