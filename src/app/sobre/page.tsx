import { Sparkles, Zap, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Sobre - AI Tools Hub | Ferramentas de IA para Creators",
  description: "Conheça o AI Tools Hub, uma plataforma moderna que usa IA de última geração para ajudar creators e empreendedores a criar conteúdo viral de forma simples e gratuita.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-gray-900">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">AI Tools</span>
            </Link>
            
            <Link href="/">
              <Button variant="ghost" size="sm">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Sobre o <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">AI Tools Hub</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Uma plataforma moderna que usa inteligência artificial de última geração para ajudar creators e empreendedores a criar conteúdo incrível.
          </p>
        </div>
      </section>

      {/* Missão */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Democratizar o acesso a ferramentas de inteligência artificial para que qualquer pessoa possa criar conteúdo profissional, independente do seu nível de experiência ou orçamento.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Acreditamos que a IA deve ser simples, acessível e, acima de tudo, útil no dia a dia de creators, empreendedores e profissionais.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <Zap className="w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rápido</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resultados em segundos</p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <Heart className="w-10 h-10 text-pink-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Simples</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Interface intuitiva</p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <Target className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Eficaz</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resultados de qualidade</p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <Sparkles className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Gratuito</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Acesso sem custo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que fazemos */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            O Que Fazemos
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Para Creators
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Criamos ferramentas que ajudam você a gerar legendas virais, ideias de posts, bios criativas e muito mais. Tudo pensado para aumentar seu engajamento e crescer nas redes sociais.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Para Empreendedores
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Oferecemos soluções para criar nomes de negócio, mensagens comerciais, currículos profissionais e outros recursos essenciais para quem está começando ou expandindo seu negócio.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Para Todos
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Desde receitas rápidas até planos de treino personalizados, nossas ferramentas são úteis para qualquer pessoa que queira economizar tempo e ter resultados profissionais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologia */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Tecnologia de Ponta
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Utilizamos modelos de inteligência artificial de última geração, incluindo GPT-4, para garantir resultados de alta qualidade em todas as nossas ferramentas.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl">
              Experimentar Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-900 py-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">© 2024 AI Tools. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center justify-center gap-6">
            <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Início</Link>
            <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
