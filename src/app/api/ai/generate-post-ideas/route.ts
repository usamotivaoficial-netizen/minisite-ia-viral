import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { niche, quantity } = await request.json();

    if (!niche) {
      return NextResponse.json(
        { error: "Nicho é obrigatório" },
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um estrategista de conteúdo que cria ideias virais e engajadoras para redes sociais.",
        },
        {
          role: "user",
          content: `Crie ${quantity || 10} ideias criativas de posts para o nicho: ${niche}. Para cada ideia, inclua: título/gancho, formato sugerido (carrossel, vídeo, foto, etc) e breve descrição do conteúdo.`,
        },
      ],
      temperature: 0.9,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar ideias";
    return NextResponse.json(
      { error: `Erro ao gerar ideias: ${errorMessage}` },
      { status: 500 }
    );
  }
}
