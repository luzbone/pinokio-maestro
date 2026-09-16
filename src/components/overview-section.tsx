import { SectionHeader } from "@/components/section-header";
import { OVERVIEW } from "@/data/overview";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

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

        <YouAreHere />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
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

        <GuideShot
          src="/guide/header.jpg"
          caption="Live header · v2.2"
          note="Director / Studio / Editor / Settings. Gallery filters and All folders sit to the right of the cores."
          className="max-h-36"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {OVERVIEW.extras.map((e) => (
            <article key={e.name} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-xl text-fg">{e.name}</h3>
              <p className="mt-2 text-base leading-[1.55] text-fg">{e.what}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-display text-2xl text-fg">First 15 minutes</h3>
            <ol className="mt-4 space-y-3">
              {OVERVIEW.firstMinutes.map((step, i) => (
                <li key={step} className="flex gap-3 text-base leading-[1.55] text-fg">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted">
              Install from{" "}
              <a className="text-gold underline-offset-2 hover:underline" href="https://pinokio.co/apps/github-com-blizaine-maestro">
                Pinokio
              </a>{" "}
              or clone{" "}
              <a className="text-gold underline-offset-2 hover:underline" href="https://github.com/Blizaine/Maestro">
                Blizaine/Maestro
              </a>
              .
            </p>
          </article>
          <article className="rounded-xl border border-border bg-inset p-5">
            <h3 className="font-display text-2xl text-fg">What’s new, by version</h3>
            <div className="mt-3 space-y-2">
              {OVERVIEW.whatsNew.map((w) => (
                <details key={w.ver} className="rounded-md border border-border bg-surface px-4 py-3">
                  <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-gold">
                    {w.ver} · {w.date}
                  </summary>
                  <ul className="mt-3 space-y-2 text-base text-fg">
                    {w.points.map((p) => (
                      <li key={p} className="border-l border-gold/40 pl-3">
                        {p}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function YouAreHere() {
  const nodes = [
    { id: "studio", title: "Studio", body: "Make the shot. Video · Image · Audio. Transform and Finish live here." },
    { id: "director", title: "Director", body: "Plan the film. Music Video or Short Film. Opens in Editor when done." },
    { id: "editor", title: "Editor", body: "Cut and export. Titles, speed, round-trip back to Studio AI." },
  ];
  return (
    <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">You are here</p>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {nodes.map((n, i) => (
          <div key={n.id} className="contents">
            <a
              href={`#${n.id}`}
              className="rounded-lg border border-border bg-surface px-4 py-3 hover:border-gold"
            >
              <p className="font-display text-xl text-fg">{n.title}</p>
              <p className="mt-1 text-sm leading-[1.5] text-muted">{n.body}</p>
            </a>
            {i < nodes.length - 1 ? (
              <p className="hidden text-center font-mono text-xs uppercase tracking-[0.16em] text-gold md:block">
                →
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GuideShot({
  src,
  caption,
  note,
  className,
}: {
  src: string;
  caption: string;
  note: string;
  className?: string;
}) {
  return (
    <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-inset">
      <img
        src={asset(src)}
        alt={caption}
        className={cn("w-full object-cover object-top", className)}
      />
      <figcaption className="border-t border-border px-4 py-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">{caption}</p>
        <p className="mt-1 text-sm leading-[1.5] text-fg">{note}</p>
      </figcaption>
    </figure>
  );
}
