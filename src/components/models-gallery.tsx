import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GOAL_LABELS,
  MODELS,
  modelsByKind,
  type StudioModel,
} from "@/data/models";
import type { GoalId, MediaKind } from "@/data/types";
import { cn } from "@/lib/cn";
import { useConsole } from "@/store/console-store";

const GOALS: GoalId[] = ["talking", "music-video", "stills", "long-sequence", "low-vram"];

export function ModelsGallery() {
  const [goal, setGoal] = useState<GoalId | "all">("all");
  const [open, setOpen] = useState<string | null>("h3-omni-pruned");
  const setModel = useConsole((s) => s.setModel);
  const setMode = useConsole((s) => s.setMode);
  const setPanel = useConsole((s) => s.setPanel);

  const filtered = useMemo(() => {
    if (goal === "all") return MODELS;
    return MODELS.filter((m) => m.goals.includes(goal));
  }, [goal]);

  const enter = (m: StudioModel) => {
    setMode(m.kind);
    setModel(m.id);
    setPanel("studio");
    document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="models" className="scroll-mt-24 px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="01 · Models"
          title="Pick the engine, then the personality."
          lede="Three galleries. Each card starts in plain English. Open it for tradeoffs, VRAM, and when the default is a waste."
        />

        <div className="mb-10">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            I want
          </p>
          <div className="flex flex-wrap gap-2">
            <Chooser active={goal === "all"} onClick={() => setGoal("all")}>
              Everything
            </Chooser>
            {GOALS.map((g) => (
              <Chooser key={g} active={goal === g} onClick={() => setGoal(g)}>
                {GOAL_LABELS[g]}
              </Chooser>
            ))}
          </div>
        </div>

        {(["video", "image", "audio"] as MediaKind[]).map((kind) => {
          const rows = modelsByKind(kind).filter((m) => filtered.includes(m));
          if (!rows.length) return null;
          return (
            <div key={kind} className="mb-14">
              <h3 className="mb-4 font-display text-3xl capitalize text-fg">{kind}</h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {rows.map((m) => (
                  <article
                    key={m.id}
                    className="spotlight bezel overflow-hidden rounded-xl border border-border bg-surface"
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--lx", `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty("--ly", `${e.clientY - r.top}px`);
                    }}
                  >
                    <button
                      type="button"
                      className="block w-full text-left"
                      onClick={() => setOpen(open === m.id ? null : m.id)}
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img src={m.image} alt="" className="size-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                      </div>
                      <div className="p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                          {m.maestroLabel}
                        </p>
                        <h4 className="mt-1 font-display text-2xl text-fg">
                          {m.name}
                          <span className="ml-2 text-lg text-muted">{m.variant}</span>
                        </h4>
                        <p className="mt-2 text-sm text-muted">{m.blurb}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.badges.map((b) => (
                            <Badge key={b} id={b} />
                          ))}
                          {m.typical ? (
                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                              Typical Studio control
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                    {open === m.id ? (
                      <div className="shutter-open space-y-3 border-t border-border px-4 py-4 text-sm text-muted">
                        <p>
                          <span className="text-fg">Pro. </span>
                          {m.pro}
                        </p>
                        <p>
                          <span className="text-fg">Motion. </span>
                          {m.motion}
                        </p>
                        <p>
                          <span className="text-fg">Audio. </span>
                          {m.audio}
                        </p>
                        <p>
                          <span className="text-fg">Resolution. </span>
                          {m.resolution}
                        </p>
                        <p>
                          <span className="text-fg">Window. </span>
                          {m.window}
                        </p>
                        <p>
                          <span className="text-fg">VRAM / RAM. </span>
                          {m.vram} {m.ram}
                        </p>
                        <p>
                          <span className="text-fg">Pick this if. </span>
                          {m.pickIf}
                        </p>
                        <Button size="sm" onClick={() => enter(m)}>
                          Load in Studio
                        </Button>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
              <Comparison kind={kind} rows={rows} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Chooser({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em]",
        active ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Comparison({ kind, rows }: { kind: MediaKind; rows: StudioModel[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-inset">
      <table className="w-full min-w-[720px] text-left text-sm">
        <caption className="sr-only">{kind} comparison</caption>
        <thead className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
          <tr className="border-b border-border">
            <th className="px-3 py-3">Model</th>
            <th className="px-3 py-3">Audio</th>
            <th className="px-3 py-3">Window / length</th>
            <th className="px-3 py-3">VRAM</th>
            <th className="px-3 py-3">Pick this if</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id} className="border-b border-border/70 last:border-0">
              <td className="px-3 py-3 text-fg">{m.maestroLabel}</td>
              <td className="px-3 py-3 text-muted">{m.audio}</td>
              <td className="px-3 py-3 text-muted">{m.window}</td>
              <td className="px-3 py-3 text-muted">{m.vram}</td>
              <td className="px-3 py-3 text-muted">{m.pickIf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
