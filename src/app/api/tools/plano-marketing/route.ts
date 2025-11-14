import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { tipoNegocio, publicoAlvo, pais, orcamento } = await request.json();

    if (!tipoNegocio || !publicoAlvo || !pais) {
      return NextResponse.json(
        { error: "Tipo de negócio, público-alvo e país são obrigatórios" },
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
          content: "És um especialista em marketing digital e estratégia de negócios. Cria planos de marketing completos, práticos e adaptados ao mercado português.",
        },
        {
          role: "user",
          content: `Cria um plano de marketing completo para:

Tipo de negócio: ${tipoNegocio}
Público-alvo: ${publicoAlvo}
País: ${pais}
Orçamento aproximado: ${orcamento || "Não especificado"}

Estrutura o plano com:
1. **Objetivos Principais** (3-5 objetivos SMART)
2. **Análise Rápida de Público** (persona, dores, desejos)
3. **Estratégia para Redes Sociais** (quais plataformas, tipo de conteúdo)
4. **Ideias de Campanhas** (3-4 campanhas criativas)
5. **Sugestões de Conteúdos Semanais** (calendário básico)
6. **Dicas de Anúncios Pagos** (onde investir, orçamento sugerido)

Usa linguagem clara e dá exemplos práticos específicos para este negócio.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar plano de marketing: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
