# Update this site to the latest Maestro

Playbook for any coding agent. **Read this file first. Do not re-explore the whole repo or dump Maestro’s 200+ model list into context.**

This handbook tracks one Maestro release. The job is: find what shipped after the version already on the site, then update copy, the teaching replica, and screenshots so a newcomer can match the live app.

User prompt that should trigger this file:

> Follow `docs/update-to-latest-maestro.md`. Update this site to the latest Maestro.

Add `Stop after the gap list` if they want to review before you edit.

---

## 0. What this site is (do not drift)

- Teaching replica of [Blizaine/Maestro](https://github.com/Blizaine/Maestro) (Pinokio app). Live handbook: [maestro.luzbone.com](https://maestro.luzbone.com/).
- **Does not generate** video, audio, or images. Generate / Queue / Plan / Export toast and stop.
- Look is **Golden Hour** (handbook), not Maestro’s Onyx/orange skin. Do not restyle unless asked.
- Three header cores: **Studio** (make + Transform/Finish) · **Director** (plan) · **Editor** (timeline, not a full NLE sim).
- Catalog **defaults + newcomer picks**, not every checkpoint. Opt-in models stay on the site only if they still exist and people will search for them — quieter than defaults (`pro`, no `beginner`, no `typical: true`).
- Do not commit, push, or deploy unless asked.

---

## 1. Cheap research (stop when the gap list is enough)

Work **since the version already documented**, not from Maestro 1.0.

### 1.1 What the site thinks “current” is

Read, do not grep the whole tree first:

| Site pin | File |
| --- | --- |
| Version string | `src/data/overview.ts` → `OVERVIEW.version` and `whatsNew[0]` |
| Hero / nav / meta | `src/components/hero.tsx`, `src/components/film-nav.tsx`, `src/routes/__root.tsx`, `README.md` |
| Persist key | `src/store/console-store.ts` → `name: "maestro-console-v…"` |

Call that **fromVersion**.

### 1.2 What Maestro actually shipped

Use the first source that works. Do not open all of them.

1. **Local Pinokio clone** (fastest): `%USERPROFILE%\pinokio\api\Maestro.git` or `~/pinokio/api/Maestro.git`
   - `VERSION` / `CHANGELOG.md` / `docs/RELEASE_NOTES_V*.md`
   - `ui/src/stores/useStore.ts` → `DEFAULT_ENABLED_MODELS` only (not the rest of the 13k-line store)
2. Else **GitHub** `Blizaine/Maestro` — same files on `main` / latest tag.
3. **Live app** if it is running (often `http://127.0.0.1:42003/` on this machine; Pinokio may use another port). Walk **header cores**, **Studio sidecar groups** (Create / Transform / Finish / Process), **Director skills** (live vs Coming Soon), **Settings → Enabled Models**. Do not click every model.
4. Skip X / @blizaine unless changelog + defaults still leave a hole.

Call the live/tag version **toVersion**. If `toVersion === fromVersion` and changelog is empty, say so and stop.

### 1.3 Classify each change (this is the whole research output)

For every delta, tag it:

| Tag | Meaning | Site action |
| --- | --- | --- |
| **Default** | In `DEFAULT_ENABLED_MODELS` or first-click Studio/Director | Card with `beginner` and/or `typical` only if newcomers should start here |
| **Opt-in** | Exists, hidden until Settings → Enabled Models | Keep or add a card; **no** `beginner`; **no** `typical: true`; blurb says enable in Settings |
| **Rename** | Same job, new UI string (e.g. Multi-Shot → References) | Current name in titles/nav; old name only in FAQ / that version’s What’s new row |
| **Moved** | Same job, new place (Edit Anything → Prompt Edit) | Same as rename |
| **Retired** | Gone from the app | Remove from replica/nav; one FAQ line if people will search |
| **Coming soon** | Visible but not live | Label it; do not build a fake flow |

**Do not** promote opt-in engines as first-click defaults. **Do not** delete a model that is still in the live catalog just because it is no longer the default.

Write a short **gap list** (bullets, tagged). If the user said stop after the gap list, stop here.

---

## 2. What to edit (open only what the gap list needs)

Data is the source of truth. Components consume it. Prefer `src/data/*` over new UI chrome.

| If this changed | Touch |
| --- | --- |
| Version / cores / first 15 min / What’s new | `src/data/overview.ts`, `hero.tsx`, `film-nav.tsx`, `__root.tsx`, `README.md` |
| Model cards, badges, opt-in copy | `src/data/models.ts`, `src/data/types.ts` (new `ModelFamily` only) |
| Studio tree, defaults per leaf | `src/data/studio-tree.ts`, `src/components/studio-console.tsx` |
| Knobs / Explain text | `src/data/controls.ts` |
| Director skills, soundtrack, Cut Speed, samples | `src/data/director.ts`, `src/components/director-console.tsx` |
| Editor vs Transform | `src/data/edit.ts`, `src/components/edit-section.tsx` |
| FAQ / ten rules | `src/data/faq.ts`, `src/components/cheat-sheet.tsx` |
| VRAM recipes | `src/data/hardware.ts` |
| Replica state shape | `src/store/console-store.ts` — bump persist `name` if fields changed (`maestro-console-v230` for 2.3.x, etc.) |
| Director video-model dropdown | Must use `modelsForFilter("video")` (no Viggle/SCAIL). Mark Wan/Hunyuan-class opt-in in the label. |
| Music default | Studio Music `defaultModelId`, Director `soundtrack`, Mixer Explain beginner line — keep them aligned |

What’s new accordion: title **What’s new, by version** (no “since \<old\>”). Newest release first. Old-name maps belong **inside that version’s row**, not in page titles.

Guide shots live in `public/guide/`. Recapture from the live app only when chrome moved (header, Studio sidecar, Duration, Director skills, Editor, Settings → Enabled Models). Keep Golden Hour page chrome; shots are the Onyx product.

---

## 3. Review / debug (mandatory before you say done)

Grep the **site** (`src/`, `README.md`), not `node_modules`:

1. Previous version as if it were still current (`fromVersion` in hero/nav/meta/README). Allowed: that version’s row under What’s new.
2. Titles/ledes that say **since \<old version\>** or **old Edit tab/core**.
3. `typical: true` or `beginner` on models that are **opt-in** in `DEFAULT_ENABLED_MODELS`.
4. Old UI names in **nav, section titles, replica labels** (FAQ + What’s new history rows are OK).
5. Music/Mixer/Director soundtrack still naming the **previous** default song model as the first click.
6. Director video `<select>` listing Viggle / SCAIL / other Transform-only engines.

Then **click through** locally (`npm run dev` → `http://localhost:8080/`):

- Models gallery: defaults look like defaults; opt-in cards say Settings.
- Overview: version, What’s new rows, first 15 minutes.
- Studio: sidecar matches live groups; load a default model; load an opt-in card.
- Director: live skills only as live; Coming Soon labeled; video-model list sane.
- Editor: explainer, not an NLE.
- Hardware Advisor: 8 GB recipe does not assume an opt-in model is already enabled.
- Cheat sheet FAQ: upgrade questions still answerable.

Fix leftovers in the same turn. Do not invent a new visual system to “finish” the update.

---

## 4. Done when

- Site version strings = `toVersion`.
- Gap list items are in data + replica, or explicitly deferred.
- Review grep + click-through are clean.
- Short user summary: what shipped, what to try on the site. No sandbox/port lecture.
