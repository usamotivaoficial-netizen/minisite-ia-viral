"use client";

import { useState } from "react";
import { Sparkles, Wand2, Instagram, ChefHat, Lightbulb, FileUser, Dumbbell, User, Megaphone, BookOpen, Phone, Crown, ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showAllTools, setShowAllTools] = useState(false);

  // Estados para cada ferramenta
  const [viralTopic, setViralTopic] = useState("");
  const [viralPlatform, setViralPlatform] = useState("instagram");
  
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [ingredient3, setIngredient3] = useState("");
  
  const [businessIndustry, setBusinessIndustry] = useState("");
  const [businessStyle, setBusinessStyle] = useState("");
  
  const [resumeName, setResumeName] = useState("");
  const [resumeProfession, setResumeProfession] = useState("");
  const [resumeExperience, setResumeExperience] = useState("");
  const [resumeSkills, setResumeSkills] = useState("");
  
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [workoutLevel, setWorkoutLevel] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  
  const [bioDescription, setBioDescription] = useState("");
  const [bioStyle, setBioStyle] = useState("");
  const [bioPlatform, setBioPlatform] = useState("instagram");
  
  const [postNiche, setPostNiche] = useState("");
  const [postQuantity, setPostQuantity] = useState("10");
  
  const [salesProduct, setSalesProduct] = useState("");
  const [salesTarget, setSalesTarget] = useState("");
  const [salesTone, setSalesTone] = useState("");
  
  const [ebookTopic, setEbookTopic] = useState("");
  const [ebookChapters, setEbookChapters] = useState("5");
  
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [whatsappTone, setWhatsappTone] = useState("");
  const [whatsappContext, setWhatsappContext] = useState("");

  const handleViralCaption = async () => {
    if (!viralTopic.trim()) {
      toast.error("Digite um tema para a legenda!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-viral-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: viralTopic, platform: viralPlatform }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Legendas virais geradas!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipe = async () => {
    if (!ingredient1.trim() || !ingredient2.trim() || !ingredient3.trim()) {
      toast.error("Preencha os 3 ingredientes!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: [ingredient1, ingredient2, ingredient3] }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Receita criada!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessName = async () => {
    if (!businessIndustry.trim()) {
      toast.error("Digite o tipo de negócio!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-business-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: businessIndustry, style: businessStyle }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Nomes gerados!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResume = async () => {
    if (!resumeName.trim() || !resumeProfession.trim()) {
      toast.error("Preencha nome e profissão!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: resumeName, 
          profession: resumeProfession,
          experience: resumeExperience,
          skills: resumeSkills
        }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Currículo gerado!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkout = async () => {
    if (!workoutGoal.trim() || !workoutLevel.trim()) {
      toast.error("Preencha objetivo e nível!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          goal: workoutGoal, 
          level: workoutLevel,
          duration: workoutDuration
        }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Plano de treino criado!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBio = async () => {
    if (!bioDescription.trim()) {
      toast.error("Descreva seu perfil!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          description: bioDescription, 
          style: bioStyle,
          platform: bioPlatform
        }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Bios geradas!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostIdeas = async () => {
    if (!postNiche.trim()) {
      toast.error("Digite seu nicho!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-post-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          niche: postNiche, 
          quantity: postQuantity
        }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Ideias geradas!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalesMessage = async () => {
    if (!salesProduct.trim() || !salesTarget.trim()) {
      toast.error("Preencha produto e público-alvo!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-sales-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          product: salesProduct, 
          target: salesTarget,
          tone: salesTone
        }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Mensagens geradas!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEbook = async () => {
    if (!ebookTopic.trim()) {
      toast.error("Digite o tema do ebook!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic: ebookTopic, 
          chapters: ebookChapters
        }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Ebook gerado! Copie e salve em um documento.");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsappReply = async () => {
    if (!whatsappMessage.trim()) {
      toast.error("Digite a mensagem recebida!");
      return;
    }
    
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/generate-whatsapp-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: whatsappMessage, 
          tone: whatsappTone,
          context: whatsappContext
        }),
      });
      
      const data = await response.json();
      setResult(data.result);
      toast.success("Respostas geradas!");
    } catch (error) {
      toast.error("Erro ao processar. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
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

            <a href="#premium">
              <Button size="sm" variant="ghost" className="text-sm">
                <Crown className="w-4 h-4 mr-1.5" />
                Premium
              </Button>
            </a>
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
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg">
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
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
      <section className="py-24 px-6">
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
                <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-200 dark:hover:border-gray-700">
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
                Todas as 14 Ferramentas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Explore todas as nossas ferramentas de IA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-950">
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">Acesso a 14 ferramentas</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suporte por email</span>
                </div>
                <Button variant="outline" className="w-full mt-6 rounded-xl border-2">
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
                <Button className="w-full mt-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ferramentas exclusivas</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suporte 24/7</span>
                </div>
                <Button variant="outline" className="w-full mt-6 rounded-xl border-2">
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
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Ferramentas</a></li>
                <li><a href="#premium" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Preços</a></li>
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
          <a 
            href="#viral-caption"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Instagram className="w-5 h-5 text-pink-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Legendas</span>
          </a>
          <a 
            href="#recipe"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <ChefHat className="w-5 h-5 text-orange-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Receitas</span>
          </a>
          <a 
            href="#premium"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Crown className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Premium</span>
          </a>
        </div>
      </div>
    </div>
  );
}
