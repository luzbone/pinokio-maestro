export const RULES = [
  {
    n: "01",
    title: "Pruned is the default.",
    body: "H3 Pruned 20B is the recommended checkpoint. Full 33B is a hero-take option on 24 GB+ VRAM and 64 GB RAM. Fused 4-Step is a draft. If you cannot see the difference at 768p, you wasted the wait.",
  },
  {
    n: "02",
    title: "H3 thinks in 14.4 seconds.",
    body: "345 frames at 24 fps is the native window. Longer stories are more windows, not a longer pass. Duration Auto and Director clip counts exist so a 40 s scene is not queued as one illegal job.",
  },
  {
    n: "03",
    title: "Audio is either born here or added later.",
    body: "H3 and LTX-2.5 write audio with the picture. Wan, Hunyuan, Viggle, and most LTX-2.3 jobs do not. Do not run MMAudio on a clip whose native bed you already like.",
  },
  {
    n: "04",
    title: "YuE2 is the song default.",
    body: "v2.2 selects YuE2 3B (48 kHz stereo, noncommercial weights). Music3 and ACE-Step remain. Duration is a ceiling — the song may end earlier. My music training is experimental and wants ~24 GB.",
  },
  {
    n: "05",
    title: "Start frames are cheaper than identity panic.",
    body: "Lock the face in Flux Klein or Krea Identity Edit, save a Character, then give that still to First / Last or Omni. Prompt-only Director is legal; continuity is not guaranteed.",
  },
  {
    n: "06",
    title: "Unload the LLM before you generate picture.",
    body: "Gemma 4 unloads after idle. Don't wait if VRAM is already tight. Qwen3.8 27B will not sit beside Full 33B. Director planning and video generation are sequential jobs, not roommates.",
  },
  {
    n: "07",
    title: "Turbo, PAI, Fused, Sol, Cache — in that order of trust.",
    body: "Turbo LoRA is the daily H3 draft. PAI 8-step / PDD is next. Fused 4-Step is experimental. Sol is RTX 40/50. First Block Cache is a sticky-motion risk on faces. Turn them off before you rewrite the prompt.",
  },
  {
    n: "08",
    title: "Studio makes. Editor finishes.",
    body: "Transform tools (Retake, Prompt Edit, Recast, Viggle) live inside Studio Video. Editor is the timeline: titles, speed, export, and round-trips back to Studio.",
  },
  {
    n: "09",
    title: "OOM: strip, then shrink, then demote.",
    body: "Unload LLM → drop LoRAs → drop refs → lower resolution → shorten window → disable Sol / Cache / DLSS → Pruned instead of Full. The recovery banner's headroom drop is the first click, not a shame.",
  },
  {
    n: "10",
    title: "Studio is a camera. Director is a producer. Editor is a cutter.",
    body: "Studio: you own every knob. Director: the local LLM owns the plan; you own the locks (aspect, model, soundtrack, Cut Speed) and the Manual edits. Editor: you own the join the audience sees.",
  },
];

export const FAQ = [
  {
    q: "What changed in 2.0–2.2?",
    a: "2.0 added Editor and rebuilt Studio into Video / Image / Audio (Multi-Shot became References; Tools went away). 2.1 added Viggle Animate, Characters/RefMod, H3 Voice Audio, Face Refiner, Duration Auto, RIFE/DLSS. 2.2 makes YuE2 the default music model, unifies Enhance (now / on generation), and gives Director Clip length + Cut Speed −2…+2. Queue, Load Settings, and recipes still work.",
  },
  {
    q: "Studio or Editor?",
    a: "Studio when you are making or transforming a shot. Editor when you are cutting a movie: tracks, titles, export. A Director project can open in Editor as separate clips plus the song. Sending an Editor clip to Studio AI returns a new take on the same edit.",
  },
  {
    q: "Frames or References?",
    a: "Frames is text, first/last stills, soundtrack, or control video (H3 First / Last). References is H3 Omni: named people, scenes, motion, voices. They do not mix in one pass. Multi-Shot is a legacy label for old projects.",
  },
  {
    q: "Viggle or Recast?",
    a: "Viggle Animate drives a still with a control video (dance, walk). Recast replaces people inside an existing performance with SCAIL-2 while keeping camera and timing. Different jobs.",
  },
  {
    q: "YuE2, Music3, or ACE-Step?",
    a: "YuE2 3B is the v2.2 default: 48 kHz stereo, Direct generation, optional scores/covers. Weights are noncommercial. Music3 writes 5 s–5 min duration-aware songs. ACE-Step XL is the quality ACE path; Turbo is the sketch. If you already have a master, Upload a track and skip all three.",
  },
  {
    q: "Why can't I have a 40-second H3 clip?",
    a: "Because the native window is ~14.4 s (345 frames at 24 fps). Multi-window continuation, Video Extend (keeps the audiovisual tail), or Director's H3-aware clip split are the ways through. Duration Auto is a plan, not a single forward pass.",
  },
  {
    q: "Why did 1080p disappear when I changed models?",
    a: "That checkpoint never offered it. H3 video is Match Output, native 768p, and a heavy 1440-short-edge — plus a Regenerate 2K workflow. LTX may list megapixels. Wan is often 480p / 720p. The picker is honest.",
  },
  {
    q: "Generate, Add to Queue, or Enhance on generation?",
    a: "Generate starts now. Add to Queue holds the complete job. Enhance on generation rewrites the prompt when that job's turn arrives, then generates — useful while the GPU is busy. Enhance now is the immediate draft for review.",
  },
  {
    q: "When is Full 33B a waste?",
    a: "On 6–16 GB VRAM. On 8 s Turbo or Fused 4-Step drafts. On any shot you will retake. On stills. On coverage. On a card that is also holding Gemma or Qwen3.8. Use Full when the face and the line are the product, the card is 24 GB+, and RAM is 64 GB-class.",
  },
  {
    q: "Does Auto-Tune replace this advisor?",
    a: "No. Auto-Tune picks profile, quantization, VAE tiling, and a VRAM safety coefficient from the live GPU. This page is a starting map. LoRAs, refs, resolution, DLSS, Viggle control windows, and a still-resident LLM all move the ceiling.",
  },
  {
    q: "Where did Edit Anything and Tools go?",
    a: "Edit Anything is Prompt Edit under Video → Transform. Upscale is Video or Image → Finish. Revoice is Audio → Process. Film Grain is a Finish workflow, not only an Advanced slider.",
  },
];
