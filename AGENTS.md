# AGENTS.md

## Project
- App: Vite + React + TypeScript
- Styling: Tailwind CSS
- Charts: Recharts

## Repo Structure
- Source code is under `src/`
- Static entry: `index.html`
- Config: `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`
- Do not touch `node_modules/`

## Commands
- Install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Test: `npm run test`

## Product Context
- Prototype dashboard with tabs: Overview, Wallet, Goals, Investments, Community
- Charts: portfolio allocation pie, monthly contributions bar, wallet balance line, performance line, community engagement bars
- Data is mocked; keep mock data unless explicitly asked to wire APIs
- Charts use a shared theme defined in `src/constants/chartTheme.ts`

## Code Style
- Use TypeScript + React function components.
- Keep components small and focused.
- Prefer Tailwind utility classes; avoid inline styles unless necessary.
- Keep naming consistent with existing files.

## Changes
- Make minimal, targeted edits.
- Avoid broad refactors.
- Run `npm run build` if changes could impact build output.

## Output Expectations
- Summarize changes and provide the PR summary.
- If you cannot run commands, say why and propose next steps.
