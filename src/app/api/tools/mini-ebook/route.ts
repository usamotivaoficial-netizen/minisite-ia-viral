import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { tema, publicoAlvo, objetivo } = await request.json();

    if (!tema || !publicoAlvo || !objetivo) {
      return NextResponse.json(
        { error: "Tema, público-alvo e objetivo são obrigatórios" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chave da API OpenAI não configurada" },
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
          content: "És um especialista em criar eBooks completos e bem estruturados em português de Portugal. Cria conteúdo educativo, envolvente e bem formatado.",
        },
        {
          role: "user",
          content: `Cria um mini eBook completo sobre: ${tema}

Público-alvo: ${publicoAlvo}
Objetivo: ${objetivo}

Estrutura o eBook com:
1. Título cativante
2. Introdução (explicar o que o leitor vai aprender)
3. 4-6 capítulos desenvolvidos (cada um com 3-4 parágrafos)
4. Conclusão (resumo e próximos passos)

Usa linguagem clara, exemplos práticos e mantém um tom acessível. Formata bem o texto com títulos e subtítulos.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar eBook: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
