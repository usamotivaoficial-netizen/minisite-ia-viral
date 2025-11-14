import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic, platform } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Tema é obrigatório" },
        { status: 400 }
      );
    }

    const platformText = platform === "tiktok" ? "TikTok" : "Instagram";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em criar legendas virais para ${platformText}. Crie legendas criativas, engajadoras e otimizadas para viralizar. Use emojis estrategicamente, inclua call-to-action e hashtags relevantes.`,
        },
        {
          role: "user",
          content: `Crie 3 legendas virais diferentes para ${platformText} sobre: ${topic}`,
        },
      ],
      temperature: 0.9,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar legenda" },
      { status: 500 }
    );
  }
}
