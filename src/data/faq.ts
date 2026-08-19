export const RULES = [
  {
    n: "01",
    title: "Pruned is the default.",
    body: "H3 Pruned 20B is the recommended checkpoint. Full 33B is a hero-take option on 24 GB+ VRAM and 64 GB RAM. If you cannot see the difference at draft resolution, you wasted the wait.",
  },
  {
    n: "02",
    title: "H3 thinks in 14.4 seconds.",
    body: "345 frames at 24 fps is the native window. Longer stories are more windows, not a longer pass. Director prints clip counts after planning so a 40 s scene is not queued as one illegal job.",
  },
  {
    n: "03",
    title: "Audio is either born here or added later.",
    body: "H3 and LTX-2.5 write 32 kHz (H3) / synced audio with the picture. Wan, Hunyuan, and most LTX-2.3 jobs do not. Do not run MMAudio on a clip whose native bed you already like.",
  },
  {
    n: "04",
    title: "If a resolution vanished, it was never on that model.",
    body: "1080p is not a universal size. H3's heavy path is a 1440 short edge. LTX is megapixel-based. Wan is often 480p / 720p. Auto-Tune will hide what the checkpoint cannot do.",
  },
  {
    n: "05",
    title: "Start frames are cheaper than identity panic.",
    body: "Lock the face in Flux Klein or Krea Identity Edit, then give that still to First / Last or as an Omni identity ref. Prompt-only Director is legal; continuity is not guaranteed.",
  },
  {
    n: "06",
    title: "Unload the LLM before you generate picture.",
    body: "Gemma 4 4B unloads after 60 s idle. Don't wait if VRAM is already tight. Director planning and video generation are sequential jobs, not roommates.",
  },
  {
    n: "07",
    title: "Turbo, Sol, Cache — in that order of trust.",
    body: "Turbo LoRA is the daily H3 draft tool (4 / 6 / 8). Sol Engine is RTX 40/50 experimental. First Block Cache is a sticky-motion risk on faces. Turn them off before you rewrite the prompt.",
  },
  {
    n: "08",
    title: "One LoRA, recommended weight.",
    body: "The CivitAI guide is printed on the slider for a reason. Two character adapters at 0.9 each is how faces collapse. LTX-2.3 and Wan are the LoRA-rich families; H3 is not.",
  },
  {
    n: "09",
    title: "OOM: strip, then shrink, then demote.",
    body: "Unload LLM → drop LoRAs → drop refs → lower resolution → shorten window → disable Sol / Cache → Pruned instead of Full. The recovery banner's headroom drop is the first click, not a shame.",
  },
  {
    n: "10",
    title: "Studio is a camera. Director is a producer.",
    body: "Studio: you own every knob. Director: the local LLM owns the plan; you own the locks (aspect, model, soundtrack) and the Manual edits. Setup locks after planning on purpose.",
  },
];

export const FAQ = [
  {
    q: "Why can't I have a 40-second H3 clip?",
    a: "Because the native window is ~14.4 s (345 frames at 24 fps). Multi-window continuation, Video Extend (keeps the audiovisual tail), or Director's H3-aware clip split are the ways through. A 40 s duration field is a plan, not a single forward pass.",
  },
  {
    q: "Why did 1080p disappear when I changed models?",
    a: "That checkpoint never offered it. H3 lists Match Output, draft sizes, and a heavy 1440-short-edge class — not a generic HD menu. LTX lists megapixels. Wan lists 480p / 720p more often than 1080p. The picker is honest.",
  },
  {
    q: "Studio or Director?",
    a: "Studio when you already know the shot. Director when you have a track or a premise and need a plan: music video (beat-aware) or short film (screenplay). You can still re-run a single Director clip by hand.",
  },
  {
    q: "Music3 or ACE-Step?",
    a: "Music3 writes complete stereo songs, 5 s–5 min, two-minute default, duration-aware lyrics — and it is a Director soundtrack option. ACE-Step XL is the quality ACE path; Turbo is the sketch. If you already have a master, use existing track and skip both.",
  },
  {
    q: "What did v1.8.7.1 actually change?",
    a: "MiniMax-Music3 GPU compatibility. On Windows, FlashAttention could import and then crash because the wheel had no kernel for that GPU. 1.8.7.1 validates the wheel against the live architecture and falls back to SDPA. It also removes the bad wheel from affected legacy Windows runtimes. Creative controls did not change.",
  },
  {
    q: "When is Full 33B a waste?",
    a: "On 6–16 GB VRAM. On 8 s Turbo drafts. On any shot you will retake. On stills. On coverage. On a card that is also holding Gemma. Use Full when the face and the line are the product, the card is 24 GB+, and RAM is 64 GB-class.",
  },
  {
    q: "Does Auto-Tune replace this advisor?",
    a: "No. Auto-Tune picks profile, quantization, VAE tiling, and a VRAM safety coefficient from the live GPU. This page is a starting map. LoRAs, refs, resolution, and a still-resident LLM all move the ceiling.",
  },
];
