
/* =========================================================
   RELMUN '26 — MAIN WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     01. MOBILE NAVIGATION
     ------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });

    navItems.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {

      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }

    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });

  }


  /* -------------------------------------------------------
     02. REGISTRATION MODAL
     ------------------------------------------------------- */

  const registrationModal = document.getElementById("registrationModal");

  const registerButtons = document.querySelectorAll(".js-register");
  const closeModalButtons = document.querySelectorAll(".js-close-modal");

  let previouslyFocusedElement = null;

  function openRegistrationModal() {

    if (!registrationModal) return;

    previouslyFocusedElement = document.activeElement;

    registrationModal.classList.add("active");
    registrationModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    const closeButton = registrationModal.querySelector(".modal-close");

    if (closeButton) {
      closeButton.focus();
    }

  }

  function closeRegistrationModal() {

    if (!registrationModal) return;

    registrationModal.classList.remove("active");
    registrationModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }

  }

  registerButtons.forEach(button => {

    button.addEventListener("click", event => {
      event.preventDefault();
      closeMenu();
      openRegistrationModal();
    });

  });

  closeModalButtons.forEach(button => {

    button.addEventListener("click", closeRegistrationModal);

  });


  /* -------------------------------------------------------
     03. ESCAPE KEY
     ------------------------------------------------------- */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeRegistrationModal();
      closeMenu();

    }

  });


  /* -------------------------------------------------------
     04. SMOOTH SCROLLING
     ------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      closeMenu();

    });

  });


  /* -------------------------------------------------------
     05. NAVBAR SCROLL EFFECT
     ------------------------------------------------------- */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 35) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();


  /* -------------------------------------------------------
     06. ACTIVE NAVIGATION
     ------------------------------------------------------- */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const currentId = entry.target.id;

      document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
          "active",
          href === `#${currentId}`
        );

      });

    });

  }, {
    root: null,
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* -------------------------------------------------------
     07. REVEAL ELEMENTS ON SCROLL
     ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".principles article, .committee-card, .timeline-item, " +
    ".prep-grid article, .person-card, .eb-grid article"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          revealObserver.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("revealed");
    });

  }


  /* -------------------------------------------------------
     08. FOOTER YEAR
     ------------------------------------------------------- */

  const footerYear = document.querySelector("[data-current-year]");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  /* -------------------------------------------------------
     09. PREVENT EMPTY LINK JUMPS
     ------------------------------------------------------- */

  document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {
      event.preventDefault();
    });

  });


  /* -------------------------------------------------------
     10. INITIALISE
     ------------------------------------------------------- */

  console.log("RELMUN '26 website initialised.");

});
