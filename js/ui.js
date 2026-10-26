(function () {
  const ASF = window.ASF;
  ASF.entryLang = ASF.entryLang || {};
  ASF.mapState = ASF.mapState || { booted: false, activeId: null, route: [] };
  if (!ASF.mapState.route) ASF.mapState.route = [];
  ASF.focusSelector = null;

  ASF.lang = function () {
    return document.documentElement.lang === "ru" ? "ru" : "fr";
  };

  ASF.ui = function () {
    return ASF.content.ui[ASF.lang()];
  };

  ASF.place = function (id) {
    return ASF.content.places.find(function (place) {
      return place.id === id;
    }) || null;
  };

  ASF.setLang = function (next) {
    if (next !== "fr" && next !== "ru" || next === ASF.lang()) return;
    try {
      localStorage.setItem("asf-lang", next);
    } catch (error) {
      /* Storage can be unavailable. The choice still applies to this page. */
    }
    document.documentElement.lang = next;
    ASF.entryLang = {};
    ASF.focusSelector = '[data-set-lang="' + next + '"]';
    ASF.render();
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  ASF.el = el;

  function currentPage() {
    const page = document.body.dataset.page;
    return page === "lieu" ? "lieux" : page;
  }

  function renderHeader() {
    const ui = ASF.ui();
    const header = document.getElementById("site-header");
    header.replaceChildren();
    const inner = el("div", "header-inner");
    const brand = el("a", "brand");
    brand.href = "index.html";
    const mark = el("img");
    mark.src = "images/logo.png";
    mark.alt = "";
    mark.width = 240;
    mark.height = 137;
    brand.append(mark, document.createTextNode(ui.brand));
    inner.append(brand);

    const nav = el("nav", "site-nav");
    nav.setAttribute("aria-label", ASF.lang() === "ru" ? "Основная навигация" : "Navigation principale");
    ui.nav.forEach(function (item) {
      const link = el("a", "", item.label);
      link.href = item.href;
      if (item.id === currentPage()) link.setAttribute("aria-current", "page");
      nav.append(link);
    });
    inner.append(nav);

    const group = el("div", "lang-switch");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", ui.langLabel);
    ["fr", "ru"].forEach(function (code) {
      const button = el("button", "", code.toUpperCase());
      button.type = "button";
      button.setAttribute("data-set-lang", code);
      button.setAttribute("aria-pressed", ASF.lang() === code ? "true" : "false");
      button.setAttribute("lang", code);
      group.append(button);
    });
    inner.append(group);
    header.append(inner);

    const skip = document.querySelector(".skip");
    if (skip) skip.textContent = ui.skip;
    const titles = ui.pageTitles;
    const page = document.body.dataset.page;
    if (page === "lieu") {
      const place = ASF.place(new URLSearchParams(location.search).get("id"));
      document.title = place ? place.cardTitle[ASF.lang()] + " — " + ui.brand : titles.lieu;
    } else {
      document.title = titles[page] || ui.brand;
    }
  }

  function renderFooter() {
    const ui = ASF.ui();
    const footer = document.getElementById("site-footer");
    footer.replaceChildren();
    const inner = el("div", "footer-inner");
    inner.append(el("h2", "", ui.brand));
    inner.append(el("p", "", ui.footerText));
    inner.append(el("p", "footer-author", ui.author));
    const nav = el("nav", "footer-nav");
    ui.nav.forEach(function (item) {
      const link = el("a", "", item.label);
      link.href = item.href;
      nav.append(link);
    });
    const sources = el("a", "", ui.sourcesLink);
    sources.href = "recherche.html#sources";
    nav.append(sources);
    inner.append(nav);
    footer.append(inner);
  }

  function revealTargets() {
    return document.querySelectorAll([
      ".hero",
      ".section > .wrap > h1",
      ".section > .wrap > h2",
      ".card",
      ".cta-inner",
      ".story-layout",
      ".nades",
      ".audio-entry",
      ".research > .wrap > .prose",
      ".research-block",
      ".sources",
      ".map-tools",
      ".map-canvas",
      ".map-side",
      ".footer-inner"
    ].join(", "));
  }

  const revealHolding = new WeakSet();
  let revealScrollY = 0;

  function revealBox(entry) {
    const rect = entry.boundingClientRect;
    const root = entry.rootBounds;
    const rootTop = root ? root.top : 0;
    const rootBottom = root ? root.bottom : (window.innerHeight || 1) * 0.9;
    const rootH = Math.max(1, rootBottom - rootTop);
    const height = rect.height || 1;
    const visible = Math.max(0, Math.min(rect.bottom, rootBottom) - Math.max(rect.top, rootTop));
    return {
      ratio: visible / height,
      visible: visible,
      rootH: rootH,
      tall: height >= rootH,
      above: rect.top < rootTop - 4,
      below: rect.top > rootTop && rect.bottom > rootBottom
    };
  }

  function revealWantsVisible(box, direction) {
    if (box.tall) return box.visible >= box.rootH * 0.2;
    if (direction === "up" && box.below) return box.ratio >= 0.28;
    if (box.above) return box.ratio >= 0.2;
    return box.ratio >= 0.12;
  }

  function showReveal(node, delay) {
    if (delay) node.style.setProperty("--reveal-delay", delay + "ms");
    revealHolding.add(node);
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        node.classList.add("is-visible");
        revealHolding.delete(node);
      });
    });
  }

  function revealContent() {
    if (ASF.revealObserver) {
      ASF.revealObserver.disconnect();
      ASF.revealObserver = null;
    }
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const nodes = revealTargets();
    let cardDelay = 0;
    revealScrollY = window.scrollY;
    ASF.revealObserver = new IntersectionObserver(function (entries) {
      const y = window.scrollY;
      let direction = "still";
      if (y < revealScrollY - 1) direction = "up";
      else if (y > revealScrollY + 1) direction = "down";
      revealScrollY = y;
      let enterIndex = 0;
      /* Each block fades in once and then stays: hiding content again when
         it scrolls away made it flicker and could hide text from search,
         printing and anchors. */
      entries.forEach(function (entry) {
        const node = entry.target;
        if (revealHolding.has(node) || node.classList.contains("is-visible")) {
          ASF.revealObserver.unobserve(node);
          return;
        }
        if (revealWantsVisible(revealBox(entry), direction)) {
          node.style.setProperty("--reveal-delay", enterIndex * 60 + "ms");
          enterIndex += 1;
          node.classList.add("is-visible");
          ASF.revealObserver.unobserve(node);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: [0, 0.08, 0.12, 0.2, 0.28, 0.45, 0.7, 1] });

    nodes.forEach(function (node) {
      node.classList.add("reveal");
      if (node.classList.contains("map-canvas") || node.classList.contains("map-side")) {
        node.classList.add("reveal-fade");
      }
      const rect = node.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (visible) {
        const delay = node.classList.contains("card") ? cardDelay : 0;
        if (node.classList.contains("card")) cardDelay += 70;
        showReveal(node, delay);
      }
      ASF.revealObserver.observe(node);
    });
  }

  function syncHeaderHeight() {
    const header = document.getElementById("site-header");
    if (header) document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }

  window.addEventListener("resize", syncHeaderHeight);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHeaderHeight);

  ASF.render = function () {
    renderHeader();
    syncHeaderHeight();
    renderFooter();
    if (typeof ASF.renderPage === "function") ASF.renderPage();
    if (location.hash === "#sources") {
      const target = document.getElementById("sources");
      if (target) target.scrollIntoView();
    }
    revealContent();
    if (ASF.focusSelector) {
      const focus = document.querySelector(ASF.focusSelector);
      ASF.focusSelector = null;
      if (focus) focus.focus();
    }
  };

  document.addEventListener("click", function (event) {
    const langButton = event.target.closest("[data-set-lang]");
    if (langButton) {
      event.preventDefault();
      ASF.setLang(langButton.getAttribute("data-set-lang"));
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    ASF.render();
  });
})();
