# Maestro UI map (v3.2.5)

Names and locations only. Do not paste the model catalog into a later run.
Read this file, then `docs/update-to-latest-maestro.md`, then only the release
notes **after** the site’s `fromVersion`.

Verified 27 Oct 2026 against the local Pinokio clone at v3.2.5 and the running
app (title `🐴 Maestro`, header `v3.2.5`). This machine’s Enabled Models count
was **37/207**. That count is saved visibility, not the fresh curated set.

## Handbook removal rule

Drop a handbook card or control when the live app no longer shows it, or when
a newer model took the same job and the old one is not a curated default.
One FAQ line if people will search the old name. Keep a model that is still
registered and still a curated default, even if a sibling shipped later.

## Where the facts live (Maestro repo)

| Fact | Path |
| --- | --- |
| Version string | `VERSION` (no matching git tag; `v3.2.5` is the file) |
| Release notes after the site’s 2.2.0 | See the version index below. Do not stop at `RELEASE_NOTES_V3.2.5.md`. |
| Curated on/off set | `ui/src/stores/useStore.ts` → `DEFAULT_ENABLED_MODELS`, `DEFAULTS_VERSION` (23) |
| Per-workflow first click | `ui/src/lib/modelVisibility.ts` → `DEFAULT_MODELS_BY_SCOPE` |
| Director video default | `useStore.ts` → `DEFAULT_DIRECTOR_VIDEO_MODEL` = `minimax_h3_ref2va_fused_turbo` |
| Music default | `useStore.ts` → `DEFAULT_MUSIC_MODEL` = `yue2` |
| Header cores | `ui/src/components/AppModeNavigation.tsx` |
| Video sidecar | `ui/src/components/Sidebar/VideoWorkflowSelector.tsx` |
| Image sidecar | `ui/src/components/Sidebar/ImageWorkflowSelector.tsx` |
| Audio sidecar | `ui/src/components/Sidebar/AudioSubModeToggle.tsx` |
| Director skills | `ui/src/components/Sidebar/DirectorChat.tsx` → `SkillSelector` |
| Settings tabs | `ui/src/components/SettingsDrawer/SettingsDrawer.tsx` |
| Settings sections | `SystemSettingsPanel.tsx`, `ServicesSettingsPanel.tsx`, `NotificationSettingsPanel.tsx` |
| Editor shell | `ui/src/editor/` (`EditorTopBar`, `EditorLeftPanel`, `EditorInspector`) |

Clone on this machine: `%USERPROFILE%\pinokio\api\Maestro.git`, remote
`https://github.com/Blizaine/Maestro.git`, branch `main`.

## Version index (2.2.0 → 3.2.5)

Changelog headings are the full list. Several patches have no file of their own.

| Version | Where it is written | Handbook weight |
| --- | --- | --- |
| 2.2.1–2.2.4 | Top of `docs/RELEASE_NOTES_V2.2.0.md`, and `CHANGELOG.md`. No `RELEASE_NOTES_V2.2.1.md`. | Prompt-review buttons. Not new models. |
| 2.3.0 | `docs/RELEASE_NOTES_V2.3.0.md` | Qwen Image 2.1, My Music Auto/Guided, music LoRAs, 30s H3 experiment |
| 2.4.0 | `docs/RELEASE_NOTES_V2.4.0.md` | Gallery viewer, Singularity, fidelity repair |
| 2.4.1 | `docs/RELEASE_NOTES_V2.4.1.md` | Qwen edit/2K/turbo adapters, Media Info |
| 2.4.2 | `docs/RELEASE_NOTES_V2.4.2.md` | Gallery audio trim, Krea likeness controls |
| 2.5.0 | `docs/RELEASE_NOTES_V2.5.0.md` | LoRA titles, Win10 frame generation |
| 2.6.0 | `docs/RELEASE_NOTES_V2.6.0.md` | Generation preview, Avatar, checkpoint import, duration modes |
| 2.7.0 | `docs/RELEASE_NOTES_V2.7.0.md` | Renamed to 3.0.0. Do not document 2.7.0. |
| 3.0.0 | `docs/RELEASE_NOTES_V3.0.0.md` | Per-workflow model picker, Flux 3, Fish, Qwen Turbo, Auto duration |
| 3.1.0 | `docs/RELEASE_NOTES_V3.1.0.md` | MOSS Image, Flux 3 LoRAs |
| 3.2.0 | `docs/RELEASE_NOTES_V3.2.0.md` | FastH3 V2 and OmniRef |
| 3.2.5 | `docs/RELEASE_NOTES_V3.2.5.md` | Fish Small, Fish Auto length, speech writer. Same 23–24 Oct fixes also appear at the top of the 3.2.0 notes. |

Companion guides (`Fish-Drama-3.md`, `Studio-controls.md`, `H3-checkpoint-import.md`, `VALIDATION_*.md`) explain a release. They are not extra versions. Open one only when a gap item needs the control name.

## Header

Cores, left to right: **Director · Studio · Editor**. Same control in every core.

