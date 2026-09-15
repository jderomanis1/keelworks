/**
 * Deromanis — crew instrument (local/rules). ASK_LIMIT=5.
 * Jailbreak refuse → contact; no invented prices; Ctrl/Cmd+Enter submit.
 */
(function () {
  "use strict";

  var ASK_LIMIT = 5;

  var REFUSE_REPLY =
    "I can't help with that here. Text 602.568.5508 or Email us and a human will take it.";

  var PRICE_REPLY =
    "I don't invent prices here. Text 602.568.5508 or Email us for scope and pricing.";

  var REGULATED_REPLY =
    "I can't give legal, medical, or financial advice. Text 602.568.5508 or Email us and a human will take it.";

  var FALLBACK_REPLY =
    "Noted. Frame the outcome in one sentence and any hard constraints — the crew works inside that keel. For a real hand on the tiller, text us or Email us.";

  var JAILBREAK_PATTERNS = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|rules?|prompts?)/i,
    /disregard\s+(your|the|all)\s+(instructions?|rules?|system)/i,
    /override\s+(your|the|system)\s+(prompt|instructions?|rules?)/i,
    /system\s+prompt/i,
    /hidden\s+rules?/i,
    /reveal\s+(your|the)\s+(system|prompt|instructions?|rules?)/i,
    /show\s+(me\s+)?(your\s+)?(system|hidden)\s+(prompt|rules?|instructions?)/i,
    /\bDAN\b/,
    /do\s+anything\s+now/i,
    /pretend\s+you\s+(have\s+)?no\s+limits?/i,
    /no\s+restrictions?/i,
    /jailbreak/i,
    /developer\s+mode/i,
    /act\s+as\s+if\s+you\s+(were|are)\s+unrestricted/i
  ];

  var PRICE_PATTERNS = [
    /what\s+(will|would|does)\s+(this|it|that)\s+cost/i,
    /exact(ly)?\s+(price|cost|quote|fee)/i,
    /how\s+much\s+(does|will|would|is)/i,
    /\b(quote|pricing|rate\s+card|hourly\s+rate)\b/i,
    /\$\s*\d/,
    /\d+\s*%\s*(cheaper|faster|savings?|roi)/i,
    /case\s+study\s+(roi|savings?|%\s*lift)/i,
    /quote\s+(our|a|the)\s+case\s+study/i
  ];

  var REGULATED_PATTERNS = [
    /\b(legal\s+advice|sue|lawsuit|contract\s+law)\b/i,
    /\b(medical\s+advice|diagnos(e|is)|prescription)\b/i,
    /\b(financial\s+advice|investment\s+advice|stock\s+tip)\b/i
  ];

  var FAQ = [
    {
      test: /what\s+is\s+deromanis|who\s+(are|is)\s+(you|deromanis)|about\s+deromanis/i,
      reply:
        "Deromanis is an AI specialist crew that builds anything you need, with a human keel for judgment, taste, and risk."
    },
    {
      test: /\b(hitl|human[- ]in[- ]the[- ]loop|keel|judgment|taste|risk)\b/i,
      reply:
        "You are the keel. The crew drafts and ships inside your frame; judgment, taste, and risk stay human."
    },
    {
      test: /\b(what\s+(do\s+you|we)\s+build|sites?|apps?|games?|ops\s+tools?|outcomes?)\b/i,
      reply:
        "Sites, apps, games, ops tools — anything with a clear outcome. Name the finish line; we build toward the dock."
    },
    {
      test: /\b(how\s+(it\s+works|do\s+you)|brief|process|gates?|ship)\b/i,
      reply:
        "Brief → crew → human gates → ship. You set the outcome and non-negotiables; you green-light, redirect, or kill."
    },
    {
      test: /\b(contact|reach|call|text|email|phone|talk\s+to\s+(a\s+)?human)\b/i,
      reply:
        "Text 602.568.5508 or use Email us in Contact. A human picks up before the crew spins up."
    },
    {
      test: /\b(time|cost|faster|cheaper|vs\.?\s+traditional|capacity)\b/i,
      reply:
        "A smaller specialist crew plus AI leverage aims for time and cost advantages vs standing up a large traditional squad — without quoting invented numbers here. Text or Email us for scope."
    }
  ];

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function matchesAny(text, patterns) {
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].test(text)) return true;
    }
    return false;
  }

  function replyFor(text) {
    if (matchesAny(text, JAILBREAK_PATTERNS)) return REFUSE_REPLY;
    if (matchesAny(text, PRICE_PATTERNS)) return PRICE_REPLY;
    if (matchesAny(text, REGULATED_PATTERNS)) return REGULATED_REPLY;
    for (var i = 0; i < FAQ.length; i++) {
      if (FAQ[i].test.test(text)) return FAQ[i].reply;
    }
    return FALLBACK_REPLY;
  }

  function initConcierge() {
    var form = document.getElementById("concierge-form");
    var input = document.getElementById("concierge-input");
    var send = document.getElementById("concierge-send");
    var log = document.getElementById("concierge-log");
    var countEl = document.getElementById("ask-count");
    var lockEl = document.getElementById("concierge-lock");
    var bar = document.getElementById("ask-bar");
    var panel = document.getElementById("concierge-panel");
    var hint = document.getElementById("concierge-hint");
    if (!form || !input || !send || !log || !countEl || !lockEl) return;

    var asks = 0;
    var locked = false;

    function updateMeter() {
      countEl.textContent = asks + " / " + ASK_LIMIT + " asks";
      if (bar) {
        bar.style.width = Math.round((asks / ASK_LIMIT) * 100) + "%";
      }
    }

    function appendMsg(text, role) {
      var div = document.createElement("div");
      div.className =
        "concierge__msg concierge__msg--" + (role === "user" ? "user" : "crew");
      if (role === "crew") {
        var tag = document.createElement("span");
        tag.className = "msg-tag";
        tag.textContent = "Crew · instrument";
        div.appendChild(tag);
      }
      var body = document.createElement("span");
      body.textContent = text;
      div.appendChild(body);
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }

    function lock() {
      locked = true;
      input.disabled = true;
      send.disabled = true;
      input.setAttribute("aria-disabled", "true");
      send.setAttribute("aria-disabled", "true");
      lockEl.hidden = false;
      input.placeholder = "Ask limit reached";
      if (hint) hint.hidden = true;
      var firstLink = lockEl.querySelector("a");
      if (firstLink && typeof firstLink.focus === "function") {
        window.setTimeout(function () {
          firstLink.focus();
        }, 0);
      }
    }

    function handleSubmit() {
      if (locked || asks >= ASK_LIMIT) {
        lock();
        return;
      }
      var text = (input.value || "").trim();
      if (!text) {
        if (hint) hint.hidden = false;
        return;
      }
      if (hint) hint.hidden = true;

      appendMsg(text, "user");
      input.value = "";
      asks += 1;
      updateMeter();

      var reply = replyFor(text);
      window.setTimeout(
        function () {
          appendMsg(reply, "crew");
          if (asks >= ASK_LIMIT) lock();
        },
        prefersReducedMotion() ? 0 : 320
      );
    }

    if (panel) {
      input.addEventListener("focus", function () {
        panel.classList.add("is-focused");
      });
      input.addEventListener("blur", function () {
        panel.classList.remove("is-focused");
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleSubmit();
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
      }
    });

    updateMeter();
  }

  function init() {
    initConcierge();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
