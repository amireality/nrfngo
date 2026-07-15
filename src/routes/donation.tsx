import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import CTASection from "../components/site/CTASection";
import VolunteerPopup from "../components/site/VolunteerPopup";
import SectionEyebrow from "../components/site/SectionEyebrow";

const IMG_HERO =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";

const TABS = ["Overview", "Impact", "What you get"] as const;
type Tab = (typeof TABS)[number];

const TAB_COPY: Record<Tab, string> = {
  Overview:
    "Your donation goes directly into programme delivery. 92% of every naira reaches a child — through therapy sessions, tuition, meals and medical care. We publish an audited breakdown every quarter.",
  Impact:
    "In 2022, contributions from 1,200 donors helped us onboard 74 new children, run 3,000 therapy sessions and open a second centre in Yenagoa. Every donor gets a personalised impact report.",
  "What you get":
    "Beyond the annual report, monthly donors receive quarterly video updates from the children (with parental consent), an invitation to our annual family day, and a tax deduction receipt.",
};

const AMOUNTS = [1000, 5000, 15000, 50000];

export const Route = createFileRoute("/donation")({
  head: () => ({
    meta: [
      { title: "Donate — largerthani" },
      { name: "description", content: "Support therapy, education and family care for children with special needs. Every naira reaches a child." },
      { property: "og:title", content: "Donate — largerthani" },
      { property: "og:description", content: "92% of every naira reaches a child. Donate today." },
      { property: "og:image", content: IMG_HERO },
    ],
  }),
  component: Donation,
});

function Donation() {
  const [popup, setPopup] = useState(false);
  const [tab, setTab] = useState<Tab>("Overview");
  const [amount, setAmount] = useState<number>(5000);
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [custom, setCustom] = useState("");

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[100px] flex flex-col lg:flex-row justify-between gap-[48px]">
        <div className="max-w-[627px]">
          <SectionEyebrow>Donate</SectionEyebrow>
          <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.15]">
            Making a donation for our children
          </h1>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[16px] max-w-[517px]">
            When you donate, you're supporting effective care for children with special needs — an
            investment in the leaders of tomorrow.
          </p>
        </div>
        <div className="h-[300px] lg:h-[384px] w-full lg:w-[480px] rounded-[20px] overflow-hidden shrink-0">
          <img alt="" className="object-cover size-full" src={IMG_HERO} />
        </div>
      </section>

      {/* Donation form */}
      <section className="px-6 md:px-[110px] py-[100px]">
        <div className="max-w-[720px] mx-auto bg-[color:var(--brand-tint)] rounded-[24px] p-[32px] md:p-[48px]">
          <h2 className="font-bold text-[28px] md:text-[32px]">Choose your gift</h2>
          <p className="text-ink-muted text-[15px] mt-[8px]">
            One-time gifts and monthly support both count. Pick what works for you.
          </p>

          <div className="flex gap-[8px] mt-[24px] p-[4px] bg-white rounded-[999px] w-fit">
            {(["once", "monthly"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFreq(f)}
                className={`px-[24px] py-[10px] rounded-[999px] text-[14px] font-medium capitalize transition-colors ${
                  freq === f ? "bg-brand text-brand-foreground" : "text-ink-muted"
                }`}
              >
                {f === "once" ? "One-time" : "Monthly"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] mt-[24px]">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setAmount(a);
                  setCustom("");
                }}
                className={`py-[16px] rounded-[8px] font-bold text-[18px] border-2 transition-colors ${
                  amount === a && !custom
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-hairline bg-white text-ink hover:border-brand"
                }`}
              >
                ₦{a.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mt-[16px]">
            <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide mb-[8px]">
              Or enter a custom amount
            </label>
            <div className="flex items-center bg-white border border-hairline rounded-[8px] px-[16px]">
              <span className="text-ink-muted mr-2">₦</span>
              <input
                type="number"
                min={100}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="10,000"
                className="flex-1 py-[14px] text-[16px] outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            onClick={() => alert(`Thank you! ${freq === "monthly" ? "Monthly " : ""}₦${(custom || amount).toLocaleString()} — payment integration coming soon.`)}
            className="mt-[24px] w-full bg-brand hover:bg-brand-dark transition-colors py-[16px] rounded-[8px] text-brand-foreground font-bold text-[16px]"
          >
            Donate ₦{(custom ? Number(custom) || 0 : amount).toLocaleString()} {freq === "monthly" && "/ month"}
          </button>
          <p className="text-[13px] text-ink-muted text-center mt-[12px]">
            Secure payment via Paystack · You'll receive a receipt for tax deduction.
          </p>
        </div>
      </section>

      {/* Contribution info tabs */}
      <section className="flex flex-col lg:flex-row justify-between gap-[48px] px-6 md:px-[110px] pb-[100px]">
        <div className="max-w-[560px]">
          <h2 className="font-bold text-[32px] md:text-[48px] leading-[1.15]">
            How you can contribute to caring for our kids
          </h2>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[24px]">
            Beyond financial gifts, you can donate skills, supplies or your time. Corporate
            partnerships and long-term sponsorships help us plan for years, not months.
          </p>
        </div>
        <div className="max-w-[560px] flex-1">
          <div className="flex gap-[8px] border-b border-hairline overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-[20px] py-[10px] text-[15px] font-medium whitespace-nowrap ${
                  tab === t ? "text-ink border-b-2 border-brand" : "text-ink-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[24px]">{TAB_COPY[tab]}</p>
        </div>
      </section>

      {/* How we use */}
      <section className="border-t border-hairline px-6 md:px-[110px] py-[100px] grid md:grid-cols-3 gap-[48px]">
        <h2 className="font-bold text-[32px] md:text-[42px] leading-[1.15]">
          How we use your donation
        </h2>
        <p className="text-ink-muted text-[16px] leading-[1.7]">
          Our budget is public. Every quarter, we publish an audited breakdown of where every naira
          went — down to per-child spend across therapy, tuition, meals and medical care.
        </p>
        <p className="text-ink-muted text-[16px] leading-[1.7]">
          We keep operating overhead under 8%. That's rare — and only possible because most of our
          senior team draws a modest, publicly-listed salary.
        </p>
      </section>

      <CTASection onVolunteerClick={() => setPopup(true)} />
      <Footer />
      <VolunteerPopup open={popup} onClose={() => setPopup(false)} />
    </div>
  );
}
