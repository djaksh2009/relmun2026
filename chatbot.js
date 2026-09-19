(() => {
  const root = document.getElementById('relmun-chatbot');
  if (!root) return;

  root.innerHTML = `
    <button class="relmun-chat-button" id="rexOpen" aria-expanded="false">
      ✦ REX
    </button>

    <div class="relmun-chat-window" id="rexWindow" aria-hidden="true">

      <div class="relmun-chat-header">
        <div class="relmun-chat-title">
          <strong>REX</strong>
          <span>RELMUN '26 INFORMATION ASSISTANT</span>
        </div>

        <button
          class="relmun-chat-close"
          id="rexClose"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div class="relmun-chat-messages" id="rexMessages">

        <div class="relmun-message bot">
          Hi. I'm REX, RELMUN '26's information assistant.
          Ask me about the conference, committees, registration,
          EB or anything officially announced.
        </div>

      </div>

      <form class="relmun-chat-form" id="rexForm">

        <input
          id="rexInput"
          autocomplete="off"
          placeholder="Ask REX…"
          aria-label="Message REX"
          maxlength="1000"
        >

        <button type="submit">→</button>

      </form>

    </div>
  `;

  const open =
    document.getElementById('rexOpen');

  const win =
    document.getElementById('rexWindow');

  const close =
    document.getElementById('rexClose');

  const messages =
    document.getElementById('rexMessages');

  const form =
    document.getElementById('rexForm');

  const input =
    document.getElementById('rexInput');


  /* =====================================================
     ESCAPE HTML
  ===================================================== */

  function escapeHTML(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }


  /* =====================================================
     FORMAT REX RESPONSE
  ===================================================== */

  function formatRexMessage(text) {

    let html = escapeHTML(text);


    // Markdown links
    html = html.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );


    // Bold
    html = html.replace(
      /\*\*(.+?)\*\*/g,
      '<strong>$1</strong>'
    );


    // Italic
    html = html.replace(
      /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
      '$1<em>$2</em>'
    );


    // Bullets
    html = html.replace(
      /^[ \t]*(?:[-•])\s+(.+)$/gm,
      '<div class="rex-bullet">• $1</div>'
    );


    // Numbered lists
    html = html.replace(
      /^[ \t]*(\d+)\.\s+(.+)$/gm,
      '<div class="rex-numbered"><span>$1.</span> $2</div>'
    );


    // Headings
    html = html.replace(
      /^###\s+(.+)$/gm,
      '<div class="rex-heading">$1</div>'
    );

    html = html.replace(
      /^##\s+(.+)$/gm,
      '<div class="rex-heading">$1</div>'
    );

    html = html.replace(
      /^#\s+(.+)$/gm,
      '<div class="rex-heading">$1</div>'
    );


    // Line breaks
    html = html.replace(/\n/g, '<br>');


    return html;
  }


  /* =====================================================
     ADD MESSAGE
  ===================================================== */

  const add = (text, who) => {

    const d =
      document.createElement('div');

    d.className =
      `relmun-message ${who}`;


    if (who === 'bot') {

      d.innerHTML =
        formatRexMessage(text);

    } else {

      d.textContent =
        text;

    }


    messages.appendChild(d);

    messages.scrollTop =
      messages.scrollHeight;

    return d;
  };


  /* =====================================================
     OPEN
  ===================================================== */

  open.onclick = () => {

    const v =
      win.classList.toggle('open');

    open.setAttribute(
      'aria-expanded',
      v
    );

    win.setAttribute(
      'aria-hidden',
      !v
    );

    if (v) {
      input.focus();
    }

  };


  /* =====================================================
     CLOSE
  ===================================================== */

  close.onclick = () => {

    win.classList.remove('open');

    open.setAttribute(
      'aria-expanded',
      'false'
    );

    win.setAttribute(
      'aria-hidden',
      'true'
    );

  };


  /* =====================================================
     ESC KEY
  ===================================================== */

  document.addEventListener(
    'keydown',
    (event) => {

      if (
        event.key === 'Escape' &&
        win.classList.contains('open')
      ) {
        close.click();
      }

    }
  );


  /* =====================================================
     SEND
  ===================================================== */

  form.onsubmit = async (e) => {

    e.preventDefault();


    const q =
      input.value.trim();


    if (!q) return;


    input.value = '';


    add(q, 'user');


    /* Typing */

    const typing =
      document.createElement('div');

    typing.className =
      'relmun-message bot';

    typing.textContent =
      'REX is checking…';

    messages.appendChild(typing);

    messages.scrollTop =
      messages.scrollHeight;


    input.disabled = true;


    try {

      const r =
        await fetch(
          '/api/chat',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              message: q
            })
          }
        );


      const data =
        await r.json();


      if (!r.ok) {
        throw new Error(
          data.error ||
          'Request failed'
        );
      }


      typing.remove();


      const answer =
        typeof data.answer === 'string'
          ? data.answer.trim()
          : '';


      if (answer) {

        add(
          answer,
          'bot'
        );

      } else {

        add(
          'I do not have that information yet. Please try again.',
          'bot'
        );

      }


    } catch (err) {

      console.error(
        'REX error:',
        err
      );


      typing.textContent =
        'I’m having trouble connecting right now. Please try again, or contact @relmun.official / akshithkabilan@gmail.com.';

    }


    input.disabled = false;

    input.focus();

  };

})();
