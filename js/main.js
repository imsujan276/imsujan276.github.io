/* ==========================================================================
   Site behaviour. Plain ES2018, no build step, no dependencies.
   Everything here is an enhancement: the page is fully readable and
   navigable with JavaScript disabled.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* --- Scroll reveal ---------------------------------------------------
     Replaces the old per-component FadeInSection. One observer for the whole
     page. `data-reveal-stagger` on a parent cascades its children in. */

  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(targets, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    Array.prototype.forEach.call(targets, function (el) {
      observer.observe(el);
    });

    // Stagger children of any container that asks for it.
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-reveal-stagger]"),
      function (parent) {
        var step = parseInt(parent.getAttribute("data-reveal-stagger"), 10) || 90;
        Array.prototype.forEach.call(
          parent.querySelectorAll(".reveal"),
          function (child, i) {
            child.style.transitionDelay = i * step + "ms";
          }
        );
      }
    );
  }

  /* --- Typewriter ------------------------------------------------------
     The heading ships in the HTML fully written out, so it is correct for
     crawlers and for no-JS visitors. We capture it, blank it, and replay it. */

  function initTypewriter() {
    var el = document.querySelector("[data-typewriter]");
    if (!el) return;

    // Flatten the heading into (text, className) runs so the green "Sujan"
    // keeps its styling as it is typed.
    var segments = [];
    Array.prototype.forEach.call(el.childNodes, function (node) {
      if (node.nodeType === 3) {
        segments.push({ text: node.nodeValue, className: "" });
      } else if (node.nodeType === 1) {
        segments.push({ text: node.textContent, className: node.className });
      }
    });
    if (!segments.length) return;

    var caret = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");

    if (reduceMotion) {
      el.appendChild(caret);
      caret.classList.add("is-done");
      return;
    }

    // Screen readers get the finished string once, not letter by letter.
    var label = el.textContent.replace(/\s+/g, " ").trim();
    el.setAttribute("aria-label", label);

    var holder = document.createElement("span");
    holder.setAttribute("aria-hidden", "true");
    el.textContent = "";
    el.appendChild(holder);
    el.appendChild(caret);

    var si = 0;
    var ci = 0;
    var current = null;

    function step() {
      if (si >= segments.length) {
        caret.classList.add("is-done");
        return;
      }
      var seg = segments[si];
      if (ci === 0) {
        current = document.createElement("span");
        if (seg.className) current.className = seg.className;
        holder.appendChild(current);
      }
      if (ci < seg.text.length) {
        current.textContent += seg.text.charAt(ci);
        ci++;
      } else {
        si++;
        ci = 0;
      }
      // Slight jitter around the original 120ms average so it reads as typing
      // rather than as a metronome.
      setTimeout(step, 80 + Math.random() * 80);
    }

    setTimeout(step, 320);
  }

  /* --- Nav bar --------------------------------------------------------- */

  function initNav() {
    var nav = document.querySelector(".nav");
    if (!nav) return;

    var lastY = window.pageYOffset;
    var ticking = false;

    function update() {
      var y = window.pageYOffset;
      nav.classList.toggle("is-stuck", y > 24);

      // Hide on the way down, reveal on the way up — but never while a menu
      // has focus inside it, and never near the top of the page.
      var goingDown = y > lastY && y > 220;
      if (!nav.contains(document.activeElement)) {
        nav.classList.toggle("is-hidden", goingDown);
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  }

  /* --- Section highlighting in the nav --------------------------------- */

  function initScrollSpy() {
    var links = document.querySelectorAll(".nav__link--text[data-spy]");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var sections = [];
    Array.prototype.forEach.call(links, function (link) {
      var id = link.getAttribute("data-spy");
      var section = document.getElementById(id);
      if (!section) return;
      map[id] = link;
      sections.push(section);
    });
    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Array.prototype.forEach.call(links, function (l) {
              l.removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "page");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* --- Experience tabs -------------------------------------------------
     Replaces Material-UI Tabs. Full ARIA tab pattern including arrow keys. */

  function initTabs() {
    var root = document.querySelector("[data-tabs]");
    if (!root) return;

    var tablist = root.querySelector('[role="tablist"]');
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(
      root.querySelectorAll('[role="tabpanel"]')
    );
    var marker = root.querySelector(".jobs__marker");
    if (!tabs.length) return;

    var horizontal = window.matchMedia("(max-width: 780px)");

    function moveMarker(tab) {
      if (!marker) return;
      if (horizontal.matches) {
        marker.style.height = "";
        marker.style.width = tab.offsetWidth + "px";
        marker.style.transform = "translateX(" + tab.offsetLeft + "px)";
      } else {
        marker.style.width = "";
        marker.style.height = tab.offsetHeight + "px";
        marker.style.transform = "translateY(" + tab.offsetTop + "px)";
      }
    }

    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.setAttribute("tabindex", active ? "0" : "-1");
        if (panels[i]) panels[i].hidden = !active;
      });
      moveMarker(tabs[index]);
      if (focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(i, false);
      });
    });

    if (tablist) {
      tablist.addEventListener("keydown", function (e) {
        var currentIndex = tabs.indexOf(document.activeElement);
        if (currentIndex < 0) return;

        var nextKey = horizontal.matches ? "ArrowRight" : "ArrowDown";
        var prevKey = horizontal.matches ? "ArrowLeft" : "ArrowUp";
        var next = null;

        if (e.key === nextKey) next = (currentIndex + 1) % tabs.length;
        else if (e.key === prevKey)
          next = (currentIndex - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;

        if (next === null) return;
        e.preventDefault();
        select(next, true);
      });
    }

    select(0, false);

    // The marker is positioned in pixels, so it has to be recomputed whenever
    // the layout can change: resize, orientation flip, and font swap.
    function reposition() {
      var active = root.querySelector('[aria-selected="true"]');
      if (active) moveMarker(active);
    }
    window.addEventListener("resize", reposition);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(reposition);
    }
  }

  /* --- Project carousel ------------------------------------------------
     Replaces the Bootstrap carousel. Buttons, dots, arrow keys and swipe.
     No autoplay: the original had it effectively disabled, and moving
     screenshots under a reader is a nuisance. */

  function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;

    var track = root.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(
      root.querySelectorAll(".carousel__slide")
    );
    var dots = Array.prototype.slice.call(
      root.querySelectorAll(".carousel__dot")
    );
    var prev = root.querySelector(".carousel__btn--prev");
    var next = root.querySelector(".carousel__btn--next");
    if (!track || slides.length < 2) return;

    var index = 0;

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(" + -index * 100 + "%)";

      slides.forEach(function (slide, n) {
        var active = n === index;
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        // Keep off-screen slides out of the tab order.
        Array.prototype.forEach.call(
          slide.querySelectorAll("a, button"),
          function (el) {
            if (active) el.removeAttribute("tabindex");
            else el.setAttribute("tabindex", "-1");
          }
        );
      });

      dots.forEach(function (dot, n) {
        dot.setAttribute("aria-selected", n === index ? "true" : "false");
      });
    }

    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });

    dots.forEach(function (dot, n) {
      dot.addEventListener("click", function () {
        go(n);
      });
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      }
    });

    // Swipe. Pointer events cover touch, pen and mouse drag in one path.
    var startX = null;
    var startY = null;

    root.addEventListener(
      "pointerdown",
      function (e) {
        startX = e.clientX;
        startY = e.clientY;
      },
      { passive: true }
    );

    root.addEventListener(
      "pointerup",
      function (e) {
        if (startX === null) return;
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        startX = null;
        // Ignore mostly-vertical drags so page scrolling still works.
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
          go(dx < 0 ? index + 1 : index - 1);
        }
      },
      { passive: true }
    );

    go(0);
  }

  /* --- Footer year ------------------------------------------------------ */

  function initYear() {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-year]"),
      function (el) {
        el.textContent = String(new Date().getFullYear());
      }
    );
  }

  /* --- Boot ------------------------------------------------------------- */

  function boot() {
    initReveal();
    initTypewriter();
    initNav();
    initScrollSpy();
    initTabs();
    initCarousel();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
