(function () {
  const ASF = window.ASF;
  let map = null;
  let markers = {};
  let routeLine = null;
  let routeRequest = 0;
  const walkingMetersPerSecond = 1.25;
  let amenityLayer = null;
  let amenityMarkers = {};
  let amenityIndex = {};
  let amenityTimer = 0;
  let amenityRequest = 0;

  const amenityCategories = ["cafe", "water", "rest", "toilets", "transport"];

  /* Small white glyphs on coloured dots; also used by the toggles in js/page.js. */
  ASF.amenityGlyphs = {
    cafe: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 5.5h8V9a3.5 3.5 0 0 1-3.5 3.5h-1A3.5 3.5 0 0 1 3 9z" fill="#fff"/><path d="M11 6.5h1a1.75 1.75 0 0 1 0 3.5h-1" fill="none" stroke="#fff" stroke-width="1.4"/></svg>',
    water: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.2S4 6.8 4 9.7a4 4 0 0 0 8 0C12 6.8 8 2.2 8 2.2z" fill="#fff"/></svg>',
    rest: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 4.5h9M2.5 8h11M4 8v4M12 8v4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
    toilets: '<svg viewBox="0 0 16 16" aria-hidden="true"><text x="8" y="10.9" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.6" font-weight="700" fill="#fff">WC</text></svg>',
    transport: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="9" height="9" rx="1.6" fill="#fff"/><path d="M4.8 7h6.4" stroke-width="1.2" class="amenity-cut"/><circle cx="5.6" cy="13" r="1.1" fill="#fff"/><circle cx="10.4" cy="13" r="1.1" fill="#fff"/></svg>'
  };

  /* The places come from an OpenStreetMap snapshot (js/amenities-data.js),
     loaded the first time a category is switched on. */
  let amenityDataPromise = null;
  let amenityAll = null;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function icon() {
    return L.divIcon({
      className: "pin",
      html: '<span class="pin-dot"></span>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -14]
    });
  }

  function popup(place) {
    const lang = ASF.lang();
    const ui = ASF.ui();
    return (
      '<div class="popup"><p class="popup-title">' +
      escapeHtml(place.mapLabel[lang]) +
      '</p><div class="popup-actions"><a class="popup-link" href="lieu.html?id=' +
      place.id +
      '">' +
      escapeHtml(ui.readStory) +
      '</a><button type="button" class="popup-route" data-route-add="' +
      place.id +
      '">' +
      escapeHtml(ui.routeAdd) +
      "</button></div></div>"
    );
  }

  function formatDuration(seconds) {
    const minutes = Math.max(1, Math.round(seconds / 60));
    const lang = ASF.lang();
    if (minutes < 60) return minutes + (lang === "ru" ? " мин" : " min");
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    if (lang === "ru") return rest ? hours + " ч " + rest + " мин" : hours + " ч";
    return rest ? hours + " h " + rest + " min" : hours + " h";
  }

  function formatDistance(meters) {
    const lang = ASF.lang();
    if (meters < 1000) return Math.round(meters) + (lang === "ru" ? " м" : " m");
    const kilometers = (Math.round(meters / 100) / 10).toFixed(1).replace(".", ",");
    return kilometers + (lang === "ru" ? " км" : " km");
  }

  function summary(seconds, meters) {
    return ASF.ui().routeSummary
      .replace("{time}", formatDuration(seconds))
      .replace("{distance}", formatDistance(meters));
  }

  function setStatus(main, note) {
    const status = document.getElementById("route-status");
    const extra = document.getElementById("route-note");
    if (status) {
      status.textContent = main || "";
      status.hidden = !main;
    }
    if (extra) {
      extra.textContent = note || "";
      extra.hidden = !note;
    }
  }

  function haversine(from, to) {
    const earth = 6371000;
    const rad = Math.PI / 180;
    const dLat = (to.lat - from.lat) * rad;
    const dLng = (to.lng - from.lng) * rad;
    const lat1 = from.lat * rad;
    const lat2 = to.lat * rad;
    const h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * earth * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  /* A route stop is one of the six places or an optional amenity the visitor
     added from its popup (kept in ASF.mapState.extras). */
  function extras() {
    if (!ASF.mapState.extras) ASF.mapState.extras = {};
    return ASF.mapState.extras;
  }

  function stopPoint(id) {
    return ASF.place(id) || extras()[id] || null;
  }

  function stopLabel(id) {
    const place = ASF.place(id);
    if (place) return place.mapLabel[ASF.lang()];
    const item = extras()[id];
    return item ? amenityStopLabel(item) : id;
  }

  function straightEstimate(ids) {
    const places = ids.map(stopPoint);
    let meters = 0;
    const latlngs = places.map(function (place, index) {
      if (index > 0) meters += haversine(places[index - 1], place);
      return [place.lat, place.lng];
    });
    meters *= 1.3;
    return { latlngs: latlngs, meters: meters, seconds: meters / walkingMetersPerSecond };
  }

  function isPhone() {
    return window.matchMedia("(max-width: 680px)").matches;
  }

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* fitBounds options that keep places clear of the open route panel:
     a bottom sheet on phones, a right-hand panel elsewhere. */
  function fitOptions(maxZoom) {
    const side = document.querySelector(".map-side");
    let right = 48;
    let bottom = 48;
    if (ASF.mapState.routeOpen && side) {
      if (isPhone()) bottom += side.offsetHeight;
      else right += side.offsetWidth;
    }
    return { paddingTopLeft: [48, 48], paddingBottomRight: [right, bottom], animate: false, maxZoom: maxZoom };
  }

  function clearLine() {
    if (routeLine && map) map.removeLayer(routeLine);
    routeLine = null;
  }

  function drawLine(latlngs, dashed) {
    clearLine();
    const dash = dashed ? "7 8" : null;
    routeLine = L.featureGroup([
      L.polyline(latlngs, { color: "#f8f5ef", weight: 9, opacity: 0.95, dashArray: dash, lineCap: "round" }),
      L.polyline(latlngs, { color: "#681f32", weight: 4, opacity: 1, dashArray: dash, lineCap: "round" })
    ]).addTo(map);
    routeLine.bringToFront();
    map.fitBounds(routeLine.getBounds(), fitOptions(16));
    scheduleAmenities();
  }

  function paintRoutePins() {
    const route = ASF.mapState.route;
    const all = Object.assign({}, amenityMarkers, markers);
    Object.keys(all).forEach(function (id) {
      const element = all[id].getElement();
      if (!element) return;
      const index = route.indexOf(id);
      let badge = element.querySelector(".pin-order");
      if (index === -1) {
        if (badge) badge.remove();
        element.removeAttribute("aria-label");
        return;
      }
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "pin-order";
        badge.setAttribute("aria-hidden", "true");
        element.append(badge);
      }
      badge.textContent = String(index + 1);
      element.setAttribute("aria-label", (index + 1) + ". " + stopLabel(id));
    });
  }

  function renderStops() {
    const list = document.getElementById("route-stops");
    const clear = document.getElementById("route-clear");
    if (!list) return;
    const ui = ASF.ui();
    const lang = ASF.lang();
    list.replaceChildren();
    ASF.mapState.route.forEach(function (id, index) {
      const item = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = (index + 1) + ". " + stopLabel(id);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = ui.routeRemove;
      remove.setAttribute("data-route-remove", String(index));
      item.append(name, remove);
      list.append(item);
    });
    if (clear) clear.hidden = ASF.mapState.route.length === 0;
    document.querySelectorAll("[data-route-add]").forEach(function (button) {
      const id = button.getAttribute("data-route-add");
      const index = ASF.mapState.route.indexOf(id);
      const label = ASF.place(id) ? stopLabel(id) : amenityStopLabel(amenityIndex[id] || extras()[id]);
      button.disabled = index !== -1;
      button.textContent = index === -1 ? ui.routeAdd : String(index + 1);
      button.setAttribute(
        "aria-label",
        index === -1
          ? ui.routeAdd + (lang === "ru" ? ": " : " : ") + label
          : ui.routeStep.replace("{n}", String(index + 1))
      );
    });
    paintRoutePins();
    paintDock();
  }

  function updateRoute() {
    renderStops();
    const ids = ASF.mapState.route;
    if (!map) return;
    if (ids.length < 2) {
      routeRequest += 1;
      clearLine();
      setStatus(ids.length ? ASF.ui().routeNeedMore : "", "");
      scheduleAmenities();
      return;
    }
    const request = ++routeRequest;
    setStatus(ASF.ui().routeLoading, "");
    const path = ids.map(function (id) {
      const place = stopPoint(id);
      return place.lng + "," + place.lat;
    }).join(";");
    fetch("https://routing.openstreetmap.de/routed-foot/route/v1/foot/" + path + "?overview=full&geometries=geojson")
      .then(function (response) {
        if (!response.ok) throw new Error("route");
        return response.json();
      })
      .then(function (data) {
        if (request !== routeRequest || !map) return;
        const route = data.routes && data.routes[0];
        if (!route || !route.geometry || !route.geometry.coordinates) throw new Error("empty");
        drawLine(route.geometry.coordinates.map(function (pair) {
          return [pair[1], pair[0]];
        }), false);
        const ui = ASF.ui();
        setStatus(summary(route.duration, route.distance), ui.routeNote + " " + ui.routeCredit);
      })
      .catch(function () {
        if (request !== routeRequest || !map) return;
        const estimate = straightEstimate(ids);
        drawLine(estimate.latlngs, true);
        setStatus(summary(estimate.seconds, estimate.meters), ASF.ui().routeNoteStraight);
      });
  }

  function placesBounds() {
    const bounds = L.latLngBounds(ASF.content.places.map(function (place) {
      return [place.lat, place.lng];
    }));
    if (routeLine) bounds.extend(routeLine.getBounds());
    return bounds;
  }

  function syncMapSize() {
    if (!map) return;
    map.stop();
    map.invalidateSize({ animate: false });
    if (map._popup && typeof map._popup.isOpen === "function" && map._popup.isOpen() && map._popup.update) {
      map._popup.update();
    }
    /* Re-fit so the route or the places stay clear of the panel. */
    if (routeLine) map.fitBounds(routeLine.getBounds(), fitOptions(16));
    else if (!ASF.mapState.activeId) map.fitBounds(placesBounds(), fitOptions(14));
  }

  let sideResizeToken = 0;

  function scheduleMapSize() {
    const token = ++sideResizeToken;
    const clip = document.querySelector(".map-side-clip");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function sync() {
      if (token !== sideResizeToken) return;
      syncMapSize();
    }

    if (!clip || reduce) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(sync);
      });
      return;
    }

    function done(event) {
      if (event.target !== clip) return;
      if (event.propertyName !== "width" && event.propertyName !== "transform") return;
      clip.removeEventListener("transitionend", done);
      sync();
    }

    clip.addEventListener("transitionend", done);
    window.setTimeout(function () {
      clip.removeEventListener("transitionend", done);
      sync();
    }, 480);
  }

  /* Opens the side panel on one of its views ("route" or "comfort"),
     or closes it when view is null. */
  function setPanel(view) {
    const open = !!view;
    const previous = ASF.mapState.panelView === "comfort" ? "comfort" : "route";
    const changed = !!ASF.mapState.routeOpen !== open;
    ASF.mapState.routeOpen = open;
    if (open) ASF.mapState.panelView = view;
    const current = open ? view : previous;
    const layout = document.querySelector(".map-layout");
    if (layout) layout.classList.toggle("is-route-open", open);
    if (changed && open && layout && isPhone()) {
      layout.scrollIntoView({ block: "start", behavior: reducedMotion() ? "auto" : "smooth" });
    }
    const side = document.querySelector(".map-side");
    const panel = document.getElementById("map-side-panel");
    if (side) side.classList.toggle("is-collapsed", !open);
    document.querySelectorAll(".panel-view").forEach(function (section) {
      section.hidden = section.getAttribute("data-view") !== current;
    });
    const title = document.getElementById("panel-title");
    if (title) title.textContent = current === "comfort" ? ASF.ui().comfort.title : ASF.ui().routeTitle;
    document.querySelectorAll("[data-panel]").forEach(function (button) {
      button.setAttribute("aria-expanded", open && button.getAttribute("data-panel") === current ? "true" : "false");
    });
    if (panel) {
      if (!open && panel.contains(document.activeElement)) {
        const back = document.querySelector('[data-panel="' + previous + '"]');
        if (back) back.focus();
      }
      panel.inert = !open;
      if (open) panel.removeAttribute("aria-hidden");
      else panel.setAttribute("aria-hidden", "true");
    }
    if (changed) scheduleMapSize();
  }

  function setRouteOpen(open) {
    setPanel(open ? "route" : null);
  }

  /* Numbers on the dock buttons: stops in the route, comfort categories on. */
  function paintDock() {
    const counts = {
      route: ASF.mapState.route.length,
      comfort: enabledAmenities().length
    };
    document.querySelectorAll("[data-badge]").forEach(function (badge) {
      const count = counts[badge.getAttribute("data-badge")];
      badge.textContent = count ? String(count) : "";
      badge.hidden = !count;
    });
  }

  /* Stops are only ever added here, from a visitor's click. */
  function addStop(id) {
    if (!map) return;
    if (!ASF.place(id)) {
      const item = amenityIndex[id] || extras()[id];
      if (!item) return;
      extras()[id] = item;
    }
    setRouteOpen(true);
    if (ASF.mapState.route.indexOf(id) !== -1) {
      setStatus(ASF.ui().routeDuplicate, "");
      return;
    }
    ASF.mapState.route.push(id);
    updateRoute();
  }

  function pruneExtras() {
    Object.keys(extras()).forEach(function (id) {
      if (ASF.mapState.route.indexOf(id) === -1) delete extras()[id];
    });
  }

  function removeStop(index) {
    if (!map || index < 0 || index >= ASF.mapState.route.length) return;
    ASF.mapState.route.splice(index, 1);
    pruneExtras();
    updateRoute();
  }

  function clearRoute() {
    routeRequest += 1;
    ASF.mapState.route = [];
    pruneExtras();
    clearLine();
    renderStops();
    setStatus("", "");
    if (map) showAll();
    scheduleAmenities();
  }

  function paint(activeId) {
    Object.keys(markers).forEach(function (id) {
      const element = markers[id].getElement();
      if (element) element.classList.toggle("is-active", id === activeId);
    });
    document.querySelectorAll("[data-lieu]").forEach(function (button) {
      const selected = button.getAttribute("data-lieu") === activeId;
      if (selected) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  function closePopups() {
    Object.keys(markers).forEach(function (id) {
      markers[id].closePopup();
    });
    map.closePopup();
  }

  function select(id, shouldPan) {
    const marker = markers[id];
    if (!marker) return;
    map.stop();
    ASF.mapState.activeId = id;
    paint(id);
    if (shouldPan) map.panTo(marker.getLatLng(), { animate: false });
    marker.setPopupContent(popup(ASF.place(id)));
    marker.openPopup();
    renderStops();
    scheduleAmenities();
  }

  function showAll() {
    map.stop();
    ASF.mapState.activeId = null;
    paint(null);
    closePopups();
    map.fitBounds(placesBounds(), fitOptions(14));
    scheduleAmenities();
  }

  /* ---- Optional comfort layers ("Confort du parcours") ----
     Real places from OpenStreetMap near the route. Nothing here changes the
     itinerary: a place only joins it when the visitor presses its button. */

  function amenityState() {
    if (!ASF.mapState.amenity) {
      ASF.mapState.amenity = { enabled: {}, sig: null, data: {}, area: null, status: "idle" };
    }
    return ASF.mapState.amenity;
  }

  function enabledAmenities() {
    const enabled = amenityState().enabled;
    return amenityCategories.filter(function (category) {
      return enabled[category];
    });
  }

  function amenityKind(tags) {
    if (tags.amenity === "bench") return "bench";
    if (tags.leisure === "park") return "park";
    if (tags.station === "subway") return "subway";
    if (tags.railway === "subway_entrance") return "subway_entrance";
    if (tags.railway === "tram_stop") return "tram_stop";
    if (tags.highway === "bus_stop") return "bus_stop";
    return null;
  }

  function amenityCategory(tags) {
    if (tags.amenity === "cafe") return "cafe";
    if (tags.amenity === "drinking_water") return "water";
    if (tags.amenity === "toilets") return "toilets";
    if (tags.amenity === "bench" || tags.leisure === "park") return "rest";
    if (amenityKind(tags)) return "transport";
    return null;
  }

  function amenityName(tags) {
    return tags["name:" + ASF.lang()] || tags.name || null;
  }

  function amenityTitle(item) {
    const text = ASF.ui().comfort;
    const kind = amenityKind(item.tags);
    return amenityName(item.tags) || (kind && text.kinds[kind]) || text.unnamed;
  }

  function amenityStopLabel(item) {
    if (!item) return "";
    const lang = ASF.lang();
    const category = ASF.ui().comfort.category[item.category];
    const name = amenityName(item.tags);
    return name ? name + " (" + category.toLocaleLowerCase(lang) + ")" : amenityTitle(item);
  }

  /* Places are shown for the part of the map on screen, like in map apps,
     and follow the map as it moves. Below this zoom the area is too large
     and the map would be flooded, so the panel asks to zoom in instead. */
  const amenityMinZoom = 15;
  /* Per category, the places closest to the centre of the map. */
  const amenityPerCategory = 25;

  function routePoints() {
    if (!routeLine) return null;
    return routeLine.getLayers()[0].getLatLngs().map(function (latlng) {
      return { lat: latlng.lat, lng: latlng.lng };
    });
  }

  function loadAmenityData() {
    if (ASF.amenityData) return Promise.resolve(ASF.amenityData);
    if (!amenityDataPromise) {
      amenityDataPromise = new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.src = "js/amenities-data.js";
        script.onload = function () {
          if (ASF.amenityData) resolve(ASF.amenityData);
          else reject(new Error("amenity data"));
        };
        script.onerror = function () {
          amenityDataPromise = null;
          script.remove();
          reject(new Error("amenity data"));
        };
        document.head.append(script);
      });
    }
    return amenityDataPromise;
  }

  function allAmenities() {
    if (amenityAll) return amenityAll;
    const types = { n: "node", w: "way", r: "relation" };
    amenityAll = [];
    ASF.amenityData.items.forEach(function (row) {
      const tags = row[4];
      const category = amenityCategory(tags);
      if (!category) return;
      /* Toilets for customers or staff only are not public toilets. */
      if (category === "toilets" && ["private", "customers", "no"].indexOf(tags.access) !== -1) return;
      amenityAll.push({
        id: "osm-" + types[row[0]] + "-" + row[1],
        osmType: types[row[0]],
        osmId: row[1],
        lat: row[2],
        lng: row[3],
        tags: tags,
        category: category
      });
    });
    return amenityAll;
  }

  /* Metres from a point to a segment, on a local flat projection
     (accurate enough at walking distances). */
  function segmentDistance(point, from, to) {
    const kx = 111320 * Math.cos(point.lat * Math.PI / 180);
    const ky = 110540;
    const ax = (from.lng - point.lng) * kx;
    const ay = (from.lat - point.lat) * ky;
    const bx = (to.lng - point.lng) * kx;
    const by = (to.lat - point.lat) * ky;
    const dx = bx - ax;
    const dy = by - ay;
    const length = dx * dx + dy * dy;
    const t = length ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / length)) : 0;
    return Math.hypot(ax + t * dx, ay + t * dy);
  }

  function areaDistance(point, area) {
    let distance = Infinity;
    const points = area.points;
    if (area.line && points.length > 1) {
      for (let index = 1; index < points.length; index += 1) {
        distance = Math.min(distance, segmentDistance(point, points[index - 1], points[index]));
      }
    } else {
      points.forEach(function (target) {
        distance = Math.min(distance, haversine(point, target));
      });
    }
    return distance;
  }

  /* Places of each category inside the visible map, closest to its centre first. */
  function visibleAmenities() {
    const grouped = {};
    amenityCategories.forEach(function (category) {
      grouped[category] = [];
    });
    const bounds = map.getBounds();
    const center = map.getCenter();
    allAmenities().forEach(function (item) {
      if (!bounds.contains([item.lat, item.lng])) return;
      grouped[item.category].push(Object.assign({}, item, { centerDistance: haversine(item, center) }));
    });
    /* Keep the closest places so busy categories (benches, stops) stay readable. */
    amenityCategories.forEach(function (category) {
      grouped[category].sort(function (a, b) {
        return a.centerDistance - b.centerDistance;
      });
      grouped[category] = grouped[category].slice(0, amenityPerCategory);
    });
    return grouped;
  }

  /* For the popup: metres to the route if there is one, else to the
     nearest of the six places (only when it is within walking reach). */
  function amenityDistance(item) {
    const points = routePoints();
    if (points) {
      return { meters: areaDistance(item, { line: true, points: points }), place: null };
    }
    let best = null;
    ASF.content.places.forEach(function (place) {
      const meters = haversine(item, place);
      if (!best || meters < best.meters) best = { meters: meters, place: place };
    });
    return best && best.meters <= 1000 ? best : null;
  }

  function scheduleAmenities() {
    window.clearTimeout(amenityTimer);
    amenityTimer = window.setTimeout(refreshAmenities, 250);
  }

  function refreshAmenities() {
    const state = amenityState();
    if (!map) return;
    if (!enabledAmenities().length) {
      amenityRequest += 1;
      state.status = "idle";
      state.data = {};
      renderAmenities();
      renderComfortStatus();
      return;
    }
    if (map.getZoom() < amenityMinZoom) {
      amenityRequest += 1;
      state.status = "zoomIn";
      state.data = {};
      renderAmenities();
      renderComfortStatus();
      return;
    }
    const request = ++amenityRequest;
    if (!ASF.amenityData) {
      state.status = "loading";
      renderComfortStatus();
    }
    loadAmenityData()
      .then(function () {
        if (request !== amenityRequest || !map) return;
        state.data = visibleAmenities();
        state.status = "ready";
        renderAmenities();
        renderComfortStatus();
      })
      .catch(function () {
        if (request !== amenityRequest) return;
        state.status = "error";
        renderAmenities();
        renderComfortStatus();
      });
  }

  function renderComfortStatus() {
    const status = document.getElementById("comfort-status");
    const retry = document.getElementById("comfort-retry");
    paintDock();
    if (!status) return;
    const state = amenityState();
    const text = ASF.ui().comfort;
    let message = "";
    let found = [];
    if (enabledAmenities().length) {
      if (state.status === "loading") message = text.loading;
      else if (state.status === "error") message = text.error;
      else if (state.status === "zoomIn") message = text.zoomIn;
      else if (state.status === "ready") {
        enabledAmenities().forEach(function (category) {
          found = found.concat(state.data[category] || []);
        });
        message = found.length ? text.foundView.replace("{n}", String(found.length)) : text.none;
      }
    }
    status.textContent = message;
    status.hidden = !message;
    renderComfortList(found);
    const zoom = document.getElementById("comfort-zoom");
    if (zoom) zoom.hidden = state.status !== "zoomIn" || !enabledAmenities().length;
    if (retry) retry.hidden = state.status !== "error" || !enabledAmenities().length;
    const note = document.getElementById("comfort-note");
    if (note && ASF.amenityData) {
      const parts = ASF.amenityData.date.split("-");
      const date = parts[2] + (ASF.lang() === "ru" ? "." : "/") + parts[1] + (ASF.lang() === "ru" ? "." : "/") + parts[0];
      note.textContent = text.noteDated.replace("{date}", date);
    }
  }

  /* The nearest places as a list in the panel; a click shows one on the map. */
  const comfortListSize = 12;

  function renderComfortList(found) {
    const list = document.getElementById("comfort-results");
    const heading = document.getElementById("comfort-results-title");
    if (!list) return;
    const text = ASF.ui().comfort;
    const nearest = found.slice().sort(function (a, b) {
      return a.centerDistance - b.centerDistance;
    }).slice(0, comfortListSize);
    list.replaceChildren();
    nearest.forEach(function (item) {
      const row = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "comfort-result";
      button.setAttribute("data-amenity-focus", item.id);
      const dot = document.createElement("span");
      dot.className = "amenity-dot amenity-" + item.category;
      dot.setAttribute("aria-hidden", "true");
      dot.innerHTML = ASF.amenityGlyphs[item.category];
      const name = document.createElement("span");
      name.className = "comfort-result-name";
      name.textContent = amenityTitle(item);
      const kind = document.createElement("span");
      kind.className = "comfort-result-distance";
      kind.textContent = text.category[item.category];
      button.append(dot, name, kind);
      row.append(button);
      list.append(row);
    });
    list.hidden = !nearest.length;
    if (heading) {
      heading.hidden = !nearest.length;
      heading.textContent = found.length > nearest.length
        ? text.nearestSome.replace("{n}", String(nearest.length))
        : text.nearestAll;
    }
  }

  /* "Zoom in" button: zoom on the selected place, else the route's first
     stop, else the landmark nearest the centre of the map. */
  function zoomForAmenities() {
    if (!map) return;
    const center = map.getCenter();
    let target = ASF.place(ASF.mapState.activeId) || stopPoint(ASF.mapState.route[0]);
    if (!target) {
      ASF.content.places.forEach(function (place) {
        if (!target || haversine(place, center) < haversine(target, center)) target = place;
      });
    }
    map.stop();
    map.setView([target.lat, target.lng], 16, { animate: false });
  }

  /* Centre an amenity in the visible part of the map and open its popup. */
  function focusAmenity(id) {
    const marker = amenityMarkers[id];
    if (!map || !marker) return;
    map.stop();
    map.setView(marker.getLatLng(), Math.max(map.getZoom(), 17), { animate: false });
    const side = document.querySelector(".map-side");
    if (ASF.mapState.routeOpen && side) {
      if (isPhone()) map.panBy([0, side.offsetHeight / 2], { animate: false });
      else map.panBy([side.offsetWidth / 2, 0], { animate: false });
    }
    marker.openPopup();
  }

  function amenityIcon(category) {
    return L.divIcon({
      className: "amenity-pin",
      html: '<span class="amenity-dot amenity-' + category + '">' + ASF.amenityGlyphs[category] + "</span>",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -12]
    });
  }

  function amenityPopup(item) {
    const lang = ASF.lang();
    const ui = ASF.ui();
    const text = ui.comfort;
    const tags = item.tags;
    const facts = [];
    const street = tags["addr:street"];
    const address = tags["addr:full"] || (street ? street + (tags["addr:housenumber"] ? " " + tags["addr:housenumber"] : "") : "");
    facts.push(address ? text.address + (lang === "ru" ? ": " : " : ") + address : text.noAddress);
    const near = amenityDistance(item);
    if (near) {
      const meters = formatDistance(Math.max(10, Math.round(near.meters / 10) * 10));
      facts.push(near.place
        ? text.distancePlace.replace("{d}", meters).replace("{place}", near.place.mapLabel[lang])
        : text.distanceRoute.replace("{d}", meters));
    }
    if (item.category === "transport" && tags.route_ref) {
      facts.push(text.lines + (lang === "ru" ? ": " : " : ") + tags.route_ref);
    }
    if (item.category === "cafe" || item.category === "toilets") {
      facts.push(tags.opening_hours ? text.hours + (lang === "ru" ? ": " : " : ") + tags.opening_hours : text.hoursUnknown);
    }
    const wheelchair = tags.wheelchair || tags["toilets:wheelchair"];
    facts.push(text.accessValues[wheelchair]
      ? text.access + (lang === "ru" ? ": " : " : ") + text.accessValues[wheelchair]
      : text.accessUnknown);
    return (
      '<div class="popup amenity-popup"><p class="popup-kicker">' +
      escapeHtml(text.category[item.category]) +
      '</p><p class="popup-title">' +
      escapeHtml(amenityTitle(item)) +
      '</p><ul class="popup-facts">' +
      facts.map(function (fact) {
        return "<li>" + escapeHtml(fact) + "</li>";
      }).join("") +
      '</ul><div class="popup-actions"><button type="button" class="popup-route" data-route-add="' +
      escapeHtml(item.id) +
      '">' +
      escapeHtml(ui.routeAdd) +
      "</button></div></div>"
    );
  }

  /* Markers for the switched-on categories, plus any amenity already in the
     itinerary so a chosen stop never disappears from the map. */
  function renderAmenities() {
    if (!map || !amenityLayer) return;
    const state = amenityState();
    const items = {};
    enabledAmenities().forEach(function (category) {
      (state.data[category] || []).forEach(function (item) {
        items[item.id] = item;
      });
    });
    Object.keys(extras()).forEach(function (id) {
      if (!items[id]) items[id] = extras()[id];
    });
    const openId = Object.keys(amenityMarkers).find(function (id) {
      return amenityMarkers[id].isPopupOpen();
    });
    amenityLayer.clearLayers();
    amenityMarkers = {};
    amenityIndex = items;
    Object.keys(items).forEach(function (id) {
      const item = items[id];
      const marker = L.marker([item.lat, item.lng], {
        icon: amenityIcon(item.category),
        title: amenityTitle(item),
        alt: amenityTitle(item),
        keyboard: true,
        zIndexOffset: -1000
      });
      marker.bindPopup(function () {
        return amenityPopup(item);
      });
      marker.on("popupopen", renderStops);
      marker.addTo(amenityLayer);
      amenityMarkers[id] = marker;
    });
    if (openId && amenityMarkers[openId]) amenityMarkers[openId].openPopup();
    paintRoutePins();
  }

  function mount() {
    if (typeof L === "undefined" || !document.getElementById("map")) return;
    if (!ASF.mapState.route) ASF.mapState.route = [];
    if (map) {
      map.remove();
      map = null;
      markers = {};
      routeLine = null;
      amenityMarkers = {};
    }
    map = L.map("map", { scrollWheelZoom: true, attributionControl: false });
    L.control.attribution({ prefix: false }).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    amenityLayer = L.layerGroup().addTo(map);
    /* Comfort places follow the visible part of the map. */
    map.on("moveend", scheduleAmenities);

    ASF.content.places.forEach(function (place) {
      const marker = L.marker([place.lat, place.lng], {
        icon: icon(),
        title: place.mapLabel[ASF.lang()],
        alt: place.mapLabel[ASF.lang()],
        keyboard: true
      });
      marker.bindPopup(popup(place));
      marker.on("click", function () {
        select(place.id, false);
      });
      marker.addTo(map);
      markers[place.id] = marker;
    });

    document.querySelectorAll("[data-lieu]").forEach(function (button) {
      button.addEventListener("click", function () {
        select(button.getAttribute("data-lieu"), true);
      });
    });
    const show = document.getElementById("show-all");
    if (show) show.addEventListener("click", showAll);

    if (!ASF.mapState.booted) {
      const requested = new URLSearchParams(location.search).get("lieu");
      if (requested && markers[requested]) ASF.mapState.activeId = requested;
      ASF.mapState.booted = true;
    }

    window.setTimeout(function () {
      map.invalidateSize();
      const active = ASF.mapState.activeId;
      if (ASF.mapState.route.length >= 2) {
        updateRoute();
        if (active && markers[active]) select(active, false);
      } else {
        showAll();
        renderStops();
        if (ASF.mapState.route.length === 1) setStatus(ASF.ui().routeNeedMore, "");
        if (active && markers[active]) select(active, true);
      }
      renderAmenities();
      renderComfortStatus();
      scheduleAmenities();
    }, 0);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !ASF.mapState.routeOpen) return;
    const panel = document.getElementById("map-side-panel");
    const dock = document.querySelector(".map-dock");
    if (!panel) return;
    /* Only when focus is in the panel or dock, so Esc still closes map popups. */
    if (panel.contains(document.activeElement) || (dock && dock.contains(document.activeElement))) {
      setPanel(null);
    }
  });

  document.addEventListener("change", function (event) {
    const toggle = event.target.closest("[data-amenity]");
    if (toggle) {
      amenityState().enabled[toggle.getAttribute("data-amenity")] = toggle.checked;
      refreshAmenities();
    }
  });

  document.addEventListener("click", function (event) {
    const dockButton = event.target.closest("[data-panel]");
    if (dockButton) {
      const view = dockButton.getAttribute("data-panel");
      /* The active button closes the panel; the other one switches view. */
      setPanel(dockButton.getAttribute("aria-expanded") === "true" ? null : view);
      return;
    }
    if (event.target.closest("#panel-close")) {
      setPanel(null);
      return;
    }
    const focus = event.target.closest("[data-amenity-focus]");
    if (focus) {
      focusAmenity(focus.getAttribute("data-amenity-focus"));
      return;
    }
    if (event.target.closest("#comfort-zoom")) {
      zoomForAmenities();
      return;
    }
    const add = event.target.closest("[data-route-add]");
    if (add) {
      event.preventDefault();
      addStop(add.getAttribute("data-route-add"));
      return;
    }
    const remove = event.target.closest("[data-route-remove]");
    if (remove) {
      event.preventDefault();
      removeStop(Number(remove.getAttribute("data-route-remove")));
      return;
    }
    if (event.target.closest("#route-clear")) clearRoute();
    if (event.target.closest("#comfort-retry")) refreshAmenities();
  });

  window.ASFMap = { mount: mount };
})();
