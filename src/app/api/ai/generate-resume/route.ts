import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { name, profession, experience, skills } = await request.json();

    if (!name || !profession) {
      return NextResponse.json(
        { error: "Nome e profissão são obrigatórios" },
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
          content: "Você é um especialista em RH que cria currículos profissionais e impactantes. Formate de forma clara e estruturada.",
        },
        {
          role: "user",
          content: `Crie um currículo profissional completo para:\nNome: ${name}\nProfissão: ${profession}\nExperiência: ${experience || "Não informado"}\nHabilidades: ${skills || "Não informado"}\n\nInclua: resumo profissional, experiência, habilidades, formação acadêmica (sugerida) e informações de contato (placeholders).`,
        },
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erro na API:", error);
    const errorMessage = error?.message || "Erro desconhecido ao gerar currículo";
    return NextResponse.json(
      { error: `Erro ao gerar currículo: ${errorMessage}` },
      { status: 500 }
    );
  }
}
