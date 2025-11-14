import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { tipoProduto, preco, tom } = await request.json();

    if (!tipoProduto) {
      return NextResponse.json(
        { error: "Tipo de produto é obrigatório" },
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
          content: "És um especialista em email marketing e funis de vendas. Cria sequências de emails persuasivas e estratégicas.",
        },
        {
          role: "user",
          content: `Cria um funil de vendas completo para:

Produto: ${tipoProduto}
Preço aproximado: ${preco || "Não especificado"}
Tom: ${tom || "Profissional e persuasivo"}

Cria 5 emails de funil:

**Email 1 - Boas-vindas**
- Assunto:
- Corpo: (apresentação, criar conexão)

**Email 2 - História/Problema**
- Assunto:
- Corpo: (contar história, identificar dor)

**Email 3 - Prova Social**
- Assunto:
- Corpo: (casos de sucesso, depoimentos)

**Email 4 - Oferta**
- Assunto:
- Corpo: (apresentar produto, benefícios, CTA)

**Email 5 - Última Chamada**
- Assunto:
- Corpo: (urgência, escassez, última chance)

Depois, sugere 3 mensagens para WhatsApp/DM que complementem o funil.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar funil de vendas: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
