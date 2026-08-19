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
import type { GoalId, MediaKind, ModelFamily } from "@/data/types";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { useConsole } from "@/store/console-store";

const GOALS: GoalId[] = ["talking", "music-video", "stills", "long-sequence", "low-vram"];

export function ModelsGallery() {
  const [goal, setGoal] = useState<GoalId | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
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
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-gold">
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
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={asset(m.image)}
                          alt=""
                          className={cn("size-full object-cover", stillCrop(m.family))}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                      </div>
                      <div className="p-4">
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
                          {m.maestroLabel}
                        </p>
                        <h4 className="mt-1 font-display text-2xl text-fg">
                          {m.name}
                          <span className="ml-2 text-lg text-muted">{m.variant}</span>
                        </h4>
                        <p className="mt-2 text-base leading-[1.55] text-fg">{m.blurb}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.badges.map((b) => (
                            <Badge key={b} id={b} />
                          ))}
                          {m.typical ? (
                            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                              Typical Studio control
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                    {open === m.id ? (
                      <div className="shutter-open space-y-3 border-t border-border px-4 py-4 text-base leading-[1.55] text-fg">
                        <p>
                          <span className="text-fg">Pro. </span>
                          {m.pro}
                        </p>
                        {m.kind !== "image" ? (
                          <p>
                            <span className="text-fg">Motion. </span>
                            {m.motion}
                          </p>
                        ) : (
                          <p>
                            <span className="text-fg">Job. </span>
                            {m.workflows.join(" · ")}
                          </p>
                        )}
                        {m.kind !== "image" ? (
                          <p>
                            <span className="text-fg">Audio. </span>
                            {m.audio}
                          </p>
                        ) : null}
                        <p>
                          <span className="text-fg">Resolution. </span>
                          {m.resolution}
                        </p>
                        {m.kind !== "image" ? (
                          <p>
                            <span className="text-fg">Window. </span>
                            {m.window}
                          </p>
                        ) : null}
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

const STILL_CROP: Record<ModelFamily, string> = {
  h3: "object-[center_28%]",
  ltx25: "object-center",
  ltx23: "object-[center_42%]",
  wan: "object-[center_62%]",
  hunyuan: "object-[center_38%]",
  flux: "object-[center_22%]",
  krea: "object-[center_32%]",
  qwen: "object-[right_center]",
  music3: "object-center",
  acestep: "object-[center_72%]",
  tts: "object-left",
  sfx: "object-right",
};

function stillCrop(family: ModelFamily) {
  return STILL_CROP[family] ?? "object-center";
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
        "chip rounded-full px-3 py-2",
        active && "chip-on",
      )}
    >
      {children}
    </button>
  );
}

function Comparison({ kind, rows }: { kind: MediaKind; rows: StudioModel[] }) {
  const cols =
    kind === "image"
      ? ([
          { key: "model", label: "Model" },
          { key: "job", label: "Job" },
          { key: "size", label: "Native size" },
          { key: "vram", label: "VRAM" },
          { key: "pick", label: "Pick this if" },
        ] as const)
      : ([
          { key: "model", label: "Model" },
          { key: "audio", label: "Audio" },
          { key: "window", label: "Window / length" },
          { key: "vram", label: "VRAM" },
          { key: "pick", label: "Pick this if" },
        ] as const);

  const cell = (m: StudioModel, key: (typeof cols)[number]["key"]) => {
    if (key === "model") return m.maestroLabel;
    if (key === "job") return m.workflows.join(" · ");
    if (key === "size") return m.resolutions.join(" / ");
    if (key === "audio") return m.audio;
    if (key === "window") return m.window;
    if (key === "vram") return m.vram;
    return m.pickIf;
  };

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-inset">
      <table className="w-full min-w-[720px] text-left text-sm">
        <caption className="sr-only">{kind} comparison</caption>
        <thead className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
          <tr className="border-b border-border">
            {cols.map((c) => (
              <th key={c.key} className="px-3 py-3">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id} className="border-b border-border/70 last:border-0">
              {cols.map((c) => (
                <td key={c.key} className="px-3 py-3 text-fg">
                  {cell(m, c.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
