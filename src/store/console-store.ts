import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MODELS, modelById } from "@/data/models";
import { DEFAULT_ADVISOR, type AdvisorInput } from "@/data/hardware";
import type { MediaKind } from "@/data/types";
import { defaultSub, leafOf, resolveModelId, studioPathForModel, type AudioSub, type EditSub, type StudioCategory, type ToolsSub, type VideoSub } from "@/data/studio-tree";

export type SectionId =
  | "models"
  | "overview"
  | "studio"
  | "director"
  | "edit"
  | "hardware"
  | "cheat";

export type LoraSlot = {
  id: string;
  name: string;
  weight: number;
  rec: string;
};

export type RefSlot = {
  id: string;
  kind: "image" | "video" | "audio";
  role: string;
  label: string;
};

export type QueueJob = {
  id: string;
  label: string;
  source: "studio" | "director";
  status: "held" | "queued" | "running" | "paused" | "cancelled" | "complete";
  progress: number;
};

type StudioSlice = {
  category: StudioCategory;
  videoSub: VideoSub;
  audioSub: AudioSub;
  editSub: EditSub;
  toolsSub: ToolsSub;
  advancedOpen: boolean;
  mode: MediaKind;
  modelId: string;
  workflow: string;
  aspect: string;
  resolution: string;
  duration: number;
  fps: number;
  windows: number;
  overlap: number;
  prompt: string;
  enhance: boolean;
  negative: string;
  steps: number;
  guidance: number;
  seed: string;
  turbo: boolean;
  sol: boolean;
  fbc: boolean;
  injection: boolean;
  audioDriven: boolean;
  v2a: boolean;
  v2v: number;
  blend: boolean;
  pipelineMode: "single" | "standard" | "progressive";
  selfRefiner: boolean;
  mmaudio: boolean;
  aiPlan: boolean;
  grain: number;
  upscale: boolean;
  codec: string;
  songDuration: number;
  loras: LoraSlot[];
  refs: RefSlot[];
  queue: QueueJob[];
  outputCount: number;
  speakerPause: number;
  temperature: number;
  autoSplit: string;
  controlImage: string;
  controlVideo: string;
  retakeEngine: "native" | "legacy";
  upscaleMethod: "flashvsr" | "lanczos";
  speechDuration: number;
};

type DirectorSlice = {
  skill: "music-video" | "short-film";
  soundtrack: "existing" | "music3" | "acestep";
  aspect: string;
  resolution: string;
  workflow: string;
  videoModel: string;
  imageModel: string;
  review: "auto" | "manual";
  pacing: number;
  locked: boolean;
  stage: string;
  plannedDuration: number;
};

type State = {
  hydrated: boolean;
  lastPanel: SectionId;
  navHoldUntil: number;
  inspectorId: string | null;
  studio: StudioSlice;
  director: DirectorSlice;
  advisor: AdvisorInput;
  setHydrated: (v: boolean) => void;
  setPanel: (id: SectionId) => void;
  lockPanel: (id: SectionId) => void;
  openInspector: (id: string) => void;
  closeInspector: () => void;
  setStudio: (patch: Partial<StudioSlice>) => void;
  setModel: (id: string) => void;
  setMode: (mode: MediaKind) => void;
  loadStudioModel: (id: string) => void;
  setCategory: (category: StudioCategory) => void;
  tickQueue: () => void;
  setDirector: (patch: Partial<DirectorSlice>) => void;
  planDirector: () => void;
  resetDirector: () => void;
  setAdvisor: (patch: Partial<AdvisorInput>) => void;
  enqueue: (mode?: "run" | "hold", source?: "studio" | "director") => void;
  startQueue: () => void;
  pauseQueue: () => void;
  removeJob: (id: string) => void;
  moveJob: (id: string, dir: -1 | 1) => void;
  cancelJob: (id: string) => void;
};

const firstOf = (kind: MediaKind) => MODELS.find((m) => m.kind === kind)!;

const lorasFor = (family: string): LoraSlot[] => {
  if (family === "h3") {
    return [{ id: "turbo", name: "H3 Turbo LoRA", weight: 1, rec: "1.0 on 4/6/8 schedules" }];
  }
  if (family === "ltx23" || family === "ltx25" || family === "wan") {
    return [{ id: "style", name: "Style LoRA", weight: 0.7, rec: "0.55–0.8 from CivitAI guide" }];
  }
  return [];
};

