export type BadgeId =
  | "beginner"
  | "pro"
  | "fast"
  | "heavy"
  | "audio-native"
  | "long-form"
  | "experimental";

export type MediaKind = "video" | "image" | "audio";

export type ModelFamily =
  | "h3"
  | "ltx25"
  | "ltx23"
  | "wan"
  | "hunyuan"
  | "viggle"
  | "scail"
  | "flux"
  | "krea"
  | "qwen"
  | "music3"
  | "acestep"
  | "yue2"
  | "tts"
  | "sfx";

export type GoalId =
  | "talking"
  | "music-video"
  | "stills"
  | "long-sequence"
  | "low-vram";

export type ControlKind =
  | "select"
  | "slider"
  | "toggle"
  | "text"
  | "chips"
  | "button"
  | "refs"
  | "lora";

export type ControlGroup =
  | "model"
  | "format"
  | "prompt"
  | "refs"
  | "sampling"
  | "accel"
  | "workflow"
  | "lora"
  | "queue"
  | "post";

export type HardwareStatus = "comfortable" | "tight" | "crash";
