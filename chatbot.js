/* =========================================
   RELMUN '26 — REX
========================================= */

(function(){

  const container =
    document.getElementById("relmun-chatbot");

  if(!container) return;


  /* ========================================
     CHATBOT CSS
  ======================================== */

  const style =
    document.createElement("style");

  style.textContent = `

    #relmun-chatbot{
      position:relative;
      z-index:2000;
    }

    .rex-button{
      position:fixed;
      right:24px;
      bottom:24px;
      z-index:2001;

      border:1px solid #c79a2b;
      background:#03070c;
      color:#f1ece0;

      padding:14px 22px;

      font-family:DM Mono,monospace;
      font-size:10px;
      letter-spacing:.12em;

      border-radius:30px;

      box-shadow:0 10px 35px rgba(0,0,0,.35);

      transition:.25s;
    }

    .rex-button:hover{
      background:#c79a2b;
      color:#03070c;
      transform:translateY(-3px);
    }


    .rex-window{
      position:fixed;
      right:24px;
      bottom:85px;

      width:min(430px,calc(100vw - 30px));
      height:min(650px,calc(100vh - 110px));

      background:#07101a;

      border:1px solid rgba(199,154,43,.45);

      box-shadow:
        0 25px 80px rgba(0,0,0,.55);

      display:none;
      flex-direction:column;

      overflow:hidden;

      z-index:2000;
    }

    .rex-window.open{
      display:flex;
    }


    .rex-header{
      padding:20px;

      border-bottom:1px solid rgba(241,236,224,.12);

      display:flex;
      align-items:center;
      justify-content:space-between;

      background:#050c14;
    }

    .rex-header small{
      display:block;

      color:#c79a2b;

      font-family:DM Mono,monospace;
      font-size:8px;
      letter-spacing:.16em;
    }

    .rex-header strong{
      display:block;
      margin-top:5px;

      font-size:17px;
      letter-spacing:-.02em;
    }

    .rex-close{
      border:0;
      background:none;
      color:#f1ece0;

      font-size:25px;
    }


    .rex-messages{
      flex:1;
      overflow-y:auto;

      padding:18px;

      display:flex;
      flex-direction:column;
      gap:12px;
    }


    .rex-message{
      max-width:78%;

      padding:14px 16px;

      border:1px solid rgba(241,236,224,.1);

      line-height:1.55;

      font-size:13px;

      white-space:pre-wrap;

      word-break:break-word;
    }


    .rex-message.bot{
      align-self:flex-start;

      background:#0c1722;

      border-radius:2px 16px 16px 16px;

      color:#e7e1d5;
    }


    .rex-message.user{
      align-self:flex-end;

      background:#1846ff;

      border-color:#315aff;

      border-radius:16px 2px 16px 16px;

      color:white;

      /* IMPORTANT:
         width follows message size */
      width:max-content;
      max-width:78%;
    }


    .rex-input-area{
      border-top:1px solid rgba(241,236,224,.12);

      padding:12px;

      background:#050c14;
    }


    .rex-form{
      display:flex;
      align-items:center;
      gap:8px;
    }


    .rex-input{
      flex:1;

      min-width:0;

      border:1px solid rgba(199,154,43,.4);

      background:#0a1016;

      color:#f1ece0;

      outline:none;

      padding:13px 15px;

      border-radius:25px;
    }

    .rex-input:focus{
      border-color:#c79a2b;
    }


    .rex-send{
      width:43px;
      height:43px;

      border:1px solid #c79a2b;

      border-radius:50%;

      background:#c79a2b;

      color:#03070c;

      font-size:17px;
    }


    .rex-typing{
      align-self:flex-start;

      color:#8c929b;

      font-family:DM Mono,monospace;

      font-size:9px;

      padding:8px;
    }


    @media(max-width:600px){

      .rex-window{
        right:10px;
        bottom:75px;

        width:calc(100vw - 20px);
        height:calc(100vh - 100px);
      }

      .rex-button{
        right:15px;
        bottom:15px;
      }

    }

  `;

  document.head.appendChild(style);



  /* ========================================
     HTML
  ======================================== */

  container.innerHTML = `

    <button
      class="rex-button"
      id="rexOpen"
      aria-label="Open REX"
    >
      ✦ REX
    </button>


    <div
      class="rex-window"
      id="rexWindow"
      aria-hidden="true"
    >

      <div class="rex-header">

        <div>

          <small>
            RELMUN '26
          </small>

          <strong>
            REX
          </strong>

        </div>


        <button
          class="rex-close"
          id="rexClose"
          aria-label="Close REX"
        >
          ×
        </button>

      </div>


      <div
        class="rex-messages"
        id="rexMessages"
      >

        <div class="rex-message bot">
Hey! I'm REX 👋

Ask me anything about RELMUN '26, committees, registration, the team, or the conference.
        </div>

      </div>


      <div class="rex-input-area">

        <form
          class="rex-form"
          id="rexForm"
        >

          <input
            class="rex-input"
            id="rexInput"
            type="text"
            placeholder="Ask about RELMUN..."
            autocomplete="off"
            aria-label="Ask REX"
          >

          <button
            class="rex-send"
            type="submit"
            aria-label="Send message"
          >
            ↑
          </button>

        </form>

      </div>

    </div>

  `;



  const openButton =
    document.getElementById("rexOpen");

  const closeButton =
    document.getElementById("rexClose");

  const windowElement =
    document.getElementById("rexWindow");

  const messages =
    document.getElementById("rexMessages");

  const form =
    document.getElementById("rexForm");

  const input =
    document.getElementById("rexInput");



  /* ========================================
     OPEN / CLOSE
  ======================================== */

  openButton.addEventListener("click", () => {

    windowElement.classList.add("open");

    windowElement.setAttribute(
      "aria-hidden",
      "false"
    );

    setTimeout(() => input.focus(),100);

  });


  closeButton.addEventListener("click", () => {

    windowElement.classList.remove("open");

    windowElement.setAttribute(
      "aria-hidden",
      "true"
    );

  });



  /* ========================================
     ADD MESSAGE
  ======================================== */

  function addMessage(text,type){

    const message =
      document.createElement("div");

    message.className =
      `rex-message ${type}`;

    message.textContent =
      text;

    messages.appendChild(message);

    messages.scrollTop =
      messages.scrollHeight;

  }



  /* ========================================
     API
  ======================================== */

  async function askRex(message){

    const response =
      await fetch(
        "/api/chat",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            message
          })
        }
      );


    if(!response.ok){
      throw new Error("API request failed");
    }


    const data =
      await response.json();


    return data.answer ||
      "I couldn't find an answer to that.";

  }



  /* ========================================
     SUBMIT
  ======================================== */

  form.addEventListener("submit", async event => {

    event.preventDefault();


    const message =
      input.value.trim();


    if(!message) return;


    addMessage(
      message,
      "user"
    );


    input.value = "";


    const typing =
      document.createElement("div");

    typing.className =
      "rex-typing";

    typing.textContent =
      "REX IS THINKING...";

    messages.appendChild(typing);

    messages.scrollTop =
      messages.scrollHeight;


    try{

      const answer =
        await askRex(message);

      typing.remove();

      addMessage(
        answer,
        "bot"
      );

    }catch(error){

      console.error(error);

      typing.remove();

      addMessage(
        "I'm having trouble connecting right now. Please try again in a moment.",
        "bot"
      );

    }

  });

})();
