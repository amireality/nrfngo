import { X } from "lucide-react";
import { useEffect } from "react";

export default function VolunteerPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white relative rounded-[8px] p-8 md:p-[48px] w-full max-w-[640px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-[20px] top-[20px] size-[32px] rounded-full hover:bg-hairline flex items-center justify-center"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
        <h2 className="font-bold text-[28px] md:text-[40px] leading-[1.4]">Join as a volunteer</h2>
        <p className="text-ink-muted text-[14px] leading-[1.6] mt-[12px] max-w-[544px]">
          Lend your time and skills — from weekend visits to skill-based mentorship. Tell us a bit
          about yourself and our team will reach out.
        </p>

        <form
          className="mt-[36px]"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div>
              <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide">First Name</label>
              <input className="w-full border-b border-black py-[8px] text-[16px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide">Last Name</label>
              <input className="w-full border-b border-black py-[8px] text-[16px] outline-none focus:border-brand" />
            </div>
          </div>
          <div className="mt-[24px]">
            <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide">Email Id</label>
            <input type="email" className="w-full border-b border-black py-[8px] text-[16px] outline-none focus:border-brand" />
          </div>
          <div className="mt-[24px]">
            <label className="opacity-60 font-bold text-[12px] block uppercase tracking-wide mb-[8px]">Message</label>
            <textarea
              placeholder="Type your Message"
              className="w-full border border-black/40 rounded-[4px] h-[140px] p-[16px] text-[16px] outline-none focus:border-brand"
            />
          </div>
          <button
            type="submit"
            className="bg-brand hover:bg-brand-dark transition-colors px-[32px] py-[16px] rounded-[4px] text-brand-foreground text-[16px] font-medium mt-[32px]"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
