# Top of the Pops — UK Charts

A retro Top of the Pops-style UK music charts web app. Fetches the current UK top tracks via the Last.fm API.

**Live site:** https://totp-h72eotbn2-ralphcolletts-projects.vercel.app

## Features

- UK Top 40 powered by the Last.fm `geo.getTopTracks` API
- Retro chart UI with gold/silver/bronze positions

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- Vitest + React Testing Library

## Getting Started

### 1. Get a Last.fm API key

Register for a free API key at [last.fm/api](https://www.last.fm/api/account/create).

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your key:

```
VITE_LASTFM_API_KEY=your_api_key_here
```

### 3. Install and run

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run typecheck` | TypeScript type check |
| `npm run build` | Production build |
