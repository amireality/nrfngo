import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import SectionEyebrow from "../components/site/SectionEyebrow";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — Northrop Research Foundation" },
      { name: "description", content: "Get in touch with the Northrop Research Foundation team. Two offices in India, one team." },
      { property: "og:title", content: "Contact us — Northrop Research Foundation" },
      { property: "og:description", content: "Get in touch with the Northrop Research Foundation team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-brand-light px-6 md:px-[110px] py-[100px] flex flex-col lg:flex-row justify-between gap-[48px]">
        <div className="max-w-[480px]">
          <SectionEyebrow>Contact us</SectionEyebrow>
          <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.15]">
            We'd love to hear from you
          </h1>
          <p className="text-ink-muted text-[16px] leading-[1.7] mt-[16px]">
            Have a question or want to partner with us? Send a note through the form, or reach us
            through the details on the right.
          </p>
        </div>
        <div className="max-w-[420px]">
          <p className="font-bold text-[22px]">Let's talk!</p>
          <p className="text-[16px] leading-[28px] mt-[12px]">
            +234 090 1234 6514<br />
            <a href="mailto:hello@Northrop Research Foundation.org" className="hover:text-brand-dark">
              hello@Northrop Research Foundation.org
            </a>
          </p>
          <hr className="my-[24px] border-hairline" />
          <p className="font-bold text-[18px]">Head office</p>
          <p className="text-ink-muted text-[15px] leading-[1.6]">1st Cross, Bandra West, Mumbai, India.</p>
          <p className="font-bold text-[18px] mt-[20px]">Branch office</p>
          <p className="text-ink-muted text-[15px] leading-[1.6]">
            Near FC Road, Pune, Maharashtra, India
          </p>
          <div className="flex gap-[16px] mt-[24px] text-ink-muted">
            <a href="#" aria-label="Facebook"><Facebook className="size-5" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="size-5" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="size-5" /></a>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 md:px-[110px] py-[100px] max-w-[880px] mx-auto w-full">
        {sent ? (
          <div className="bg-brand-light rounded-[20px] p-[48px] text-center">
            <h2 className="font-bold text-[32px]">Thank you — we'll be in touch soon.</h2>
            <p className="text-ink-muted mt-[12px]">Usually within 2 business days.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-[24px] bg-brand hover:bg-brand-dark transition-colors px-[24px] py-[12px] rounded-[4px] text-brand-foreground font-medium"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              <div>
                <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide">First Name</label>
                <input required placeholder="John" className="w-full border-b border-black py-[10px] text-[16px] outline-none bg-transparent focus:border-brand" />
              </div>
              <div>
                <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide">Last Name</label>
                <input required placeholder="Doe" className="w-full border-b border-black py-[10px] text-[16px] outline-none bg-transparent focus:border-brand" />
              </div>
              <div>
                <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide">Email</label>
                <input required type="email" placeholder="johndoe@gmail.com" className="w-full border-b border-black py-[10px] text-[16px] outline-none bg-transparent focus:border-brand" />
              </div>
              <div>
                <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide">Subject</label>
                <input required className="w-full border-b border-black py-[10px] text-[16px] outline-none bg-transparent focus:border-brand" />
              </div>
            </div>
            <div className="mt-[32px]">
              <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide mb-[8px]">Message</label>
              <textarea
                required
                placeholder="Type your message"
                className="w-full border border-black/40 rounded-[8px] h-[160px] p-[16px] text-[16px] outline-none focus:border-brand"
              />
            </div>
            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark transition-colors px-[32px] py-[16px] rounded-[4px] text-brand-foreground text-[16px] font-medium mt-[32px]"
            >
              Send message
            </button>
          </form>
        )}
      </section>

      {/* Map */}
      <div className="h-[380px] w-full bg-brand-light overflow-hidden">
        <iframe
          title="Office location"
          className="size-full border-0"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=6.2603%2C4.9105%2C6.3603%2C4.9705&amp;layer=mapnik&amp;marker=4.9405%2C6.3103"
        />
      </div>

      <Footer />
    </div>
  );
}
