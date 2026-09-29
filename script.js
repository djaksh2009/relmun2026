(() => {

  'use strict';


  /* =========================================================
     RELMUN '26 — MASTER JAVASCRIPT
  ========================================================= */


  document.addEventListener('DOMContentLoaded', () => {


    /* =======================================================
       CONFIGURATION
    ======================================================= */

    /*
      FastAPI backend.

      Keep localhost while testing:

      http://127.0.0.1:8000

      Replace this later with the deployed API URL.
    */

    const API_BASE_URL =
      'http://127.0.0.1:8000';


    /*
      Delegate registration opening date.

      1 October 2026
      00:00 IST
    */

    const OPEN_DATE =
      new Date(
        '2026-10-01T00:00:00+05:30'
      ).getTime();


    /* =======================================================
       MOBILE NAVIGATION
    ======================================================= */

    const menu =
      document.getElementById(
        'menuToggle'
      );

    const nav =
      document.getElementById(
        'navLinks'
      );


    if (menu && nav) {

      menu.addEventListener(
        'click',
        () => {

          const open =
            nav.classList.toggle(
              'open'
            );


          menu.setAttribute(
            'aria-expanded',
            String(open)
          );

        }
      );


      nav
        .querySelectorAll('a')
        .forEach(link => {

          link.addEventListener(
            'click',
            () => {

              nav.classList.remove(
                'open'
              );


              menu.setAttribute(
                'aria-expanded',
                'false'
              );

            }
          );

        });

    }


    /* =======================================================
       SMOOTH ANCHOR NAVIGATION
    ======================================================= */

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(link => {

        link.addEventListener(
          'click',
          event => {

            const targetId =
              link.getAttribute(
                'href'
              );


            if (
              !targetId ||
              targetId === '#'
            ) {
              return;
            }


            const target =
              document.querySelector(
                targetId
              );


            if (!target) {
              return;
            }


            event.preventDefault();


            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });

          }
        );

      });


    /* =======================================================
       REGISTRATION COUNTDOWN
    ======================================================= */

    const countdown =
      document.getElementById(
        'registrationCountdown'
      );


    const countdownDays =
      document.getElementById(
        'countdownDays'
      );


    const countdownHours =
      document.getElementById(
        'countdownHours'
      );


    const countdownMinutes =
      document.getElementById(
        'countdownMinutes'
      );


    const countdownSeconds =
      document.getElementById(
        'countdownSeconds'
      );


    const registrationDescription =
      document.getElementById(
        'registrationDescription'
      );


    function pad(number) {

      return String(number)
        .padStart(2, '0');

    }


    function updateRegistrationCountdown() {

      const difference =
        OPEN_DATE -
        Date.now();


      /*
        Registration has opened.
      */

      if (difference <= 0) {

        if (countdown) {

          countdown.style.display =
            'none';

        }


        if (registrationDescription) {

          registrationDescription.textContent =
            'Delegate registrations for RELMUN 2026 are now open.';

        }


        return;

      }


      const totalSeconds =
        Math.floor(
          difference / 1000
        );


      const days =
        Math.floor(
          totalSeconds / 86400
        );


      const hours =
        Math.floor(
          (totalSeconds % 86400) / 3600
        );


      const minutes =
        Math.floor(
          (totalSeconds % 3600) / 60
        );


      const seconds =
        totalSeconds % 60;


      if (countdownDays) {

        countdownDays.textContent =
          String(days);

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


    if (countdown) {

      updateRegistrationCountdown();


      setInterval(
        updateRegistrationCountdown,
        1000
      );

    }


    /* =======================================================
       SCROLL PROGRESS
    ======================================================= */

    const progressFill =
      document.querySelector(
        '.scroll-progress-fill'
      );


    const progressCurrent =
      document.querySelector(
        '.scroll-progress-current'
      );


    const progressTotal =
      document.querySelector(
        '.scroll-progress-total'
      );


    const scenes =
      Array.from(
        document.querySelectorAll(
          '.scroll-scene'
        )
      );


    if (
      progressTotal &&
      scenes.length
    ) {

      progressTotal.textContent =
        String(
          scenes.length
        ).padStart(
          2,
          '0'
        );

    }


    function updateScrollProgress() {

      const scrollTop =
        window.scrollY;


      const documentHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;


      const percentage =
        documentHeight > 0
          ? scrollTop / documentHeight
          : 0;


      if (progressFill) {

        progressFill.style.height =
          `${Math.min(
            100,
            Math.max(
              0,
              percentage * 100
            )
          )}%`;

      }


      if (
        progressCurrent &&
        scenes.length
      ) {

        let activeIndex = 0;


        scenes.forEach(
          (scene, index) => {

            const rect =
              scene.getBoundingClientRect();


            if (
              rect.top <
              window.innerHeight * 0.55
            ) {

              activeIndex =
                index;

            }

          }
        );


        progressCurrent.textContent =
          String(
            activeIndex + 1
          ).padStart(
            2,
            '0'
          );

      }

    }


    window.addEventListener(
      'scroll',
      updateScrollProgress,
      {
        passive: true
      }
    );


    updateScrollProgress();


    /* =======================================================
       CINEMATIC SCENE ACTIVATION
    ======================================================= */

    if (scenes.length) {

      const sceneObserver =
        new IntersectionObserver(
          entries => {

            entries.forEach(
              entry => {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    'is-active'
                  );

                } else {

                  entry.target.classList.remove(
                    'is-active'
                  );

                }

              }
            );

          },
          {
            threshold: 0.18,

            rootMargin:
              '-10% 0px -10% 0px'
          }
        );


      scenes.forEach(
        scene => {

          sceneObserver.observe(
            scene
          );

        }
      );

    }


    /* =======================================================
       CINEMATIC REVEALS
    ======================================================= */

    const revealElements =
      document.querySelectorAll(
        `
        .scroll-scene .section-index,
        .scroll-scene h2,
        .scroll-scene .heading-row,
        .scroll-scene .about-copy,
        .scroll-scene .conference-item,
        .scroll-scene .committee-card,
        .scroll-scene .experience-card,
        .scroll-scene .team-subheading,
        .scroll-scene .person-card,
        .scroll-scene .eb-grid article,
        .scroll-scene .munflow-panel,
        .scroll-scene .contact-list
        `
      );


    revealElements.forEach(
      (element, index) => {

        element.style.opacity =
          '0';


        element.style.transform =
          'translateY(35px)';


        element.style.transition =
          'opacity .9s cubic-bezier(.16,1,.3,1), ' +
          'transform .9s cubic-bezier(.16,1,.3,1)';


        element.dataset.revealDelay =
          String(
            Math.min(
              (index % 6) * 70,
              350
            )
          );

      }
    );


    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              const element =
                entry.target;


              const delay =
                Number(
                  element.dataset
                    .revealDelay ||
                  0
                );


              setTimeout(
                () => {

                  element.style.opacity =
                    '1';


                  element.style.transform =
                    'translateY(0)';

                },
                delay
              );


              revealObserver.unobserve(
                element
              );

            }
          );

        },
        {
          threshold: 0.12,

          rootMargin:
            '0px 0px -8% 0px'
        }
      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );


    /* =======================================================
       HERO PARALLAX
    ======================================================= */

    const hero =
      document.querySelector(
        '.hero'
      );


    const heroTitle =
      document.querySelector(
        '.hero-title'
      );


    function updateParallax() {

      if (
        !hero ||
        !heroTitle
      ) {
        return;
      }


      const scroll =
        window.scrollY;


      const heroHeight =
        hero.offsetHeight;


      if (
        scroll >
        heroHeight
      ) {
        return;
      }


      const movement =
        scroll * 0.18;


      heroTitle.style.transform =
        `translateY(${movement}px)`;

    }


    window.addEventListener(
      'scroll',
      updateParallax,
      {
        passive: true
      }
    );


    /* =======================================================
       HERO MOUSE MOVEMENT
    ======================================================= */

    if (
      hero &&
      window.matchMedia(
        '(hover: hover)'
      ).matches
    ) {

      hero.addEventListener(
        'mousemove',
        event => {

          const rect =
            hero.getBoundingClientRect();


          const x =
            (
              event.clientX -
              rect.left
            ) /
              rect.width -
            0.5;


          const y =
            (
              event.clientY -
              rect.top
            ) /
              rect.height -
            0.5;


          hero.style.setProperty(
            '--mouse-x',
            `${x * 20}px`
          );


          hero.style.setProperty(
            '--mouse-y',
            `${y * 20}px`
          );

        }
      );


      hero.addEventListener(
        'mouseleave',
        () => {

          hero.style.setProperty(
            '--mouse-x',
            '0px'
          );


          hero.style.setProperty(
            '--mouse-y',
            '0px'
          );

        }
      );

    }


    /* =======================================================
       FAQ ACCORDION
    ======================================================= */

    document
      .querySelectorAll(
        '.faq-question'
      )
      .forEach(
        question => {

          question.addEventListener(
            'click',
            () => {

              const item =
                question.closest(
                  '.faq-item'
                );


              if (!item) {
                return;
              }


              const answer =
                item.querySelector(
                  '.faq-answer'
                );


              if (!answer) {
                return;
              }


              const isOpen =
                question.getAttribute(
                  'aria-expanded'
                ) === 'true';


              /*
                Close all other FAQs.
              */

              document
                .querySelectorAll(
                  '.faq-item'
                )
                .forEach(
                  other => {

                    if (
                      other === item
                    ) {
                      return;
                    }


                    const otherQuestion =
                      other.querySelector(
                        '.faq-question'
                      );


                    const otherAnswer =
                      other.querySelector(
                        '.faq-answer'
                      );


                    if (
                      otherQuestion
                    ) {

                      otherQuestion
                        .setAttribute(
                          'aria-expanded',
                          'false'
                        );

                    }


                    other.classList.remove(
                      'open'
                    );


                    if (
                      otherAnswer
                    ) {

                      otherAnswer.style
                        .maxHeight =
                        null;

                    }

                  }
                );


              question.setAttribute(
                'aria-expanded',
                String(
                  !isOpen
                )
              );


              item.classList.toggle(
                'open',
                !isOpen
              );


              answer.style.maxHeight =
                isOpen
                  ? null
                  : `${answer.scrollHeight}px`;

            }
          );

        }
      );


    /* =======================================================
       REX CHATBOT — FASTAPI
    ======================================================= */

    const chatForm =
      document.getElementById(
        'rexChatForm'
      );


    const chatInput =
      document.getElementById(
        'rexChatInput'
      );


    const chatMessages =
      document.getElementById(
        'rexChatMessages'
      );


    const chatSend =
      document.getElementById(
        'rexChatSend'
      );


    /* =======================================================
       REX MESSAGE FORMATTER
    ======================================================= */

    function formatRexResponse(
      text
    ) {

      if (!text) {
        return '';
      }


      let html =
        String(text);


      /*
        Escape HTML first.
      */

      html =
        html
          .replace(
            /&/g,
            '&amp;'
          )
          .replace(
            /</g,
            '&lt;'
          )
          .replace(
            />/g,
            '&gt;'
          );


      /*
        Headings.
      */

      html =
        html.replace(
          /^### (.*)$/gm,
          '<h5>$1</h5>'
        );


      html =
        html.replace(
          /^## (.*)$/gm,
          '<h4>$1</h4>'
        );


      /*
        Bold text.
      */

      html =
        html.replace(
          /\*\*(.*?)\*\*/g,
          '<strong>$1</strong>'
        );


      /*
        Bullet points.
      */

      html =
        html.replace(
          /^- (.*)$/gm,
          '<li>$1</li>'
        );


      html =
        html.replace(
          /(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gs,
          '<ul>$1</ul>'
        );


      /*
        Line breaks.
      */

      html =
        html.replace(
          /\n\n/g,
          '<br>'
        );


      html =
        html.replace(
          /\n/g,
          '<br>'
        );


      return html;

    }


    /* =======================================================
       ADD CHAT MESSAGE
    ======================================================= */

    function addChatMessage(
      text,
      type
    ) {

      if (!chatMessages) {
        return;
      }


      const message =
        document.createElement(
          'div'
        );


      message.className =
        `rex-message ${type}`;


      if (
        type === 'rex'
      ) {

        message.innerHTML =
          formatRexResponse(
            text
          );

      } else {

        message.textContent =
          text;

      }


      chatMessages.appendChild(
        message
      );


      chatMessages.scrollTo({
        top:
          chatMessages.scrollHeight,

        behavior:
          'smooth'
      });

    }


    /* =======================================================
       REX TYPING INDICATOR
    ======================================================= */

    function addTypingMessage() {

      if (!chatMessages) {
        return null;
      }


      const typing =
        document.createElement(
          'div'
        );


      typing.className =
        'rex-message rex typing';


      typing.innerHTML =
        `
          <span></span>
          <span></span>
          <span></span>
        `;


      chatMessages.appendChild(
        typing
      );


      chatMessages.scrollTo({
        top:
          chatMessages.scrollHeight,

        behavior:
          'smooth'
      });


      return typing;

    }


    /* =======================================================
       ASK REX
    ======================================================= */

    async function askREX(
      message
    ) {

      if (
        !message ||
        !message.trim()
      ) {
        return;
      }


      const cleanMessage =
        message.trim();


      addChatMessage(
        cleanMessage,
        'user'
      );


      if (chatInput) {

        chatInput.value =
          '';

      }


      const typing =
        addTypingMessage();


      if (chatSend) {

        chatSend.disabled =
          true;

      }


      try {

        const response =
          await fetch(
            `${API_BASE_URL}/chat`,
            {
              method:
                'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify({
                  message:
                    cleanMessage
                })
            }
          );


        if (!response.ok) {

          throw new Error(
            `HTTP ${response.status}`
          );

        }


        const data =
          await response.json();


        if (typing) {

          typing.remove();

        }


        addChatMessage(
          data.reply ||
          'I could not process that request.',
          'rex'
        );


      } catch (error) {

        console.error(
          'REX API error:',
          error
        );


        if (typing) {

          typing.remove();

        }


        addChatMessage(
          'REX is currently unavailable. Please try again in a moment.',
          'rex'
        );

      } finally {

        if (chatSend) {

          chatSend.disabled =
            false;

        }


        if (chatInput) {

          chatInput.focus();

        }

      }

    }


    /* =======================================================
       REX CHAT FORM
    ======================================================= */

    if (chatForm) {

      chatForm.addEventListener(
        'submit',
        event => {

          event.preventDefault();


          if (!chatInput) {
            return;
          }


          askREX(
            chatInput.value
          );

        }
      );

    }


    /* =======================================================
       REX ENTER KEY
    ======================================================= */

    if (chatInput) {

      chatInput.addEventListener(
        'keydown',
        event => {

          /*
            Enter sends.
            Shift + Enter creates a new line.
          */

          if (
            event.key === 'Enter' &&
            !event.shiftKey
          ) {

            event.preventDefault();


            if (chatForm) {

              chatForm.requestSubmit();

            }

          }

        }
      );

    }


    /* =======================================================
       REX QUICK QUESTIONS
    ======================================================= */

    document
      .querySelectorAll(
        '[data-rex-question]'
      )
      .forEach(
        button => {

          button.addEventListener(
            'click',
            () => {

              const question =
                button.dataset
                  .rexQuestion;


              if (!question) {
                return;
              }


              if (chatInput) {

                chatInput.value =
                  question;

              }


              askREX(
                question
              );

            }
          );

        }
      );


    /* =======================================================
       MUNFLOW PARTNER
    ======================================================= */

    /*
      MUNFLOW's website URL has NOT been
      provided yet.

      Keep this blank for now.

      Once they give you their website,
      change it to:

      const MUNFLOW_URL =
        'https://example.com';
    */

    const MUNFLOW_URL =
      '';


    document
      .querySelectorAll(
        '[data-munflow-link]'
      )
      .forEach(
        link => {

          link.addEventListener(
            'click',
            event => {

              if (!MUNFLOW_URL) {

                event.preventDefault();

                return;

              }


              link.href =
                MUNFLOW_URL;


              link.target =
                '_blank';


              link.rel =
                'noopener noreferrer';

            }
          );

        }
      );


    /* =======================================================
       INTERACTIVE COMMITTEE CARDS
    ======================================================= */

    const tiltCards =
      document.querySelectorAll(
        '.committee-card, .experience-card'
      );


    if (
      window.matchMedia(
        '(hover: hover)'
      ).matches
    ) {

      tiltCards.forEach(
        card => {

          card.addEventListener(
            'mousemove',
            event => {

              const rect =
                card.getBoundingClientRect();


              const x =
                event.clientX -
                rect.left;


              const y =
                event.clientY -
                rect.top;


              const rotateY =
                (
                  x -
                  rect.width / 2
                ) /
                rect.width *
                4;


              const rotateX =
                -(
                  y -
                  rect.height / 2
                ) /
                rect.height *
                4;


              card.style.transform =
                `
                  perspective(900px)
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                  translateY(-5px)
                `;

            }
          );


          card.addEventListener(
            'mouseleave',
            () => {

              card.style.transform =
                '';

            }
          );

        }
      );

    }


    /* =======================================================
       CONFERENCE DATE
    ======================================================= */

    const conferenceDate =
      document.querySelector(
        '[data-conference-date]'
      );


    if (conferenceDate) {

      conferenceDate.textContent =
        '26–27 DECEMBER 2026';

    }


    /* =======================================================
       PAGE LOAD
    ======================================================= */

    document.body.classList.add(
      'page-loaded'
    );


    window.requestAnimationFrame(
      () => {

        updateScrollProgress();

        updateParallax();

        updateRegistrationCountdown();

      }
    );


  });

})();
