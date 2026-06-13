# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Itqan_Prep.jsx` is effectively the entire app: a single ~2370-line React component implementing **ITQĀN**, a personal exam-prep cockpit for **TOEFL ITP**, **IELTS**, and **TPA Bappenas**. It was authored as a self-contained **Claude Artifact**, and a thin Vite wrapper (`index.html` + `src/main.jsx`) was added around it so it can build and deploy to GitHub Pages. `src/main.jsx` only mounts the default export and shims the persistence API; **all real logic stays in `Itqan_Prep.jsx`** — edit there.

UI copy and all user-facing content are in **Indonesian**. Keep new strings in Indonesian to match.

## Commands

```bash
npm install      # install deps (react, react-dom, lucide-react, recharts, vite)
npm run dev      # Vite dev server
npm run build    # production bundle → dist/
npm run preview  # serve the built bundle
```

There is no linter or test suite. Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages at https://mshadianto.github.io/itqan/. `vite.config.js` sets `base: "/itqan/"` — it must match the repo name for asset paths to resolve on Pages.

## Runtime environment (host-provided globals)

The component depends on pieces from the Artifacts sandbox that don't exist in a plain browser. The Vite wrapper bridges them where possible:

- **Peer libraries:** `react`, `lucide-react` (icons), `recharts` (charts).
- **`window.storage`** — async key/value store (`.get(key) → {value}`, `.set(key, str)`, `.delete(key)`) used for all persistence under the key `itqan:data`. This is **not** `localStorage` directly; `src/main.jsx` provides a `localStorage`-backed shim so persistence works on Pages. Code still guards every call with `if (window.storage)` — keep that guard.
- **`fetch("https://api.anthropic.com/v1/messages")` with no auth header** — see `callClaude` (~line 733). Auth is injected only by the Artifacts host. On the public Pages build, AI features (tutor, essay scoring, AI-generated questions, listening scripts) will throw when used; the rest of the app works. Don't add API keys to the client. Model id used: `claude-sonnet-4-6`.
- **Web Speech API** — `speechSynthesis` (listening playback, `useSpeechScript`) and `SpeechRecognition`/`webkitSpeechRecognition` (speaking input, `useSpeechRecognition`). All feature-detected; absent APIs degrade gracefully.

When editing, preserve the `window.*` guards and the no-auth fetch convention.

## Architecture (top to bottom of the file)

The file is organized as labeled sections (search for the `/* ---- ... ---- */` banners):

1. **`STYLE`** (~line 16) — a single CSS string injected via `<style>{STYLE}</style>`. All styling is CSS custom properties (`--toefl`, `--ielts`, `--tpa`, `--gold`, etc.) plus utility classes (`.card`, `.btn`, `.choice`, `.quiz`...). There is no CSS-in-JS framework; style new UI with these existing classes/vars.
2. **`DOMAINS`** (~line 122) — per-exam metadata (label, color vars, icon). The three domain keys `toefl` / `ielts` / `tpa` thread through almost everything.
3. **Seed content** (~line 130–491) — hand-authored question banks as plain arrays/objects (`TOEFL_STRUCTURE`, `TOEFL_WE`, `TOEFL_READING`, `IELTS_*`, `TPA_VERBAL`, `TPA_LOGIKA`, `VOCAB`, plus `*_EXTRA` companions merged into `*_ALL` constants). To add static questions, append to the relevant array and confirm it's included in the corresponding `_ALL` merge.
4. **Procedural generators** (~line 583–730) — TPA numeric questions (`genSeries*`, `genPercent`, `genRatio`, `genAlgebra`... collected in `NUMERIC_GENS`) and figural/SVG questions (`Figural*` in `FIGURAL_GENS`). `makeMCQ`/`uniqueDistract` build choice sets. These generate fresh questions at runtime rather than from the seed banks.
5. **AI plumbing** — `callClaude(messages, maxTokens, system)` and `parseJSON(text)` (strips ```` ```json ```` fences and slices to the outer `{}`/`[]` before `JSON.parse`). All AI features go through these two.
6. **Persistence** — `DEFAULT_DATA` (~line 753) defines the entire app state shape: `profile`, per-domain `progress` (`answered`/`correct`/`byday`), `srs.cards`, `history`, `streak`, `xp`. `useItqan()` (~line 769) is the single source of truth: loads & merges from `window.storage`, seeds/tops-up SRS cards from `VOCAB_ALL`, and returns `[data, update]`. `update(updater)` debounces a write (~400ms). **All state mutations go through `update`** with an immutable clone (`JSON.parse(JSON.stringify(prev))`) — follow that pattern.
7. **Score model** — `acc`/`estToefl`/`estIelts`/`estTpa` map accuracy → estimated band/score.
8. **UI atoms & engines** — `Eyebrow`, `Pill`, `Gauge` (SVG arc), `ListeningPlayer`, `MicButton`, `FiguralSvg`, and the shared **`Quiz`** component (~line 1052) that drives MCQ practice for all domains. `MockRunner`/`MockReport`/`MockQuestion` implement timed full mock tests.
9. **View components** — one per nav destination: `Dashboard`, `PracticeView` (reused for all three domains via `domain` prop + `key`), `MockView`, `VocabView` (SM-2-style spaced repetition in its `rate()`), `TutorView` (AI chat), `PlanView`, `SettingsView`, plus `WritingView`/`SpeakingView`/`ListeningView`.
10. **`App`** (~line 2304) — top-level: holds `data` from `useItqan` and a `view` string; a `switch` in `Body` maps `view` → the view component. Navigation is the `NAV` array (~line 2292) rendered as the side rail and the mobile bottom nav. There is **no router library** — routing is just `useState("home")` + `setView`.

## Conventions

- Adding a screen = add a `NAV` entry + a `case` in `App`'s `Body` switch + a view component; pass `data`/`update` if it touches state.
- Spaced repetition lives entirely in `VocabView.rate()` (qualities 0/3/4/5 adjust `ease`/`interval`/`reps`/`due`). XP (+5) and streak bookkeeping are updated inline there and in `Quiz` finish handlers — mirror that when adding new earning surfaces.
- Stopping speech mid-flight uses the global flag `window.__itqStop` plus `speechSynthesis.cancel()`; reuse it rather than inventing a new mechanism.
- Bump `DEFAULT_DATA.v` and handle migration in `useItqan` if you change the persisted state shape.
