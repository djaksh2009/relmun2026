/* =========================================
   RELMUN '26 CHATBOT
   ========================================= */

const relmunBot = {

  responses: {

    hello:
      "Hey! 👋 I'm the RELMUN '26 assistant. Ask me anything about the conference, committees, registration, or the Executive Board.",

    relmun:
      "RELMUN '26 — Relations, Engagement & Leadership Model United Nations — is an online MUN conference taking place on 26–27 December 2026.",

    date:
      "RELMUN '26 will take place on 26–27 December 2026.",

    format:
      "RELMUN '26 is a fully online conference.",

    registration:
      "Delegate registration opens on 1 October 2026. You can register through MyMUN or Gavelling.",

    cost:
      "RELMUN '26 is completely free to register for and participate in.",

    committees:
      "RELMUN '26 currently has six committees: UNSC, UNHRC, UNODC, AIPPM, IPLA and UN Women.",

    unsc:
      "UNSC — United Nations Security Council. Delegates will engage in diplomacy, negotiation and decision-making on matters concerning international peace and security.",

    unhrc:
      "UNHRC — United Nations Human Rights Council. The committee focuses on international human rights, cooperation and multilateral action.",

    unodc:
      "UNODC — United Nations Office on Drugs and Crime. The committee focuses on international cooperation against drugs, organised crime, corruption and related transnational challenges.",

    aippm:
      "AIPPM — All India Political Parties Meet. Delegates participate in parliamentary debate, political negotiation and deliberation on matters of national importance.",

    ipla:
      "IPLA — Indian Premier League Auction. Participants take part in strategic bidding, team management, financial decisions and competition in an IPL auction environment.",

    unw:
      "UNW — UN Women. The committee focuses on advancing gender equality and the empowerment of women and girls through international cooperation, policy development and multilateral action.",

    eb:
      "The Executive Board consists of the chairs, vice chairs and moderators responsible for guiding the committees. EB applications may be announced separately by the organising team.",

    certificates:
      "Certificates will be provided to participants.",

    online:
      "Yes. RELMUN '26 is entirely online.",

    mymun:
      "You can register through MyMUN once delegate registrations open on 1 October 2026.",

    gavelling:
      "You can also register through Gavelling once delegate registrations open on 1 October 2026.",

    help:
      "You can ask me about registration, dates, committees, UNW, UNSC, UNHRC, UNODC, AIPPM, IPLA, certificates, or the conference format."

  },


  findAnswer(message) {

    const text =
      message
        .toLowerCase()
        .trim();


    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return this.responses.hello;
    }


    if (
      text.includes("what is relmun") ||
      text.includes("about relmun") ||
      text.includes("relmun")
    ) {
      return this.responses.relmun;
    }


    if (
      text.includes("when") &&
      (
        text.includes("date") ||
        text.includes("conference") ||
        text.includes("happen") ||
        text.includes("held")
      )
    ) {
      return this.responses.date;
    }


    if (
      text.includes("online") ||
      text.includes("offline") ||
      text.includes("format")
    ) {
      return this.responses.format;
    }


    if (
      text.includes("register") ||
      text.includes("registration") ||
      text.includes("how do i join") ||
      text.includes("how to join")
    ) {
      return this.responses.registration;
    }


    if (
      text.includes("free") ||
      text.includes("cost") ||
      text.includes("fee") ||
      text.includes("price")
    ) {
      return this.responses.cost;
    }


    if (
      text.includes("committee") ||
      text.includes("committees")
    ) {
      return this.responses.committees;
    }


    if (
      text.includes("unsc") ||
      text.includes("security council")
    ) {
      return this.responses.unsc;
    }


    if (
      text.includes("unhrc") ||
      text.includes("human rights council")
    ) {
      return this.responses.unhrc;
    }


    if (
      text.includes("unodc") ||
      text.includes("drugs and crime")
    ) {
      return this.responses.unodc;
    }


    if (
      text.includes("aippm") ||
      text.includes("political parties")
    ) {
      return this.responses.aippm;
    }


    if (
      text.includes("ipla") ||
      text.includes("ipl auction") ||
      text.includes("ipl auction")
    ) {
      return this.responses.ipla;
    }


    if (
      text.includes("unw") ||
      text.includes("un women")
    ) {
      return this.responses.unw;
    }


    if (
      text.includes("eb") ||
      text.includes("executive board") ||
      text.includes("chair") ||
      text.includes("vice chair")
    ) {
      return this.responses.eb;
    }


    if (
      text.includes("certificate") ||
      text.includes("certificates")
    ) {
      return this.responses.certificates;
    }


    if (
      text.includes("mymun")
    ) {
      return this.responses.mymun;
    }


    if (
      text.includes("gavelling")
    ) {
      return this.responses.gavelling;
    }


    if (
      text.includes("help") ||
      text.includes("what can you do")
    ) {
      return this.responses.help;
    }


    return (
      "I'm not sure about that yet. Try asking me about RELMUN, registration, committees, UNW, UNSC, UNHRC, UNODC, AIPPM, IPLA, the EB, dates, or certificates."
    );

  }

};



/* =========================================
   CHATBOT UI
   ========================================= */

