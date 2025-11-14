import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { temaEstudo, horasDia, prazo } = await request.json();

    if (!temaEstudo || !horasDia || !prazo) {
      return NextResponse.json(
        { error: "Tema, horas por dia e prazo são obrigatórios" },
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
          content: "És um especialista em pedagogia e criação de planos de estudo personalizados. Cria planos realistas e eficazes.",
        },
        {
          role: "user",
          content: `Cria um plano de estudo personalizado para:

Tema: ${temaEstudo}
Horas disponíveis por dia: ${horasDia}
Prazo: ${prazo}

Estrutura o plano com:

1. **Visão Geral** (objetivos e estrutura do plano)

2. **Calendário Semanal**
   - Semana 1: [tópicos e atividades]
   - Semana 2: [tópicos e atividades]
   - (continua até completar o prazo)

3. **Tarefas Diárias** (exemplo de rotina diária)
   - Manhã: [atividade]
   - Tarde: [atividade]
   - Noite: [revisão]

4. **Métodos de Estudo Sugeridos**
   - Técnicas específicas (flashcards, resumos, prática)
   - Ferramentas recomendadas

5. **Dicas para Manter Consistência**
   - Estratégias de motivação
   - Como lidar com dificuldades

Mantém o plano realista e adaptável.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar plano de estudo: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
