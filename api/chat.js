export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    // Check that the API key exists
    if (!process.env.OPENAI_API_KEY) {

      console.error("OPENAI_API_KEY is missing");

      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured in Vercel"
      });

    }


    const { message } = req.body || {};


    if (!message || typeof message !== "string") {

      return res.status(400).json({
        error: "Message is required"
      });

    }


    console.log("Received message:", message);


    const openaiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({

          model: "gpt-5-mini",

          instructions: `
You are ASK RELMUN, the official AI assistant for RELMUN '26.

RELMUN stands for Regional Engagement & Leadership Model United Nations.

Conference:
26–27 December 2026
Online conference.

Committees:
1. UNSC — United Nations Security Council
2. UNHRC — United Nations Human Rights Council
3. UNODC — United Nations Office on Drugs and Crime
4. AIPPM — All India Political Parties Meet
5. IPLA — Indian Premier League Auction
6. UNW — UN Women

Organising team:
Secretary-General — Akshith Kabilan
Chief Advisor — Aashi Kushwaha
Deputy Secretary-General — S. Shreyaas
Director General — Laasya Vikram
Head of Administration — Abimayur R
USG, Delegate Affairs — Madhav Bhardwaj

Delegate registrations are currently coming soon.

Answer questions about RELMUN clearly and naturally.

Do not invent information.
If something has not been announced, say that it has not been announced yet.
`,

          input: message

        })
      }
    );


    const data = await openaiResponse.json();


    console.log("OpenAI status:", openaiResponse.status);


    if (!openaiResponse.ok) {

      console.error(
        "OpenAI error:",
        JSON.stringify(data)
      );

      return res.status(500).json({
        error: "OpenAI API error",
        details: data
      });

    }


    return res.status(200).json({

      answer:
        data.output_text ||
        "I couldn't generate a response."

    });


  } catch (error) {

    console.error(
      "CHAT FUNCTION ERROR:",
      error
    );

    return res.status(500).json({
      error: "Server error",
      details: error.message
    });

  }

}
