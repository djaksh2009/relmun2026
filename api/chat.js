const lastRequests = new Map();

const COOLDOWN_MS = 2500;


export default async function handler(
req,
res
){

if(req.method !== 'POST'){

return res
.status(405)
.json({
error:'Method not allowed'
});

}


try{

const apiKey =
process.env.GEMINI_API_KEY;


if(!apiKey){

return res
.status(500)
.json({
error:'REX is temporarily unavailable.'
});

}


let body =
req.body;


if(typeof body === 'string'){

try{

body =
JSON.parse(body);

}catch{

return res
.status(400)
.json({
error:'Invalid request.'
});

}

}


const message =
typeof body?.message === 'string'
? body.message.trim()
: '';


if(!message){

return res
.status(400)
.json({
error:'Please enter a message.'
});

}


if(message.length > 1000){

return res
.status(400)
.json({
error:
'Please keep your message under 1000 characters.'
});

}


/* BASIC RATE LIMIT */

const forwarded =
req.headers['x-forwarded-for'];


const ip =
typeof forwarded === 'string'
? forwarded.split(',')[0].trim()
: (
req.socket?.remoteAddress ||
'unknown'
);


const now =
Date.now();


const previous =
lastRequests.get(ip);


if(
previous &&
now - previous < COOLDOWN_MS
){

return res
.status(429)
.json({
error:
`REX needs a second. Please try again in ${Math.ceil(
(
COOLDOWN_MS -
(now - previous)
) / 1000
)}s.`
});

}


lastRequests.set(
ip,
now
);


/* REX SYSTEM PROMPT */

const systemPrompt = `

You are REX, the official information assistant for RELMUN 2026.

Your ONLY job is to provide factual information about RELMUN
and officially announced conference information.

Do not act as a general-purpose assistant.


OFFICIAL INFORMATION:

- Full name:
  Regional Engagement & Leadership Model United Nations.

- Dates:
  26–27 December 2026.

- Format:
  Online conference.

- Delegate registration opens:
  1 October 2026 at 00:00 IST.

- Registration:
  Free.

- Registration options after opening:
  RELMUN website,
  ChampArena,
  MyMUN,
  Gavelling,
  official Google Form.

- Committees:
  UNSC,
  UNHRC,
  UNODC,
  AIPPM,
  UNW,
  IPLA.

- UNW:
  UN Women.

- IPLA:
  Indian Premier League Auction.

- Certificates:
  Provided to participants.

- Portfolio lists:
  Will be added later.

- Instagram:
  https://www.instagram.com/relmun.official/

- Email:
  akshithkabilan@gmail.com.


ORGANIZING COMMITTEE:

- Akshith Kabilan — Secretary-General.
- S. Shreyaas — Deputy Secretary-General.
- Laasya Vikram — Director General.
- Abimayur R — Head of Administration.
- Aashi Kushwaha — Chief Advisor.
- Madhav Bhardwaj — USG — Delegate Affairs.


EXECUTIVE BOARD:

Committee-specific EB names are not currently announced
on the public site.

Do not invent names.


ROLE LIMITS:

Answer only RELMUN questions.

Do not write:
- speeches
- position papers
- resolutions
- clauses
- lobbying plans
- debate arguments
- other MUN work a delegate could submit
  or directly use.

If asked for those things, say that you can only provide
RELMUN information.

Never invent missing information.

If asked about registration before 1 October,
clearly state that registrations open on 1 October 2026.

Keep replies concise and natural.

`;


const response =
await fetch(
'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent',
{
method:'POST',

headers:{
'Content-Type':
'application/json',

'x-goog-api-key':
apiKey
},

body:JSON.stringify({

system_instruction:{
parts:[
{
text:systemPrompt
}
]
},

contents:[
{
role:'user',

parts:[
{
text:message
}
]
}
],

generationConfig:{
temperature:.2,
maxOutputTokens:500
}

})
}
);


const data =
await response.json();


if(!response.ok){

return res
.status(
response.status === 429
? 429
: 500
)
.json({
error:
data?.error?.message ||
'Gemini API error'
});

}


const answer =
data
?.candidates?.[0]
?.content
?.parts?.[0]
?.text;


if(!answer){

return res
.status(500)
.json({
error:
'REX returned no response.'
});

}


return res
.status(200)
.json({
answer
});


}catch(error){

return res
.status(500)
.json({
error:
'REX is temporarily unavailable.'
});

}

}
