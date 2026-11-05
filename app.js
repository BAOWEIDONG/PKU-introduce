/* =========================================================
   北大医疗 · shared UI runtime
   ========================================================= */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function icon(name, cls) {
    return `<svg class="ic ${cls || ""}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  }

  function initials(name) {
    const text = String(name || "").trim();
    if (!text) return "医";
    return text.slice(0, 1);
  }

  const AVATAR_TONES = [
    ["#dbe9ff", "#bbf0e3", "#0b4aa2"],
    ["#ffe3d6", "#ffd0e4", "#8a3b1f"],
    ["#e6e0ff", "#cfe6ff", "#4b3a9e"],
    ["#d8f5e3", "#d7f0ff", "#086a5c"],
    ["#ffeed4", "#ffe0cf", "#7a4c12"]
  ];

  function avatar(name, photo, size, extraClass, toneIndex) {
    const px = size || 44;
    const tone = AVATAR_TONES[(toneIndex == null ? String(name).length : toneIndex) % AVATAR_TONES.length];
    const style = `width:${px}px;height:${px}px;font-size:${Math.round(px * 0.34)}px;background:linear-gradient(145deg,${tone[0]},${tone[1]});color:${tone[2]}`;
    const fallback = `<span>${escapeHtml(initials(name))}</span>`;
    const img = photo
      ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" loading="lazy" onerror="this.remove()" />`
      : "";
    return `<span class="avatar ${extraClass || ""}" style="${style}">${fallback}${img}</span>`;
  }

  let toastTimer = 0;
  function toast(message) {
    let el = $("#appToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "appToast";
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.textContent = message;
    clearTimeout(toastTimer);
    requestAnimationFrame(() => el.classList.add("is-open"));
    toastTimer = setTimeout(() => el.classList.remove("is-open"), 2000);
  }

  /* ---------- sheet ---------- */
  let activeSheet = null;

  function openSheet(sheet, onClose) {
    if (!sheet) return;
    if (activeSheet && activeSheet !== sheet) closeSheet(activeSheet);
    activeSheet = sheet;
    sheet.__onClose = onClose || null;
    const backdrop = $("#appBackdrop");
    if (backdrop) backdrop.classList.add("is-open");
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    if (window.__pkuPushOverlay) window.__pkuPushOverlay();
  }

  function closeSheet(sheet) {
    const target = sheet || activeSheet;
    if (!target) return;
    target.classList.remove("is-open");
    target.setAttribute("aria-hidden", "true");
    activeSheet = null;
    const backdrop = $("#appBackdrop");
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    if (typeof target.__onClose === "function") target.__onClose();
  }

  function closeTopSheet() {
    if (activeSheet) {
      closeSheet(activeSheet);
      return true;
    }
    return false;
  }

  /* ---------- scroll / reveal ---------- */
  function initScroll() {
    const bar = $(".topbar");
    if (!bar) return;
    let scrolled = null;
    const apply = () => {
      const next = window.scrollY > 8;
      if (next === scrolled) return;
      scrolled = next;
      bar.classList.toggle("is-scrolled", next);
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach(el => io.observe(el));
  }

  function initProgress() {
    $$("[data-progress]").forEach(el => {
      const value = Math.max(0, Math.min(100, Number(el.dataset.progress) || 0));
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.width = value + "%";
        }, 260);
      });
    });
  }

  function initBackdrop() {
    const backdrop = $("#appBackdrop");
    if (backdrop) backdrop.addEventListener("click", closeTopSheet);
  }

  function initSearchClear() {
    $$(".search").forEach(box => {
      const input = $("input", box);
      const clear = $(".search-clear", box);
      if (!input) return;
      const sync = () => box.classList.toggle("has-value", Boolean(input.value));
      input.addEventListener("input", sync);
      sync();
      if (clear) {
        clear.addEventListener("click", () => {
          input.value = "";
          sync();
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.focus();
        });
      }
    });
  }

  /* ---------- Android WeChat edge-swipe back ----------
     iOS keeps native swipe. Only Android + WeChat gets this hook. */
  function initBackNav() {
    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isWeChat = /MicroMessenger/i.test(ua);
    if (!isAndroid || !isWeChat) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let overlayCount = 0;

    window.__pkuPushOverlay = () => {
      overlayCount += 1;
      try {
        history.pushState({ pkuOverlay: overlayCount }, "");
      } catch (err) {}
    };

    window.__pkuCloseOverlay = () => {
      if (overlayCount > 0) overlayCount -= 1;
      return closeTopSheet();
    };

    document.addEventListener(
      "touchstart",
      event => {
        const touch = event.touches[0];
        if (!touch || touch.clientX > 28) return;
        startX = touch.clientX;
        startY = touch.clientY;
        tracking = true;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      event => {
        if (!tracking) return;
        const touch = event.touches[0];
        if (!touch) return;
        if (Math.abs(touch.clientY - startY) > 60) tracking = false;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      event => {
        if (!tracking) return;
        tracking = false;
        const touch = event.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - startX;
        const dy = Math.abs(touch.clientY - startY);
        if (dx < 72 || dy > 70) return;
        if (activeSheet) {
          closeTopSheet();
          return;
        }
        if (window.history.length > 1) window.history.back();
        else toast("已经是第一页");
      },
      { passive: true }
    );

    window.addEventListener("popstate", () => {
      if (activeSheet) closeTopSheet();
    });
  }

  function initPerfMode() {
    const ua = navigator.userAgent || "";
    const wechat = /MicroMessenger/i.test(ua);
    const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
    if (wechat || lowMemory) document.documentElement.classList.add("perf-lite");
  }

  function init() {
    initPerfMode();
    initScroll();
    initReveal();
    initProgress();
    initBackdrop();
    initSearchClear();
    initBackNav();
    $$("img[data-fallback]").forEach(img => {
      img.addEventListener("error", () => img.remove());
    });
  }

  window.PKU = {
    $, $$, escapeHtml, icon, avatar, toast, openSheet, closeSheet, closeTopSheet, initials
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
