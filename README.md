# Wedding Photography Portfolio — Prototype

A front-end-only prototype (React + Vite). No backend, no database, no APIs — deploys as static files.

## Project structure

```
src/
├── config/
│   ├── site.js        # ALL copy: name, tagline, bio, packages, contact text
│   └── gallery.js     # The four shoot collections + placeholder logic
├── assets/gallery/
│   ├── folder1/       # ← drop shoot 1's images here (01.jpg, 02.jpg, ...)
│   ├── folder2/       # ← shoot 2
│   ├── folder3/       # ← shoot 3
│   └── folder4/       # ← shoot 4
├── components/
│   ├── Nav.jsx            # Fixed top nav, mobile dropdown
│   ├── Footer.jsx
│   ├── PlaceholderFrame.jsx  # Elegant stand-in frames until real photos exist
│   ├── Lightbox.jsx       # Fullscreen viewer (click any gallery photo)
│   ├── PackageCard.jsx
│   └── ContactForm.jsx    # Front-end-only form with success state
├── pages/
│   ├── Home.jsx           # Split hero
│   ├── Portfolio.jsx      # The chapter-scroll gallery (core interaction)
│   ├── Packages.jsx
│   ├── About.jsx
│   └── Contact.jsx
└── styles/global.css      # Design tokens + all styling
```

## Swapping in the real images

Copy the photos from **IG Picks** into the four folders under
`src/assets/gallery/` (jpg / jpeg / png / webp). They're picked up
automatically at build time, in **filename order** — so name them
`01.jpg, 02.jpg, ...` to preserve the Instagram order. No code changes
needed. Shoot titles/captions are edited at the top of `src/config/gallery.js`.

Tip: export images at ~2000px on the long edge, quality ~80 JPEG. The site
lazy-loads them, but 8 MB originals will still feel heavy.

## Run locally

```bash
npm install
npm run dev        # opens http://localhost:5173
```

Production build check:

```bash
npm run build      # outputs static files to dist/
npm run preview    # serves the built site locally
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Wedding portfolio prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(`node_modules/` and `dist/` are already ignored via .gitignore.)

## Deploy on Render (Static Site)

1. Render dashboard → **New → Static Site** → connect the GitHub repo.
2. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - No environment variables needed.
3. **Important (client-side routing):** under the site's
   **Redirects/Rewrites** tab, add one rule so refreshing `/portfolio` etc.
   works:
   - Source: `/*`  → Destination: `/index.html` → Action: **Rewrite**
4. Deploy. Every push to `main` auto-redeploys.

## Notes on the gallery interaction

- Desktop: CSS scroll-snap provides the structure (vertical `y mandatory`
  chapters; each chapter holds a horizontal track). A ~20-line `wheel`
  handler in `Portfolio.jsx` redirects vertical wheel input into horizontal
  movement until a shoot's track is exhausted, then lets native snap carry
  you to the next chapter.
- Mobile: wheel events don't exist on touch, so phones get natural
  gestures — vertical swipe between shoots, horizontal swipe through a
  shoot's photos. No touch hijacking.
- Progress dots under each shoot show position within it; dots on the right
  edge show which shoot you're on (and are clickable).

## If you later add a real backend (future reference — not built)

- **Contact form:** `submitInquiry()` in `src/components/ContactForm.jsx` is
  the single seam — replace its body with a `fetch` POST to your endpoint
  (or a service like Formspree needs only the endpoint URL). The payload
  shape is already `{ name, email, weddingDate, message }`.
- **Live Instagram feed:** replace the build-time glob in
  `src/config/gallery.js` with a fetch to your API (Instagram's Graph API
  requires a server-side token, so you'd add a tiny proxy endpoint). The
  components only consume `{ src, alt }` arrays, so nothing else changes.
- **Hosting:** Render Static Site can stay for the front end; a backend
  would be a separate Render Web Service the form/gallery fetch from.
