import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, tone, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um assistente que cria respostas inteligentes e naturais para WhatsApp. Seja conciso, amigável e contextual.",
        },
        {
          role: "user",
          content: `Crie 3 respostas diferentes para esta mensagem do WhatsApp:
"${message}"

Tom desejado: ${tone || "amigável e profissional"}
Contexto adicional: ${context || "conversa casual"}

Varie o estilo: uma formal, uma casual e uma criativa.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar resposta" },
      { status: 500 }
    );
  }
}
