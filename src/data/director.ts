export type DirectorSkill = "music-video" | "short-film";
export type SoundtrackMode = "existing" | "music3" | "acestep";
export type ReviewMode = "auto" | "manual";

export const DIRECTOR_STAGES = [
  {
    id: "analyze",
    label: "Analyze",
    llm: "Reads the track or the story brief. For music videos: BPM, sections (verse / chorus / bridge), energy, and — if vocals exist — transcription plus diarization so speakers can be named. For short films: the one-line premise is expanded into structure, not shots yet.",
    safeEdit:
      "Correct section labels and speaker names here. A misnamed chorus will make every later cut land on the wrong downbeat. Do not rewrite lyrics in this stage unless the transcription is actually wrong.",
  },
  {
    id: "screenplay",
    label: "Screenplay / lyrics",
    llm: "Pass 1 of Director v2 — optimized for creativity. Short film: named characters, dialogue, continuity. Music video: lyric-aware shot language aligned to the sections already found. Duration-aware if Music3 wrote the song: a 30 s track does not get a 5-minute libretto.",
    safeEdit:
      "This is the best place to change story, character names, and lines. Keep speaker IDs stable — H3 Prompt Enhance and later polish depend on them. After planning locks setup, you can still edit this in Manual review.",
  },
  {
    id: "shot-plan",
    label: "Shot plan",
    llm: "Pass 2 — structured JSON. Beat-aware for music (downbeats, energy). Pacing-bias controls cut frequency. H3 jobs are broken into native durations so a 40 s scene does not appear as one illegal 40 s generate. LTX-2.5 vocal performances become independent lip-sync shots with exact soundtrack segments.",
    safeEdit:
      "Merge or split shots, but respect the model ceiling (H3 ~14.4 s). If you lengthen a shot past native, expect another window, not a longer single pass. Changing the video model after this rebuilds clip timing without re-uploading audio.",
  },
  {
    id: "start-frames",
    label: "Start frames",
    llm: "Image model (Flux Klein, Krea, Identity Edit) paints the first frame of each shot for character continuity. Image model can be None — prompt-only — in which case H3 Omni still receives your character / location / voice refs, and First / Last / Seamless LTX still use a main start image if you uploaded one.",
    safeEdit:
      "Manual mode: swap a single shot's still without regenerating the others. Match aspect to the locked setup. This is cheaper than fixing identity in video.",
  },
  {
    id: "clips",
    label: "Clips",
    llm: "Each shot is a Studio-class generate: H3 First / Last Seamless carries motion and synced audio across windows with a local prompt per pass; H3 Omni conditions on the exact song segment and keeps the pristine soundtrack; LTX-2.5 locks mouths to the vocal stem when available. Turbo / Sol / First Block Cache sit in Director's persistent Advanced menu for H3.",
    safeEdit:
      "Re-run one clip from the dashboard. Do not cancel an assemble to fix a single shot — regenerate that clip, then rejoin.",
  },
  {
    id: "polish",
    label: "Polish",
    llm: "Pass 3 — per-model, LoRA-aware prompt refinement. Injects CivitAI / HuggingFace LoRA guides so the rewrite speaks the adapter's language. Diffs are stored and visible on the dashboard.",
    safeEdit:
      "Read the polish diff before you bless Auto mode. If a LoRA trigger word vanished, put it back here, not in a fourth LLM stacked on the side.",
  },
  {
    id: "assemble",
    label: "Assemble",
    llm: "Stitch clips to the timeline. Music videos keep the original (or generated) song as the spine; H3's per-window audio does not replace it on Omni music jobs. Missing pieces can be repaired and rejoined without a full rerun.",
    safeEdit:
      "If the join is early or late, fix the shot plan's in/out, not the encoder. Resume after refresh is supported — do not start a second project to 'continue'.",
  },
] as const;

export const PACING_LABELS = [
  { value: 0, label: "Held takes" },
  { value: 25, label: "Patient" },
  { value: 50, label: "Neutral" },
  { value: 75, label: "Cutty" },
  { value: 100, label: "Montage" },
];

export type DashboardRun = {
  id: string;
  title: string;
  skill: DirectorSkill;
  model: string;
  duration: string;
  clips: number;
  status: "complete" | "needs-repair" | "paused";
  note: string;
};

export const SAMPLE_RUNS: DashboardRun[] = [
  {
    id: "run-041",
    title: "Harbour radio — night set",
    skill: "short-film",
    model: "H3 First / Last Pruned · Seamless",
    duration: "38 s · 4 native windows",
    clips: 4,
    status: "complete",
    note: "H3-aware plan split a 38 s scene into 14.4 s passes. Start frames from Krea Identity.",
  },
  {
    id: "run-042",
    title: "Gold thread (Music3, 2:00)",
    skill: "music-video",
    model: "LTX-2.5 Distilled + H3 Omni inserts",
    duration: "120 s · 11 shots",
    clips: 11,
    status: "needs-repair",
    note: "Clip 07 lost lip sync. Re-run that vocal shot with the exact stem segment; then rejoin.",
  },
  {
    id: "run-039",
    title: "Kitchen argument, take 2",
    skill: "short-film",
    model: "H3 Omni Pruned",
    duration: "22 s · 2 windows",
    clips: 2,
    status: "paused",
    note: "Paused after refresh. Resume — do not re-analyze. v1.9.0 Load Settings restores this checkpoint.",
  },
];