const studioFor = (modelId: string): Partial<StudioSlice> => {
  const m = modelById(modelId) ?? firstOf("video");
  return {
    modelId: m.id,
    workflow: m.workflows[0] ?? "Frames",
    aspect: m.aspects[0] ?? "16:9",
    resolution: m.resolutions[0] ?? "Match output",
    duration: m.maxNativeSec ? Math.min(8, m.maxNativeSec) : 8,
    fps: m.nativeFps ?? 24,
    steps: m.family === "h3" ? 8 : m.family === "ltx25" ? 8 : 28,
    enhance: m.family === "h3",
    turbo: m.family === "h3" && m.variant.includes("Pruned"),
    loras: lorasFor(m.family),
  };
};

const initialStudio = (): StudioSlice => ({
  category: "video",
  videoSub: "frames",
  audioSub: "speech",
  editSub: "retake",
  toolsSub: "upscale",
  advancedOpen: true,
  mode: "video",
  modelId: "h3-omni-pruned",
  workflow: "Frames",
  aspect: "16:9",
  resolution: "Match output",
  duration: 8,
  fps: 24,
  windows: 1,
  overlap: 1,
  prompt: "",
  enhance: true,
  negative: "",
  steps: 8,
  guidance: 4,
  seed: "",
  turbo: true,
  sol: false,
  fbc: false,
  injection: false,
  audioDriven: false,
  v2a: false,
  v2v: 0.35,
  blend: false,
  pipelineMode: "standard",
  selfRefiner: false,
  mmaudio: false,
  aiPlan: true,
  grain: 0,
  upscale: false,
  codec: "Default master",
  songDuration: 120,
  loras: [
    { id: "turbo", name: "H3 Turbo LoRA", weight: 1, rec: "1.0 on 4/6/8 schedules" },
  ],
  refs: [],
  queue: [],
  outputCount: 1,
  speakerPause: 0.5,
  temperature: 1,
  autoSplit: "",
  controlImage: "none",
  controlVideo: "default",
  retakeEngine: "native",
  upscaleMethod: "flashvsr",
  speechDuration: 20,
});

const initialDirector = (): DirectorSlice => ({
  skill: "music-video",
  soundtrack: "music3",
  aspect: "16:9",
  resolution: "720p",
  workflow: "Auto",
  videoModel: "h3-omni-pruned",
  imageModel: "krea-identity",
  review: "manual",
  pacing: 50,
  locked: false,
  stage: "analyze",
  plannedDuration: 120,
});

