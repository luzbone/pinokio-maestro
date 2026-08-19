import { SectionHeader } from "@/components/section-header";
import { FAQ, RULES } from "@/data/faq";

export function CheatSheet() {
  return (
    <section id="cheat" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="07 · Cheat sheet"
          title="Ten rules. Then the questions that actually come up."
          lede="Short enough to read before a generate. Specific enough to stop a bad default."
        />
        <ol className="grid gap-3 md:grid-cols-2">
          {RULES.map((r) => (
            <li key={r.n} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-mono text-[11px] text-gold">{r.n}</p>
              <h3 className="mt-1 font-display text-2xl text-fg">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">{r.body}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-12 font-display text-3xl text-fg">FAQ</h3>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-border bg-inset px-5 py-4"
            >
              <summary className="cursor-pointer font-display text-xl text-fg">
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <footer className="mt-16 border-t border-border pt-8 text-sm text-subtle">
          <p>
            Teaching replica of Maestro v1.8.7.1 (Blizaine). Not affiliated. Labels marked
            “typical Studio control” describe function when the exact UI string may differ.
          </p>
        </footer>
      </div>
    </section>
  );
}
