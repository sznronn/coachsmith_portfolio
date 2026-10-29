# Emily Carter — Strength Coach (website)

```
emily-carter-coach/
├── index.html        Page markup (semantic sections, SEO + social meta)
├── css/styles.css    Design tokens, components, responsive rules
├── js/main.js        Menu, carousels, scroll reveal, contact form
└── assets/images/    Drop your own photos here and update the <img src> paths
```

## Before you publish
1. Replace placeholder photos (Pexels stock) with your own in `assets/images/`.
2. Update email, WhatsApp number (`wa.me/254…`), Instagram and TikTok links in `index.html`.
3. Update `CONFIG.contactEmail` in `js/main.js`. To receive form entries without an email app,
   paste a Formspree/Getform/Netlify endpoint into `CONFIG.formEndpoint`.
4. Replace sample stats, stories and testimonials with real, consented content.

## Run locally
Open `index.html`, or serve the folder: `python3 -m http.server 8000`.
Deploy to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
