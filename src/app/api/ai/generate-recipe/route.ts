import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients || ingredients.length < 3) {
      return NextResponse.json(
        { error: "Forneça 3 ingredientes" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um chef criativo que cria receitas deliciosas e simples usando apenas 3 ingredientes. Seja criativo e prático.",
        },
        {
          role: "user",
          content: `Crie uma receita completa usando APENAS estes 3 ingredientes: ${ingredients.join(", ")}. Inclua: nome da receita, tempo de preparo, modo de preparo detalhado e dicas.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar receita" },
      { status: 500 }
    );
  }
}
