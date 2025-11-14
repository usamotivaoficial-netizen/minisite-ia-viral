import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { message, tone, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
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
          content: "Você é um assistente que cria respostas inteligentes e naturais para WhatsApp. Seja conciso, amigável e contextual.",
        },
        {
          role: "user",
          content: `Crie 3 respostas diferentes para esta mensagem do WhatsApp:\n"${message}"\n\nTom desejado: ${tone || "amigável e profissional"}\nContexto adicional: ${context || "conversa casual"}\n\nVarie o estilo: uma formal, uma casual e uma criativa.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar resposta";
    return NextResponse.json(
      { error: `Erro ao gerar resposta: ${errorMessage}` },
      { status: 500 }
    );
  }
}
