document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("relmun-chatbot");

  if (!container) {
    console.error("RELMUN chatbot container not found.");
    return;
  }

  /* ================================
     CHATBOT STYLES
  ================================= */

  const style = document.createElement("style");

  style.textContent = `
    #relmun-chatbot {
      position: fixed !important;
      right: 28px !important;
      bottom: 28px !important;
      z-index: 999999 !important;
      font-family: Arial, Helvetica, sans-serif !important;
    }

    #relmun-chatbot *,
    #relmun-chatbot *::before,
    #relmun-chatbot *::after {
      box-sizing: border-box !important;
    }

    #chatbot-toggle {
      display: flex !important;
      align-items: center !important;
      gap: 9px !important;

      height: 48px !important;
      padding: 0 19px !important;

      border: 1px solid rgba(199,154,43,.65) !important;
      border-radius: 2px !important;

      background: rgba(8,8,8,.94) !important;
      color: #f1ece0 !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: 1.6px !important;

      cursor: pointer !important;

      box-shadow:
        0 12px 40px rgba(0,0,0,.45),
        0 0 30px rgba(199,154,43,.06) !important;

      transition: all .25s ease !important;
    }

    #chatbot-toggle:hover {
      transform: translateY(-3px) !important;
      border-color: #c79a2b !important;
      box-shadow:
        0 18px 50px rgba(0,0,0,.55),
        0 0 30px rgba(199,154,43,.12) !important;
    }

    .relmun-chat-star {
      color: #c79a2b !important;
      font-size: 16px !important;
    }

    #chatbot-window {
      position: absolute !important;

      right: 0 !important;
      bottom: 62px !important;

      width: 390px !important;
      height: 560px !important;

      display: flex !important;
      flex-direction: column !important;

      overflow: hidden !important;

      border: 1px solid rgba(241,236,224,.14) !important;
      border-radius: 4px !important;

      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(24,70,255,.08),
          transparent 35%
        ),
        linear-gradient(
          145deg,
          #151515,
          #080808
        ) !important;

      box-shadow:
        0 30px 100px rgba(0,0,0,.7),
        0 0 60px rgba(24,70,255,.04) !important;

      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;

      transform: translateY(15px) scale(.97) !important;

      transition:
        opacity .25s ease,
        transform .25s ease,
        visibility .25s ease !important;
    }

    #chatbot-window.open {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;

      transform: translateY(0) scale(1) !important;
    }

    #chatbot-header {
      height: 76px !important;
      min-height: 76px !important;

      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;

      padding: 0 20px !important;

      border-bottom: 1px solid rgba(241,236,224,.1) !important;

      background:
        linear-gradient(
          90deg,
          rgba(199,154,43,.08),
          transparent
        ) !important;
    }

    #chatbot-header div {
      display: flex !important;
      flex-direction: column !important;
      gap: 5px !important;
    }

    #chatbot-header strong {
      display: block !important;

      color: #f1ece0 !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      letter-spacing: 1.8px !important;
    }

    #chatbot-header span {
      display: block !important;

      color: rgba(241,236,224,.4) !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 8px !important;
      letter-spacing: 1.4px !important;
    }

    #chatbot-close {
      width: 32px !important;
      height: 32px !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      padding: 0 !important;

      border: 1px solid rgba(241,236,224,.14) !important;

      background: transparent !important;
      color: #f1ece0 !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 20px !important;
      font-weight: 300 !important;
      line-height: 1 !important;

      cursor: pointer !important;
    }

    #chatbot-close:hover {
      background: rgba(255,255,255,.07) !important;
      border-color: rgba(241,236,224,.3) !important;
    }

    #chatbot-messages {
      flex: 1 !important;

      display: flex !important;
      flex-direction: column !important;
      gap: 13px !important;

      padding: 20px !important;

      overflow-y: auto !important;

      scrollbar-width: thin !important;
      scrollbar-color: rgba(199,154,43,.4) transparent !important;
    }

    #chatbot-messages::-webkit-scrollbar {
      width: 4px !important;
    }

    #chatbot-messages::-webkit-scrollbar-track {
      background: transparent !important;
    }

    #chatbot-messages::-webkit-scrollbar-thumb {
      background: rgba(199,154,43,.4) !important;
    }

    .bot-message {
      align-self: flex-start !important;

      max-width: 86% !important;

      padding: 13px 15px !important;

      border: 1px solid rgba(241,236,224,.08) !important;
      border-radius: 3px 12px 12px 12px !important;

      background: rgba(241,236,224,.055) !important;

      color: #f1ece0 !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 13px !important;
      font-weight: 400 !important;
      line-height: 1.6 !important;
    }

    .user-message {
      align-self: flex-end !important;

      max-width: 82% !important;

      padding: 13px 15px !important;

      border: 1px solid rgba(255,255,255,.1) !important;
      border-radius: 12px 3px 12px 12px !important;

      background: #1846ff !important;

      color: #fff !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 13px !important;
      font-weight: 400 !important;
      line-height: 1.6 !important;
    }

    #chatbot-input-area {
      display: flex !important;
      gap: 8px !important;

      padding: 14px !important;

      border-top: 1px solid rgba(241,236,224,.1) !important;

      background: rgba(0,0,0,.35) !important;
    }

    #chatbot-input {
      flex: 1 !important;
      min-width: 0 !important;

      height: 46px !important;

      padding: 0 14px !important;

      border: 1px solid rgba(241,236,224,.13) !important;
      border-radius: 2px !important;

      outline: none !important;

      background: rgba(241,236,224,.045) !important;
      color: #f1ece0 !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 13px !important;
    }

    #chatbot-input::placeholder {
      color: rgba(241,236,224,.35) !important;
    }

    #chatbot-input:focus {
      border-color: rgba(199,154,43,.6) !important;
      background: rgba(241,236,224,.065) !important;
    }

    #chatbot-send {
      width: 46px !important;
      height: 46px !important;

      flex-shrink: 0 !important;

      border: 1px solid #c79a2b !important;
      border-radius: 2px !important;

      background: #c79a2b !important;
      color: #080808 !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 20px !important;
      font-weight: 700 !important;

      cursor: pointer !important;
    }

    #chatbot-send:hover {
      background: #d8ad3d !important;
    }

    #chatbot-send:disabled {
      opacity: .45 !important;
      cursor: not-allowed !important;
    }

    .chatbot-typing {
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
    }

    .chatbot-dot {
      width: 5px !important;
      height: 5px !important;

      border-radius: 50% !important;

      background: #c79a2b !important;

      animation: relmunTyping 1s infinite ease-in-out !important;
    }

    .chatbot-dot:nth-child(2) {
      animation-delay: .15s !important;
    }

    .chatbot-dot:nth-child(3) {
      animation-delay: .3s !important;
    }

    @keyframes relmunTyping {
      0%, 60%, 100% {
        opacity: .25;
        transform: translateY(0);
      }

      30% {
        opacity: 1;
        transform: translateY(-3px);
      }
    }

    @media (max-width: 600px) {

      #relmun-chatbot {
        right: 14px !important;
        bottom: 14px !important;
      }

      #chatbot-window {
        position: fixed !important;

        left: 10px !important;
        right: 10px !important;
        bottom: 70px !important;

        width: auto !important;
        height: min(600px, calc(100vh - 90px)) !important;
      }

    }
  `;

  document.head.appendChild(style);


  /* ================================
     CHATBOT HTML
  ================================= */

  container.innerHTML = `

    <button id="chatbot-toggle" type="button">
      <span class="relmun-chat-star">✦</span>
      ASK RELMUN
    </button>

    <div id="chatbot-window">

      <div id="chatbot-header">

        <div>
          <strong>ASK RELMUN</strong>
          <span>RELMUN '26 AI ASSISTANT</span>
        </div>

        <button id="chatbot-close" type="button">
          ×
        </button>

      </div>

      <div id="chatbot-messages">

        <div class="bot-message">
          Hey! I'm ASK RELMUN. 👋<br><br>
          Ask me anything about RELMUN '26, the committees, registration, or the conference.
        </div>

      </div>

      <div id="chatbot-input-area">

        <input
          id="chatbot-input"
          type="text"
          placeholder="Ask about RELMUN..."
          autocomplete="off"
        >

        <button
          id="chatbot-send"
          type="button"
        >
          ↑
        </button>

      </div>

    </div>
  `;


  /* ================================
     ELEMENTS
  ================================= */

  const toggle =
    document.getElementById("chatbot-toggle");

  const chatWindow =
    document.getElementById("chatbot-window");

  const close =
    document.getElementById("chatbot-close");

  const input =
    document.getElementById("chatbot-input");

  const send =
    document.getElementById("chatbot-send");

  const messages =
    document.getElementById("chatbot-messages");


  /* ================================
     OPEN / CLOSE
  ================================= */

  toggle.addEventListener("click", () => {

    chatWindow.classList.add("open");

    setTimeout(() => {
      input.focus();
    }, 200);

  });


  close.addEventListener("click", () => {

    chatWindow.classList.remove("open");

  });


  /* ================================
     ADD MESSAGE
  ================================= */

  function addMessage(text, type) {

    const message =
      document.createElement("div");

    message.className =
      type === "user"
        ? "user-message"
        : "bot-message";

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop =
      messages.scrollHeight;

    return message;
  }


  /* ================================
     TYPING INDICATOR
  ================================= */

  function addTyping() {

    const typing =
      document.createElement("div");

    typing.className = "bot-message";

    typing.innerHTML = `
      <div class="chatbot-typing">
        <span class="chatbot-dot"></span>
        <span class="chatbot-dot"></span>
        <span class="chatbot-dot"></span>
      </div>
    `;

    messages.appendChild(typing);

    messages.scrollTop =
      messages.scrollHeight;

    return typing;
  }


  /* ================================
     SEND MESSAGE
  ================================= */

  async function sendMessage() {

    const message =
      input.value.trim();

    if (!message) return;


    addMessage(message, "user");

    input.value = "";

    send.disabled = true;

    const typing =
      addTyping();


    try {

      const response =
        await fetch("/api/chat", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message: message
          })

        });


      const data =
        await response.json();


      typing.remove();


      if (!response.ok) {
        throw new Error(
          data.error || "API request failed"
        );
      }


      addMessage(
        data.reply ||
        "I couldn't generate a response.",
        "bot"
      );


    } catch (error) {

      console.error(
        "ASK RELMUN ERROR:",
        error
      );


      typing.remove();


      addMessage(
        "Sorry, I'm having trouble connecting right now. Please try again.",
        "bot"
      );

    } finally {

      send.disabled = false;

      input.focus();

    }

  }


  send.addEventListener(
    "click",
    sendMessage
  );


  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        sendMessage();
      }

    }
  );

});
