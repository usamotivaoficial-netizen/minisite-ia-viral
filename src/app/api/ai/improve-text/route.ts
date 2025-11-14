import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Texto não pode estar vazio" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um assistente especializado em melhorar textos. Corrija gramática, melhore clareza, torne o texto mais profissional e fluente. Mantenha o tom original mas aprimore a qualidade. Responda APENAS com o texto melhorado, sem explicações adicionais.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro ao processar texto:", error);
    return NextResponse.json(
      { error: "Erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
