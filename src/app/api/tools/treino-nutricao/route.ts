import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { objetivo, diasSemana, nivel } = await request.json();

    if (!objetivo || !diasSemana || !nivel) {
      return NextResponse.json(
        { error: "Objetivo, dias por semana e nível são obrigatórios" },
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
          content: "És um personal trainer e nutricionista especializado. Cria planos de treino e nutrição seguros e eficazes. AVISO: Não substitui acompanhamento profissional.",
        },
        {
          role: "user",
          content: `Cria um plano avançado de treino e nutrição para:

Objetivo: ${objetivo}
Dias por semana: ${diasSemana}
Nível: ${nivel}

**IMPORTANTE**: Este é um plano base e não substitui acompanhamento de profissionais de saúde.

Estrutura o plano com:

1. **Plano de Treino Semanal**
   - Dia 1: [Grupo muscular, exercícios, séries/reps]
   - Dia 2: [...]
   - (continua para todos os dias)
   - Descanso: [quando]

2. **Distribuição de Macronutrientes Base**
   - Proteínas: [quantidade aproximada]
   - Carboidratos: [quantidade aproximada]
   - Gorduras: [quantidade aproximada]
   - Calorias totais aproximadas

3. **Ideias de Refeições Simples**
   - Pequeno-almoço: [3 opções]
   - Almoço: [3 opções]
   - Jantar: [3 opções]
   - Snacks: [opções]

4. **Dicas de Hábitos Saudáveis**
   - Hidratação
   - Sono
   - Recuperação
   - Progressão

Mantém as sugestões seguras e realistas.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar plano: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
