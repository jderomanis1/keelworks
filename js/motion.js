/**
 * Deromanis — [data-reveal] IntersectionObserver + optional keel dew.
 */
(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initReveals() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function initKeelDew() {
    var stage = document.getElementById("keel-dew");
    if (!stage || prefersReducedMotion()) return;

    var count = 14;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "keel-dew__particle";
      p.style.left = 12 + Math.random() * 76 + "%";
      p.style.top = 30 + Math.random() * 50 + "%";
      p.style.animationDuration = 5 + Math.random() * 7 + "s";
      p.style.animationDelay = Math.random() * 6 + "s";
      stage.appendChild(p);
    }
  }

  function init() {
    initReveals();
    initKeelDew();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
