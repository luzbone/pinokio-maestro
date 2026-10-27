export const RULES = [
  {
    n: "01",
    title: "Pruned is the default.",
    body: "H3 Pruned 20B is the recommended checkpoint. Full 33B is a hero-take option on 24 GB+ VRAM and 64 GB RAM. Fused 4-Step is a draft. If you cannot see the difference at 768p, you wasted the wait.",
  },
  {
    n: "02",
    title: "Auto picks the H3 length.",
    body: "14.4 seconds is the 12 GB / 720p recommendation, not every card. Auto starts nearer 5.2 s on an 8 GB class, and nearer 10.1 s for 720p Fused there. Longer stories are more windows, not one illegal pass.",
  },
  {
    n: "03",
    title: "Audio is either born here or added later.",
    body: "H3 and LTX-2.5 write audio with the picture. Wan, Hunyuan, Viggle, and most LTX-2.3 jobs do not. Do not run MMAudio on a clip whose native bed you already like.",
  },
  {
    n: "04",
    title: "YuE2 is the song default.",
    body: "YuE2 3B is still the first click (48 kHz stereo, noncommercial weights). Music3 and ACE-Step remain. Duration is a ceiling — the song may end earlier. My music training is experimental and wants ~24 GB.",
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
    body: "Turbo LoRA is the daily H3 draft. Fused 4-Step is a Frames first click and no longer labeled Experimental. TaoMate 3-step is an Advanced Frames recipe, not a model card. FastH3 is opt-in and stays off Director. Sol is RTX 40/50.",
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
    q: "What changed through 3.2.5?",
    a: "Avatar (LongCat) joined Video → Create. Frames first click is H3 Pruned, H3 Fused 4-Step, and LTX-2.5. New Director projects prefer H3 Fused 4-Step References. Flux 3 Klein, MOSS Image, and Qwen Image 2.1 are image defaults. Fish and FastH3 are opt-in. Settings tabs are Performance, Integrations, and Notifications. YuE2 is still the song.",
  },
  {
    q: "Studio or Editor?",
    a: "Studio when you are making or transforming a shot. Editor when you are cutting a movie: tracks, titles, export. A Director project can open in Editor as separate clips plus the song. Sending an Editor clip to Studio AI returns a new take on the same edit.",
  },
  {
    q: "Frames or References?",
    a: "Frames is text, first/last stills, soundtrack, or control video. References is H3 Omni: named people, scenes, motion, voices. Avatar is LongCat: one still plus one or two voice tracks. They do not mix in one pass. Multi-Shot is a legacy label for old projects.",
  },
  {
    q: "Viggle or Recast?",
    a: "Viggle Animate drives a still with a control video (dance, walk). Recast replaces people inside an existing performance with SCAIL-2 while keeping camera and timing. Different jobs.",
  },
  {
    q: "YuE2, Music3, or ACE-Step?",
    a: "YuE2 3B is still the default: 48 kHz stereo, Direct generation, optional scores/covers. Weights are noncommercial. Music3 writes 5 s–5 min duration-aware songs. ACE-Step remains, and it is not the first click. If you already have a master, upload the track.",
  },
  {
    q: "Why can't I have a 40-second H3 clip?",
    a: "Auto follows the card. On a 12 GB machine at 720p the recommendation is about 14.4 s (345 frames at 24 fps). Smaller cards start shorter. Multi-window continuation, Video Extend, or Director’s clip split cover the rest. Allow 30s clips is an experimental single pass, not the Auto default.",
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
    a: "In Studio, Edit Anything is Prompt Edit under Video → Transform. The Editor inspector still labels that round-trip Edit Anything. Upscale is Video or Image → Finish. Revoice is Audio → Process. Film Grain is a Finish workflow. Wan 2.1 and the old Qwen Image Edit card are gone from this handbook: use Wan 2.2 if you enable Wan, and Qwen Image 2.1 for still edits. TaoMate is an Advanced Frames accelerator, not a model.",
  },
];
