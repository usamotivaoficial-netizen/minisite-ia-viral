import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { product, target, tone } = await request.json();

    if (!product || !target) {
      return NextResponse.json(
        { error: "Produto e público-alvo são obrigatórios" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um copywriter especialista em vendas que cria mensagens persuasivas e eficazes.",
        },
        {
          role: "user",
          content: `Crie 3 mensagens comerciais diferentes para:
Produto/Serviço: ${product}
Público-alvo: ${target}
Tom: ${tone || "profissional e persuasivo"}

Inclua: gancho inicial, benefícios, call-to-action forte. Varie os estilos entre as 3 mensagens.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar mensagem" },
      { status: 500 }
    );
  }
}
