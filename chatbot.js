(() => {

'use strict';


const root =
document.getElementById(
'relmun-chatbot'
);


if(!root){

return;

}


root.innerHTML = `

<button
class="relmun-chat-button"
id="rexOpen"
aria-label="Open REX"
aria-expanded="false"
>
✦ REX
</button>


<div
class="relmun-chat-window"
id="rexWindow"
aria-hidden="true"
>

<div class="relmun-chat-header">

<div class="relmun-chat-title">

<strong>
REX
</strong>

<span>
RELMUN 2026 INFORMATION ASSISTANT
</span>

</div>


<button
class="relmun-chat-close"
id="rexClose"
aria-label="Close"
>
×
</button>

</div>


<div
class="relmun-chat-messages"
id="rexMessages"
>

<div class="relmun-message bot">

Hi. I'm REX, RELMUN 2026's information assistant.
Ask me about the conference, committees, registration
or officially announced information.

</div>

</div>


<form
class="relmun-chat-input"
id="rexForm"
>

<input
id="rexInput"
maxlength="1000"
autocomplete="off"
placeholder="Ask about RELMUN..."
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


const open =
document.getElementById(
'rexOpen'
);

const win =
document.getElementById(
'rexWindow'
);

const close =
document.getElementById(
'rexClose'
);

const messages =
document.getElementById(
'rexMessages'
);

const form =
document.getElementById(
'rexForm'
);

const input =
document.getElementById(
'rexInput'
);


function add(text,who){

const element =
document.createElement(
'div'
);

element.className =
'relmun-message ' + who;

element.textContent =
text;

messages.appendChild(
element
);

messages.scrollTop =
messages.scrollHeight;

}


open.onclick = () => {

const visible =
win.classList.toggle(
'open'
);

open.setAttribute(
'aria-expanded',
String(visible)
);

win.setAttribute(
'aria-hidden',
String(!visible)
);

if(visible){

input.focus();

}

};


close.onclick = () => {

win.classList.remove(
'open'
);

open.setAttribute(
'aria-expanded',
'false'
);

win.setAttribute(
'aria-hidden',
'true'
);

};


form.onsubmit =
async event => {

event.preventDefault();


const question =
input.value.trim();


if(!question){

return;

}


input.value = '';

add(
question,
'user'
);


const typing =
document.createElement(
'div'
);

typing.className =
'relmun-message bot typing';

typing.textContent =
'REX is checking…';

messages.appendChild(
typing
);

messages.scrollTop =
messages.scrollHeight;


try{

const response =
await fetch(
'/api/chat',
{
method:'POST',
headers:{
'Content-Type':
'application/json'
},
body:JSON.stringify({
message:question
})
}
);


const data =
await response.json();


if(!response.ok){

throw new Error(
data.error ||
'Request failed'
);

}


typing.remove();


add(
data.answer ||
'I do not have that information yet.',
'bot'
);


}catch(error){

typing.textContent =
'I’m having trouble connecting right now. Please try again or contact @relmun.official / akshithkabilan@gmail.com.';

}

};

})();
