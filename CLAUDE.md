# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` / `ng serve` — dev server at `http://localhost:4200/` with live reload
- `npm run build` / `ng build` — build to `dist/angular-swapi-app/` (add `--prod` for production)
- `npm test` / `ng test` — unit tests via Karma + Jasmine (watch mode + Chrome)
- Run a single spec: `ng test --include=src/app/people.service.spec.ts`
- `npm run lint` / `ng lint` — TSLint (config in `tslint.json`)
- `npm run e2e` / `ng e2e` — end-to-end tests via Protractor
- `ng deploy` — deploy to Firebase Hosting (via `@angular/fire`; see `firebase.json` / `.firebaserc`)

Angular 10 CLI project (TypeScript ~3.9). Toolchain predates ESLint — linting is still TSLint.

## Architecture

Single-page Angular app that browses the public [SWAPI](https://swapi.dev/) Star Wars REST API. Everything lives in one `AppModule` (`src/app/app.module.ts`); there are no feature modules or lazy loading. UI is Angular Material + Flex Layout (Material imports centralized in `src/app/angular-material.module.ts`).

### Six parallel resource domains

The domain is six SWAPI resource types, each following an identical structure: **film, people, planet, species, starship, vehicle**. When adding a feature or fixing a bug, the same change usually needs to be replicated across all six.

### Routing (`src/app/app-routing.module.ts`)

URLs follow `/<resource>/search` and `/<resource>/:<resource>Id`, where the detail route redirects to a `/property` child and nests child tab routes for related resources. Example: `/film/:filmId` has children `property`, `characters` (→ `PeopleTabsComponent`), `planets`, `species`, `starships`, `vehicles`.


### Key conventions & gotchas

- All API calls append `?format=json`.
- `HelperService.getBadgeNumber()` formats related-item counts shown on detail tabs (e.g. `10+`, `1k+`).
- Firebase (`@angular/fire`) is present for hosting/deploy only; there is no auth or database usage in the app logic.
