export const TRANSFORM_TOOLS = [
  {
    id: "animate",
    name: "Animate",
    where: "Video → Transform",
    blurb: "Viggle. Drive a character still (or an edited frame) with a control video. Optional Flux Klein prep replaces the person using a saved Character and appearance notes.",
    when: "You have a dance, walk, or body performance and a face/body you want on it.",
    cost: "Needs control video + still. Memory-sensitive on long windows — v2.1.6 bounded that. Not Recast.",
  },
  {
    id: "retake",
    name: "Retake",
    where: "Video → Transform",
    blurb: "Re-roll a section of an existing video with a new prompt. Timing and surrounding frames stay; the beat you hated gets another performance.",
    when: "A line, a glance, or a two-second stumble inside an otherwise good take.",
    cost: "One short generate, not a full clip. Still occupies the video GPU — unload the LLM.",
  },
  {
    id: "prompt-edit",
    name: "Prompt Edit",
    where: "Video → Transform",
    blurb: "Add, remove, or change elements in a finished clip with natural language. Formerly Edit Anything. The rest of the shot tries to hold still.",
    when: "A prop, a sign, a small wardrobe miss. Not a new performance.",
    cost: "Moderate. In-context LoRAs add VRAM.",
  },
  {
    id: "outpaint",
    name: "Outpaint",
    where: "Video or Image → Transform",
    blurb: "Extend the frame in any direction while keeping original action, timing, and audio (video) or the still (image).",
    when: "You shot 4:3 and need 16:9, or the head is too tight for a title card.",
    cost: "Cheaper than regenerating the take. Audio is preserved on video jobs.",
  },
  {
    id: "repaint",
    name: "Repaint",
    where: "Video → Transform",
    blurb: "SCAIL-2 restyle of characters, objects, or the whole scene while the source motion and camera are retained.",
    when: "The blocking is right and the world is wrong — day for night, wardrobe, set dressing.",
    cost: "Heavy relative to Retake. Treat it like a full generate for VRAM.",
  },
  {
    id: "recast",
    name: "Recast",
    where: "Video → Transform",
    blurb: "SCAIL-2 mapping of one or more people onto replacement characters, including multi-shot scenes and group shots.",
    when: "The acting and camera are keepers; the face or body must change across the cut.",
    cost: "Heaviest Transform tool. Group shots multiply identity work. Not a 6 GB job. Not Viggle.",
  },
] as const;

export const EDITOR_FEATURES = [
  {
    name: "Timeline",
    what: "Non-destructive multi-track video, audio, and titles. Trim, split, duplicate, copy/paste, markers, undo/redo, snapping, mute and lock.",
  },
  {
    name: "Canvas",
    what: "21:9 is a first-class Editor canvas. Clip speed, volume, opacity, fades, dissolves, title fonts, draggable transforms, snap guides.",
  },
  {
    name: "Round trip",
    what: "Send a selected clip to the matching Studio workflow. The finished generate returns as a new take at the same timeline position.",
  },
  {
    name: "Director handoff",
    what: "A finished Director production expands into individual shot clips. A music video’s source song lands on its own audio layer.",
  },
  {
    name: "Media",
    what: "Browse every workspace, uploads, and favorites. Repeated identical uploads reuse content instead of duplicating files.",
  },
  {
    name: "Export",
    what: "Project or delivery resolution, configurable frame rate, H.264 / H.265 / AV1, automatic hardware-encoder selection, audio mix. Jobs use the same held/running queue as Studio.",
  },
];
