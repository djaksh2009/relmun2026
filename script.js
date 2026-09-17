/* =========================================================
   RELMUN '26
   COMMITTEE SYSTEM
   ========================================================= */


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
  },


  aippm: {
    code: "AIPPM",
    number: "04",

    title:
      "ALL INDIA<br>POLITICAL PARTIES MEET",

    description:
      "AIPPM brings together representatives of India's political parties to engage in parliamentary debate, political negotiation and deliberation on matters of national importance.",

    agenda:
      "TO BE ANNOUNCED"
  },


  ipla: {
    code: "IPLA",
    number: "05",

    title:
      "INDIAN PREMIER<br>LEAGUE AUCTION",

    description:
      "The Indian Premier League Auction places participants in a high-pressure auction environment involving strategic bidding, team management, financial decisions and competition.",

    agenda:
      "TO BE ANNOUNCED"
  },


  unw: {
    code: "UNW",
    number: "06",

    title:
      "UN WOMEN",

    description:
      "UN Women works to advance gender equality and the empowerment of women and girls through international cooperation, policy development and multilateral action.",

    agenda:
      "TO BE ANNOUNCED"
  }

};



/* =========================================================
   COMMITTEE ROUTING
   ========================================================= */

function initialiseCommitteePage() {

  const listing =
    document.getElementById("committeesPage");

  const detail =
    document.getElementById("committeePage");


  /*
    If neither container exists, this page isn't
    the committees page.
  */

  if (!listing && !detail) {
    return;
  }


  const params =
    new URLSearchParams(
      window.location.search
    );


  const key =
    params.get("committee");


  /*
    NO COMMITTEE SELECTED
    ---------------------
    Show all committees.
  */

  if (!key) {

    if (listing) {
      listing.style.display = "block";
    }

    if (detail) {
      detail.style.display = "none";
      detail.innerHTML = "";
    }

    document.title =
      "Committees | RELMUN '26";

    return;
  }


  /*
    COMMITTEE SELECTED
    ------------------
    Show detail page.
  */

  const data =
    committeeData[key];


  /*
    Invalid committee
  */

  if (!data) {

    window.location.href =
      "committees.html";

    return;
  }


  if (listing) {
    listing.style.display = "none";
  }


  if (detail) {

    detail.style.display = "block";

    renderCommitteePage(
      detail,
      data
    );

  }

}



/* =========================================================
   RENDER INDIVIDUAL COMMITTEE
   ========================================================= */

function renderCommitteePage(
  target,
  data
) {

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

        <button
          class="btn btn-gold js-register"
          type="button"
        >
          DELEGATE REGISTRATION
          <span>↗</span>
        </button>


        <a
          class="btn btn-outline"
          href="committees.html"
        >
          ALL COMMITTEES
          <span>→</span>
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
        Delegate registrations for RELMUN '26
        are coming soon.
      </p>


      <button
        class="btn btn-gold big js-register"
        type="button"
      >
        REGISTRATIONS COMING SOON
        <span>↗</span>
      </button>

    </section>

  `;


  /*
    Registration buttons were created dynamically,
    so bind them after rendering.
  */

  bindRegistration();

}



/* =========================================================
   REGISTRATION MODAL
   ========================================================= */

function bindRegistration() {

  const modal =
    document.getElementById(
      "registrationModal"
    );


  if (!modal) {
    return;
  }


  document
    .querySelectorAll(".js-register")
    .forEach(button => {

      /*
        Prevent duplicate listeners
      */

      if (
        button.dataset.registrationBound === "true"
      ) {
        return;
      }


      button.dataset.registrationBound =
        "true";


      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          modal.classList.add(
            "open"
          );


          modal.setAttribute(
            "aria-hidden",
            "false"
          );


          document.body.classList.add(
            "modal-open"
          );

        }
      );

    });



  document
    .querySelectorAll(".js-close-modal")
    .forEach(button => {

      if (
        button.dataset.modalBound === "true"
      ) {
        return;
      }


      button.dataset.modalBound =
        "true";


      button.addEventListener(
        "click",
        closeRegistration
      );

    });

}



/* =========================================================
   CLOSE REGISTRATION
   ========================================================= */

function closeRegistration() {

  const modal =
    document.getElementById(
      "registrationModal"
    );


  if (!modal) {
    return;
  }


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

}



/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMenu() {

  const toggle =
    document.querySelector(
      ".menu-toggle"
    );


  const nav =
    document.querySelector(
      ".nav-links"
    );


  if (!toggle || !nav) {
    return;
  }


  if (
    toggle.dataset.menuBound === "true"
  ) {
    return;
  }


  toggle.dataset.menuBound =
    "true";


  toggle.addEventListener(
    "click",
    () => {

      const open =
        nav.classList.toggle(
          "open"
        );


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

          nav.classList.remove(
            "open"
          );

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}



/* =========================================================
   ESCAPE KEY
   ========================================================= */

function setupEscapeKey() {

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeRegistration();

        const nav =
          document.querySelector(
            ".nav-links"
          );


        const toggle =
          document.querySelector(
            ".menu-toggle"
          );


        if (nav) {
          nav.classList.remove(
            "open"
          );
        }


        if (toggle) {

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    }
  );

}



/* =========================================================
   START EVERYTHING
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initialiseCommitteePage();

    bindRegistration();

    setupMenu();

    setupEscapeKey();

  }
);
