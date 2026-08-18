const committeeData = {

  unsc: {
    code: "UNSC",
    number: "01",

    title:
      "UNITED NATIONS<br>SECURITY COUNCIL",

    description:
      "The Security Council is the United Nations' principal body for addressing international peace and security. Delegates will engage in high-level diplomacy, negotiation and decision-making.",

    agenda:
      "TO BE ANNOUNCED"
  },


  unhrc: {
    code: "UNHRC",
    number: "02",

    title:
      "UNITED NATIONS<br>HUMAN RIGHTS COUNCIL",

    description:
      "The Human Rights Council addresses international human rights situations and promotes cooperation, dialogue and policy-focused multilateral action.",

    agenda:
      "TO BE ANNOUNCED"
  },


  unodc: {
    code: "UNODC",
    number: "03",

    title:
      "UNITED NATIONS OFFICE<br>ON DRUGS AND CRIME",

    description:
      "The United Nations Office on Drugs and Crime works around international cooperation against drugs, organised crime, corruption and related transnational challenges.",

    agenda:
      "TO BE ANNOUNCED"
  }

};



function renderCommitteePage() {

  const target =
    document.getElementById("committeePage");

  if (!target) return;


  const params =
    new URLSearchParams(window.location.search);


  const key =
    params.get("committee") || "unsc";


  const data =
    committeeData[key] || committeeData.unsc;


  document.title =
    `${data.code} | RELMUN '26`;


  target.innerHTML = `

    <section class="committee-detail-hero">

      <div class="detail-number">
        ${data.number}
      </div>


      <div class="section-index">
        COMMITTEE / ${data.code}
      </div>


      <h1>
        ${data.title}
      </h1>


      <p>
        ${data.description}
      </p>


      <div class="detail-meta">

        <span>
          COMMITTEE:
          <strong>${data.code}</strong>
        </span>

        <span>
          FORMAT:
          <strong>ONLINE</strong>
        </span>

        <span>
          DATE:
          <strong>26–27 DECEMBER 2026</strong>
        </span>

      </div>


      <div class="hero-actions">

        <button class="btn btn-gold js-register">
          REGISTER NOW <span>↗</span>
        </button>


        <a
          class="btn btn-outline"
          href="committees.html"
        >
          ALL COMMITTEES <span>→</span>
        </a>

      </div>

    </section>



    <section class="detail-section">

      <div class="section-index">
        01 / AGENDA
      </div>


      <div class="agenda-row">

        <span>
          AGENDA 01
        </span>

        <h2>
          ${data.agenda}
        </h2>

      </div>

    </section>



    <section class="detail-section">

      <div class="section-index">
        02 / BACKGROUND GUIDE
      </div>


      <div class="guide-row">

        <div>

          <small>
            OFFICIAL DOCUMENT
          </small>

          <h2>
            BACKGROUND GUIDE
          </h2>

          <p>
            The official ${data.code} Background Guide
            will be published once the committee's academic
            material has been finalised.
          </p>

        </div>


        <span class="coming">
          COMING SOON
        </span>

      </div>

    </section>



    <section class="detail-section">

      <div class="section-index">
        03 / EXECUTIVE BOARD
      </div>


      <div class="detail-eb">


        <div class="eb-role">

          <small>
            CHAIR
          </small>

          <strong>
            TO BE ANNOUNCED
          </strong>

        </div>


        <div class="eb-role">

          <small>
            VICE CHAIR
          </small>

          <strong>
            TO BE ANNOUNCED
          </strong>

        </div>


        <div class="eb-role">

          <small>
            MODERATOR
          </small>

          <strong>
            TO BE ANNOUNCED
          </strong>

        </div>


      </div>

    </section>



    <section class="detail-cta">

      <p class="eyebrow">
        READY?
      </p>


      <h2>
        ENTER THE<br>
        <em>COMMITTEE.</em>
      </h2>


      <p>
        Choose your preferred registration platform
        to register for ${data.code}.
      </p>


      <button class="btn btn-gold big js-register">
        REGISTER NOW <span>↗</span>
      </button>

    </section>

  `;


  bindRegistration();

}



function bindRegistration() {

  const modal =
    document.getElementById("registrationModal");

  if (!modal) return;


  document
    .querySelectorAll(".js-register")
    .forEach(button => {

      button.onclick = () => {

        modal.classList.add("open");

        modal.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.classList.add(
          "modal-open"
        );

      };

    });


  document
    .querySelectorAll(".js-close-modal")
    .forEach(button => {

      button.onclick = () => {

        modal.classList.remove("open");

        modal.setAttribute(
          "aria-hidden",
          "true"
        );

        document.body.classList.remove(
          "modal-open"
        );

      };

    });

}



function setupMenu() {

  const toggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector(".nav-links");


  if (!toggle || !nav) return;


  toggle.addEventListener(
    "click",
    () => {

      const open =
        nav.classList.toggle("open");


      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  nav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove("open");

        }
      );

    });

}



document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderCommitteePage();

    bindRegistration();

    setupMenu();


    document.addEventListener(
      "keydown",
      e => {

        if (e.key === "Escape") {

          document
            .querySelectorAll(".modal.open")
            .forEach(modal => {

              modal.classList.remove(
                "open"
              );

              modal.setAttribute(
                "aria-hidden",
                "true"
              );

              document.body.classList.remove(
                "modal-open"
              );

            });

        }

      }
    );

  }
);
