import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { niche, quantity } = await request.json();

    if (!niche) {
      return NextResponse.json(
        { error: "Nicho é obrigatório" },
        { status: 400 }
      );
    }

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
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar ideias" },
      { status: 500 }
    );
  }
}
