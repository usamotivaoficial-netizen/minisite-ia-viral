import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { industry, style } = await request.json();

    if (!industry) {
      return NextResponse.json(
        { error: "Tipo de negócio é obrigatório" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em branding e naming. Crie nomes de negócio criativos, memoráveis e profissionais.",
        },
        {
          role: "user",
          content: `Crie 10 nomes criativos para um negócio de ${industry}. Estilo desejado: ${style || "moderno e profissional"}. Para cada nome, explique brevemente o significado/conceito.`,
        },
      ],
      temperature: 0.9,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar nomes" },
      { status: 500 }
    );
  }
}
