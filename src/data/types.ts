export type BadgeId =
  | "beginner"
  | "pro"
  | "fast"
  | "heavy"
  | "audio-native"
  | "long-form";

export type MediaKind = "video" | "image" | "audio";

export type ModelFamily =
  | "h3"
  | "ltx25"
  | "ltx23"
  | "wan"
  | "hunyuan"
  | "flux"
  | "krea"
  | "qwen"
  | "music3"
  | "acestep"
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
