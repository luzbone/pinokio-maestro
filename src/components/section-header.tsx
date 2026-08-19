export function SectionHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{kicker}</p>
      <h2 className="mt-2 font-display text-4xl text-fg md:text-5xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted">{lede}</p>
    </header>
  );
}
