/* =========================================================
   RELMUN '26 — AI CHATBOT
   Frontend
   ========================================================= */

(function () {

  "use strict";


  /* -------------------------------------------------------
     CHATBOT HTML
     ------------------------------------------------------- */

  const chatbot = document.getElementById("relmun-chatbot");

  if (!chatbot) return;


  chatbot.innerHTML = `

    <button
      class="relmun-chat-button"
      id="relmunChatButton"
      aria-label="Open RELMUN AI"
    >

      <span class="chat-icon">✦</span>

      <span class="chat-button-text">
        RELMUN AI
      </span>

    </button>


    <div
      class="relmun-chat-window"
      id="relmunChatWindow"
      aria-hidden="true"
    >

      <div class="relmun-chat-header">

        <div class="relmun-chat-brand">

          <div class="relmun-ai-mark">
            ✦
          </div>

          <div>

            <strong>
              RELMUN AI
            </strong>

            <small>
              YOUR CONFERENCE ASSISTANT
            </small>

          </div>

        </div>


        <button
          class="relmun-chat-close"
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

          <div class="message-label">
            RELMUN AI
          </div>

          <div class="message-bubble">

            Hey! 👋<br><br>

            I'm the RELMUN '26 assistant.
            Ask me anything about the conference,
            committees, dates, registration,
            Executive Board or the organising team.

          </div>

        </div>

      </div>


      <div class="relmun-quick-actions">

        <button data-question="What is RELMUN?">
          What is RELMUN?
        </button>

        <button data-question="What committees are available?">
          Committees
        </button>

        <button data-question="Who is in the organising team?">
          Organising Team
        </button>

        <button data-question="When is RELMUN 2026?">
          Conference Date
        </button>

      </div>


      <form
        class="relmun-chat-input"
        id="relmunChatForm"
      >

        <input
          type="text"
          id="relmunChatInput"
          placeholder="Ask RELMUN AI..."
          autocomplete="off"
          maxlength="500"
        >

        <button
          type="submit"
          aria-label="Send message"
        >
          ↑
        </button>

      </form>


      <div class="relmun-chat-footer">
        RELATIONS · ENGAGEMENT · LEADERSHIP
      </div>

    </div>

  `;


  /* -------------------------------------------------------
     ELEMENTS
     ------------------------------------------------------- */

  const openButton =
    document.getElementById("relmunChatButton");

  const closeButton =
    document.getElementById("relmunChatClose");

  const chatWindow =
    document.getElementById("relmunChatWindow");

  const form =
    document.getElementById("relmunChatForm");

  const input =
    document.getElementById("relmunChatInput");

  const messages =
    document.getElementById("relmunChatMessages");

  const quickActions =
    document.querySelectorAll(
      ".relmun-quick-actions button"
    );


  /* -------------------------------------------------------
     OPEN CHAT
     ------------------------------------------------------- */

  function openChat() {

    chatWindow.classList.add("open");

    chatWindow.setAttribute(
      "aria-hidden",
      "false"
    );

    setTimeout(() => {

      input.focus();

    }, 250);

  }


  /* -------------------------------------------------------
     CLOSE CHAT
     ------------------------------------------------------- */

  function closeChat() {

    chatWindow.classList.remove("open");

    chatWindow.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  openButton.addEventListener(
    "click",
    openChat
  );


  closeButton.addEventListener(
    "click",
    closeChat
  );


  /* -------------------------------------------------------
     ADD MESSAGE
     ------------------------------------------------------- */

  function addMessage(
    text,
    type = "bot"
  ) {

    const message =
      document.createElement("div");

    message.className =
      `relmun-message ${type}`;


    const label =
      type === "user"
        ? "YOU"
        : "RELMUN AI";


    message.innerHTML = `

      <div class="message-label">
        ${label}
      </div>

      <div class="message-bubble">
        ${formatMessage(text)}
      </div>

    `;


    messages.appendChild(message);

    scrollToBottom();

  }


  /* -------------------------------------------------------
     FORMAT MESSAGE
     ------------------------------------------------------- */

  function formatMessage(text) {

    if (!text) return "";


    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");

  }


  /* -------------------------------------------------------
     TYPING INDICATOR
     ------------------------------------------------------- */

  function showTyping() {

    const typing =
      document.createElement("div");


    typing.className =
      "relmun-message bot";

    typing.id =
      "relmunTyping";


    typing.innerHTML = `

      <div class="message-label">
        RELMUN AI
      </div>

      <div class="message-bubble typing">

        <span></span>
        <span></span>
        <span></span>

      </div>

    `;


    messages.appendChild(typing);

    scrollToBottom();

  }


  /* -------------------------------------------------------
     REMOVE TYPING
     ------------------------------------------------------- */

  function removeTyping() {

    const typing =
      document.getElementById(
        "relmunTyping"
      );


    if (typing) {

      typing.remove();

    }

  }


  /* -------------------------------------------------------
     SCROLL
     ------------------------------------------------------- */

  function scrollToBottom() {

    messages.scrollTop =
      messages.scrollHeight;

  }


  /* -------------------------------------------------------
     SEND TO BACKEND
     ------------------------------------------------------- */

  async function askAI(question) {

    showTyping();


    try {

      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                message: question
              })

          }
        );


      if (!response.ok) {

        throw new Error(
          "API request failed"
        );

      }


      const data =
        await response.json();


      removeTyping();


      if (
        data &&
        data.reply
      ) {

        addMessage(
          data.reply,
          "bot"
        );

      } else {

        addMessage(
          "I couldn't process that right now. Please try again.",
          "bot"
        );

      }


    } catch (error) {

      console.error(
        "RELMUN AI:",
        error
      );


      removeTyping();


      addMessage(
        "I'm having trouble connecting right now. Please try again in a moment.",
        "bot"
      );

    }

  }


  /* -------------------------------------------------------
     FORM SUBMIT
     ------------------------------------------------------- */

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const question =
        input.value.trim();


      if (!question) return;


      addMessage(
        question,
        "user"
      );


      input.value = "";


      askAI(question);

    }
  );


  /* -------------------------------------------------------
     QUICK QUESTIONS
     ------------------------------------------------------- */

  quickActions.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const question =
            button.dataset.question;


          if (!question) return;


          addMessage(
            question,
            "user"
          );


          askAI(question);

        }
      );

    }
  );


  /* -------------------------------------------------------
     ESCAPE KEY
     ------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeChat();

      }

    }
  );


})();
