# Maestro Console

A teaching replica of **Maestro v1.9.0** — the local NVIDIA studio that usually runs inside [Pinokio](https://pinokio.computer).

This site does **not** generate video, audio, or images. It maps the real Studio tree, names every important control, and explains what each one does.

**Live:** [luzbone.github.io/pinokio-maestro](https://luzbone.github.io/pinokio-maestro/)

## What it covers

- **Models** — H3, LTX, Wan, Hunyuan, Flux, Krea, Music3, ACE-Step, TTS, SFX
- **Studio** — Image · Video (Frames / Multi-Shot / Extend / Blend) · Audio (Speech / Music / SFX / Mixer) · Edit (Retake / Edit Anything / Outpaint / Repaint / Recast) · Tools (Upscale / Revoice)
- **Director** — music-video and short-film planning, Load Settings, shared Generation Queue
- **Hardware Advisor** — VRAM / RAM / model fit
- **Explain** — click any knob for the inspector

The look is **Golden Hour** (handbook), not the live Onyx/orange product skin.

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

## GitHub Pages

Pushes to `main` build a static SPA and deploy via GitHub Actions. No extra branch.

Source: **Settings → Pages → GitHub Actions**.

## Stack

TanStack Start, React 19, Vite 8, Tailwind v4.

## License

Use and fork as you like. Maestro itself is a separate Pinokio app; this repo only teaches its console.
