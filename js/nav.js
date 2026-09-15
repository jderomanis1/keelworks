/**
 * Deromanis — sticky nav, mobile toggle, smooth scroll, reduced-motion.
 */
(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function closeMenu(toggle, menu) {
    if (!toggle || !menu) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu(toggle, menu) {
    if (!toggle || !menu) return;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    var first = menu.querySelector("a");
    if (first && typeof first.focus === "function") {
      first.focus();
    }
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (prefersReducedMotion()) {
          target.scrollIntoView();
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        var toggle = document.getElementById("nav-toggle");
        var menu = document.getElementById("nav-menu");
        if (toggle && menu && menu.classList.contains("is-open")) {
          closeMenu(toggle, menu);
        }
        if (history.replaceState) {
          history.replaceState(null, "", id);
        }
      });
    });
  }

  function initNavToggle() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var open = menu.classList.contains("is-open");
      if (open) {
        closeMenu(toggle, menu);
      } else {
        openMenu(toggle, menu);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (menu.classList.contains("is-open")) {
        closeMenu(toggle, menu);
        toggle.focus();
        return;
      }
      var active = document.activeElement;
      if (active && typeof active.blur === "function") {
        active.blur();
      }
    });
  }

  function init() {
    initSmoothScroll();
    initNavToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
