import { SectionHeader } from "@/components/section-header";
import { GuideShot } from "@/components/overview-section";
import { Button } from "@/components/ui/button";
import { EDITOR_FEATURES, TRANSFORM_TOOLS } from "@/data/edit";
import { toast } from "sonner";
import { useConsole } from "@/store/console-store";

export function EditSection() {
  const enqueue = useConsole((s) => s.enqueue);
  const lockPanel = useConsole((s) => s.lockPanel);

  return (
    <section id="editor" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="05 · Editor"
          title="This is where movies are finished."
          lede="Studio makes the shot. Transform tools still live inside Studio Video. Editor is the timeline — titles, speed, export, and round-trips back to Studio."
        />

        <GuideShot
          src="/guide/editor.jpg"
          caption="Live Editor · empty timeline"
          note="Multi-track canvas, browse workspaces, send a clip to Studio AI. This handbook does not simulate an NLE — match this chrome in the real app."
        />

        <div className="mt-8 bezel overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center gap-1 border-b border-border px-3 py-1.5">
            {["Director", "Studio", "Editor"].map((tab) => (
              <span
                key={tab}
                className={
                  tab === "Editor"
                    ? "rounded-sm bg-gold px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
                    : "rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                }
              >
                {tab}
              </span>
            ))}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              21:9 · undo / redo · H.264 / H.265 / AV1
            </span>
          </div>
          <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="space-y-2 border-b border-border p-4 lg:border-b-0 lg:border-r">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">Media</p>
              <p className="text-sm text-muted">Workspaces, uploads, favorites. Identical files are reused, not copied.</p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  lockPanel("studio");
                  document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
                  toast("Replica: send clip to Studio AI, then drop the new take on this edit.");
                }}
              >
                Send clip to Studio
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  enqueue("hold", "editor");
                  toast("Editor export held in the Generation Queue. The replica does not encode.");
                }}
              >
                Export
              </Button>
            </aside>
            <div className="p-4">
              <div className="rounded-md border border-dashed border-gold/30 bg-inset px-4 py-10 text-center">
                <p className="font-display text-2xl text-fg">Empty timeline</p>
                <p className="mt-2 text-sm text-muted">
                  Drop Studio takes and a YuE2 / uploaded song. Director productions expand as separate shot clips plus a soundtrack layer.
                </p>
              </div>
              <div className="mt-3 space-y-1">
                {["V1 · picture", "A1 · dialogue / H3 bed", "A2 · soundtrack", "T1 · titles"].map((lane) => (
                  <div key={lane} className="flex h-8 items-center rounded-sm border border-border bg-surface px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {lane}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {EDITOR_FEATURES.map((f) => (
            <article key={f.name} className="rounded-xl border border-border bg-surface p-4">
              <h3 className="font-display text-xl text-fg">{f.name}</h3>
              <p className="mt-2 text-base leading-[1.55] text-fg">{f.what}</p>
            </article>
          ))}
        </div>

        <h3 className="mt-12 font-display text-3xl text-fg">Transform stays in Studio</h3>
        <p className="mt-2 max-w-3xl text-base text-muted">
          Retake, Prompt Edit, Viggle, Recast and the rest are Video → Transform — not a header core. Use them when regenerating the whole clip would throw away a performance you already like.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {TRANSFORM_TOOLS.map((t) => (
            <article key={t.id} className="bezel rounded-xl border border-border bg-surface p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">{t.where}</p>
              <h3 className="mt-1 font-display text-2xl text-fg">{t.name}</h3>
              <p className="mt-2 text-base leading-[1.55] text-fg">{t.blurb}</p>
              <p className="mt-3 text-base text-fg">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gold">When. </span>
                {t.when}
              </p>
              <p className="mt-2 text-base text-fg">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gold">Cost. </span>
                {t.cost}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
