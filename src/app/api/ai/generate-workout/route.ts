import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { goal, level, duration } = await request.json();

    if (!goal || !level) {
      return NextResponse.json(
        { error: "Objetivo e nível são obrigatórios" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um personal trainer experiente que cria planos de treino personalizados, seguros e eficazes.",
        },
        {
          role: "user",
          content: `Crie um plano de treino completo para:
Objetivo: ${goal}
Nível: ${level}
Duração por sessão: ${duration || "45-60 minutos"}

Inclua: aquecimento, exercícios principais (com séries e repetições), alongamento, dicas de segurança e frequência semanal recomendada.`,
        },
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar plano de treino" },
      { status: 500 }
    );
  }
}
