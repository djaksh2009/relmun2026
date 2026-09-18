document.addEventListener(
  "DOMContentLoaded",
  () => {

    const root =
      document.getElementById(
        "relmun-chatbot"
      );

    if (!root) return;


    root.innerHTML = `

      <button
        class="relmun-chat-button"
        id="relmunChatButton"
        aria-label="Open REX"
      >
        <span>✦</span>
        REX
      </button>


      <div
        class="relmun-chat-window"
        id="relmunChatWindow"
      >

        <div class="relmun-chat-header">

          <div class="relmun-chat-title">

            <strong>REX</strong>

            <span>
              RELMUN '26 INFORMATION ASSISTANT
            </span>

          </div>


          <button
            class="relmun-chat-close"
            id="relmunChatClose"
            aria-label="Close REX"
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

              Hey! I’m <strong>REX.</strong> 👋

              <br><br>

              Ask me anything about
              RELMUN '26, committees,
              registration, the team,
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
            maxlength="1000"
          >

          <button
            type="submit"
            aria-label="Send"
          >
            ↑
          </button>

        </form>

      </div>

    `;


    const style =
      document.createElement("style");


    style.textContent = `

      .relmun-chat-button {

        position: fixed;

        right: 28px;
        bottom: 28px;

        z-index: 99999;

        padding: 13px 20px;

        border:
          1px solid #c79a2b;

        border-radius: 999px;

        background: #080808;

        color: #f1ece0;

        font-family: "Manrope",
          sans-serif;

        font-size: 11px;

        font-weight: 700;

        letter-spacing: .14em;

        cursor: pointer;

        transition:
          .25s ease;

      }


      .relmun-chat-button span {

        color: #c79a2b;

        margin-right: 7px;

      }


      .relmun-chat-button:hover {

        background: #c79a2b;

        color: #080808;

        transform:
          translateY(-3px);

      }


      .relmun-chat-button:hover span {

        color: #080808;

      }


      .relmun-chat-window {

        position: fixed;

        right: 28px;
        bottom: 28px;

        width:
          min(430px,
          calc(100vw - 40px));

        height:
          min(650px,
          calc(100vh - 50px));

        z-index: 100000;

        display: flex;

        flex-direction: column;

        background: #0b0b0b;

        border:
          1px solid
          rgba(241,236,224,.16);

        box-shadow:
          0 30px 90px
          rgba(0,0,0,.6);

        opacity: 0;

        visibility: hidden;

        transform:
          translateY(20px)
          scale(.98);

        transition:
          .25s ease;

      }


      .relmun-chat-window.open {

        opacity: 1;

        visibility: visible;

        transform:
          translateY(0)
          scale(1);

      }


      .relmun-chat-header {

        display: flex;

        align-items: center;

        justify-content:
          space-between;

        padding: 20px;

        border-bottom:
          1px solid
          rgba(241,236,224,.1);

      }


      .relmun-chat-title {

        display: flex;

        flex-direction: column;

        gap: 5px;

      }


      .relmun-chat-title strong {

        color: #f1ece0;

        font-family:
          "Cormorant Garamond",
          serif;

        font-size: 29px;

        font-weight: 500;

        line-height: .8;

      }


      .relmun-chat-title span {

        color: #8e8b83;

        font-size: 8px;

        letter-spacing: .14em;

      }


      .relmun-chat-close {

        width: 34px;
        height: 34px;

        border: 0;

        background:
          transparent;

        color: #f1ece0;

        font-size: 27px;

        cursor: pointer;

        transition: .2s ease;

      }


      .relmun-chat-close:hover {

        color: #c79a2b;

        transform:
          rotate(90deg);

      }


      .relmun-chat-messages {

        flex: 1;

        overflow-y: auto;

        padding: 24px 18px;

        display: flex;

        flex-direction: column;

        gap: 14px;

      }


      .relmun-message {

        font-family:
          "Manrope",
          sans-serif;

        font-size: 14px;

        line-height: 1.6;

        word-break: break-word;

        box-sizing: border-box;

      }


      .relmun-message.bot {

        align-self: flex-start;

        width: fit-content;

        max-width: 86%;

        padding: 16px 18px;

        border:
          1px solid
          rgba(241,236,224,.1);

        border-radius:
          18px 18px 18px 5px;

        background: #171717;

        color: #e8e4da;

      }


      .relmun-message.user {

        align-self: flex-end;

        width: fit-content;

        max-width: 78%;

        padding: 12px 17px;

        border-radius:
          17px 17px 5px 17px;

        background: #1846ff;

        color: #fff;

        white-space: pre-wrap;

        overflow-wrap:
          anywhere;

      }


      .relmun-markdown strong {

        color: #f1ece0;

        font-weight: 700;

      }


      .relmun-markdown p {

        margin:
          0 0 8px;

      }


      .relmun-message.typing {

        color: #9b978e;

        font-style: italic;

      }


      .relmun-typing-dots {

        display: inline-flex;

        gap: 4px;

      }


      .relmun-typing-dots span {

        width: 5px;
        height: 5px;

        border-radius: 50%;

        background: #c79a2b;

        animation:
          rexTyping 1.2s infinite;

      }


      .relmun-typing-dots span:nth-child(2) {

        animation-delay:
          .15s;

      }


      .relmun-typing-dots span:nth-child(3) {

        animation-delay:
          .3s;

      }


      @keyframes rexTyping {

        0%,60%,100% {

          opacity: .25;

          transform:
            translateY(0);

        }

        30% {

          opacity: 1;

          transform:
            translateY(-3px);

        }

      }


      .relmun-chat-input {

        display: flex;

        gap: 8px;

        padding: 14px 16px 16px;

        border-top:
          1px solid
          rgba(241,236,224,.1);

      }


      .relmun-chat-input input {

        flex: 1;

        min-width: 0;

        height: 50px;

        padding:
          0 17px;

        border:
          1px solid #5e4b15;

        border-radius: 25px;

        outline: none;

        background: #151515;

        color: #f1ece0;

        font-size: 14px;

      }


      .relmun-chat-input input:focus {

        border-color:
          #c79a2b;

      }


      .relmun-chat-input button {

        width: 50px;
        height: 50px;

        flex-shrink: 0;

        border: 0;

        border-radius: 50%;

        background: #c79a2b;

        color: #080808;

        font-size: 21px;

        cursor: pointer;

      }


      @media(max-width:600px) {

        .relmun-chat-button {

          right: 16px;
          bottom: 16px;

        }

        .relmun-chat-window {

          right: 10px;
          bottom: 10px;

          width:
            calc(100vw - 20px);

          height:
            calc(100vh - 20px);

        }

      }

    `;


    document.head.appendChild(style);


    const button =
      document.getElementById(
        "relmunChatButton"
      );

    const windowBox =
      document.getElementById(
        "relmunChatWindow"
      );

    const close =
      document.getElementById(
        "relmunChatClose"
      );

    const form =
      document.getElementById(
        "relmunChatForm"
      );

    const input =
      document.getElementById(
        "relmunChatInput"
      );

    const messages =
      document.getElementById(
        "relmunChatMessages"
      );


    button.addEventListener(
      "click",
      () => {

        windowBox.classList.add(
          "open"
        );

        setTimeout(
          () => input.focus(),
          100
        );

      }
    );


    close.addEventListener(
      "click",
      () => {

        windowBox.classList.remove(
          "open"
        );

      }
    );


    function escapeHTML(text) {

      return text

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(
          /"/g,
          "&quot;"
        )

        .replace(
          /'/g,
          "&#039;"
        );

    }


    function markdown(text) {

      let html =
        escapeHTML(text);


      html =
        html.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );


      html =
        html.replace(
          /\n/g,
          "<br>"
        );


      return html;

    }


    function addMessage(
      text,
      type
    ) {

      const bubble =
        document.createElement(
          "div"
        );

      bubble.className =
        `relmun-message ${type}`;


      if (type === "bot") {

        const content =
          document.createElement(
            "div"
          );

        content.className =
          "relmun-markdown";

        content.innerHTML =
          markdown(text);

        bubble.appendChild(
          content
        );

      } else {

        bubble.textContent =
          text;

      }


      messages.appendChild(
        bubble
      );

      messages.scrollTop =
        messages.scrollHeight;

    }


    function typing() {

      removeTyping();


      const bubble =
        document.createElement(
          "div"
        );

      bubble.id =
        "relmunTyping";

      bubble.className =
        "relmun-message bot typing";


      bubble.innerHTML = `

        Thinking

        <span
          class="relmun-typing-dots"
        >

          <span></span>
          <span></span>
          <span></span>

        </span>

      `;


      messages.appendChild(
        bubble
      );

      messages.scrollTop =
        messages.scrollHeight;

    }


    function removeTyping() {

      const existing =
        document.getElementById(
          "relmunTyping"
        );

      if (existing)
        existing.remove();

    }


    form.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const message =
          input.value.trim();


        if (!message)
          return;


        addMessage(
          message,
          "user"
        );


        input.value = "";

        input.disabled = true;


        typing();


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
                    message
                  })
              }
            );


          const data =
            await response.json();


          removeTyping();


          if (!response.ok) {

            throw new Error(
              data.error ||
              "Request failed"
            );

          }


          addMessage(
            data.answer ||
            "I couldn't generate a response.",
            "bot"
          );


        } catch (error) {

          console.error(
            "REX error:",
            error
          );


          removeTyping();


          addMessage(
            "Sorry, I’m having trouble connecting right now. Please try again.",
            "bot"
          );

        } finally {

          input.disabled = false;

          input.focus();

        }

      }
    );

  }
);
