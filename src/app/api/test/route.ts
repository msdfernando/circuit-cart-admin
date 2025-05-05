export async function GET() {
    return Response.json({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Loaded" : "Missing"
    });
  }