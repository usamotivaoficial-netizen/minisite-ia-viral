import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { nicho, plataforma, tomMarca } = await request.json();

    if (!nicho || !plataforma) {
      return NextResponse.json(
        { error: "Nicho e plataforma são obrigatórios" },
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
          content: "És um especialista em criação de conteúdo para redes sociais. Cria calendários de conteúdo estratégicos e variados.",
        },
        {
          role: "user",
          content: `Cria um calendário de conteúdo para 30 dias:

Nicho: ${nicho}
Plataforma: ${plataforma}
Tom da marca: ${tomMarca || "Profissional e acessível"}

Para cada dia (1-30), fornece:
- **Dia X**: [Tema do post]
- **Tipo de conteúdo**: (Carrossel, Vídeo, Imagem, Story, etc.)
- **Call to action**: (O que pedir ao público)

Varia os tipos de conteúdo e mantém equilíbrio entre educativo, inspiracional e promocional. Formata como uma lista clara e organizada.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar calendário: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
