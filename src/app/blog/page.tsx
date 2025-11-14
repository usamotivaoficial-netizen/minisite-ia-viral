import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Blog - AI Tools Hub | Dicas e Novidades sobre IA",
  description: "Fique por dentro das últimas novidades sobre inteligência artificial, dicas para creators e atualizações das nossas ferramentas.",
};

export default function BlogPage() {
  // Placeholder para artigos futuros
  const placeholderPosts = [
    {
      id: 1,
      title: "Como Criar Legendas Virais para Instagram",
      description: "Descubra as melhores práticas para criar legendas que aumentam o engajamento nas suas publicações.",
      date: "Em breve",
      category: "Dicas",
    },
    {
      id: 2,
      title: "10 Formas de Usar IA no Seu Negócio",
      description: "Aprenda como a inteligência artificial pode transformar a forma como você trabalha e aumentar sua produtividade.",
      date: "Em breve",
      category: "Negócios",
    },
    {
      id: 3,
      title: "Tendências de Conteúdo para 2024",
      description: "Fique por dentro das principais tendências de conteúdo digital e como se destacar nas redes sociais.",
      date: "Em breve",
      category: "Tendências",
    },
  ];

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
            Blog do <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">AI Tools</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dicas, tutoriais e novidades sobre inteligência artificial, criação de conteúdo e empreendedorismo digital.
          </p>
        </div>
      </section>

      {/* Artigos em Destaque */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Artigos Recentes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-200 dark:hover:border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-pink-500 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {post.description}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="group-hover:text-pink-500 transition-colors">
                    Ler mais
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Fique por Dentro
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Inscreva-se na nossa newsletter e receba as últimas novidades, dicas e atualizações diretamente no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-pink-500 transition-colors"
            />
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Pronto para Criar?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Experimente nossas 14 ferramentas de IA gratuitamente e comece a criar conteúdo incrível hoje mesmo.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl">
              Experimentar Ferramentas
              <ArrowRight className="w-5 h-5 ml-2" />
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
            <Link href="/sobre" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Sobre</Link>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
