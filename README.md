# Maestro Console

A teaching replica of **Maestro v2.2.0** — the local NVIDIA studio that usually runs inside [Pinokio](https://pinokio.computer).

This site does **not** generate video, audio, or images. It maps the real Studio tree, names every important control, and explains what each one does.

**Live:** [maestro.luzbone.com](https://maestro.luzbone.com/)

Upstream app: [Pinokio · Maestro](https://pinokio.co/apps/github-com-blizaine-maestro) · [Blizaine/Maestro](https://github.com/Blizaine/Maestro)

## What it covers

- **Models** — H3 (Pruned / Full / Fused / VDN / Voice), LTX, Viggle, SCAIL-2, Flux, Krea, YuE2, Music3, ACE-Step, TTS, SFX. Wan, Hunyuan, and Qwen Image Edit are Settings opt-in.
- **Studio** — Video (Create: Frames / References / Extend / Blend · Transform: Animate, Retake, Prompt Edit, Outpaint, Repaint, Recast · Finish: Upscale / Film Grain) · Image · Audio (Speech / Music / SFX · Process: Mixer / Revoice)
- **Director** — Music Video and Short Film planning (Video Podcast / Viral Video coming soon), YuE2 soundtrack, Cut Speed, Load Settings, shared Generation Queue
- **Editor** — timeline explainer (not a full NLE). Studio makes the shot; Editor finishes the movie
- **Hardware Advisor** — VRAM / RAM / model fit
- **Explain** — click any knob for the inspector

The look is **Golden Hour** (handbook), not the live Onyx/orange product skin. Annotated screenshots sit next to the matching sections so you can find the same chrome in the real app.

## Update to a new Maestro version

When Maestro ships a new release, point any coding agent at **[`docs/update-to-latest-maestro.md`](docs/update-to-latest-maestro.md)**. That file is the playbook: how to research the delta, which site files to edit, and how to review leftovers. Do not put the playbook in this README.

Prompt:

```text
Follow docs/update-to-latest-maestro.md. Update this site to the latest Maestro.
```

Add `Stop after the gap list` if you want to review the plan before edits.

## Run locally (Windows)

Double-click `launch.bat`.

It installs dependencies on first run, starts the dev server on [http://localhost:8080](http://localhost:8080), and opens the browser. Keep that window open; close it to stop the site.

Needs [Node.js](https://nodejs.org) 22+ on PATH.

## Run locally (any OS)

```bash
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

## Cloudflare Workers

Pushes to `main` can also deploy via Workers Builds. Bind any custom domain in the Cloudflare dashboard — do not put it in this repo.

Dashboard settings that match this repo:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview deploy | `npx wrangler versions upload` |

`wrangler.jsonc` is required. Do not let Wrangler auto-generate config — that path builds a Vercel Nitro bundle and then deploys a TanStack Start Worker, which 500s.

## GitHub Pages

Pushes to `main` also build a static SPA and deploy via GitHub Actions.

Source: **Settings → Pages → GitHub Actions**. Canonical public URL is **maestro.luzbone.com**.

## Stack

TanStack Start, React 19, Vite 8, Tailwind v4.

## License

Use and fork as you like. Maestro itself is a separate Pinokio app; this repo only teaches its console. YuE2 model weights are noncommercial — see the FAQ.
