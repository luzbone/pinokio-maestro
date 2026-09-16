import type { HardwareStatus } from "./types";

export type VramGB = 6 | 8 | 10 | 12 | 16 | 24 | 32 | 48;
export type RamGB = 16 | 24 | 32 | 48 | 64 | 96;
export type GpuFamily = 30 | 40 | 50;
export type AdvisorGoal =
  | "talking"
  | "music-video"
  | "short-film"
  | "stills"
  | "long-multi";
export type AdvisorBias = "safe" | "balanced" | "max";

export type AdvisorInput = {
  vram: VramGB;
  ram: RamGB;
  gpu: GpuFamily;
  goal: AdvisorGoal;
  bias: AdvisorBias;
  directorLlm: boolean;
};

export type Recipe = {
  name: string;
  video: string;
  image: string;
  audio: string;
  resolution: string;
  window: string;
  accel: string;
  notes: string;
};

export type AdvisorResult = {
  status: HardwareStatus;
  headline: string;
  video: string;
  image: string;
  audio: string;
  resolution: string;
  window: string;
  multiWindow: string;
  accel: string;
  loras: string;
  oomOrder: string[];
  ramWarnings: string[];
  solNote: string;
  autoTune: string;
  beginner: Recipe;
  maxQuality: Recipe;
};

export const VRAM_OPTIONS: VramGB[] = [6, 8, 10, 12, 16, 24, 32, 48];
export const RAM_OPTIONS: RamGB[] = [16, 24, 32, 48, 64, 96];

function statusFor(input: AdvisorInput): HardwareStatus {
  const { vram, ram, goal, directorLlm } = input;
  const llmTax = directorLlm ? 1 : 0;
  if (vram <= 8 && ram <= 16 && (goal === "short-film" || goal === "long-multi" || directorLlm)) {
    return "crash";
  }
  if (vram <= 8 && goal === "talking" && input.bias === "max") return "crash";
  if (vram <= 10 && ram <= 24 && directorLlm && goal !== "stills") return "tight";
  if (vram <= 8) return goal === "stills" ? "tight" : ram < 32 ? "crash" : "tight";
  if (vram <= 12) {
    if (goal === "short-film" && directorLlm) return "tight";
    if (input.bias === "max") return "tight";
    return ram >= 32 ? "comfortable" : "tight";
  }
  if (vram <= 16) {
    if (input.bias === "max" && (goal === "talking" || goal === "short-film") && ram < 64) return "tight";
    return ram >= 32 ? "comfortable" : "tight";
  }
  if (vram >= 24 && ram >= 32) {
    if (llmTax && ram < 32) return "tight";
    return "comfortable";
  }
  return ram >= 32 ? "comfortable" : "tight";
}

