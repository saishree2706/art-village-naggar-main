# ART Village Naggar — Developer Guide

Website for ART Village Naggar, built with React + TypeScript + Vite. Blog content is managed via Notion CMS and served through Vercel serverless functions.

---

## Prerequisites

- **Node.js** 18+ — [nodejs.org](https://nodejs.org)
- **npm** 9+
- **Vercel CLI** (optional, for local API emulation) — `npm i -g vercel`
- A **Notion** account with an integration set up (see [Notion CMS Setup](#notion-cms-setup))

---

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd art-village-naggar-main
npm install

# 2. Set up environment variables
cp .env .env.local          # then fill in your Notion keys (see below)

# 3. Start dev server
npm run dev                 # http://localhost:8080
```

---

## Environment Variables

Create a `.env.local` file in the project root with these values:

```env
NOTION_API_KEY=secret_your_integration_secret_here
NOTION_DATABASE_ID=your_32_char_database_id_here
```

| Variable | Where to get it |
|---|---|
| `NOTION_API_KEY` | [notion.so/my-integrations](https://www.notion.so/my-integrations) → your integration → Internal Integration Secret |
| `NOTION_DATABASE_ID` | Open your Notion database → copy the ID from the URL |

> These are only needed if you're working on the **blog/articles** feature. The rest of the site is fully static.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at `localhost:8080` with hot reload |
| `npm run dev:local` | Dev server with Vercel Functions emulated (requires Vercel CLI) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint all TypeScript/React files |

---

## Project Structure

```
├── src/
│   ├── pages/          # Page components (Home, Stays, Blog, etc.)
│   ├── components/     # Reusable UI components + shadcn/ui
│   ├── hooks/          # Custom React hooks (Notion data fetching)
│   └── lib/            # Utilities, animation configs, SEO helpers
│
├── api/
│   ├── articles.ts         # GET /api/articles — list blog posts from Notion
│   └── article/[slug].ts   # GET /api/article/:slug — single post
│
├── public/             # Static assets, favicons, OG images
├── vercel.json         # Vercel config: headers, cache, CORS
└── NOTION_CMS_SETUP.md # Full Notion CMS setup guide
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Routing | React Router DOM 6 |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Server state | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Backend | Vercel Serverless Functions (Node.js) |
| CMS | Notion API |
| Analytics | Plausible (privacy-first, no setup needed) |
| Deployment | Vercel (auto-deploy on push to `main`) |

---

## Notion CMS Setup

The blog ("Shepherd Magazine") pulls content from a Notion database. See **[NOTION_CMS_SETUP.md](./NOTION_CMS_SETUP.md)** for the full walkthrough.

**Quick summary:**

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) → create a new integration → copy the secret
2. Create a Notion database with these exact column names:

   | Property | Type |
   |---|---|
   | Title | Title |
   | Slug | Text |
   | Excerpt | Text |
   | Category | Select |
   | Date | Date |
   | ReadTime | Text |
   | CoverImage | Files & Media |
   | Published | Checkbox |

3. Connect the database to your integration (Database → `...` menu → Connections)
4. Copy the database ID from the URL and add both values to `.env.local`
5. Check "Published" on any article to make it live (5-minute cache)

> **Image tip:** Notion-hosted images expire after 1 hour. Use external URLs (Cloudinary, etc.) for cover images.

---

## Deployment

The project auto-deploys to Vercel on every push to `main`.

**First-time setup:**
1. Import the repo on [vercel.com](https://vercel.com)
2. Add environment variables under **Settings → Environment Variables**:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
3. Deploy — Vercel handles the rest

**Manual deploy:**
```bash
npm run build   # verify build passes locally first
git push        # triggers Vercel auto-deploy
```

---

## API Endpoints

These run as Vercel serverless functions in production and via `npm run dev:local` locally.

| Endpoint | Description |
|---|---|
| `GET /api/articles` | Returns all published articles (5-min cache) |
| `GET /api/article/:slug` | Returns a single article with full content blocks |

CORS is restricted to `artvillagenaggar.com` and Vercel preview URLs.

---

## Contact

For questions about the project: **hello@artvillagenaggar.com**
