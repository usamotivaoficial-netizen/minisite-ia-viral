import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { topic, chapters } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Tema é obrigatório" },
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
          content: "Você é um escritor profissional que cria ebooks educativos e bem estruturados.",
        },
        {
          role: "user",
          content: `Crie um ebook completo sobre: ${topic}\n\nEstrutura:\n- Título impactante\n- Introdução (2-3 parágrafos)\n- ${chapters || 5} capítulos principais (cada um com 3-4 parágrafos)\n- Conclusão\n- Dicas práticas finais\n\nSeja informativo, prático e engajador.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar ebook";
    return NextResponse.json(
      { error: `Erro ao gerar ebook: ${errorMessage}` },
      { status: 500 }
    );
  }
}
