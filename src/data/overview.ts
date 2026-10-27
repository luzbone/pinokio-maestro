export const OVERVIEW = {
  pinokio:
    "Maestro is a Pinokio app: a local NVIDIA studio that makes shots, plans films, and finishes them on a timeline. This handbook maps the real console — it does not generate media.",
  version: "v3.2.5 · October 2026 · 100% local NVIDIA studio",
  cores: [
    {
      name: "Studio",
      what: "Make. Video, Image, and Audio. Avatar sits with Frames and References. Transform and Finish live here too — Retake, Viggle, Recast, Upscale, Film Grain.",
    },
    {
      name: "Director",
      what: "Plan. One prompt becomes a music video or a short film. New projects prefer H3 Fused 4-Step References. Finished projects open in Editor as separate shots.",
    },
    {
      name: "Editor",
      what: "Finish. Multi-track timeline: trim, titles, speed, export. Send a clip back to Studio for an AI retake and drop the new take on the same edit.",
    },
  ],
  layout: [
    {
      zone: "Header",
      items: [
        "Director / Studio / Editor switch",
        "Settings: Performance (Appearance, Enabled Models, Storage Manager, Generation Preview), Integrations, Notifications",
        "Gallery filters: All / Images / Videos / Audio / Edits / Multi-clip / Favorites",
        "Search + All folders (browse every workspace without changing where new files land)",
        "Generation Queue badge",
      ],
    },
    {
      zone: "Studio sidecar",
      items: [
        "Video / Image / Audio — Create, Transform, Finish, and Audio Process live in the sidecar",
        "Video Create: Frames · References · Avatar · Extend · Blend",
        "Video Transform: Animate (Viggle) · Retake · Prompt Edit · Outpaint · Repaint · Recast",
        "Video Finish: Upscale · Film Grain",
        "Image: Generate · Inpaint · Outpaint · Upscale",
        "Audio Create: Speech · Music · Sound Effects · Process: Mixer · Revoice",
      ],
    },
    {
      zone: "First launch",
      items: [
        "Models download on first use (often tens of GB). Later runs are fast.",
        "Director needs a local LLM — Gemma 4 (~5 GB) is the default. It unloads after idle.",
        "Mature / NSFW is off. Leave it off unless you opt in under Settings.",
        "Enabled Models is per workflow under Settings → Performance. Frames starts on H3 Pruned, H3 Fused 4-Step, and LTX-2.5. Wan, Hunyuan, Fish, and FastH3 stay off until you enable them.",
      ],
    },
  ],
  extras: [
    {
      name: "You are here",
      what: "Studio makes the shot. Director plans the film. Editor cuts the movie. Transform tools (Retake, Recast, Viggle) sit inside Studio Video — they are not a fourth core.",
    },
    {
      name: "Workspaces",
      what: "Isolated output directories with a sidebar switcher. Pins and favorites are per workspace. Use them for clients, SFW / Mature, or experiments.",
    },
    {
      name: "Generation Queue",
      what: "One global Studio + Director + Editor-export queue. Generate starts now. Add to Queue holds a job. Enhance on generation writes the prompt when the GPU is free. Completed jobs collapse into history (View prompts / Clear completed). Unfinished jobs stay out of the gallery.",
    },
    {
      name: "Director Load Settings",
      what: "Projects are checkpointed before render. Load Settings restores models, references, prompts, plans, and generation options after a restart. Director outputs can open as an Editor timeline.",
    },
    {
      name: "Characters / RefMod",
      what: "Named image + voice (or video) packs, portable as .maestro.safetensors. Subject/Speaker IDs keep face, voice, and dialogue together in Omni, Viggle, and Speech. Do not treat an identity still as a start frame.",
    },
    {
      name: "Recipes + Model Browser",
      what: "Recipes store console state. Model Browser opens from the sidecar. CivitAI LoRA search, recommended weights, and My LoRAs still live in Advanced.",
    },
    {
      name: "Local LLM auto-unload",
      what: "llama-server plus a GGUF (Gemma 4 default) load for Director, Prompt Enhance, and LoRA guides, then unload after idle so the video model can take the GPU back. Qwen3.8 27B is optional and will not sit beside Full 33B.",
    },
  ],
  whatsNew: [
    {
      ver: "3.2.5",
      date: "24 Oct 2026",
      points: [
        "Fish Drama 3 Small, Fish Auto length, and saved speech-writer instructions. Full Fish stays available. Enable Fish under Performance → Enabled Models.",
        "One imported H3 checkpoint can show in both Frames and References when the file supports both.",
      ],
    },
    {
      ver: "3.2.0",
      date: "22 Oct 2026",
      points: [
        "FastH3 V2 (Frames text-to-video) and FastH3 OmniRef (needs a reference). Experimental, opt-in, and rejected on the Director route.",
      ],
    },
    {
      ver: "3.1.0",
      date: "19 Oct 2026",
      points: [
        "MOSS Image 5B SFT joins Image → Generate for captions and layout. Base stays behind Manage models. No reference images.",
      ],
    },
    {
      ver: "3.0.0",
      date: "18 Oct 2026",
      points: [
        "Manage models is per workflow. Frames defaults: H3 Pruned, H3 Fused 4-Step, LTX-2.5 Distilled. References defaults: H3 Ref2VA Pruned and Fused. Avatar defaults: both LongCat models.",
        "Flux 3 Klein and Qwen Image 2.1 Turbo. Fish Drama 3 speech. Fused labels drop the word Experimental.",
        "New Director projects prefer H3 Fused 4-Step References. Use lyrics to guide visuals is off until you turn it on.",
        "Duration Auto follows the machine. About 5.2 s on an 8 GB class, about 10.1 s for 720p Fused there, about 14.4 s for 720p Fused or Pruned on 12 GB.",
      ],
    },
    {
      ver: "2.6.0",
      date: "4 Oct 2026",
      points: [
        "Video → Avatar for LongCat. Generation Preview (Fast Frames, Clearer Frames, Live Video) under Performance.",
        "Duration modes: Auto, Time, and Window. H3 checkpoint import from the Model Browser.",
      ],
    },
    {
      ver: "2.3.0–2.5.0",
      date: "20–28 Sep 2026",
      points: [
        "Qwen Image 2.1 becomes a real image model (later a curated default). Krea Identity gets Subject and Scene likeness.",
        "Gallery can send a clip or still into the open sidecar, with a trim on audio. My Music gains Auto and Guided training.",
        "Enhance review, from the 2.2.4 patch: Generate all N windows with this draft, Retry window N & generate, Edit prompts in Studio, Other options.",
      ],
    },
    {
      ver: "2.2.0",
      date: "16 Sep 2026",
      points: [
        "YuE2 3B becomes the default music model (48 kHz stereo). Music3 and ACE-Step remain available.",
        "My music (Experimental): train a personal YuE2 style adapter on ~24 GB VRAM. Not a reliable singer clone.",
        "One adaptive Enhance writer: Enhance now, Enhance on generation, optional Use by default.",
        "Director music videos: Clip length, GPU clip limit, Cut Speed −2…+2 (−2 = fewest clips on musical cues).",
        "All-folders gallery search. 21:9 stills. TaoMate optional 3-step H3 Frames adapter.",
      ],
    },
    {
      ver: "2.1.x",
      date: "8–11 Sep 2026",
      points: [
        "Viggle Animate: control video + edited frame. v2.1.6 cut Viggle memory and sped the path.",
        "Save and share characters (RefMod). H3 Voice Audio for long dialogue with SFX.",
        "H3 Face Refiner. Compact Studio chrome: Duration Auto, Recipes, Model Browser.",
        "RIFE ×3 and DLSS Frame Generation. Portable .maestro.safetensors characters.",
      ],
    },
    {
      ver: "2.0.x",
      date: "3–4 Sep 2026",
      points: [
        "Editor becomes the third header core: multi-track timeline, titles, hardware export.",
        "Studio reorganized to Video / Image / Audio. Multi-Shot becomes References. Tools drawer goes away.",
        "H3 768p, 21:9, Regenerate 2K, Fused 4-Step experimental, Alibaba PAI 8-step / PDD.",
        "Long-form Auto duration up to 60 minutes. Character library. Qwen3.8 27B optional LLM.",
      ],
    },
  ],
  firstMinutes: [
    "Install Maestro from Pinokio and wait for the welcome screen.",
    "Leave Mature off. Keep Auto-Tune on.",
    "Studio → Video → Frames. H3 First / Last Pruned (or LTX-2.5 Distilled if VRAM is tight).",
    "One short prompt, Duration Auto, Generate. The first model download is the long wait.",
    "Studio → Audio → Music. YuE2 3B, lyrics with [Verse]/[Chorus], Direct generation.",
    "Editor: drop the clip and the song, trim, Export. That is a complete first movie.",
  ],
};
