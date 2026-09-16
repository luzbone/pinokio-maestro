import { MODELS } from "./models";

export type StudioCategory = "video" | "image" | "audio";

export type VideoSub =
  | "frames"
  | "references"
  | "extend"
  | "blend"
  | "animate"
  | "retake"
  | "prompt-edit"
  | "outpaint"
  | "repaint"
  | "recast"
  | "upscale"
  | "film-grain";

export type ImageSub = "generate" | "inpaint" | "outpaint" | "upscale";
export type AudioSub = "speech" | "music" | "sfx" | "mixer" | "revoice";
export type StudioSub = VideoSub | ImageSub | AudioSub;

export type StudioLeaf = {
  category: StudioCategory;
  sub: StudioSub | null;
  label: string;
  group: string;
  hasAdvanced: boolean;
  defaultModelId: string | null;
  modelFilter: "image" | "video" | "tts" | "music" | "sfx" | "viggle" | "scail" | "none";
  placeholder: string;
  primary: string[];
  advanced: string[];
};

export const STUDIO_CATEGORIES: { id: StudioCategory; label: string }[] = [
  { id: "video", label: "Video" },
  { id: "image", label: "Image" },
  { id: "audio", label: "Audio" },
];

export const STUDIO_GROUPS: Record<
  StudioCategory,
  { label: string; items: { id: StudioSub; label: string }[] }[]
> = {
  video: [
    {
      label: "Create",
      items: [
        { id: "frames", label: "Frames" },
        { id: "references", label: "References" },
        { id: "extend", label: "Extend" },
        { id: "blend", label: "Blend" },
      ],
    },
    {
      label: "Transform",
      items: [
        { id: "animate", label: "Animate" },
        { id: "retake", label: "Retake" },
        { id: "prompt-edit", label: "Prompt Edit" },
        { id: "outpaint", label: "Outpaint" },
        { id: "repaint", label: "Repaint" },
        { id: "recast", label: "Recast" },
      ],
    },
    {
      label: "Finish",
      items: [
        { id: "upscale", label: "Upscale" },
        { id: "film-grain", label: "Film Grain" },
      ],
    },
  ],
  image: [
    {
      label: "Create",
      items: [{ id: "generate", label: "Generate" }],
    },
    {
      label: "Transform",
      items: [
        { id: "inpaint", label: "Inpaint" },
        { id: "outpaint", label: "Outpaint" },
      ],
    },
    {
      label: "Finish",
      items: [{ id: "upscale", label: "Upscale" }],
    },
  ],
  audio: [
    {
      label: "Create",
      items: [
        { id: "speech", label: "Speech" },
        { id: "music", label: "Music" },
        { id: "sfx", label: "Sound Effects" },
      ],
    },
    {
      label: "Process",
      items: [
        { id: "mixer", label: "Mixer" },
        { id: "revoice", label: "Revoice" },
      ],
    },
  ],
};

export const STUDIO_SUBS: Record<StudioCategory, { id: StudioSub; label: string }[]> = {
  video: STUDIO_GROUPS.video.flatMap((g) => g.items),
  image: STUDIO_GROUPS.image.flatMap((g) => g.items),
  audio: STUDIO_GROUPS.audio.flatMap((g) => g.items),
};

const VIDEO_ADV = [
  "lora",
  "resolution",
  "aspect",
  "windows",
  "overlap",
  "post-upscale",
  "post-grain",
  "temporal-upsample",
  "face-refiner",
  "audio-refine",
  "codec",
  "seed",
  "self-refiner",
  "pipeline",
  "steps",
  "guidance",
  "negative",
  "mmaudio",
  "output-count",
];

const EDIT_ADV = [
  "lora",
  "resolution",
  "windows",
  "post-upscale",
  "seed",
  "steps",
  "guidance",
  "negative",
  "control-video-process",
  "output-count",
];

