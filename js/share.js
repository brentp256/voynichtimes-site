/**
 * Voynich Times share bar.
 *
 * Share links are plain intent URLs built from the page's canonical URL and
 * title. No third-party SDKs, tracking pixels, or cookies.
 *
 * Add it to a new article:
 *   1. In <head>:
 *        <link rel="stylesheet" href="/css/share.css">
 *        <script src="/js/share.js" defer></script>
 *   2. Under the title, and again at the end of the article:
 *        <div class="vt-share" data-vt-share></div>
 *      Closing bar: class "vt-share vt-share--end".
 *      Centered hero: class "vt-share vt-share--center".
 *   3. Set <title> and
 *        <link rel="canonical" href="https://voynichtimes.com/your-path/">
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", api.mount);
    } else {
      api.mount();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var SITE = "https://voynichtimes.com/";
  var VIA = "VoynichTimes";

  var ICONS = {
    x: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.1C12.2 3 11 4.6 11 6.9v1.6H9v2.7h2V21h3v-9.8h2.3l.4-2.7h-2.7z"/></svg>',
    reddit: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.55 3.25a1.15 1.15 0 0 0-.77 1.95l1.05 1.02a6.3 6.3 0 0 0-2.83-.66c-1.05 0-2.05.25-2.9.7l1.02-.98a1.15 1.15 0 1 0-1.62-1.63 1.15 1.15 0 0 0 .08 1.7l-.95.9A6.55 6.55 0 0 0 5.3 11.1c0 .42.05.83.15 1.22a2.25 2.25 0 0 0-1.35 2.05c0 1.35 1.45 2.45 3.3 2.45.42 0 .82-.05 1.18-.15.95.62 2.15.98 3.42.98s2.47-.36 3.42-.98c.36.1.76.15 1.18.15 1.85 0 3.3-1.1 3.3-2.45 0-.9-.55-1.68-1.35-2.05.1-.39.15-.8.15-1.22a6.55 6.55 0 0 0-2.33-5.05l-.95-.9a1.15 1.15 0 0 0 .08-1.7 1.15 1.15 0 0 0-1.15-.3zM8.95 12.45a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zm6.1 0a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM8.55 16.15c.62.62 1.9 1.05 3.45 1.05s2.83-.43 3.45-1.05a.7.7 0 0 1 .99.99c-.95.95-2.55 1.51-4.44 1.51s-3.49-.56-4.44-1.51a.7.7 0 0 1 .99-.99z"/></svg>',
    bluesky: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 11.55c-1.05-2.05-3.9-5.95-6.55-7.8C4.3 2.85 3.35 3.5 3.35 4.9c0 .55.28 4.25.5 4.85.68 1.95 3.2 2.65 5.45 2.3-3.7.6-5.05 2.65-2.85 4.7C10.4 20.7 11.85 16.3 12 15.15c.15 1.15 1.6 5.55 5.55 1.6 2.2-2.05.85-4.1-2.85-4.7 2.25.35 4.77-.35 5.45-2.3.22-.6.5-4.3.5-4.85 0-1.4-.95-2.05-2.1-1.15-2.65 1.85-5.5 5.75-6.55 7.8z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l2.12-2.12a5 5 0 0 0-7.07-7.07L11.2 5.7"/><path d="M14 11a5 5 0 0 0-7.54-.54L4.34 12.58a5 5 0 0 0 7.07 7.07l1.39-1.35"/></svg>',
    native: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="M7 8l5-5 5 5"/><path d="M5 13.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4.5"/></svg>'
  };

  function shareTitle(raw) {
    var title = String(raw || "").replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
    title = title.replace(/\s+\|\s+The Voynich Times\s*$/i, "");
    return title || "The Voynich Times";
  }

  function buildShareUrls(url, title) {
    var pageUrl = String(url || "");
    var pageTitle = shareTitle(title);
    var encodedUrl = encodeURIComponent(pageUrl);
    var encodedTitle = encodeURIComponent(pageTitle);
    var blueskyText = encodeURIComponent(pageTitle + "\n" + pageUrl);
    var mailBody = encodeURIComponent(pageTitle + "\n\n" + pageUrl);

    return {
      url: pageUrl,
      title: pageTitle,
      x: "https://x.com/intent/tweet?url=" + encodedUrl + "&text=" + encodedTitle + "&via=" + VIA,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl,
      reddit: "https://www.reddit.com/submit?url=" + encodedUrl + "&title=" + encodedTitle,
      bluesky: "https://bsky.app/intent/compose?text=" + blueskyText,
      email: "mailto:?subject=" + encodedTitle + "&body=" + mailBody
    };
  }

  function pageUrl() {
    var link = document.querySelector('link[rel="canonical"]');
    var raw = link && (link.getAttribute("href") || "").trim();
    if (raw) {
      try {
        var abs = new URL(raw, SITE);
        if (abs.protocol === "http:" || abs.protocol === "https:") {
          abs.hash = "";
          return abs.href;
        }
      } catch (err) {
        /* fall through to the public path */
      }
    }
    return new URL(location.pathname || "/", SITE).href;
  }

  function pageTitle() {
    return shareTitle(document.title || "");
  }

  function el(tag, attrs) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.focus();
      area.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (err) {
        document.body.removeChild(area);
        reject(err);
        return;
      }
      document.body.removeChild(area);
      if (ok) resolve();
      else reject(new Error("copy failed"));
    });
  }

  function flash(button, live, message, restoreLabel, restoreTip) {
    var tip = button.querySelector(".vt-share__tip");
    if (tip) tip.textContent = message;
    button.classList.add("is-copied");
    live.textContent = "";
    window.setTimeout(function () {
      live.textContent = message;
    }, 30);
    window.clearTimeout(button._vtTimer);
    button._vtTimer = window.setTimeout(function () {
      if (tip) tip.textContent = restoreTip;
      button.classList.remove("is-copied");
      button.setAttribute("aria-label", restoreLabel);
      live.textContent = "";
    }, 2000);
  }

  function makeControl(spec, links) {
    var control;
    if (spec.kind === "button") {
      control = el("button", { type: "button", class: spec.className, "data-share": spec.id, "aria-label": spec.label });
    } else {
      control = el("a", {
        class: spec.className,
        "data-share": spec.id,
        href: links[spec.id],
        "aria-label": spec.label
      });
      if (spec.id !== "email") {
        control.setAttribute("target", "_blank");
        control.setAttribute("rel", "noopener noreferrer");
      }
    }
    control.insertAdjacentHTML("beforeend", ICONS[spec.id]);
    var tip = el("span", { class: "vt-share__tip", "aria-hidden": "true" });
    tip.textContent = spec.tip;
    control.appendChild(tip);
    return control;
  }

  function fill(bar, index) {
    if (bar.getAttribute("data-vt-ready") === "true") return;
    bar.setAttribute("data-vt-ready", "true");

    var links = buildShareUrls(pageUrl(), pageTitle());
    var canNative = typeof navigator.share === "function";
    if (canNative) bar.classList.add("vt-share--can-native");

    var label = el("p", { class: "vt-share__label", id: "vt-share-label-" + index });
    label.textContent = "Share";

    var list = el("ul", { class: "vt-share__list", role: "group", "aria-labelledby": label.id });
    var live = el("div", { class: "vt-share__live", "aria-live": "polite" });

    var specs = [
      { id: "x", label: "Share on X", tip: "X", className: "vt-share__btn" },
      { id: "facebook", label: "Share on Facebook", tip: "Facebook", className: "vt-share__btn" },
      { id: "reddit", label: "Share on Reddit", tip: "Reddit", className: "vt-share__btn" },
      { id: "bluesky", label: "Share on Bluesky", tip: "Bluesky", className: "vt-share__btn" },
      { id: "email", label: "Share by email", tip: "Email", className: "vt-share__btn" },
      { id: "copy", label: "Copy link", tip: "Copy link", className: "vt-share__btn", kind: "button" }
    ];
    if (canNative) {
      specs.push({
        id: "native",
        label: "Share using your device",
        tip: "Share",
        className: "vt-share__btn vt-share__native",
        kind: "button"
      });
    }

    specs.forEach(function (spec) {
      var item = el("li");
      var control = makeControl(spec, links);
      if (spec.id === "copy") {
        control.addEventListener("click", function () {
          copyText(links.url).then(function () {
            flash(control, live, "Copied!", "Copy link", "Copy link");
          }).catch(function () {
            flash(control, live, "Copy failed", "Copy link", "Copy link");
          });
        });
      }
      if (spec.id === "native") {
        control.addEventListener("click", function () {
          navigator.share({ title: links.title, url: links.url, text: links.title }).catch(function (err) {
            if (err && err.name === "AbortError") return;
          });
        });
      }
      item.appendChild(control);
      list.appendChild(item);
    });

    bar.appendChild(label);
    bar.appendChild(list);
    bar.appendChild(live);
  }

  function mount() {
    var bars = document.querySelectorAll("[data-vt-share]");
    Array.prototype.forEach.call(bars, function (bar, index) {
      fill(bar, index);
    });
  }

  return {
    shareTitle: shareTitle,
    buildShareUrls: buildShareUrls,
    mount: mount
  };
});
