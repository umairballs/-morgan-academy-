# Morgan Academy Arcade

A browser game website with 11 games in the style of the most popular browser games.
**Every game is original code stored in this repo.** Nothing is embedded or loaded from outside sites
(no iframes, CDNs, image or sound files), so games aren't blocked by school web filters that block game sites.

| Game | Inspired by | Type |
| --- | --- | --- |
| **Cube Dash** | Geometry Dash | 3 levels + endless mode, jump pads, orbs, and a built-in soundtrack |
| **Neon Slope** | Slope / Tunnel Rush | 3D rolling ball on an endless neon track |
| **Block Stack** | Tetris | Hold, ghost piece, next queue, and levels |
| **2048** | 2048 | Undo, auto-save, and swipe controls |
| **Flappy Wings** | Flappy Bird | Medals for high scores |
| **Crossy Hop** | Crossy Road | Roads, rivers, logs, and a time limit that keeps you moving |
| **Snake** | Classic Snake | Walls or no-walls mode, bonus gold apples |
| **Stack Tower** | Stack | Perfect-drop combos |
| **Cookie Tycoon** | Cookie Clicker | 10 buildings, upgrades, golden cookies, and auto-save |
| **Brick Breaker** | Breakout | 9 levels and power-ups |
| **Minesweeper** | Minesweeper | 3 difficulties, flag mode for touchscreens |

Every game works with a keyboard, a mouse, and touchscreens (Chromebooks, iPads, phones).
Best scores are saved in the browser on each computer.

## How to run it

The site is plain HTML/CSS/JS with no build step or install.

- **Open it directly:** download the repo and double-click `public/index.html`. It works offline, including from a USB stick.
- **Put it online with GitHub Pages:** in the repo on GitHub go to *Settings → Pages*, set the source to
  *Deploy from a branch*, and pick the branch and `/ (root)`. The site will be at
  `https://<username>.github.io/-morgan-academy-/`.
  (If the school blocks `github.io`, use the offline option.)

## Project layout

```
public/index.html   Arcade home page (search + categories)
public/assets/common.js Shared helpers: saving scores, sound effects, touch/swipe input
public/assets/game.css  Shared styling for every game page
public/games/*.html  One self-contained file per game
```

To add a new game, copy any file in `public/games/`, change it, and add an entry to the `GAMES` list in `public/index.html`.

## Deploy to Cloudflare (`*.workers.dev`)

This repo is set up as a Cloudflare Worker that serves the static files in `public/`.
In the Cloudflare dashboard (*Workers & Pages → your Worker → Settings → Build*) use:

- Build command: *(none)*
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

Every push to the connected branch redeploys automatically. To deploy by hand:

```bash
npx wrangler login
npm run deploy
```
