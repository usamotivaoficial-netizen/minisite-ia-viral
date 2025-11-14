import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Ideia não pode estar vazia" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um escritor criativo especializado em criar histórias envolventes e cativantes. Crie histórias com começo, meio e fim bem estruturados. Use descrições vívidas, diálogos interessantes e mantenha o leitor engajado. A história deve ter entre 300-500 palavras. Responda APENAS com a história, sem explicações.",
        },
        {
          role: "user",
          content: `Crie uma história criativa sobre: ${prompt}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 1200,
    });

    const result = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro ao gerar história:", error);
    return NextResponse.json(
      { error: "Erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
