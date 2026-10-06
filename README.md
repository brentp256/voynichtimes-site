# Voynich Times Cabinet of Curiosities

Live-updating website for our collection of curiosities, products, news, and upcoming releases.

- Powered by Google Sheets + Cloudflare Pages
- News / Wunderkammer
- Full database (1,000+ items)
- Recent & upcoming releases

Everything updates instantly when we edit the Sheets!

## Share bars

Feature articles, Wunderkammer editions, and the News page include a share bar. The stylesheet and script are shared: `/css/share.css` and `/js/share.js`. Buttons are plain share links (X, Facebook, Reddit, Bluesky, email, and copy link) built from the page’s canonical URL and `<title>`. On phones, a Web Share button is added when the browser supports it. No third-party widgets, pixels, or cookies.

To add the bar to a new article:

1. In `<head>`:

```html
<link rel="stylesheet" href="/css/share.css">
<script src="/js/share.js" defer></script>
```

2. Under the title, and again at the end of the article:

```html
<div class="vt-share" data-vt-share></div>
<div class="vt-share vt-share--end" data-vt-share></div>
```

Use `vt-share--center` to center a bar in a hero. The page needs a `<title>` and `<link rel="canonical" href="https://voynichtimes.com/...">`.
