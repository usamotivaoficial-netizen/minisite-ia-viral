import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic, chapters } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Tema é obrigatório" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um escritor profissional que cria ebooks educativos e bem estruturados.",
        },
        {
          role: "user",
          content: `Crie um ebook completo sobre: ${topic}

Estrutura:
- Título impactante
- Introdução (2-3 parágrafos)
- ${chapters || 5} capítulos principais (cada um com 3-4 parágrafos)
- Conclusão
- Dicas práticas finais

Seja informativo, prático e engajador.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar ebook" },
      { status: 500 }
    );
  }
}
