import { SectionHeader } from "@/components/section-header";
import { OVERVIEW } from "@/data/overview";

export function OverviewSection() {
  return (
    <section id="overview" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="02 · Overview"
          title="A map of the real app."
          lede={OVERVIEW.pinokio}
        />
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {OVERVIEW.version}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {OVERVIEW.cores.map((c) => (
            <article key={c.name} className="bezel rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-2xl text-fg">{c.name}</h3>
              <p className="mt-2 text-base leading-[1.55] text-fg">{c.what}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {OVERVIEW.layout.map((z) => (
            <article key={z.zone} className="rounded-xl border border-border bg-inset p-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
                {z.zone}
              </h3>
              <ul className="mt-3 space-y-2 text-base text-fg">
                {z.items.map((item) => (
                  <li key={item} className="border-l border-gold/40 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {OVERVIEW.extras.map((e) => (
            <article key={e.name} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-xl text-fg">{e.name}</h3>
              <p className="mt-2 text-base leading-[1.55] text-fg">{e.what}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
