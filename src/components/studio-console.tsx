import { useMemo } from "react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/section-header";
import { Inspector } from "@/components/inspector";
import { Knob } from "@/components/knob";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODELS, modelById } from "@/data/models";
import { controlsForFamily } from "@/data/controls";
import { cn } from "@/lib/cn";
import { useConsole } from "@/store/console-store";
import type { MediaKind, ModelFamily } from "@/data/types";

const REF_ROLES = [
  "identity",
  "appearance",
  "scene",
  "motion",
  "voice",
  "performance",
  "ambience",
  "music",
];

export function StudioConsole() {
  const studio = useConsole((s) => s.studio);
  const setStudio = useConsole((s) => s.setStudio);
  const setMode = useConsole((s) => s.setMode);
  const setModel = useConsole((s) => s.setModel);
  const enqueue = useConsole((s) => s.enqueue);
  const cancelJob = useConsole((s) => s.cancelJob);
  const inspectorId = useConsole((s) => s.inspectorId);
  const model = modelById(studio.modelId) ?? MODELS[0];
  const family = model.family;

  const visible = useMemo(() => new Set(controlsForFamily(family).map((c) => c.id)), [family]);
  const has = (id: string) => visible.has(id);
  const models = MODELS.filter((m) => m.kind === studio.mode);

  const generate = () => {
    enqueue();
    toast("Queued in the replica. This console does not run local models.");
  };

  return (
    <section id="studio" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="03 · Studio"
          title="Every important control, clickable."
          lede="A teaching replica of Studio. Switch models and watch knobs appear and disappear. Click Explain on any control."
        />

        <div className="bezel overflow-hidden rounded-xl border border-border bg-bg-soft">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              Studio · {model.maestroLabel}
            </p>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-subtle md:block">
              Golden Hour · workspace: teaching
            </p>
          </div>

          <div className="grid lg:grid-cols-[240px_minmax(0,1fr)_minmax(280px,340px)]">
            <LeftRail
              mode={studio.mode}
              family={family}
              models={models}
              modelId={studio.modelId}
              workflow={studio.workflow}
              workflows={model.workflows}
              loras={studio.loras}
              has={has}
              onMode={setMode}
              onModel={setModel}
              onWorkflow={(workflow) => setStudio({ workflow })}
              onLora={(id, weight) =>
                setStudio({
                  loras: studio.loras.map((l) => (l.id === id ? { ...l, weight } : l)),
                })
              }
            />

            <div className="min-w-0 border-t border-border lg:border-l lg:border-t-0">
              <div className="console-grid space-y-1 p-3 md:p-4">
                {has("h3-variant") || has("h3-size") ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {has("h3-variant") ? (
                      <Knob controlId="h3-variant" label="First & Last / Omni">
                        <ChipRow
                          value={family === "h3" && model.variant.includes("Omni") ? "omni" : "fl"}
                          options={[
                            { value: "fl", label: "First & Last" },
                            { value: "omni", label: "Omni" },
                          ]}
                          onChange={(v) =>
                            setModel(
                              v === "omni"
                                ? model.variant.includes("Full")
                                  ? "h3-omni-full"
                                  : "h3-omni-pruned"
                                : model.variant.includes("Full")
                                  ? "h3-fl-full"
                                  : "h3-fl-pruned",
                            )
                          }
                        />
                      </Knob>
                    ) : null}
                    {has("h3-size") ? (
                      <Knob controlId="h3-size" label="Pruned 20B / Full 33B">
                        <ChipRow
                          value={model.variant.includes("Full") ? "full" : "pruned"}
                          options={[
                            { value: "pruned", label: "Pruned 20B" },
                            { value: "full", label: "Full 33B" },
                          ]}
                          onChange={(v) =>
                            setModel(
                              model.variant.includes("Omni")
                                ? v === "full"
                                  ? "h3-omni-full"
                                  : "h3-omni-pruned"
                                : v === "full"
                                  ? "h3-fl-full"
                                  : "h3-fl-pruned",
                            )
                          }
                        />
                      </Knob>
                    ) : null}
                  </div>
                ) : null}

                {has("aspect") || has("resolution") ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {has("aspect") && model.aspects.length ? (
                      <Knob controlId="aspect" label="Aspect ratio">
                        <select
                          className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
                          value={studio.aspect}
                          onChange={(e) => setStudio({ aspect: e.target.value })}
                        >
                          {model.aspects.map((a) => (
                            <option key={a}>{a}</option>
                          ))}
                        </select>
                      </Knob>
                    ) : null}
                    {has("resolution") && model.resolutions.length ? (
                      <Knob controlId="resolution" label="Resolution">
                        <select
                          className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
                          value={studio.resolution}
                          onChange={(e) => setStudio({ resolution: e.target.value })}
                        >
                          {model.resolutions.map((a) => (
                            <option key={a}>{a}</option>
                          ))}
                        </select>
                      </Knob>
                    ) : null}
                  </div>
                ) : null}

                {studio.mode === "video" ? (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {has("duration") ? (
                      <Knob controlId="duration" label="Duration">
                        <Range
                          min={4}
                          max={model.maxNativeSec && !studio.aiPlan ? model.maxNativeSec : 60}
                          step={0.4}
                          value={studio.duration}
                          unit="s"
                          onChange={(duration) =>
                            setStudio({
                              duration,
                              windows: Math.max(
                                1,
                                Math.ceil(duration / (model.maxNativeSec ?? 14.4)),
                              ),
                            })
                          }
                        />
                      </Knob>
                    ) : null}
                    {has("fps") ? (
                      <Knob controlId="fps" label="FPS">
                        <div className="h-10 rounded-sm border border-border bg-inset px-3 leading-10 text-sm">
                          {studio.fps}
                          {family === "h3" ? " · locked" : ""}
                        </div>
                      </Knob>
                    ) : null}
                    {has("windows") ? (
                      <Knob controlId="windows" label="Windows">
                        <Range
                          min={1}
                          max={12}
                          step={1}
                          value={studio.windows}
                          unit=""
                          onChange={(windows) => setStudio({ windows })}
                        />
                      </Knob>
                    ) : null}
                    {has("overlap") ? (
                      <Knob controlId="overlap" label="Overlap">
                        <Range
                          min={0.2}
                          max={3}
                          step={0.1}
                          value={studio.overlap}
                          unit="s"
                          onChange={(overlap) => setStudio({ overlap })}
                        />
                      </Knob>
                    ) : null}
                  </div>
                ) : null}

                {has("music3-duration") && studio.mode === "audio" ? (
                  <Knob controlId="music3-duration" label="Song duration">
                    <Range
                      min={5}
                      max={300}
                      step={5}
                      value={studio.songDuration}
                      unit="s"
                      onChange={(songDuration) => setStudio({ songDuration })}
                    />
                  </Knob>
                ) : null}

                {has("prompt") ? (
                  <Knob controlId="prompt" label="Prompt">
                    <textarea
                      value={studio.prompt}
                      onChange={(e) => setStudio({ prompt: e.target.value })}
                      rows={5}
                      placeholder={
                        family === "h3"
                          ? "INT. HARBOUR RADIO — NIGHT. ANA (30s) leans into the mic. She whispers, then waits through two seconds of silence…"
                          : "Describe the shot. Present tense. One camera idea."
                      }
                      className="w-full resize-y rounded-sm border border-border bg-inset p-3 text-sm leading-relaxed"
                    />
                  </Knob>
                ) : null}

                <div className="grid gap-2 sm:grid-cols-2">
                  {has("prompt-enhance") ? (
                    <Knob controlId="prompt-enhance" label="H3 Prompt Enhance / Context-IR">
                      <Toggle
                        on={studio.enhance}
                        onChange={(enhance) => setStudio({ enhance })}
                        onLabel="On — speaker IDs, silence, dialogue retention"
                        offLabel="Off — you write H3-native"
                      />
                    </Knob>
                  ) : null}
                  {has("negative") ? (
                    <Knob controlId="negative" label="Negative prompt">
                      <input
                        value={studio.negative}
                        onChange={(e) => setStudio({ negative: e.target.value })}
                        className="h-10 w-full rounded-sm border border-border bg-inset px-3 text-sm"
                        placeholder={family === "h3" ? "Usually skip on H3" : "jitter, extra fingers"}
                      />
                    </Knob>
                  ) : null}
                </div>

                {has("refs") ? (
                  <Knob controlId="refs" label="References">
                    <Refs
                      refs={studio.refs}
                      onAdd={() => {
                        if (studio.refs.length >= 9) return;
                        setStudio({
                          refs: [
                            ...studio.refs,
                            {
                              id: `r-${Date.now()}`,
                              kind: "image",
                              role: REF_ROLES[studio.refs.length % REF_ROLES.length],
                              label: `Ref ${studio.refs.length + 1}`,
                            },
                          ],
                        });
                      }}
                      onRole={(id, role) =>
                        setStudio({
                          refs: studio.refs.map((r) => (r.id === id ? { ...r, role } : r)),
                        })
                      }
                      onKind={(id, kind) =>
                        setStudio({
                          refs: studio.refs.map((r) => (r.id === id ? { ...r, kind } : r)),
                        })
                      }
                      onRemove={(id) =>
                        setStudio({ refs: studio.refs.filter((r) => r.id !== id) })
                      }
                    />
                  </Knob>
                ) : null}

                <div className="grid gap-2 sm:grid-cols-3">
                  {has("steps") ? (
                    <Knob controlId="steps" label="Steps">
                      <Range min={4} max={50} step={1} value={studio.steps} unit="" onChange={(steps) => setStudio({ steps })} />
                    </Knob>
                  ) : null}
                  {has("guidance") ? (
                    <Knob controlId="guidance" label="Guidance">
                      <Range min={1} max={12} step={0.5} value={studio.guidance} unit="" onChange={(guidance) => setStudio({ guidance })} />
                    </Knob>
                  ) : null}
                  {has("seed") ? (
                    <Knob controlId="seed" label="Seed">
                      <input
                        value={studio.seed}
                        onChange={(e) => setStudio({ seed: e.target.value })}
                        placeholder="Random"
                        className="h-10 w-full rounded-sm border border-border bg-inset px-3 font-mono text-sm"
                      />
                    </Knob>
                  ) : null}
                </div>

                {(has("turbo") || has("sol") || has("fbc")) && (
                  <div className="grid gap-2 sm:grid-cols-3">
                    {has("turbo") ? (
                      <Knob controlId="turbo" label="Turbo LoRA">
                        <Toggle on={studio.turbo} onChange={(turbo) => setStudio({ turbo })} onLabel="Draft schedule 4/6/8" offLabel="Base quality" />
                      </Knob>
                    ) : null}
                    {has("sol") ? (
                      <Knob controlId="sol" label="Sol Engine">
                        <Toggle on={studio.sol} onChange={(sol) => setStudio({ sol })} onLabel="RTX 40/50 sparse attn" offLabel="Off (default)" />
                      </Knob>
                    ) : null}
                    {has("fbc") ? (
                      <Knob controlId="fbc" label="First Block Cache">
                        <Toggle on={studio.fbc} onChange={(fbc) => setStudio({ fbc })} onLabel="Faster, sticky risk" offLabel="Off" />
                      </Knob>
                    ) : null}
                  </div>
                )}

                {studio.mode === "video" ? (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {has("injection") ? (
                      <Knob controlId="injection" label="Timed frame injection">
                        <Toggle on={studio.injection} onChange={(injection) => setStudio({ injection })} onLabel="KFI on" offLabel="Off" />
                      </Knob>
                    ) : null}
                    {has("audio-driven") ? (
                      <Knob controlId="audio-driven" label="Audio-driven">
                        <Toggle on={studio.audioDriven} onChange={(audioDriven) => setStudio({ audioDriven })} onLabel="Picture follows track" offLabel="Off" />
                      </Knob>
                    ) : null}
                    {has("v2a") ? (
                      <Knob controlId="v2a" label="Video-to-audio">
                        <Toggle on={studio.v2a} onChange={(v2a) => setStudio({ v2a })} onLabel="Write bed for picture" offLabel="Off" />
                      </Knob>
                    ) : null}
                    {has("v2v") ? (
                      <Knob controlId="v2v" label="v2v / mask denoise">
                        <Range min={0.1} max={1} step={0.05} value={studio.v2v} unit="" onChange={(v2v) => setStudio({ v2v })} />
                      </Knob>
                    ) : null}
                    {has("blend") ? (
                      <Knob controlId="blend" label="Blend video">
                        <Toggle on={studio.blend} onChange={(blend) => setStudio({ blend })} onLabel="Overlap two clips" offLabel="Off" />
                      </Knob>
                    ) : null}
                    {has("ai-plan") ? (
                      <Knob controlId="ai-plan" label="Multi-window AI plan">
                        <Toggle on={studio.aiPlan} onChange={(aiPlan) => setStudio({ aiPlan })} onLabel="One prompt per window" offLabel="Single prompt" />
                      </Knob>
                    ) : null}
                  </div>
                ) : null}

                {studio.mode === "video" ? (
                  <div className="grid gap-2 sm:grid-cols-3">
                    {has("post-upscale") ? (
                      <Knob controlId="post-upscale" label="Spatial upsampling">
                        <Toggle on={studio.upscale} onChange={(upscale) => setStudio({ upscale })} onLabel="Upscale keeper" offLabel="Off" />
                      </Knob>
                    ) : null}
                    {has("post-grain") ? (
                      <Knob controlId="post-grain" label="Film grain">
                        <Range min={0} max={1} step={0.05} value={studio.grain} unit="" onChange={(grain) => setStudio({ grain })} />
                      </Knob>
                    ) : null}
                    {has("codec") ? (
                      <Knob controlId="codec" label="Codec">
                        <select
                          className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
                          value={studio.codec}
                          onChange={(e) => setStudio({ codec: e.target.value })}
                        >
                          <option>Default master</option>
                          <option>H.264</option>
                          <option>H.265</option>
                        </select>
                      </Knob>
                    ) : null}
                  </div>
                ) : null}

                <Knob controlId="queue" label="Queue / recipes">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button onClick={generate}>Generate</Button>
                    <Button variant="secondary" onClick={() => toast("Recipe stored in this replica only.")}>
                      Save recipe
                    </Button>
                    <p className="text-xs text-subtle">
                      Preview is empty on purpose. The replica teaches controls, not inference.
                    </p>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {studio.queue.length === 0 ? (
                      <li className="text-sm text-subtle">Queue idle.</li>
                    ) : (
                      studio.queue.map((j) => (
                        <li
                          key={j.id}
                          className="flex items-center justify-between gap-3 rounded-sm border border-border bg-inset px-3 py-2 text-sm"
                        >
                          <span>
                            {j.label}
                            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                              {j.status}
                            </span>
                          </span>
                          {j.status !== "cancelled" ? (
                            <Button size="sm" variant="danger" onClick={() => cancelJob(j.id)}>
                              Cancel
                            </Button>
                          ) : null}
                        </li>
                      ))
                    )}
                  </ul>
                </Knob>
              </div>
            </div>

            <div
              className={cn(
                "min-h-[320px] border-t border-border lg:border-l lg:border-t-0",
                inspectorId ? "block" : "hidden lg:block",
              )}
            >
              {inspectorId ? (
                <Inspector />
              ) : (
                <div className="flex h-full flex-col justify-between p-5 text-sm text-muted">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                      Advanced drawer
                    </p>
                    <p className="mt-3">
                      Click Explain on any knob. The list below is what this model currently exposes.
                    </p>
                    <ul className="mt-4 space-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                      {controlsForFamily(family).map((c) => (
                        <li key={c.id}>{c.maestroName}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {model.badges.map((b) => (
                      <Badge key={b} id={b} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeftRail({
  mode,
  family,
  models,
  modelId,
  workflow,
  workflows,
  loras,
  has,
  onMode,
  onModel,
  onWorkflow,
  onLora,
}: {
  mode: MediaKind;
  family: ModelFamily;
  models: typeof MODELS;
  modelId: string;
  workflow: string;
  workflows: string[];
  loras: { id: string; name: string; weight: number; rec: string }[];
  has: (id: string) => boolean;
  onMode: (m: MediaKind) => void;
  onModel: (id: string) => void;
  onWorkflow: (w: string) => void;
  onLora: (id: string, weight: number) => void;
}) {
  return (
    <aside className="space-y-4 p-3 md:p-4">
      <Knob controlId="mode" label="Mode">
        <ChipRow
          value={mode}
          options={[
            { value: "video", label: "Video" },
            { value: "image", label: "Image" },
            { value: "audio", label: "Audio" },
          ]}
          onChange={(v) => onMode(v as MediaKind)}
        />
      </Knob>
      <Knob controlId="model" label="Model">
        <select
          className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
          value={modelId}
          onChange={(e) => onModel(e.target.value)}
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.maestroLabel}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-subtle">
          Family <span className="text-gold">{family}</span>. Switching rebuilds the console.
        </p>
      </Knob>
      {has("workflow") && workflows.length ? (
        <Knob controlId="workflow" label="Workflow">
          <select
            className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
            value={workflow}
            onChange={(e) => onWorkflow(e.target.value)}
          >
            {workflows.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </Knob>
      ) : null}
      {has("lora") ? (
        <Knob controlId="lora" label="LoRAs">
          {loras.length === 0 ? (
            <p className="text-xs text-subtle">
              No LoRAs on this path. The real app attaches CivitAI guides when you install one.
            </p>
          ) : (
            loras.map((l) => (
              <div key={l.id} className="mb-2">
                <div className="flex justify-between text-xs text-muted">
                  <span>{l.name}</span>
                  <span className="tabular font-mono text-gold">{l.weight.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1.2}
                  step={0.05}
                  value={l.weight}
                  onChange={(e) => onLora(l.id, Number(e.target.value))}
                  className="mt-1 w-full accent-gold"
                />
                <p className="text-[11px] text-subtle">Recommended {l.rec}</p>
              </div>
            ))
          )}
        </Knob>
      ) : null}
    </aside>
  );
}

function ChipRow({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-sm border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em]",
            value === o.value
              ? "border-gold bg-gold/15 text-gold"
              : "border-border text-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  on,
  onChange,
  onLabel,
  offLabel,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-3 rounded-sm border border-border bg-inset px-3 py-2 text-left text-sm"
    >
      <span className={on ? "text-fg" : "text-muted"}>{on ? onLabel : offLabel}</span>
      <span className={cn("h-5 w-9 rounded-full p-0.5", on ? "bg-gold" : "bg-bezel")}>
        <span className={cn("block h-4 w-4 rounded-full bg-bg transition-transform", on && "translate-x-4")} />
      </span>
    </button>
  );
}

function Range({
  min,
  max,
  step,
  value,
  unit,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-xs tabular text-gold">
        {value}
        {unit}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-gold"
      />
    </label>
  );
}

function Refs({
  refs,
  onAdd,
  onRole,
  onKind,
  onRemove,
}: {
  refs: { id: string; kind: "image" | "video" | "audio"; role: string; label: string }[];
  onAdd: () => void;
  onRole: (id: string, role: string) => void;
  onKind: (id: string, kind: "image" | "video" | "audio") => void;
  onRemove: (id: string) => void;
}) {
  const images = refs.filter((r) => r.kind === "image").length;
  const videos = refs.filter((r) => r.kind === "video").length;
  const audio = refs.filter((r) => r.kind === "audio").length;
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
        {images}/9 images · {videos}/3 videos · {audio}/3 audio
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {refs.map((r) => (
          <div key={r.id} className="rounded-sm border border-dashed border-gold/30 bg-inset p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg">{r.label}</span>
              <button type="button" className="text-xs text-crash" onClick={() => onRemove(r.id)}>
                Remove
              </button>
            </div>
            <div className="mt-2 flex gap-2">
              <select
                className="h-8 flex-1 rounded-sm border border-border bg-surface text-xs"
                value={r.kind}
                onChange={(e) => onKind(r.id, e.target.value as "image" | "video" | "audio")}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
              <select
                className="h-8 flex-1 rounded-sm border border-border bg-surface text-xs"
                value={r.role}
                onChange={(e) => onRole(r.id, e.target.value)}
              >
                {REF_ROLES.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="rounded-sm border border-dashed border-border px-3 py-4 text-sm text-muted hover:border-gold hover:text-gold"
        >
          Add reference
        </button>
      </div>
    </div>
  );
}
