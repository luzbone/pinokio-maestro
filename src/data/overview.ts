export const OVERVIEW = {
  pinokio:
    "Maestro is typically launched as a Pinokio app. This console stays inside the product.",
  version: "v1.8.7.1 · August 2026 · 100% local NVIDIA studio",
  cores: [
    {
      name: "Studio",
      what: "Manual. You pick the model, the refs, the windows, the LoRAs. Every knob in this replica lives here.",
    },
    {
      name: "Director",
      what: "LLM-planned. One prompt becomes a music video or a short film: analyze → screenplay → shot plan → start frames → clips → polish → assemble.",
    },
    {
      name: "Edit",
      what: "After a take exists: Retake, Edit Anything, Outpaint, Repaint, Recast.",
    },
  ],
  layout: [
    {
      zone: "Sidebar",
      items: [
        "Studio / Director switch",
        "Model family and workflow",
        "Prompt",
        "LoRAs (with recommended weights)",
        "Advanced (Turbo, Sol Engine, First Block Cache, windows)",
        "Workspace switcher",
      ],
    },
    {
      zone: "Main feed",
      items: [
        "Gallery of stills and clips for the active workspace",
        "Queue and current generate",
        "Director dashboard when that core is active",
      ],
    },
    {
      zone: "Settings drawer",
      items: [
        "Model visibility (LTX-2.5 Dev / NVFP4, extra checkpoints)",
        "Performance Auto-Tune and VRAM safety coefficient",
        "Local LLM (Gemma 4 4B default) and external providers",
        "Theme: Golden Hour / Classic / Onyx, Dark / Light / Auto",
        "Mature / NSFW gate (opt-in, disclaimer)",
        "Experimental gate (external keys, Voice Reference, Inpaint, Restyle, Wan2GP Enhancer)",
      ],
    },
  ],
  extras: [
    {
      name: "Workspaces",
      what: "Isolated output directories with a sidebar switcher. Pins and favorites are per workspace. Use them for clients, SFW / Mature, or experiments.",
    },
    {
      name: "Recipes",
      what: "Stored console states — model, prompt, LoRAs, knobs. Replay a known-good setup instead of reconstructing it from memory.",
    },
    {
      name: "CivitAI LoRA browser",
      what: "Search, filter, one-click install, update badges, My LoRAs. AI prompt guides with examples and recommended weights, applied when you select the adapter. Multi-LoRA packs auto-extract.",
    },
    {
      name: "Local LLM auto-unload",
      what: "llama-server plus a GGUF (Gemma 4 4B recommended) load for Director, Prompt Enhance, and LoRA guides, then unload after 60 s idle so the video model can take the GPU back. Larger Gemma / Qwen3.6 27B variants will not sit beside Full 33B.",
    },
  ],
};
