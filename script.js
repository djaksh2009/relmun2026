document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------
     MOBILE / NAV
  -------------------------------- */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }

  });


  /* --------------------------------
     FAQ
  -------------------------------- */

  document.querySelectorAll(".faq-question").forEach(button => {

    button.addEventListener("click", () => {

      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");

      document.querySelectorAll(".faq-item.open").forEach(openItem => {

        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }

      });

      item.classList.toggle("open");

      if (item.classList.contains("open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }

    });

  });


  /* --------------------------------
     REGISTRATION DATE
  -------------------------------- */

  const registrationLocked =
    document.getElementById("registrationLocked");

  const registrationForm =
    document.getElementById("registrationForm");

  const daysEl =
    document.getElementById("days");

  const hoursEl =
    document.getElementById("hours");

  const minutesEl =
    document.getElementById("minutes");

  const secondsEl =
    document.getElementById("seconds");


  /*
    Registration officially opens:
    October 1, 2026 at 00:00 IST.

    The date is evaluated in the browser.
  */

  const openingDate =
    new Date("2026-10-01T00:00:00+05:30");


  function updateRegistrationStatus() {

    const now = new Date();
    const difference = openingDate - now;

    if (difference <= 0) {

      if (registrationLocked) {
        registrationLocked.style.display = "none";
      }

      if (registrationForm) {
        registrationForm.style.display = "block";
      }

      return;

    }


    if (!registrationLocked) {
      return;
    }


    const totalSeconds =
      Math.floor(difference / 1000);

    const days =
      Math.floor(totalSeconds / 86400);

    const hours =
      Math.floor((totalSeconds % 86400) / 3600);

    const minutes =
      Math.floor((totalSeconds % 3600) / 60);

    const seconds =
      totalSeconds % 60;


    if (daysEl) {
      daysEl.textContent =
        String(days).padStart(2, "0");
    }

    if (hoursEl) {
      hoursEl.textContent =
        String(hours).padStart(2, "0");
    }

    if (minutesEl) {
      minutesEl.textContent =
        String(minutes).padStart(2, "0");
    }

    if (secondsEl) {
      secondsEl.textContent =
        String(seconds).padStart(2, "0");
    }

  }


  if (registrationLocked || registrationForm) {

    updateRegistrationStatus();

    setInterval(
      updateRegistrationStatus,
      1000
    );

  }


  /* --------------------------------
     REGISTRATION FORM
  -------------------------------- */

  const form =
    document.getElementById("registrationForm");

  const message =
    document.getElementById("formMessage");


  /*
    Google Apps Script Web App endpoint.
  */

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzZdzXXrt20_x-9NcLAIDmeqo45e9FUzfhNsXKX__uvuZb_CAkfPgLOSz_AUNSeNjtUYw/exec";


  if (form) {

    form.addEventListener("submit", async (event) => {

      event.preventDefault();


      /*
        Extra client-side date protection.
        Even if someone manually changes the HTML,
        the form will not submit before October 1.
      */

      if (new Date() < openingDate) {

        showMessage(
          "Registrations are not open yet. They open on 1 October 2026.",
          "error"
        );

        return;

      }


      const submitButton =
        form.querySelector("button[type='submit']");

      submitButton.disabled = true;

      submitButton.innerHTML =
        "Submitting...";


      const formData =
        new FormData(form);

      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });


      try {

        const response =
          await fetch(
            SCRIPT_URL,
            {
              method: "POST",
              headers: {
                "Content-Type": "text/plain;charset=utf-8"
              },
              body: JSON.stringify(data)
            }
          );


        const result =
          await response.json();


        if (result.success) {

          showMessage(
            "Registration submitted successfully. Welcome to RELMUN '26.",
            "success"
          );

          form.reset();

        } else {

          throw new Error(
            result.error ||
            "Registration could not be submitted."
          );

        }


      } catch (error) {

        console.error(error);

        showMessage(
          "Something went wrong while submitting your registration. Please try again.",
          "error"
        );

      } finally {

        submitButton.disabled = false;

        submitButton.innerHTML =
          "Submit Registration <span>↗</span>";

      }

    });

  }


  function showMessage(text, type) {

    if (!message) {
      return;
    }

    message.textContent = text;

    message.className =
      "form-message " + type;

  }


  /* --------------------------------
     COMMITTEE DETAIL PAGE
  -------------------------------- */

  const committeeTitle =
    document.getElementById("committeeTitle");

  if (committeeTitle) {

    const params =
      new URLSearchParams(window.location.search);

    const committee =
      params.get("committee");


    const committeeData = {

      unsc: {
        code: "01 · UNITED NATIONS SECURITY COUNCIL",
        title: "UNSC",
        description:
          "A forum focused on international peace and security, where delegates navigate complex geopolitical situations through negotiation and diplomacy.",
        agenda:
          "Addressing the Escalating Crisis in the Strait of Hormuz and Its Implications for International Peace and Security"
      },

      unhrc: {
        code: "02 · UNITED NATIONS HUMAN RIGHTS COUNCIL",
        title: "UNHRC",
        description:
          "A committee centred on international human rights, accountability and the protection of fundamental freedoms.",
        agenda:
          "Agenda to be announced"
      },

      unodc: {
        code: "03 · UNITED NATIONS OFFICE ON DRUGS AND CRIME",
        title: "UNODC",
        description:
          "A committee examining international cooperation against transnational crime, illicit trafficking and related challenges.",
        agenda:
          "Agenda to be announced"
      }

    };


    const data =
      committeeData[committee] ||
      committeeData.unsc;


    const code =
      document.getElementById("committeeCode");

    const description =
      document.getElementById("committeeDescription");

    const agenda =
      document.getElementById("committeeAgenda");


    committeeTitle.textContent =
      data.title;

    if (code) {
      code.textContent =
        data.code;
    }

    if (description) {
      description.textContent =
        data.description;
    }

    if (agenda) {
      agenda.textContent =
        data.agenda;
    }

  }

});
