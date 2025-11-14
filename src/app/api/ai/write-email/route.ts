import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { subject, context } = await req.json();

    if (!subject || !context || subject.trim().length === 0 || context.trim().length === 0) {
      return NextResponse.json(
        { error: "Assunto e contexto são obrigatórios" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um assistente especializado em escrever emails profissionais. Crie emails bem estruturados, claros, educados e diretos ao ponto. Use saudações apropriadas, corpo do email organizado e despedida profissional. Responda APENAS com o email completo, sem explicações adicionais.",
        },
        {
          role: "user",
          content: `Assunto: ${subject}\n\nContexto: ${context}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const result = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro ao escrever email:", error);
    return NextResponse.json(
      { error: "Erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
