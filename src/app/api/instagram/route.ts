export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    console.log("Angefragter Username:", username);

    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      console.error("❌ RAPIDAPI_KEY ist nicht gesetzt!");
      return Response.json(
        { error: "Fehlende API-Zugangsdaten" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://rocketapi-for-developers.p.rapidapi.com/instagram/user/get_info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "rocketapi-for-developers.p.rapidapi.com",
        },
        body: JSON.stringify({ username }),
      }
    );

    if (!response.ok) {
      console.error(`❌ API-Fehler: ${response.status}`);
      return Response.json(
        { error: `API-Fehler: ${response.status}` },
        { status: response.status }
      );
    }

    const text = await response.text();
    console.log("API Antwort:", text);

    try {
      const data = JSON.parse(text);
      return Response.json(data);
    } catch (parseError) {
      console.error("❌ Fehler beim Parsen der API-Antwort:", parseError);
      return Response.json(
        { error: "Ungültige API-Antwort" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("❌ Fehler in der API-Route:", error);
    if (error instanceof Error) {
      return Response.json(
        { error: "Instagram API nicht erreichbar", details: error.message },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: "Instagram API nicht erreichbar", details: String(error) },
        { status: 500 }
      );
    }
  }
}
