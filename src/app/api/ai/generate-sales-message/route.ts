import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { product, target, tone } = await request.json();

    if (!product || !target) {
      return NextResponse.json(
        { error: "Produto e público-alvo são obrigatórios" },
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
          content: "Você é um copywriter especialista em vendas que cria mensagens persuasivas e eficazes.",
        },
        {
          role: "user",
          content: `Crie 3 mensagens comerciais diferentes para:\nProduto/Serviço: ${product}\nPúblico-alvo: ${target}\nTom: ${tone || "profissional e persuasivo"}\n\nInclua: gancho inicial, benefícios, call-to-action forte. Varie os estilos entre as 3 mensagens.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar mensagem";
    return NextResponse.json(
      { error: `Erro ao gerar mensagem: ${errorMessage}` },
      { status: 500 }
    );
  }
}
