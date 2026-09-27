# Morgan Academy Arcade

A browser game website featuring **real, well-known open-source games**, all stored in this repo.
Nothing is loaded from outside game sites, so the games still work when a school filter blocks them.
Analytics, ads and social widgets were removed from each game, and fonts and libraries are served locally.

| Game | Type | Creator | License |
| --- | --- | --- | --- |
| [HexGL](https://github.com/BKcore/HexGL) | 3D racing | Thibaut Despoulain (BKcore) | MIT |
| [Hextris](https://github.com/Hextris/hextris) | Puzzle | Hextris team | GPL-3.0 |
| [Untrusted](https://github.com/AlexNisnevich/untrusted) | Coding puzzle | Alex Nisnevich & Greg Shuflin | CC BY-NC-SA 3.0 |
| [Tower Blocks](https://github.com/iamkun/tower_game) | Reflex | iamkun / BMQB | MIT |
| [2048](https://github.com/gabrielecirulli/2048) | Puzzle | Gabriele Cirulli | MIT |
| [T-Rex Runner](https://github.com/wayou/t-rex-runner) | Reflex | The Chromium Authors | BSD-3-Clause |
| [Radius Raid](https://github.com/jackrugile/radius-raid-js13k) | Space shooter | Jack Rugile | MIT |
| [Astray](https://github.com/wwwtyro/Astray) | 3D maze | Rye Terrell | Public domain |
| [A Dark Room](https://github.com/doublespeakgames/adarkroom) | Text adventure | Doublespeak Games | MPL-2.0 |

Each game keeps its original license file in `public/games/<game>/`. Untrusted is licensed for
**non-commercial use only** (CC BY-NC-SA), which covers a school site.

## Project layout

```
public/index.html        Arcade home page (search, categories, credits)
public/assets/           Shared stylesheet, local fonts, game thumbnails
public/games/<game>/     One folder per game, as released by its creators
wrangler.toml            Cloudflare deploy config (serves public/)
```

To run it offline, serve the `public/` folder with any static web server (for example `npx serve public`).
Some games (HexGL, Astray) load files with JavaScript, so opening `index.html` directly from disk may not work for them.

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
