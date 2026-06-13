# ITQĀN · إتقان

Personal mastery cockpit for **TOEFL ITP**, **IELTS**, and **TPA Bappenas**.
إتقان = mastery / excellence of work.

**Live:** https://mshadianto.github.io/itqan/

Practice banks, procedurally generated TPA numeric/figural questions, timed mock
tests, spaced-repetition vocabulary (SM-2), and AI-assisted tutoring/essay
scoring — wrapped in a single React app. UI is in Indonesian.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production bundle into dist/
npm run preview  # preview the built bundle
```

The whole app lives in [`Itqan_Prep.jsx`](./Itqan_Prep.jsx); `src/main.jsx` only
mounts it and provides a `localStorage`-backed shim for the persistence API.
See [CLAUDE.md](./CLAUDE.md) for architecture notes.

## Notes

- Progress, streaks, XP, and SRS cards persist in the browser (`localStorage`).
- The AI features (tutor, essay/speaking scoring, AI-generated items) call the
  Anthropic API directly and only work inside an environment that injects
  authentication (e.g. the Claude Artifacts sandbox). On the public Pages build
  the rest of the app works; AI calls will surface an error when used.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.
