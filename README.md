# Yugveer Child Clinic website

A 5-page animated static site for **Yugveer Child Clinic**, Shiv Road, Moshi, Pune (Dr. Prashant Patil, M.D. Paediatrics).

Pages: `index.html`, `about.html`, `services.html`, `gallery.html`, `contact.html`.

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500

## Content source

Clinic details, services, vaccination schedule, logo and photos come from the clinic's listing at
https://softspectra.co/webapp/yugveer-child-clinic. Longer descriptions were rewritten for this site.

## Editing

- **Phone, WhatsApp, email, address, timings, map and review links, social profiles**: `js/config.js`. The header, footer, buttons and links all update from this file. Social icons only appear once a link is added.
- **Page text**: edit the HTML pages directly.
- **Photos**: `images/`. `logo.png` is the clinic logo, `dr-holding-newborn.jpg` is the home page portrait, and `doctor-desk.jpg` is the doctor's introduction photo.

## Tech

- Plain HTML/CSS/JS with no build step
- GSAP 3.12 + ScrollTrigger for scroll animations, Lenis for smooth scrolling (loaded from CDN; the site still works without them)
- The appointment form opens WhatsApp with the request pre-filled, so no backend is needed
- Respects "reduce motion" accessibility settings
