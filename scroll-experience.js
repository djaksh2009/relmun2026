/* =========================================================
   RELMUN '26 — CINEMATIC SCROLL CONTROLLER
========================================================= */

(() => {
  const scenes = [...document.querySelectorAll(".scroll-scene")];

  if (!scenes.length) return;

  const current =
    document.querySelector(".scroll-progress-current");

  const fill =
    document.querySelector(".scroll-progress-fill");

  let activeIndex = 0;
  let snapLock = false;
  let snapTimer = null;


  /* ---------------------------------------------------------
     ACTIVATE SCENE
  --------------------------------------------------------- */

  const setActive = (index) => {

    if (
      index === activeIndex &&
      scenes[index]?.classList.contains("is-active")
    ) {
      return;
    }

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
      fill.style.height =
        `${((index + 1) / scenes.length) * 100}%`;
    }
  };


  /* ---------------------------------------------------------
     INTERSECTION OBSERVER
  --------------------------------------------------------- */

  const observer =
    new IntersectionObserver(
      (entries) => {

        const visible =
          entries
            .filter(entry => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );

        if (!visible[0]) return;

        const index =
          scenes.indexOf(
            visible[0].target
          );

        if (index >= 0) {
          setActive(index);
        }
      },
      {
        threshold: [
          0.15,
          0.35,
          0.55,
          0.75
        ],

        rootMargin:
          "-8% 0px -8% 0px"
      }
    );


  scenes.forEach(scene =>
    observer.observe(scene)
  );


  /* ---------------------------------------------------------
     SOFT CINEMATIC SNAP
  --------------------------------------------------------- */

  const maybeSnap = () => {

    if (
      window.innerWidth <= 900 ||
      snapLock
    ) {
      return;
    }

    const viewportCenter =
      window.innerHeight * 0.5;

    let nearest = null;
    let distance = Infinity;


    scenes.forEach(scene => {

      const rect =
        scene.getBoundingClientRect();

      const center =
        rect.top +
        rect.height / 2;

      const d =
        Math.abs(
          center -
          viewportCenter
        );

      if (d < distance) {

        distance = d;
        nearest = scene;

      }

    });


    if (
      !nearest ||
      distance >
        window.innerHeight * 0.18
    ) {
      return;
    }


    snapLock = true;

    document.body.classList.add(
      "scene-shifting"
    );


    nearest.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    clearTimeout(snapTimer);

    snapTimer =
      setTimeout(() => {

        snapLock = false;

        document.body.classList.remove(
          "scene-shifting"
        );

      }, 850);
  };


  /* ---------------------------------------------------------
     SCROLL LISTENER
  --------------------------------------------------------- */

  let scrollEndTimer;

  window.addEventListener(
    "scroll",
    () => {

      clearTimeout(
        scrollEndTimer
      );

      scrollEndTimer =
        setTimeout(
          maybeSnap,
          130
        );

    },
    {
      passive: true
    }
  );


  /* ---------------------------------------------------------
     INITIAL SCENE
  --------------------------------------------------------- */

  setActive(0);


  /* ---------------------------------------------------------
     KEYBOARD NAVIGATION
  --------------------------------------------------------- */

  window.addEventListener(
    "keydown",
    (event) => {

      if (
        event.target.matches(
          "input, textarea, select, [contenteditable='true']"
        )
      ) {
        return;
      }


      /* NEXT */

      if (
        event.key === "PageDown" ||
        event.key === "ArrowDown"
      ) {

        const next =
          Math.min(
            activeIndex + 1,
            scenes.length - 1
          );

        if (
          next !== activeIndex
        ) {

          event.preventDefault();

          scenes[next].scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      }


      /* PREVIOUS */

      if (
        event.key === "PageUp" ||
        event.key === "ArrowUp"
      ) {

        const previous =
          Math.max(
            activeIndex - 1,
            0
          );

        if (
          previous !== activeIndex
        ) {

          event.preventDefault();

          scenes[previous].scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      }

    }
  );

})();