export const STUDIO_LEAVES: StudioLeaf[] = [
  {
    category: "video",
    sub: "frames",
    label: "Frames",
    group: "Create",
    hasAdvanced: true,
    defaultModelId: "h3-fl-pruned",
    modelFilter: "video",
    placeholder: "Describe your video…",
    primary: ["duration", "start-end", "soundtrack", "control-video", "enhance-now", "prompt"],
    advanced: VIDEO_ADV,
  },
  {
    category: "video",
    sub: "references",
    label: "References",
    group: "Create",
    hasAdvanced: true,
    defaultModelId: "h3-omni-pruned",
    modelFilter: "video",
    placeholder: "Who is in the shot, what they do, what they say…",
    primary: ["duration", "refs", "characters", "enhance-now", "prompt"],
    advanced: VIDEO_ADV,
  },
  {
    category: "video",
    sub: "extend",
    label: "Extend",
    group: "Create",
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
    group: "Create",
    hasAdvanced: true,
    defaultModelId: "ltx25-distilled",
    modelFilter: "video",
    placeholder: "Describe the join between the two clips…",
    primary: ["source-clip", "blend", "prompt"],
    advanced: ["seed", "steps", "overlap", "guidance", "lora", "output-count"],
  },
  {
    category: "video",
    sub: "animate",
    label: "Animate",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "viggle-animate",
    modelFilter: "viggle",
    placeholder: "Optional appearance notes for the character prep…",
    primary: ["source-clip", "control-video", "ref-images", "prompt"],
    advanced: ["seed", "steps", "output-count"],
  },
  {
    category: "video",
    sub: "retake",
    label: "Retake",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "ltx23",
    modelFilter: "video",
    placeholder: "Describe the change inside the selected beat…",
    primary: ["source-clip", "retake-engine", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "video",
    sub: "prompt-edit",
    label: "Prompt Edit",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "ltx23",
    modelFilter: "video",
    placeholder: "Describe what to add, remove, or change…",
    primary: ["source-clip", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "video",
    sub: "outpaint",
    label: "Outpaint",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "ltx23",
    modelFilter: "video",
    placeholder: "Describe the new edges of the frame…",
    primary: ["source-clip", "prompt"],
    advanced: ["resolution", "aspect", "seed", "steps", "lora", "output-count"],
  },
  {
    category: "video",
    sub: "repaint",
    label: "Repaint",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "scail2-fast",
    modelFilter: "scail",
    placeholder: "Describe the new look. Keep the blocking…",
    primary: ["source-clip", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "video",
    sub: "recast",
    label: "Recast",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "scail2-fast",
    modelFilter: "scail",
    placeholder: "Describe the replacement character…",
    primary: ["source-clip", "ref-images", "prompt"],
    advanced: EDIT_ADV,
  },
  {
    category: "video",
    sub: "upscale",
    label: "Upscale",
    group: "Finish",
    hasAdvanced: false,
    defaultModelId: null,
    modelFilter: "none",
    placeholder: "",
    primary: ["source-clip", "upscale-method"],
    advanced: [],
  },
  {
    category: "video",
    sub: "film-grain",
    label: "Film Grain",
    group: "Finish",
    hasAdvanced: true,
    defaultModelId: null,
    modelFilter: "none",
    placeholder: "",
    primary: ["source-clip", "post-grain"],
    advanced: ["seed", "output-count"],
  },
  {
    category: "image",
    sub: "generate",
    label: "Generate",
    group: "Create",
    hasAdvanced: true,
    defaultModelId: "flux-klein",
    modelFilter: "image",
    placeholder: "Describe your image…",
    primary: ["ref-images", "enhance-now", "prompt"],
    advanced: [
      "lora",
      "resolution",
      "aspect",
      "post-upscale",
      "seed",
      "steps",
      "guidance",
      "negative",
      "control-image-process",
      "output-count",
    ],
  },
  {
    category: "image",
    sub: "inpaint",
    label: "Inpaint",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "krea-identity",
    modelFilter: "image",
    placeholder: "Describe what belongs in the masked area…",
    primary: ["ref-images", "prompt"],
    advanced: ["resolution", "seed", "steps", "guidance", "lora", "output-count"],
  },
  {
    category: "image",
    sub: "outpaint",
    label: "Outpaint",
    group: "Transform",
    hasAdvanced: true,
    defaultModelId: "krea-raw",
    modelFilter: "image",
    placeholder: "Describe the new canvas around the still…",
    primary: ["ref-images", "prompt"],
    advanced: ["resolution", "aspect", "seed", "steps", "lora", "output-count"],
  },
  {
    category: "image",
    sub: "upscale",
    label: "Upscale",
    group: "Finish",
    hasAdvanced: false,
    defaultModelId: null,
    modelFilter: "none",
    placeholder: "",
    primary: ["ref-images", "upscale-method"],
    advanced: [],
  },
  {
    category: "audio",
    sub: "speech",
    label: "Speech",
    group: "Create",
    hasAdvanced: true,
    defaultModelId: "kugelaudio",
    modelFilter: "tts",
    placeholder: "Enter text to speak…",
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
    group: "Create",
    hasAdvanced: true,
    defaultModelId: "yue2",
    modelFilter: "music",
    placeholder: "Lyrics with [Verse] / [Chorus]. Style, mood, and tempo in Music Style…",
    primary: ["prompt", "music3-duration"],
    advanced: ["seed", "steps", "lora", "output-count"],
  },
  {
    category: "audio",
    sub: "sfx",
    label: "Sound Effects",
    group: "Create",
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
    group: "Process",
    hasAdvanced: true,
    defaultModelId: null,
    modelFilter: "none",
    placeholder: "",
    primary: ["mixer"],
    advanced: ["seed", "output-count"],
  },
  {
    category: "audio",
    sub: "revoice",
    label: "Revoice",
    group: "Process",
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
  return STUDIO_LEAVES.find((l) => l.category === category) ?? STUDIO_LEAVES[0];
}

export function defaultSub(category: StudioCategory): StudioSub {
  return STUDIO_SUBS[category][0].id;
}

export function modelsForFilter(filter: StudioLeaf["modelFilter"]) {
  if (filter === "image") return MODELS.filter((m) => m.kind === "image");
  if (filter === "video") {
    return MODELS.filter(
      (m) => m.kind === "video" && m.family !== "viggle" && m.family !== "scail",
    );
  }
  if (filter === "viggle") return MODELS.filter((m) => m.family === "viggle");
  if (filter === "scail") return MODELS.filter((m) => m.family === "scail");
  if (filter === "tts") return MODELS.filter((m) => m.family === "tts" || m.id === "h3-voice-audio");
  if (filter === "music") {
    return MODELS.filter((m) => m.family === "yue2" || m.family === "music3" || m.family === "acestep");
  }
  if (filter === "sfx") return MODELS.filter((m) => m.family === "sfx");
  return [];
}

export function resolveModelId(leaf: StudioLeaf, currentId: string): string | null {
  if (leaf.modelFilter === "none") return null;
  const models = modelsForFilter(leaf.modelFilter);
  if (models.some((m) => m.id === currentId)) return currentId;
  return leaf.defaultModelId ?? models[0]?.id ?? null;
}

export function studioPathForModel(id: string): {
  category: StudioCategory;
  videoSub: VideoSub | null;
  imageSub: ImageSub | null;
  audioSub: AudioSub | null;
} | null {
  const m = MODELS.find((x) => x.id === id);
  if (!m) return null;
  if (m.kind === "image") return { category: "image", videoSub: null, imageSub: "generate", audioSub: null };
  if (m.family === "viggle") {
    return { category: "video", videoSub: "animate", imageSub: null, audioSub: null };
  }
  if (m.family === "scail") {
    return { category: "video", videoSub: "recast", imageSub: null, audioSub: null };
  }
  if (m.kind === "video") {
    const videoSub: VideoSub = m.variant.toLowerCase().includes("omni") || m.id.includes("omni")
      ? "references"
      : "frames";
    return { category: "video", videoSub, imageSub: null, audioSub: null };
  }
  if (m.family === "tts" || m.id === "h3-voice-audio") {
    return { category: "audio", videoSub: null, imageSub: null, audioSub: "speech" };
  }
  if (m.family === "sfx") return { category: "audio", videoSub: null, imageSub: null, audioSub: "sfx" };
  return { category: "audio", videoSub: null, imageSub: null, audioSub: "music" };
}
