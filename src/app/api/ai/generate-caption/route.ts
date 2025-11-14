import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Tema não pode estar vazio" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em criar legendas virais para redes sociais. Crie legendas criativas, engajadoras e que chamem atenção. Use emojis relevantes, hashtags estratégicas e um tom que gere conexão. A legenda deve ter entre 100-200 caracteres. Responda APENAS com a legenda, sem explicações.",
        },
        {
          role: "user",
          content: `Crie uma legenda viral sobre: ${topic}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 300,
    });

    const result = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro ao gerar legenda:", error);
    return NextResponse.json(
      { error: "Erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