export function advise(input: AdvisorInput): AdvisorResult {
  const { vram, ram, gpu, goal, bias, directorLlm } = input;
  const status = statusFor(input);
  const solOk = gpu >= 40;
  const dlssOk = gpu >= 40;
  const pruned = vram < 24 || bias === "safe" || ram < 64;
  const wantFull = !pruned && bias === "max" && vram >= 24 && ram >= 64;
  const talking = goal === "talking" || goal === "short-film";
  const music = goal === "music-video";

  const video = (() => {
    if (goal === "stills") return "None required — unload video before stills on ≤12 GB.";
    if (vram <= 8) {
      return talking
        ? "H3 Pruned 20B + Turbo, 5–8 s, almost no refs — or skip H3 and board in Flux. Fused 4-Step is a draft, not a miracle."
        : music
          ? "LTX-2.5 NVFP4 or Distilled at 0.4 MP, short windows. Enable Wan 2.1 in Settings only if that still OOMs."
          : "Enable Wan 2.1 / 2.2 in Settings, 480p, short clips. No Full 33B. No LTX 2 MP. Skip long Viggle windows.";
    }
    if (vram <= 12) {
      return talking
        ? "H3 Omni Pruned 20B, careful 768-class, 2 refs max. Viggle: short control windows."
        : "H3 Pruned or LTX-2.5 Distilled at 0.4–1 MP. Fused 4-Step for drafts. Not Full 33B.";
    }
    if (vram <= 16) {
      return wantFull
        ? "Tempting, but Full 33B is still tight. Stay Pruned; use LTX-2.5 Distilled for length."
        : talking
          ? "H3 Omni Pruned comfortably. First / Last Pruned for Seamless Director. Viggle is legal if control windows stay bounded."
          : "LTX-2.5 Distilled or LTX-2.3 long-form. H3 Pruned for hero vocal shots.";
    }
    if (wantFull) {
      return talking
        ? "H3 Omni Full 33B for hero close-ups. Keep a Pruned / Fused recipe for coverage. Qwen3.8 27B will not sit beside Full."
        : "Full 33B only on hero shots. LTX-2.5 Distilled/Dev for the rest of the cut.";
    }
    return talking
      ? "H3 Omni Pruned as default; Full 33B only if faces actually improve. Fused 4-Step for animatics."
      : "LTX-2.5 Distilled for music / long seamless. H3 Pruned for dialogue inserts.";
  })();

  const image = (() => {
    if (vram <= 8) return "Flux 2 Klein 9B or Krea Turbo. Unload video first.";
    if (goal === "stills") return vram >= 16 ? "Krea 2 RAW / Identity Edit. 21:9 is available." : "Flux Klein + Krea Turbo, Identity if it fits.";
    if (vram <= 12) return "Flux Klein start frames. Skip Identity Edit while video is resident.";
    return "Flux Klein for volume; Krea Identity Edit for the faces Director and Characters must hold.";
  })();

  const audio = (() => {
    if (goal === "stills") return "None.";
    if (vram <= 8) return "YuE2 3B is the light music default. Not Music3 at 5 minutes. TTS is fine. Do not train My music.";
    if (music) {
      if (vram >= 24 && ram >= 48 && bias === "max") {
        return "YuE2 3B for daily songs. My music training is the 24 GB experiment — reconstruction ≠ a singer clone. Music3 at 90–120 s if you already like that writer.";
      }
      return ram >= 32 && vram >= 12
        ? "YuE2 3B first (48 kHz, noncommercial weights). Music3 or ACE-Step XL remain as alternatives."
        : "YuE2 3B or ACE-Step Turbo. Postpone long Music3 and My music training.";
    }
    if (talking) return "H3 native audio. TTS (Kugelaudio / Qwen3) or H3 Voice Audio as a voice ref. MMAudio only if you chose a silent model (Wan, Viggle).";
    return "YuE2 3B for beds. MMAudio for silent Wan/Hunyuan/Viggle picture.";
  })();

  const resolution = (() => {
    if (vram <= 8) return "480p / 0.4 MP / Match output draft. Never 2K-class.";
    if (vram <= 12) return "Careful 768-class or 0.4–1 MP. 1080p will often not even be listed.";
    if (vram <= 16) return "768-class or 1 MP daily. Step up one notch only on keepers.";
    if (vram >= 24 && bias === "max") return "Where the model allows: 1440 short-edge (H3) or 2 MP (LTX). Prove the take smaller first.";
    return "Match output / 1 MP. Higher only after a good take.";
  })();

  const window = (() => {
    if (vram <= 8) return "5–8 s, one window. H3 14.4 s ceiling is theoretical here. Duration Auto is still a plan, not one illegal pass.";
    if (vram <= 12) return talking ? "8–10 s H3 native. Do not multi-window yet. Short Viggle control clips." : "Short LTX windows, locked if VRAM spikes.";
    if (goal === "long-multi" || goal === "music-video" || goal === "short-film") {
      return vram >= 16
        ? "Native ceiling first (H3 ~14.4 s / LTX auto-grow), then add windows with ~1 s overlap. Duration Auto estimates story length — it does not stretch one H3 pass."
        : "Keep each pass well under the ceiling.";
    }
    return "One native window. Multi-window only when the story needs it.";
  })();

  const multiWindow =
    vram <= 12 && (goal === "stills" || goal === "talking")
      ? "No — concatenate later, or board more shots."
      : vram <= 12
        ? "Only with locked short windows and Auto-Tune on."
        : "Yes, with an AI plan per window. Director will print H3 clip counts after planning.";

  const accel = (() => {
    const turbo = vram < 24 || bias !== "max" ? "Turbo LoRA on for drafts. Fused 4-Step is the next-faster experimental." : "Turbo off for hero takes. Skip Fused on keepers.";
    const sol = solOk
      ? bias === "safe"
        ? "Sol Engine off (experimental)."
        : "Sol Engine is legal on this RTX 40/50 — A/B it, do not start there."
      : "Sol Engine is not for RTX 30. Ignore it.";
    const cache = bias === "safe" ? "First Block Cache off." : "First Block Cache only on locked-off wides.";
    const temporal = dlssOk
      ? gpu >= 50
        ? "RIFE 4.26 ×2 is the safe interpolate. DLSS Frame Generation is available on this 40/50 card (×5 on 50-series) — A/B faces."
        : "RIFE 4.26 ×2 is the safe interpolate. DLSS Frame Generation is legal on RTX 40 — not a performance default."
      : "RIFE 4.26 ×2 if you need extra frames. No DLSS on RTX 30.";
    return `${turbo} ${sol} ${cache} ${temporal}`;
  })();

  const loras =
    vram <= 12
      ? "Zero or one. Stay in the printed recommended range. No multi-packs. Character RefMods count as identity, not as a free LoRA slot."
      : vram <= 16
        ? "One character or one style. Recommended weights from the CivitAI guide, not 1.0 by habit."
        : "Two if they do not fight. Still drop LoRAs before resolution on OOM.";

  const oomOrder = [
    "Force-unload the local LLM (Gemma 4 unloads after idle — don't wait if you are already in the red). Qwen3.8 27B is not a roommate of Full 33B.",
    "Strip extra LoRAs and Character packs you are not using in this pass.",
    "Drop video refs, then extra stills. Keep one identity frame.",
    "Lower resolution / megapixels.",
    "Shorten the native window or the Viggle control clip; lock LTX so it cannot auto-grow.",
    "Disable First Block Cache, Sol Engine, PAI/PDD, and DLSS Frame Generation if the crash is nondeterministic.",
    "Pruned 20B instead of Full 33B; Distilled / NVFP4 instead of LTX Dev; skip Fused if it is the unstable one.",
    "Do not run Music3 long songs or My music training concurrently with video. YuE2 generate is the light music default.",
  ];

  const ramWarnings: string[] = [];
  if (ram <= 24) {
    ramWarnings.push("16–24 GB RAM: no Full 33B, no 5-minute Music3, no My music training, no Director planning stacked on a live video model.");
  }
  if (wantFull || (bias === "max" && vram >= 24)) {
    ramWarnings.push("Full 33B weights plus activations spill to system RAM. 64 GB is the calm number; 32 GB will swap. Do not also load Qwen3.8 27B.");
  }
  if (music && ram < 64) {
    ramWarnings.push("YuE2 generate is the light default. Music3 long songs and My music training are RAM/VRAM taxes — 2-minute YuE2 is safer than 5-minute Music3 on 32 GB.");
  }
  if (vram >= 24 && music && bias !== "safe") {
    ramWarnings.push("My music (Experimental) wants ~20 GB+ VRAM, proven around 24 GB. It is a style adapter, not a singer clone.");
  }
  if (directorLlm) {
    ramWarnings.push(
      "Director + local LLM: Gemma 4 (~5 GB) is the default and auto-unloads after idle so video can take the GPU back. Planning still occupies the GPU. Qwen3.8 27B will not coexist with H3 Full.",
    );
  }
  if (vram <= 16 && talking) {
    ramWarnings.push("Viggle Animate is memory-sensitive on long control windows. Trim first. v2.1.6 bounded copies — still not an 8 GB dance.");
  }
  if (ram >= 64 && vram >= 24) {
    ramWarnings.push("64 GB+ RAM and 24 GB+ VRAM: this is the Full 33B / Music3 / My music / Director-comfortable band — still respect Auto-Tune.");
  }

  const solNote = solOk
    ? "RTX 40/50: Sol Engine is optional sparse attention. DLSS Frame Generation (and ×5 on 50-series) is a temporal finish, not extra acting. Pinokio may have built env-sol. Treat both as experiments, not defaults."
    : "RTX 30: no Sol Engine, no DLSS Frame Generation. RIFE 4.26 is the interpolation path. Sage/Flash wheels may still help; otherwise SDPA. Auto-Tune's VRAM safety coefficient matters more than any sparse-attention brand name.";

  const autoTune =
    "Performance Auto-Tune already picked a profile, quantization, VAE tiling, and VRAM safety coefficient on first launch. This advisor is a map, not a guarantee. LoRAs, refs, resolution, Viggle windows, DLSS, and a still-resident LLM all move the ceiling. If you OOM, apply the banner's one-click headroom drop before you start editing JSON.";

  const beginner: Recipe = {
    name: "Beginner Safe",
    video:
      vram <= 8
        ? "Enable Wan 2.1 at 480p in Settings, or skip video and board in Flux."
        : "H3 Pruned 20B + Turbo, or LTX-2.5 Distilled at 0.4 MP. Fused 4-Step only as a draft.",
    image: "Flux 2 Klein 9B. One start frame.",
    audio: music ? "YuE2 3B, ≤120 s ceiling." : "H3 native. No Music3, no My music training.",
    resolution: vram <= 12 ? "Lowest listed draft." : "768-class / 0.4 MP.",
    window: "One short window. Duration Auto on. No Seamless yet.",
    accel: "Turbo on. Sol off. Cache off. DLSS off. Auto-Tune on.",
    notes: "Unload LLM. One LoRA max. Cancel at the first bad second.",
  };

  const maxQuality: Recipe = {
    name: "Max Quality",
    video: wantFull
      ? "H3 Omni Full 33B hero shots; LTX-2.5 Distilled/Dev for coverage and length. Never Full + Qwen3.8 27B."
      : vram >= 16
        ? "H3 Omni Pruned at native window; LTX-2.5 Distilled at 1 MP for long-form."
        : "There is no max-quality Full 33B on this card. Pruned + careful 768-class is the ceiling.",
    image: "Krea Identity Edit start frames, aspect-matched to the video. Save a Character.",
    audio: music
      ? ram >= 32
        ? vram >= 24
          ? "YuE2 3B for the song. My music training only if you accept experimental. Exact soundtrack segments in Director."
          : "YuE2 3B at a 2 min ceiling, or ACE-Step XL. Exact soundtrack segments in Director."
        : "YuE2 3B. Not 5-minute Music3."
      : "H3 native 32 kHz stereo. Enhance now, then Generate.",
    resolution: vram >= 24 && bias === "max" ? "Step up only on the keeper. 1440 short-edge / 2 MP is a choice, not a default." : "Stay at the comfortable draft; Finish → Upscale after.",
    window: "Native ceiling, then Seamless with an AI plan. Director prints H3 clip counts. Cut Speed −2 packs cues.",
    accel: solOk && vram >= 24 ? "Turbo off on hero. Sol A/B. Cache off on faces. RIFE ×2 after the take is good." : "Turbo off on hero. Sol off. Cache off.",
    notes: "LLM unloads before generate. Two refs that agree. Read the enhanced prompt.",
  };

  const headline = (() => {
    if (status === "crash") return "This combination will likely crash if you chase defaults.";
    if (status === "tight") return "Workable if you stay inside the safe recipe. Defaults may OOM.";
    return "Comfortable, as long as LoRAs, refs, and a resident LLM do not stack.";
  })();

  return {
    status,
    headline,
    video,
    image,
    audio,
    resolution,
    window,
    multiWindow,
    accel,
    loras,
    oomOrder,
    ramWarnings,
    solNote,
    autoTune,
    beginner,
    maxQuality,
  };
}

export const DEFAULT_ADVISOR: AdvisorInput = {
  vram: 12,
  ram: 32,
  gpu: 40,
  goal: "talking",
  bias: "balanced",
  directorLlm: true,
};
