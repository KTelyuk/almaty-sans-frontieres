(function () {
  const ASF = window.ASF;

  function media(photo, fallbackName, className) {
    const figure = ASF.el("figure", className || "");
    const lang = ASF.lang();
    const ui = ASF.ui();
    if (photo && photo.src) {
      const image = ASF.el("img");
      image.src = photo.src;
      image.alt = photo.alt[lang];
      if (photo.position) image.style.objectPosition = photo.position;
      if (className === "card-media") image.className = "frame";
      figure.append(image);
      if (photo.credit) {
        const caption = ASF.el("figcaption", "credit");
        const link = ASF.el("a", "", photo.credit[lang]);
        link.href = photo.creditHref;
        caption.append(link);
        figure.append(caption);
      }
    } else {
      const fallback = ASF.el("div", "photo-fallback");
      fallback.append(ASF.el("strong", "", fallbackName));
      fallback.append(ASF.el("p", "", ui.photoPending));
      if (photo && photo.referenceHref) {
        const link = ASF.el("a", "", ui.photoLink);
        link.href = photo.referenceHref;
        fallback.append(link);
      }
      figure.append(fallback);
    }
    return figure;
  }

  function cards() {
    const ui = ASF.ui();
    const grid = ASF.el("div", "cards");
    ASF.content.places.forEach(function (place) {
      const card = ASF.el("article", "card");
      card.append(media(place.photo, place.cardTitle[ASF.lang()], "card-media"));
      const body = ASF.el("div", "card-body");
      body.append(ASF.el("p", "eyebrow", place.category[ASF.lang()]));
      body.append(ASF.el("h2", "", place.cardTitle[ASF.lang()]));
      const link = ASF.el("a", "btn", ui.readStory);
      link.href = "lieu.html?id=" + place.id;
      body.append(link);
      card.append(body);
      grid.append(card);
    });
    return grid;
  }

  function renderHome() {
    const lang = ASF.lang();
    const home = ASF.content.home[lang];
    const heroPhoto = ASF.content.hero;
    const main = document.getElementById("content");
    main.replaceChildren();

    const hero = ASF.el("section", "hero");
    const image = ASF.el("img");
    image.src = heroPhoto.src;
    image.alt = heroPhoto.alt[lang];
    hero.append(image);
    hero.append(ASF.el("div", "hero-shade"));
    const copy = ASF.el("div", "hero-copy");
    copy.append(ASF.el("h1", "", home.title));
    copy.append(ASF.el("p", "hero-sub", home.subtitle));
    copy.append(ASF.el("p", "hero-lead", home.lead));
    home.paragraphs.forEach(function (text) {
      copy.append(ASF.el("p", "hero-text", text));
    });
    const actions = ASF.el("div", "actions");
    const mapLink = ASF.el("a", "btn", home.primary);
    mapLink.href = "carte.html";
    const placesLink = ASF.el("a", "btn btn-ghost", home.secondary);
    placesLink.href = "lieux.html";
    actions.append(mapLink, placesLink);
    copy.append(actions);
    hero.append(copy);

    const credit = ASF.el("p", "credit");
    const creditLink = ASF.el("a", "", heroPhoto.credit[lang]);
    creditLink.href = heroPhoto.creditHref;
    credit.append(creditLink);
    hero.append(credit);
    main.append(hero);

    const places = ASF.el("section", "section");
    const placesWrap = ASF.el("div", "wrap");
    placesWrap.append(ASF.el("h2", "", home.placesTitle));
    placesWrap.append(cards());
    places.append(placesWrap);
    main.append(places);

    const cta = ASF.el("section", "section cta");
    const ctaWrap = ASF.el("div", "wrap cta-inner");
    ctaWrap.append(ASF.el("p", "", home.cta));
    const ctaActions = ASF.el("div", "actions");
    const ctaLink = ASF.el("a", "btn", home.ctaButton);
    ctaLink.href = "carte.html";
    ctaActions.append(ctaLink);
    ctaWrap.append(ctaActions);
    cta.append(ctaWrap);
    main.append(cta);
  }

  function renderPlaces() {
    const home = ASF.content.home[ASF.lang()];
    const main = document.getElementById("content");
    main.replaceChildren();
    const section = ASF.el("section", "section");
    const wrap = ASF.el("div", "wrap");
    wrap.append(ASF.el("h1", "page-title", home.placesTitle));
    wrap.append(cards());
    section.append(wrap);
    main.append(section);
  }

  function paragraphs(parent, list) {
    list.forEach(function (text) {
      parent.append(ASF.el("p", "", text));
    });
  }

  function renderStory() {
    const id = new URLSearchParams(location.search).get("id");
    const place = ASF.place(id);
    if (!place) {
      renderPlaces();
      return;
    }
    const lang = ASF.lang();
    const ui = ASF.ui();
    const story = place.story[lang];
    const main = document.getElementById("content");
    main.replaceChildren();

    const section = ASF.el("article", "section story");
    const wrap = ASF.el("div", "wrap story-layout");
    const column = ASF.el("div", "");
    column.append(media(place.photo, place.cardTitle[lang], "story-media"));
    const prose = ASF.el("div", "prose");
    prose.append(ASF.el("p", "eyebrow", place.category[lang]));
    prose.append(ASF.el("h1", "", story.title));
    paragraphs(prose, story.paragraphs);
    column.append(prose);
    wrap.append(column);

    const aside = ASF.el("aside", "visit");
    aside.append(ASF.el("h2", "", ui.address));
    aside.append(ASF.el("p", "", place.address[lang]));
    const actions = ASF.el("div", "actions");
    const mapLink = ASF.el("a", "btn", ui.onMap);
    mapLink.href = "carte.html?lieu=" + place.id;
    const audioLink = ASF.el("a", "btn btn-ghost", ui.listen);
    audioLink.href = "audioguide.html#" + place.id;
    actions.append(mapLink, audioLink);
    aside.append(actions);
    /* A quiet "back to the list" link, under a divider. */
    const back = ASF.el("p", "visit-back");
    const backLink = ASF.el("a", "visit-back-link");
    backLink.href = "lieux.html";
    const arrow = ASF.el("span", "visit-back-arrow", "←");
    arrow.setAttribute("aria-hidden", "true");
    backLink.append(arrow, document.createTextNode(ui.allPlaces));
    back.append(backLink);
    aside.append(back);
    wrap.append(aside);
    section.append(wrap);
    main.append(section);

    if (place.nades) {
      const nades = place.nades[lang];
      const band = ASF.el("section", "nades");
      band.id = "nades";
      const inner = ASF.el("div", "nades-inner");
      inner.append(media(place.nades.photo, "NADES", "nades-media"));
      const copy = ASF.el("div", "");
      copy.append(ASF.el("h2", "", nades.title));
      paragraphs(copy, nades.paragraphs);
      inner.append(copy);
      band.append(inner);
      main.append(band);
    }
  }

  function entryLanguage(place) {
    return ASF.entryLang[place.id] === "ru" || ASF.entryLang[place.id] === "fr"
      ? ASF.entryLang[place.id]
      : ASF.lang();
  }

  /* Rounded down, like the browser's own player shows it. */
  function formatClock(seconds) {
    const total = Math.floor(seconds);
    return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
  }

  const headphonesIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="3" y="13" width="5" height="7" rx="2" fill="currentColor"/><rect x="16" y="13" width="5" height="7" rx="2" fill="currentColor"/></svg>';

  function renderAudio() {
    const ui = ASF.ui();
    ASF.audioOpen = ASF.audioOpen || {};
    const main = document.getElementById("content");
    main.replaceChildren();
    const section = ASF.el("section", "section");
    const wrap = ASF.el("div", "wrap");
    wrap.append(ASF.el("h1", "page-title", ui.audioTitle));
    wrap.append(ASF.el("p", "page-intro", ui.audioIntro));
    const list = ASF.el("div", "audio-list");

    ASF.content.places.forEach(function (place, index) {
      const entryLang = entryLanguage(place);
      const story = place.story[entryLang];
      const number = String(index + 1).padStart(2, "0");
      const article = ASF.el("article", "audio-entry");
      article.id = place.id;

      /* The place's photo, with its number like a stop on a route. */
      const figure = ASF.el("figure", "audio-photo");
      if (place.photo && place.photo.src) {
        const image = ASF.el("img");
        image.src = place.photo.src;
        image.alt = place.photo.alt[ASF.lang()];
        image.loading = "lazy";
        if (place.photo.position) image.style.objectPosition = place.photo.position;
        figure.append(image);
      }
      const badge = ASF.el("span", "audio-number", number);
      badge.setAttribute("aria-hidden", "true");
      figure.append(badge);
      article.append(figure);

      const body = ASF.el("div", "audio-body");
      body.append(ASF.el("p", "eyebrow", place.category[ASF.lang()]));
      const title = ASF.el("h2", "", story.title);
      title.lang = entryLang;
      body.append(title);

      /* Language choice and recording length on one line. */
      const meta = ASF.el("div", "audio-meta");
      const chooser = ASF.el("div", "lang-choice");
      chooser.setAttribute("role", "group");
      chooser.setAttribute("aria-label", ui.chooseLang);
      ["fr", "ru"].forEach(function (code) {
        const button = ASF.el("button", "choice", code === "fr" ? "Français" : "Русский");
        button.type = "button";
        button.setAttribute("lang", code);
        button.setAttribute("data-entry-lang", code);
        button.setAttribute("data-place", place.id);
        button.setAttribute("aria-pressed", entryLang === code ? "true" : "false");
        chooser.append(button);
      });
      const duration = ASF.el("span", "audio-duration");
      duration.hidden = true;
      meta.append(chooser, duration);
      body.append(meta);

      const file = place.audio[entryLang];
      const pending = ASF.el("p", "pending", ASF.content.ui[entryLang].pendingAudio);
      pending.lang = entryLang;
      if (file) {
        const player = document.createElement("audio");
        player.controls = true;
        /* "metadata" so a missing file is noticed at once (not only on play):
           until the MP3 exists, the "recording to come" note stays instead. */
        player.preload = "metadata";
        player.hidden = true;
        player.addEventListener("loadedmetadata", function () {
          player.hidden = false;
          pending.remove();
          duration.innerHTML = headphonesIcon + '<span class="audio-bars" aria-hidden="true"><i></i><i></i><i></i></span>';
          duration.append(document.createTextNode(formatClock(player.duration)));
          duration.setAttribute("aria-label", ui.duration + " " + formatClock(player.duration));
          duration.hidden = false;
        });
        player.addEventListener("error", function () {
          player.remove();
        });
        player.src = file;
        /* Only one recording plays at a time; the playing card is highlighted. */
        player.addEventListener("play", function () {
          document.querySelectorAll("audio").forEach(function (other) {
            if (other !== player) other.pause();
          });
          article.classList.add("is-playing");
        });
        ["pause", "ended"].forEach(function (name) {
          player.addEventListener(name, function () {
            article.classList.remove("is-playing");
          });
        });
        body.append(player, pending);
      } else {
        body.append(pending);
      }

      /* First paragraph as a lead; the rest opens with "read more". */
      const transcript = ASF.el("div", "transcript");
      transcript.lang = entryLang;
      transcript.append(ASF.el("p", "audio-lead", story.paragraphs[0]));
      const more = ASF.el("div", "audio-more");
      more.id = "more-" + place.id;
      paragraphs(more, story.paragraphs.slice(1));
      const open = !!ASF.audioOpen[place.id];
      more.hidden = !open;
      transcript.append(more);
      body.append(transcript);

      const toggle = ASF.el("button", "read-more");
      toggle.type = "button";
      toggle.setAttribute("data-read-more", place.id);
      toggle.setAttribute("aria-controls", more.id);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.append(ASF.el("span", "read-more-label", open ? ui.readLess : ui.readMore));
      const chevron = ASF.el("span", "read-more-chevron", "↓");
      chevron.setAttribute("aria-hidden", "true");
      toggle.append(chevron);
      body.append(toggle);

      const links = ASF.el("p", "audio-links");
      const pageLink = ASF.el("a", "", ui.placePage + " →");
      pageLink.href = "lieu.html?id=" + place.id;
      const mapLink = ASF.el("a", "", ui.onMap + " →");
      mapLink.href = "carte.html?lieu=" + place.id;
      links.append(pageLink, mapLink);
      body.append(links);

      article.append(body);
      list.append(article);
    });

    wrap.append(list);
    section.append(wrap);
    main.append(section);
  }

  function renderResearch() {
    const lang = ASF.lang();
    const ui = ASF.ui();
    const research = ASF.content.research[lang];
    const main = document.getElementById("content");
    main.replaceChildren();
    const section = ASF.el("section", "section research");
    const wrap = ASF.el("div", "wrap");
    wrap.append(ASF.el("p", "eyebrow", ui.nav[4].label));
    const prose = ASF.el("div", "prose");
    prose.append(ASF.el("h1", "page-title", research.title));
    prose.append(ASF.el("p", "research-author", ui.author));
    paragraphs(prose, research.paragraphs);
    wrap.append(prose);

    const methods = ASF.el("div", "research-block");
    methods.append(ASF.el("h2", "", research.methodsTitle));
    const list = ASF.el("ul", "");
    research.methods.forEach(function (item) {
      list.append(ASF.el("li", "", item));
    });
    methods.append(list);
    wrap.append(methods);

    const value = ASF.el("div", "research-block");
    value.append(ASF.el("h2", "", research.valueTitle));
    value.append(ASF.el("p", "", research.value));
    wrap.append(value);

    const sources = ASF.el("div", "sources");
    sources.id = "sources";
    sources.append(ASF.el("h2", "", ui.sourcesLink));
    const sourceList = ASF.el("ul", "source-list");
    ASF.content.sources.forEach(function (source) {
      const item = ASF.el("li", "");
      const link = ASF.el("a", "", source.label[lang]);
      link.href = source.href;
      item.append(link);
      if (source.note) item.append(ASF.el("p", "source-note", source.note[lang]));
      sourceList.append(item);
    });
    sources.append(sourceList);
    wrap.append(sources);
    section.append(wrap);
    main.append(section);
  }

  /* Optional "comfort" layers (cafés, water…). Every category starts off;
     js/map.js loads the places from OpenStreetMap when one is switched on. */
  function comfortPanel(ui) {
    const text = ui.comfort;
    const state = ASF.mapState.amenity || { enabled: {} };
    const panel = ASF.el("section", "comfort-panel");
    const body = ASF.el("div", "comfort-body");
    body.append(ASF.el("p", "comfort-hint", text.hint));
    const group = ASF.el("div", "comfort-toggles");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", text.groupLabel);
    ["cafe", "water", "rest", "toilets", "transport"].forEach(function (category) {
      const label = ASF.el("label", "comfort-toggle");
      const input = ASF.el("input");
      input.type = "checkbox";
      input.setAttribute("data-amenity", category);
      input.checked = !!state.enabled[category];
      const swatch = ASF.el("span", "amenity-dot amenity-" + category);
      swatch.setAttribute("aria-hidden", "true");
      if (ASF.amenityGlyphs) swatch.innerHTML = ASF.amenityGlyphs[category];
      label.append(input, swatch, ASF.el("span", "", text.categories[category]));
      group.append(label);
    });
    body.append(group);

    const status = ASF.el("p", "comfort-status", "");
    status.id = "comfort-status";
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    body.append(status);
    const zoom = ASF.el("button", "btn btn-ghost comfort-zoom", text.zoomButton);
    zoom.type = "button";
    zoom.id = "comfort-zoom";
    zoom.hidden = true;
    body.append(zoom);
    const resultsTitle = ASF.el("h3", "comfort-results-title", "");
    resultsTitle.id = "comfort-results-title";
    resultsTitle.hidden = true;
    body.append(resultsTitle);
    const results = ASF.el("ol", "comfort-results");
    results.id = "comfort-results";
    results.setAttribute("aria-labelledby", "comfort-results-title");
    results.hidden = true;
    body.append(results);
    const retry = ASF.el("button", "btn btn-ghost comfort-retry", text.retry);
    retry.type = "button";
    retry.id = "comfort-retry";
    retry.hidden = true;
    body.append(retry);
    const note = ASF.el("p", "comfort-note", text.note);
    note.id = "comfort-note";
    body.append(note);
    panel.append(body);
    return panel;
  }

  function renderMapPage() {
    const ui = ASF.ui();
    const lang = ASF.lang();
    const main = document.getElementById("content");
    main.replaceChildren();
    const section = ASF.el("section", "section map-page");
    const wrap = ASF.el("div", "wrap");
    wrap.append(ASF.el("h1", "page-title", ui.nav[2].label));
    wrap.append(ASF.el("p", "", ui.mapHint));

    const tools = ASF.el("div", "map-tools");
    const showAll = ASF.el("button", "btn", ui.showAll);
    showAll.type = "button";
    showAll.id = "show-all";
    tools.append(showAll);
    wrap.append(tools);

    const layout = ASF.el("div", "map-layout");
    const stage = ASF.el("div", "map-stage");
    const canvas = ASF.el("div", "map-canvas");
    canvas.id = "map";
    canvas.setAttribute("role", "region");
    canvas.setAttribute("aria-label", ui.mapLabel);
    stage.append(canvas);
    layout.append(stage);

    /* The side panel has two views, opened from the icon dock on the map:
       the walking route and the optional comfort layers. */
    const routeOpen = !!ASF.mapState.routeOpen;
    const view = ASF.mapState.panelView === "comfort" ? "comfort" : "route";
    if (routeOpen) layout.classList.add("is-route-open");
    const side = ASF.el("div", "map-side" + (routeOpen ? "" : " is-collapsed"));
    const clip = ASF.el("div", "map-side-clip");
    const drawer = ASF.el("div", "map-side-drawer");
    drawer.id = "map-side-panel";
    drawer.setAttribute("role", "region");
    drawer.setAttribute("aria-labelledby", "panel-title");
    if (!routeOpen) {
      drawer.setAttribute("aria-hidden", "true");
      drawer.inert = true;
    }

    const head = ASF.el("div", "panel-head");
    const title = ASF.el("h2", "panel-title", view === "comfort" ? ui.comfort.title : ui.routeTitle);
    title.id = "panel-title";
    const close = ASF.el("button", "panel-close");
    close.type = "button";
    close.id = "panel-close";
    close.setAttribute("aria-label", ui.dock.close);
    close.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    head.append(title, close);

    const route = ASF.el("section", "route-panel");
    const body = ASF.el("div", "route-body");
    body.id = "route-body";
    body.append(ASF.el("p", "route-hint", ui.routeHint));
    const stops = ASF.el("ol", "route-stops");
    stops.id = "route-stops";
    body.append(stops);
    const status = ASF.el("p", "route-status", "");
    status.id = "route-status";
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    body.append(status);
    const note = ASF.el("p", "route-note", "");
    note.id = "route-note";
    note.hidden = true;
    body.append(note);
    const clear = ASF.el("button", "btn btn-ghost", ui.routeClear);
    clear.type = "button";
    clear.id = "route-clear";
    clear.hidden = true;
    body.append(clear);
    route.append(body);

    const list = ASF.el("ol", "place-list");
    list.setAttribute("aria-label", ui.listTitle);
    ASF.content.places.forEach(function (place) {
      const item = ASF.el("li", "");
      const button = ASF.el("button", "", place.mapLabel[lang]);
      button.type = "button";
      button.setAttribute("data-lieu", place.id);
      const add = ASF.el("button", "", ui.routeAdd);
      add.type = "button";
      add.setAttribute("data-route-add", place.id);
      add.setAttribute("aria-label", ui.routeAdd + (lang === "ru" ? ": " : " : ") + place.mapLabel[lang]);
      item.append(button, add);
      list.append(item);
    });
    const routeView = ASF.el("div", "panel-view");
    routeView.setAttribute("data-view", "route");
    routeView.hidden = view !== "route";
    routeView.append(route, list);
    const comfortView = ASF.el("div", "panel-view");
    comfortView.setAttribute("data-view", "comfort");
    comfortView.hidden = view !== "comfort";
    comfortView.append(comfortPanel(ui));
    drawer.append(head, routeView, comfortView);
    clip.append(drawer);
    side.append(clip);
    layout.append(side);

    /* Icon dock: a walking figure for the route, layers for comfort. */
    const icons = {
      route: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>',
      comfort: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>'
    };
    const dock = ASF.el("div", "map-dock");
    dock.setAttribute("role", "group");
    dock.setAttribute("aria-label", ui.dock.label);
    ["route", "comfort"].forEach(function (name) {
      const button = ASF.el("button", "dock-btn");
      button.type = "button";
      button.setAttribute("data-panel", name);
      button.setAttribute("aria-controls", "map-side-panel");
      button.setAttribute("aria-expanded", routeOpen && view === name ? "true" : "false");
      const icon = ASF.el("span", "dock-icon");
      icon.innerHTML = icons[name];
      const badge = ASF.el("span", "dock-badge", "");
      badge.setAttribute("data-badge", name);
      badge.hidden = true;
      button.append(icon, ASF.el("span", "dock-label", ui.dock[name]), badge);
      dock.append(button);
    });
    /* Before the panel, so keyboard users reach the buttons first. */
    layout.insertBefore(dock, side);
    wrap.append(layout);
    section.append(wrap);
    main.append(section);
    if (window.ASFMap) window.ASFMap.mount();
  }

  ASF.renderPage = function () {
    const page = document.body.dataset.page;
    if (page === "home") renderHome();
    else if (page === "lieux") renderPlaces();
    else if (page === "lieu") renderStory();
    else if (page === "carte") renderMapPage();
    else if (page === "audio") renderAudio();
    else if (page === "recherche") renderResearch();
  };

  document.addEventListener("click", function (event) {
    const entry = event.target.closest("[data-entry-lang]");
    if (entry) {
      const id = entry.getAttribute("data-place");
      ASF.entryLang[id] = entry.getAttribute("data-entry-lang");
      ASF.focusSelector = '[data-place="' + id + '"][data-entry-lang="' + ASF.entryLang[id] + '"]';
      ASF.render();
      return;
    }
    const readMore = event.target.closest("[data-read-more]");
    if (readMore) {
      const id = readMore.getAttribute("data-read-more");
      const more = document.getElementById("more-" + id);
      const open = readMore.getAttribute("aria-expanded") !== "true";
      ASF.audioOpen[id] = open;
      more.hidden = !open;
      readMore.setAttribute("aria-expanded", open ? "true" : "false");
      readMore.querySelector(".read-more-label").textContent = open ? ASF.ui().readLess : ASF.ui().readMore;
      /* After closing a long text, bring its card back into view. */
      const card = document.getElementById(id);
      if (!open && card.getBoundingClientRect().top < 0) card.scrollIntoView({ block: "start" });
    }
  });
})();
