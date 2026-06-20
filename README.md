# Mood Amp Lite ⚡🎸 
**Mood Amp Lite** is a high-octane React, TypeScript, and Vite-powered music recommender web application built for rock, metal, gothic, industrial, punk, and synthwave enthusiasts. The app features a premium **maniac rock/metal magazine aesthetic** (high-contrast layout, rugged custom typography, halftone overlays, and neon purple accents) simulating a printed independent music fanzine.

## Features

- **Tuning Dials**: Match tracks based on Mood, Genre, Era (1970s - 2020s), Region/Scene (Seattle, LA, London, etc.), Purpose, and Energy.
- **Natural Language Descriptions**: Describe what you want to hear (e.g. *"spooky synthwave from Paris"* or *"melancholic grunge"*) and our keyword-boosted algorithm maps concepts directly to database tags.
- **Reference presets**: Provide a band or song (e.g., *Metallica* or *Creep*) to guide recommendations based on their structural characteristics.
- **In-Session Calibration Tuner**: Give active feedback on recommended cards (`Too Heavy`, `Too Soft`, `More Like`, `Less Like`) to recalibrate subsequent scoring instantly in-session.
- **Rich Music Database**: An embedded database of 88 real, iconic rock and metal tracks spanning classic rock, thrash metal, punk, nu-metal, synthwave, post-punk, gothic rock, metalcore, and glam metal.
- **Collector's Mixtape (Favorites)**: Zero signup or backend required. Persist your favorite songs locally inside the browser's `localStorage` with options to filter and clear.
- **External Streaming Integrations**: Quick links to search for matches on YouTube and Spotify directly from song cards.

---

## Design System & Aesthetic

- **Typography**: 
  - Massive headers using **Syne** (extra-wide, geometric, aggressive sans-serif).
  - Modern geometric body text using **Space Grotesk**.
  - Technical parameters and meters using **JetBrains Mono**.
- **Colors**:
  - Deep carbon backgrounds: Zinc-900 / Zinc-950 (`#09090b` / `#040405`).
  - Electric accents: Purple-500 (`#a855f7`) / Neon Purple (`#c084fc`) / Purple glow (`#3b0764`).
- **Texture**: Halftone dot matrix patterns (`dotted-bg`) and warning tape ribbons (`slashed-stripe`) reminiscent of printed punk flyers.

---

## Scoring Logic

Matches are calculated using a weighted relevance formula:

$$\text{Relevance} = (W_{\text{mood}} \times M_{\text{mood}}) + (W_{\text{genre}} \times M_{\text{genre}}) + (W_{\text{purpose}} \times M_{\text{purpose}}) + (W_{\text{era}} \times M_{\text{era}}) + (W_{\text{region}} \times M_{\text{region}}) - (W_{\text{energy}} \times |E_{\text{song}} - E_{\text{target}}|)$$

Additional weights are applied:
- **Reference Lookalike Similarity**: Up to $+10$ points based on shared properties.
- **Description Keyword Boost**: Up to $+5$ points based on synonym matching.
- **Session Feedback**: Boosts liked elements and heavily penalizes disliked artists/songs.

---

## Setup & Running Locally

### Prerequisites

- **Node.js**: v20.x, v22.x or v24.x LTS (installed via winget/nvm)
- **NPM**: v10.x or v11.x

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

### 2. Run the Development Server

Start Vite's fast dev server:

```bash
npm run dev
```

The app will be available locally, typically at [http://localhost:5173/](http://localhost:5173/).

### 3. Build for Production

Compile TypeScript and build the production bundle:

```bash
npm run build
```

This compiles static assets into the `dist/` directory, optimized and ready for static file hosting.
