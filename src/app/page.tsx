"use client";

import { useState } from "react";
import { Sparkles, Wand2, MessageSquare, FileText, Zap, Instagram, ChefHat, Lightbulb, FileUser, Dumbbell, User, Megaphone, Mail, BookOpen, Phone } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Tools Hub
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                14 Ferramentas Virais
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            14 Ferramentas de IA Gratuitas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Crie conteúdo viral, receitas, currículos, planos de treino e muito mais com inteligência artificial
          </p>
        </div>

        {/* Tools Section */}
        <Card className="shadow-2xl border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-purple-500" />
              Escolha sua ferramenta
            </CardTitle>
            <CardDescription>
              Selecione a ferramenta de IA que você precisa e comece a criar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="viral-caption" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 h-auto p-2">
                <TabsTrigger value="viral-caption" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <Instagram className="w-3 h-3" />
                  <span className="hidden sm:inline">Legenda Viral</span>
                  <span className="sm:hidden">Legenda</span>
                </TabsTrigger>
                <TabsTrigger value="recipe" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <ChefHat className="w-3 h-3" />
                  <span className="hidden sm:inline">Receita 3 Ingr.</span>
                  <span className="sm:hidden">Receita</span>
                </TabsTrigger>
                <TabsTrigger value="business-name" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <Lightbulb className="w-3 h-3" />
                  <span className="hidden sm:inline">Nome Negócio</span>
                  <span className="sm:hidden">Nome</span>
                </TabsTrigger>
                <TabsTrigger value="resume" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <FileUser className="w-3 h-3" />
                  <span className="hidden sm:inline">Currículo</span>
                  <span className="sm:hidden">CV</span>
                </TabsTrigger>
                <TabsTrigger value="workout" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <Dumbbell className="w-3 h-3" />
                  <span className="hidden sm:inline">Plano Treino</span>
                  <span className="sm:hidden">Treino</span>
                </TabsTrigger>
                <TabsTrigger value="bio" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <User className="w-3 h-3" />
                  <span className="hidden sm:inline">Bio Social</span>
                  <span className="sm:hidden">Bio</span>
                </TabsTrigger>
                <TabsTrigger value="post-ideas" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <Lightbulb className="w-3 h-3" />
                  <span className="hidden sm:inline">Ideias Post</span>
                  <span className="sm:hidden">Ideias</span>
                </TabsTrigger>
                <TabsTrigger value="sales" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <Megaphone className="w-3 h-3" />
                  <span className="hidden sm:inline">Msg Comercial</span>
                  <span className="sm:hidden">Vendas</span>
                </TabsTrigger>
                <TabsTrigger value="ebook" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <BookOpen className="w-3 h-3" />
                  <span className="hidden sm:inline">Ebook</span>
                  <span className="sm:hidden">Ebook</span>
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="flex items-center gap-1 py-2 px-2 text-xs">
                  <Phone className="w-3 h-3" />
                  <span className="hidden sm:inline">Resposta Zap</span>
                  <span className="sm:hidden">Zap</span>
                </TabsTrigger>
              </TabsList>

              {/* Legenda Viral TikTok/Instagram */}
              <TabsContent value="viral-caption" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="viral-topic">Sobre o que é sua postagem?</Label>
                  <Input
                    id="viral-topic"
                    placeholder="Ex: viagem para praia, receita de bolo, dica de produtividade..."
                    value={viralTopic}
                    onChange={(e) => setViralTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="viral-platform">Plataforma</Label>
                  <Select value={viralPlatform} onValueChange={setViralPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleViralCaption} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                >
                  {loading ? "Gerando..." : "🔥 Gerar Legendas Virais"}
                </Button>
              </TabsContent>

              {/* Receita 3 Ingredientes */}
              <TabsContent value="recipe" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Digite 3 ingredientes</Label>
                  <Input
                    placeholder="Ingrediente 1"
                    value={ingredient1}
                    onChange={(e) => setIngredient1(e.target.value)}
                  />
                  <Input
                    placeholder="Ingrediente 2"
                    value={ingredient2}
                    onChange={(e) => setIngredient2(e.target.value)}
                  />
                  <Input
                    placeholder="Ingrediente 3"
                    value={ingredient3}
                    onChange={(e) => setIngredient3(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleRecipe} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {loading ? "Criando..." : "👨‍🍳 Criar Receita"}
                </Button>
              </TabsContent>

              {/* Nome de Negócio */}
              <TabsContent value="business-name" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="business-industry">Tipo de negócio</Label>
                  <Input
                    id="business-industry"
                    placeholder="Ex: cafeteria, loja de roupas, consultoria..."
                    value={businessIndustry}
                    onChange={(e) => setBusinessIndustry(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-style">Estilo desejado (opcional)</Label>
                  <Input
                    id="business-style"
                    placeholder="Ex: moderno, elegante, divertido..."
                    value={businessStyle}
                    onChange={(e) => setBusinessStyle(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleBusinessName} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  {loading ? "Gerando..." : "💡 Gerar Nomes"}
                </Button>
              </TabsContent>

              {/* Currículo */}
              <TabsContent value="resume" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="resume-name">Seu nome completo</Label>
                  <Input
                    id="resume-name"
                    placeholder="João Silva"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume-profession">Profissão/Cargo desejado</Label>
                  <Input
                    id="resume-profession"
                    placeholder="Ex: Desenvolvedor Web, Designer Gráfico..."
                    value={resumeProfession}
                    onChange={(e) => setResumeProfession(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume-experience">Experiência (opcional)</Label>
                  <Textarea
                    id="resume-experience"
                    placeholder="Descreva brevemente sua experiência..."
                    value={resumeExperience}
                    onChange={(e) => setResumeExperience(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume-skills">Habilidades (opcional)</Label>
                  <Input
                    id="resume-skills"
                    placeholder="Ex: JavaScript, Photoshop, Excel..."
                    value={resumeSkills}
                    onChange={(e) => setResumeSkills(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleResume} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  {loading ? "Gerando..." : "📄 Gerar Currículo"}
                </Button>
              </TabsContent>

              {/* Plano de Treino */}
              <TabsContent value="workout" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="workout-goal">Objetivo do treino</Label>
                  <Input
                    id="workout-goal"
                    placeholder="Ex: perder peso, ganhar massa muscular, definição..."
                    value={workoutGoal}
                    onChange={(e) => setWorkoutGoal(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workout-level">Nível de experiência</Label>
                  <Select value={workoutLevel} onValueChange={setWorkoutLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workout-duration">Duração por sessão (opcional)</Label>
                  <Input
                    id="workout-duration"
                    placeholder="Ex: 30 minutos, 1 hora..."
                    value={workoutDuration}
                    onChange={(e) => setWorkoutDuration(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleWorkout} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {loading ? "Criando..." : "💪 Criar Plano de Treino"}
                </Button>
              </TabsContent>

              {/* Bio para Redes Sociais */}
              <TabsContent value="bio" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="bio-description">Descreva você ou seu perfil</Label>
                  <Textarea
                    id="bio-description"
                    placeholder="Ex: Fotógrafo de viagens, amante de café, 25 anos..."
                    value={bioDescription}
                    onChange={(e) => setBioDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio-style">Estilo (opcional)</Label>
                  <Input
                    id="bio-style"
                    placeholder="Ex: profissional, divertido, inspirador..."
                    value={bioStyle}
                    onChange={(e) => setBioStyle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio-platform">Plataforma</Label>
                  <Select value={bioPlatform} onValueChange={setBioPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleBio} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {loading ? "Gerando..." : "✨ Gerar Bios"}
                </Button>
              </TabsContent>

              {/* Ideias de Posts */}
              <TabsContent value="post-ideas" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="post-niche">Seu nicho/tema</Label>
                  <Input
                    id="post-niche"
                    placeholder="Ex: fitness, culinária, empreendedorismo..."
                    value={postNiche}
                    onChange={(e) => setPostNiche(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-quantity">Quantidade de ideias</Label>
                  <Select value={postQuantity} onValueChange={setPostQuantity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 ideias</SelectItem>
                      <SelectItem value="10">10 ideias</SelectItem>
                      <SelectItem value="15">15 ideias</SelectItem>
                      <SelectItem value="20">20 ideias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handlePostIdeas} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  {loading ? "Gerando..." : "💡 Gerar Ideias"}
                </Button>
              </TabsContent>

              {/* Mensagem Comercial */}
              <TabsContent value="sales" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="sales-product">Produto/Serviço</Label>
                  <Input
                    id="sales-product"
                    placeholder="Ex: curso online, consultoria, produto físico..."
                    value={salesProduct}
                    onChange={(e) => setSalesProduct(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-target">Público-alvo</Label>
                  <Input
                    id="sales-target"
                    placeholder="Ex: empreendedores iniciantes, mães de primeira viagem..."
                    value={salesTarget}
                    onChange={(e) => setSalesTarget(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-tone">Tom da mensagem (opcional)</Label>
                  <Input
                    id="sales-tone"
                    placeholder="Ex: profissional, amigável, urgente..."
                    value={salesTone}
                    onChange={(e) => setSalesTone(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleSalesMessage} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  {loading ? "Gerando..." : "📢 Gerar Mensagens"}
                </Button>
              </TabsContent>

              {/* Ebook */}
              <TabsContent value="ebook" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="ebook-topic">Tema do ebook</Label>
                  <Input
                    id="ebook-topic"
                    placeholder="Ex: produtividade, marketing digital, saúde mental..."
                    value={ebookTopic}
                    onChange={(e) => setEbookTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ebook-chapters">Número de capítulos</Label>
                  <Select value={ebookChapters} onValueChange={setEbookChapters}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 capítulos</SelectItem>
                      <SelectItem value="5">5 capítulos</SelectItem>
                      <SelectItem value="7">7 capítulos</SelectItem>
                      <SelectItem value="10">10 capítulos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleEbook} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  {loading ? "Gerando..." : "📚 Gerar Ebook"}
                </Button>
              </TabsContent>

              {/* Resposta WhatsApp */}
              <TabsContent value="whatsapp" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-message">Mensagem recebida</Label>
                  <Textarea
                    id="whatsapp-message"
                    placeholder="Cole aqui a mensagem que você recebeu no WhatsApp..."
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-tone">Tom da resposta (opcional)</Label>
                  <Input
                    id="whatsapp-tone"
                    placeholder="Ex: formal, casual, amigável..."
                    value={whatsappTone}
                    onChange={(e) => setWhatsappTone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-context">Contexto adicional (opcional)</Label>
                  <Input
                    id="whatsapp-context"
                    placeholder="Ex: cliente reclamando, amigo pedindo favor..."
                    value={whatsappContext}
                    onChange={(e) => setWhatsappContext(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleWhatsappReply} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                >
                  {loading ? "Gerando..." : "💬 Gerar Respostas"}
                </Button>
              </TabsContent>
            </Tabs>

            {/* Result Display */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Resultado
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      toast.success("Copiado para área de transferência!");
                    }}
                  >
                    Copiar
                  </Button>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-200">{result}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-2">
                <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle className="text-base">Legenda Viral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Legendas criativas para TikTok e Instagram
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-2">
                <ChefHat className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-base">Receita 3 Ingr.</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Receitas deliciosas com apenas 3 ingredientes
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-base">Nome Negócio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Nomes criativos para sua empresa
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2">
                <FileUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-base">Currículo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Currículo profissional em segundos
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2">
                <Dumbbell className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-base">Plano Treino</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Treino personalizado para seus objetivos
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-2">
                <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-base">Bio Social</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Bios impactantes para redes sociais
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-2">
                <Lightbulb className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <CardTitle className="text-base">Ideias Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Ideias criativas para seu conteúdo
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-2">
                <Megaphone className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-base">Msg Comercial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Mensagens persuasivas de vendas
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-base">Ebook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Ebooks completos gerados por IA
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-2">
                <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle className="text-base">Resposta Zap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Respostas inteligentes para WhatsApp
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Criado com ❤️ usando IA • Todas as 14 ferramentas são gratuitas
          </p>
        </div>
      </footer>
    </div>
  );
}
