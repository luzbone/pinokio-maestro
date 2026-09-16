import type { ReactNode } from "react";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  CUT_SPEED_LABELS,
  DIRECTOR_SKILLS,
  DIRECTOR_STAGES,
  PACING_LABELS,
  SAMPLE_RUNS,
} from "@/data/director";
import { MODELS } from "@/data/models";
import { modelsForFilter } from "@/data/studio-tree";
import { toast } from "sonner";
import { useConsole } from "@/store/console-store";
import { GuideShot } from "@/components/overview-section";

export function DirectorConsole() {
  const d = useConsole((s) => s.director);
  const setDirector = useConsole((s) => s.setDirector);
  const plan = useConsole((s) => s.planDirector);
  const reset = useConsole((s) => s.resetDirector);
  const enqueue = useConsole((s) => s.enqueue);

  const video = MODELS.find((m) => m.id === d.videoModel);
  const native = video?.maxNativeSec ?? 14.4;
  const windows = Math.max(1, Math.ceil((d.plannedDuration - 1) / Math.max(native - 1, 1)));
  const stage = DIRECTOR_STAGES.find((s) => s.id === d.stage) ?? DIRECTOR_STAGES[0];

  return (
    <section id="director" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="04 · Director"
          title="One prompt. A planned picture."
          lede="v2.2 checkpoints the project before render. YuE2 is the default soundtrack generator. Finished productions open in Editor as separate shot clips plus the song. Held Director jobs share the Generation Queue with Studio."
        />

        <GuideShot
          src="/guide/director-skills.jpg"
          caption="Live Director · skills"
          note="Music Video and Short Film are live. Video Podcast and Viral Video show Coming Soon — do not hunt for them."
        />

        <div className="bezel overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
              Director · {d.locked ? "Setup locked" : "Setup open"}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={plan} disabled={d.locked}>
                Plan
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  enqueue("hold", "director");
                  toast("Director project held in the Generation Queue. The replica does not render.");
                }}
              >
                Add to Queue
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  toast("Replica: Load Settings would restore the last checkpointed project from disk.")
                }
              >
                Load Settings
              </Button>
              <Button size="sm" variant="ghost" onClick={reset}>
                Unlock / reset
              </Button>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="bg-inset/40 p-5">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Skill">
                  <Chip
                    disabled={d.locked}
                    value={d.skill}
                    options={DIRECTOR_SKILLS.filter((s) => s.live).map((s) => ({
                      value: s.id,
                      label: s.label,
                    }))}
                    onChange={(skill) => setDirector({ skill: skill as typeof d.skill })}
                  />
                  <p className="mt-2 text-xs text-muted">
                    {DIRECTOR_SKILLS.find((s) => s.id === d.skill)?.desc}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {DIRECTOR_SKILLS.filter((s) => !s.live)
                      .map((s) => s.label)
                      .join(" · ")}{" "}
                    — coming soon.
                  </p>
                </Field>
                <Field label="Track">
                  <Chip
                    disabled={d.locked}
                    value={d.soundtrack}
                    options={[
                      { value: "existing", label: "Upload a track" },
                      { value: "yue2", label: "Generate · YuE2" },
                      { value: "music3", label: "Generate · Music3" },
                      { value: "acestep", label: "Generate · ACE-Step" },
                    ]}
                    onChange={(soundtrack) =>
                      setDirector({ soundtrack: soundtrack as typeof d.soundtrack })
                    }
                  />
                </Field>
                <Field label="Aspect">
                  <Chip
                    disabled={d.locked}
                    value={d.aspect}
                    options={[
                      { value: "16:9", label: "16:9 Wide" },
                      { value: "9:16", label: "9:16 Portrait" },
                      { value: "21:9", label: "21:9 Cinema" },
                      { value: "1:1", label: "1:1 Square" },
                      { value: "4:3", label: "4:3 Classic" },
                      { value: "3:4", label: "3:4 Tall" },
                    ]}
                    onChange={(aspect) => setDirector({ aspect })}
                  />
                </Field>
                <Field label="Resolution">
                  <Chip
                    disabled={d.locked}
                    value={["480p", "540p", "720p", "1080p"].includes(d.resolution) ? d.resolution : "720p"}
                    options={[
                      { value: "480p", label: "480p" },
                      { value: "540p", label: "540p" },
                      { value: "720p", label: "720p" },
                      { value: "1080p", label: "1080p" },
                    ]}
                    onChange={(resolution) => setDirector({ resolution })}
                  />
                </Field>
                <Field label="Workflow">
                  <Chip
                    disabled={d.locked}
                    value={d.workflow === "Seamless" || d.workflow === "Auto" ? d.workflow : "Auto"}
                    options={[
                      { value: "Seamless", label: "Seamless" },
                      { value: "Auto", label: "Auto" },
                    ]}
                    onChange={(workflow) => setDirector({ workflow })}
                  />
                </Field>
                <Field label="Video model">
                  <select
                    className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
                    value={d.videoModel}
                    onChange={(e) => setDirector({ videoModel: e.target.value })}
                  >
                    {modelsForFilter("video").map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.maestroLabel}
                        {m.family === "wan" || m.family === "hunyuan" ? " (opt-in)" : ""}
                      </option>
                    ))}
                  </select>
                  {d.locked ? (
                    <p className="mt-1 text-xs text-muted">
                      After Plan, changing the video model rebuilds clip timing without re-uploading audio.
                    </p>
                  ) : null}
                </Field>
                <Field label="Image model">
                  <select
                    className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
                    value={d.imageModel}
                    disabled={d.locked}
                    onChange={(e) => setDirector({ imageModel: e.target.value })}
                  >
                    <option value="none">None — no generated images</option>
                    {MODELS.filter((m) => m.kind === "image").map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.maestroLabel}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Review">
                  <Chip
                    disabled={d.locked}
                    value={d.review}
                    options={[
                      { value: "auto", label: "Auto" },
                      { value: "manual", label: "Manual review" },
                    ]}
                    onChange={(review) => setDirector({ review: review as typeof d.review })}
                  />
                </Field>
                <Field label="Clip length">
                  <Chip
                    disabled={d.locked}
                    value={d.clipLength === "auto" ? "auto" : "custom"}
                    options={[
                      { value: "auto", label: "Auto" },
                      { value: "custom", label: "Custom cap" },
                    ]}
                    onChange={(v) => setDirector({ clipLength: v === "auto" ? "auto" : 8 })}
                  />
                  <p className="mt-1 text-xs text-muted">
                    Model-aligned. H3 stays on native windows. GPU clip limit in Advanced can raise H3 Ref2VA toward 14.4 s.
                  </p>
                </Field>
                <Field label="GPU clip limit">
                  <Chip
                    disabled={d.locked}
                    value={d.gpuClipLimit ? "on" : "off"}
                    options={[
                      { value: "off", label: "Default" },
                      { value: "on", label: "Raise H3 cap" },
                    ]}
                    onChange={(v) => setDirector({ gpuClipLimit: v === "on" })}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
                  Cut Speed
                </p>
                <input
                  type="range"
                  min={-2}
                  max={2}
                  step={1}
                  value={d.cutSpeed}
                  disabled={d.locked}
                  onChange={(e) => setDirector({ cutSpeed: Number(e.target.value) })}
                  className="mt-2 w-full accent-gold"
                />
                <p className="mt-1 text-xs text-muted">
                  {CUT_SPEED_LABELS.find((c) => c.value === d.cutSpeed)?.label ?? "0 default"}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
                  Pacing-bias
                </p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={d.pacing}
                  disabled={d.locked}
                  onChange={(e) => setDirector({ pacing: Number(e.target.value) })}
                  className="mt-2 w-full accent-gold"
                />
                <p className="mt-1 text-xs text-muted">
                  {PACING_LABELS.reduce((acc, cur) =>
                    Math.abs(cur.value - d.pacing) < Math.abs(acc.value - d.pacing) ? cur : acc,
                  ).label}
                </p>
              </div>

              <div className="mt-4 rounded-md border border-border bg-inset p-3 text-base text-fg">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                  Character / voice / location refs
                </p>
                <p className="mt-2">
                  Upload stills, voices, and rooms before Plan. Disabling generated shot images does not drop these refs. H3 Omni still receives them; First / Last and Seamless LTX still use a main start image if present.
                </p>
              </div>

              {d.locked ? (
                <div className="mt-4 rounded-md border border-gold/30 bg-gold/5 p-3 text-sm">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                    After planning · H3-aware
                  </p>
                  <p className="mt-2 text-fg">
                    {d.plannedDuration}s requested → {windows} native pass
                    {windows === 1 ? "" : "es"} at ~{native}s
                    {video?.family === "h3" ? " (H3 14.4 s ceiling)" : ""}. Changing the video model rebuilds clip timing without re-uploading audio.
                  </p>
                </div>
              ) : null}

              <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {DIRECTOR_STAGES.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setDirector({ stage: s.id })}
                      className={cn(
                        "h-full w-full rounded-md border px-3 py-3 text-left",
                        d.stage === s.id
                          ? "border-gold bg-gold text-ink"
                          : "border-border bg-surface text-muted hover:text-fg",
                      )}
                    >
                      <span className={cn("font-mono text-xs", d.stage === s.id ? "text-ink/70" : "text-gold")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block font-display text-lg">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="border-t border-border bg-surface px-6 py-7 lg:border-l lg:border-t-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
                Stage inspector
              </p>
              <h3 className="mt-2 font-display text-2xl text-fg">{stage.label}</h3>
              <p className="mt-3 text-base leading-[1.55] text-fg">
                <span className="font-medium">What the LLM is doing. </span>
                {stage.llm}
              </p>
              <p className="mt-3 text-base leading-[1.55] text-fg">
                <span className="font-medium">Safe to edit. </span>
                {stage.safeEdit}
              </p>
            </aside>
          </div>

          <div className="border-t border-border p-4">
            <h3 className="font-display text-2xl text-fg">Dashboard</h3>
            <p className="mt-1 text-base text-fg">
              Past runs, re-run one clip, repair missing pieces, rejoin. Load Settings restores a checkpointed project after a restart. When a production is done, open it in Editor as separate shot clips plus the soundtrack layer.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {SAMPLE_RUNS.map((run) => (
                <article key={run.id} className="rounded-lg border border-border bg-inset p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                    {run.id} · {run.skill.replace("-", " ")}
                  </p>
                  <h4 className="mt-1 font-display text-xl text-fg">{run.title}</h4>
                  <p className="mt-1 text-xs text-muted">{run.model}</p>
                  <p className="mt-1 font-mono text-xs text-gold">{run.duration}</p>
                  <p className="mt-2 text-base text-fg">{run.note}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {run.status.replace("-", " ")} · {run.clips} clips
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        enqueue("run", "director");
                        toast(`Replica: re-running a clip from ${run.title}. No GPU work here.`);
                      }}
                    >
                      Re-run clip
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        toast(
                          run.status === "needs-repair"
                            ? "Replica: repair regenerates the missing piece, then rejoins."
                            : "Replica: rejoin stitches clips to the timeline without a full rerun.",
                        )
                      }
                    >
                      Repair / rejoin
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        useConsole.getState().lockPanel("editor");
                        document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" });
                        toast("Replica: this production would open in Editor as shot clips + soundtrack.");
                      }}
                    >
                      Open in Editor
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  value,
  options,
  onChange,
  disabled,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(o.value)}
          className={cn(
            "chip",
            value === o.value && "chip-on",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
