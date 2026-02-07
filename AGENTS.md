# Backend — Strapi 5 CMS

## Quick Start

```bash
npm run develop   # Start dev server on http://localhost:1337
npm run build     # Build admin panel
npm run start     # Start production server
```

Default admin credentials must be created on first launch at `http://localhost:1337/admin`.

## Stack

- **Strapi 5** (v5.35.0) with CommonJS modules (`"type": "commonjs"`)
- **SQLite** via `better-sqlite3` — database at `.tmp/data.db`
- **esbuild** — explicitly installed (Strapi 5 requirement)

## Project Structure

```
backend/
├── config/
│   ├── admin.js          # Admin auth secrets
│   ├── database.js       # SQLite connection
│   ├── middlewares.js     # CORS + default middleware stack
│   ├── plugins.js        # Plugin config (empty)
│   └── server.js         # Host/port (0.0.0.0:1337)
├── src/
│   ├── admin/app.js      # Admin panel config (ES module export default)
│   ├── index.js          # Bootstrap seed script (~408 lines)
│   └── api/              # 6 content types (see below)
│       ├── ship/
│       ├── operator/
│       ├── apartment/
│       ├── itinerary/
│       ├── itinerary-stop/
│       └── story/
├── public/uploads/       # Media file storage
├── types/generated/      # Auto-generated TypeScript types
└── .env                  # JWT_SECRET only; other secrets use defaults in config
```

Each content type directory follows the standard Strapi structure:
```
api/<type>/
├── content-types/<type>/schema.json   # Field definitions
├── controllers/<type>.js              # createCoreController() — no overrides
├── services/<type>.js                 # createCoreService() — no overrides
└── routes/<type>.js                   # createCoreRouter() — no overrides
```

No custom controllers, services, routes, policies, or middlewares exist. All use Strapi factory defaults.

## Content Types & Relations

All types have `draftAndPublish: false` (publish immediately).

```
Operator (1) ──→ (N) Ship
Ship (1) ──→ (N) Apartment
Ship (1) ──→ (N) Itinerary
Ship (1) ──→ (N) Story
Itinerary (1) ──→ (N) ItineraryStop
```

### Ship

| Field          | Type        | Required | Notes                                          |
|----------------|-------------|----------|-------------------------------------------------|
| name           | string      | yes      |                                                 |
| slug           | uid         | no       | Generated from `name`                           |
| tagline        | string      | no       |                                                 |
| description    | richtext    | no       |                                                 |
| heroImage      | media       | no       | Single                                          |
| gallery        | media       | no       | Multiple                                        |
| status         | enumeration | no       | `operational`, `under-construction`, `planned`   |
| yearBuilt      | integer     | no       |                                                 |
| length         | decimal     | no       | Meters                                          |
| residenceCount | integer     | no       |                                                 |
| operator       | relation    | no       | Many-to-One → Operator (`inversedBy: ships`)    |
| apartments     | relation    | no       | One-to-Many → Apartment (`mappedBy: ship`)      |
| itineraries    | relation    | no       | One-to-Many → Itinerary (`mappedBy: ship`)      |
| stories        | relation    | no       | One-to-Many → Story (`mappedBy: ship`)          |

### Operator

| Field       | Type     | Required | Notes                                       |
|-------------|----------|----------|---------------------------------------------|
| name        | string   | yes      |                                             |
| description | richtext | no       |                                             |
| website     | string   | no       |                                             |
| phone       | string   | no       |                                             |
| email       | email    | no       |                                             |
| logo        | media    | no       | Single                                      |
| ships       | relation | no       | One-to-Many → Ship (`mappedBy: operator`)   |

### Apartment

| Field       | Type        | Required | Notes                                           |
|-------------|-------------|----------|-------------------------------------------------|
| name        | string      | yes      |                                                 |
| type        | enumeration | yes      | `studio`, `bed1`, `bed2`, `bed3`, `penthouse`   |
| size        | decimal     | no       | Square meters                                   |
| description | richtext    | no       |                                                 |
| priceFrom   | decimal     | no       |                                                 |
| priceTo     | decimal     | no       |                                                 |
| monthlyFees | decimal     | no       |                                                 |
| floorPlan   | media       | no       | Single                                          |
| images      | media       | no       | Multiple                                        |
| ship        | relation    | no       | Many-to-One → Ship (`inversedBy: apartments`)   |

### Itinerary

| Field       | Type     | Required | Notes                                          |
|-------------|----------|----------|-------------------------------------------------|
| name        | string   | yes      |                                                 |
| description | richtext | no       |                                                 |
| yearRound   | boolean  | no       | Default: true                                   |
| ship        | relation | no       | Many-to-One → Ship (`inversedBy: itineraries`)  |
| stops       | relation | no       | One-to-Many → ItineraryStop (`mappedBy: itinerary`) |

### ItineraryStop

| Field         | Type     | Required | Notes                                            |
|---------------|----------|----------|--------------------------------------------------|
| name          | string   | yes      |                                                  |
| latitude      | float    | yes      |                                                  |
| longitude     | float    | yes      |                                                  |
| arrivalDate   | date     | no       |                                                  |
| departureDate | date     | no       |                                                  |
| description   | text     | no       |                                                  |
| order         | integer  | yes      | Sequence number within itinerary                 |
| itinerary     | relation | no       | Many-to-One → Itinerary (`inversedBy: stops`)    |

### Story

| Field      | Type     | Required | Notes                                       |
|------------|----------|----------|---------------------------------------------|
| title      | string   | yes      |                                             |
| slug       | uid      | no       | Generated from `title`                      |
| content    | richtext | no       |                                             |
| excerpt    | text     | no       |                                             |
| author     | string   | no       |                                             |
| coverImage | media    | no       | Single                                      |
| ship       | relation | no       | Many-to-One → Ship (`inversedBy: stories`)  |

## Seed Script — `src/index.js`

Runs on `bootstrap()`. Idempotent — only seeds when no ships exist.

Creates in order: 6 operators → 6 ships → 17 apartments → 6 itineraries → 54 stops → 3 stories.

Also configures **public permissions** so all content types are readable without authentication (`find` + `findOne` actions). Uses:
```js
strapi.query("plugin::users-permissions.permission")
```

## API Usage

All endpoints are public (no auth required for reads).

```
GET /api/ships
GET /api/ships/:id
GET /api/operators
GET /api/apartments
GET /api/itineraries
GET /api/itinerary-stops
GET /api/stories
```

### Populate Syntax (Strapi 5)

Use array-indexed `populate`:
```
?populate[0]=operator&populate[1]=apartments&populate[2]=itineraries.stops
```

Do **not** use `populate[relation]=*` — it fails when relations contain media fields.

### Document Service API

```js
strapi.documents("api::ship.ship").create({ data: { ... } })
strapi.documents("api::ship.ship").findMany({ populate: { ... } })
```

## CORS Configuration

Allowed origins (in `config/middlewares.js`):
- `http://localhost:4321` (Astro frontend)
- `http://localhost:3000`

## Gotchas

- Enum values must not start with numbers (`bed1` works, `1bed` fails)
- `public/uploads/` must exist before first media upload
- `src/admin/app.js` must use ES module `export default` syntax
- `esbuild` must be an explicit dependency in `package.json`
- Database file lives in `.tmp/data.db` — deleting `.tmp/` resets all data (seed runs again on next start)
