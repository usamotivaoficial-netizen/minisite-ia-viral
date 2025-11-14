import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { descricaoProduto, preco, publicoAlvo, objecoes } = await request.json();

    if (!descricaoProduto || !preco || !publicoAlvo) {
      return NextResponse.json(
        { error: "Descrição do produto, preço e público-alvo são obrigatórios" },
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
          content: "És um especialista em criação de ofertas irresistíveis. Transformas produtos comuns em ofertas que as pessoas não conseguem recusar.",
        },
        {
          role: "user",
          content: `Transforma este produto numa oferta irresistível:

Produto: ${descricaoProduto}
Preço: ${preco}
Público-alvo: ${publicoAlvo}
Objeções comuns: ${objecoes || "Não especificado"}

Cria uma oferta completa com:

1. **Proposta de Valor Clara**
   - Transformação que o produto oferece
   - Diferencial único
   - Por que comprar agora

2. **Bónus Sugeridos** (3-5 bónus que aumentam o valor percebido)
   - Bónus 1: [nome + valor]
   - Bónus 2: [...]
   - (continua)

3. **Garantia Sugerida**
   - Tipo de garantia (devolução, satisfação, etc.)
   - Prazo
   - Como funciona

4. **Forma de Apresentar o Preço**
   - Valor total dos bónus
   - Preço normal vs. preço promocional
   - Parcelamento (se aplicável)
   - Valor final irresistível

5. **Copy Curta para Vender** (2-3 parágrafos persuasivos)
   - Texto pronto para usar em vendas

Foca em criar urgência, escassez e valor percebido.`,
        },
      ],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: `Erro ao gerar oferta: ${error?.message || "Erro desconhecido"}` },
      { status: 500 }
    );
  }
}
