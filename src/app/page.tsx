"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Wand2, Instagram, ChefHat, Lightbulb, FileUser, Dumbbell, User, Megaphone, BookOpen, Phone, Crown, ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Home() {
  const router = useRouter();
  const [showAllTools, setShowAllTools] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Função para scroll para ferramentas
  const scrollToTools = () => {
    scrollToSection('ferramentas-principais');
  };

  // Função para abrir modal de pagamento
  const openPaymentModal = () => {
    setShowPaymentModal(true);
  };

  // Função para navegar para página da ferramenta
  const goToTool = (toolId: string) => {
    router.push(`/ferramenta/${toolId}`);
  };

  const topTools = [
    { 
      id: "viral-caption", 
      name: "Legenda Viral", 
      description: "Cria legendas virais para TikTok e Instagram",
      icon: Instagram, 
      gradient: "from-pink-500 to-purple-500" 
    },
    { 
      id: "recipe", 
      name: "Receitas 3 Ingredientes", 
      description: "Receitas rápidas com ingredientes que já tens em casa",
      icon: ChefHat, 
      gradient: "from-orange-500 to-red-500" 
    },
    { 
      id: "business-name", 
      name: "Nome de Negócio", 
      description: "Sugestões criativas e profissionais para a sua marca",
      icon: Lightbulb, 
      gradient: "from-yellow-500 to-orange-500" 
    },
    { 
      id: "resume", 
      name: "Currículo", 
      description: "Currículo profissional pronto em segundos",
      icon: FileUser, 
      gradient: "from-blue-500 to-indigo-500" 
    },
    { 
      id: "workout", 
      name: "Plano de Treino", 
      description: "Treinos personalizados para os teus objetivos",
      icon: Dumbbell, 
      gradient: "from-green-500 to-emerald-500" 
    },
    { 
      id: "bio", 
      name: "Bio Social", 
      description: "Bios criativas que atraem seguidores",
      icon: User, 
      gradient: "from-purple-500 to-pink-500" 
    },
    { 
      id: "post-ideas", 
      name: "Ideias de Posts", 
      description: "Nunca mais fiques sem ideias para publicar",
      icon: Lightbulb, 
      gradient: "from-cyan-500 to-blue-500" 
    },
    { 
      id: "whatsapp", 
      name: "Resposta WhatsApp", 
      description: "Respostas inteligentes para qualquer mensagem",
      icon: Phone, 
      gradient: "from-green-500 to-teal-500" 
    },
  ];

  const allTools = [
    ...topTools,
    { 
      id: "sales", 
      name: "Mensagem Comercial", 
      description: "Mensagens de vendas que convertem",
      icon: Megaphone, 
      gradient: "from-red-500 to-pink-500" 
    },
    { 
      id: "ebook", 
      name: "Criador de Ebook", 
      description: "Ebooks completos gerados automaticamente",
      icon: BookOpen, 
      gradient: "from-indigo-500 to-purple-500" 
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header Fixo e Limpo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">AI Tools</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="/sobre" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Sobre</a>
              <a href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</a>
              <a href="#afiliados" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Afiliados</a>
              <a href="#contacto" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</a>
            </nav>

            <Button 
              size="sm" 
              variant="ghost" 
              className="text-sm"
              onClick={() => scrollToSection('premium')}
            >
              <Crown className="w-4 h-4 mr-1.5" />
              Premium
            </Button>
          </div>
        </div>
      </header>

      {/* Espaçamento para header fixo */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Ferramentas de IA<br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              100% Gratuitas
            </span><br />
            <span className="text-4xl md:text-5xl">Cria Tudo com 1 Clique</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
            Ferramentas criadas com IA de última geração — rápidas, simples e totalmente gratuitas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToTools}
              className="relative px-8 py-6 text-lg rounded-xl border-2 bg-transparent text-gray-900 dark:text-white overflow-hidden group hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300"
              style={{
                borderImage: "linear-gradient(135deg, rgb(236, 72, 153), rgb(168, 85, 247)) 1"
              }}
            >
              <span className="relative z-10">Ver Ferramentas</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">+10.000</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">usuários</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">+14</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ferramentas de IA</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">grátis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Anúncio 1 - Banner 728x90 */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-xs text-gray-400 mb-3">Publicidade</div>
            <div className="h-24 flex items-center justify-center text-gray-400">
              Banner 728x90 - Google AdSense
            </div>
          </div>
        </div>
      </section>

      {/* Ferramentas Principais (8 mais usadas) */}
      <section id="ferramentas-principais" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Ferramentas Mais Usadas
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Escolha uma ferramenta e comece a criar agora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {topTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card 
                  key={tool.id} 
                  onClick={() => goToTool(tool.id)}
                  className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-200 dark:hover:border-gray-700"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setShowAllTools(!showAllTools)}
              className="rounded-xl border-2 px-8"
            >
              {showAllTools ? "Ver Menos" : "Ver todas as ferramentas"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Anúncio 2 - Banner 300x250 */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-sm">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-xs text-gray-400 mb-3">Publicidade</div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Banner 300x250 - Google AdSense
            </div>
          </div>
        </div>
      </section>

      {/* Grade Completa de Ferramentas */}
      {showAllTools && (
        <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Todas as 10 Ferramentas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Explore todas as nossas ferramentas de IA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card 
                    key={tool.id} 
                    onClick={() => goToTool(tool.id)}
                    className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-950"
                  >
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Seção Premium Clean */}
      <section id="premium" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Escolha seu Plano
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simples, transparente e sem surpresas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Grátis */}
            <Card className="border-2">
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">Grátis</CardTitle>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">R$ 0</div>
                <CardDescription className="text-base">Para começar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">5 gerações por dia</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Acesso a 10 ferramentas</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suporte por email</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={scrollToTools}
                  className="w-full mt-6 rounded-xl border-2"
                >
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="border-2 border-purple-200 dark:border-purple-800 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">R$ 29</div>
                <CardDescription className="text-base">por mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gerações ilimitadas</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sem anúncios</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Prioridade no processamento</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suporte prioritário</span>
                </div>
                <Button 
                  onClick={openPaymentModal}
                  className="w-full mt-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Assinar Pro
                </Button>
              </CardContent>
            </Card>

            {/* Ultimate */}
            <Card className="border-2">
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">Ultimate</CardTitle>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">R$ 79</div>
                <CardDescription className="text-base">por mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tudo do Pro</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">API de acesso</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-400">Ferramentas exclusivas</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suporte 24/7</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={openPaymentModal}
                  className="w-full mt-6 rounded-xl border-2"
                >
                  Assinar Ultimate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-900 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Produto</h3>
              <ul className="space-y-3">
                <li><button onClick={scrollToTools} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Ferramentas</button></li>
                <li><button onClick={() => scrollToSection('premium')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Preços</button></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Empresa</h3>
              <ul className="space-y-3">
                <li><a href="/sobre" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Sobre</a></li>
                <li><a href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</a></li>
                <li><a href="#afiliados" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Afiliados</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Suporte</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Ajuda</a></li>
                <li><a href="#contacto" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">© 2024 AI Tools. Todos os direitos reservados.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Barra Fixa Mobile (apenas mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around gap-2">
          <button 
            onClick={() => goToTool('viral-caption')}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Instagram className="w-5 h-5 text-pink-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Legendas</span>
          </button>
          <button 
            onClick={() => goToTool('recipe')}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <ChefHat className="w-5 h-5 text-orange-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Receitas</span>
          </button>
          <button 
            onClick={() => scrollToSection('premium')}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Crown className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Premium</span>
          </button>
        </div>
      </div>

      {/* Modal de Pagamento */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Em breve</DialogTitle>
            <DialogDescription className="text-center pt-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Página de pagamento em desenvolvimento
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Em breve você poderá assinar nossos planos Premium e Ultimate. Fique atento!
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button 
              onClick={() => setShowPaymentModal(false)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
