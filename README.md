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
| Framework   | Angular 10 (CLI 10) |
| Language    | TypeScript ~3.9 |
| UI          | Angular Material 10 + `@angular/flex-layout` |
| Data source | [SWAPI](https://swapi.dev/) (`?format=json`) |
| Unit tests  | Karma + Jasmine |
| E2E tests   | Protractor |
| Linting     | TSLint |
| Hosting     | Firebase Hosting (`@angular/fire`) |

## Prerequisites

- **Node.js** and **npm**
- A Chrome / Chromium browser (used by the dev server and the Karma test runner)

> **Node 17+ note.** This project builds on webpack 4 (Angular 10), which relies on
> an OpenSSL API removed by default in Node 17 and above. Without a workaround you
> would hit `ERR_OSSL_EVP_UNSUPPORTED`. The npm scripts already handle this: they run
> through [`cross-env`](https://www.npmjs.com/package/cross-env) with
> `NODE_OPTIONS=--openssl-legacy-provider`, so `npm start`, `npm run build` and
> `npm test` work out of the box on any platform (Windows included).
>
> If you invoke the Angular CLI directly (`ng ...` / `npx ng ...`) instead of via
> the npm scripts, set the flag yourself:
> `NODE_OPTIONS=--openssl-legacy-provider npx ng <command>`.

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
| `npm run build`  | Production/dev build into `dist/angular-swapi-app/` (add `-- --prod` for production) |
| `npm test`       | Unit tests via Karma + Jasmine (watch mode + Chrome by default) |
| `npm run lint`   | Static analysis via TSLint |
| `npm run e2e`    | End-to-end tests via Protractor |

All build/serve/test scripts inject the OpenSSL legacy flag via `cross-env`
(see the Node 17+ note above); `lint` does not need it.

## Running the tests

By default `npm test` opens a non-headless Chrome and stays in watch mode.
For a single, non-interactive (CI-friendly) run in headless Chrome:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

To run a single spec file:

```bash
npm test -- --include=src/app/people/people-search/people-search.component.spec.ts
```

The suite covers, for every component, that it can be created, and adds
visibility checks on the key UI:

- **`*-search`** pages render a populated table row with the most significant
  value (the *name*, or the *title* for films).
- **`*-details`** pages render that same name/title in the page heading.

## Architecture

Everything lives in a single `AppModule` (`src/app/app.module.ts`) — there are no
feature modules or lazy loading. All Angular Material imports are centralized in
`src/app/angular-material.module.ts`.

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
- Firebase (`@angular/fire`) is used for hosting/deployment only — there is no auth
  or database usage in the app logic.

## Deployment

The app is configured for Firebase Hosting (see `firebase.json` / `.firebaserc`):

```bash
ng deploy    # via @angular/fire
```

## Credits

- **Author:** Grégory OLIVER
- **Data:** [SWAPI — The Star Wars API](https://swapi.dev/)
- **Images:** [starwars-visualguide.com](https://starwars-visualguide.com) & Wookieepedia
- **Icons:** [Starwars Icon Set](https://dribbble.com/shots/3907212-Starwars-Icon-Set) by Sherzod Mirzaakhmedov

> Star Wars and all associated names and images are copyright Lucasfilm Ltd.
