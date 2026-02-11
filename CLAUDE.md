# Angular Component

Angular 21 application using standalone components.

## Tech Stack

- **Framework**: Angular 21
- **Language**: TypeScript 5.9 (strict mode)
- **Styles**: SCSS (inline style language: SCSS)
- **Testing**: Vitest 4 via `@angular/build:unit-test`
- **Package Manager**: npm
- **SSR**: Disabled (client-only)

## Commands

- `npm start` — Start dev server (`ng serve`)
- `npm run build` — Production build (`ng build`)
- `npm test` — Run unit tests (`ng test`)

## Project Structure

- `src/` — Application source
  - `app/` — Root component and routing
  - `main.ts` — Application entry point
  - `styles.scss` — Global styles
  - `index.html` — HTML entry point
- `public/` — Static assets

## Conventions

- **Standalone components** — No NgModules; use `imports` array in `@Component`
- **File naming** — Angular 2025 style: `name.ts`, `name.html`, `name.scss`, `name.spec.ts` (no `.component` suffix)
- **Component prefix** — `app`
- **Signals** — Use Angular signals (`signal()`, `computed()`, `effect()`) for reactive state
- **Formatting** — Prettier: 100 char print width, single quotes, angular parser for HTML templates
- **TypeScript strict** — `strict`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `strictTemplates`
