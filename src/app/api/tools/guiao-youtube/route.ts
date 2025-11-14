import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { temaVideo, duracao, tom } = await request.json();

    if (!temaVideo || !duracao || !tom) {
      return NextResponse.json(
        { error: "Tema, duração e tom são obrigatórios" },
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
          content: "És um roteirista especializado em vídeos para YouTube. Crias scripts envolventes, bem estruturados e otimizados para retenção.",
        },
        {
          role: "user",
          content: `Cria um guião completo para vídeo de YouTube:

Tema: ${temaVideo}
Duração aproximada: ${duracao}
Tom: ${tom}

Estrutura o guião com:

1. **Gancho Inicial (primeiros 15 segundos)**
   - Frase de impacto
   - Por que continuar assistindo

2. **Introdução (30-60 segundos)**
   - Apresentação do tema
   - O que o espectador vai aprender
   - Pedido de like/inscrição

3. **Desenvolvimento (corpo principal)**
   - Ponto 1: [tema + explicação + exemplo]
   - Ponto 2: [...]
   - Ponto 3: [...]
   - (estrutura completa baseada na duração)

4. **Conclusão (1-2 minutos)**
   - Resumo dos pontos principais
   - Próximos passos para o espectador
   - Call to action final

5. **Sugestões de Título** (3 opções otimizadas para SEO)

6. **Descrição do Vídeo** (completa com timestamps)

Inclui indicações de timing e dicas de apresentação.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar guião: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
