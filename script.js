/* =========================================================
   RELMUN '26
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   HOMEPAGE REGISTRATION
   ========================================================= */

const homeRegisterButton =
  document.getElementById("homeRegisterButton");

const bottomRegisterButton =
  document.getElementById("bottomRegisterButton");

const homeRegistrationModal =
  document.getElementById("homeRegistrationModal");

const homeRegistrationClose =
  document.getElementById("homeRegistrationClose");

const homeRegistrationOverlay =
  document.getElementById("homeRegistrationOverlay");


function openHomeRegistration() {

  if (!homeRegistrationModal) return;

  homeRegistrationModal.classList.add("open");

  document.body.style.overflow = "hidden";
}


function closeHomeRegistration() {

  if (!homeRegistrationModal) return;

  homeRegistrationModal.classList.remove("open");

  document.body.style.overflow = "";
}


if (homeRegisterButton) {

  homeRegisterButton.addEventListener(
    "click",
    openHomeRegistration
  );

}


if (bottomRegisterButton) {

  bottomRegisterButton.addEventListener(
    "click",
    openHomeRegistration
  );

}


if (homeRegistrationClose) {

  homeRegistrationClose.addEventListener(
    "click",
    closeHomeRegistration
  );

}


if (homeRegistrationOverlay) {

  homeRegistrationOverlay.addEventListener(
    "click",
    closeHomeRegistration
  );

}


/* =========================================================
   COMMITTEE DATA
   ========================================================= */

const committees = {

  unsc: {

    code: "UNSC",

    title:
      "UNITED NATIONS<br>SECURITY COUNCIL",

    description:
      "International peace and security, diplomacy, negotiation and high-level decision-making.",

    agendaDescription:
      "The UNSC agenda will be announced once the committee's academic material has been finalised.",

    agendaOne:
      "Agenda To Be Announced",

    agendaTwo:
      "Agenda To Be Announced"

  },


  unhrc: {

    code: "UNHRC",

    title:
      "UNITED NATIONS<br>HUMAN RIGHTS COUNCIL",

    description:
      "International human rights, cooperation and policy-focused multilateral debate.",

    agendaDescription:
      "The UNHRC agenda will be announced once the committee's academic material has been finalised.",

    agendaOne:
      "Agenda To Be Announced",

    agendaTwo:
      "Agenda To Be Announced"

  },


  unodc: {

    code: "UNODC",

    title:
      "UNITED NATIONS OFFICE<br>ON DRUGS AND CRIME",

    description:
      "International cooperation against drugs, organised crime and related challenges.",

    agendaDescription:
      "The UNODC agenda will be announced once the committee's academic material has been finalised.",

    agendaOne:
      "Agenda To Be Announced",

    agendaTwo:
      "Agenda To Be Announced"

  }

};


/* =========================================================
   COMMITTEE DETAIL PAGE
   ========================================================= */

const params =
  new URLSearchParams(window.location.search);

const selectedCommittee =
  params.get("committee");


const committeeData =
  committees[selectedCommittee];


if (committeeData) {

  const committeeCode =
    document.getElementById("committeeCode");

  const committeeTitle =
    document.getElementById("committeeTitle");

  const committeeDescription =
    document.getElementById("committeeDescription");

  const committeeMeta =
    document.getElementById("committeeMeta");

  const agendaDescription =
    document.getElementById("agendaDescription");

  const agendaOne =
    document.getElementById("agendaOne");

  const agendaTwo =
    document.getElementById("agendaTwo");

  const modalCommittee =
    document.getElementById("modalCommittee");


  if (committeeCode) {

    committeeCode.textContent =
      committeeData.code;

  }


  if (committeeTitle) {

    committeeTitle.innerHTML =
      committeeData.title;

  }


  if (committeeDescription) {

    committeeDescription.textContent =
      committeeData.description;

  }


  if (committeeMeta) {

    committeeMeta.textContent =
      committeeData.code;

  }


  if (agendaDescription) {

    agendaDescription.textContent =
      committeeData.agendaDescription;

  }


  if (agendaOne) {

    agendaOne.textContent =
      committeeData.agendaOne;

  }


  if (agendaTwo) {

    agendaTwo.textContent =
      committeeData.agendaTwo;

  }


  if (modalCommittee) {

    modalCommittee.textContent =
      committeeData.code;

  }


  document.title =
    committeeData.code +
    " | RELMUN '26";

}


/* =========================================================
   COMMITTEE REGISTRATION MODAL
   ========================================================= */

const detailRegisterButton =
  document.getElementById(
    "detailRegisterButton"
  );


const detailRegisterButtonBottom =
  document.getElementById(
    "detailRegisterButtonBottom"
  );


const detailRegistrationModal =
  document.getElementById(
    "detailRegistrationModal"
  );


const detailRegistrationClose =
  document.getElementById(
    "detailRegistrationClose"
  );


const detailRegistrationOverlay =
  document.getElementById(
    "detailRegistrationOverlay"
  );


function openDetailRegistration() {

  if (!detailRegistrationModal) return;

  detailRegistrationModal.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeDetailRegistration() {

  if (!detailRegistrationModal) return;

  detailRegistrationModal.classList.remove("open");

  document.body.style.overflow = "";

}


if (detailRegisterButton) {

  detailRegisterButton.addEventListener(
    "click",
    openDetailRegistration
  );

}


if (detailRegisterButtonBottom) {

  detailRegisterButtonBottom.addEventListener(
    "click",
    openDetailRegistration
  );

}


if (detailRegistrationClose) {

  detailRegistrationClose.addEventListener(
    "click",
    closeDetailRegistration
  );

}


if (detailRegistrationOverlay) {

  detailRegistrationOverlay.addEventListener(
    "click",
    closeDetailRegistration
  );

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key !== "Escape") return;


    if (
      homeRegistrationModal &&
      homeRegistrationModal.classList.contains("open")
    ) {

      closeHomeRegistration();

    }


    if (
      detailRegistrationModal &&
      detailRegistrationModal.classList.contains("open")
    ) {

      closeDetailRegistration();

    }

  }
);
