# AGENTS.md

## Project

**SoT** is a personal Sea of Thieves learning and tooling workspace. The owner is a beginner (playing in 2026). The main goal is to build and maintain beginner-friendly guides and reference material so they can learn companies, loot, voyages, combat, sailing, and related gameplay without relying on scattered notes.

Primary deliverable today: `sea-of-thieves-companies-guide.html` (**The Pirate's Ledger**) — a portable, shareable HTML guide (companies, loot, tips, quests, map help, fight tips, etc.). Prefer updating that guide and related assets when the user asks for guide content; keep requirements and research in the wiki when useful.

## Knowledge base (`raw/` + `wiki/`)

A Karpathy-style LLM wiki lives in this repo for lasting notes, requirements, and researched facts. Use the **karpathy-llm-wiki** skill (`~/.agents/skills/karpathy-llm-wiki/SKILL.md`) for ingest, query, lint, and archive.

| Path | Role |
|------|------|
| `raw/` | Immutable source material. Read only; do not rewrite meaning. `raw/<topic>/`. |
| `wiki/` | Compiled articles the agent owns. `wiki/<topic>/<article>.md` (one topic level). |
| `wiki/index.md` | Global index — start here for wiki lookups. |
| `wiki/log.md` | Append-only log (ingest / archive / lint). |

**When to use the wiki:** ingest sources the user wants kept; query before guessing on topics it covers; lint for consistency; archive answers only when asked. Do not treat every chat as a wiki write.

**Rules of thumb:** prefer `wiki/index.md` + relevant articles over memory for covered topics; never modify `raw/` after write (except unique-path lint fixes); new concepts → new articles, same thesis → merge and refresh `Updated`; log ingest/archive/lint in `wiki/log.md`.

Current wiki topic: **Sea of Thieves** (see `wiki/index.md`).

## Frontend defaults (always)

Whenever you create or change frontend/UI in this project — HTML, CSS, layout, visuals, components, or the companies guide — **load and follow these skills by default**, even if the user only describes a feature and never says “redesign,” “polish,” or “audit”:

1. `frontend-design` (`~/.agents/skills/frontend-design/SKILL.md`)
2. `web-design-guidelines` (`~/.agents/skills/web-design-guidelines/SKILL.md`)
3. `vercel-react-best-practices` (`~/.agents/skills/vercel-react-best-practices/SKILL.md`) — when the work involves React/Next; for the static HTML guide, still apply the relevant performance/UX ideas where they fit

Do not wait for an explicit `/skill` mention. Feature requests that touch the UI count as frontend work.
