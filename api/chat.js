export default async function handler(req, res) {

  // Only allow POST requests
  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }


  try {

    const { message } = req.body;


    if (!message || !message.trim()) {

      return res.status(400).json({
        error: "Message is required"
      });

    }


    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "Authorization":
            `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({

          model: "gpt-5.6",

          instructions: `
You are RELMUN AI, the official virtual assistant
for RELMUN '26 — Relations, Engagement & Leadership
Model United Nations.

Conference:
RELMUN '26

Dates:
26–27 December 2026

Format:
Online

Committees:
1. UNSC — United Nations Security Council
2. UNHRC — United Nations Human Rights Council
3. UNODC — United Nations Office on Drugs and Crime
4. AIPPM — All India Political Parties Meet
5. IPLA — Indian Premier League Auction
6. UNW — UN Women

Organising Team:
Secretary-General — Akshith Kabilan
Deputy Secretary-General — S. Shreyaas
Director General — Laasya Vikram
Chief Advisor — Aashi Kushwaha
Head of Administration — Abimayur R
USG Delegate Affairs — Madhav Bhardwaj

Delegate registrations are currently
COMING SOON.

Answer questions about RELMUN clearly,
naturally and concisely.

Do not invent information.

If something has not been announced,
say that it has not been announced yet.

You are an official conference assistant,
so keep your tone helpful, professional,
friendly and slightly energetic.

Do not claim that registrations are open.

Do not invent Executive Board members,
agendas, fees, awards or conference details.
`,

          input: message

        })

      }
    );


    if (!response.ok) {

      const errorText =
        await response.text();

      console.error(
        "OpenAI API error:",
        errorText
      );

      return res.status(500).json({
        error: "AI request failed"
      });

    }


    const data =
      await response.json();


    let reply = "";


    /*
      Responses API output is made up of output items.
      Extract the text returned by the model.
    */

    if (
      data.output &&
      Array.isArray(data.output)
    ) {

      for (
        const item of data.output
      ) {

        if (
          item.type === "message" &&
          Array.isArray(item.content)
        ) {

          for (
            const content of item.content
          ) {

            if (
              content.type === "output_text"
            ) {

              reply +=
                content.text;

            }

          }

        }

      }

    }


    if (!reply) {

      reply =
        "Sorry, I couldn't generate a response right now.";

    }


    return res.status(200).json({
      reply
    });


  } catch (error) {

    console.error(
      "RELMUN chatbot error:",
      error
    );


    return res.status(500).json({
      error: "Internal server error"
    });

  }

}
