import { useMemo } from "react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/section-header";
import { Inspector } from "@/components/inspector";
import { Knob } from "@/components/knob";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODELS, modelById } from "@/data/models";
import { controlById } from "@/data/controls";
import { EDIT_TOOLS } from "@/data/edit";
import {
  STUDIO_CATEGORIES,
  STUDIO_SUBS,
  leafOf,
  modelsForFilter,
  resolveModelId,
  type AudioSub,
  type EditSub,
  type StudioCategory,
  type StudioLeaf,
  type StudioSub,
  type ToolsSub,
  type VideoSub,
} from "@/data/studio-tree";
import { cn } from "@/lib/cn";
import { useConsole } from "@/store/console-store";
import type { ModelFamily } from "@/data/types";

const VIDEO_INPUTS = [
  { role: "Frame", kind: "image" as const },
  { role: "Soundtrack", kind: "audio" as const },
  { role: "Control video", kind: "video" as const },
  { role: "Voice ref", kind: "audio" as const },
];

function modelsFor(filter: StudioLeaf["modelFilter"]) {
  return modelsForFilter(filter);
}

function extraIds(leaf: StudioLeaf, family: ModelFamily): string[] {
  if (leaf.category !== "video") return [];
  const extra = ["fps"];
  if (family === "h3") {
    extra.push(
      "h3-variant",
      "h3-size",
      "prompt-enhance",
      "turbo",
      "sol",
      "fbc",
      "injection",
      "audio-driven",
      "v2a",
    );
  }
  if (leaf.sub !== "blend") extra.push("v2v");
  return extra;
}

