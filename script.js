/* =========================================
   RELMUN '26 — MAIN SITE SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     MOBILE NAVIGATION
  ======================================== */

  const menuButton = document.querySelector(".nav-menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });

  }


  /* ========================================
     REGISTRATION COUNTDOWN
  ======================================== */

  const registrationDate =
    new Date("2026-10-01T00:00:00+05:30").getTime();

  const countdown =
    document.getElementById("registrationCountdown");

  const registrationOptions =
    document.getElementById("registrationOptions");

  const registrationDescription =
    document.getElementById("registrationDescription");

  const days =
    document.getElementById("countdownDays");

  const hours =
    document.getElementById("countdownHours");

  const minutes =
    document.getElementById("countdownMinutes");

  const seconds =
    document.getElementById("countdownSeconds");


  function pad(value) {
    return String(value).padStart(2, "0");
  }


  function openRegistrations() {

    if (countdown) {
      countdown.style.display = "none";
    }

    if (registrationOptions) {
      registrationOptions.classList.add("show");
    }

    if (registrationDescription) {
      registrationDescription.textContent =
        "Delegate registrations for RELMUN '26 are now open. Choose any of the available registration platforms below.";
    }

  }


  function updateCountdown() {

    const difference =
      registrationDate - Date.now();

    if (difference <= 0) {
      openRegistrations();
      return;
    }

    const totalSeconds =
      Math.floor(difference / 1000);

    const d =
      Math.floor(totalSeconds / 86400);

    const h =
      Math.floor((totalSeconds % 86400) / 3600);

    const m =
      Math.floor((totalSeconds % 3600) / 60);

    const s =
      totalSeconds % 60;


    if (days) days.textContent = pad(d);
    if (hours) hours.textContent = pad(h);
    if (minutes) minutes.textContent = pad(m);
    if (seconds) seconds.textContent = pad(s);

  }


  if (countdown) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  /* ========================================
     FAQ
  ======================================== */

  document.querySelectorAll(".faq-question")
    .forEach(button => {

      button.addEventListener("click", () => {

        const item =
          button.closest(".faq-item");

        if (!item) return;

        item.classList.toggle("open");

      });

    });


  /* ========================================
     SMOOTH INTERNAL LINKS
  ======================================== */

  document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const target =
          document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      });

    });

});
