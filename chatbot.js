document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById("relmun-chatbot");

  if (!root) return;

  root.innerHTML = `

    <button class="relmun-chat-button" id="relmunChatButton">
      <span>✦</span>
      ASK RELMUN
    </button>

    <div class="relmun-chat-window" id="relmunChatWindow">

      <div class="relmun-chat-header">

        <div>
          <strong>ASK RELMUN</strong>
          <span>RELMUN '26 AI ASSISTANT</span>
        </div>

        <button id="relmunChatClose" aria-label="Close chatbot">
          ×
        </button>

      </div>


      <div
        class="relmun-chat-messages"
        id="relmunChatMessages"
      >

        <div class="relmun-message bot">

          <p>
            Hey! I'm ASK RELMUN. 👋
          </p>

          <p>
            Ask me anything about RELMUN '26,
            the committees, registration,
            or the conference.
          </p>

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
        >

        <button type="submit" aria-label="Send message">
          ↑
        </button>

      </form>

    </div>

  `;


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


  /* --------------------------------
     OPEN / CLOSE
  -------------------------------- */

  button.addEventListener("click", () => {

    windowBox.classList.add("open");

    input.focus();

  });


  close.addEventListener("click", () => {

    windowBox.classList.remove("open");

  });


  /* --------------------------------
     ADD MESSAGE
  -------------------------------- */

  function addMessage(text, type) {

    const message =
      document.createElement("div");

    message.className =
      `relmun-message ${type}`;

    message.textContent = text;

    messagesBox.appendChild(message);

    messagesBox.scrollTop =
      messagesBox.scrollHeight;

    return message;

  }


  /* --------------------------------
     TYPING INDICATOR
  -------------------------------- */

  function addTyping() {

    const typing =
      document.createElement("div");

    typing.className =
      "relmun-message bot typing";

    typing.id =
      "relmunTyping";

    typing.textContent =
      "Thinking...";

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


  /* --------------------------------
     SEND MESSAGE
  -------------------------------- */

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const text =
        input.value.trim();


      if (!text) return;


      /* Show user's message */

      addMessage(
        text,
        "user"
      );


      /* Clear input */

      input.value = "";


      /* Show typing */

      addTyping();


      try {

        const response =
          await fetch(
            "/api/chat",
            {

              method: "POST",

              headers: {
                "Content-Type": "application/json"
              },

              /*
               * IMPORTANT:
               * Backend expects "message"
               */
              body: JSON.stringify({

                message: text

              })

            }
          );


        const data =
          await response.json();


        removeTyping();


        /* Handle API errors */

        if (!response.ok) {

          console.error(
            "ASK RELMUN API error:",
            data
          );

          throw new Error(
            data.error ||
            "Request failed"
          );

        }


        /*
         * Backend returns "answer"
         */
        const reply =
          data.answer ||
          "I couldn't generate a response.";


        addMessage(
          reply,
          "bot"
        );


      } catch (error) {

        removeTyping();


        console.error(
          "ASK RELMUN error:",
          error
        );


        addMessage(
          "Sorry, I'm having trouble connecting right now. Please try again.",
          "bot"
        );

      }

    }
  );

});
