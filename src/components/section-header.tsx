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
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">{kicker}</p>
      <h2 className="mt-2 font-display text-4xl text-fg md:text-5xl">{title}</h2>
      <p className="mt-3 text-base leading-[1.55] text-fg md:text-lg">{lede}</p>
    </header>
  );
}
