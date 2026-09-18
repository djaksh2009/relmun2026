/* =========================================================
   RELMUN '26
   MASTER JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. CONFIG
     ======================================================= */

  const REGISTRATION_OPEN =
    new Date("2026-10-01T00:00:00+05:30");

  const CONFERENCE_START =
    new Date("2026-12-26T00:00:00+05:30");


  /* =======================================================
     02. MOBILE NAVIGATION
     ======================================================= */

  const menuButton =
    document.querySelector(".nav-menu");

  const navLinks =
    document.querySelector(".nav-links");

  if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("open");

      menuButton.classList.toggle(
        "active",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.style.overflow =
        isOpen ? "hidden" : "";

    });


    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          navLinks.classList.remove("open");

          menuButton.classList.remove(
            "active"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.style.overflow = "";

        });

      });

  }


  /* =======================================================
     03. HEADER SCROLL STATE
     ======================================================= */

  const header =
    document.querySelector("header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     04. SMOOTH ANCHOR SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", event => {

        const targetID =
          anchor.getAttribute("href");

        if (
          !targetID ||
          targetID === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetID);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          15;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      });

    });


  /* =======================================================
     05. REGISTRATION STATUS
     ======================================================= */

  function getRegistrationStatus() {

    const now = new Date();

    return now >= REGISTRATION_OPEN;

  }


  function updateRegistrationUI() {

    const isOpen =
      getRegistrationStatus();


    /* -----------------------------------------------
       Registration buttons
       ----------------------------------------------- */

    const registrationButtons =
      document.querySelectorAll(
        "[data-register], .nav-register"
      );


    registrationButtons.forEach(button => {

      if (
        button.tagName === "A" &&
        button.getAttribute("href") ===
        "register.html"
      ) {

        if (!isOpen) {

          button.setAttribute(
            "aria-disabled",
            "true"
          );

          button.classList.add(
            "registration-locked"
          );

        } else {

          button.removeAttribute(
            "aria-disabled"
          );

          button.classList.remove(
            "registration-locked"
          );

        }

      }

    });


    /* -----------------------------------------------
       Registration status text
       ----------------------------------------------- */

    const statusElements =
      document.querySelectorAll(
        "[data-registration-status]"
      );


    statusElements.forEach(element => {

      if (isOpen) {

        element.textContent =
          "REGISTRATIONS ARE OPEN";

        element.classList.add("open");

        element.classList.remove("closed");

      } else {

        element.textContent =
          "REGISTRATIONS OPEN 1 OCTOBER 2026";

        element.classList.add("closed");

        element.classList.remove("open");

      }

    });


    /* -----------------------------------------------
       Registration countdown
       ----------------------------------------------- */

    const countdown =
      document.querySelector(
        "#registrationCountdown"
      );


    if (!countdown) return;


    if (isOpen) {

      countdown.innerHTML = `
        <div class="countdown-label">
          REGISTRATIONS ARE NOW OPEN
        </div>
      `;

      countdown.classList.add(
        "registration-is-open"
      );

      return;

    }


    countdown.classList.remove(
      "registration-is-open"
    );


    countdown.innerHTML = `
      <div class="countdown-label">
        REGISTRATION OPENS IN
      </div>

      <div class="countdown">

        <div class="countdown-unit">
          <strong data-reg-days>00</strong>
          <span>DAYS</span>
        </div>

        <div class="countdown-unit">
          <strong data-reg-hours>00</strong>
          <span>HOURS</span>
        </div>

        <div class="countdown-unit">
          <strong data-reg-minutes>00</strong>
          <span>MINUTES</span>
        </div>

        <div class="countdown-unit">
          <strong data-reg-seconds>00</strong>
          <span>SECONDS</span>
        </div>

      </div>
    `;

  }


  updateRegistrationUI();


  /* =======================================================
     06. REGISTRATION COUNTDOWN
     ======================================================= */

  function updateRegistrationCountdown() {

    if (getRegistrationStatus()) {

      updateRegistrationUI();

      return;

    }


    const now =
      new Date();

    let difference =
      REGISTRATION_OPEN.getTime() -
      now.getTime();


    if (difference <= 0) {

      updateRegistrationUI();

      return;

    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );


    difference %=
      1000 * 60 * 60 * 24;


    const hours =
      Math.floor(
        difference /
        (1000 * 60 * 60)
      );


    difference %=
      1000 * 60 * 60;


    const minutes =
      Math.floor(
        difference /
        (1000 * 60)
      );


    const seconds =
      Math.floor(
        (difference %
          (1000 * 60)) /
        1000
      );


    const daysElement =
      document.querySelector(
        "[data-reg-days]"
      );

    const hoursElement =
      document.querySelector(
        "[data-reg-hours]"
      );

    const minutesElement =
      document.querySelector(
        "[data-reg-minutes]"
      );

    const secondsElement =
      document.querySelector(
        "[data-reg-seconds]"
      );


    if (daysElement) {

      daysElement.textContent =
        String(days).padStart(2, "0");

    }


    if (hoursElement) {

      hoursElement.textContent =
        String(hours).padStart(2, "0");

    }


    if (minutesElement) {

      minutesElement.textContent =
        String(minutes).padStart(2, "0");

    }


    if (secondsElement) {

      secondsElement.textContent =
        String(seconds).padStart(2, "0");

    }

  }


  updateRegistrationCountdown();

  setInterval(
    updateRegistrationCountdown,
    1000
  );


  /* =======================================================
     07. CONFERENCE COUNTDOWN
     ======================================================= */

  const conferenceCountdown =
    document.querySelector(
      "[data-conference-countdown]"
    );


  function updateConferenceCountdown() {

    if (!conferenceCountdown) return;


    const now =
      new Date();

    let difference =
      CONFERENCE_START.getTime() -
      now.getTime();


    if (difference <= 0) {

      conferenceCountdown.textContent =
        "RELMUN '26 IS LIVE";

      return;

    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );


    difference %=
      1000 * 60 * 60 * 24;


    const hours =
      Math.floor(
        difference /
        (1000 * 60 * 60)
      );


    difference %=
      1000 * 60 * 60;


    const minutes =
      Math.floor(
        difference /
        (1000 * 60)
      );


    const seconds =
      Math.floor(
        (difference %
          (1000 * 60)) /
        1000
      );


    conferenceCountdown.textContent =
      `${days}D ${String(hours).padStart(2, "0")}H ` +
      `${String(minutes).padStart(2, "0")}M ` +
      `${String(seconds).padStart(2, "0")}S`;

  }


  updateConferenceCountdown();

  setInterval(
    updateConferenceCountdown,
    1000
  );


  /* =======================================================
     08. FAQ ACCORDION
     ======================================================= */

  const faqItems =
    document.querySelectorAll(
      ".faq-item"
    );


  faqItems.forEach(item => {

    const question =
      item.querySelector(
        ".faq-question"
      );

    const answer =
      item.querySelector(
        ".faq-answer"
      );


    if (!question || !answer) return;


    question.setAttribute(
      "aria-expanded",
      "false"
    );


    answer.style.maxHeight =
      "0px";


    answer.style.overflow =
      "hidden";


    answer.style.transition =
      "max-height .4s cubic-bezier(.22,1,.36,1), opacity .3s ease";


    answer.style.opacity =
      "0";


    question.addEventListener(
      "click",
      () => {

        const isOpen =
          item.classList.contains(
            "active"
          );


        /* Close all other FAQs */

        faqItems.forEach(other => {

          if (other === item) return;

          other.classList.remove(
            "active"
          );

          const otherQuestion =
            other.querySelector(
              ".faq-question"
            );

          const otherAnswer =
            other.querySelector(
              ".faq-answer"
            );


          if (otherQuestion) {

            otherQuestion.setAttribute(
              "aria-expanded",
              "false"
            );

          }


          if (otherAnswer) {

            otherAnswer.style.maxHeight =
              "0px";

            otherAnswer.style.opacity =
              "0";

          }

        });


        if (isOpen) {

          item.classList.remove(
            "active"
          );

          question.setAttribute(
            "aria-expanded",
            "false"
          );

          answer.style.maxHeight =
            "0px";

          answer.style.opacity =
            "0";

        } else {

          item.classList.add(
            "active"
          );

          question.setAttribute(
            "aria-expanded",
            "true"
          );

          answer.style.maxHeight =
            answer.scrollHeight +
            "px";

          answer.style.opacity =
            "1";

        }

      }
    );

  });


  /* =======================================================
     09. SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".section, .committee-card, " +
      ".person-card, .eb-card, " +
      ".conference-item, .experience-card, " +
      ".register-panel"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "revealed"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: .08,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(element => {

      element.classList.add(
        "reveal-ready"
      );

      observer.observe(element);

    });

  } else {

    revealElements.forEach(
      element =>
        element.classList.add(
          "revealed"
        )
    );

  }


  /* =======================================================
     10. ACTIVE NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  const navAnchors =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );


  if (
    sections.length &&
    navAnchors.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            const id =
              entry.target.id;


            navAnchors.forEach(anchor => {

              anchor.classList.remove(
                "active"
              );


              if (
                anchor.getAttribute(
                  "href"
                ) === `#${id}`
              ) {

                anchor.classList.add(
                  "active"
                );

              }

            });

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(
        section
      );

    });

  }


  /* =======================================================
     11. REGISTRATION PAGE PROTECTION
     ======================================================= */

  const isRegistrationPage =
    window.location.pathname
      .toLowerCase()
      .includes("register");


  if (
    isRegistrationPage &&
    !getRegistrationStatus()
  ) {

    const registrationForm =
      document.querySelector(
        "#registrationForm, form"
      );


    if (registrationForm) {

      registrationForm
        .addEventListener(
          "submit",
          event => {

            if (
              !getRegistrationStatus()
            ) {

              event.preventDefault();

              showRegistrationLockedMessage();

            }

          }
        );

    }

  }


  function showRegistrationLockedMessage() {

    let message =
      document.querySelector(
        "#registrationLockedMessage"
      );


    if (!message) {

      message =
        document.createElement(
          "div"
        );

      message.id =
        "registrationLockedMessage";


      message.innerHTML = `
        <div class="registration-lock-inner">
          <span class="registration-lock-label">
            RELMUN '26
          </span>

          <h3>
            Registrations aren't open yet.
          </h3>

          <p>
            Delegate registrations open on
            <strong>1 October 2026</strong>.
          </p>

          <button type="button" data-close-lock>
            CLOSE
          </button>
        </div>
      `;


      Object.assign(
        message.style,
        {
          position: "fixed",
          inset: "0",
          zIndex: "99999",
          display: "grid",
          placeItems: "center",
          padding: "25px",
          background:
            "rgba(3,6,10,.92)",
          backdropFilter:
            "blur(18px)"
        }
      );


      document.body.appendChild(
        message
      );


      const closeButton =
        message.querySelector(
          "[data-close-lock]"
        );


      if (closeButton) {

        closeButton.addEventListener(
          "click",
          () => {

            message.remove();

          }
        );

      }

    }

  }


  /* =======================================================
     12. REGISTRATION OPEN BUTTON LOGIC
     ======================================================= */

  document
    .querySelectorAll(
      "a[href='register.html'], " +
      "a[href='./register.html']"
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          if (
            !getRegistrationStatus()
          ) {

            event.preventDefault();

            showRegistrationLockedMessage();

          }

        }
      );

    });


  /* =======================================================
     13. CHATBOT
     ======================================================= */

  const chatbotToggle =
    document.querySelector(
      "[data-chatbot-toggle]"
    );

  const chatbotPanel =
    document.querySelector(
      "[data-chatbot]"
    );


  if (
    chatbotToggle &&
    chatbotPanel
  ) {

    chatbotToggle.addEventListener(
      "click",
      () => {

        const open =
          chatbotPanel.classList.toggle(
            "open"
          );

        chatbotToggle.setAttribute(
          "aria-expanded",
          String(open)
        );

      }
    );


    const chatbotClose =
      chatbotPanel.querySelector(
        "[data-chatbot-close]"
      );


    if (chatbotClose) {

      chatbotClose.addEventListener(
        "click",
        () => {

          chatbotPanel.classList.remove(
            "open"
          );

          chatbotToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }

  }


  /* =======================================================
     14. CHATBOT QUICK QUESTIONS
     ======================================================= */

  document
    .querySelectorAll(
      "[data-chat-question]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const question =
            button.dataset.chatQuestion;


          if (
            !question
          ) return;


          const input =
            document.querySelector(
              "[data-chat-input]"
            );


          if (input) {

            input.value =
              question;

            input.focus();

          }

        }
      );

    });


  /* =======================================================
     15. EXTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach(link => {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    });


  /* =======================================================
     16. CURRENT YEAR
     ======================================================= */

  document
    .querySelectorAll(
      "[data-current-year]"
    )
    .forEach(element => {

      element.textContent =
        new Date().getFullYear();

    });


  /* =======================================================
     17. PREVENT ACCIDENTAL DOUBLE FORM SUBMISSION
     ======================================================= */

  document
    .querySelectorAll("form")
    .forEach(form => {

      form.addEventListener(
        "submit",
        () => {

          const submitButton =
            form.querySelector(
              'button[type="submit"], input[type="submit"]'
            );


          if (
            submitButton &&
            getRegistrationStatus()
          ) {

            submitButton.disabled =
              true;

            submitButton.dataset
              .originalText =
              submitButton.textContent;


            if (
              submitButton.tagName ===
              "BUTTON"
            ) {

              submitButton.textContent =
                "SUBMITTING…";

            }

          }

        }
      );

    });


  /* =======================================================
     18. PAGE LOADED
     ======================================================= */

  document.body.classList.add(
    "page-loaded"
  );

});
