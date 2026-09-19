(() => {
  "use strict";

  const root = document.getElementById("relmun-chatbot");
  if (!root) return;

  /* =========================================================
     REX — RELMUN 2026 INFORMATION ASSISTANT
     Self-contained styles so global website CSS cannot break it.
  ========================================================= */

  root.innerHTML = `
    <button
      type="button"
      id="rexOpen"
      class="rex-launcher"
      aria-label="Open REX information assistant"
      aria-expanded="false"
    >
      <span class="rex-launcher-star">✦</span>
      <span>REX</span>
    </button>

    <section
      id="rexWindow"
      class="rex-window"
      aria-hidden="true"
      aria-label="REX information assistant"
    >

      <div class="rex-header">
        <div class="rex-brand">
          <div class="rex-brand-main">
            <span class="rex-dot"></span>
            <strong>REX</strong>
          </div>

          <div class="rex-brand-sub">
            RELMUN 2026 INFORMATION ASSISTANT
          </div>
        </div>

        <button
          type="button"
          id="rexClose"
          class="rex-close"
          aria-label="Close REX"
        >
          ×
        </button>
      </div>

      <div class="rex-intro">
        <div class="rex-intro-number">01 / REX</div>

        <h2>
          Your questions.<br>
          <em>Answered.</em>
        </h2>

        <p>
          Hi. I'm REX, RELMUN 2026's information assistant.
          Ask me about the conference, committees, registration,
          the team, or officially announced information.
        </p>
      </div>

      <div
        id="rexMessages"
        class="rex-messages"
        aria-live="polite"
      >
        <div class="rex-message rex-bot">
          <div class="rex-message-label">REX</div>
          <div class="rex-message-text">
            How can I help you with RELMUN 2026?
          </div>
        </div>
      </div>

      <form id="rexForm" class="rex-form">
        <input
          id="rexInput"
          type="text"
          autocomplete="off"
          maxlength="1000"
          placeholder="Ask about RELMUN..."
          aria-label="Ask REX a question"
        />

        <button
          type="submit"
          class="rex-send"
          aria-label="Send message"
        >
          ↑
        </button>
      </form>

      <div class="rex-footer">
        <span>RELMUN '26</span>
        <span>OFFICIAL INFORMATION ASSISTANT</span>
      </div>

    </section>
  `;

  /* =========================================================
     SELF-CONTAINED CSS
  ========================================================= */

  const style = document.createElement("style");

  style.textContent = `
    /* ---------- ROOT ---------- */

    #relmun-chatbot,
    #relmun-chatbot * {
      box-sizing: border-box;
    }

    #relmun-chatbot {
      position: relative;
      z-index: 2147483000;
      font-family:
        Inter,
        Manrope,
        Arial,
        Helvetica,
        sans-serif;
    }

    /* ---------- FLOATING LAUNCHER ---------- */

    #relmun-chatbot .rex-launcher {
      position: fixed !important;
      right: 28px !important;
      bottom: 28px !important;

      width: auto !important;
      min-width: 104px !important;
      height: 52px !important;

      padding: 0 20px !important;
      margin: 0 !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 9px !important;

      border: 1px solid rgba(199,154,43,.75) !important;
      border-radius: 4px !important;

      background:
        linear-gradient(
          135deg,
          rgba(14,41,153,.96),
          rgba(8,8,8,.98)
        ) !important;

      color: #f1ece0 !important;

      font-family:
        Inter,
        Manrope,
        Arial,
        sans-serif !important;

      font-size: 13px !important;
      font-weight: 800 !important;
      letter-spacing: .18em !important;
      line-height: 1 !important;

      cursor: pointer !important;

      box-shadow:
        0 12px 40px rgba(0,0,0,.45),
        0 0 0 1px rgba(255,255,255,.03) inset !important;

      transition:
        transform .25s ease,
        background .25s ease,
        box-shadow .25s ease !important;
    }

    #relmun-chatbot .rex-launcher:hover {
      transform: translateY(-3px) !important;

      background:
        linear-gradient(
          135deg,
          #0e2999,
          #111111
        ) !important;

      box-shadow:
        0 18px 50px rgba(0,0,0,.55),
        0 0 25px rgba(14,41,153,.22) !important;
    }

    #relmun-chatbot .rex-launcher-star {
      color: #c79a2b !important;
      font-size: 18px !important;
      line-height: 1 !important;
    }

    /* ---------- CHAT WINDOW ---------- */

    #relmun-chatbot .rex-window {
      position: fixed !important;

      right: 28px !important;
      bottom: 94px !important;

      width: min(430px, calc(100vw - 32px)) !important;
      height: min(650px, calc(100vh - 125px)) !important;
      min-height: 480px !important;

      display: flex !important;
      flex-direction: column !important;

      overflow: hidden !important;

      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(14,41,153,.28),
          transparent 34%
        ),
        linear-gradient(
          145deg,
          #0a0a0b 0%,
          #080808 55%,
          #0b1025 100%
        ) !important;

      border: 1px solid rgba(241,236,224,.16) !important;

      border-radius: 8px !important;

      box-shadow:
        0 30px 100px rgba(0,0,0,.7),
        0 0 0 1px rgba(199,154,43,.06) inset !important;

      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;

      transform:
        translateY(20px)
        scale(.97) !important;

      transform-origin: bottom right !important;

      transition:
        opacity .25s ease,
        transform .25s ease,
        visibility .25s ease !important;
    }

    #relmun-chatbot .rex-window.open {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transform:
        translateY(0)
        scale(1) !important;
    }

    /* ---------- HEADER ---------- */

    #relmun-chatbot .rex-header {
      flex: 0 0 auto !important;

      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;

      min-height: 78px !important;
      padding: 17px 18px !important;

      border-bottom: 1px solid rgba(241,236,224,.1) !important;

      background:
        rgba(0,0,0,.25) !important;
    }

    #relmun-chatbot .rex-brand {
      min-width: 0 !important;
    }

    #relmun-chatbot .rex-brand-main {
      display: flex !important;
      align-items: center !important;
      gap: 9px !important;

      color: #f1ece0 !important;
    }

    #relmun-chatbot .rex-brand-main strong {
      font-family:
        Inter,
        Arial,
        sans-serif !important;

      font-size: 19px !important;
      font-weight: 900 !important;
      letter-spacing: .08em !important;
      color: #f1ece0 !important;
    }

    #relmun-chatbot .rex-dot {
      width: 7px !important;
      height: 7px !important;

      border-radius: 50% !important;

      background: #c79a2b !important;

      box-shadow:
        0 0 10px rgba(199,154,43,.7) !important;
    }

    #relmun-chatbot .rex-brand-sub {
      margin-top: 5px !important;

      color: rgba(241,236,224,.5) !important;

      font-size: 8px !important;
      font-weight: 700 !important;
      letter-spacing: .17em !important;
      text-transform: uppercase !important;
    }

    #relmun-chatbot .rex-close {
      width: 34px !important;
      height: 34px !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      padding: 0 !important;
      margin: 0 !important;

      border: 1px solid rgba(241,236,224,.18) !important;
      border-radius: 3px !important;

      background: transparent !important;
      color: #f1ece0 !important;

      font-family: Arial, sans-serif !important;
      font-size: 23px !important;
      font-weight: 300 !important;
      line-height: 1 !important;

      cursor: pointer !important;
    }

    #relmun-chatbot .rex-close:hover {
      background: #0e2999 !important;
      border-color: #0e2999 !important;
    }

    /* ---------- INTRO ---------- */

    #relmun-chatbot .rex-intro {
      flex: 0 0 auto !important;

      padding: 22px 22px 16px !important;
    }

    #relmun-chatbot .rex-intro-number {
      margin-bottom: 12px !important;

      color: #c79a2b !important;

      font-size: 9px !important;
      font-weight: 800 !important;
      letter-spacing: .25em !important;
      text-transform: uppercase !important;
    }

    #relmun-chatbot .rex-intro h2 {
      margin: 0 !important;

      color: #f1ece0 !important;

      font-family:
        Inter,
        Arial,
        sans-serif !important;

      font-size: clamp(30px, 7vw, 42px) !important;
      font-weight: 900 !important;
      letter-spacing: -.045em !important;
      line-height: .94 !important;
    }

    #relmun-chatbot .rex-intro h2 em {
      color: #c79a2b !important;

      font-family:
        Georgia,
        "Times New Roman",
        serif !important;

      font-weight: 400 !important;
      letter-spacing: -.04em !important;
    }

    #relmun-chatbot .rex-intro p {
      max-width: 370px !important;

      margin: 15px 0 0 !important;

      color: rgba(241,236,224,.62) !important;

      font-size: 12px !important;
      line-height: 1.65 !important;
    }

    /* ---------- MESSAGES ---------- */

    #relmun-chatbot .rex-messages {
      flex: 1 1 auto !important;

      min-height: 0 !important;

      overflow-y: auto !important;
      overflow-x: hidden !important;

      padding: 10px 18px 18px !important;

      scrollbar-width: thin !important;
      scrollbar-color:
        rgba(199,154,43,.5)
        transparent !important;
    }

    #relmun-chatbot .rex-messages::-webkit-scrollbar {
      width: 4px !important;
    }

    #relmun-chatbot .rex-messages::-webkit-scrollbar-track {
      background: transparent !important;
    }

    #relmun-chatbot .rex-messages::-webkit-scrollbar-thumb {
      background: rgba(199,154,43,.5) !important;
    }

    #relmun-chatbot .rex-message {
      max-width: 88% !important;

      margin: 0 0 13px !important;
      padding: 12px 14px !important;

      border-radius: 3px !important;

      font-size: 12px !important;
      line-height: 1.6 !important;

      overflow-wrap: anywhere !important;
      word-break: break-word !important;
    }

    #relmun-chatbot .rex-message.rex-bot {
      margin-right: auto !important;

      border-left: 2px solid #c79a2b !important;

      background:
        rgba(241,236,224,.055) !important;

      color: #f1ece0 !important;
    }

    #relmun-chatbot .rex-message.rex-user {
      margin-left: auto !important;

      background:
        #0e2999 !important;

      color: #ffffff !important;
    }

    #relmun-chatbot .rex-message-label {
      margin-bottom: 5px !important;

      color: #c79a2b !important;

      font-size: 8px !important;
      font-weight: 900 !important;
      letter-spacing: .2em !important;
      text-transform: uppercase !important;
    }

    #relmun-chatbot .rex-message.rex-user .rex-message-label {
      color: rgba(255,255,255,.65) !important;
    }

    #relmun-chatbot .rex-message-text {
      white-space: pre-wrap !important;
    }

    /* ---------- FORM ---------- */

    #relmun-chatbot .rex-form {
      flex: 0 0 auto !important;

      display: flex !important;
      align-items: stretch !important;

      gap: 8px !important;

      margin: 0 18px 12px !important;
      padding: 7px !important;

      border: 1px solid rgba(241,236,224,.15) !important;
      border-radius: 4px !important;

      background:
        rgba(0,0,0,.38) !important;
    }

    #relmun-chatbot .rex-form input {
      flex: 1 1 auto !important;

      min-width: 0 !important;
      width: auto !important;
      height: 42px !important;

      padding: 0 11px !important;
      margin: 0 !important;

      border: 0 !important;
      outline: none !important;

      background: transparent !important;

      color: #f1ece0 !important;

      font-family:
        Inter,
        Arial,
        sans-serif !important;

      font-size: 12px !important;
      line-height: 42px !important;
    }

    #relmun-chatbot .rex-form input::placeholder {
      color: rgba(241,236,224,.35) !important;
    }

    #relmun-chatbot .rex-send {
      flex: 0 0 44px !important;

      width: 44px !important;
      height: 42px !important;

      padding: 0 !important;
      margin: 0 !important;

      border: 0 !important;
      border-radius: 2px !important;

      background: #0e2999 !important;
      color: #ffffff !important;

      font-family: Arial, sans-serif !important;
      font-size: 20px !important;
      font-weight: 700 !important;
      line-height: 1 !important;

      cursor: pointer !important;

      transition:
        background .2s ease,
        transform .2s ease !important;
    }

    #relmun-chatbot .rex-send:hover {
      background: #173bc4 !important;
      transform: translateY(-1px) !important;
    }

    #relmun-chatbot .rex-send:disabled {
      opacity: .45 !important;
      cursor: not-allowed !important;
    }

    /* ---------- FOOTER ---------- */

    #relmun-chatbot .rex-footer {
      flex: 0 0 auto !important;

      display: flex !important;
      justify-content: space-between !important;
      gap: 10px !important;

      padding: 0 20px 15px !important;

      color: rgba(241,236,224,.27) !important;

      font-size: 7px !important;
      font-weight: 800 !important;
      letter-spacing: .17em !important;
    }

    /* ---------- MOBILE ---------- */

    @media (max-width: 600px) {

      #relmun-chatbot .rex-launcher {
        right: 16px !important;
        bottom: 16px !important;

        min-width: 58px !important;
        width: 58px !important;
        height: 58px !important;

        padding: 0 !important;

        border-radius: 50% !important;
      }

      #relmun-chatbot .rex-launcher span:last-child {
        display: none !important;
      }

      #relmun-chatbot .rex-launcher-star {
        font-size: 22px !important;
      }

      #relmun-chatbot .rex-window {
        right: 12px !important;
        bottom: 84px !important;

        width: calc(100vw - 24px) !important;
        height: calc(100vh - 105px) !important;
        min-height: 0 !important;

        border-radius: 7px !important;
      }
    }

    @media (max-height: 650px) and (min-width: 601px) {
      #relmun-chatbot .rex-window {
        height: calc(100vh - 105px) !important;
        min-height: 0 !important;
      }

      #relmun-chatbot .rex-intro {
        padding-top: 15px !important;
        padding-bottom: 10px !important;
      }

      #relmun-chatbot .rex-intro h2 {
        font-size: 30px !important;
      }
    }
  `;

  document.head.appendChild(style);

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const openButton = document.getElementById("rexOpen");
  const closeButton = document.getElementById("rexClose");
  const windowEl = document.getElementById("rexWindow");
  const messages = document.getElementById("rexMessages");
  const form = document.getElementById("rexForm");
  const input = document.getElementById("rexInput");
  const sendButton = form.querySelector(".rex-send");

  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  function openRex() {
    windowEl.classList.add("open");

    openButton.setAttribute("aria-expanded", "true");
    windowEl.setAttribute("aria-hidden", "false");

    setTimeout(() => input.focus(), 150);
  }

  function closeRex() {
    windowEl.classList.remove("open");

    openButton.setAttribute("aria-expanded", "false");
    windowEl.setAttribute("aria-hidden", "true");
  }

  openButton.addEventListener("click", openRex);
  closeButton.addEventListener("click", closeRex);

  /* Close with Escape */
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      windowEl.classList.contains("open")
    ) {
      closeRex();
    }
  });

  /* =========================================================
     MESSAGE HELPERS
  ========================================================= */

  function addMessage(text, type) {
    const message = document.createElement("div");

    message.className =
      `rex-message rex-${type}`;

    const label = document.createElement("div");

    label.className = "rex-message-label";
    label.textContent =
      type === "user" ? "YOU" : "REX";

    const body = document.createElement("div");

    body.className = "rex-message-text";
    body.textContent = text;

    message.appendChild(label);
    message.appendChild(body);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
  }

  function addTyping() {
    const message = document.createElement("div");

    message.className =
      "rex-message rex-bot rex-typing";

    const label = document.createElement("div");

    label.className = "rex-message-label";
    label.textContent = "REX";

    const body = document.createElement("div");

    body.className = "rex-message-text";
    body.textContent = "REX is checking…";

    message.appendChild(label);
    message.appendChild(body);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
  }

  /* =========================================================
     API
  ========================================================= */

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = input.value.trim();

    if (!question) return;

    input.value = "";
    input.disabled = true;
    sendButton.disabled = true;

    addMessage(question, "user");

    const typing = addTyping();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: question
        })
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response.");
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "REX could not respond."
        );
      }

      typing.remove();

      addMessage(
        data?.answer ||
        "I don't have that information yet.",
        "bot"
      );

    } catch (error) {

      console.error("REX error:", error);

      typing.remove();

      addMessage(
        "I'm having trouble connecting right now. Please try again, or contact @relmun.official.",
        "bot"
      );

    } finally {

      input.disabled = false;
      sendButton.disabled = false;

      input.focus();
    }
  });

})();
