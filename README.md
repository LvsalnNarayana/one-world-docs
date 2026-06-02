# One World Docs

Standalone document editor app (Lexical + MUI). UI copied from `ow_frontend` docs module; `ow_frontend` is unchanged.

## Scripts

- `npm run dev` — http://localhost:4900
- `npm run build` — production build

## Routes

- `/docs` — document library
- `/docs/editor/:docId` — Lexical editor

## Architecture

| Layer | Path |
|-------|------|
| UI (from ow_frontend) | `src/docs/`, `src/pages/docs/` |
| Lexical engine | `src/editor/` |
| Mock data | `src/data/mockDocs.ts`, `src/generators/` |
| Future backend | `src/repository/DocRepository.ts` |

Replace `localMockDocRepository` with an HTTP implementation when the API is ready.

## Generators

- `src/generators/generateMockDoc.ts` — document list cards
- `src/scripts/` — user/post mock generators (from ow_frontend)
