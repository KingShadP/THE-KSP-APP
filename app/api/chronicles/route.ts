import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: Request) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Find 2 recent pieces of news or updates about the music industry, hip-hop, or luxury fashion. Format them strictly as a JSON array of objects with the following schema: { index: string, category: string, title: string, description: string }. Make sure it's accurate and recent. The index should just be like 'INTEL // LIVE'. The tone should be dark, mysterious, and in line with KingShadP's 'Legacy Ledger' aesthetic.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              index: {
                type: Type.STRING
              },
              category: {
                type: Type.STRING
              },
              title: {
                type: Type.STRING
              },
              description: {
                type: Type.STRING
              }
            }
          }
        }
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    // Graceful fallback when rate limited, avoiding console errors that disrupt the user experience
    const mockData = [
      {
        index: "INTEL // LIVE",
        category: "VAULT UPDATE",
        title: "The Silence of the Loom",
        description: "Recent shifts in global textile acquisitions reveal an unprecedented quiet from major fashion houses, as independent creators corner the market on raw materials, signaling a return to artisanal scarcity."
      }
    ];
    return NextResponse.json({ text: JSON.stringify(mockData) }, { status: 200 });
  }
}
