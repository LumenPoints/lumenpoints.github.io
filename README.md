# lumenpoints.com

Static site for LumenPoints. No build step — plain HTML, CSS, and JS.

## Publishing on GitHub Pages

1. Push this repo to GitHub.
2. Settings → Pages → Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/docs`. Save.
4. Add `lumenpoints.com` under Custom domain, then point your DNS at GitHub Pages.

The `.nojekyll` file is required — without it GitHub ignores the `_ds/` folder and the site loses its stylesheet.

## Files

- `index.html` — home page (State A: review-safe, no pricing)
- `privacy/`, `terms/` — legal pages
- `support.html` — support page (FAQ + contact form)
- `support.js` — page runtime
- `assets/` — logo pack, photography, pillar dots, favicon
- `_ds/` — design tokens and component bundle
- `app-kit/` — the in-hero iPhone app mockup (loaded in an iframe)

## Before launch

- The waitlist and contact forms are front-end only. Wire them to MailerLite (or your provider) by pointing the submit handler at your form endpoint.
- `/privacy` and `/terms` are real pages (`docs/privacy/index.html`, `docs/terms/index.html`). Have counsel review the text before submission.
- Swap the hero iframe for real 1290x2796 App Store screenshots when available.
- On launch day, copy `LumenPoints Home v2 - STATE B -hold-.dc.html` over `docs/index.html` (one edit pass). It carries pricing, the trial line, App Store badges, and the restored hero trust line. Do not deploy it before in-app purchases are live.