Also in the header: Settings (gear), Generation Queue, workspace/folder
controls, gallery filters **All / Images / Videos / Audio / Edits / Multi-clip /
Favorites**. Version sits on the wordmark (`v` + `systemConfig.app_version`).

## Studio sidecar

Media switch: **Video · Image · Audio**.

Video groups:

| Group | Items |
| --- | --- |
| Create | Frames · References · **Avatar** · Extend · Blend |
| Transform | Animate · Retake · Prompt Edit · Outpaint · Repaint · Recast |
| Finish | Upscale · Film Grain |

Image groups: Create **Generate** · Transform **Inpaint · Outpaint** · Finish **Upscale**.

Audio groups: Create **Speech · Music · Sound Effects** · Process **Mixer · Revoice**.

Legacy labels only when an old project is loaded: **Multi-Shot (Legacy)**,
**Inpaint (Legacy)**. They are not sidecar items.

**Manage models** opens from every model picker. Visibility is per workflow.
**Reset** restores that workflow’s defaults and does not delete files.
Downloads are shared across workflows.

Workflow defaults (fresh / reset):

| Workflow | Shown by default |
| --- | --- |
| Frames | H3 Pruned, H3 Fused 4-Step, LTX-2.5 Distilled |
| References | H3 Pruned Ref2VA, H3 Fused 4-Step Ref2VA |
| Avatar | LongCat Single, LongCat Multi |
| Extend, Blend | The Frames set plus the References set |
| Other video workflows, Image, Audio | The curated set in `DEFAULT_ENABLED_MODELS` |

LTX-2.3 stays available for Retake, Prompt Edit, and Outpaint. It is not a
Frames first click.

## Director

Skills: **Music Video** (live), **Short Film** (live), **Video Podcast**
(Coming Soon), **Viral Video** (Coming Soon).

New projects prefer **H3 Fused 4-Step References** when that model is enabled.
Music default is still **YuE2**. **Use lyrics to guide visuals** is off on new
projects. Cut speed and max clip length still exist; Auto follows the same
duration policy as Studio.

Gallery **Load Settings** pencil: one clip opens in Studio; the joined film
reopens the Director project. Finished runs have **Show clips**, **Edit
Director shots**, **Rejoin**. Editor → Media → Director → **Add run** imports
shots plus soundtrack.

FastH3 / OmniRef are rejected on the Director route. Do not put them in the
Director video picker.

## Editor

Timeline explainer, not a full NLE. Left rail: **Media** and the inspector.
Top bar: project name, canvas presets, undo/redo, save, **Export**.

Inspector AI round-trip on a selected clip (live labels): Retake, **Edit
Anything**, Recast, Repaint, Outpaint, Upscale, Film Grain, Revoice.
Studio calls the same job **Prompt Edit**. Editor still says **Edit Anything**.

## Settings (global — same in every core)

Tabs only: **Performance · Integrations · Notifications**.

Performance sections: Appearance, Storage Manager (opens its own screen),
Enabled Models (grouped Video / Image / Audio, then workflow), Performance,
RAM / VRAM Management, Profiles, Output Codecs, Generation Preview
(Fast Frames / Clearer Frames / Live Video / Off).

Integrations sections: LLM Configuration (includes LM Studio load/unload),
Prompt Enhancement (fidelity repair attempts, generate-even-if-checks-fail),
Content Settings (Mature), Director Architecture, FlashVSR Upscaling, API Keys,
Beta Features.

Notifications: its own tab.

There is no Appearance tab, Storage tab, or Enabled Models tab.

## Curated families worth a card

On for a fresh install (ids in `DEFAULT_ENABLED_MODELS`): Flux 2 Klein 9B,
Flux 3 Klein, MOSS Image SFT, Qwen Image 2.1 and its Turbo, Krea 2 RAW / Turbo
/ both Identity Edits, H3 Pruned + Full, H3 Ref2VA Pruned + Fused 4-Step,
H3 Fused 4-Step Frames, H3 Voice Audio, LongCat Avatar single + multi,
LTX-2.3 Distilled 1.1, LTX-2.5 Distilled, SCAIL-2 + Fast + Recast Fast,
Viggle Animate, Kugelaudio, Qwen3 TTS (base / custom / design), ACE-Step XL
family, MiniMax-Music3, YuE2, MMAudio v2.

First click is narrower than that list. See the workflow table. Music first
click remains YuE2. Image Generate on this machine was sitting on Flux 2 Klein.

Opt-in, no beginner card: Fish Drama 3 and Fish Drama 3 Small, FastH3 V2,
FastH3 OmniRef (and the NVFP4 variant), MOSS Image Base, Qwen 2.1 Turbo is
enabled once but not selected, Singularity, Wan, Hunyuan, Z-Image, HiDream.
Fish and FastH3 are the new speech/video opt-ins since 2.2.0.

## Site pins

Handbook teaches v3.2.5. Pins: `src/data/overview.ts`, `hero.tsx`,
`film-nav.tsx`, `src/routes/__root.tsx`, `README.md`, persist key
`maestro-console-v325` in `src/store/console-store.ts`. Director’s new-project
video model is `h3-fused-omni`. Enabled Models lives under Settings →
Performance.
