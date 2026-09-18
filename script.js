(() => {

'use strict';


const OPEN_DATE =
new Date(
'2026-10-01T00:00:00+05:30'
).getTime();


const CONFERENCE_DATE =
new Date(
'2026-12-26T00:00:00+05:30'
).getTime();


document.addEventListener(
'DOMContentLoaded',
() => {


/* MOBILE NAVIGATION */

const menu =
document.getElementById('menuToggle');

const nav =
document.getElementById('navLinks');


if(menu && nav){

menu.addEventListener(
'click',
() => {

const open =
nav.classList.toggle('open');

menu.setAttribute(
'aria-expanded',
String(open)
);

}
);


nav
.querySelectorAll('a')
.forEach(
link => {

link.addEventListener(
'click',
() => {

nav.classList.remove('open');

menu.setAttribute(
'aria-expanded',
'false'
);

}
);

}
);

}


/* REGISTRATION COUNTDOWN */

const d =
document.getElementById(
'countdownDays'
);

const h =
document.getElementById(
'countdownHours'
);

const m =
document.getElementById(
'countdownMinutes'
);

const s =
document.getElementById(
'countdownSeconds'
);


const countdown =
document.getElementById(
'registrationCountdown'
);

const options =
document.getElementById(
'registrationOptions'
);

const description =
document.getElementById(
'registrationDescription'
);


function pad(n){

return String(n)
.padStart(2,'0');

}


function update(){

const diff =
OPEN_DATE - Date.now();


if(diff <= 0){

if(countdown){

countdown.style.display =
'none';

}

if(options){

options.classList.add(
'open'
);

}

if(description){

description.textContent =
'Delegate registrations for RELMUN 2026 are now open.';

}

return;

}


const sec =
Math.floor(diff / 1000);


if(d){

d.textContent =
pad(
Math.floor(sec / 86400)
);

}


if(h){

h.textContent =
pad(
Math.floor(
sec % 86400 / 3600
)
);

}


if(m){

m.textContent =
pad(
Math.floor(
sec % 3600 / 60
)
);

}


if(s){

s.textContent =
pad(
sec % 60
);

}

}


if(countdown){

update();

setInterval(
update,
1000
);

}


/* FAQ ACCORDION */

document
.querySelectorAll(
'.faq-question'
)
.forEach(
question => {

question.addEventListener(
'click',
() => {

const item =
question.closest(
'.faq-item'
);

const answer =
item.querySelector(
'.faq-answer'
);

const open =
question.getAttribute(
'aria-expanded'
) === 'true';


document
.querySelectorAll(
'.faq-item'
)
.forEach(
other => {

if(other !== item){

other
.querySelector(
'.faq-question'
)
.setAttribute(
'aria-expanded',
'false'
);

other.classList.remove(
'open'
);

other
.querySelector(
'.faq-answer'
)
.style.maxHeight =
null;

}

}
);


question.setAttribute(
'aria-expanded',
String(!open)
);

item.classList.toggle(
'open',
!open
);

answer.style.maxHeight =
open
? null
: answer.scrollHeight + 'px';

}
);

}
);

});

})();
