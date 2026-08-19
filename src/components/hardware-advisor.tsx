import type { ReactNode } from "react";
import { SectionHeader } from "@/components/section-header";
import { StatusDot } from "@/components/ui/badge";
import {
  RAM_OPTIONS,
  VRAM_OPTIONS,
  advise,
  type AdvisorBias,
  type AdvisorGoal,
  type GpuFamily,
  type RamGB,
} from "@/data/hardware";
import { cn } from "@/lib/cn";
import { useConsole } from "@/store/console-store";

const GOALS: { id: AdvisorGoal; label: string }[] = [
  { id: "talking", label: "Talking clip" },
  { id: "music-video", label: "Music video" },
  { id: "short-film", label: "Short film" },
  { id: "stills", label: "Stills" },
  { id: "long-multi", label: "Long multi-window" },
];

const BIAS: { id: AdvisorBias; label: "Safe" | "Balanced" | "Max quality" }[] = [
  { id: "safe", label: "Safe" },
  { id: "balanced", label: "Balanced" },
  { id: "max", label: "Max quality" },
];

export function HardwareAdvisor() {
  const advisor = useConsole((s) => s.advisor);
  const setAdvisor = useConsole((s) => s.setAdvisor);
  const result = advise(advisor);

  const panel =
    result.status === "comfortable"
      ? "border-safe/40 bg-safe/5"
      : result.status === "tight"
        ? "border-warn/40 bg-warn/5"
        : "border-crash/40 bg-crash/5";

  return (
    <section id="hardware" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="06 · Hardware Advisor"
          title="Tell it the card. It names the ceiling."
          lede="Persists in this browser. Auto-Tune still owns the live profile — this is a starting map, not a guarantee."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <form
            className="bezel space-y-5 rounded-xl border border-border bg-surface p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset>
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                VRAM
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {VRAM_OPTIONS.map((v) => (
                  <Pick
                    key={v}
                    active={advisor.vram === v}
                    onClick={() => setAdvisor({ vram: v })}
                  >
                    {v} GB
                  </Pick>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                System RAM
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {RAM_OPTIONS.map((v) => (
                  <Pick
                    key={v}
                    active={advisor.ram === v}
                    onClick={() => setAdvisor({ ram: v as RamGB })}
                  >
                    {v === 96 ? "96+" : v} GB
                  </Pick>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                GPU family
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {([30, 40, 50] as GpuFamily[]).map((v) => (
                  <Pick
                    key={v}
                    active={advisor.gpu === v}
                    onClick={() => setAdvisor({ gpu: v })}
                  >
                    RTX {v}
                  </Pick>
                ))}
              </div>
              <p className="mt-2 text-xs text-subtle">Sol Engine is RTX 40 / 50 only.</p>
            </fieldset>
            <fieldset>
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                Goal
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {GOALS.map((g) => (
                  <Pick
                    key={g.id}
                    active={advisor.goal === g.id}
                    onClick={() => setAdvisor({ goal: g.id })}
                  >
                    {g.label}
                  </Pick>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                Bias
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {BIAS.map((g) => (
                  <Pick
                    key={g.id}
                    active={advisor.bias === g.id}
                    onClick={() => setAdvisor({ bias: g.id })}
                  >
                    {g.label}
                  </Pick>
                ))}
              </div>
            </fieldset>
            <label className="flex items-start gap-3 rounded-md border border-border bg-inset px-3 py-3 text-sm">
              <input
                type="checkbox"
                className="mt-1 accent-gold"
                checked={advisor.directorLlm}
                onChange={(e) => setAdvisor({ directorLlm: e.target.checked })}
              />
              <span>
                <span className="text-fg">Director + local LLM will also be running.</span>
                <span className="mt-1 block text-xs text-subtle">
                  Gemma 4 4B unloads after 60 s idle. Planning still occupies the GPU.
                </span>
              </span>
            </label>
          </form>

          <div className={cn("bezel rounded-xl border p-5", panel)}>
            <div className="flex flex-wrap items-center gap-3">
              <StatusDot status={result.status} />
              <p className="font-display text-2xl text-fg">{result.headline}</p>
            </div>
            <dl className="mt-5 grid gap-4 md:grid-cols-2">
              <Row k="Video" v={result.video} />
              <Row k="Image" v={result.image} />
              <Row k="Audio" v={result.audio} />
              <Row k="Safe resolution" v={result.resolution} />
              <Row k="Window length" v={result.window} />
              <Row k="Multi-window" v={result.multiWindow} />
              <Row k="Turbo / Sol / Cache" v={result.accel} />
              <Row k="LoRAs / refs" v={result.loras} />
            </dl>
            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                Disable first on OOM
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
                {result.oomOrder.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </div>
            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                RAM warnings
              </p>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                {result.ramWarnings.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-muted">{result.solNote}</p>
            <p className="mt-3 text-sm text-muted">{result.autoTune}</p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[result.beginner, result.maxQuality].map((r) => (
                <article key={r.name} className="rounded-lg border border-border bg-bg/60 p-4">
                  <h3 className="font-display text-xl text-gold">{r.name}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    <li>Video: {r.video}</li>
                    <li>Image: {r.image}</li>
                    <li>Audio: {r.audio}</li>
                    <li>Res: {r.resolution}</li>
                    <li>Window: {r.window}</li>
                    <li>Accel: {r.accel}</li>
                    <li>{r.notes}</li>
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pick({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-sm border px-2.5 py-1.5 font-mono text-[11px] tabular uppercase tracking-[0.12em]",
        active ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">{k}</dt>
      <dd className="mt-1 text-sm text-muted">{v}</dd>
    </div>
  );
}
