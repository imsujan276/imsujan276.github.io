<p align="center">
  <img src="logo192.png" width="75px"/>
</p>

<h1 align="center">sujangainju.com.np</h1>

<p align="center">
  Static HTML portfolio. No framework, no build step, no dependencies.
</p>

---

## 🗂 structure

Every directory with an `index.html` is a URL. The repo root **is** the site.

```
/                            index.html    https://sujangainju.com.np/
/privacy-policy/             index.html    .../privacy-policy/
/privacy-policy/nudge/       index.html    .../privacy-policy/nudge/
/404.html                    served by GitHub Pages for unknown paths
                             (also redirects a handful of legacy URLs)

/css/global.css              design tokens, nav, footer, scroll-reveal
/css/home.css                home page only
/css/page.css                document pages (privacy policies, 404)
/js/main.js                  typewriter, reveal, tabs, carousel, nav

/_template/privacy-policy.html   copy this to add a new app policy
/assets/                     images
/fonts/                      NTR, subset to woff2
```

## 🚀 running it locally

There is nothing to install. Any static server works — the pages use
root-relative paths (`/css/...`), so opening the files directly with `file://`
will not load styles.

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## 📦 deploying

GitHub Pages serves the `main` branch root directly. **Push to `main` and it is
live** — there is no build and no `gh-pages` branch step any more.

```sh
git add -A && git commit -m "..." && git push
```

`.nojekyll` is present so GitHub serves files as-is (without it, the
`_template/` directory would be skipped).

## ➕ adding a privacy policy for a new app

1. `mkdir -p privacy-policy/<app-slug>`
2. `cp _template/privacy-policy.html privacy-policy/<app-slug>/index.html`
3. Replace the `{{APP_NAME}}` / `{{APP_SLUG}}` placeholders and write the real
   content. Set `robots` to `index, follow`.
4. Add it to the `<ul class="policy-index">` list in `privacy-policy/index.html`.
5. Add a `<url>` entry to `sitemap.xml`.

The published URL is `https://sujangainju.com.np/privacy-policy/<app-slug>/`.

## 🎨 color codes

Defined once as CSS custom properties in `css/global.css`.

| Color          | Hex       |
| -------------- | --------- |
| Dark Navy      | `#020c1b` |
| Navy           | `#0a192f` |
| Light Navy     | `#112240` |
| Lightest Navy  | `#233554` |
| Slate          | `#8892b0` |
| Light Slate    | `#a8b2d1` |
| Lightest Slate | `#ccd6f6` |
| White          | `#e6f1ff` |
| Green          | `#64ffda` |

## 🔤 fonts

The site uses **NTR** only. `fonts/ntr-latin.woff2` is a 7 KB Latin subset used
by `@font-face`; `fonts/NTR-Regular.ttf` is the full original, kept as a
fallback for browsers without woff2.

To regenerate the subset:

```sh
pyftsubset fonts/NTR-Regular.ttf --output-file=fonts/ntr-latin.woff2 --flavor=woff2 --layout-features='kern,liga,clig,calt' --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+25B9,U+FEFF,U+FFFD" --no-hinting --desubroutinize
```

## 📜 history

Until August 2026 this was a Create React App site (React 16, Material-UI,
Bootstrap, rsuite) built to a `gh-pages` branch, using hash routing
(`/#/privacy-policy`). It was rewritten as plain HTML so that sub-pages are real
URLs. The React source is in the git history at commit `654785c`.
