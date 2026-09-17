/* =========================================================
   RELMUN '26 — MAIN SCRIPT
   ========================================================= */


/* =========================================================
   COMMITTEE DATA
   ========================================================= */

const committeeData = {

  unsc: {
    code: "UNSC",
    number: "01",
    title: "UNITED NATIONS<br>SECURITY COUNCIL",
    description:
      "The Security Council is the United Nations' principal body for addressing international peace and security. Delegates will engage in high-level diplomacy, negotiation and decision-making.",
    agenda: "TO BE ANNOUNCED"
  },

  unhrc: {
    code: "UNHRC",
    number: "02",
    title: "UNITED NATIONS<br>HUMAN RIGHTS COUNCIL",
    description:
      "The Human Rights Council addresses international human rights situations and promotes cooperation, dialogue and policy-focused multilateral action.",
    agenda: "TO BE ANNOUNCED"
  },

  unodc: {
    code: "UNODC",
    number: "03",
    title: "UNITED NATIONS OFFICE<br>ON DRUGS AND CRIME",
    description:
      "The United Nations Office on Drugs and Crime works around international cooperation against drugs, organised crime, corruption and related transnational challenges.",
    agenda: "TO BE ANNOUNCED"
  },

  aippm: {
    code: "AIPPM",
    number: "04",
    title: "ALL INDIA<br>POLITICAL PARTIES MEET",
    description:
      "AIPPM brings together representatives of India's political parties to engage in parliamentary debate, political negotiation and deliberation on matters of national importance.",
    agenda: "TO BE ANNOUNCED"
  },

  ipla: {
    code: "IPLA",
    number: "05",
    title: "INDIAN PREMIER<br>LEAGUE AUCTION",
    description:
      "The Indian Premier League Auction places participants in a high-pressure auction environment involving strategic bidding, team management, financial decisions and competition.",
    agenda: "TO BE ANNOUNCED"
  },

  unw: {
    code: "UNW",
    number: "06",
    title: "UN WOMEN",
    description:
      "UN Women works to advance gender equality and the empowerment of women and girls through international cooperation, policy development and multilateral action.",
    agenda: "TO BE ANNOUNCED"
  }

};


/* =========================================================
   GET CURRENT COMMITTEE
   ========================================================= */

function getCurrentCommittee() {

  const params = new URLSearchParams(window.location.search);

  let key = params.get("committee");

  /*
    Also support:
    committee.html#unsc
    committee.html#unhrc
  */

  if (!key && window.location.hash) {
    key = window.location.hash.replace("#", "");
  }

  if (!key) {
    key = "unsc";
  }

  key = key.toLowerCase().trim();

  return committeeData[key] || committeeData.unsc;
}


/* =========================================================
   RENDER COMMITTEE DETAIL PAGE
   ========================================================= */

function renderCommitteePage() {

  const target = document.getElementById("committeePage");

  /*
    IMPORTANT:
    If this element doesn't exist, we're NOT on a
    committee detail page.
  */

  if (!target) return;


  const data = getCurrentCommittee();


  document.title = `${data.code} | RELMUN '26`;


  target.innerHTML = `

    <!-- ================= HERO ================= -->

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
          class="btn btn-gold delegate-registration"
          type="button"
        >
          DELEGATE REGISTRATIONS COMING SOON
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


    <!-- ================= AGENDA ================= -->

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


    <!-- ================= BACKGROUND GUIDE ================= -->

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


    <!-- ================= EXECUTIVE BOARD ================= -->

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


    <!-- ================= CTA ================= -->

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
        will be opening soon.
      </p>

      <button
        class="btn btn-gold big delegate-registration"
        type="button"
      >
        DELEGATE REGISTRATIONS COMING SOON
      </button>

    </section>

  `;

}


/* =========================================================
   COMMITTEE "VIEW MORE" LINKS
   ========================================================= */

function setupCommitteeLinks() {

  /*
    This supports cards like:

    <a data-committee="unsc">VIEW MORE</a>

    So you don't have to manually build URLs.
  */

  document
    .querySelectorAll("[data-committee]")
    .forEach(link => {

      const committee = link
        .getAttribute("data-committee")
        ?.toLowerCase()
        .trim();

      if (!committee) return;

      if (!committeeData[committee]) return;

      link.href =
        `committee.html?committee=${committee}`;

    });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMenu() {

  const toggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector(".nav-links");


  if (!toggle || !nav) return;


  toggle.addEventListener("click", () => {

    const open =
      nav.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

  });


  nav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

}


/* =========================================================
   REGISTRATION BUTTON
   ========================================================= */

function setupRegistrationButtons() {

  document
    .querySelectorAll(".delegate-registration")
    .forEach(button => {

      button.addEventListener("click", () => {

        alert(
          "Delegate registrations for RELMUN '26 are coming soon. Stay tuned!"
        );

      });

    });

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

function setupEscapeKey() {

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    document
      .querySelectorAll(".modal.open")
      .forEach(modal => {

        modal.classList.remove("open");

        modal.setAttribute(
          "aria-hidden",
          "true"
        );

      });

    document.body.classList.remove("modal-open");

  });

}


/* =========================================================
   INITIALISE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderCommitteePage();

    setupCommitteeLinks();

    setupMenu();

    setupRegistrationButtons();

    setupEscapeKey();

  }
);
