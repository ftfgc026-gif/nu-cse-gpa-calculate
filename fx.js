/*
  NUCSEBD — small visual effects (no effect on features)
  1) a soft light that follows the mouse inside cards
  2) the developer name types and erases itself
  3) panels fade in when you scroll to them
*/
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mouse light inside cards / panels (one listener for the whole page)
  document.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest(".portal-card, .quick-panel, .latest-panel");
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX - r.left) + "px");
    el.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  // Developer name: types, waits, erases, repeats
  var dev = document.getElementById("devType");
  if (dev && !reduce) {
    var phrase = dev.getAttribute("data-text") || dev.textContent;
    var n = 0, typing = true;
    dev.textContent = "";
    var step = function () {
      if (typing) {
        n++;
        dev.textContent = phrase.slice(0, n);
        if (n >= phrase.length) { typing = false; return setTimeout(step, 2400); }
        return setTimeout(step, 95);
      }
      n--;
      dev.textContent = phrase.slice(0, n);
      if (n <= 0) { typing = true; return setTimeout(step, 700); }
      return setTimeout(step, 45);
    };
    setTimeout(step, 1100);
  }

  // Scroll reveal
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
