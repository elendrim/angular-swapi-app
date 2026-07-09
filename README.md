# Angular Swapi App

A single-page Angular application to browse the Star Wars universe, powered by the
public [SWAPI](https://swapi.dev/) REST API. It lets you search and explore six
resource types — **films, people, planets, species, starships and vehicles** —
and navigate between related entities (a film's characters, a person's starships,
a planet's residents, and so on).

Built with Angular Material and a fully responsive layout.

## Tech stack

| Area        | Technology |
|-------------|------------|
| Framework   | Angular 22 (standalone-less NgModule app) |
| Language    | TypeScript ~6.0 |
| Build       | `@angular/build` (esbuild) |
| Change detection | Zoneless — components expose loaded data as **signals** |
| UI          | Angular Material 22 (CDK) |
| Data source | [SWAPI](https://swapi.dev/) (`?format=json`) |
| Unit tests  | [Vitest](https://vitest.dev/) via `@angular/build:unit-test` (jsdom) |
| Linting     | ESLint + [angular-eslint](https://github.com/angular-eslint/angular-eslint) |
| Hosting     | Firebase Hosting (deployed with the `firebase` CLI) |

## Prerequisites

- **Node.js 22.22+** (or 24.15+ / 26+) — required by the Angular 22 CLI.
- A Chromium/Chrome browser for the dev server (tests run headlessly in jsdom, no browser needed).

## Getting started

```bash
# 1. Install dependencies
npm ci        # or: npm install

# 2. Start the dev server
npm start
```

Then open **http://localhost:4200/**. The app reloads automatically on source changes.

## Available scripts

| Command          | Description |
|------------------|-------------|
| `npm start`      | Dev server with live reload at `http://localhost:4200/` |
| `npm run build`  | Production build into `dist/angular-swapi-app/browser/` |
| `npm run watch`  | Development build in watch mode |
| `npm test`       | Unit tests via Vitest |
| `npm run lint`   | Static analysis via ESLint (angular-eslint) |

## Running the tests

```bash
npm test -- --no-watch          # single, non-interactive run
```

Tests run in a Node.js + jsdom environment (no browser required). The suite covers,
for every component, that it can be created, plus visibility checks on the key UI:

- **`*-search`** pages render a populated table row with the most significant
  value (the *name*, or the *title* for films).
- **`*-details`** pages render that same name/title in the page heading.

## Architecture

Everything lives in a single `AppModule` (`src/app/app.module.ts`) — there are no
feature modules or lazy loading. All Angular Material imports are centralized in
`src/app/angular-material.module.ts`.

### Zoneless change detection & signals

The app runs **without zone.js** (Angular's modern default). Components that load
data asynchronously expose it as **signals** (e.g. `people = signal<People>()`), and
templates read them with `@if (people(); as people) { … }`. Setting a signal
(`this.people.set(data)`) automatically schedules change detection — this is
required because Angular Material components are OnPush and would otherwise not
refresh on a plain field assignment. Material tables (`MatTableDataSource`) refresh
themselves, so the search/tabs tables need no signals.

### Six parallel resource domains

The domain is organized around six SWAPI resource types, each following an
**identical structure**: `film`, `people`, `planet`, `species`, `starship`,
`vehicle`. Each domain provides four components:

| Component        | Role |
|------------------|------|
| `*-search`       | Searchable, paginated results table |
| `*-details`      | Entity page: heading (name/title) + tabbed navigation to related resources |
| `*-property`     | The entity's own attributes |
| `*-tabs`         | Lists of related entities (characters, planets, starships, …) |

Because the six domains mirror each other, a feature or fix usually needs to be
replicated across all of them.

### Routing

URLs follow the pattern `/<resource>/search` and `/<resource>/:<resource>Id`.
A detail route redirects to a `property` child and nests child tab routes for the
related resources. For example, `/film/:filmId` has children `property`,
`characters`, `planets`, `species`, `starships`, `vehicles`.

### Conventions & gotchas

- All API calls append `?format=json`.
- `HelperService.getIdFromUrl()` extracts an entity id from a SWAPI URL.
- `HelperService.getBadgeNumber()` formats the related-item counts shown on the
  detail tabs (e.g. `10+`, `1k+`).

## Deployment

The app is configured for Firebase Hosting (see `firebase.json` / `.firebaserc`).
The hosting `public` directory is `dist/angular-swapi-app/browser` (the esbuild
output). Deploy with the Firebase CLI:

```bash
npm run build
npx firebase login          # first time only (interactive)
npx firebase use <project>  # set the target Firebase project
npx firebase deploy --only hosting
```

## Credits

- **Author:** Grégory OLIVER
- **Data:** [SWAPI — The Star Wars API](https://swapi.dev/)
- **Images:** Character images from [Wookieepedia](https://starwars.fandom.com/) (via the [akabab/starwars-api](https://akabab.github.io/starwars-api/) dataset), bundled locally under `src/assets/img/`; a local placeholder is shown where no image is available.
- **Icons:** [Starwars Icon Set](https://dribbble.com/shots/3907212-Starwars-Icon-Set) by Sherzod Mirzaakhmedov

> Star Wars and all associated names and images are copyright Lucasfilm Ltd.
