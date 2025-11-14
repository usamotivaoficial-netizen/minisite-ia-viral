import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { seguidores, nicho, tipoConteudo, problemas } = await request.json();

    if (!seguidores || !nicho || !tipoConteudo) {
      return NextResponse.json(
        { error: "Seguidores, nicho e tipo de conteúdo são obrigatórios" },
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
          content: "És um especialista em crescimento no Instagram. Fazes auditorias detalhadas e dás sugestões práticas e acionáveis.",
        },
        {
          role: "user",
          content: `Faz uma auditoria completa desta conta de Instagram:

Número de seguidores: ${seguidores}
Nicho: ${nicho}
Tipo de conteúdo: ${tipoConteudo}
Problemas identificados: ${problemas || "Não especificado"}

Estrutura a auditoria com:

1. **Diagnóstico Geral**
   - Análise do perfil atual
   - Pontos fortes identificados
   - Áreas de melhoria

2. **O Que Está Bom**
   - 3-5 pontos positivos específicos

3. **O Que Pode Melhorar**
   - 5-7 pontos de melhoria com explicação

4. **5 Sugestões Práticas de Melhoria**
   - Ação 1: [específica e acionável]
   - Ação 2: [...]
   - (continua até 5)

5. **10 Ideias de Conteúdos Específicos**
   - Ideia 1: [tema + formato + objetivo]
   - Ideia 2: [...]
   - (continua até 10)

Sê específico e prático nas sugestões.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar auditoria: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
