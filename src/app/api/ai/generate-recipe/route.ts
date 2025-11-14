import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { ingredient1, ingredient2, ingredient3 } = await request.json();

    if (!ingredient1 || !ingredient2 || !ingredient3) {
      return NextResponse.json(
        { error: "Forneça os 3 ingredientes" },
        { status: 400 }
      );
    }

    // Verificar se a chave da API está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chave da API OpenAI não configurada. Configure OPENAI_API_KEY nas variáveis de ambiente." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const ingredients = [ingredient1, ingredient2, ingredient3];

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
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar receita";
    return NextResponse.json(
      { error: `Erro ao gerar receita: ${errorMessage}` },
      { status: 500 }
    );
  }
}
