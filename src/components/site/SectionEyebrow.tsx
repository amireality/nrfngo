export default function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[16px] mb-[24px]">
      <span className="block w-[72px] h-[2px] bg-brand" />
      <p className="font-bold uppercase text-[14px] tracking-[2px] text-ink">{children}</p>
    </div>
  );
}
