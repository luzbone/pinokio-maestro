import { MODELS } from "./models";

export type StudioCategory = "image" | "video" | "audio" | "edit" | "tools";

export type VideoSub = "frames" | "multi-shot" | "extend" | "blend";
export type AudioSub = "speech" | "music" | "sfx" | "mixer";
export type EditSub = "retake" | "edit-anything" | "outpaint" | "repaint" | "recast";
export type ToolsSub = "upscale" | "revoice";
export type StudioSub = VideoSub | AudioSub | EditSub | ToolsSub;

export type StudioLeaf = {
  category: StudioCategory;
  sub: StudioSub | null;
  label: string;
  hasAdvanced: boolean;
  defaultModelId: string | null;
  modelFilter: "image" | "video" | "tts" | "music" | "sfx" | "none";
  placeholder: string;
  primary: string[];
  advanced: string[];
};

export const STUDIO_CATEGORIES: { id: StudioCategory; label: string }[] = [
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
  { id: "edit", label: "Edit" },
  { id: "tools", label: "Tools" },
];

export const STUDIO_SUBS: Record<StudioCategory, { id: StudioSub; label: string }[]> = {
  image: [],
  video: [
    { id: "frames", label: "Frames" },
    { id: "multi-shot", label: "Multi-Shot" },
    { id: "extend", label: "Extend" },
    { id: "blend", label: "Blend" },
  ],
  audio: [
    { id: "speech", label: "Speech" },
    { id: "music", label: "Music" },
    { id: "sfx", label: "SFX" },
    { id: "mixer", label: "Mixer" },
  ],
  edit: [
    { id: "retake", label: "Retake" },
    { id: "edit-anything", label: "Edit Anything" },
    { id: "outpaint", label: "Outpaint" },
    { id: "repaint", label: "Repaint" },
    { id: "recast", label: "Recast" },
  ],
  tools: [
    { id: "upscale", label: "Upscale" },
    { id: "revoice", label: "Revoice" },
  ],
};

const VIDEO_ADV = [
  "resolution",
  "aspect",
  "windows",
  "overlap",
  "post-upscale",
  "post-grain",
  "codec",
  "seed",
  "self-refiner",
  "pipeline",
  "steps",
  "guidance",
  "negative",
  "mmaudio",
  "lora",
  "output-count",
];

const EDIT_ADV = [
  "resolution",
  "windows",
  "post-upscale",
  "seed",
  "steps",
  "guidance",
  "negative",
  "control-video-process",
  "lora",
  "output-count",
];

