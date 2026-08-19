import { SectionHeader } from "@/components/section-header";
import { EDIT_TOOLS } from "@/data/edit";

export function EditSection() {
  return (
    <section id="edit" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="05 · Edit"
          title="After the take exists."
          lede="Five tools. Use them when regenerating the whole clip would throw away a performance you already like."
        />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {EDIT_TOOLS.map((t) => (
            <article key={t.id} className="bezel rounded-xl border border-border bg-surface p-4">
              <h3 className="font-display text-2xl text-fg">{t.name}</h3>
              <p className="mt-2 text-base leading-[1.55] text-fg">{t.blurb}</p>
              <p className="mt-3 text-base text-fg">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                  When.{" "}
                </span>
                {t.when}
              </p>
              <p className="mt-2 text-base text-fg">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                  Cost.{" "}
                </span>
                {t.cost}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
