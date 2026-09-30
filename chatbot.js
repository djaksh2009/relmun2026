/* =========================================================
   RELMUN '26 — REX
   Official Conference Assistant
   ========================================================= */

(() => {
  "use strict";

  const root = document.getElementById("relmun-chatbot");

  if (!root) {
    console.warn("REX: #relmun-chatbot was not found.");
    return;
  }

  /* =========================================================
     RELMUN KNOWLEDGE BASE
     ========================================================= */

  const RELMUN = {
    name: "RELMUN '26",

    fullName: "Regional Engagement & Leadership Model United Nations",

    dates: "26–27 December 2026",

    format: "Online",

    registrationDate: "9 October 2026",

    registrationFee: "₹200 per delegate",

    instagram: "@relmun.official",

    email: "akshithkabilan@gmail.com",

    committees: [
      {
        short: "UNSC",
        name: "United Nations Security Council"
      },
      {
        short: "UNHRC",
        name: "United Nations Human Rights Council"
      },
      {
        short: "UNODC",
        name: "United Nations Office on Drugs and Crime"
      },
      {
        short: "AIPPM",
        name: "All India Political Parties Meet"
      },
      {
        short: "UN Women",
        name: "United Nations Women"
      },
      {
        short: "IPLA",
        name: "International Parliamentary Law Assembly"
      }
    ],

    team: {
      core: [
        "Akshith Kabilan — Secretary-General",
        "S. Shreyaas — Deputy Secretary-General",
        "Laasya Vikram — Director-General",
        "Aashi Kushwaha — Chief Advisor"
      ],

      secretariat: [
        "Abimayur R — Head of Administration & Outreach",
        "Madhav Bhardwaj — USG, Delegate Affairs"
      ]
    }
  };


  /* =========================================================
     STYLES
     ========================================================= */

  const style = document.createElement("style");

  style.textContent = `
    #rex-widget {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 99999;
      font-family: Arial, Helvetica, sans-serif;
    }

    #rex-toggle {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: 1px solid rgba(241,236,224,.45);
      background: #080808;
      color: #f1ece0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 35px rgba(24,70,255,.16);
      transition:
        transform .3s ease,
        border-color .3s ease,
        box-shadow .3s ease;
    }

    #rex-toggle:hover {
      transform: scale(1.07);
      border-color: #1846ff;
      box-shadow: 0 0 40px rgba(24,70,255,.3);
    }

    #rex-dot {
      width: 8px;
      height: 8px;
      background: #f1ece0;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(241,236,224,.7);
    }

    #rex-window {
      position: absolute;
      right: 0;
      bottom: 72px;
      width: 365px;
      max-width: calc(100vw - 30px);
      height: 520px;
      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(24,70,255,.12),
          transparent 35%
        ),
        #080808;
      border: 1px solid rgba(241,236,224,.18);
      overflow: hidden;
      display: none;
      flex-direction: column;
      box-shadow:
        0 25px 80px rgba(0,0,0,.55),
        0 0 60px rgba(24,70,255,.08);
      animation: rexIn .35s cubic-bezier(.2,.8,.2,1);
    }

    #rex-window.open {
      display: flex;
    }

    @keyframes rexIn {
      from {
        opacity: 0;
        transform: translateY(18px) scale(.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    #rex-header {
      min-height: 68px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(241,236,224,.12);
      background: rgba(8,8,8,.92);
    }

    .rex-brand {
      display: flex;
      align-items: center;
      gap: 11px;
    }

    .rex-orb {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid rgba(24,70,255,.8);
      position: relative;
      box-shadow: 0 0 18px rgba(24,70,255,.22);
    }

    .rex-orb::after {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #1846ff;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 12px #1846ff;
    }

    .rex-title {
      color: #f1ece0;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: .18em;
    }

    .rex-subtitle {
      color: rgba(241,236,224,.45);
      font-size: 9px;
      letter-spacing: .12em;
      margin-top: 3px;
    }

    #rex-close {
      border: 0;
      background: transparent;
      color: rgba(241,236,224,.65);
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
    }

    #rex-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scrollbar-width: thin;
      scrollbar-color: rgba(241,236,224,.25) transparent;
    }

    .rex-message {
      max-width: 88%;
      padding: 13px 15px;
      font-size: 13px;
      line-height: 1.65;
      animation: messageIn .25s ease;
      white-space: pre-line;
    }

    @keyframes messageIn {
      from {
        opacity: 0;
        transform: translateY(7px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .rex-bot {
      align-self: flex-start;
      color: #f1ece0;
      background: rgba(241,236,224,.045);
      border: 1px solid rgba(241,236,224,.1);
    }

    .rex-user {
      align-self: flex-end;
      color: #fff;
      background: #1846ff;
    }

    .rex-time {
      display: block;
      margin-top: 7px;
      font-size: 8px;
      letter-spacing: .1em;
      opacity: .35;
    }

    #rex-suggestions {
      padding: 0 15px 10px;
      display: flex;
      gap: 7px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    #rex-suggestions::-webkit-scrollbar {
      display: none;
    }

    .rex-suggestion {
      flex: 0 0 auto;
      padding: 8px 11px;
      border: 1px solid rgba(241,236,224,.16);
      background: transparent;
      color: rgba(241,236,224,.75);
      font-size: 9px;
      letter-spacing: .05em;
      cursor: pointer;
      transition: .2s ease;
    }

    .rex-suggestion:hover {
      border-color: #1846ff;
      color: #fff;
    }

    #rex-form {
      display: flex;
      border-top: 1px solid rgba(241,236,224,.12);
      background: #080808;
    }

    #rex-input {
      flex: 1;
      min-width: 0;
      padding: 17px 15px;
      border: 0;
      outline: none;
      background: transparent;
      color: #f1ece0;
      font-size: 13px;
      font-family: inherit;
    }

    #rex-input::placeholder {
      color: rgba(241,236,224,.35);
    }

    #rex-send {
      width: 58px;
      border: 0;
      border-left: 1px solid rgba(241,236,224,.1);
      background: transparent;
      color: #f1ece0;
      cursor: pointer;
      font-size: 16px;
      transition: .2s ease;
    }

    #rex-send:hover {
      background: #1846ff;
    }

    @media (max-width: 600px) {
      #rex-widget {
        right: 14px;
        bottom: 14px;
      }

      #rex-window {
        width: calc(100vw - 28px);
        right: -1px;
        height: min(600px, calc(100vh - 105px));
      }
    }
  `;

  document.head.appendChild(style);


  /* =========================================================
     BUILD UI
     ========================================================= */

  root.innerHTML = `
    <div id="rex-widget">

      <div id="rex-window">

        <div id="rex-header">
          <div class="rex-brand">
            <div class="rex-orb"></div>
            <div>
              <div class="rex-title">REX</div>
              <div class="rex-subtitle">RELMUN '26 ASSISTANT</div>
            </div>
          </div>

          <button id="rex-close" aria-label="Close REX">×</button>
        </div>

        <div id="rex-messages"></div>

        <div id="rex-suggestions">
          <button class="rex-suggestion" data-question="Tell me about RELMUN">ABOUT RELMUN</button>
          <button class="rex-suggestion" data-question="What committees are there?">COMMITTEES</button>
          <button class="rex-suggestion" data-question="How much is registration?">REGISTRATION</button>
          <button class="rex-suggestion" data-question="Who is on the team?">TEAM</button>
        </div>

        <form id="rex-form">
          <input
            id="rex-input"
            type="text"
            autocomplete="off"
            placeholder="Ask REX anything..."
          >
          <button id="rex-send" type="submit">↗</button>
        </form>

      </div>

      <button id="rex-toggle" aria-label="Open REX">
        <span id="rex-dot"></span>
      </button>

    </div>
  `;


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const windowEl = document.getElementById("rex-window");
  const toggle = document.getElementById("rex-toggle");
  const close = document.getElementById("rex-close");
  const messages = document.getElementById("rex-messages");
  const form = document.getElementById("rex-form");
  const input = document.getElementById("rex-input");


  /* =========================================================
     HELPERS
     ========================================================= */

  function addMessage(text, type = "bot") {
    const message = document.createElement("div");

    message.className =
      `rex-message ${type === "user" ? "rex-user" : "rex-bot"}`;

    message.textContent = text;

    const time = document.createElement("span");
    time.className = "rex-time";

    const now = new Date();

    time.textContent =
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

    message.appendChild(time);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
  }


  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^\w\s₹]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  /* =========================================================
     REX RESPONSE ENGINE
     ========================================================= */

  function getResponse(raw) {

    const q = normalize(raw);

    /* ABOUT */

    if (
      q.includes("tell me about relmun") ||
      q === "relmun" ||
      q.includes("what is relmun") ||
      q.includes("about relmun") ||
      q.includes("what is this conference") ||
      q.includes("what is the conference")
    ) {
      return `RELMUN '26 is an online Model United Nations conference focused on diplomacy, debate, engagement and leadership.

📅 26–27 December 2026
🌐 Online Conference
💰 ₹200 per delegate
📝 Registrations open 9 October 2026

RELMUN features six committees: UNSC, UNHRC, UNODC, AIPPM, UN Women and IPLA.

Follow @relmun.official for official announcements.`;
    }


    /* DATE */

    if (
      q.includes("when is relmun") ||
      q.includes("relmun date") ||
      q.includes("conference date") ||
      q.includes("when does relmun")
    ) {
      return `RELMUN '26 takes place on 26–27 December 2026.

The conference will be conducted online.`;
    }


    /* FORMAT */

    if (
      q.includes("online") ||
      q.includes("offline") ||
      q.includes("format")
    ) {
      return `RELMUN '26 is an online Model United Nations conference.

📅 26–27 December 2026`;
    }


    /* REGISTRATION */

    if (
      q.includes("registration") ||
      q.includes("register") ||
      q.includes("fee") ||
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("₹200") ||
      q.includes("200")
    ) {
      return `Delegate registrations for RELMUN '26 open on 9 October 2026.

💰 Registration fee: ₹200 per delegate.

The official registration platforms will be announced by the RELMUN team.`;
    }


    /* COMMITTEES */

    if (
      q.includes("committee") ||
      q.includes("committees") ||
      q.includes("council")
    ) {
      return `RELMUN '26 has six committees:

1. UNSC — United Nations Security Council
2. UNHRC — United Nations Human Rights Council
3. UNODC — United Nations Office on Drugs and Crime
4. AIPPM — All India Political Parties Meet
5. UN Women
6. IPLA — International Parliamentary Law Assembly`;
    }


    /* TEAM */

    if (
      q.includes("team") ||
      q.includes("secretariat") ||
      q.includes("core") ||
      q.includes("organising") ||
      q.includes("organizing")
    ) {
      return `The RELMUN '26 team is divided into the Core and Secretariat.

CORE
• Akshith Kabilan — Secretary-General
• S. Shreyaas — Deputy Secretary-General
• Laasya Vikram — Director-General
• Aashi Kushwaha — Chief Advisor

SECRETARIAT
• Abimayur R — Head of Administration & Outreach
• Madhav Bhardwaj — USG, Delegate Affairs`;
    }


    /* SECRETARY-GENERAL */

    if (
      q.includes("secretary general") ||
      q.includes("sg") ||
      q.includes("who runs relmun")
    ) {
      return `Akshith Kabilan is the Secretary-General of RELMUN '26.`;
    }


    /* CERTIFICATES */

    if (
      q.includes("certificate") ||
      q.includes("certificates")
    ) {
      return `Yes. Certificates are provided to participants of RELMUN '26.`;
    }


    /* CONTACT */

    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("instagram") ||
      q.includes("insta")
    ) {
      return `You can contact the RELMUN Secretariat at:

📧 akshithkabilan@gmail.com
📱 Instagram: @relmun.official`;
    }


    /* MUN */

    if (
      q.includes("mun") ||
      q.includes("model united nations") ||
      q.includes("delegate") ||
      q.includes("mun flow")
    ) {
      return `RELMUN '26 is a Model United Nations conference where delegates participate in committee-based diplomatic debate.

The six committees are UNSC, UNHRC, UNODC, AIPPM, UN Women and IPLA.

Ask me about a specific committee or about registration if you want more information.`;
    }


    /* GREETINGS */

    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q === "hii" ||
      q === "heyy"
    ) {
      return `Hey! I'm REX, the official RELMUN '26 assistant.

Ask me anything about the conference, committees, registration, team, dates or MUN.`;
    }


    /* THANKS */

    if (
      q.includes("thank") ||
      q === "thanks"
    ) {
      return `You're welcome! If you need anything else about RELMUN '26, just ask.`;
    }


    /* UNKNOWN */

    return `I don't have an official answer for that yet.

I can help with:

• RELMUN '26
• Conference dates
• Registration & ₹200 fee
• Committees
• Core & Secretariat
• Certificates
• MUN procedures
• Contact information

Ask me something about RELMUN and I'll help.`;
  }


  /* =========================================================
     WELCOME MESSAGE
     ========================================================= */

  addMessage(
`I’m REX — the official AI assistant for RELMUN ’26.

RELMUN ’26 is an online Model United Nations conference taking place on 26–27 December 2026.

Ask me about the conference, committees, registration, team, dates, certificates or MUN.`,
    "bot"
  );


  /* =========================================================
     OPEN / CLOSE
     ========================================================= */

  toggle.addEventListener("click", () => {
    windowEl.classList.toggle("open");

    if (windowEl.classList.contains("open")) {
      setTimeout(() => input.focus(), 150);
    }
  });

  close.addEventListener("click", () => {
    windowEl.classList.remove("open");
  });


  /* =========================================================
     SEND MESSAGE
     ========================================================= */

  function sendMessage(text) {

    text = text.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(() => {
      const response = getResponse(text);
      addMessage(response, "bot");
    }, 300);
  }


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(input.value);
  });


  /* =========================================================
     SUGGESTION BUTTONS
     ========================================================= */

  document.querySelectorAll(".rex-suggestion").forEach(button => {

    button.addEventListener("click", () => {

      const question = button.dataset.question;

      if (!question) return;

      sendMessage(question);
    });

  });

})();
