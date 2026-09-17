document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById("relmun-chatbot");

  if (!root) return;


  /* =========================================
     CHATBOT HTML
  ========================================= */

  root.innerHTML = `

    <button
      class="relmun-chat-button"
      id="relmunChatButton"
      type="button"
      aria-label="Open ASK RELMUN"
    >
      <span>✦</span>
      ASK RELMUN
    </button>


    <div
      class="relmun-chat-window"
      id="relmunChatWindow"
      aria-hidden="true"
    >

      <div class="relmun-chat-header">

        <div class="relmun-chat-brand">

          <div class="relmun-chat-icon">
            ✦
          </div>

          <div>
            <strong>ASK RELMUN</strong>

            <span>
              RELMUN '26 AI ASSISTANT
            </span>
          </div>

        </div>


        <button
          id="relmunChatClose"
          class="relmun-chat-close"
          type="button"
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

          <div class="message-content">

            <p>
              Hey! I'm <strong>ASK RELMUN</strong>. 👋
            </p>

            <p>
              Ask me anything about RELMUN '26,
              committees, registration, the team,
              or the conference.
            </p>

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
          aria-label="Send message"
        >
          ↑
        </button>

      </form>

    </div>

  `;


  /* =========================================
     ELEMENTS
  ========================================= */

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


  /* =========================================
     OPEN CHAT
  ========================================= */

  button.addEventListener("click", () => {

    windowBox.classList.add("open");

    windowBox.setAttribute(
      "aria-hidden",
      "false"
    );

    input.focus();

  });


  /* =========================================
     CLOSE CHAT
  ========================================= */

  close.addEventListener("click", () => {

    windowBox.classList.remove("open");

    windowBox.setAttribute(
      "aria-hidden",
      "true"
    );

  });


  /* =========================================
     ESCAPE KEY
  ========================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      windowBox.classList.remove("open");

      windowBox.setAttribute(
        "aria-hidden",
        "true"
      );

    }

  });


  /* =========================================
     MARKDOWN PARSER
  ========================================= */

  function markdownToHTML(markdown) {

    if (!markdown) return "";


    /*
      Escape HTML first.
      This prevents the AI response from
      injecting arbitrary HTML into the page.
    */

    let text = markdown
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");


    /*
      CODE BLOCKS
    */

    const codeBlocks = [];

    text = text.replace(
      /```([\s\S]*?)```/g,
      (match, code) => {

        const index =
          codeBlocks.length;

        codeBlocks.push(code.trim());

        return `@@CODEBLOCK${index}@@`;

      }
    );


    /*
      INLINE CODE
    */

    text = text.replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    );


    /*
      HEADINGS
    */

    text = text.replace(
      /^### (.+)$/gm,
      "<h4>$1</h4>"
    );

    text = text.replace(
      /^## (.+)$/gm,
      "<h3>$1</h3>"
    );

    text = text.replace(
      /^# (.+)$/gm,
      "<h3>$1</h3>"
    );


    /*
      BOLD + ITALIC
    */

    text = text.replace(
      /\*\*\*(.+?)\*\*\*/g,
      "<strong><em>$1</em></strong>"
    );

    text = text.replace(
      /\*\*(.+?)\*\*/g,
      "<strong>$1</strong>"
    );

    text = text.replace(
      /__(.+?)__/g,
      "<strong>$1</strong>"
    );

    text = text.replace(
      /\*(.+?)\*/g,
      "<em>$1</em>"
    );

    text = text.replace(
      /_(.+?)_/g,
      "<em>$1</em>"
    );


    /*
      LINKS
    */

    text = text.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>'
    );


    /*
      HORIZONTAL RULE
    */

    text = text.replace(
      /^---$/gm,
      "<hr>"
    );


    /*
      PROCESS LINE BY LINE
    */

    const lines =
      text.split("\n");

    let html = "";

    let inUnorderedList = false;
    let inOrderedList = false;


    function closeLists() {

      if (inUnorderedList) {

        html += "</ul>";

        inUnorderedList = false;

      }

      if (inOrderedList) {

        html += "</ol>";

        inOrderedList = false;

      }

    }


    lines.forEach((line) => {

      const trimmed =
        line.trim();


      /*
        Empty line
      */

      if (!trimmed) {

        closeLists();

        return;

      }


      /*
        Unordered list
      */

      if (
        trimmed.startsWith("- ") ||
        trimmed.startsWith("* ")
      ) {

        if (inOrderedList) {

          html += "</ol>";

          inOrderedList = false;

        }

        if (!inUnorderedList) {

          html += "<ul>";

          inUnorderedList = true;

        }

        html +=
          `<li>${trimmed.substring(2)}</li>`;

        return;

      }


      /*
        Ordered list
      */

      const orderedMatch =
        trimmed.match(/^(\d+)\.\s+(.+)$/);

      if (orderedMatch) {

        if (inUnorderedList) {

          html += "</ul>";

          inUnorderedList = false;

        }

        if (!inOrderedList) {

          html += "<ol>";

          inOrderedList = true;

        }

        html +=
          `<li>${orderedMatch[2]}</li>`;

        return;

      }


      /*
        Headings
      */

      if (
        trimmed.startsWith("<h3>") ||
        trimmed.startsWith("<h4>") ||
        trimmed === "<hr>"
      ) {

        closeLists();

        html += trimmed;

        return;

      }


      /*
        Code block placeholder
      */

      if (
        trimmed.startsWith("@@CODEBLOCK") &&
        trimmed.endsWith("@@")
      ) {

        closeLists();

        html += trimmed;

        return;

      }


      /*
        Normal paragraph
      */

      closeLists();

      html +=
        `<p>${trimmed}</p>`;

    });


    closeLists();


    /*
      Restore code blocks
    */

    codeBlocks.forEach(
      (code, index) => {

        const escapedCode =
          code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        html = html.replace(
          `@@CODEBLOCK${index}@@`,
          `<pre><code>${escapedCode}</code></pre>`
        );

      }
    );


    return html;

  }


  /* =========================================
     ADD MESSAGE
  ========================================= */

  function addMessage(text, type) {

    const message =
      document.createElement("div");

    message.className =
      `relmun-message ${type}`;


    const content =
      document.createElement("div");

    content.className =
      "message-content";


    if (type === "bot") {

      content.innerHTML =
        markdownToHTML(text);

    } else {

      content.textContent =
        text;

    }


    message.appendChild(content);

    messagesBox.appendChild(message);


    messagesBox.scrollTop =
      messagesBox.scrollHeight;


    return message;

  }


  /* =========================================
     TYPING INDICATOR
  ========================================= */

  function addTyping() {

    const typing =
      document.createElement("div");

    typing.className =
      "relmun-message bot typing";

    typing.id =
      "relmunTyping";


    typing.innerHTML = `

      <div class="message-content">

        <div class="relmun-thinking">

          <span></span>
          <span></span>
          <span></span>

          <small>
            ASK RELMUN IS THINKING
          </small>

        </div>

      </div>

    `;


    messagesBox.appendChild(typing);

    messagesBox.scrollTop =
      messagesBox.scrollHeight;

  }


  /* =========================================
     REMOVE TYPING
  ========================================= */

  function removeTyping() {

    const typing =
      document.getElementById(
        "relmunTyping"
      );

    if (typing) {

      typing.remove();

    }

  }


  /* =========================================
     SEND MESSAGE
  ========================================= */

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const text =
        input.value.trim();


      if (!text) return;


      /*
        Show user message
      */

      addMessage(
        text,
        "user"
      );


      /*
        Clear input
      */

      input.value = "";


      /*
        Disable input while waiting
      */

      input.disabled = true;


      const sendButton =
        form.querySelector("button");

      sendButton.disabled = true;


      /*
        Typing animation
      */

      addTyping();


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

              body: JSON.stringify({
                message: text
              })

            }
          );


        /*
          Try to parse JSON
        */

        let data;

        try {

          data =
            await response.json();

        } catch {

          throw new Error(
            "The server returned an invalid response."
          );

        }


        removeTyping();


        /*
          API error
        */

        if (!response.ok) {

          console.error(
            "ASK RELMUN API error:",
            data
          );


          throw new Error(
            data.details ||
            data.error ||
            "Request failed."
          );

        }


        /*
          Backend returns:
          { answer: "..." }
        */

        const reply =
          data.answer;


        if (!reply) {

          throw new Error(
            "The AI returned an empty response."
          );

        }


        /*
          Display AI response
        */

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
          "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          "bot"
        );

      } finally {

        /*
          Re-enable input
        */

        input.disabled = false;

        sendButton.disabled = false;

        input.focus();

      }

    }
  );

});
