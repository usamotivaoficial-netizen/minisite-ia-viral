import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { name, profession, experience, skills } = await request.json();

    if (!name || !profession) {
      return NextResponse.json(
        { error: "Nome e profissão são obrigatórios" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em RH que cria currículos profissionais e impactantes. Formate de forma clara e estruturada.",
        },
        {
          role: "user",
          content: `Crie um currículo profissional completo para:
Nome: ${name}
Profissão: ${profession}
Experiência: ${experience || "Não informado"}
Habilidades: ${skills || "Não informado"}

Inclua: resumo profissional, experiência, habilidades, formação acadêmica (sugerida) e informações de contato (placeholders).`,
        },
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar currículo" },
      { status: 500 }
    );
  }
}