function createRelmunChatbot() {

  const container =
    document.getElementById("relmun-chatbot");

  if (!container) return;


  container.innerHTML = `

    <button
      class="relmun-chat-button"
      id="relmunChatButton"
      aria-label="Open RELMUN chatbot"
    >
      <span class="chat-icon">✦</span>
      <span>ASK RELMUN</span>
    </button>


    <div
      class="relmun-chat-window"
      id="relmunChatWindow"
      aria-hidden="true"
    >

      <div class="relmun-chat-header">

        <div>

          <small>
            RELMUN '26
          </small>

          <strong>
            RELMUN ASSISTANT
          </strong>

        </div>


        <button
          id="relmunChatClose"
          aria-label="Close chatbot"
        >
          ×
        </button>

      </div>


      <div
        class="relmun-chat-messages"
        id="relmunChatMessages"
      >

        <div class="relmun-message bot">

          <span class="message-label">
            RELMUN AI
          </span>

          <p>
            Hey! 👋 I'm the RELMUN '26 assistant.
            Ask me anything about the conference,
            committees or registration.
          </p>

        </div>

      </div>


      <div class="relmun-chat-suggestions">

        <button data-question="When is RELMUN?">
          DATE
        </button>

        <button data-question="How do I register?">
          REGISTER
        </button>

        <button data-question="What committees are there?">
          COMMITTEES
        </button>

      </div>


      <form
        class="relmun-chat-input"
        id="relmunChatForm"
      >

        <input
          type="text"
          id="relmunChatInput"
          placeholder="Ask RELMUN..."
          autocomplete="off"
        >

        <button
          type="submit"
          aria-label="Send message"
        >
          →
        </button>

      </form>

    </div>

  `;


  setupRelmunChatbot();

}



/* =========================================
   CHATBOT FUNCTIONALITY
   ========================================= */

function setupRelmunChatbot() {

  const button =
    document.getElementById("relmunChatButton");

  const windowBox =
    document.getElementById("relmunChatWindow");

  const close =
    document.getElementById("relmunChatClose");

  const form =
    document.getElementById("relmunChatForm");

  const input =
    document.getElementById("relmunChatInput");

  const messages =
    document.getElementById("relmunChatMessages");


  if (
    !button ||
    !windowBox ||
    !close ||
    !form ||
    !input ||
    !messages
  ) {
    return;
  }


  button.addEventListener(
    "click",
    () => {

      windowBox.classList.add("open");

      windowBox.setAttribute(
        "aria-hidden",
        "false"
      );

      setTimeout(
        () => input.focus(),
        150
      );

    }
  );


  close.addEventListener(
    "click",
    () => {

      windowBox.classList.remove("open");

      windowBox.setAttribute(
        "aria-hidden",
        "true"
      );

    }
  );


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const question =
        input.value.trim();


      if (!question) return;


      addChatMessage(
        question,
        "user"
      );


      input.value = "";


      const typing =
        addTypingMessage();


      setTimeout(
        () => {

          typing.remove();


          const answer =
            relmunBot.findAnswer(question);


          addChatMessage(
            answer,
            "bot"
          );

        },
        500
      );

    }
  );


  document
    .querySelectorAll(
      ".relmun-chat-suggestions button"
    )
    .forEach(suggestion => {

      suggestion.addEventListener(
        "click",
        () => {

          const question =
            suggestion.dataset.question;


          addChatMessage(
            question,
            "user"
          );


          const typing =
            addTypingMessage();


          setTimeout(
            () => {

              typing.remove();


              const answer =
                relmunBot.findAnswer(question);


              addChatMessage(
                answer,
                "bot"
              );

            },
            500
          );

        }
      );

    });


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        windowBox.classList.contains("open")
      ) {

        windowBox.classList.remove(
          "open"
        );

        windowBox.setAttribute(
          "aria-hidden",
          "true"
        );

      }

    }
  );

}



/* =========================================
   MESSAGE FUNCTIONS
   ========================================= */

function addChatMessage(
  message,
  type
) {

  const messages =
    document.getElementById(
      "relmunChatMessages"
    );


  if (!messages) return;


  const wrapper =
    document.createElement("div");


  wrapper.className =
    `relmun-message ${type}`;


  if (type === "bot") {

    wrapper.innerHTML = `

      <span class="message-label">
        RELMUN AI
      </span>

      <p>
        ${escapeHtml(message)}
      </p>

    `;

  } else {

    wrapper.innerHTML = `

      <p>
        ${escapeHtml(message)}
      </p>

    `;

  }


  messages.appendChild(
    wrapper
  );


  messages.scrollTop =
    messages.scrollHeight;

}



/* =========================================
   TYPING INDICATOR
   ========================================= */

function addTypingMessage() {

  const messages =
    document.getElementById(
      "relmunChatMessages"
    );


  const typing =
    document.createElement("div");


  typing.className =
    "relmun-message bot typing";


  typing.innerHTML = `

    <span class="message-label">
      RELMUN AI
    </span>

    <p>
      <span></span>
      <span></span>
      <span></span>
    </p>

  `;


  messages.appendChild(
    typing
  );


  messages.scrollTop =
    messages.scrollHeight;


  return typing;

}



/* =========================================
   SECURITY
   ========================================= */

function escapeHtml(text) {

  const div =
    document.createElement("div");


  div.textContent =
    text;


  return div.innerHTML;

}



/* =========================================
   START
   ========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    createRelmunChatbot();

  }
);
