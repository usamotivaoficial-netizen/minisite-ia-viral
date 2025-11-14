import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { goal, level, duration } = await request.json();

    if (!goal || !level) {
      return NextResponse.json(
        { error: "Objetivo e nível são obrigatórios" },
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um personal trainer experiente que cria planos de treino personalizados, seguros e eficazes.",
        },
        {
          role: "user",
          content: `Crie um plano de treino completo para:\nObjetivo: ${goal}\nNível: ${level}\nDuração por sessão: ${duration || "45-60 minutos"}\n\nInclua: aquecimento, exercícios principais (com séries e repetições), alongamento, dicas de segurança e frequência semanal recomendada.`,
        },
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar plano de treino";
    return NextResponse.json(
      { error: `Erro ao gerar plano de treino: ${errorMessage}` },
      { status: 500 }
    );
  }
}
