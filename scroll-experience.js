/* =========================================================
   RELMUN '26 — CINEMATIC EXPERIENCE CONTROLLER
   Scroll scenes + progress + countdown + keyboard navigation
========================================================= */

(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    const scenes = [
      ...document.querySelectorAll(".scroll-scene")
    ];

    /* =====================================================
       SCENE ELEMENTS
    ===================================================== */

    const current =
      document.querySelector(".scroll-progress-current");

    const total =
      document.querySelector(".scroll-progress-total");

    const fill =
      document.querySelector(".scroll-progress-fill");


    if (total) {
      total.textContent =
        String(scenes.length).padStart(2, "0");
    }


    let activeIndex = 0;


    /* =====================================================
       ACTIVATE SCENE
    ===================================================== */

    function setActive(index) {

      if (!scenes.length) return;

      index = Math.max(
        0,
        Math.min(index, scenes.length - 1)
      );

      activeIndex = index;


      scenes.forEach((scene, i) => {

        scene.classList.toggle(
          "is-active",
          i === index
        );

      });


      if (current) {

        current.textContent =
          String(index + 1).padStart(2, "0");

      }


      if (fill) {

        const percentage =
          ((index + 1) / scenes.length) * 100;

        fill.style.height =
          `${percentage}%`;

      }

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    if (scenes.length) {

      const observer =
        new IntersectionObserver(
          entries => {

            const visible =
              entries
                .filter(
                  entry =>
                    entry.isIntersecting
                )
                .sort(
                  (a, b) =>
                    b.intersectionRatio -
                    a.intersectionRatio
                );


            if (!visible.length) return;


            const index =
              scenes.indexOf(
                visible[0].target
              );


            if (index !== -1) {
              setActive(index);
            }

          },
          {
            threshold: [
              0.15,
              0.30,
              0.50,
              0.70
            ],

            rootMargin:
              "-10% 0px -10% 0px"
          }
        );


      scenes.forEach(scene =>
        observer.observe(scene)
      );

    }


    /* =====================================================
       CINEMATIC SNAP
       Only desktop + only when user has mostly stopped
       scrolling.
    ===================================================== */

    let scrollTimer = null;
    let lastScrollY = window.scrollY;
    let snapping = false;


    function cinematicSnap() {

      if (
        window.innerWidth <= 900 ||
        snapping ||
        !scenes.length ||
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }


      const viewportCenter =
        window.innerHeight / 2;


      let nearest = null;
      let nearestDistance = Infinity;


      scenes.forEach(scene => {

        const rect =
          scene.getBoundingClientRect();


        const center =
          rect.top +
          rect.height / 2;


        const distance =
          Math.abs(
            center -
            viewportCenter
          );


        if (
          distance <
          nearestDistance
        ) {

          nearestDistance =
            distance;

          nearest =
            scene;

        }

      });


      if (!nearest) return;


      /*
        Don't hijack scrolling if the nearest scene
        is still far away.
      */

      if (
        nearestDistance >
        window.innerHeight * 0.12
      ) {
        return;
      }


      const rect =
        nearest.getBoundingClientRect();


      /*
        If the scene is already basically aligned,
        don't trigger another smooth scroll.
      */

      if (
        Math.abs(rect.top) <
        12
      ) {
        return;
      }


      snapping = true;

      document.body.classList.add(
        "scene-shifting"
      );


      nearest.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


      window.setTimeout(() => {

        snapping = false;

        document.body.classList.remove(
          "scene-shifting"
        );

      }, 850);

    }


    window.addEventListener(
      "scroll",
      () => {

        const currentY =
          window.scrollY;


        lastScrollY =
          currentY;


        clearTimeout(
          scrollTimer
        );


        scrollTimer =
          window.setTimeout(
            cinematicSnap,
            180
          );

      },
      {
        passive: true
      }
    );


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    window.addEventListener(
      "keydown",
      event => {

        const target =
          event.target;


        if (
          target &&
          (
            target.matches(
              "input, textarea, select, button"
            ) ||
            target.isContentEditable
          )
        ) {
          return;
        }


        let targetIndex =
          activeIndex;


        if (
          event.key === "ArrowDown" ||
          event.key === "PageDown"
        ) {

          targetIndex =
            Math.min(
              activeIndex + 1,
              scenes.length - 1
            );

        }


        if (
          event.key === "ArrowUp" ||
          event.key === "PageUp"
        ) {

          targetIndex =
            Math.max(
              activeIndex - 1,
              0
            );

        }


        if (
          event.key === "Home"
        ) {

          targetIndex = 0;

        }


        if (
          event.key === "End"
        ) {

          targetIndex =
            scenes.length - 1;

        }


        if (
          targetIndex !== activeIndex
        ) {

          event.preventDefault();

          scenes[targetIndex]
            .scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

        }

      }
    );


    /* =====================================================
       REGISTRATION COUNTDOWN
    ===================================================== */

    const registrationCountdown =
      document.getElementById(
        "registrationCountdown"
      );

    const registrationOptions =
      document.getElementById(
        "registrationOptions"
      );

    const registrationDescription =
      document.getElementById(
        "registrationDescription"
      );


    const countdownDays =
      document.getElementById(
        "countdownDays"
      );

    const countdownHours =
      document.getElementById(
        "countdownHours"
      );

    const countdownMinutes =
      document.getElementById(
        "countdownMinutes"
      );

    const countdownSeconds =
      document.getElementById(
        "countdownSeconds"
      );


    /*
      Registration opening:
      1 October 2026, 00:00 IST
    */

    const REGISTRATION_OPEN =
      new Date(
        "2026-10-01T00:00:00+05:30"
      ).getTime();


    function pad(value) {

      return String(value)
        .padStart(2, "0");

    }


    function updateCountdown() {

      const remaining =
        REGISTRATION_OPEN -
        Date.now();


      if (remaining <= 0) {

        if (registrationCountdown) {
          registrationCountdown.style.display =
            "none";
        }


        if (registrationOptions) {

          registrationOptions.classList.add(
            "open"
          );

        }


        if (registrationDescription) {

          registrationDescription.textContent =
            "Delegate registrations for RELMUN '26 are now open.";

        }


        return;

      }


      const totalSeconds =
        Math.floor(
          remaining / 1000
        );


      const days =
        Math.floor(
          totalSeconds / 86400
        );


      const hours =
        Math.floor(
          (totalSeconds % 86400) /
          3600
        );


      const minutes =
        Math.floor(
          (totalSeconds % 3600) /
          60
        );


      const seconds =
        totalSeconds % 60;


      if (countdownDays) {
        countdownDays.textContent =
          pad(days);
      }


      if (countdownHours) {
        countdownHours.textContent =
          pad(hours);
      }


      if (countdownMinutes) {
        countdownMinutes.textContent =
          pad(minutes);
      }


      if (countdownSeconds) {
        countdownSeconds.textContent =
          pad(seconds);
      }

    }


    if (
      registrationCountdown
    ) {

      updateCountdown();

      window.setInterval(
        updateCountdown,
        1000
      );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    if (scenes.length) {
      setActive(0);
    }

  });

})();