export function StudioConsole() {
  const studio = useConsole((s) => s.studio);
  const setStudio = useConsole((s) => s.setStudio);
  const setModel = useConsole((s) => s.setModel);
  const setCategory = useConsole((s) => s.setCategory);
  const enqueue = useConsole((s) => s.enqueue);
  const cancelJob = useConsole((s) => s.cancelJob);
  const inspectorId = useConsole((s) => s.inspectorId);

  const category = studio.category ?? "video";
  const sub =
    category === "video"
      ? (studio.videoSub ?? "frames")
      : category === "audio"
        ? (studio.audioSub ?? "speech")
        : category === "edit"
          ? (studio.editSub ?? "retake")
          : category === "tools"
            ? (studio.toolsSub ?? "upscale")
            : null;
  const leaf = leafOf(category, sub);
  const models = modelsFor(leaf.modelFilter);
  const resolvedId = resolveModelId(leaf, studio.modelId);
  const model = modelById(resolvedId ?? studio.modelId) ?? models[0] ?? MODELS[0];
  const family = model.family;
  const ids = useMemo(() => {
    const set = new Set([...leaf.primary, ...leaf.advanced, ...extraIds(leaf, family), "model", "queue"]);
    return set;
  }, [leaf, family]);
  const has = (id: string) => ids.has(id);

  const generate = () => {
    enqueue();
    toast("Queued in the replica. This console does not run local models.");
  };

  const pickSub = (next: string) => {
    const nextLeaf = leafOf(category, next as StudioSub);
    const nextModel = resolveModelId(nextLeaf, studio.modelId);
    if (category === "video") {
      setStudio({
        videoSub: next as VideoSub,
        workflow:
          next === "multi-shot" ? "Multi-Shot" : next === "extend" ? "Extend" : next === "blend" ? "Blend" : "Frames",
      });
      if (nextModel) setModel(nextModel);
    } else if (category === "audio") {
      setStudio({ audioSub: next as AudioSub });
      if (nextModel) setModel(nextModel);
    } else if (category === "edit") {
      setStudio({ editSub: next as EditSub });
      if (nextModel) setModel(nextModel);
    } else if (category === "tools") {
      setStudio({ toolsSub: next as ToolsSub });
    }
  };

  const listed = [...leaf.primary, ...leaf.advanced, ...extraIds(leaf, family)]
    .map((id) => controlById(id))
    .filter(Boolean);

  return (
    <section id="studio" className="scroll-mt-24 border-t border-border px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          kicker="03 · Studio"
          title="Every important control, clickable."
          lede="A teaching replica of Studio. Image, Video, Audio, Edit, and Tools — each subcategory has its own Advanced drawer. Click Explain on any control."
        />

        <div className="bezel overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
              Studio · {leaf.label}
              {leaf.modelFilter !== "none" ? ` · ${model.maestroLabel}` : ""}
            </p>
            <p className="hidden font-mono text-xs uppercase tracking-[0.14em] text-muted md:block">
              Golden Hour · workspace: teaching
            </p>
          </div>

          <div className="grid lg:grid-cols-[260px_minmax(0,1fr)_minmax(280px,340px)]">
            <aside className="space-y-4 p-3 md:p-4">
              <Knob controlId="mode" label="Mode">
                <ChipRow
                  value={category}
                  options={STUDIO_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))}
                  onChange={(v) => setCategory(v as StudioCategory)}
                />
              </Knob>
              {STUDIO_SUBS[category].length ? (
                <div>
                  <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {category}
                  </p>
                  <ChipRow
                    value={sub ?? ""}
                    options={STUDIO_SUBS[category].map((s) => ({ value: s.id, label: s.label }))}
                    onChange={pickSub}
                  />
                </div>
              ) : null}
              {models.length ? (
                <Knob controlId="model" label="Model">
                  <select
                    className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
                    value={models.some((m) => m.id === studio.modelId) ? studio.modelId : models[0].id}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.maestroLabel}
                      </option>
                    ))}
                  </select>
                </Knob>
              ) : null}
              <Button className="w-full" onClick={generate}>
                {category === "tools" && sub === "upscale"
                  ? "Upscale Clip"
                  : category === "tools" && sub === "revoice"
                    ? "Revoice"
                    : category === "audio" && sub === "mixer"
                      ? "Mix"
                      : "Generate"}
              </Button>
              {leaf.modelFilter === "none" ? (
                <p className="text-xs text-muted">
                  Mixer and Tools finish files you already have. They do not start a new generate from a blank prompt.
                </p>
              ) : null}
            </aside>

            <div className="min-w-0 border-t border-border lg:border-l lg:border-t-0">
              <div className="console-grid space-y-2 p-3 md:p-4">
                <PrimaryPane leaf={leaf} has={has} />
                {leaf.hasAdvanced ? (
                  <div className="rounded-md border border-border bg-surface/80">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-fg"
                      onClick={() => setStudio({ advancedOpen: !(studio.advancedOpen ?? true) })}
                    >
                      Advanced Settings
                      <span className="text-muted">{studio.advancedOpen === false ? "Show" : "Hide"}</span>
                    </button>
                    {studio.advancedOpen !== false ? (
                      <div className="space-y-2 border-t border-border p-3">
                        <AdvancedPane leaf={leaf} has={has} extras={extraIds(leaf, family)} />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="px-1 text-sm text-muted">
                    Tools has no Advanced drawer. Method and source live on the main rail.
                  </p>
                )}
                <QueueBlock />
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
                <div className="flex h-full flex-col justify-between px-6 py-7 text-base text-fg">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
                      {leaf.hasAdvanced ? "Advanced drawer" : "Tools"}
                    </p>
                    <p className="mt-3 leading-[1.55]">
                      This list is what {leaf.label} currently exposes. Click a name or Explain on a knob.
                    </p>
                    <ul className="mt-4 space-y-1">
                      {listed.map((c) =>
                        c ? (
                          <li key={c.id}>
                            <button
                              type="button"
                              onClick={() => useConsole.getState().openInspector(c.id)}
                              className={cn(
                                "w-full rounded-sm px-2 py-1.5 text-left font-mono text-xs uppercase tracking-[0.12em]",
                                inspectorId === c.id
                                  ? "bg-gold text-ink"
                                  : "text-muted hover:bg-inset hover:text-fg",
                              )}
                            >
                              {c.maestroName}
                            </button>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </div>
                  {leaf.modelFilter !== "none" ? (
                    <div className="flex flex-wrap gap-1.5">
                      {model.badges.map((b) => (
                        <Badge key={b} id={b} />
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrimaryPane({ leaf, has }: { leaf: StudioLeaf; has: (id: string) => boolean }) {
  const studio = useConsole((s) => s.studio);
  const setStudio = useConsole((s) => s.setStudio);
  const setModel = useConsole((s) => s.setModel);
  const model = modelById(studio.modelId) ?? MODELS[0];
  const family = model.family;

  return (
    <>
      {leaf.category === "video" && (has("h3-variant") || has("h3-size")) ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {has("h3-variant") ? (
            <Knob controlId="h3-variant" label="First / Last / Omni">
              <ChipRow
                value={family === "h3" && model.variant.includes("Omni") ? "omni" : "fl"}
                options={[
                  { value: "fl", label: "First / Last" },
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

      {has("retake-engine") ? (
        <Knob controlId="retake-engine" label="Retake engine">
          <ChipRow
            value={studio.retakeEngine ?? "native"}
            options={[
              { value: "native", label: "Native" },
              { value: "legacy", label: "Legacy" },
            ]}
            onChange={(retakeEngine) =>
              setStudio({ retakeEngine: retakeEngine as "native" | "legacy" })
            }
          />
          <p className="mt-2 text-xs text-muted">
            Native: Lightricks denoise_mask — preserves source identity.
          </p>
        </Knob>
      ) : null}

      {has("source-clip") ? (
        <Knob controlId="source-clip" label="Source clip">
          <DropHint text="Drop a video or pick one from the gallery. The replica does not ingest files." />
        </Knob>
      ) : null}

      {has("ref-images") ? (
        <Knob controlId="ref-images" label="Reference images">
          <DropHint text="Add a still. One identity frame is enough." />
        </Knob>
      ) : null}

      {has("voice-clone") ? (
        <Knob controlId="voice-clone" label="Add Voice Clone">
          <DropHint text="Text-only mode works without a clone. Add a voice to lock a speaker." />
        </Knob>
      ) : null}

      {has("mixer") ? (
        <Knob controlId="mixer" label="Mixer">
          <div className="grid gap-2 sm:grid-cols-2">
            <DropHint text="Clip A — dialogue or bed." />
            <DropHint text="Clip B — music or SFX." />
          </div>
          <p className="mt-2 text-sm text-muted">
            Mixer combines takes you already have. It does not write a new song.
          </p>
        </Knob>
      ) : null}

      {has("upscale-method") ? (
        <Knob controlId="upscale-method" label="Upscale method">
          <ChipRow
            value={studio.upscaleMethod ?? "flashvsr"}
            options={[
              { value: "flashvsr", label: "FlashVSR 2x" },
              { value: "lanczos", label: "Lanczos" },
            ]}
            onChange={(upscaleMethod) =>
              setStudio({ upscaleMethod: upscaleMethod as "flashvsr" | "lanczos" })
            }
          />
          <p className="mt-2 text-sm text-muted">
            FlashVSR is model-based (sharper, slower). Lanczos is a fast classic resize. Audio is preserved.
          </p>
        </Knob>
      ) : null}

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
                windows: Math.max(1, Math.ceil(duration / (model.maxNativeSec ?? 14.4))),
              })
            }
          />
        </Knob>
      ) : null}

      {has("music3-duration") ? (
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

      {has("refs") ? (
        <Knob controlId="refs" label="Inputs">
          <Refs
            refs={studio.refs}
            onAdd={() => {
              if (studio.refs.length >= 9) return;
              const next = VIDEO_INPUTS[studio.refs.length % VIDEO_INPUTS.length];
              setStudio({
                refs: [
                  ...studio.refs,
                  { id: `r-${Date.now()}`, kind: next.kind, role: next.role, label: next.role },
                ],
              });
            }}
            onRole={(id, role) =>
              setStudio({ refs: studio.refs.map((r) => (r.id === id ? { ...r, role } : r)) })
            }
            onKind={(id, kind) =>
              setStudio({ refs: studio.refs.map((r) => (r.id === id ? { ...r, kind } : r)) })
            }
            onRemove={(id) => setStudio({ refs: studio.refs.filter((r) => r.id !== id) })}
          />
        </Knob>
      ) : null}

      {has("ai-plan") ? (
        <Knob controlId="ai-plan" label="Multi-window sequence">
          <Toggle
            on={studio.aiPlan}
            onChange={(aiPlan) => setStudio({ aiPlan })}
            onLabel="On — one prompt per window"
            offLabel="Off — single prompt"
          />
        </Knob>
      ) : null}

      {has("blend") && leaf.sub === "blend" ? (
        <Knob controlId="blend" label="Blend">
          <Toggle
            on={studio.blend}
            onChange={(blend) => setStudio({ blend })}
            onLabel="Overlap two clips"
            offLabel="Off"
          />
        </Knob>
      ) : null}

      {has("prompt") && leaf.placeholder ? (
        <Knob controlId="prompt" label="Prompt">
          <textarea
            value={studio.prompt}
            onChange={(e) => setStudio({ prompt: e.target.value })}
            rows={5}
            placeholder={leaf.placeholder}
            className="w-full resize-y rounded-sm border border-border bg-inset p-3 text-sm leading-relaxed"
          />
        </Knob>
      ) : null}

      {leaf.category === "edit" ? (
        <p className="text-sm text-muted">
          {EDIT_TOOLS.find((t) => t.id === leaf.sub)?.when ?? "After a take exists."}
        </p>
      ) : null}
    </>
  );
}

function AdvancedPane({
  leaf,
  has,
  extras,
}: {
  leaf: StudioLeaf;
  has: (id: string) => boolean;
  extras: string[];
}) {
  const studio = useConsole((s) => s.studio);
  const setStudio = useConsole((s) => s.setStudio);
  const model = modelById(studio.modelId) ?? MODELS[0];
  const family = model.family;
  const ids = [...leaf.advanced, ...extras];

  const show = (id: string) => has(id) && ids.includes(id);

  return (
    <>
      {show("resolution") || show("aspect") ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {show("resolution") ? (
            <Knob controlId="resolution" label="Resolution">
              {leaf.category === "image" || leaf.category === "edit" ? (
                <ChipRow
                  value={studio.resolution}
                  options={["Auto", "480p", "540p", "720p", "1080p"].map((v) => ({
                    value: v,
                    label: v,
                  }))}
                  onChange={(resolution) => setStudio({ resolution })}
                />
              ) : (
                <select
                  className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
                  value={studio.resolution}
                  onChange={(e) => setStudio({ resolution: e.target.value })}
                >
                  {model.resolutions.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              )}
            </Knob>
          ) : null}
          {show("aspect") ? (
            <Knob controlId="aspect" label="Aspect ratio">
              <ChipRow
                value={studio.aspect}
                options={(leaf.category === "image"
                  ? ["Auto", "16:9", "9:16", "1:1", "4:3", "3:4"]
                  : model.aspects
                ).map((a) => ({ value: a, label: a }))}
                onChange={(aspect) => setStudio({ aspect })}
              />
            </Knob>
          ) : null}
        </div>
      ) : null}

      {show("windows") || show("overlap") || show("fps") ? (
        <div className="grid gap-2 sm:grid-cols-3">
          {show("windows") ? (
            <Knob controlId="windows" label="Window length">
              <Range min={1} max={12} step={1} value={studio.windows} unit="" onChange={(windows) => setStudio({ windows })} />
            </Knob>
          ) : null}
          {show("overlap") ? (
            <Knob controlId="overlap" label="Overlap">
              <Range min={0.2} max={3} step={0.1} value={studio.overlap} unit="s" onChange={(overlap) => setStudio({ overlap })} />
            </Knob>
          ) : null}
          {show("fps") ? (
            <Knob controlId="fps" label="FPS">
              <div className="h-10 rounded-sm border border-border bg-inset px-3 leading-10 text-sm">
                {studio.fps}
                {family === "h3" ? " · locked" : ""}
              </div>
            </Knob>
          ) : null}
        </div>
      ) : null}

      {show("speech-duration") || show("speaker-pause") || show("temperature") ? (
        <div className="grid gap-2 sm:grid-cols-3">
          {show("speech-duration") ? (
            <Knob controlId="speech-duration" label="Max duration (seconds)">
              <Range
                min={2}
                max={90}
                step={1}
                value={studio.speechDuration ?? 20}
                unit="s"
                onChange={(speechDuration) => setStudio({ speechDuration })}
              />
            </Knob>
          ) : null}
          {show("speaker-pause") ? (
            <Knob controlId="speaker-pause" label="Speaker pause">
              <Range
                min={0}
                max={2}
                step={0.05}
                value={studio.speakerPause ?? 0.5}
                unit="s"
                onChange={(speakerPause) => setStudio({ speakerPause })}
              />
            </Knob>
          ) : null}
          {show("temperature") ? (
            <Knob controlId="temperature" label="Temperature">
              <Range
                min={0.1}
                max={2}
                step={0.05}
                value={studio.temperature ?? 1}
                unit=""
                onChange={(temperature) => setStudio({ temperature })}
              />
            </Knob>
          ) : null}
        </div>
      ) : null}

      {show("auto-split") ? (
        <Knob controlId="auto-split" label="Auto split every s">
          <input
            value={studio.autoSplit ?? ""}
            onChange={(e) => setStudio({ autoSplit: e.target.value })}
            placeholder="Empty = disabled"
            className="h-10 w-full rounded-sm border border-border bg-inset px-3 text-sm"
          />
        </Knob>
      ) : null}

      {show("pipeline") || show("self-refiner") ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {show("pipeline") ? (
            <Knob controlId="pipeline" label="Pipeline mode">
              <ChipRow
                value={studio.pipelineMode ?? "standard"}
                options={[
                  { value: "single", label: "Single" },
                  { value: "standard", label: "Standard (2-Stage)" },
                  { value: "progressive", label: "Progressive (3-Stage)" },
                ]}
                onChange={(pipelineMode) =>
                  setStudio({ pipelineMode: pipelineMode as "single" | "standard" | "progressive" })
                }
              />
            </Knob>
          ) : null}
          {show("self-refiner") ? (
            <Knob controlId="self-refiner" label="Self refiner">
              <Toggle
                on={studio.selfRefiner ?? false}
                onChange={(selfRefiner) => setStudio({ selfRefiner })}
                onLabel="On — extra Stage 2 pass"
                offLabel="Disabled"
              />
            </Knob>
          ) : null}
        </div>
      ) : null}

      {show("steps") || show("guidance") || show("seed") ? (
        <div className="grid gap-2 sm:grid-cols-3">
          {show("steps") ? (
            <Knob controlId="steps" label="Inference steps">
              <Range min={4} max={50} step={1} value={studio.steps} unit="" onChange={(steps) => setStudio({ steps })} />
            </Knob>
          ) : null}
          {show("guidance") ? (
            <Knob controlId="guidance" label="Guidance scale">
              <Range min={1} max={12} step={0.5} value={studio.guidance} unit="" onChange={(guidance) => setStudio({ guidance })} />
            </Knob>
          ) : null}
          {show("seed") ? (
            <Knob controlId="seed" label="Seed">
              <input
                value={studio.seed}
                onChange={(e) => setStudio({ seed: e.target.value })}
                placeholder="-1 for random"
                className="h-10 w-full rounded-sm border border-border bg-inset px-3 font-mono text-sm"
              />
            </Knob>
          ) : null}
        </div>
      ) : null}

      {show("prompt-enhance") ? (
        <Knob controlId="prompt-enhance" label="H3 Prompt Enhance / Context-IR">
          <Toggle
            on={studio.enhance}
            onChange={(enhance) => setStudio({ enhance })}
            onLabel="On — speaker IDs, silence, dialogue retention"
            offLabel="Off — you write H3-native"
          />
        </Knob>
      ) : null}

      {show("negative") ? (
        <Knob controlId="negative" label="Negative prompt">
          <input
            value={studio.negative}
            onChange={(e) => setStudio({ negative: e.target.value })}
            className="h-10 w-full rounded-sm border border-border bg-inset px-3 text-sm"
            placeholder="What to avoid…"
          />
        </Knob>
      ) : null}

      {(show("turbo") || show("sol") || show("fbc")) && (
        <div className="grid gap-2 sm:grid-cols-3">
          {show("turbo") ? (
            <Knob controlId="turbo" label="Turbo LoRA">
              <Toggle on={studio.turbo} onChange={(turbo) => setStudio({ turbo })} onLabel="Draft schedule 4/6/8" offLabel="Base quality" />
            </Knob>
          ) : null}
          {show("sol") ? (
            <Knob controlId="sol" label="Sol Engine">
              <Toggle on={studio.sol} onChange={(sol) => setStudio({ sol })} onLabel="RTX 40/50 sparse attn" offLabel="Off (default)" />
            </Knob>
          ) : null}
          {show("fbc") ? (
            <Knob controlId="fbc" label="First Block Cache">
              <Toggle on={studio.fbc} onChange={(fbc) => setStudio({ fbc })} onLabel="Faster, sticky risk" offLabel="Off" />
            </Knob>
          ) : null}
        </div>
      )}

      {show("injection") || show("audio-driven") || show("v2a") || show("mmaudio") || show("v2v") ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {show("injection") ? (
            <Knob controlId="injection" label="Timed frame injection">
              <Toggle on={studio.injection} onChange={(injection) => setStudio({ injection })} onLabel="KFI on" offLabel="Off" />
            </Knob>
          ) : null}
          {show("audio-driven") ? (
            <Knob controlId="audio-driven" label="Audio-driven">
              <Toggle on={studio.audioDriven} onChange={(audioDriven) => setStudio({ audioDriven })} onLabel="Picture follows track" offLabel="Off" />
            </Knob>
          ) : null}
          {show("v2a") ? (
            <Knob controlId="v2a" label="Video-to-audio">
              <Toggle on={studio.v2a} onChange={(v2a) => setStudio({ v2a })} onLabel="Write bed for picture" offLabel="Off" />
            </Knob>
          ) : null}
          {show("mmaudio") ? (
            <Knob controlId="mmaudio" label="MMAudio (Soundtrack)">
              <Toggle on={studio.mmaudio ?? false} onChange={(mmaudio) => setStudio({ mmaudio })} onLabel="On — second-pass soundtrack" offLabel="Off" />
            </Knob>
          ) : null}
          {show("v2v") ? (
            <Knob controlId="v2v" label="v2v / mask denoise">
              <Range min={0.1} max={1} step={0.05} value={studio.v2v} unit="" onChange={(v2v) => setStudio({ v2v })} />
            </Knob>
          ) : null}
        </div>
      ) : null}

      {show("control-image-process") ? (
        <Knob controlId="control-image-process" label="Control image process">
          <ChipRow
            value={studio.controlImage ?? "none"}
            options={[
              { value: "none", label: "None" },
              { value: "pose", label: "Transfer Pose" },
              { value: "inpaint", label: "Inpainting" },
            ]}
            onChange={(controlImage) => setStudio({ controlImage })}
          />
        </Knob>
      ) : null}

      {show("control-video-process") ? (
        <Knob controlId="control-video-process" label="Control video process">
          <select
            className="h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm"
            value={studio.controlVideo ?? "default"}
            onChange={(e) => setStudio({ controlVideo: e.target.value })}
          >
            <option value="default">Default</option>
            <option value="pv">PV</option>
            <option value="dv">DV</option>
            <option value="ev">EV</option>
            <option value="ltxv">Use LTXV raw format</option>
          </select>
        </Knob>
      ) : null}

      {show("post-upscale") || show("post-grain") || show("codec") ? (
        <div className="grid gap-2 sm:grid-cols-3">
          {show("post-upscale") ? (
            <Knob controlId="post-upscale" label="Post processing">
              <Toggle on={studio.upscale} onChange={(upscale) => setStudio({ upscale })} onLabel="On" offLabel="Off" />
            </Knob>
          ) : null}
          {show("post-grain") ? (
            <Knob controlId="post-grain" label="Film grain">
              <Range min={0} max={1} step={0.05} value={studio.grain} unit="" onChange={(grain) => setStudio({ grain })} />
            </Knob>
          ) : null}
          {show("codec") ? (
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

      {show("lora") ? (
        <Knob controlId="lora" label="LoRAs">
          {studio.loras.length === 0 ? (
            <p className="text-xs text-muted">No LoRAs on this path. Browse in the real app.</p>
          ) : (
            studio.loras.map((l) => (
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
                  onChange={(e) =>
                    setStudio({
                      loras: studio.loras.map((x) =>
                        x.id === l.id ? { ...x, weight: Number(e.target.value) } : x,
                      ),
                    })
                  }
                  className="mt-1 w-full accent-gold"
                />
              </div>
            ))
          )}
        </Knob>
      ) : null}

      {show("output-count") ? (
        <Knob controlId="output-count" label="Output count">
          <Range
            min={1}
            max={8}
            step={1}
            value={studio.outputCount ?? 1}
            unit=""
            onChange={(outputCount) => setStudio({ outputCount })}
          />
        </Knob>
      ) : null}
    </>
  );
}

function QueueBlock() {
  const studio = useConsole((s) => s.studio);
  const enqueue = useConsole((s) => s.enqueue);
  const cancelJob = useConsole((s) => s.cancelJob);
  return (
    <Knob controlId="queue" label="Queue / recipes">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={() => {
            enqueue();
            toast("Queued in the replica. This console does not run local models.");
          }}
        >
          Queue
        </Button>
        <Button variant="secondary" onClick={() => toast("Recipe stored in this replica only.")}>
          Save Current
        </Button>
      </div>
      <ul className="mt-3 space-y-2">
        {studio.queue.length === 0 ? (
          <li className="text-sm text-muted">Queue idle.</li>
        ) : (
          studio.queue.map((j) => (
            <li
              key={j.id}
              className="flex items-center justify-between gap-3 rounded-sm border border-border bg-inset px-3 py-2 text-sm"
            >
              <span>
                {j.label}
                <span className="ml-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
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
  );
}

function DropHint({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-inset px-3 py-6 text-center text-sm text-muted">
      {text}
    </div>
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
          className={cn("chip", value === o.value && "chip-on")}
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
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
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
                {VIDEO_INPUTS.map((slot) => (
                  <option key={slot.role}>{slot.role}</option>
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
          Add Frame / Soundtrack / Control / Voice
        </button>
      </div>
    </div>
  );
}
