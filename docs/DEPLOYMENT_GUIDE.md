# Deployment guide

The redesign is a static site: `npm run build` produces a `dist/` folder of HTML, JS, CSS and images with no server-side code. It can be hosted anywhere that serves static files. The old WordPress site runs on nginx; the same server, or any static host, can serve the new build.

## Build

```bash
npm ci
cp .env.example .env     # set VITE_FORM_ENDPOINT (+ VITE_FORM_ACCESS_KEY for Web3Forms)
npm run build            # typecheck + production build to dist/
npm run preview          # local check of the built output
```

`dist/` is about 8.6 MB, of which 6.5 MB is `images/`. JS is 69.7 kB gzipped (app) + 53.6 kB gzipped (React/Router vendor chunk), CSS 10.3 kB gzipped; each page is a lazy chunk of 0.5 to 7.7 kB gzipped.

## Option A: keep the existing nginx host (recommended if WordPress is retired)

1. Upload the contents of `dist/` to the web root (where WordPress's `index.php` currently sits), after backing up and moving WordPress out of the way. Keep `wp-content/uploads` for a few weeks in case any external site hotlinks an image.
2. nginx server block:

```nginx
server {
  listen 443 ssl http2;
  server_name imateengineering.in www.imateengineering.in;
  root /var/www/imate/dist;
  index index.html;

  # redirects from retired WordPress URLs (same list as vercel.json)
  rewrite ^/(about|about-us)/?$                         /profile permanent;
  rewrite ^/awards/?$                                   /awards-certifications permanent;
  rewrite ^/(contact|schedule-an-appointment|thank-you)/?$ /contact-us permanent;
  rewrite ^/(innovative-engineering-solutions|capabilities-of-imate-engineering)/?$ /capabilities permanent;
  rewrite ^/sitemap/?$                                  /sitemap.xml permanent;
  rewrite ^/category/.*$                                /blog permanent;
  rewrite ^/dipi_media_category/off-road-vehicle-part/?$ /products#off-road permanent;
  rewrite ^/dipi_media_category/compressor-parts/?$      /products#compressor permanent;
  rewrite ^/dipi_media_category/machinery-parts/?$       /products#machinery permanent;
  rewrite ^/dipi_media_category/cast-iron-stainless-steels-and-steel-valves/?$ /products#valves permanent;
  rewrite ^/dipi_cpt_category/.*$                       /products permanent;
  rewrite ^/.*proprietorship-also-known-as-trader.*$    /blog permanent;
  rewrite ^/the-nonprofit-landscape-varie-also-known-as-trader(-\d+)?/?$ /blog permanent;
  rewrite ^/(.+)/$ /$1 permanent;      # drop trailing slashes

  location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  location /images/ { add_header Cache-Control "public, max-age=2592000"; }
  location / {
    try_files $uri $uri/ /index.html;  # SPA fallback
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header Referrer-Policy strict-origin-when-cross-origin;
  }
  gzip on; gzip_types text/css application/javascript application/json image/svg+xml;
}
```

3. Remove the WordPress cron and any WP Rocket cache rules from the server config.
4. Keep the Google Tag Manager container as is (it is in `index.html`).

Apache equivalent: a `.htaccess` with `RewriteEngine On`, the same `RewriteRule … [R=301,L]` lines, and `FallbackResource /index.html`.

## Option B: Vercel (zero config)

`vercel.json` already contains the SPA rewrite, all 301 redirects, cache headers and security headers. Import the repository on Vercel or run `npx vercel --prod`, then point the domain's DNS (A/CNAME) at Vercel. Nothing else to configure except the two form environment variables.

## Option C: Netlify, Cloudflare Pages, S3 + CloudFront

All work. Convert the `redirects` list in `vercel.json` to the host's format (`_redirects` for Netlify/Cloudflare, CloudFront Functions for AWS) and add a 200 rewrite of `/*` to `/index.html`.

## Forms

There is no PHP or database any more, so Gravity Forms is gone. The new form posts to whatever `VITE_FORM_ENDPOINT` names:

- **Web3Forms** (free, supports attachments on paid tiers): set `VITE_FORM_ENDPOINT=https://api.web3forms.com/submit` and `VITE_FORM_ACCESS_KEY=…` (the key is a public, send-only key that is safe in the browser; recipients are configured on the Web3Forms side).
- **Formspree**: `VITE_FORM_ENDPOINT=https://formspree.io/f/<id>`.
- **Own backend**: any endpoint that accepts JSON or multipart POST and replies 2xx. Validate inputs and attachments server side.

Until an endpoint is set the form falls back to opening the visitor's mail client, and says so on screen.

## Go-live checklist

- [ ] Set `VITE_FORM_ENDPOINT` and test a real submission to kamraj@imateengineering.in.
- [ ] Confirm GTM container `GTM-T25MB59X` still fires (Tag Assistant).
- [ ] Submit `https://imateengineering.in/sitemap.xml` in Google Search Console; remove the old `sitemap_index.xml` reference.
- [ ] Verify the 301s with `curl -I https://imateengineering.in/profile/` (expect 301 → `/profile`).
- [ ] Export WordPress (Tools → Export) and keep the database dump before decommissioning.
- [ ] Keep `wp-content/uploads` reachable for 30 days or map it to `/images/` with one more rewrite: `rewrite ^/wp-content/uploads/(.*)$ /images/$1 permanent;`.

## Risks

- **Form delivery.** The only functional regression risk: WordPress handled email on the server; the new site depends on a third-party form service or an endpoint the client must set up. Mitigated by the mailto fallback and the go-live test.
- **Rankings.** URLs are preserved and redirects cover every indexed path, but Google will re-crawl; expect a short period of position movement. Titles and descriptions are now richer than before.
- **Image resolution.** The site can only use what the server had (400 to 500 px). The design frames them so they hold up, but new photography is the real fix.
- **Unverified content.** Items in `CLIENT-REVIEW.md` carry a visible badge until the client confirms them.
- **No CMS.** Content is edited in `src/data/*.ts` and redeployed. If iMate needs self-service editing, a headless CMS or a return to WordPress with a custom theme would be the next step; neither was in scope.