export const useConsole = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      lastPanel: "models",
      navHoldUntil: 0,
      inspectorId: null,
      studio: initialStudio(),
      director: initialDirector(),
      advisor: DEFAULT_ADVISOR,
      setHydrated: (v) => set({ hydrated: v }),
      setPanel: (id) => {
        const s = get();
        if (Date.now() < s.navHoldUntil && id !== s.lastPanel) return;
        if (id === s.lastPanel) return;
        set({ lastPanel: id });
      },
      lockPanel: (id) => set({ lastPanel: id, navHoldUntil: Date.now() + 800 }),
      openInspector: (id) => set({ inspectorId: id }),
      closeInspector: () => set({ inspectorId: null }),
      setStudio: (patch) => set({ studio: { ...get().studio, ...patch } }),
      setMode: (mode) => {
        const current = get().studio;
        const m = firstOf(mode);
        set({
          studio: {
            ...current,
            category: mode,
            mode,
            ...studioFor(m.id),
            refs: [],
            queue: current.queue,
          },
        });
      },
      loadStudioModel: (id) => {
        const current = get().studio;
        const path = studioPathForModel(id);
        const m = modelById(id);
        if (!path || !m) return;
        const videoSub =
          path.category === "video" && current.category === "video"
            ? current.videoSub
            : (path.videoSub ?? current.videoSub);
        const audioSub = path.audioSub ?? current.audioSub;
        set({
          studio: {
            ...current,
            category: path.category,
            videoSub,
            audioSub,
            mode: m.kind,
            ...studioFor(id),
            queue: current.queue,
          },
          lastPanel: "studio",
          navHoldUntil: Date.now() + 800,
        });
      },
      setCategory: (category) => {
        const current = get().studio;
        const sub =
          category === "video"
            ? (current.videoSub ?? "frames")
            : category === "audio"
              ? (current.audioSub ?? "speech")
              : category === "edit"
                ? (current.editSub ?? "retake")
                : category === "tools"
                  ? (current.toolsSub ?? "upscale")
                  : defaultSub(category);
        const leaf = leafOf(category, sub);
        const nextModel = resolveModelId(leaf, current.modelId);
        const kind: MediaKind =
          category === "image" || category === "video" || category === "audio"
            ? category
            : (nextModel ? (modelById(nextModel)?.kind ?? current.mode) : current.mode);
        set({
          studio: {
            ...current,
            category,
            videoSub: current.videoSub ?? "frames",
            audioSub: current.audioSub ?? "speech",
            editSub: current.editSub ?? "retake",
            toolsSub: current.toolsSub ?? "upscale",
            mode: kind,
            ...(nextModel ? studioFor(nextModel) : {}),
            queue: current.queue,
          },
        });
      },
      setModel: (id) => {
        const current = get().studio;
        set({
          studio: {
            ...current,
            ...studioFor(id),
            mode: modelById(id)?.kind ?? current.mode,
          },
        });
      },
      setDirector: (patch) => {
        const d = get().director;
        const lockedKeys = ["skill", "soundtrack", "imageModel", "aspect", "resolution", "workflow", "review"] as const;
        if (d.locked && lockedKeys.some((k) => k in patch)) {
          return;
        }
        const next = { ...d, ...patch };
        if (!d.locked && "soundtrack" in patch && !("plannedDuration" in patch)) {
          next.plannedDuration =
            patch.soundtrack === "acestep" ? 90 : patch.soundtrack === "music3" ? 120 : next.plannedDuration;
        }
        set({ director: next });
      },
      planDirector: () =>
        set({
          director: {
            ...get().director,
            locked: true,
            stage: "shot-plan",
          },
        }),
      resetDirector: () => set({ director: initialDirector() }),
      setAdvisor: (patch) => set({ advisor: { ...get().advisor, ...patch } }),
      enqueue: (mode = "run", source = "studio") => {
        const s = get().studio;
        const m = modelById(s.modelId);
        const busy = s.queue.some((j) => j.status === "running");
        const job: QueueJob = {
          id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          label:
            source === "director"
              ? "Director project · checkpointed replica"
              : `${m?.maestroLabel ?? "Job"} · replica`,
          source,
          status: mode === "hold" ? "held" : busy ? "queued" : "running",
          progress: mode === "hold" || busy ? 0 : 8,
        };
        set({ studio: { ...s, queue: [job, ...s.queue].slice(0, 8) } });
      },
      startQueue: () => {
        const s = get().studio;
        const already = s.queue.some((j) => j.status === "running");
        let started = already;
        set({
          studio: {
            ...s,
            queue: s.queue.map((j) => {
              if (j.status === "cancelled" || j.status === "complete") return j;
              if (!started && (j.status === "held" || j.status === "queued" || j.status === "paused")) {
                started = true;
                return { ...j, status: "running" as const, progress: Math.max(j.progress, 8) };
              }
              if (!already && j.status === "held") return { ...j, status: "queued" as const };
              return j;
            }),
          },
        });
      },
      tickQueue: () => {
        const s = get().studio;
        if (s.queue.length === 0) return;
        let queue = s.queue.map((j) => {
          if (j.status !== "running") return j;
          const progress = Math.min(100, j.progress + 9);
          if (progress >= 100) return { ...j, status: "complete" as const, progress: 100 };
          return { ...j, progress };
        });
        if (!queue.some((j) => j.status === "running")) {
          const next = queue.find((j) => j.status === "queued");
          if (next) {
            queue = queue.map((j) =>
              j.id === next.id ? { ...j, status: "running" as const, progress: Math.max(j.progress, 8) } : j,
            );
          }
        }
        set({ studio: { ...s, queue } });
      },
      pauseQueue: () => {
        const s = get().studio;
        set({
          studio: {
            ...s,
            queue: s.queue.map((j) => (j.status === "running" ? { ...j, status: "paused" as const } : j)),
          },
        });
      },
      removeJob: (id) => {
        const s = get().studio;
        set({ studio: { ...s, queue: s.queue.filter((j) => j.id !== id) } });
      },
      moveJob: (id, dir) => {
        const s = get().studio;
        const i = s.queue.findIndex((j) => j.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= s.queue.length) return;
        const next = s.queue.slice();
        const [item] = next.splice(i, 1);
        next.splice(j, 0, item);
        set({ studio: { ...s, queue: next } });
      },
      cancelJob: (id) =>
        set({
          studio: {
            ...get().studio,
            queue: get().studio.queue.map((j) =>
              j.id === id ? { ...j, status: "cancelled" } : j,
            ),
          },
        }),
    }),
    {
      name: "maestro-console-v191",
      partialize: (s) => ({
        advisor: s.advisor,
      }),
      skipHydration: true,
    },
  ),
);
