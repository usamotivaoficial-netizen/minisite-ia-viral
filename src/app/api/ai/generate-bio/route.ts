import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { description, style, platform } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: "Descrição é obrigatória" },
        { status: 400 }
      );
    }

    // Verificar se a chave da API está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chave da API OpenAI não configurada. Configure OPENAI_API_KEY nas variáveis de ambiente." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const platformText = platform === "linkedin" ? "LinkedIn" : platform === "twitter" ? "Twitter" : "Instagram";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em criar bios impactantes para ${platformText}. Crie bios curtas, criativas e que chamem atenção.`,
        },
        {
          role: "user",
          content: `Crie 5 bios diferentes para ${platformText} baseadas em: ${description}. Estilo: ${style || "criativo e autêntico"}. Use emojis estrategicamente e mantenha conciso.`,
        },
      ],
      temperature: 0.9,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar bio";
    return NextResponse.json(
      { error: `Erro ao gerar bio: ${errorMessage}` },
      { status: 500 }
    );
  }
}
