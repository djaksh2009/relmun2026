document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById("relmun-chatbot");

  if (!root) return;

  /* =========================================================
     CHATBOT HTML
  ========================================================= */

  root.innerHTML = `

    <button class="relmun-chat-button" id="relmunChatButton">
      <span>✦</span>
      ASK RELMUN
    </button>

    <div class="relmun-chat-window" id="relmunChatWindow">

      <div class="relmun-chat-header">

        <div class="relmun-chat-title">
          <strong>ASK RELMUN</strong>
          <span>RELMUN '26 AI ASSISTANT</span>
        </div>

        <button
          class="relmun-chat-close"
          id="relmunChatClose"
          aria-label="Close chat"
        >
          ×
        </button>

      </div>

      <div
        class="relmun-chat-messages"
        id="relmunChatMessages"
      >

        <div class="relmun-message bot">
          <div class="relmun-markdown">
            Hey! I’m <strong>ASK RELMUN.</strong> 👋
            <br><br>
            Ask me anything about RELMUN '26,
            committees, registration, the team,
            or the conference.
          </div>
        </div>

      </div>

      <form
        class="relmun-chat-input"
        id="relmunChatForm"
      >

        <input
          id="relmunChatInput"
          type="text"
          placeholder="Ask about RELMUN..."
          autocomplete="off"
          aria-label="Ask about RELMUN"
        >

        <button
          type="submit"
          aria-label="Send message"
        >
          ↑
        </button>

      </form>

    </div>

  `;


  /* =========================================================
     INLINE CSS
     No chatbot.css required.
  ========================================================= */

  const style = document.createElement("style");

  style.textContent = `

    /* =========================
       CHAT BUTTON
    ========================= */

    .relmun-chat-button {
      position: fixed;
      right: 28px;
      bottom: 28px;

      z-index: 99999;

      border: 1px solid #c79a2b;
      background: #080808;
      color: #f1ece0;

      padding: 14px 22px;

      font-family: inherit;
      font-size: 13px;
      letter-spacing: 0.12em;

      cursor: pointer;

      transition:
        background 0.25s ease,
        color 0.25s ease,
        transform 0.25s ease;
    }

    .relmun-chat-button span {
      color: #c79a2b;
      margin-right: 7px;
    }

    .relmun-chat-button:hover {
      background: #c79a2b;
      color: #080808;
      transform: translateY(-3px);
    }

    .relmun-chat-button:hover span {
      color: #080808;
    }


    /* =========================
       CHAT WINDOW
    ========================= */

    .relmun-chat-window {
      position: fixed;

      right: 28px;
      bottom: 28px;

      width: min(430px, calc(100vw - 40px));
      height: min(650px, calc(100vh - 50px));

      z-index: 100000;

      display: flex;
      flex-direction: column;

      background: #0b0b0b;

      border: 1px solid rgba(241, 236, 224, 0.18);

      box-shadow:
        0 30px 90px rgba(0,0,0,0.55);

      opacity: 0;
      visibility: hidden;

      transform:
        translateY(25px)
        scale(0.97);

      transition:
        opacity 0.25s ease,
        transform 0.25s ease,
        visibility 0.25s ease;
    }

    .relmun-chat-window.open {
      opacity: 1;
      visibility: visible;

      transform:
        translateY(0)
        scale(1);
    }


    /* =========================
       HEADER
    ========================= */

    .relmun-chat-header {
      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 22px 22px;

      border-bottom:
        1px solid rgba(241,236,224,0.12);

      background: #080808;
    }

    .relmun-chat-title {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .relmun-chat-title strong {
      color: #f1ece0;

      font-size: 18px;
      font-weight: 600;

      letter-spacing: -0.02em;
    }

    .relmun-chat-title span {
      color: #8e8b83;

      font-size: 9px;
      letter-spacing: 0.14em;
    }

    .relmun-chat-close {
      width: 34px;
      height: 34px;

      border: 0;
      background: transparent;

      color: #f1ece0;

      font-size: 27px;
      line-height: 1;

      cursor: pointer;

      transition:
        color 0.2s ease,
        transform 0.2s ease;
    }

    .relmun-chat-close:hover {
      color: #c79a2b;
      transform: rotate(90deg);
    }


    /* =========================
       MESSAGES
    ========================= */

    .relmun-chat-messages {

      flex: 1;

      overflow-y: auto;

      padding: 24px 18px;

      display: flex;
      flex-direction: column;

      gap: 16px;

      scrollbar-width: thin;
      scrollbar-color: #333 transparent;
    }

    .relmun-chat-messages::-webkit-scrollbar {
      width: 5px;
    }

    .relmun-chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .relmun-chat-messages::-webkit-scrollbar-thumb {
      background: #333;
    }


    /* =========================
       ALL MESSAGE BUBBLES
    ========================= */

    .relmun-message {

      font-size: 15px;
      line-height: 1.65;

      word-break: break-word;

      max-width: 82%;

      box-sizing: border-box;
    }


    /* =========================
       BOT MESSAGE
    ========================= */

    .relmun-message.bot {

      align-self: flex-start;

      width: fit-content;
      max-width: 86%;

      padding: 18px 20px;

      background: #171717;

      border: 1px solid
        rgba(241,236,224,0.12);

      border-radius: 20px 20px 20px 5px;

      color: #e8e4da;
    }


    /* =========================
       USER MESSAGE
       
       THIS FIXES THE HUGE BLUE BOX
    ========================= */

    .relmun-message.user {

      align-self: flex-end;

      /*
        IMPORTANT:
        width: fit-content makes the
        bubble only as wide as needed.
      */

      width: fit-content;

      max-width: 78%;

      padding: 14px 18px;

      background: #1846ff;

      color: white;

      border-radius: 18px 18px 5px 18px;

      white-space: pre-wrap;

      overflow-wrap: anywhere;

      box-sizing: border-box;
    }


    /* =========================
       MARKDOWN
    ========================= */

    .relmun-markdown {
      color: inherit;
    }

    .relmun-markdown strong {
      font-weight: 650;
      color: #f1ece0;
    }

    .relmun-markdown h1,
    .relmun-markdown h2,
    .relmun-markdown h3 {
      margin: 0 0 10px;
      color: #f1ece0;
      line-height: 1.2;
    }

    .relmun-markdown h1 {
      font-size: 22px;
    }

    .relmun-markdown h2 {
      font-size: 19px;
    }

    .relmun-markdown h3 {
      font-size: 17px;
    }

    .relmun-markdown ul {
      margin: 8px 0;
      padding-left: 20px;
    }

    .relmun-markdown li {
      margin: 4px 0;
    }

    .relmun-markdown p {
      margin: 0 0 10px;
    }

    .relmun-markdown p:last-child {
      margin-bottom: 0;
    }


    /* =========================
       TYPING
    ========================= */

    .relmun-message.typing {
      color: #9b978e;
      font-style: italic;
    }

    .relmun-typing-dots {
      display: inline-flex;
      gap: 4px;
      margin-left: 4px;
    }

    .relmun-typing-dots span {
      width: 5px;
      height: 5px;

      border-radius: 50%;

      background: #c79a2b;

      animation: relmunTyping 1.2s infinite;
    }

    .relmun-typing-dots span:nth-child(2) {
      animation-delay: 0.15s;
    }

    .relmun-typing-dots span:nth-child(3) {
      animation-delay: 0.3s;
    }

    @keyframes relmunTyping {

      0%,
      60%,
      100% {
        opacity: 0.25;
        transform: translateY(0);
      }

      30% {
        opacity: 1;
        transform: translateY(-3px);
      }

    }


    /* =========================
       INPUT
    ========================= */

    .relmun-chat-input {

      flex-shrink: 0;

      display: flex;
      align-items: center;

      gap: 8px;

      padding: 14px 16px 16px;

      background: #080808;

      border-top:
        1px solid rgba(241,236,224,0.10);
    }

    .relmun-chat-input input {

      flex: 1;

      min-width: 0;

      height: 52px;

      padding: 0 18px;

      border-radius: 28px;

      border: 1px solid #5e4b15;

      outline: none;

      background: #151515;

      color: #f1ece0;

      font-family: inherit;
      font-size: 15px;

      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    .relmun-chat-input input::placeholder {
      color: #6f6c66;
    }

    .relmun-chat-input input:focus {

      border-color: #c79a2b;

      box-shadow:
        0 0 0 1px rgba(199,154,43,0.15);
    }

    .relmun-chat-input button {

      flex-shrink: 0;

      width: 52px;
      height: 52px;

      border: 0;

      border-radius: 50%;

      background: #c79a2b;

      color: #080808;

      font-size: 23px;

      cursor: pointer;

      transition:
        transform 0.2s ease,
        background 0.2s ease;
    }

    .relmun-chat-input button:hover {
      transform: translateY(-2px);
      background: #e0b84d;
    }


    /* =========================
       MOBILE
    ========================= */

    @media (max-width: 600px) {

      .relmun-chat-button {
        right: 16px;
        bottom: 16px;

        padding: 12px 17px;
      }

      .relmun-chat-window {

        right: 10px;
        bottom: 10px;

        width: calc(100vw - 20px);
        height: calc(100vh - 20px);

        max-height: none;
      }

      .relmun-message.user {
        max-width: 82%;
      }

      .relmun-message.bot {
        max-width: 90%;
      }

    }

  `;

  document.head.appendChild(style);


  /* =========================================================
     ELEMENTS
  ========================================================= */

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

  const messagesBox =
    document.getElementById("relmunChatMessages");


  let conversation = [];


  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  button.addEventListener("click", () => {

    windowBox.classList.add("open");

    setTimeout(() => {
      input.focus();
    }, 100);

  });


  close.addEventListener("click", () => {

    windowBox.classList.remove("open");

  });


  /* =========================================================
     MARKDOWN PARSER
     
     Safe basic Markdown support.
  ========================================================= */

  function escapeHTML(text) {

    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function markdownToHTML(text) {

    let html = escapeHTML(text);


    /* Bold */

    html = html.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );


    /* Italic */

    html = html.replace(
      /(?<!\*)\*([^*\n]+)\*(?!\*)/g,
      "<em>$1</em>"
    );


    /* Headings */

    html = html.replace(
      /^### (.*)$/gm,
      "<h3>$1</h3>"
    );

    html = html.replace(
      /^## (.*)$/gm,
      "<h2>$1</h2>"
    );

    html = html.replace(
      /^# (.*)$/gm,
      "<h1>$1</h1>"
    );


    /* Bullet points */

    html = html.replace(
      /(?:^|\n)- (.*)(?=\n|$)/g,
      "<li>$1</li>"
    );

    html = html.replace(
      /(<li>.*?<\/li>)/gs,
      "<ul>$1</ul>"
    );


    /* Line breaks */

    html = html.replace(
      /\n/g,
      "<br>"
    );


    return html;

  }


  /* =========================================================
     ADD MESSAGE
  ========================================================= */

  function addMessage(text, type) {

    const message =
      document.createElement("div");

    message.className =
      `relmun-message ${type}`;


    if (type === "bot") {

      const content =
        document.createElement("div");

      content.className =
        "relmun-markdown";

      content.innerHTML =
        markdownToHTML(text);

      message.appendChild(content);

    } else {

      message.textContent = text;

    }


    messagesBox.appendChild(message);

    messagesBox.scrollTop =
      messagesBox.scrollHeight;

  }


  /* =========================================================
     TYPING INDICATOR
  ========================================================= */

  function addTyping() {

    removeTyping();


    const typing =
      document.createElement("div");

    typing.className =
      "relmun-message bot typing";

    typing.id =
      "relmunTyping";


    typing.innerHTML = `
      Thinking
      <span class="relmun-typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `;


    messagesBox.appendChild(typing);

    messagesBox.scrollTop =
      messagesBox.scrollHeight;

  }


  function removeTyping() {

    const typing =
      document.getElementById("relmunTyping");

    if (typing) {
      typing.remove();
    }

  }


  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const text =
        input.value.trim();


      if (!text) return;


      /* Add user message */

      addMessage(text, "user");

      input.value = "";

      input.disabled = true;


      conversation.push({
        role: "user",
        content: text
      });


      addTyping();


      try {

        const response =
          await fetch("/api/chat", {

            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              message: text
            })

          });


        const data =
          await response.json();


        removeTyping();


        console.log(
          "ASK RELMUN response:",
          data
        );


        if (!response.ok) {

          console.error(
            "Chatbot error:",
            data
          );

          throw new Error(
            data.error ||
            "Request failed"
          );

        }


        /*
          Your API returns:
          {
            answer: "..."
          }
        */

        const reply =
          data.answer ||
          data.reply ||
          "I couldn't generate a response.";


        addMessage(
          reply,
          "bot"
        );


        conversation.push({
          role: "assistant",
          content: reply
        });


      } catch (error) {

        removeTyping();


        console.error(
          "ASK RELMUN:",
          error
        );


        addMessage(
          "Sorry, I'm having trouble connecting right now. Please try again.",
          "bot"
        );

      } finally {

        input.disabled = false;

        input.focus();

      }

    }
  );

});
