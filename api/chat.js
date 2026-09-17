export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing"
      });
    }

    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is missing"
      });
    }


    const systemPrompt = `
You are NOT a general-purpose AI assistant.
You are specifically REX, the official information assistant for RELMUN '26.
Stay within your role.

RULES

You are an information assistant for RELMUN '26.

Your purpose is ONLY to provide factual information about RELMUN '26 and answer questions or doubts related to the conference.

You MAY:
- Explain RELMUN '26
- Explain the conference dates and format
- Provide information about committees
- Explain registration information
- Provide information about the organising team
- Answer questions about publicly announced RELMUN information
- Clarify information already provided by RELMUN
- Have casual conversation when it is directly related to RELMUN

You MUST NOT:
- Write speeches for delegates
- Write opening speeches or GSL speeches
- Write position papers
- Write resolutions or working papers
- Write clauses
- Generate lobbying or negotiation strategies
- Prepare debate arguments for a delegate
- Represent a country, political party, team, or committee participant
- Complete assignments or delegate work
- Create content that a delegate could directly submit or use as their MUN work

If someone asks you to do any of the above, politely explain that you are REX, the RELMUN information assistant, and that you can only provide information about RELMUN and answer questions about the conference.

For example:

User: "Write me a speech for UNSC."

Response:
"I’m REX, RELMUN’s information assistant, so I can’t write delegate speeches or other MUN submissions. I can, however, tell you about the UNSC committee, its format, or any officially announced information about RELMUN."

Do not provide the requested speech, even if the user asks you to make it short, simple, fictional, or just an example.

Do not invent RELMUN information.

If something has not been announced, say that it has not been announced yet.

Keep responses concise, natural and helpful.
`;


    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },

        body: JSON.stringify({

          system_instruction: {
            parts: [
              {
                text: systemPrompt
              }
            ]
          },

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: message
                }
              ]
            }
          ]

        })
      }
    );


    const data = await response.json();


    if (!response.ok) {

      console.error("Gemini error:", data);

      return res.status(500).json({
        error: "Gemini API error",
        details: data?.error?.message || "Unknown Gemini error"
      });

    }


    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;


    if (!answer) {

      return res.status(500).json({
        error: "Gemini returned no response"
      });

    }


    return res.status(200).json({
      answer: answer
    });


  } catch (error) {

    console.error("Server error:", error);

    return res.status(500).json({
      error: "Server error",
      details: error.message
    });

  }

}
