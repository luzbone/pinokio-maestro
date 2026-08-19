import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MODELS, modelById } from "@/data/models";
import { DEFAULT_ADVISOR, type AdvisorInput } from "@/data/hardware";
import type { MediaKind } from "@/data/types";

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
  status: "queued" | "running" | "cancelled";
  progress: number;
};

type StudioSlice = {
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
  aiPlan: boolean;
  grain: number;
  upscale: boolean;
  codec: string;
  songDuration: number;
  loras: LoraSlot[];
  refs: RefSlot[];
  queue: QueueJob[];
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
  inspectorId: string | null;
  studio: StudioSlice;
  director: DirectorSlice;
  advisor: AdvisorInput;
  setHydrated: (v: boolean) => void;
  setPanel: (id: SectionId) => void;
  openInspector: (id: string) => void;
  closeInspector: () => void;
  setStudio: (patch: Partial<StudioSlice>) => void;
  setModel: (id: string) => void;
  setMode: (mode: MediaKind) => void;
  setDirector: (patch: Partial<DirectorSlice>) => void;
  planDirector: () => void;
  resetDirector: () => void;
  setAdvisor: (patch: Partial<AdvisorInput>) => void;
  enqueue: () => void;
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
    workflow: m.workflows[0] ?? "Text to video",
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
  mode: "video",
  modelId: "h3-omni-pruned",
  workflow: "Omni / Ref2VA",
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
});

const initialDirector = (): DirectorSlice => ({
  skill: "music-video",
  soundtrack: "music3",
  aspect: "16:9",
  resolution: "Match output",
  workflow: "Seamless",
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
      inspectorId: null,
      studio: initialStudio(),
      director: initialDirector(),
      advisor: DEFAULT_ADVISOR,
      setHydrated: (v) => set({ hydrated: v }),
      setPanel: (id) => set({ lastPanel: id }),
      openInspector: (id) => set({ inspectorId: id, lastPanel: get().lastPanel }),
      closeInspector: () => set({ inspectorId: null }),
      setStudio: (patch) => set({ studio: { ...get().studio, ...patch } }),
      setMode: (mode) => {
        const m = firstOf(mode);
        set({
          studio: {
            ...get().studio,
            mode,
            ...studioFor(m.id),
            refs: [],
            queue: get().studio.queue,
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
        if (d.locked && ("skill" in patch || "soundtrack" in patch || "videoModel" in patch || "imageModel" in patch || "aspect" in patch || "resolution" in patch || "workflow" in patch || "review" in patch)) {
          return;
        }
        set({ director: { ...d, ...patch } });
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
      enqueue: () => {
        const s = get().studio;
        const m = modelById(s.modelId);
        const job: QueueJob = {
          id: `q-${Date.now()}`,
          label: `${m?.maestroLabel ?? "Job"} · ${s.duration}s replica`,
          status: "running",
          progress: 8,
        };
        set({ studio: { ...s, queue: [job, ...s.queue].slice(0, 6) } });
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
      name: "maestro-console-v1871",
      partialize: (s) => ({
        lastPanel: s.lastPanel,
        advisor: s.advisor,
      }),
      skipHydration: true,
    },
  ),
);
