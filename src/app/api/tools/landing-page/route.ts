import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { produtoServico, publicoAlvo, beneficioPrincipal } = await request.json();

    if (!produtoServico || !publicoAlvo || !beneficioPrincipal) {
      return NextResponse.json(
        { error: "Produto/serviço, público-alvo e benefício principal são obrigatórios" },
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
          content: "És um copywriter especialista em landing pages de alta conversão. Cria textos persuasivos e estruturados.",
        },
        {
          role: "user",
          content: `Cria o texto completo de uma landing page para:

Produto/Serviço: ${produtoServico}
Público-alvo: ${publicoAlvo}
Benefício principal: ${beneficioPrincipal}

Estrutura a landing page com:

1. **Headline** (título principal impactante)
2. **Subheadline** (complemento que explica o benefício)
3. **Secção Problema/Solução** (identifica a dor e apresenta a solução)
4. **Benefícios** (5-7 bullet points dos principais benefícios)
5. **Prova Social** (3 testemunhos fictícios mas realistas)
6. **FAQ** (5 perguntas frequentes com respostas)
7. **Call to Action Final** (frase persuasiva para conversão)

Usa linguagem persuasiva, clara e focada em resultados.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar landing page: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