export const STUDIO_LEAVES: StudioLeaf[] = [
  {
    category: "image",
    sub: null,
    label: "Image",
    hasAdvanced: true,
    defaultModelId: "flux-klein",
    modelFilter: "image",
    placeholder: "Describe your image…",
    primary: ["ref-images", "prompt"],
    advanced: [
      "resolution",
      "aspect",
      "post-upscale",
      "seed",
      "steps",
      "guidance",
      "negative",
      "control-image-process",
      "lora",
      "output-count",
    ],
  },
  {
    category: "video",
    sub: "frames",
    label: "Frames",
    hasAdvanced: true,
    defaultModelId: "h3-omni-pruned",
    modelFilter: "video",
    placeholder: "Describe your video…",
    primary: ["duration", "refs", "ai-plan", "prompt"],
    advanced: VIDEO_ADV,
  },
  {
    category: "video",
    sub: "multi-shot",
    label: "Multi-Shot",
    hasAdvanced: true,
    defaultModelId: "h3-omni-pruned",
    modelFilter: "video",
    placeholder: "Describe the sequence of shots…",
    primary: ["duration", "refs", "ai-plan", "prompt"],
    advanced: VIDEO_ADV,
  },
  {
    category: "video",
    sub: "extend",
    label: "Extend",
    hasAdvanced: true,
    defaultModelId: "ltx23",
    modelFilter: "video",
    placeholder: "Describe how the take should continue…",
    primary: ["source-clip", "duration", "prompt"],
    advanced: VIDEO_ADV,
  },
  {
    category: "video",
    sub: "blend",
    label: "Blend",
    hasAdvanced: true,
    defaultModelId: "wan22",
    modelFilter: "video",
    placeholder: "Describe the join between the two clips…",
    primary: ["source-clip", "blend", "prompt"],
    advanced: ["seed", "steps", "overlap", "guidance", "lora", "output-count"],
  },
  {
    category: "audio",
    sub: "speech",
    label: "Speech",
    hasAdvanced: true,
    defaultModelId: "kugelaudio",
    modelFilter: "tts",
    placeholder: "Enter text to speak or describe audio…",
    primary: ["voice-clone", "prompt"],
    advanced: [
      "speech-duration",
      "speaker-pause",
      "temperature",
      "guidance",
      "auto-split",
      "seed",
      "lora",
      "output-count",
    ],
  },
  {
    category: "audio",
    sub: "music",
    label: "Music",
    hasAdvanced: true,
    defaultModelId: "music3",
    modelFilter: "music",
    placeholder: "Describe the song — sections, lyrics, mood…",
    primary: ["prompt", "music3-duration"],
    advanced: ["seed", "steps", "lora", "output-count"],
  },
  {
    category: "audio",
    sub: "sfx",
    label: "SFX",
    hasAdvanced: true,
    defaultModelId: "mmaudio",
    modelFilter: "sfx",
    placeholder: "Describe the foley, room, or ambience…",
    primary: ["source-clip", "prompt"],
    advanced: ["seed", "speech-duration", "lora", "output-count"],
  },
  {
    category: "audio",
    sub: "mixer",
    label: "Mixer",
    hasAdvanced: true,
    defaultModelId: null,
    modelFilter: "none",
    placeholder: "",
    primary: ["mixer"],
    advanced: ["seed", "output-count"],
  },
  {
    category: "edit",
    sub: "retake",
    label: "Retake",
    hasAdvanced: true,
    defaultModelId: "ltx23",
    modelFilter: "video",
    placeholder: "Describe the change inside the selected beat…",
    primary: ["source-clip", "retake-engine", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "edit",
    sub: "edit-anything",
    label: "Edit Anything",
    hasAdvanced: true,
    defaultModelId: "ltx23",
    modelFilter: "video",
    placeholder: "Describe what to add, remove, or change…",
    primary: ["source-clip", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "edit",
    sub: "outpaint",
    label: "Outpaint",
    hasAdvanced: true,
    defaultModelId: "ltx23",
    modelFilter: "video",
    placeholder: "Describe the new edges of the frame…",
    primary: ["source-clip", "prompt"],
    advanced: ["resolution", "aspect", "seed", "steps", "lora", "output-count"],
  },
  {
    category: "edit",
    sub: "repaint",
    label: "Repaint",
    hasAdvanced: true,
    defaultModelId: "wan22",
    modelFilter: "video",
    placeholder: "Describe the new look. Keep the blocking…",
    primary: ["source-clip", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "edit",
    sub: "recast",
    label: "Recast",
    hasAdvanced: true,
    defaultModelId: "wan22",
    modelFilter: "video",
    placeholder: "Describe the replacement character…",
    primary: ["source-clip", "ref-images", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "tools",
    sub: "upscale",
    label: "Upscale",
    hasAdvanced: false,
    defaultModelId: null,
    modelFilter: "none",
    placeholder: "",
    primary: ["source-clip", "upscale-method"],
    advanced: [],
  },
  {
    category: "tools",
    sub: "revoice",
    label: "Revoice",
    hasAdvanced: false,
    defaultModelId: null,
    modelFilter: "none",
    placeholder: "",
    primary: ["source-clip", "voice-clone"],
    advanced: [],
  },
];

export function leafOf(category: StudioCategory, sub: StudioSub | null | undefined): StudioLeaf {
  const found = STUDIO_LEAVES.find((l) => l.category === category && (l.sub ?? null) === (sub ?? null));
  if (found) return found;
  return STUDIO_LEAVES.find((l) => l.category === category) ?? STUDIO_LEAVES[1];
}

export function defaultSub(category: StudioCategory): StudioSub | null {
  return STUDIO_SUBS[category][0]?.id ?? null;
}

export function modelsForFilter(filter: StudioLeaf["modelFilter"]) {
  if (filter === "image") return MODELS.filter((m) => m.kind === "image");
  if (filter === "video") return MODELS.filter((m) => m.kind === "video");
  if (filter === "tts") return MODELS.filter((m) => m.family === "tts");
  if (filter === "music") return MODELS.filter((m) => m.family === "music3" || m.family === "acestep");
  if (filter === "sfx") return MODELS.filter((m) => m.family === "sfx");
  return [];
}

/** Keep the current model if it belongs on this leaf; otherwise the leaf default. */
export function resolveModelId(leaf: StudioLeaf, currentId: string): string | null {
  if (leaf.modelFilter === "none") return null;
  const models = modelsForFilter(leaf.modelFilter);
  if (models.some((m) => m.id === currentId)) return currentId;
  return leaf.defaultModelId ?? models[0]?.id ?? null;
}
