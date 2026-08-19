import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as signOut, n as authClient, r as cn, t as Button } from "./button-DsLW8940.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhRv4-9j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled (default) -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-sm font-medium text-gold",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void signOut(),
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline",
				children: "Sign out"
			})
		]
	});
}
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-8 w-20 animate-pulse rounded-sm bg-elevated",
		"aria-hidden": true
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-gold",
		children: "Sign in"
	});
}
var MODELS = [
	{
		id: "h3-fl-pruned",
		family: "h3",
		kind: "video",
		name: "MiniMax H3",
		variant: "First / Last · Pruned 20B",
		maestroLabel: "H3 First & Last · Pruned 20B",
		blurb: "Locks a shot between a start frame and an optional end frame. Audio is born with the picture — 32 kHz stereo, not a second pass.",
		pro: "FL2VA. Native ceiling is about 14.4 s / 345 frames at 24 fps (VAE grid 17n+5). Integer durations 4–15 s. Pruned 20B is the recommended consumer checkpoint. Turbo LoRA, Sol Engine (RTX 40/50), and First Block Cache live in Advanced. Use Seamless Director to carry motion and synced audio across windows, each pass getting only its local prompt.",
		pickIf: "You have a start frame (or first and last) and want a single continuous shot with dialogue already in the file.",
		motion: "Performance inside a locked shot. Weaker at inventing cuts than Omni; stronger at holding the frame you gave it.",
		audio: "Native 32 kHz stereo, generated with the frames. Dialogue, foley, and room tone arrive together. Lip sync is structural, not a dub.",
		resolution: "24 fps. Aspects include 21:9, 16:9, 4:3, 1:1, 3:4, 9:16. Hosted 2K uses a 1440 short edge — 1080p is not a native H3 size, so it will vanish from the picker. Local cards often draft lower (Match Output / 768-class) and upscale.",
		window: "Native ~14.4 s. Longer needs multi-window continuation or Video Extend, which keeps the source tail instead of replacing the shot.",
		vram: "Pruned 20B is the 12–24 GB path. Turbo helps 8–12 GB if windows stay short and refs stay few.",
		ram: "Keep system RAM ≥32 GB if you also run Director planning. Unload the local LLM before the clip.",
		badges: ["beginner", "audio-native"],
		goals: [
			"talking",
			"music-video",
			"low-vram"
		],
		workflows: [
			"Text to video",
			"First frame",
			"Last frame",
			"First & Last",
			"Video Extend",
			"Seamless multi-window"
		],
		aspects: [
			"16:9",
			"9:16",
			"21:9",
			"1:1",
			"4:3",
			"3:4"
		],
		resolutions: [
			"Match output",
			"768-class draft",
			"1440 short-edge (heavy)"
		],
		maxNativeSec: 14.4,
		nativeFps: 24,
		image: "/still-talking.jpg"
	},
	{
		id: "h3-fl-full",
		family: "h3",
		kind: "video",
		name: "MiniMax H3",
		variant: "First / Last · Full 33B",
		maestroLabel: "H3 First & Last · Full 33B",
		blurb: "Same First / Last workflow, full 33B transformer. More face and dialogue fidelity. Heavier RAM and VRAM. Easy to waste on drafts.",
		pro: "Optional Full 33B FL2VA with INT8 ConvRot or BF16. Turbo LoRA supports 4 / 6 / 8-eval schedules on compatible Full checkpoints. If the image looks only slightly better than Pruned at 8 s and 768-class, you paid for parameters you are not using.",
		pickIf: "24 GB+ VRAM, 64 GB RAM, and the shot is the hero — close-ups, dialogue, faces that must hold.",
		motion: "Same locked-shot grammar as Pruned. The extra weights show up in skin, teeth, and audio edges more than in camera invention.",
		audio: "Same native 32 kHz stereo birth. Full 33B is less noisy on sibilants and room tails when the window is long.",
		resolution: "Same H3 aspect family. 1440 short-edge / 2K-class is the first thing to drop on OOM.",
		window: "Still ~14.4 s native. Multi-window does not get cheaper just because the model is Full.",
		vram: "Treat 24 GB as the floor for comfort. 16 GB is tight even with offload.",
		ram: "Full 33B plus Director plus a 5-minute Music3 render is how machines start swapping. 64 GB is the calm number.",
		badges: [
			"pro",
			"heavy",
			"audio-native"
		],
		goals: ["talking"],
		workflows: [
			"Text to video",
			"First frame",
			"Last frame",
			"First & Last",
			"Video Extend",
			"Seamless multi-window"
		],
		aspects: [
			"16:9",
			"9:16",
			"21:9",
			"1:1",
			"4:3",
			"3:4"
		],
		resolutions: [
			"Match output",
			"768-class draft",
			"1440 short-edge (heavy)"
		],
		maxNativeSec: 14.4,
		nativeFps: 24,
		image: "/still-talking.jpg"
	},
	{
		id: "h3-omni-pruned",
		family: "h3",
		kind: "video",
		name: "MiniMax H3",
		variant: "Omni · Pruned 20B",
		maestroLabel: "H3 Omni · Pruned 20B",
		blurb: "The talking-video and music-video engine. Up to ~9 images, 3 videos, and 3 audio refs, each with a job: identity, voice, performance, music.",
		pro: "Ref2VA. Cannot mix First/Last frames with Omni refs in one pass. Performance timeline audio is the exact soundtrack and advances through multi-window; Voice and Style refs stay style-like. Prompt Enhance / Context-IR rewrites free-form input into speaker IDs, silence, and dialogue the transformer can keep.",
		pickIf: "You need named people talking, or a singer hitting a specific vocal performance, from local files you already have.",
		motion: "Follows performance and motion refs. Better at acting than at clean hard cuts. For cutty music videos, plan many short windows rather than one 14 s master.",
		audio: "Native 32 kHz stereo. Condition each window on the exact song segment. Do not treat the track as a reusable vibe clip — Maestro v1.8.7 keeps it as the target soundtrack.",
		resolution: "Same H3 family. More refs raise VRAM before resolution does. Drop a video ref before you drop aspect.",
		window: "~14.4 s native. Selecting a performance timeline adopts its duration and turns on multi-window when needed.",
		vram: "Pruned 20B + 2–3 refs is the 12–24 GB daily driver. Nine images plus three videos is a 24 GB conversation.",
		ram: "Unload Gemma after planning. Omni + LLM + Music3 on 32 GB RAM will hitch.",
		badges: [
			"beginner",
			"audio-native",
			"pro"
		],
		goals: ["talking", "music-video"],
		workflows: [
			"Omni / Ref2VA",
			"Audio-driven",
			"Video-to-audio",
			"Video-to-video / mask",
			"Timed frame injection",
			"Multi-window continuation"
		],
		aspects: [
			"16:9",
			"9:16",
			"21:9",
			"1:1",
			"4:3",
			"3:4"
		],
		resolutions: [
			"Match output",
			"768-class draft",
			"1440 short-edge (heavy)"
		],
		maxNativeSec: 14.4,
		nativeFps: 24,
		image: "/still-talking.jpg"
	},
	{
		id: "h3-omni-full",
		family: "h3",
		kind: "video",
		name: "MiniMax H3",
		variant: "Omni · Full 33B",
		maestroLabel: "H3 Omni · Full 33B",
		blurb: "Full Omni transformer. Use it when the face, the line, and the room tone all have to survive a close-up. Ignore it for animatics.",
		pro: "33B dense Omni. Same ref budget as Pruned. Full is a waste on 6–16 GB, on 8 s Turbo drafts, and on any shot you will retake anyway. Auto-Tune will not magically make 12 GB host 33B + LLM + three video refs.",
		pickIf: "24 GB+ VRAM, 64 GB RAM, final-quality talking close-ups or hero musical performances.",
		motion: "Marginally cleaner micro-expression. Not a different director — just a heavier actor.",
		audio: "Native 32 kHz stereo. Full 33B is the one to pick if previous Pruned takes smear consonants.",
		resolution: "Do not open on 1440 short-edge. Prove the take at Match Output / draft, then step up.",
		window: "Same 14.4 s ceiling. Director will show H3-aware clip counts after planning so a 40 s scene does not look like one illegal 40 s job.",
		vram: "24–48 GB. Concurrent local LLM is the first thing to kill.",
		ram: "64 GB+ if Music3 or Director is also resident.",
		badges: [
			"pro",
			"heavy",
			"audio-native"
		],
		goals: ["talking"],
		workflows: [
			"Omni / Ref2VA",
			"Audio-driven",
			"Video-to-audio",
			"Video-to-video / mask",
			"Timed frame injection",
			"Multi-window continuation"
		],
		aspects: [
			"16:9",
			"9:16",
			"21:9",
			"1:1",
			"4:3",
			"3:4"
		],
		resolutions: [
			"Match output",
			"768-class draft",
			"1440 short-edge (heavy)"
		],
		maxNativeSec: 14.4,
		nativeFps: 24,
		image: "/still-talking.jpg"
	},
	{
		id: "ltx25-distilled",
		family: "ltx25",
		kind: "video",
		name: "LTX-2.5",
		variant: "Distilled",
		maestroLabel: "LTX-2.5 Distilled",
		blurb: "Default LTX-2.5. Synced audio, start/end frames, injection, seamless multi-window. Faster than H3. Mouths are the known weak point.",
		pro: "Enabled by default. Official Distilled 8-step base pass, learned latent upscaling, then a 3-step full-resolution refine. Persistent model reuse speeds follow-ups. Compatible LTX-2 / 2.3 LoRAs. Director vocal performances are planned as independent lip-sync shots with the exact source-song segment. Distilled, Dev, and NVFP4 can be shown in Settings.",
		pickIf: "You want a music video or a long seamless take without waiting on H3, and you can live with softer mouths.",
		motion: "Prompt adherence is better than 2.3. Motion is brisk. Fine facial acting loses to H3.",
		audio: "Native synced audio, born with picture. For music videos, lock the visible vocal to the exact soundtrack segment; keep the untouched song on the final timeline. A separated vocal stem (when Audio Analysis provides one) conditions mouth motion.",
		resolution: "Megapixel-based, not a 1080p menu. Resolutions that the Distilled path cannot hold simply disappear. 2 MP is already a long render on 24 GB.",
		window: "Automatic window sizing: raising total duration grows each native pass to the model ceiling before adding windows, unless you lock a shorter window. Seamless one-takes must not reset camera or invent cuts in later windows.",
		vram: "Comfortable on 12–24 GB at modest MP. NVFP4 is the 8–12 GB experiment, not Distilled at 2 MP.",
		ram: "32 GB is enough for Distilled + Gemma 4 4B if the LLM unloads.",
		badges: [
			"beginner",
			"fast",
			"audio-native",
			"long-form"
		],
		goals: [
			"music-video",
			"long-sequence",
			"low-vram"
		],
		workflows: [
			"Text / image to video",
			"Start & end frames",
			"Timed frame injection",
			"Audio-driven",
			"Native audio",
			"Seamless multi-window"
		],
		aspects: [
			"16:9",
			"9:16",
			"1:1",
			"21:9"
		],
		resolutions: [
			"0.4 MP",
			"1 MP",
			"2 MP (heavy)"
		],
		nativeFps: 24,
		image: "/still-music.jpg"
	},
	{
		id: "ltx25-dev",
		family: "ltx25",
		kind: "video",
		name: "LTX-2.5",
		variant: "Dev",
		maestroLabel: "LTX-2.5 Dev",
		blurb: "Non-distilled LTX-2.5. Enable in Settings. More headroom, more time, more VRAM. Use when Distilled smears the take you actually need.",
		pro: "Hidden until you unhide the model in Settings → model visibility. Same audio and injection grammar as Distilled. Not the first click on an 8 GB card.",
		pickIf: "You already like LTX-2.5 motion and need the extra quality pass more than you need speed.",
		motion: "Same family as Distilled, fewer shortcut artifacts. Still not H3 for dialogue close-ups.",
		audio: "Same synced-audio contract as Distilled.",
		resolution: "Same megapixel picker. Dev makes 2 MP even more expensive.",
		window: "Same automatic window sizing and seamless continuation.",
		vram: "Treat as a 16–24 GB model.",
		ram: "32–64 GB.",
		badges: [
			"pro",
			"heavy",
			"audio-native"
		],
		goals: ["music-video", "long-sequence"],
		workflows: [
			"Text / image to video",
			"Start & end frames",
			"Timed frame injection",
			"Audio-driven",
			"Native audio",
			"Seamless multi-window"
		],
		aspects: [
			"16:9",
			"9:16",
			"1:1",
			"21:9"
		],
		resolutions: [
			"0.4 MP",
			"1 MP",
			"2 MP (heavy)"
		],
		image: "/still-music.jpg"
	},
	{
		id: "ltx25-nvfp4",
		family: "ltx25",
		kind: "video",
		name: "LTX-2.5",
		variant: "NVFP4",
		maestroLabel: "LTX-2.5 NVFP4",
		blurb: "Quantized LTX-2.5 path for tighter VRAM. Enable in Settings. Expect some texture loss. Speed is the point.",
		pro: "Typical Studio control: NVFP4 is an RTX 40/50-friendly quantized variant, not a different creative model. If Distilled already fits, stay on Distilled.",
		pickIf: "10–12 GB VRAM and you still want LTX-2.5 audio instead of dropping to Wan.",
		motion: "Same grammar, softer detail.",
		audio: "Synced audio still present. Quality follows the visual budget.",
		resolution: "Stay at 0.4–1 MP.",
		window: "Shorten windows before you raise MP.",
		vram: "The 8–12 GB LTX-2.5 option.",
		ram: "32 GB is plenty.",
		badges: ["fast", "audio-native"],
		goals: ["low-vram", "music-video"],
		workflows: [
			"Text / image to video",
			"Start & end frames",
			"Audio-driven",
			"Seamless multi-window"
		],
		aspects: [
			"16:9",
			"9:16",
			"1:1"
		],
		resolutions: ["0.4 MP", "1 MP"],
		image: "/still-music.jpg"
	},
	{
		id: "ltx23",
		family: "ltx23",
		kind: "video",
		name: "LTX-2.3",
		variant: "Mature",
		maestroLabel: "LTX-2.3",
		blurb: "The mature LTX. LoRA-rich, long-form windows, known look. Audio is usually a second pass or audio-driven mode — not H3's birth-with-picture.",
		pro: "Keep this around when 2.5 mouths or prompt misses bother you and you already have a 2.3 LoRA stack. Audio-driven mode must stay selected across model changes — v1.8.7 fixed it dropping after restore. Do not expect 2.5's native soundtrack contract.",
		pickIf: "Long sequences, a look you already tuned with LTX-2.3 LoRAs, or a project that started on 2.3.",
		motion: "Stable, LoRA-shapable, less 'new model' surprise. Weaker prompt obedience than 2.5 on some tests.",
		audio: "Audio-driven / second pass. Pair with MMAudio or a locked soundtrack. Lip sync is not native the way H3 and LTX-2.5 are.",
		resolution: "Long-form friendly at modest resolutions. 1080p is still not a promise.",
		window: "Long windows are the reason to stay. Sliding window + overlap is the daily tool.",
		vram: "12–24 GB depending on window and LoRA count.",
		ram: "32 GB typical.",
		badges: ["pro", "long-form"],
		goals: ["long-sequence", "music-video"],
		workflows: [
			"Text / image to video",
			"Audio-driven",
			"Sliding window / long-form",
			"LoRA stack",
			"Frame injection (KFI)"
		],
		aspects: [
			"16:9",
			"9:16",
			"1:1"
		],
		resolutions: [
			"576p-class",
			"720p-class",
			"higher if VRAM allows"
		],
		image: "/still-music.jpg"
	},
	{
		id: "wan22",
		family: "wan",
		kind: "video",
		name: "Wan 2.2",
		variant: "WanGP",
		maestroLabel: "Wan 2.2",
		blurb: "Classic WanGP motion model. Huge LoRA ecosystem. No native 32 kHz stereo birth. Use it when the shot is visual, not a talking close-up.",
		pro: "Wan 2.1 remains for older LoRAs and lighter cards. 2.2 is the current default in this family. Guidance and steps behave like a diffusion video model, not like H3 Omni refs. Blend video and v2v/mask are at home here.",
		pickIf: "Camera moves, stylized LoRAs, or a look that already lives in the Wan universe.",
		motion: "Strong body and camera motion. Faces and dialogue are not why you are here.",
		audio: "Second pass. Generate picture, then MMAudio / ACE-Step / Music3, or run audio-driven if the workflow exposes it.",
		resolution: "Often 480p / 720p families. A 1080p label may simply not exist for the selected checkpoint.",
		window: "Clip-length depends on the WanGP profile Auto-Tune picked. Multi-clip + overlap is how you go long.",
		vram: "6–16 GB is the historical Wan audience. Heavier profiles exist; Auto-Tune should pick them.",
		ram: "16–32 GB.",
		badges: ["beginner", "fast"],
		goals: ["low-vram", "long-sequence"],
		workflows: [
			"Text to video",
			"Image to video",
			"Video-to-video / mask",
			"Blend video",
			"LoRA stack"
		],
		aspects: [
			"16:9",
			"9:16",
			"1:1"
		],
		resolutions: ["480p", "720p"],
		typical: true,
		image: "/still-music.jpg"
	},
	{
		id: "wan21",
		family: "wan",
		kind: "video",
		name: "Wan 2.1",
		variant: "WanGP",
		maestroLabel: "Wan 2.1",
		blurb: "Older Wan checkpoint. Keep it when a LoRA or recipe is 2.1-only. Otherwise prefer 2.2.",
		pro: "Typical Studio control: model lists still include 2.1 because the LoRA library did not all migrate. If the LoRA page says 2.2, use 2.2.",
		pickIf: "A specific CivitAI LoRA or recipe that names Wan 2.1.",
		motion: "Slightly stiffer than 2.2 on newer tests; still a motion workhorse.",
		audio: "Second pass.",
		resolution: "480p / 720p class.",
		window: "Same multi-clip pattern as 2.2.",
		vram: "Often the lightest video option on 6–8 GB.",
		ram: "16 GB can work.",
		badges: ["beginner", "fast"],
		goals: ["low-vram"],
		workflows: [
			"Text to video",
			"Image to video",
			"LoRA stack"
		],
		aspects: [
			"16:9",
			"9:16",
			"1:1"
		],
		resolutions: ["480p", "720p"],
		typical: true,
		image: "/still-music.jpg"
	},
	{
		id: "hunyuan",
		family: "hunyuan",
		kind: "video",
		name: "Hunyuan Video",
		variant: "Cinematic",
		maestroLabel: "Hunyuan Video",
		blurb: "A different motion personality — more 'cinema camera' than 'performance capture'. No H3-style native stereo.",
		pro: "Typical Studio control: Hunyuan remains in the WanGP catalogue for looks that neither Wan nor LTX quite hit. Resolution families differ; do not expect the H3 1440-short-edge menu. Heavy relative to Wan 2.2 on the same card.",
		pickIf: "Establishing shots, weather, landscape, a more photographic camera.",
		motion: "Cinematic camera, slower personality, less snappy acting than H3.",
		audio: "Second pass.",
		resolution: "Model-specific. If 1080p vanishes, that checkpoint never offered it.",
		window: "Shorter native windows than LTX-2.3 long-form. Stack clips for length.",
		vram: "Often 16 GB+ for comfort.",
		ram: "32 GB.",
		badges: ["pro", "heavy"],
		goals: ["stills", "long-sequence"],
		workflows: ["Text to video", "Image to video"],
		aspects: ["16:9", "9:16"],
		resolutions: ["720p-class", "higher if listed"],
		typical: true,
		image: "/hero.jpg"
	},
	{
		id: "flux-klein",
		family: "flux",
		kind: "image",
		name: "Flux 2 Klein 9B",
		variant: "9B",
		maestroLabel: "Flux 2 Klein 9B",
		blurb: "Default stills engine. Compact enough to live beside video. This is how you make start frames that keep a face consistent.",
		pro: "Director can set image model to None and go prompt-only. If you care about the same person across clips, do not do that — generate start frames here (or Krea Identity) and feed them to H3 First / Last or LTX start frames.",
		pickIf: "Keyframes, start frames, boards, and general stills on a card that also has to run video.",
		motion: "Still. Motion only exists later, when a video model inherits this frame.",
		audio: "None.",
		resolution: "Image resolutions are independent of video menus. A 2K still can still feed a 768-class video draft.",
		window: "N/A",
		vram: "Fits on 8–12 GB when the video model is unloaded.",
		ram: "16–32 GB.",
		badges: ["beginner", "fast"],
		goals: [
			"stills",
			"talking",
			"low-vram"
		],
		workflows: ["Text to image", "Start frame / keyframe"],
		aspects: [
			"16:9",
			"9:16",
			"1:1",
			"4:3",
			"3:4",
			"21:9"
		],
		resolutions: ["1K-class", "native Klein"],
		image: "/still-portrait.jpg"
	},
	{
		id: "krea-raw",
		family: "krea",
		kind: "image",
		name: "Krea 2",
		variant: "RAW",
		maestroLabel: "Krea 2 RAW",
		blurb: "Photoreal stills with more grain and latitude than Turbo. Use it when the start frame has to look like a plate, not a poster.",
		pro: "RAW vs Turbo is a quality/speed split. Identity Edit variants lock a person across wardrobe and lighting changes — that is the continuity tool, not a beauty filter.",
		pickIf: "Hero stills and start frames that will be scrutinized in a close-up.",
		motion: "Still.",
		audio: "None.",
		resolution: "Higher-res stills are cheap compared to 2K video. Spend pixels here, then let video draft lower.",
		window: "N/A",
		vram: "12–24 GB depending on res.",
		ram: "32 GB comfortable.",
		badges: ["pro"],
		goals: ["stills", "talking"],
		workflows: ["Text to image", "Start frame"],
		aspects: [
			"16:9",
			"9:16",
			"1:1"
		],
		resolutions: ["RAW native"],
		image: "/still-portrait.jpg"
	},
	{
		id: "krea-turbo",
		family: "krea",
		kind: "image",
		name: "Krea 2",
		variant: "Turbo",
		maestroLabel: "Krea 2 Turbo",
		blurb: "Fast Krea. Iterate boards and start-frame options without waiting on RAW.",
		pro: "Lock composition on Turbo, then take the winner through RAW or Identity Edit. Director Auto mode can chew through many start frames — Turbo is the humane choice.",
		pickIf: "Exploration, animatics, low VRAM stills.",
		motion: "Still.",
		audio: "None.",
		resolution: "Good enough for video start frames even when not print-sharp.",
		window: "N/A",
		vram: "8–16 GB.",
		ram: "16–32 GB.",
		badges: ["beginner", "fast"],
		goals: ["stills", "low-vram"],
		workflows: ["Text to image", "Start frame"],
		aspects: [
			"16:9",
			"9:16",
			"1:1"
		],
		resolutions: ["Turbo native"],
		image: "/still-portrait.jpg"
	},
	{
		id: "krea-identity",
		family: "krea",
		kind: "image",
		name: "Krea 2",
		variant: "Identity Edit",
		maestroLabel: "Krea 2 Identity Edit",
		blurb: "Edit a person while holding identity. This is how character continuity is won before video even starts.",
		pro: "RAW Identity and Turbo Identity both exist. Feed the output as H3 first frames or Omni identity refs. Changing wardrobe in video without an identity-locked still is how faces drift.",
		pickIf: "Same actor, new beat, new costume, same skull.",
		motion: "Still. Continuity is the motion you are buying later.",
		audio: "None.",
		resolution: "Match the aspect you will shoot in video so First / Last is not forced to crop.",
		window: "N/A",
		vram: "12–24 GB.",
		ram: "32 GB.",
		badges: ["pro"],
		goals: ["talking", "stills"],
		workflows: ["Identity edit", "Start frame"],
		aspects: [
			"16:9",
			"9:16",
			"1:1"
		],
		resolutions: ["Identity native"],
		image: "/still-portrait.jpg"
	},
	{
		id: "qwen-edit",
		family: "qwen",
		kind: "image",
		name: "Qwen Image Edit",
		variant: "Instruction",
		maestroLabel: "Qwen Image Edit",
		blurb: "Instruction-based still editing. 'Remove the cup. Warm the key light. Keep the face.' Not a video model.",
		pro: "Useful for repairing a start frame without a full regen. For video-level object edits, use Edit Anything or Repaint instead.",
		pickIf: "A start frame that is 90% right.",
		motion: "Still.",
		audio: "None.",
		resolution: "Follows the source still.",
		window: "N/A",
		vram: "8–16 GB typical.",
		ram: "16–32 GB.",
		badges: ["beginner"],
		goals: ["stills"],
		workflows: ["Instruction edit"],
		aspects: ["match source"],
		resolutions: ["match source"],
		image: "/still-portrait.jpg"
	},
	{
		id: "music3",
		family: "music3",
		kind: "audio",
		name: "MiniMax-Music3",
		variant: "Stereo song",
		maestroLabel: "MiniMax-Music3",
		blurb: "Full stereo songs, 5 seconds to 5 minutes, two-minute default. Also a Director soundtrack generator beside ACE-Step.",
		pro: "Duration-aware writer scales lyrics and arrangement to the length you asked for. v1.8.7.1: on Windows, FlashAttention is validated against the live GPU and falls back to SDPA if the wheel has no kernel for that architecture. Long songs plus Full 33B plus LLM is a RAM incident, not a VRAM incident.",
		pickIf: "You need an original track for a music video, with sections that can be planned to downbeats.",
		motion: "N/A — but Director will cut picture to this waveform.",
		audio: "Native stereo. This is the song, not an SFX bed.",
		resolution: "N/A",
		window: "5 s – 5 min. Two minutes is the studio default.",
		vram: "Staged single-GPU. Unload video first. 12 GB can work; 8 GB is tight on long songs.",
		ram: "Long 5-minute jobs want 32–64 GB. This is the RAM warning in the Hardware Advisor.",
		badges: [
			"pro",
			"heavy",
			"audio-native"
		],
		goals: ["music-video"],
		workflows: ["Generate song", "Director soundtrack"],
		aspects: [],
		resolutions: [],
		image: "/still-audio.jpg"
	},
	{
		id: "acestep-xl",
		family: "acestep",
		kind: "audio",
		name: "ACE-Step",
		variant: "Quality XL",
		maestroLabel: "ACE-Step v1.5 XL SFT",
		blurb: "Higher-quality ACE-Step. Better when the track is the product. Slower than Turbo.",
		pro: "Director Music Video can generate via ACE-Step or Music3, or you can drop an existing file. XL is the quality pick; Turbo is the sketch pick.",
		pickIf: "A finished-sounding bed and you do not need Music3's long-form songwriter.",
		motion: "N/A",
		audio: "Stereo music. Not dialogue TTS, not foley.",
		resolution: "N/A",
		window: "Shorter than Music3's five-minute ceiling. Typical Studio control: treat XL as the quality ACE path.",
		vram: "Lighter than Music3 long songs.",
		ram: "32 GB comfortable.",
		badges: ["pro", "audio-native"],
		goals: ["music-video"],
		workflows: ["Generate track", "Director soundtrack"],
		aspects: [],
		resolutions: [],
		typical: true,
		image: "/still-audio.jpg"
	},
	{
		id: "acestep-turbo",
		family: "acestep",
		kind: "audio",
		name: "ACE-Step",
		variant: "Turbo",
		maestroLabel: "ACE-Step Turbo",
		blurb: "Fast ACE-Step. Iterate structure, then take the keeper through XL or Music3.",
		pro: "Use Turbo to find BPM and section shape. Do not ship Turbo if the mix is the hero.",
		pickIf: "Low VRAM, or you are still deciding the song.",
		motion: "N/A",
		audio: "Stereo sketch.",
		resolution: "N/A",
		window: "Keep it short while iterating.",
		vram: "The 6–8 GB music option.",
		ram: "16–32 GB.",
		badges: ["beginner", "fast"],
		goals: ["music-video", "low-vram"],
		workflows: ["Generate track", "Director soundtrack"],
		aspects: [],
		resolutions: [],
		typical: true,
		image: "/still-audio.jpg"
	},
	{
		id: "kugelaudio",
		family: "tts",
		kind: "audio",
		name: "Kugelaudio",
		variant: "TTS",
		maestroLabel: "Kugelaudio",
		blurb: "Speech. Feed the take as an H3 voice or performance ref if you want the mouth to match a line you already like.",
		pro: "Typical Studio control: Kugelaudio is the built-in TTS path alongside Qwen3 TTS. It is not a song model.",
		pickIf: "Temp dialogue, VO, or a voice ref for Omni.",
		motion: "N/A",
		audio: "Speech, not music.",
		resolution: "N/A",
		window: "Line length. Keep refs short; H3 audio refs are counted, not infinite.",
		vram: "Small vs video. Still unload video if the card is 8 GB.",
		ram: "16 GB fine.",
		badges: ["beginner"],
		goals: ["talking", "low-vram"],
		workflows: ["Text to speech", "Voice reference"],
		aspects: [],
		resolutions: [],
		typical: true,
		image: "/still-audio.jpg"
	},
	{
		id: "qwen3-tts",
		family: "tts",
		kind: "audio",
		name: "Qwen3 TTS",
		variant: "TTS",
		maestroLabel: "Qwen3 TTS",
		blurb: "Alternate local TTS. Use it when Kugelaudio's voice isn't the one, or you already live in the Qwen stack.",
		pro: "Typical Studio control: both TTS engines are first-class in Studio Audio. Neither replaces Music3.",
		pickIf: "Dialogue refs and VO with a different timbre.",
		motion: "N/A",
		audio: "Speech.",
		resolution: "N/A",
		window: "Line length.",
		vram: "Light.",
		ram: "16 GB.",
		badges: ["beginner"],
		goals: ["talking"],
		workflows: ["Text to speech", "Voice reference"],
		aspects: [],
		resolutions: [],
		typical: true,
		image: "/still-audio.jpg"
	},
	{
		id: "mmaudio",
		family: "sfx",
		kind: "audio",
		name: "MMAudio",
		variant: "SFX",
		maestroLabel: "MMAudio",
		blurb: "Foley and ambience for picture that was born silent — Wan, Hunyuan, or any second-pass job.",
		pro: "Do not run MMAudio on an H3 clip unless you are replacing a bed on purpose. H3 and LTX-2.5 already wrote audio. Video-to-audio on H3 is a different, native path.",
		pickIf: "Silent video that needs a world.",
		motion: "N/A",
		audio: "SFX / ambience, not songs, not dialogue leads.",
		resolution: "N/A",
		window: "Match the clip.",
		vram: "Moderate. Unload the video transformer first.",
		ram: "32 GB comfortable.",
		badges: ["beginner"],
		goals: ["long-sequence", "low-vram"],
		workflows: ["Video to audio / SFX"],
		aspects: [],
		resolutions: [],
		image: "/still-audio.jpg"
	}
];
var GOAL_LABELS = {
	talking: "Talking video",
	"music-video": "Music video",
	stills: "Stills / start frames",
	"long-sequence": "Long sequence",
	"low-vram": "Low VRAM"
};
var BADGE_LABELS = {
	beginner: "Beginner",
	pro: "Pro",
	fast: "Fast",
	heavy: "Heavy",
	"audio-native": "Audio-native",
	"long-form": "Long-form"
};
function modelsByKind(kind) {
	return MODELS.filter((m) => m.kind === kind);
}
function modelById(id) {
	return MODELS.find((m) => m.id === id);
}
var VRAM_OPTIONS = [
	6,
	8,
	10,
	12,
	16,
	24,
	32,
	48
];
var RAM_OPTIONS = [
	16,
	24,
	32,
	48,
	64,
	96
];
function statusFor(input) {
	const { vram, ram, goal, directorLlm } = input;
	const llmTax = directorLlm ? 1 : 0;
	if (vram <= 8 && ram <= 16 && (goal === "short-film" || goal === "long-multi" || directorLlm)) return "crash";
	if (vram <= 8 && goal === "talking" && input.bias === "max") return "crash";
	if (vram <= 10 && ram <= 24 && directorLlm && goal !== "stills") return "tight";
	if (vram <= 8) return goal === "stills" ? "tight" : ram < 32 ? "crash" : "tight";
	if (vram <= 12) {
		if (goal === "short-film" && directorLlm) return "tight";
		if (input.bias === "max") return "tight";
		return ram >= 32 ? "comfortable" : "tight";
	}
	if (vram <= 16) {
		if (input.bias === "max" && (goal === "talking" || goal === "short-film") && ram < 64) return "tight";
		return ram >= 32 ? "comfortable" : "tight";
	}
	if (vram >= 24 && ram >= 32) {
		if (llmTax && ram < 32) return "tight";
		return "comfortable";
	}
	return ram >= 32 ? "comfortable" : "tight";
}
function advise(input) {
	const { vram, ram, gpu, goal, bias, directorLlm } = input;
	const status = statusFor(input);
	const solOk = gpu >= 40;
	const wantFull = !(vram < 24 || bias === "safe" || ram < 64) && bias === "max" && vram >= 24 && ram >= 64;
	const talking = goal === "talking" || goal === "short-film";
	const music = goal === "music-video";
	const video = (() => {
		if (goal === "stills") return "None required — unload video before stills on ≤12 GB.";
		if (vram <= 8) return talking ? "H3 Pruned 20B + Turbo, 5–8 s, almost no refs — or skip H3 and board in Flux." : music ? "LTX-2.5 NVFP4 or Distilled at 0.4 MP, short windows. Wan 2.1 if that still OOMs." : "Wan 2.1 / 2.2, 480p, short clips. No Full 33B. No LTX 2 MP.";
		if (vram <= 12) return talking ? "H3 Omni Pruned 20B, careful 768-class, 2 refs max." : "H3 Pruned or LTX-2.5 Distilled at 0.4–1 MP. Not Full 33B.";
		if (vram <= 16) return wantFull ? "Tempting, but Full 33B is still tight. Stay Pruned; use LTX-2.5 Distilled for length." : talking ? "H3 Omni Pruned comfortably. First / Last Pruned for Seamless Director." : "LTX-2.5 Distilled or LTX-2.3 long-form. H3 Pruned for hero vocal shots.";
		if (wantFull) return talking ? "H3 Omni Full 33B for hero close-ups. Keep a Pruned recipe for coverage." : "Full 33B only on hero shots. LTX-2.5 Distilled/Dev for the rest of the cut.";
		return talking ? "H3 Omni Pruned as default; Full 33B only if faces actually improve." : "LTX-2.5 Distilled for music / long seamless. H3 Pruned for dialogue inserts.";
	})();
	const image = (() => {
		if (vram <= 8) return "Flux 2 Klein 9B or Krea Turbo. Unload video first.";
		if (goal === "stills") return vram >= 16 ? "Krea 2 RAW / Identity Edit." : "Flux Klein + Krea Turbo, Identity if it fits.";
		if (vram <= 12) return "Flux Klein start frames. Skip Identity Edit while video is resident.";
		return "Flux Klein for volume; Krea Identity Edit for the faces Director must hold.";
	})();
	const audio = (() => {
		if (goal === "stills") return "None.";
		if (vram <= 8) return "ACE-Step Turbo. Not Music3 at 5 minutes. TTS is fine.";
		if (music) return ram >= 32 && vram >= 12 ? "MiniMax-Music3 at 90–120 s, or ACE-Step XL if you already have a loop." : "ACE-Step Turbo / XL. Postpone long Music3 until RAM ≥32 GB.";
		if (talking) return "H3 native audio. TTS (Kugelaudio / Qwen3) only as a voice ref. MMAudio only if you chose a silent model.";
		return "ACE-Step Turbo for beds. MMAudio for silent Wan/Hunyuan picture.";
	})();
	const resolution = (() => {
		if (vram <= 8) return "480p / 0.4 MP / Match output draft. Never 2K-class.";
		if (vram <= 12) return "Careful 768-class or 0.4–1 MP. 1080p will often not even be listed.";
		if (vram <= 16) return "768-class or 1 MP daily. Step up one notch only on keepers.";
		if (vram >= 24 && bias === "max") return "Where the model allows: 1440 short-edge (H3) or 2 MP (LTX). Prove the take smaller first.";
		return "Match output / 1 MP. Higher only after a good take.";
	})();
	const window = (() => {
		if (vram <= 8) return "5–8 s, one window. H3 14.4 s ceiling is theoretical here.";
		if (vram <= 12) return talking ? "8–10 s H3 native. Do not multi-window yet." : "Short LTX windows, locked if VRAM spikes.";
		if (goal === "long-multi" || goal === "music-video" || goal === "short-film") return vram >= 16 ? "Native ceiling first (H3 ~14.4 s / LTX auto-grow), then add windows with ~1 s overlap." : "Keep each pass well under the ceiling.";
		return "One native window. Multi-window only when the story needs it.";
	})();
	const multiWindow = vram <= 12 && (goal === "stills" || goal === "talking") ? "No — concatenate later, or board more shots." : vram <= 12 ? "Only with locked short windows and Auto-Tune on." : "Yes, with an AI plan per window. Director will print H3 clip counts after planning.";
	const accel = (() => {
		return `${vram < 24 || bias !== "max" ? "Turbo LoRA on for drafts." : "Turbo off for hero takes."} ${solOk ? bias === "safe" ? "Sol Engine off (experimental)." : "Sol Engine is legal on this RTX 40/50 — A/B it, do not start there." : "Sol Engine is not for RTX 30. Ignore it."} ${bias === "safe" ? "First Block Cache off." : "First Block Cache only on locked-off wides."}`;
	})();
	const loras = vram <= 12 ? "Zero or one. Stay in the printed recommended range. No multi-packs." : vram <= 16 ? "One character or one style. Recommended weights from the CivitAI guide, not 1.0 by habit." : "Two if they do not fight. Still drop LoRAs before resolution on OOM.";
	const oomOrder = [
		"Force-unload the local LLM (Gemma unloads after 60 s idle — don't wait if you are already in the red).",
		"Strip extra LoRAs.",
		"Drop video refs, then extra stills. Keep one identity frame.",
		"Lower resolution / megapixels.",
		"Shorten the native window; lock it so LTX cannot auto-grow.",
		"Disable First Block Cache and Sol Engine if the crash is nondeterministic.",
		"Pruned 20B instead of Full 33B; Distilled / NVFP4 instead of LTX Dev.",
		"Do not run Music3 long songs concurrently with video."
	];
	const ramWarnings = [];
	if (ram <= 24) ramWarnings.push("16–24 GB RAM: no Full 33B, no 5-minute Music3, no Director planning stacked on a live video model.");
	if (wantFull || bias === "max" && vram >= 24) ramWarnings.push("Full 33B weights plus activations spill to system RAM. 64 GB is the calm number; 32 GB will swap.");
	if (music && ram < 64) ramWarnings.push("Music3 long songs are a RAM tax. 2-minute default is safer than 5-minute on 32 GB.");
	if (directorLlm) ramWarnings.push("Director + local LLM: Gemma 4 4B is the default and auto-unloads after 60 s idle so video can take the GPU back. Planning still occupies the GPU. 26B / 31B variants will not coexist with H3 Full.");
	if (ram >= 64 && vram >= 24) ramWarnings.push("64 GB+ RAM and 24 GB+ VRAM: this is the Full 33B / Music3 / Director-comfortable band — still respect Auto-Tune.");
	return {
		status,
		headline: (() => {
			if (status === "crash") return "This combination will likely crash if you chase defaults.";
			if (status === "tight") return "Workable if you stay inside the safe recipe. Defaults may OOM.";
			return "Comfortable, as long as LoRAs, refs, and a resident LLM do not stack.";
		})(),
		video,
		image,
		audio,
		resolution,
		window,
		multiWindow,
		accel,
		loras,
		oomOrder,
		ramWarnings,
		solNote: solOk ? "RTX 40/50: Sol Engine is optional sparse attention. Pinokio may have built env-sol. Treat it as an experiment, not a default." : "RTX 30: no Sol Engine. Sage/Flash wheels may still help; otherwise SDPA. Auto-Tune's VRAM safety coefficient matters more than any sparse-attention brand name.",
		autoTune: "Performance Auto-Tune already picked a profile, quantization, VAE tiling, and VRAM safety coefficient on first launch. This advisor is a map, not a guarantee. LoRAs, refs, resolution, and a still-resident LLM all move the ceiling. If you OOM, apply the banner's one-click headroom drop before you start editing JSON.",
		beginner: {
			name: "Beginner Safe",
			video: vram <= 8 ? "Wan 2.1 480p or skip video; board in Flux." : "H3 Pruned 20B + Turbo, or LTX-2.5 Distilled at 0.4 MP.",
			image: "Flux 2 Klein 9B. One start frame.",
			audio: music ? "ACE-Step Turbo, ≤90 s." : "H3 native. No Music3.",
			resolution: vram <= 12 ? "Lowest listed draft." : "768-class / 0.4 MP.",
			window: "One short window. No Seamless yet.",
			accel: "Turbo on. Sol off. Cache off. Auto-Tune on.",
			notes: "Unload LLM. One LoRA max. Cancel at the first bad second."
		},
		maxQuality: {
			name: "Max Quality",
			video: wantFull ? "H3 Omni Full 33B hero shots; LTX-2.5 Distilled/Dev for coverage and length." : vram >= 16 ? "H3 Omni Pruned at native window; LTX-2.5 Distilled at 1 MP for long-form." : "There is no max-quality Full 33B on this card. Pruned + careful 768-class is the ceiling.",
			image: "Krea Identity Edit start frames, aspect-matched to the video.",
			audio: music ? ram >= 32 ? "Music3 at 2 min, or ACE-Step XL. Exact soundtrack segments in Director." : "ACE-Step XL. Not 5-minute Music3." : "H3 native 32 kHz stereo. Prompt Enhance on.",
			resolution: vram >= 24 && bias === "max" ? "Step up only on the keeper. 1440 short-edge / 2 MP is a choice, not a default." : "Stay at the comfortable draft; upscale after.",
			window: "Native ceiling, then Seamless with an AI plan. Director prints H3 clip counts.",
			accel: solOk && vram >= 24 ? "Turbo off on hero. Sol A/B. Cache off on faces." : "Turbo off on hero. Sol off. Cache off.",
			notes: "LLM unloads before generate. Two refs that agree. Read the enhanced prompt."
		}
	};
}
var DEFAULT_ADVISOR = {
	vram: 12,
	ram: 32,
	gpu: 40,
	goal: "talking",
	bias: "balanced",
	directorLlm: true
};
var firstOf = (kind) => MODELS.find((m) => m.kind === kind);
var lorasFor = (family) => {
	if (family === "h3") return [{
		id: "turbo",
		name: "H3 Turbo LoRA",
		weight: 1,
		rec: "1.0 on 4/6/8 schedules"
	}];
	if (family === "ltx23" || family === "ltx25" || family === "wan") return [{
		id: "style",
		name: "Style LoRA",
		weight: .7,
		rec: "0.55–0.8 from CivitAI guide"
	}];
	return [];
};
var studioFor = (modelId) => {
	const m = modelById(modelId) ?? firstOf("video");
	return {
		modelId: m.id,
		workflow: m.workflows[0] ?? "Text to video",
		aspect: m.aspects[0] ?? "16:9",
		resolution: m.resolutions[0] ?? "Match output",
		duration: m.maxNativeSec ? Math.min(8, m.maxNativeSec) : 8,
		fps: m.nativeFps ?? 24,
		steps: m.family === "h3" ? 8 : m.family === "ltx25" ? 8 : 28,
		enhance: m.family === "h3",
		turbo: m.family === "h3" && m.variant.includes("Pruned"),
		loras: lorasFor(m.family)
	};
};
var initialStudio = () => ({
	mode: "video",
	modelId: "h3-omni-pruned",
	workflow: "Omni / Ref2VA",
	aspect: "16:9",
	resolution: "Match output",
	duration: 8,
	fps: 24,
	windows: 1,
	overlap: 1,
	prompt: "",
	enhance: true,
	negative: "",
	steps: 8,
	guidance: 4,
	seed: "",
	turbo: true,
	sol: false,
	fbc: false,
	injection: false,
	audioDriven: false,
	v2a: false,
	v2v: .35,
	blend: false,
	aiPlan: true,
	grain: 0,
	upscale: false,
	codec: "Default master",
	songDuration: 120,
	loras: [{
		id: "turbo",
		name: "H3 Turbo LoRA",
		weight: 1,
		rec: "1.0 on 4/6/8 schedules"
	}],
	refs: [],
	queue: []
});
var initialDirector = () => ({
	skill: "music-video",
	soundtrack: "music3",
	aspect: "16:9",
	resolution: "Match output",
	workflow: "Seamless",
	videoModel: "h3-omni-pruned",
	imageModel: "krea-identity",
	review: "manual",
	pacing: 50,
	locked: false,
	stage: "analyze",
	plannedDuration: 120
});
var useConsole = create()(persist((set, get) => ({
	hydrated: false,
	lastPanel: "models",
	inspectorId: null,
	studio: initialStudio(),
	director: initialDirector(),
	advisor: DEFAULT_ADVISOR,
	setHydrated: (v) => set({ hydrated: v }),
	setPanel: (id) => set({ lastPanel: id }),
	openInspector: (id) => set({
		inspectorId: id,
		lastPanel: get().lastPanel
	}),
	closeInspector: () => set({ inspectorId: null }),
	setStudio: (patch) => set({ studio: {
		...get().studio,
		...patch
	} }),
	setMode: (mode) => {
		const m = firstOf(mode);
		set({ studio: {
			...get().studio,
			mode,
			...studioFor(m.id),
			refs: [],
			queue: get().studio.queue
		} });
	},
	setModel: (id) => {
		const current = get().studio;
		set({ studio: {
			...current,
			...studioFor(id),
			mode: modelById(id)?.kind ?? current.mode
		} });
	},
	setDirector: (patch) => {
		const d = get().director;
		if (d.locked && ("skill" in patch || "soundtrack" in patch || "videoModel" in patch || "imageModel" in patch || "aspect" in patch || "resolution" in patch || "workflow" in patch || "review" in patch)) return;
		set({ director: {
			...d,
			...patch
		} });
	},
	planDirector: () => set({ director: {
		...get().director,
		locked: true,
		stage: "shot-plan"
	} }),
	resetDirector: () => set({ director: initialDirector() }),
	setAdvisor: (patch) => set({ advisor: {
		...get().advisor,
		...patch
	} }),
	enqueue: () => {
		const s = get().studio;
		const m = modelById(s.modelId);
		const job = {
			id: `q-${Date.now()}`,
			label: `${m?.maestroLabel ?? "Job"} · ${s.duration}s replica`,
			status: "running",
			progress: 8
		};
		set({ studio: {
			...s,
			queue: [job, ...s.queue].slice(0, 6)
		} });
	},
	cancelJob: (id) => set({ studio: {
		...get().studio,
		queue: get().studio.queue.map((j) => j.id === id ? {
			...j,
			status: "cancelled"
		} : j)
	} })
}), {
	name: "maestro-console-v1871",
	partialize: (s) => ({
		lastPanel: s.lastPanel,
		advisor: s.advisor
	}),
	skipHydration: true
}));
var ITEMS = [
	{
		id: "models",
		label: "Models"
	},
	{
		id: "overview",
		label: "Overview"
	},
	{
		id: "studio",
		label: "Studio"
	},
	{
		id: "director",
		label: "Director"
	},
	{
		id: "edit",
		label: "Edit"
	},
	{
		id: "hardware",
		label: "Hardware Advisor"
	},
	{
		id: "cheat",
		label: "Cheat Sheet"
	}
];
function FilmNav({ active }) {
	const setPanel = useConsole((s) => s.setPanel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "film-perf h-2 w-full opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-[1600px] items-center gap-3 px-3 py-2 md:px-6",
				"aria-label": "Studio sections",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "shrink-0 font-display text-lg tracking-wide text-gold md:text-xl",
						onClick: () => setPanel("models"),
						children: ["Maestro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted",
							children: "v1.8.7.1"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto py-1",
						children: ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${item.id}`,
							onClick: () => setPanel(item.id),
							className: cn("block whitespace-nowrap rounded-sm px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] md:px-3", active === item.id ? "bg-gold/15 text-gold" : "text-muted hover:text-fg"),
							children: item.label
						}) }, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden shrink-0 sm:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "film-perf h-2 w-full opacity-70" })
		]
	});
}
function Hero() {
	const setPanel = useConsole((s) => s.setPanel);
	const go = (id) => {
		setPanel(id);
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative min-h-[88vh] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/hero.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-[88vh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.28em] text-gold",
						children: "Local NVIDIA studio · Golden Hour"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 max-w-4xl font-display text-6xl leading-[0.92] text-fg md:text-8xl",
						children: ["Maestro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-gold",
							children: "v1.8.7.1"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-lg text-muted md:text-xl",
						children: "Interactive studio — models, every control, and hardware-aware settings."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm text-subtle",
						children: "Maestro is typically launched as a Pinokio app. This console stays inside the product."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								onClick: () => go("studio"),
								children: "Enter Studio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "secondary",
								onClick: () => go("director"),
								children: "Enter Director"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "ghost",
								onClick: () => go("hardware"),
								children: "Open Hardware Advisor"
							})
						]
					})
				]
			})
		]
	});
}
function SectionHeader({ kicker, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-8 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.22em] text-gold",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-4xl text-fg md:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base leading-relaxed text-muted",
				children: lede
			})
		]
	});
}
var tone = {
	beginner: "border-gold/35 text-gold",
	pro: "border-paper/40 text-paper",
	fast: "border-safe/50 text-safe",
	heavy: "border-crash/50 text-crash",
	"audio-native": "border-gold-bright/40 text-gold-bright",
	"long-form": "border-muted/50 text-muted"
};
function Badge({ id, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-full border px-2 font-mono text-[10px] uppercase tracking-[0.14em]", tone[id], className),
		children: BADGE_LABELS[id]
	});
}
function StatusDot({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]", {
			comfortable: "bg-safe text-bg",
			tight: "bg-warn text-bg",
			crash: "bg-crash text-fg"
		}[status]),
		children: {
			comfortable: "Comfortable",
			tight: "Tight",
			crash: "Likely crash"
		}[status]
	});
}
var GOALS$1 = [
	"talking",
	"music-video",
	"stills",
	"long-sequence",
	"low-vram"
];
function ModelsGallery() {
	const [goal, setGoal] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)("h3-omni-pruned");
	const setModel = useConsole((s) => s.setModel);
	const setMode = useConsole((s) => s.setMode);
	const setPanel = useConsole((s) => s.setPanel);
	const filtered = (0, import_react.useMemo)(() => {
		if (goal === "all") return MODELS;
		return MODELS.filter((m) => m.goals.includes(goal));
	}, [goal]);
	const enter = (m) => {
		setMode(m.kind);
		setModel(m.id);
		setPanel("studio");
		document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "models",
		className: "scroll-mt-24 px-5 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					kicker: "01 · Models",
					title: "Pick the engine, then the personality.",
					lede: "Three galleries. Each card starts in plain English. Open it for tradeoffs, VRAM, and when the default is a waste."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold",
						children: "I want"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chooser, {
							active: goal === "all",
							onClick: () => setGoal("all"),
							children: "Everything"
						}), GOALS$1.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chooser, {
							active: goal === g,
							onClick: () => setGoal(g),
							children: GOAL_LABELS[g]
						}, g))]
					})]
				}),
				[
					"video",
					"image",
					"audio"
				].map((kind) => {
					const rows = modelsByKind(kind).filter((m) => filtered.includes(m));
					if (!rows.length) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 font-display text-3xl capitalize text-fg",
								children: kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
								children: rows.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "spotlight bezel overflow-hidden rounded-xl border border-border bg-surface",
									onMouseMove: (e) => {
										const r = e.currentTarget.getBoundingClientRect();
										e.currentTarget.style.setProperty("--lx", `${e.clientX - r.left}px`);
										e.currentTarget.style.setProperty("--ly", `${e.clientY - r.top}px`);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "block w-full text-left",
										onClick: () => setOpen(open === m.id ? null : m.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative h-36 overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: m.image,
												alt: "",
												className: "size-full object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-surface to-transparent" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
													children: m.maestroLabel
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
													className: "mt-1 font-display text-2xl text-fg",
													children: [m.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-2 text-lg text-muted",
														children: m.variant
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm text-muted",
													children: m.blurb
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex flex-wrap gap-1.5",
													children: [m.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { id: b }, b)), m.typical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] uppercase tracking-[0.12em] text-subtle",
														children: "Typical Studio control"
													}) : null]
												})
											]
										})]
									}), open === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "shutter-open space-y-3 border-t border-border px-4 py-4 text-sm text-muted",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: "Pro. "
											}), m.pro] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: "Motion. "
											}), m.motion] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: "Audio. "
											}), m.audio] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: "Resolution. "
											}), m.resolution] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: "Window. "
											}), m.window] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-fg",
													children: "VRAM / RAM. "
												}),
												m.vram,
												" ",
												m.ram
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: "Pick this if. "
											}), m.pickIf] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												onClick: () => enter(m),
												children: "Load in Studio"
											})
										]
									}) : null]
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comparison, {
								kind,
								rows
							})
						]
					}, kind);
				})
			]
		})
	});
}
function Chooser({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em]", active ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg"),
		children
	});
}
function Comparison({ kind, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 overflow-x-auto rounded-xl border border-border bg-inset",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[720px] text-left text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("caption", {
					className: "sr-only",
					children: [kind, " comparison"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "font-mono text-[10px] uppercase tracking-[0.14em] text-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Model"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Audio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Window / length"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "VRAM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Pick this if"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/70 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-fg",
							children: m.maestroLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-muted",
							children: m.audio
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-muted",
							children: m.window
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-muted",
							children: m.vram
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-muted",
							children: m.pickIf
						})
					]
				}, m.id)) })
			]
		})
	});
}
var OVERVIEW = {
	pinokio: "Maestro is typically launched as a Pinokio app. This console stays inside the product.",
	version: "v1.8.7.1 · August 2026 · 100% local NVIDIA studio",
	cores: [
		{
			name: "Studio",
			what: "Manual. You pick the model, the refs, the windows, the LoRAs. Every knob in this replica lives here."
		},
		{
			name: "Director",
			what: "LLM-planned. One prompt becomes a music video or a short film: analyze → screenplay → shot plan → start frames → clips → polish → assemble."
		},
		{
			name: "Edit",
			what: "After a take exists: Retake, Edit Anything, Outpaint, Repaint, Recast."
		}
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
				"Workspace switcher"
			]
		},
		{
			zone: "Main feed",
			items: [
				"Gallery of stills and clips for the active workspace",
				"Queue and current generate",
				"Director dashboard when that core is active"
			]
		},
		{
			zone: "Settings drawer",
			items: [
				"Model visibility (LTX-2.5 Dev / NVFP4, extra checkpoints)",
				"Performance Auto-Tune and VRAM safety coefficient",
				"Local LLM (Gemma 4 4B default) and external providers",
				"Theme: Golden Hour / Classic / Onyx, Dark / Light / Auto",
				"Mature / NSFW gate (opt-in, disclaimer)",
				"Experimental gate (external keys, Voice Reference, Inpaint, Restyle, Wan2GP Enhancer)"
			]
		}
	],
	extras: [
		{
			name: "Workspaces",
			what: "Isolated output directories with a sidebar switcher. Pins and favorites are per workspace. Use them for clients, SFW / Mature, or experiments."
		},
		{
			name: "Recipes",
			what: "Stored console states — model, prompt, LoRAs, knobs. Replay a known-good setup instead of reconstructing it from memory."
		},
		{
			name: "CivitAI LoRA browser",
			what: "Search, filter, one-click install, update badges, My LoRAs. AI prompt guides with examples and recommended weights, applied when you select the adapter. Multi-LoRA packs auto-extract."
		},
		{
			name: "Local LLM auto-unload",
			what: "llama-server plus a GGUF (Gemma 4 4B recommended) load for Director, Prompt Enhance, and LoRA guides, then unload after 60 s idle so the video model can take the GPU back. Larger Gemma / Qwen3.6 27B variants will not sit beside Full 33B."
		}
	]
};
function OverviewSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "overview",
		className: "scroll-mt-24 border-t border-border px-5 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					kicker: "02 · Overview",
					title: "A map of the real app.",
					lede: OVERVIEW.pinokio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted",
					children: OVERVIEW.version
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: OVERVIEW.cores.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bezel rounded-xl border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl text-gold",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: c.what
						})]
					}, c.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 lg:grid-cols-3",
					children: OVERVIEW.layout.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-border bg-inset p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-[11px] uppercase tracking-[0.16em] text-gold",
							children: z.zone
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted",
							children: z.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-l border-gold/30 pl-3",
								children: item
							}, item))
						})]
					}, z.zone))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-2",
					children: OVERVIEW.extras.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl text-fg",
							children: e.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: e.what
						})]
					}, e.name))
				})
			]
		})
	});
}
var VIDEO = [
	"h3",
	"ltx25",
	"ltx23",
	"wan",
	"hunyuan"
];
var H3 = ["h3"];
var WAN = ["wan"];
var IMAGE = [
	"flux",
	"krea",
	"qwen"
];
var MUSIC = ["music3", "acestep"];
var CONTROLS = [
	{
		id: "mode",
		maestroName: "Studio mode",
		group: "model",
		families: "*",
		what: "Switches the left rail between Video, Image, and Audio. The model list, workflows, and almost every advanced knob rebuild when this changes.",
		beginner: "Stay on Video until you need a start frame or a song.",
		beginnerDefault: "Video",
		leaveAlone: "Don't hop modes mid-queue. Finish or cancel the job first.",
		badges: ["beginner"],
		kind: "chips",
		options: [
			{
				value: "video",
				label: "Video"
			},
			{
				value: "image",
				label: "Image"
			},
			{
				value: "audio",
				label: "Audio"
			}
		]
	},
	{
		id: "model",
		maestroName: "Model",
		group: "model",
		families: "*",
		what: "Picks the checkpoint family. Hidden models (LTX-2.5 Dev / NVFP4, uncensored LLM variants) appear only after Settings → model visibility, and NSFW models only after Mature mode.",
		beginner: "H3 Omni Pruned for talking. LTX-2.5 Distilled for music video. Flux Klein for start frames.",
		beginnerDefault: "H3 Omni · Pruned 20B",
		leaveAlone: "If a resolution or duration control vanishes, the new model never offered it. That is not a bug.",
		badges: ["beginner"],
		kind: "select"
	},
	{
		id: "h3-variant",
		maestroName: "H3 First & Last / Omni",
		group: "model",
		families: H3,
		what: "First & Last (FL2VA) takes zero, one, or two images — start, end, or both. Omni (Ref2VA) takes labelled image, video, and audio refs. They do not mix in one pass.",
		beginner: "Have a start frame? First & Last. Have a person, a voice, and a room? Omni.",
		beginnerDefault: "Omni for talking; First & Last for Director seamless shots.",
		leaveAlone: "Do not hunt for a first-frame slot on Omni. Change variant instead.",
		badges: ["beginner", "audio-native"],
		kind: "chips",
		options: [{
			value: "fl",
			label: "First & Last"
		}, {
			value: "omni",
			label: "Omni"
		}]
	},
	{
		id: "h3-size",
		maestroName: "Pruned 20B / Full 33B",
		group: "model",
		families: H3,
		what: "Weight count. Pruned 20B is the recommended daily checkpoint. Full 33B is optional fidelity for faces, teeth, and audio edges.",
		beginner: "Pruned. Always, until a hero close-up on a 24 GB card says otherwise.",
		beginnerDefault: "Pruned 20B",
		low: "Pruned: less VRAM, Turbo-friendly, the 12 GB path.",
		high: "Full: more RAM and VRAM, easy to waste on 8 s drafts.",
		leaveAlone: "If you cannot tell Pruned from Full at 768-class, Full is a waste.",
		badges: ["pro", "heavy"],
		kind: "chips",
		options: [{
			value: "pruned",
			label: "Pruned 20B"
		}, {
			value: "full",
			label: "Full 33B"
		}]
	},
	{
		id: "workflow",
		maestroName: "Workflow",
		group: "workflow",
		families: VIDEO,
		what: "How the model is conditioned: text only, start frames, Omni refs, audio-driven, v2v / mask, blend, extend, injection.",
		beginner: "Match the files you actually have. Empty ref slots do not make Omni smarter.",
		beginnerDefault: "Depends on model — Omni or Text / image to video.",
		leaveAlone: "Changing workflow mid-prompt often zeros illegal refs. Read the inspector before you click.",
		badges: ["beginner"],
		kind: "select"
	},
	{
		id: "aspect",
		maestroName: "Aspect ratio",
		group: "format",
		families: [...VIDEO, ...IMAGE],
		what: "Frame shape. H3 follows a fixed family (21:9 through 9:16). First & Last can inherit the start image. Director locks this after planning.",
		beginner: "16:9 for landscape, 9:16 for vertical. Match the start frame.",
		beginnerDefault: "16:9",
		leaveAlone: "Do not change aspect after you painted start frames. You will crop the identity you just locked.",
		badges: ["beginner"],
		kind: "select",
		options: [
			{
				value: "16:9",
				label: "16:9"
			},
			{
				value: "9:16",
				label: "9:16"
			},
			{
				value: "21:9",
				label: "21:9"
			},
			{
				value: "1:1",
				label: "1:1"
			},
			{
				value: "4:3",
				label: "4:3"
			},
			{
				value: "3:4",
				label: "3:4"
			}
		]
	},
	{
		id: "resolution",
		maestroName: "Resolution",
		group: "format",
		families: [...VIDEO, ...IMAGE],
		what: "Output size. 1080p is not a universal menu item. H3's heavy path is a 1440 short edge (2K-class), often drafted lower locally. LTX is megapixel-based. Wan is often 480p / 720p. Missing entries mean the checkpoint cannot do them.",
		beginner: "Start at the lowest listed draft. Upscale later.",
		beginnerDefault: "Match output / 768-class / 0.4 MP — whatever the model lists first.",
		low: "Draft sizes: faster, less VRAM, worse pores and type.",
		high: "2K-class or 2 MP: time and VRAM scale badly. OOM lives here.",
		leaveAlone: "If Auto-Tune greyed a size out, believe it.",
		badges: ["beginner", "heavy"],
		kind: "select"
	},
	{
		id: "duration",
		maestroName: "Duration",
		group: "format",
		families: VIDEO,
		what: "Requested length. H3 native is ~14.4 s (345 frames at 24 fps). Longer becomes multi-window. LTX grows each native pass to its ceiling before adding windows, unless you lock a shorter window. Music3 uses a different, 5 s–5 min control.",
		beginner: "8–10 s while learning. Do not type 40 s into H3 and expect one pass.",
		beginnerDefault: "8 s (H3) or a short LTX window",
		low: "4–6 s: cheap iterates, less story.",
		mid: "8–14.4 s: one native H3 thought.",
		high: "Above native: overlap, seams, more VRAM-time, Director clip counts.",
		leaveAlone: "A performance timeline on H3 Omni will adopt the audio duration and enable multi-window for you.",
		badges: ["beginner", "long-form"],
		kind: "slider",
		min: 4,
		max: 60,
		step: .4,
		unit: "s"
	},
	{
		id: "fps",
		maestroName: "FPS",
		group: "format",
		families: VIDEO,
		what: "H3 is 24 fps. Other families may list 16 / 24 / 25 / 30 depending on checkpoint. This is not a retiming tool — it is the model cadence.",
		beginner: "Leave 24.",
		beginnerDefault: "24",
		leaveAlone: "Do not force 30 on H3. You will not get extra motion; you will get a confused VAE grid.",
		badges: ["pro"],
		kind: "select",
		options: [
			{
				value: "16",
				label: "16"
			},
			{
				value: "24",
				label: "24"
			},
			{
				value: "25",
				label: "25"
			},
			{
				value: "30",
				label: "30"
			}
		]
	},
	{
		id: "windows",
		maestroName: "Windows / sliding window",
		group: "format",
		families: VIDEO,
		what: "How a long job is sliced. Each window is one native forward pass. Overlap / sliding window blends tails so a one-take can continue.",
		beginner: "Let the app size windows. Only lock a shorter window if VRAM demands it.",
		beginnerDefault: "Auto (grow native pass, then add windows)",
		low: "Many short windows: more cuts in spirit, more chance of reset unless prompts are per-window.",
		high: "Max native window: fewer seams, more VRAM per pass.",
		leaveAlone: "On LTX seamless one-takes, later windows must not invent cuts or slow down. If they do, the AI plan — not the overlap slider — is wrong.",
		badges: ["long-form", "pro"],
		kind: "slider",
		min: 1,
		max: 12,
		step: 1,
		unit: "windows"
	},
	{
		id: "overlap",
		maestroName: "Overlap",
		group: "format",
		families: VIDEO,
		what: "Shared seconds between consecutive windows. Too little and you get a jump cut. Too much and motion stalls or identities smear.",
		beginner: "About one second, or whatever Auto-Tune wrote.",
		beginnerDefault: "1.0 s typical",
		low: "0.3–0.5 s: visible seam, useful if you want a cut.",
		mid: "0.8–1.2 s: default one-take glue.",
		high: "2 s+: safer continuity, slower, more chance of 'breathing' in place.",
		leaveAlone: "If Seamless already looks glued, do not chase the last 4 frames with overlap.",
		badges: ["long-form"],
		kind: "slider",
		min: .2,
		max: 3,
		step: .1,
		unit: "s",
		typical: true
	},
	{
		id: "prompt",
		maestroName: "Prompt",
		group: "prompt",
		families: "*",
		what: "The instruction. For H3, write like a director: who speaks, what the camera does, when it is silent. For Wan / Hunyuan, write like a shot description. For Music3, write sections and lyrics, not a film treatment.",
		beginner: "One paragraph. Named people. Present tense. No novel.",
		beginnerDefault: "Empty — this replica will not generate.",
		leaveAlone: "If Prompt Enhance is on, your text is a brief, not the final token string. Read the enhanced version before you queue.",
		badges: ["beginner"],
		kind: "text"
	},
	{
		id: "prompt-enhance",
		maestroName: "H3 Prompt Enhance / Context-IR",
		group: "prompt",
		families: H3,
		what: "Local preprocessing that turns free-form multimodal notes into a Context Intermediate Representation: speaker IDs, dialogue, silence, and how refs relate to the shot. H3 quality depends on this more than on purple prose.",
		beginner: "On, unless you already write H3-native prompts.",
		beginnerDefault: "On",
		leaveAlone: "If it drops a line you needed, turn it off and write speaker tags yourself. Do not stack a second LLM rewrite on top.",
		badges: ["pro", "audio-native"],
		kind: "toggle"
	},
	{
		id: "negative",
		maestroName: "Negative prompt",
		group: "prompt",
		families: [
			...VIDEO,
			...IMAGE,
			...WAN
		],
		what: "What to avoid. Useful on Wan / LTX / image. On H3 it is weaker than a well-structured positive with silence and speaker IDs.",
		beginner: "Skip on H3. On Wan, a short list of artifacts is enough.",
		beginnerDefault: "Empty on H3",
		leaveAlone: "A paragraph of negatives will not fix a bad start frame.",
		badges: ["pro"],
		kind: "text",
		typical: true
	},
	{
		id: "refs",
		maestroName: "References",
		group: "refs",
		families: H3,
		what: "Omni budget: up to about 9 images, 3 videos (combined duration inside the native window), 3 audio. Assign a role: identity, appearance, scene, motion, voice, performance, ambience, music. Performance audio is the soundtrack; Voice / Style are not.",
		beginner: "One identity still, one voice or performance clip, one scene still. Stop.",
		beginnerDefault: "None",
		low: "1–2 refs: the model invents more. Fine for exploration.",
		mid: "3–5: the daily talking setup.",
		high: "Full budget: VRAM first, then identity fights if two faces share 'identity'.",
		leaveAlone: "First & Last does not take nine images. Switch to Omni or stop adding slots.",
		badges: ["pro", "audio-native"],
		kind: "refs"
	},
	{
		id: "injection",
		maestroName: "Timed frame injection / KFI",
		group: "workflow",
		families: [
			"h3",
			"ltx25",
			"ltx23"
		],
		what: "Insert stills at timestamps so a long take can hit new poses or keep a character on-model without restarting the shot.",
		beginner: "Use when a mid-shot face drift bothers you. Not a substitute for a good first frame.",
		beginnerDefault: "Off",
		leaveAlone: "Injecting every second fights the motion model. Two or three beats is a plan; twenty is a collage.",
		badges: ["pro", "long-form"],
		kind: "toggle"
	},
	{
		id: "audio-driven",
		maestroName: "Audio-driven video",
		group: "workflow",
		families: [
			"h3",
			"ltx25",
			"ltx23"
		],
		what: "Picture follows an audio file: lips, rhythm, energy. On LTX-2.3 this is the soundtrack path. On LTX-2.5 Director, vocal shots lock to exact song segments. On H3 Omni, performance timeline is the stricter cousin.",
		beginner: "On for music videos and dialogue you already recorded.",
		beginnerDefault: "Off unless a track is loaded",
		leaveAlone: "v1.8.7: LTX-2.3 was dropping this after model changes even with a soundtrack selected. If the take is silent, check this first.",
		badges: ["audio-native"],
		kind: "toggle"
	},
	{
		id: "v2a",
		maestroName: "Video-to-audio",
		group: "workflow",
		families: H3,
		what: "Write a soundtrack for an existing picture using H3's native audio head, rather than MMAudio after the fact.",
		beginner: "Use when the picture is right and the bed is wrong.",
		beginnerDefault: "Off",
		leaveAlone: "Do not run this on a clip whose native audio you already like.",
		badges: ["audio-native", "pro"],
		kind: "toggle"
	},
	{
		id: "v2v",
		maestroName: "Video-to-video / mask denoise",
		group: "workflow",
		families: VIDEO,
		what: "Restyle or locally edit an existing clip. Mask denoise controls how much of the source motion/pixels survive. Typical Studio control: think of denoise like img2img strength.",
		beginner: "Low denoise to keep motion. High denoise to replace the world.",
		beginnerDefault: "Off / 0.35 if on",
		low: "0.15–0.3: grade, wardrobe tint, keep acting.",
		mid: "0.4–0.55: restyle, risky on faces.",
		high: "0.7+: new shot with a motion hint. Seams and identity loss.",
		leaveAlone: "If Recast or Repaint (SCAIL-2) is the real job, use Edit tools instead of cranking denoise.",
		badges: ["pro"],
		kind: "slider",
		min: .1,
		max: 1,
		step: .05,
		unit: "denoise",
		typical: true
	},
	{
		id: "blend",
		maestroName: "Blend video",
		group: "workflow",
		families: VIDEO,
		what: "Overlap two clips and let the model interpolate the join — the Sora-1-style blend. Not the same as sliding-window continuation of one shot.",
		beginner: "Use to connect two already-good takes. Not a way to hide a bad prompt.",
		beginnerDefault: "Off",
		leaveAlone: "If both clips already share a Seamless tail, you want continuation, not blend.",
		badges: ["pro"],
		kind: "toggle"
	},
	{
		id: "ai-plan",
		maestroName: "Multi-window AI plan",
		group: "workflow",
		families: VIDEO,
		what: "One LLM pass writes a standalone prompt for every window: camera, identity, lighting, audio, continuity. Alternative: you type one prompt per window by hand.",
		beginner: "On for anything longer than one native window, then read the plan before generate.",
		beginnerDefault: "On when duration exceeds native window",
		leaveAlone: "If later windows reset, invent cuts, or resolve an action you wanted to hold, edit the plan. Do not just raise overlap.",
		badges: ["long-form", "pro"],
		kind: "toggle"
	},
	{
		id: "steps",
		maestroName: "Steps",
		group: "sampling",
		families: [...VIDEO, ...IMAGE],
		what: "How many denoising evaluations. H3 Turbo uses true 4 / 6 / 8-eval schedules. LTX-2.5 Distilled is an 8-step base plus a 3-step refine. Wan still lives in the 20–50 world.",
		beginner: "Use the model's default. Turbo is a schedule, not a suggestion to type 4 on a non-Turbo path.",
		beginnerDefault: "Model default (8 Distilled, 20–30 Wan, Turbo 4–8)",
		low: "Fewer: faster, mushier hands, brittle audio on native-audio models.",
		high: "More: diminishing returns, more time, sometimes overcooked texture.",
		leaveAlone: "If Turbo is on, do not also double the steps 'for quality'. You just left the Turbo schedule.",
		badges: ["pro"],
		kind: "slider",
		min: 4,
		max: 50,
		step: 1
	},
	{
		id: "guidance",
		maestroName: "Guidance",
		group: "sampling",
		families: [...VIDEO, ...IMAGE],
		what: "How hard the model is pulled toward the prompt. Typical Studio control: H3 and LTX-2.5 Director lock some conditioning strengths to 1.0 because those sliders are not meaningful on those paths.",
		beginner: "Leave default. If the model ignores you, fix the prompt and refs before you crank this.",
		beginnerDefault: "Model default",
		low: "More surprise, worse prompt hold, sometimes nicer motion.",
		high: "Literal, brittle, over-saturated, hands freeze.",
		leaveAlone: "If the slider is hidden or locked, v1.8.5 did that on purpose for H3 / LTX-2.5 Director.",
		badges: ["pro"],
		kind: "slider",
		min: 1,
		max: 12,
		step: .5,
		typical: true
	},
	{
		id: "seed",
		maestroName: "Seed",
		group: "sampling",
		families: "*",
		what: "Reproducibility. Same seed + same refs + same weights ≈ same take. Changing a LoRA or a single ref invalidates the comparison.",
		beginner: "Random while exploring. Lock when you retake.",
		beginnerDefault: "Random",
		leaveAlone: "A lucky seed will not rescue Full 33B on 8 GB.",
		badges: ["beginner"],
		kind: "text"
	},
	{
		id: "turbo",
		maestroName: "Turbo LoRA",
		group: "accel",
		families: H3,
		what: "H3 speed LoRA with 4 / 6 / 8-evaluation schedules. Works on recommended Pruned 20B and compatible Full 33B. Incompatible Turbo + Pruned combos are rejected rather than silently degraded.",
		beginner: "On for drafts. Off for the take you will show someone.",
		beginnerDefault: "On for Pruned drafts",
		low: "4 eval: fastest, softest.",
		mid: "6: daily.",
		high: "8: closer to base, still far cheaper than full.",
		leaveAlone: "If the selector says incompatible, believe it. Do not mix leftover Turbo files across FL and Omni blindly.",
		badges: ["fast"],
		kind: "toggle"
	},
	{
		id: "sol",
		maestroName: "Sol Engine",
		group: "accel",
		families: H3,
		what: "Experimental sparse-attention path for RTX 40 / 50. Not available on RTX 30. Linux can fall back to Sol/SDPA if attention wheels fail. Faster when it works; a science experiment when it does not.",
		beginner: "Off until a take is already good. Then A/B.",
		beginnerDefault: "Off",
		leaveAlone: "If the 30-series picker shows it at all, ignore it. If 40/50 is unstable, turn this off before you touch resolution.",
		badges: ["pro", "fast"],
		kind: "toggle"
	},
	{
		id: "fbc",
		maestroName: "First Block Cache",
		group: "accel",
		families: H3,
		what: "Skips redundant compute in early transformer blocks on similar frames. Speed with a risk of sticky motion or delayed action.",
		beginner: "Off for dialogue close-ups. On for locked-off wide drafts.",
		beginnerDefault: "Off",
		leaveAlone: "If a character 'unfreezes' late in the window, this was the first suspect. Disable before you blame the prompt.",
		badges: ["fast", "pro"],
		kind: "toggle",
		typical: true
	},
	{
		id: "lora",
		maestroName: "LoRAs",
		group: "lora",
		families: "*",
		what: "Side adapters from the built-in CivitAI browser. AI prompt guides and recommended weights are applied when the LoRA is selected. Multi-LoRA packs unpack automatically. H3 is less LoRA-centric than LTX-2.3 / Wan.",
		beginner: "One LoRA. Stay inside the printed recommended range.",
		beginnerDefault: "None",
		low: "0.3–0.5: a hint. Style survives; identity may not.",
		mid: "Recommended band (often 0.6–0.85 for characters).",
		high: "1.0+ : fried faces, conflicting adapters, VRAM spikes.",
		leaveAlone: "If two character LoRAs fight, delete one. Do not average them at 0.9 each.",
		badges: ["pro"],
		kind: "lora"
	},
	{
		id: "queue",
		maestroName: "Queue / Cancel",
		group: "queue",
		families: "*",
		what: "Jobs run one after another. Cancel drops the active GPU job; it will not unsplice a Director assemble. Recipes store the current console (model, prompt, LoRAs, knobs) for replay.",
		beginner: "Queue drafts overnight. Cancel as soon as the first seconds are obviously wrong.",
		beginnerDefault: "Idle",
		leaveAlone: "Do not cancel an assemble unless you are ready to rejoin from the dashboard.",
		badges: ["beginner"],
		kind: "button"
	},
	{
		id: "post-upscale",
		maestroName: "Spatial upsampling",
		group: "post",
		families: VIDEO,
		what: "After the clip exists, scale it. Cheaper than generating at 2K. H3's hosted 2K path is a dedicated regenerate; local upsampling is the practical substitute.",
		beginner: "Generate small, upscale the keeper.",
		beginnerDefault: "Off",
		leaveAlone: "Upscaling will not fix a bad mouth. Retake or Edit first.",
		badges: ["fast"],
		kind: "toggle"
	},
	{
		id: "post-grain",
		maestroName: "Film grain",
		group: "post",
		families: VIDEO,
		what: "Post grain. Hides a little banding. Does not create a film look by itself.",
		beginner: "Low, after you like the take.",
		beginnerDefault: "Off",
		low: "A whisper. Useful on LTX skies.",
		high: "You are now grading sand.",
		leaveAlone: "Do not grain a clip you still plan to Edit / Outpaint.",
		badges: ["beginner"],
		kind: "slider",
		min: 0,
		max: 1,
		step: .05,
		typical: true
	},
	{
		id: "codec",
		maestroName: "Codec",
		group: "post",
		families: VIDEO,
		what: "How the file is written. Typical Studio control: a delivery codec (H.264 / H.265 / ProRes-class if listed) plus audio stream. Native H3 audio is 32 kHz stereo — do not downsample it 'to save space' on the master.",
		beginner: "Leave the default master. Transcode later for social.",
		beginnerDefault: "App default",
		leaveAlone: "A small file is not a better take.",
		badges: ["pro"],
		kind: "select",
		typical: true
	},
	{
		id: "music3-duration",
		maestroName: "Song duration",
		group: "format",
		families: MUSIC,
		what: "Music3: 5 s to 5 min, two-minute default. The writer scales lyrics and arrangement to this number instead of padding a short idea to album length.",
		beginner: "90–120 s for a Director music video.",
		beginnerDefault: "120 s",
		low: "5–30 s: motifs, stings.",
		high: "4–5 min: RAM, time, and a Director plan with many clips.",
		leaveAlone: "Do not ask H3 to cover a 5-minute song in one window. That is what clip counts are for.",
		badges: ["audio-native", "heavy"],
		kind: "slider",
		min: 5,
		max: 300,
		step: 5,
		unit: "s"
	}
];
function controlsForFamily(family) {
	return CONTROLS.filter((c) => c.families === "*" || family !== "*" && c.families.includes(family));
}
function controlById(id) {
	return CONTROLS.find((c) => c.id === id);
}
function Inspector() {
	const id = useConsole((s) => s.inspectorId);
	const close = useConsole((s) => s.closeInspector);
	const control = id ? controlById(id) : void 0;
	if (!control) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "shutter-open flex h-full min-h-0 flex-col border-l border-border bg-surface",
		role: "dialog",
		"aria-labelledby": "inspector-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3 border-b border-border px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.18em] text-gold",
					children: "Inspector"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "inspector-title",
					className: "mt-1 font-display text-2xl text-fg",
					children: control.maestroName
				}),
				control.typical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted",
					children: "Typical Studio control"
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: close,
				"aria-label": "Close inspector",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: control.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { id: b }, b))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "What this does",
					body: control.what
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "Beginner",
					body: `${control.beginner} Default: ${control.beginnerDefault}`
				}),
				control.low || control.mid || control.high ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
					children: "Low / mid / high"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-2 space-y-2 text-sm text-muted",
					children: [
						control.low ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-medium text-fg",
							children: "Low"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: control.low })] }) : null,
						control.mid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-medium text-fg",
							children: "Mid"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: control.mid })] }) : null,
						control.high ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-medium text-fg",
							children: "High"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: control.high })] }) : null
					]
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "When to leave it alone",
					body: control.leaveAlone
				})
			]
		})]
	});
}
function Block({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm leading-relaxed text-muted",
		children: body
	})] });
}
function Knob({ controlId, label, children, className }) {
	const open = useConsole((s) => s.openInspector);
	const active = useConsole((s) => s.inspectorId === controlId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md border border-transparent p-2 transition-colors duration-150", active ? "border-gold/40 bg-gold/5" : "hover:border-border", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1.5 flex items-center justify-between gap-2",
			children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => open(controlId),
				className: "text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-gold",
				children: label
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => open(controlId),
				className: "font-mono text-[10px] uppercase tracking-[0.12em] text-gold/70 hover:text-gold",
				children: "Explain"
			})]
		}), children]
	});
}
var REF_ROLES = [
	"identity",
	"appearance",
	"scene",
	"motion",
	"voice",
	"performance",
	"ambience",
	"music"
];
function StudioConsole() {
	const studio = useConsole((s) => s.studio);
	const setStudio = useConsole((s) => s.setStudio);
	const setMode = useConsole((s) => s.setMode);
	const setModel = useConsole((s) => s.setModel);
	const enqueue = useConsole((s) => s.enqueue);
	const cancelJob = useConsole((s) => s.cancelJob);
	const inspectorId = useConsole((s) => s.inspectorId);
	const model = modelById(studio.modelId) ?? MODELS[0];
	const family = model.family;
	const visible = (0, import_react.useMemo)(() => new Set(controlsForFamily(family).map((c) => c.id)), [family]);
	const has = (id) => visible.has(id);
	const models = MODELS.filter((m) => m.kind === studio.mode);
	const generate = () => {
		enqueue();
		toast("Queued in the replica. This console does not run local models.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "studio",
		className: "scroll-mt-24 border-t border-border px-5 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				kicker: "03 · Studio",
				title: "Every important control, clickable.",
				lede: "A teaching replica of Studio. Switch models and watch knobs appear and disappear. Click Explain on any control."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bezel overflow-hidden rounded-xl border border-border bg-bg-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.18em] text-gold",
						children: ["Studio · ", model.maestroLabel]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden font-mono text-[10px] uppercase tracking-[0.14em] text-subtle md:block",
						children: "Golden Hour · workspace: teaching"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-[240px_minmax(0,1fr)_minmax(280px,340px)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftRail, {
							mode: studio.mode,
							family,
							models,
							modelId: studio.modelId,
							workflow: studio.workflow,
							workflows: model.workflows,
							loras: studio.loras,
							has,
							onMode: setMode,
							onModel: setModel,
							onWorkflow: (workflow) => setStudio({ workflow }),
							onLora: (id, weight) => setStudio({ loras: studio.loras.map((l) => l.id === id ? {
								...l,
								weight
							} : l) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 border-t border-border lg:border-l lg:border-t-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "console-grid space-y-1 p-3 md:p-4",
								children: [
									has("h3-variant") || has("h3-size") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-2",
										children: [has("h3-variant") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											controlId: "h3-variant",
											label: "First & Last / Omni",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
												value: family === "h3" && model.variant.includes("Omni") ? "omni" : "fl",
												options: [{
													value: "fl",
													label: "First & Last"
												}, {
													value: "omni",
													label: "Omni"
												}],
												onChange: (v) => setModel(v === "omni" ? model.variant.includes("Full") ? "h3-omni-full" : "h3-omni-pruned" : model.variant.includes("Full") ? "h3-fl-full" : "h3-fl-pruned")
											})
										}) : null, has("h3-size") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											controlId: "h3-size",
											label: "Pruned 20B / Full 33B",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
												value: model.variant.includes("Full") ? "full" : "pruned",
												options: [{
													value: "pruned",
													label: "Pruned 20B"
												}, {
													value: "full",
													label: "Full 33B"
												}],
												onChange: (v) => setModel(model.variant.includes("Omni") ? v === "full" ? "h3-omni-full" : "h3-omni-pruned" : v === "full" ? "h3-fl-full" : "h3-fl-pruned")
											})
										}) : null]
									}) : null,
									has("aspect") || has("resolution") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-2",
										children: [has("aspect") && model.aspects.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											controlId: "aspect",
											label: "Aspect ratio",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
												value: studio.aspect,
												onChange: (e) => setStudio({ aspect: e.target.value }),
												children: model.aspects.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: a }, a))
											})
										}) : null, has("resolution") && model.resolutions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											controlId: "resolution",
											label: "Resolution",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
												value: studio.resolution,
												onChange: (e) => setStudio({ resolution: e.target.value }),
												children: model.resolutions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: a }, a))
											})
										}) : null]
									}) : null,
									studio.mode === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
										children: [
											has("duration") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "duration",
												label: "Duration",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
													min: 4,
													max: model.maxNativeSec && !studio.aiPlan ? model.maxNativeSec : 60,
													step: .4,
													value: studio.duration,
													unit: "s",
													onChange: (duration) => setStudio({
														duration,
														windows: Math.max(1, Math.ceil(duration / (model.maxNativeSec ?? 14.4)))
													})
												})
											}) : null,
											has("fps") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "fps",
												label: "FPS",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "h-10 rounded-sm border border-border bg-inset px-3 leading-10 text-sm",
													children: [studio.fps, family === "h3" ? " · locked" : ""]
												})
											}) : null,
											has("windows") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "windows",
												label: "Windows",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
													min: 1,
													max: 12,
													step: 1,
													value: studio.windows,
													unit: "",
													onChange: (windows) => setStudio({ windows })
												})
											}) : null,
											has("overlap") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "overlap",
												label: "Overlap",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
													min: .2,
													max: 3,
													step: .1,
													value: studio.overlap,
													unit: "s",
													onChange: (overlap) => setStudio({ overlap })
												})
											}) : null
										]
									}) : null,
									has("music3-duration") && studio.mode === "audio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
										controlId: "music3-duration",
										label: "Song duration",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
											min: 5,
											max: 300,
											step: 5,
											value: studio.songDuration,
											unit: "s",
											onChange: (songDuration) => setStudio({ songDuration })
										})
									}) : null,
									has("prompt") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
										controlId: "prompt",
										label: "Prompt",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: studio.prompt,
											onChange: (e) => setStudio({ prompt: e.target.value }),
											rows: 5,
											placeholder: family === "h3" ? "INT. HARBOUR RADIO — NIGHT. ANA (30s) leans into the mic. She whispers, then waits through two seconds of silence…" : "Describe the shot. Present tense. One camera idea.",
											className: "w-full resize-y rounded-sm border border-border bg-inset p-3 text-sm leading-relaxed"
										})
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-2",
										children: [has("prompt-enhance") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											controlId: "prompt-enhance",
											label: "H3 Prompt Enhance / Context-IR",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
												on: studio.enhance,
												onChange: (enhance) => setStudio({ enhance }),
												onLabel: "On — speaker IDs, silence, dialogue retention",
												offLabel: "Off — you write H3-native"
											})
										}) : null, has("negative") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											controlId: "negative",
											label: "Negative prompt",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: studio.negative,
												onChange: (e) => setStudio({ negative: e.target.value }),
												className: "h-10 w-full rounded-sm border border-border bg-inset px-3 text-sm",
												placeholder: family === "h3" ? "Usually skip on H3" : "jitter, extra fingers"
											})
										}) : null]
									}),
									has("refs") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
										controlId: "refs",
										label: "References",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Refs, {
											refs: studio.refs,
											onAdd: () => {
												if (studio.refs.length >= 9) return;
												setStudio({ refs: [...studio.refs, {
													id: `r-${Date.now()}`,
													kind: "image",
													role: REF_ROLES[studio.refs.length % REF_ROLES.length],
													label: `Ref ${studio.refs.length + 1}`
												}] });
											},
											onRole: (id, role) => setStudio({ refs: studio.refs.map((r) => r.id === id ? {
												...r,
												role
											} : r) }),
											onKind: (id, kind) => setStudio({ refs: studio.refs.map((r) => r.id === id ? {
												...r,
												kind
											} : r) }),
											onRemove: (id) => setStudio({ refs: studio.refs.filter((r) => r.id !== id) })
										})
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-3",
										children: [
											has("steps") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "steps",
												label: "Steps",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
													min: 4,
													max: 50,
													step: 1,
													value: studio.steps,
													unit: "",
													onChange: (steps) => setStudio({ steps })
												})
											}) : null,
											has("guidance") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "guidance",
												label: "Guidance",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
													min: 1,
													max: 12,
													step: .5,
													value: studio.guidance,
													unit: "",
													onChange: (guidance) => setStudio({ guidance })
												})
											}) : null,
											has("seed") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "seed",
												label: "Seed",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: studio.seed,
													onChange: (e) => setStudio({ seed: e.target.value }),
													placeholder: "Random",
													className: "h-10 w-full rounded-sm border border-border bg-inset px-3 font-mono text-sm"
												})
											}) : null
										]
									}),
									(has("turbo") || has("sol") || has("fbc")) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-3",
										children: [
											has("turbo") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "turbo",
												label: "Turbo LoRA",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.turbo,
													onChange: (turbo) => setStudio({ turbo }),
													onLabel: "Draft schedule 4/6/8",
													offLabel: "Base quality"
												})
											}) : null,
											has("sol") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "sol",
												label: "Sol Engine",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.sol,
													onChange: (sol) => setStudio({ sol }),
													onLabel: "RTX 40/50 sparse attn",
													offLabel: "Off (default)"
												})
											}) : null,
											has("fbc") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "fbc",
												label: "First Block Cache",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.fbc,
													onChange: (fbc) => setStudio({ fbc }),
													onLabel: "Faster, sticky risk",
													offLabel: "Off"
												})
											}) : null
										]
									}),
									studio.mode === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
										children: [
											has("injection") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "injection",
												label: "Timed frame injection",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.injection,
													onChange: (injection) => setStudio({ injection }),
													onLabel: "KFI on",
													offLabel: "Off"
												})
											}) : null,
											has("audio-driven") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "audio-driven",
												label: "Audio-driven",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.audioDriven,
													onChange: (audioDriven) => setStudio({ audioDriven }),
													onLabel: "Picture follows track",
													offLabel: "Off"
												})
											}) : null,
											has("v2a") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "v2a",
												label: "Video-to-audio",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.v2a,
													onChange: (v2a) => setStudio({ v2a }),
													onLabel: "Write bed for picture",
													offLabel: "Off"
												})
											}) : null,
											has("v2v") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "v2v",
												label: "v2v / mask denoise",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
													min: .1,
													max: 1,
													step: .05,
													value: studio.v2v,
													unit: "",
													onChange: (v2v) => setStudio({ v2v })
												})
											}) : null,
											has("blend") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "blend",
												label: "Blend video",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.blend,
													onChange: (blend) => setStudio({ blend }),
													onLabel: "Overlap two clips",
													offLabel: "Off"
												})
											}) : null,
											has("ai-plan") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "ai-plan",
												label: "Multi-window AI plan",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.aiPlan,
													onChange: (aiPlan) => setStudio({ aiPlan }),
													onLabel: "One prompt per window",
													offLabel: "Single prompt"
												})
											}) : null
										]
									}) : null,
									studio.mode === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-3",
										children: [
											has("post-upscale") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "post-upscale",
												label: "Spatial upsampling",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
													on: studio.upscale,
													onChange: (upscale) => setStudio({ upscale }),
													onLabel: "Upscale keeper",
													offLabel: "Off"
												})
											}) : null,
											has("post-grain") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "post-grain",
												label: "Film grain",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
													min: 0,
													max: 1,
													step: .05,
													value: studio.grain,
													unit: "",
													onChange: (grain) => setStudio({ grain })
												})
											}) : null,
											has("codec") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
												controlId: "codec",
												label: "Codec",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
													value: studio.codec,
													onChange: (e) => setStudio({ codec: e.target.value }),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Default master" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "H.264" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "H.265" })
													]
												})
											}) : null
										]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Knob, {
										controlId: "queue",
										label: "Queue / recipes",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													onClick: generate,
													children: "Generate"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "secondary",
													onClick: () => toast("Recipe stored in this replica only."),
													children: "Save recipe"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-subtle",
													children: "Preview is empty on purpose. The replica teaches controls, not inference."
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-3 space-y-2",
											children: studio.queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
												className: "text-sm text-subtle",
												children: "Queue idle."
											}) : studio.queue.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center justify-between gap-3 rounded-sm border border-border bg-inset px-3 py-2 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [j.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted",
													children: j.status
												})] }), j.status !== "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "danger",
													onClick: () => cancelJob(j.id),
													children: "Cancel"
												}) : null]
											}, j.id))
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("min-h-[320px] border-t border-border lg:border-l lg:border-t-0", inspectorId ? "block" : "hidden lg:block"),
							children: inspectorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-col justify-between p-5 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.18em] text-gold",
										children: "Advanced drawer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3",
										children: "Click Explain on any knob. The list below is what this model currently exposes."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 space-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle",
										children: controlsForFamily(family).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c.maestroName }, c.id))
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: model.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { id: b }, b))
								})]
							})
						})
					]
				})]
			})]
		})
	});
}
function LeftRail({ mode, family, models, modelId, workflow, workflows, loras, has, onMode, onModel, onWorkflow, onLora }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "space-y-4 p-3 md:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
				controlId: "mode",
				label: "Mode",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
					value: mode,
					options: [
						{
							value: "video",
							label: "Video"
						},
						{
							value: "image",
							label: "Image"
						},
						{
							value: "audio",
							label: "Audio"
						}
					],
					onChange: (v) => onMode(v)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Knob, {
				controlId: "model",
				label: "Model",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
					value: modelId,
					onChange: (e) => onModel(e.target.value),
					children: models.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: m.id,
						children: m.maestroLabel
					}, m.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-subtle",
					children: [
						"Family ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold",
							children: family
						}),
						". Switching rebuilds the console."
					]
				})]
			}),
			has("workflow") && workflows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
				controlId: "workflow",
				label: "Workflow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
					value: workflow,
					onChange: (e) => onWorkflow(e.target.value),
					children: workflows.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: w }, w))
				})
			}) : null,
			has("lora") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
				controlId: "lora",
				label: "LoRAs",
				children: loras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: "No LoRAs on this path. The real app attaches CivitAI guides when you install one."
				}) : loras.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular font-mono text-gold",
								children: l.weight.toFixed(2)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1.2,
							step: .05,
							value: l.weight,
							onChange: (e) => onLora(l.id, Number(e.target.value)),
							className: "mt-1 w-full accent-gold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-subtle",
							children: ["Recommended ", l.rec]
						})
					]
				}, l.id))
			}) : null
		]
	});
}
function ChipRow({ value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(o.value),
			className: cn("rounded-sm border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em]", value === o.value ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg"),
			children: o.label
		}, o.value))
	});
}
function Toggle({ on, onChange, onLabel, offLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "switch",
		"aria-checked": on,
		onClick: () => onChange(!on),
		className: "flex w-full items-center justify-between gap-3 rounded-sm border border-border bg-inset px-3 py-2 text-left text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: on ? "text-fg" : "text-muted",
			children: on ? onLabel : offLabel
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("h-5 w-9 rounded-full p-0.5", on ? "bg-gold" : "bg-bezel"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-4 w-4 rounded-full bg-bg transition-transform", on && "translate-x-4") })
		})]
	});
}
function Range({ min, max, step, value, unit, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mb-1 block font-mono text-xs tabular text-gold",
			children: [value, unit]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "w-full accent-gold"
		})]
	});
}
function Refs({ refs, onAdd, onRole, onKind, onRemove }) {
	const images = refs.filter((r) => r.kind === "image").length;
	const videos = refs.filter((r) => r.kind === "video").length;
	const audio = refs.filter((r) => r.kind === "audio").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle",
		children: [
			images,
			"/9 images · ",
			videos,
			"/3 videos · ",
			audio,
			"/3 audio"
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 sm:grid-cols-2",
		children: [refs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sm border border-dashed border-gold/30 bg-inset p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-fg",
					children: r.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs text-crash",
					onClick: () => onRemove(r.id),
					children: "Remove"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "h-8 flex-1 rounded-sm border border-border bg-surface text-xs",
					value: r.kind,
					onChange: (e) => onKind(r.id, e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "image",
							children: "Image"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "video",
							children: "Video"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "audio",
							children: "Audio"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-8 flex-1 rounded-sm border border-border bg-surface text-xs",
					value: r.role,
					onChange: (e) => onRole(r.id, e.target.value),
					children: REF_ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: role }, role))
				})]
			})]
		}, r.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onAdd,
			className: "rounded-sm border border-dashed border-border px-3 py-4 text-sm text-muted hover:border-gold hover:text-gold",
			children: "Add reference"
		})]
	})] });
}
var DIRECTOR_STAGES = [
	{
		id: "analyze",
		label: "Analyze",
		llm: "Reads the track or the story brief. For music videos: BPM, sections (verse / chorus / bridge), energy, and — if vocals exist — transcription plus diarization so speakers can be named. For short films: the one-line premise is expanded into structure, not shots yet.",
		safeEdit: "Correct section labels and speaker names here. A misnamed chorus will make every later cut land on the wrong downbeat. Do not rewrite lyrics in this stage unless the transcription is actually wrong."
	},
	{
		id: "screenplay",
		label: "Screenplay / lyrics",
		llm: "Pass 1 of Director v2 — optimized for creativity. Short film: named characters, dialogue, continuity. Music video: lyric-aware shot language aligned to the sections already found. Duration-aware if Music3 wrote the song: a 30 s track does not get a 5-minute libretto.",
		safeEdit: "This is the best place to change story, character names, and lines. Keep speaker IDs stable — H3 Prompt Enhance and later polish depend on them. After planning locks setup, you can still edit this in Manual review."
	},
	{
		id: "shot-plan",
		label: "Shot plan",
		llm: "Pass 2 — structured JSON. Beat-aware for music (downbeats, energy). Pacing-bias controls cut frequency. H3 jobs are broken into native durations so a 40 s scene does not appear as one illegal 40 s generate. LTX-2.5 vocal performances become independent lip-sync shots with exact soundtrack segments.",
		safeEdit: "Merge or split shots, but respect the model ceiling (H3 ~14.4 s). If you lengthen a shot past native, expect another window, not a longer single pass. Changing the video model after this rebuilds clip timing without re-uploading audio."
	},
	{
		id: "start-frames",
		label: "Start frames",
		llm: "Image model (Flux Klein, Krea, Identity Edit) paints the first frame of each shot for character continuity. Image model can be None — prompt-only — in which case H3 Omni still receives your character / location / voice refs, and First / Last / Seamless LTX still use a main start image if you uploaded one.",
		safeEdit: "Manual mode: swap a single shot's still without regenerating the others. Match aspect to the locked setup. This is cheaper than fixing identity in video."
	},
	{
		id: "clips",
		label: "Clips",
		llm: "Each shot is a Studio-class generate: H3 First / Last Seamless carries motion and synced audio across windows with a local prompt per pass; H3 Omni conditions on the exact song segment and keeps the pristine soundtrack; LTX-2.5 locks mouths to the vocal stem when available. Turbo / Sol / First Block Cache sit in Director's persistent Advanced menu for H3.",
		safeEdit: "Re-run one clip from the dashboard. Do not cancel an assemble to fix a single shot — regenerate that clip, then rejoin."
	},
	{
		id: "polish",
		label: "Polish",
		llm: "Pass 3 — per-model, LoRA-aware prompt refinement. Injects CivitAI / HuggingFace LoRA guides so the rewrite speaks the adapter's language. Diffs are stored and visible on the dashboard.",
		safeEdit: "Read the polish diff before you bless Auto mode. If a LoRA trigger word vanished, put it back here, not in a fourth LLM stacked on the side."
	},
	{
		id: "assemble",
		label: "Assemble",
		llm: "Stitch clips to the timeline. Music videos keep the original (or generated) song as the spine; H3's per-window audio does not replace it on Omni music jobs. Missing pieces can be repaired and rejoined without a full rerun.",
		safeEdit: "If the join is early or late, fix the shot plan's in/out, not the encoder. Resume after refresh is supported — do not start a second project to 'continue'."
	}
];
var PACING_LABELS = [
	{
		value: 0,
		label: "Held takes"
	},
	{
		value: 25,
		label: "Patient"
	},
	{
		value: 50,
		label: "Neutral"
	},
	{
		value: 75,
		label: "Cutty"
	},
	{
		value: 100,
		label: "Montage"
	}
];
var SAMPLE_RUNS = [
	{
		id: "run-041",
		title: "Harbour radio — night set",
		skill: "short-film",
		model: "H3 First / Last Pruned · Seamless",
		duration: "38 s · 4 native windows",
		clips: 4,
		status: "complete",
		note: "H3-aware plan split a 38 s scene into 14.4 s passes. Start frames from Krea Identity."
	},
	{
		id: "run-042",
		title: "Gold thread (Music3, 2:00)",
		skill: "music-video",
		model: "LTX-2.5 Distilled + H3 Omni inserts",
		duration: "120 s · 11 shots",
		clips: 11,
		status: "needs-repair",
		note: "Clip 07 lost lip sync. Re-run that vocal shot with the exact stem segment; then rejoin."
	},
	{
		id: "run-039",
		title: "Kitchen argument, take 2",
		skill: "short-film",
		model: "H3 Omni Pruned",
		duration: "22 s · 2 windows",
		clips: 2,
		status: "paused",
		note: "Paused after refresh. Resume — do not re-analyze. Prompt Enhance kept speaker IDs."
	}
];
function DirectorConsole() {
	const d = useConsole((s) => s.director);
	const setDirector = useConsole((s) => s.setDirector);
	const plan = useConsole((s) => s.planDirector);
	const reset = useConsole((s) => s.resetDirector);
	const video = MODELS.find((m) => m.id === d.videoModel);
	const native = video?.maxNativeSec ?? 14.4;
	const windows = Math.max(1, Math.ceil((d.plannedDuration - 1) / Math.max(native - 1, 1)));
	const stage = DIRECTOR_STAGES.find((s) => s.id === d.stage) ?? DIRECTOR_STAGES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "director",
		className: "scroll-mt-24 border-t border-border px-5 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				kicker: "04 · Director",
				title: "One prompt. A planned picture.",
				lede: "Setup locks after planning. Click any stage to see what the local LLM is doing, and what you can safely edit."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bezel overflow-hidden rounded-xl border border-border bg-bg-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.18em] text-gold",
							children: ["Director v2 · ", d.locked ? "Setup locked" : "Setup open"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: plan,
								disabled: d.locked,
								children: "Plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: reset,
								children: "Unlock / reset"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
									disabled: d.locked,
									className: "grid gap-3 md:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Skill",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
												value: d.skill,
												options: [{
													value: "music-video",
													label: "Music Video"
												}, {
													value: "short-film",
													label: "Short Film"
												}],
												onChange: (skill) => setDirector({ skill })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Soundtrack",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
												value: d.soundtrack,
												options: [
													{
														value: "existing",
														label: "Existing track"
													},
													{
														value: "music3",
														label: "Generate Music3"
													},
													{
														value: "acestep",
														label: "Generate ACE-Step"
													}
												],
												onChange: (soundtrack) => setDirector({ soundtrack })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Aspect",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
												value: d.aspect,
												onChange: (e) => setDirector({ aspect: e.target.value }),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "16:9" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "9:16" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "21:9" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1:1" })
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Resolution",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
												value: d.resolution,
												onChange: (e) => setDirector({ resolution: e.target.value }),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Match output" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "768-class draft" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "0.4 MP" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1 MP" })
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Workflow",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
												value: d.workflow,
												onChange: (e) => setDirector({ workflow: e.target.value }),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Seamless" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cut coverage" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Omni refs" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Audio-driven" })
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Video model",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
												value: d.videoModel,
												onChange: (e) => setDirector({ videoModel: e.target.value }),
												children: MODELS.filter((m) => m.kind === "video").map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: m.id,
													children: m.maestroLabel
												}, m.id))
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Image model",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "h-10 w-full rounded-sm border border-border bg-inset px-2 text-sm",
												value: d.imageModel,
												onChange: (e) => setDirector({ imageModel: e.target.value }),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "none",
													children: "None — no generated images"
												}), MODELS.filter((m) => m.kind === "image").map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: m.id,
													children: m.maestroLabel
												}, m.id))]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Review",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
												value: d.review,
												options: [{
													value: "auto",
													label: "Auto"
												}, {
													value: "manual",
													label: "Manual review"
												}],
												onChange: (review) => setDirector({ review })
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
											children: "Pacing-bias"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: 0,
											max: 100,
											value: d.pacing,
											disabled: d.locked,
											onChange: (e) => setDirector({ pacing: Number(e.target.value) }),
											className: "mt-2 w-full accent-gold"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted",
											children: PACING_LABELS.reduce((acc, cur) => Math.abs(cur.value - d.pacing) < Math.abs(acc.value - d.pacing) ? cur : acc).label
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-md border border-border bg-inset p-3 text-sm text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.14em] text-gold",
										children: "Character / voice / location refs"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2",
										children: "Upload stills, voices, and rooms before Plan. Disabling generated shot images does not drop these refs. H3 Omni still receives them; First / Last and Seamless LTX still use a main start image if present."
									})]
								}),
								d.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-md border border-gold/30 bg-gold/5 p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.14em] text-gold",
										children: "After planning · H3-aware"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-fg",
										children: [
											d.plannedDuration,
											"s requested → ",
											windows,
											" native pass",
											windows === 1 ? "" : "es",
											" at ~",
											native,
											"s",
											video?.family === "h3" ? " (H3 14.4 s ceiling)" : "",
											". Changing the video model rebuilds clip timing without re-uploading audio."
										]
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
									children: DIRECTOR_STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setDirector({ stage: s.id }),
										className: cn("h-full w-full rounded-md border px-3 py-3 text-left", d.stage === s.id ? "border-gold bg-gold/10 text-fg" : "border-border bg-surface text-muted hover:text-fg"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] text-gold",
											children: String(i + 1).padStart(2, "0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block font-display text-lg",
											children: s.label
										})]
									}) }, s.id))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "border-t border-border bg-surface p-4 lg:border-l lg:border-t-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.18em] text-gold",
									children: "Stage inspector"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-2xl text-fg",
									children: stage.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg",
										children: "What the LLM is doing. "
									}), stage.llm]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg",
										children: "Safe to edit. "
									}), stage.safeEdit]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl text-fg",
								children: "Dashboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Past runs, re-run one clip, repair missing pieces, rejoin, resume after refresh."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid gap-3 md:grid-cols-3",
								children: SAMPLE_RUNS.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-lg border border-border bg-inset p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.14em] text-gold",
											children: [
												run.id,
												" · ",
												run.skill.replace("-", " ")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mt-1 font-display text-xl text-fg",
											children: run.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted",
											children: run.model
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-xs text-gold",
											children: run.duration
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted",
											children: run.note
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper",
											children: [
												run.status.replace("-", " "),
												" · ",
												run.clips,
												" clips"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex flex-wrap gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "secondary",
												children: "Re-run clip"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												children: "Repair / rejoin"
											})]
										})
									]
								}, run.id))
							})
						]
					})
				]
			})]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted",
			children: label
		}), children]
	});
}
function Chip({ value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(o.value),
			className: cn("rounded-sm border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em]", value === o.value ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg"),
			children: o.label
		}, o.value))
	});
}
var EDIT_TOOLS = [
	{
		id: "retake",
		name: "Retake",
		blurb: "Re-roll a section of an existing video with a new prompt. Timing and surrounding frames stay; the beat you hated gets another performance.",
		when: "A line, a glance, or a two-second stumble inside an otherwise good take.",
		cost: "One short generate, not a full clip. Still occupies the video GPU — unload the LLM.",
		typical: false
	},
	{
		id: "edit-anything",
		name: "Edit Anything",
		blurb: "Add, remove, or change elements in a finished clip with text and in-context LoRA models. The rest of the shot tries to hold still.",
		when: "A prop, a sign, a small wardrobe miss. Not a new performance.",
		cost: "Moderate. In-context LoRAs add VRAM. Optional SAM 3.1 inpaint support is a separate Pinokio install.",
		typical: false
	},
	{
		id: "outpaint",
		name: "Outpaint",
		blurb: "Extend the frame in any direction while keeping original action, timing, and audio.",
		when: "You shot 4:3 and need 16:9, or the head is too tight for a title card.",
		cost: "Cheaper than regenerating the take. Audio is preserved; do not stack a new Music3 pass on top.",
		typical: false
	},
	{
		id: "repaint",
		name: "Repaint",
		blurb: "SCAIL-2 restyle of characters, objects, or the whole scene while the source motion and camera are retained.",
		when: "The blocking is right and the world is wrong — day for night, wardrobe, set dressing.",
		cost: "Heavy relative to Retake. Treat it like a full generate for VRAM.",
		typical: false
	},
	{
		id: "recast",
		name: "Recast",
		blurb: "SCAIL-2 mapping of one or more people onto replacement characters, including multi-shot scenes and group shots.",
		when: "The acting and camera are keepers; the face or body must change across the cut.",
		cost: "Heaviest Edit tool. Group shots multiply identity work. Not a 6 GB job.",
		typical: false
	}
];
function EditSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "edit",
		className: "scroll-mt-24 border-t border-border px-5 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				kicker: "05 · Edit",
				title: "After the take exists.",
				lede: "Five tools. Use them when regenerating the whole clip would throw away a performance you already like."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-5",
				children: EDIT_TOOLS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bezel rounded-xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl text-gold",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: t.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.14em] text-gold",
								children: ["When.", " "]
							}), t.when]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.14em] text-gold",
								children: ["Cost.", " "]
							}), t.cost]
						})
					]
				}, t.id))
			})]
		})
	});
}
var GOALS = [
	{
		id: "talking",
		label: "Talking clip"
	},
	{
		id: "music-video",
		label: "Music video"
	},
	{
		id: "short-film",
		label: "Short film"
	},
	{
		id: "stills",
		label: "Stills"
	},
	{
		id: "long-multi",
		label: "Long multi-window"
	}
];
var BIAS = [
	{
		id: "safe",
		label: "Safe"
	},
	{
		id: "balanced",
		label: "Balanced"
	},
	{
		id: "max",
		label: "Max quality"
	}
];
function HardwareAdvisor() {
	const advisor = useConsole((s) => s.advisor);
	const setAdvisor = useConsole((s) => s.setAdvisor);
	const result = advise(advisor);
	const panel = result.status === "comfortable" ? "border-safe/40 bg-safe/5" : result.status === "tight" ? "border-warn/40 bg-warn/5" : "border-crash/40 bg-crash/5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "hardware",
		className: "scroll-mt-24 border-t border-border px-5 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				kicker: "06 · Hardware Advisor",
				title: "Tell it the card. It names the ceiling.",
				lede: "Persists in this browser. Auto-Tune still owns the live profile — this is a starting map, not a guarantee."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "bezel space-y-5 rounded-xl border border-border bg-surface p-5",
					onSubmit: (e) => e.preventDefault(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
							children: "VRAM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: VRAM_OPTIONS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pick, {
								active: advisor.vram === v,
								onClick: () => setAdvisor({ vram: v }),
								children: [v, " GB"]
							}, v))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
							children: "System RAM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: RAM_OPTIONS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pick, {
								active: advisor.ram === v,
								onClick: () => setAdvisor({ ram: v }),
								children: [v === 96 ? "96+" : v, " GB"]
							}, v))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
								children: "GPU family"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: [
									30,
									40,
									50
								].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pick, {
									active: advisor.gpu === v,
									onClick: () => setAdvisor({ gpu: v }),
									children: ["RTX ", v]
								}, v))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-subtle",
								children: "Sol Engine is RTX 40 / 50 only."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
							children: "Goal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: GOALS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
								active: advisor.goal === g.id,
								onClick: () => setAdvisor({ goal: g.id }),
								children: g.label
							}, g.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
							children: "Bias"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: BIAS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
								active: advisor.bias === g.id,
								onClick: () => setAdvisor({ bias: g.id }),
								children: g.label
							}, g.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-3 rounded-md border border-border bg-inset px-3 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1 accent-gold",
								checked: advisor.directorLlm,
								onChange: (e) => setAdvisor({ directorLlm: e.target.checked })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "Director + local LLM will also be running."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-subtle",
								children: "Gemma 4 4B unloads after 60 s idle. Planning still occupies the GPU."
							})] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("bezel rounded-xl border p-5", panel),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: result.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl text-fg",
								children: result.headline
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Video",
									v: result.video
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Image",
									v: result.image
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Audio",
									v: result.audio
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Safe resolution",
									v: result.resolution
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Window length",
									v: result.window
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Multi-window",
									v: result.multiWindow
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Turbo / Sol / Cache",
									v: result.accel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "LoRAs / refs",
									v: result.loras
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
								children: "Disable first on OOM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-2 list-decimal space-y-1 pl-5 text-sm text-muted",
								children: result.oomOrder.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.16em] text-gold",
								children: "RAM warnings"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-2 text-sm text-muted",
								children: result.ramWarnings.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: result.solNote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: result.autoTune
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-3 md:grid-cols-2",
							children: [result.beginner, result.maxQuality].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-lg border border-border bg-bg/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl text-gold",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 space-y-1 text-sm text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Video: ", r.video] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Image: ", r.image] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Audio: ", r.audio] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Res: ", r.resolution] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Window: ", r.window] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Accel: ", r.accel] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r.notes })
									]
								})]
							}, r.name))
						})
					]
				})]
			})]
		})
	});
}
function Pick({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("rounded-sm border px-2.5 py-1.5 font-mono text-[11px] tabular uppercase tracking-[0.12em]", active ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg"),
		children
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-mono text-[10px] uppercase tracking-[0.14em] text-gold",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-sm text-muted",
		children: v
	})] });
}
var RULES = [
	{
		n: "01",
		title: "Pruned is the default.",
		body: "H3 Pruned 20B is the recommended checkpoint. Full 33B is a hero-take option on 24 GB+ VRAM and 64 GB RAM. If you cannot see the difference at draft resolution, you wasted the wait."
	},
	{
		n: "02",
		title: "H3 thinks in 14.4 seconds.",
		body: "345 frames at 24 fps is the native window. Longer stories are more windows, not a longer pass. Director prints clip counts after planning so a 40 s scene is not queued as one illegal job."
	},
	{
		n: "03",
		title: "Audio is either born here or added later.",
		body: "H3 and LTX-2.5 write 32 kHz (H3) / synced audio with the picture. Wan, Hunyuan, and most LTX-2.3 jobs do not. Do not run MMAudio on a clip whose native bed you already like."
	},
	{
		n: "04",
		title: "If a resolution vanished, it was never on that model.",
		body: "1080p is not a universal size. H3's heavy path is a 1440 short edge. LTX is megapixel-based. Wan is often 480p / 720p. Auto-Tune will hide what the checkpoint cannot do."
	},
	{
		n: "05",
		title: "Start frames are cheaper than identity panic.",
		body: "Lock the face in Flux Klein or Krea Identity Edit, then give that still to First / Last or as an Omni identity ref. Prompt-only Director is legal; continuity is not guaranteed."
	},
	{
		n: "06",
		title: "Unload the LLM before you generate picture.",
		body: "Gemma 4 4B unloads after 60 s idle. Don't wait if VRAM is already tight. Director planning and video generation are sequential jobs, not roommates."
	},
	{
		n: "07",
		title: "Turbo, Sol, Cache — in that order of trust.",
		body: "Turbo LoRA is the daily H3 draft tool (4 / 6 / 8). Sol Engine is RTX 40/50 experimental. First Block Cache is a sticky-motion risk on faces. Turn them off before you rewrite the prompt."
	},
	{
		n: "08",
		title: "One LoRA, recommended weight.",
		body: "The CivitAI guide is printed on the slider for a reason. Two character adapters at 0.9 each is how faces collapse. LTX-2.3 and Wan are the LoRA-rich families; H3 is not."
	},
	{
		n: "09",
		title: "OOM: strip, then shrink, then demote.",
		body: "Unload LLM → drop LoRAs → drop refs → lower resolution → shorten window → disable Sol / Cache → Pruned instead of Full. The recovery banner's headroom drop is the first click, not a shame."
	},
	{
		n: "10",
		title: "Studio is a camera. Director is a producer.",
		body: "Studio: you own every knob. Director: the local LLM owns the plan; you own the locks (aspect, model, soundtrack) and the Manual edits. Setup locks after planning on purpose."
	}
];
var FAQ = [
	{
		q: "Why can't I have a 40-second H3 clip?",
		a: "Because the native window is ~14.4 s (345 frames at 24 fps). Multi-window continuation, Video Extend (keeps the audiovisual tail), or Director's H3-aware clip split are the ways through. A 40 s duration field is a plan, not a single forward pass."
	},
	{
		q: "Why did 1080p disappear when I changed models?",
		a: "That checkpoint never offered it. H3 lists Match Output, draft sizes, and a heavy 1440-short-edge class — not a generic HD menu. LTX lists megapixels. Wan lists 480p / 720p more often than 1080p. The picker is honest."
	},
	{
		q: "Studio or Director?",
		a: "Studio when you already know the shot. Director when you have a track or a premise and need a plan: music video (beat-aware) or short film (screenplay). You can still re-run a single Director clip by hand."
	},
	{
		q: "Music3 or ACE-Step?",
		a: "Music3 writes complete stereo songs, 5 s–5 min, two-minute default, duration-aware lyrics — and it is a Director soundtrack option. ACE-Step XL is the quality ACE path; Turbo is the sketch. If you already have a master, use existing track and skip both."
	},
	{
		q: "What did v1.8.7.1 actually change?",
		a: "MiniMax-Music3 GPU compatibility. On Windows, FlashAttention could import and then crash because the wheel had no kernel for that GPU. 1.8.7.1 validates the wheel against the live architecture and falls back to SDPA. It also removes the bad wheel from affected legacy Windows runtimes. Creative controls did not change."
	},
	{
		q: "When is Full 33B a waste?",
		a: "On 6–16 GB VRAM. On 8 s Turbo drafts. On any shot you will retake. On stills. On coverage. On a card that is also holding Gemma. Use Full when the face and the line are the product, the card is 24 GB+, and RAM is 64 GB-class."
	},
	{
		q: "Does Auto-Tune replace this advisor?",
		a: "No. Auto-Tune picks profile, quantization, VAE tiling, and a VRAM safety coefficient from the live GPU. This page is a starting map. LoRAs, refs, resolution, and a still-resident LLM all move the ceiling."
	}
];
function CheatSheet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "cheat",
		className: "scroll-mt-24 border-t border-border px-5 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					kicker: "07 · Cheat sheet",
					title: "Ten rules. Then the questions that actually come up.",
					lede: "Short enough to read before a generate. Specific enough to stop a bad default."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-3 md:grid-cols-2",
					children: RULES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-gold",
								children: r.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-2xl text-fg",
								children: r.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: r.body
							})
						]
					}, r.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-12 font-display text-3xl text-fg",
					children: "FAQ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: FAQ.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "rounded-xl border border-border bg-inset px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "cursor-pointer font-display text-xl text-fg",
							children: f.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: f.a
						})]
					}, f.q))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "mt-16 border-t border-border pt-8 text-sm text-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Teaching replica of Maestro v1.8.7.1 (Blizaine). Not affiliated. Labels marked “typical Studio control” describe function when the exact UI string may differ." })
				})
			]
		})
	});
}
var SECTIONS = [
	"models",
	"overview",
	"studio",
	"director",
	"edit",
	"hardware",
	"cheat"
];
function Home() {
	const lastPanel = useConsole((s) => s.lastPanel);
	const setPanel = useConsole((s) => s.setPanel);
	const setHydrated = useConsole((s) => s.setHydrated);
	const [active, setActive] = (0, import_react.useState)("models");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const done = () => {
			if (cancelled) return;
			setHydrated(true);
			const hash = window.location.hash.replace("#", "");
			const stored = useConsole.getState().lastPanel;
			const target = SECTIONS.includes(hash) ? hash : stored;
			setActive(target);
			if (SECTIONS.includes(hash)) setPanel(hash);
			if (SECTIONS.includes(hash) || target !== "models") document.getElementById(target)?.scrollIntoView({ behavior: "auto" });
		};
		const result = useConsole.persist.rehydrate();
		if (result && typeof result.then === "function") result.then(done);
		else done();
		return () => {
			cancelled = true;
		};
	}, [setHydrated, setPanel]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") useConsole.getState().closeInspector();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		const obs = new IntersectionObserver((entries) => {
			const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (!visible?.target.id) return;
			const id = visible.target.id;
			if (SECTIONS.includes(id)) {
				setActive(id);
				if (id !== lastPanel) setPanel(id);
			}
		}, {
			rootMargin: "-20% 0px -55% 0px",
			threshold: [
				.15,
				.35,
				.6
			]
		});
		for (const id of SECTIONS) {
			const el = document.getElementById(id);
			if (el) obs.observe(el);
		}
		return () => obs.disconnect();
	}, [lastPanel, setPanel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "film-grain",
			"aria-hidden": true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#models",
			className: "absolute left-4 top-3 z-50 -translate-y-16 bg-gold px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bg opacity-0 focus:translate-y-0 focus:opacity-100",
			children: "Skip to models"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmNav, { active }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelsGallery, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioConsole, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirectorConsole, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardwareAdvisor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheatSheet, {})
		] })
	] });
}
//#endregion
export { Home as component };
