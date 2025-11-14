"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Instagram, ChefHat, Lightbulb, FileUser, Dumbbell, User, Megaphone, BookOpen, Phone, Copy, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ferramentasConfig = {
  "viral-caption": {
    name: "Legenda Viral",
    description: "Cria legendas virais para TikTok e Instagram",
    icon: Instagram,
    gradient: "from-pink-500 to-purple-500",
    fields: [
      { id: "topic", label: "Tema da legenda", type: "input", placeholder: "Ex: Dicas de produtividade" },
      { id: "platform", label: "Plataforma", type: "select", options: ["instagram", "tiktok"] }
    ],
    apiEndpoint: "/api/ai/generate-viral-caption"
  },
  "recipe": {
    name: "Receitas 3 Ingredientes",
    description: "Receitas rápidas com ingredientes que já tens em casa",
    icon: ChefHat,
    gradient: "from-orange-500 to-red-500",
    fields: [
      { id: "ingredient1", label: "Ingrediente 1", type: "input", placeholder: "Ex: Ovos" },
      { id: "ingredient2", label: "Ingrediente 2", type: "input", placeholder: "Ex: Farinha" },
      { id: "ingredient3", label: "Ingrediente 3", type: "input", placeholder: "Ex: Leite" }
    ],
    apiEndpoint: "/api/ai/generate-recipe"
  },
  "business-name": {
    name: "Nome de Negócio",
    description: "Sugestões criativas e profissionais para a sua marca",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-500",
    fields: [
      { id: "industry", label: "Tipo de negócio", type: "input", placeholder: "Ex: Cafeteria, Loja de roupas" },
      { id: "style", label: "Estilo (opcional)", type: "input", placeholder: "Ex: Moderno, Clássico" }
    ],
    apiEndpoint: "/api/ai/generate-business-name"
  },
  "resume": {
    name: "Currículo",
    description: "Currículo profissional pronto em segundos",
    icon: FileUser,
    gradient: "from-blue-500 to-indigo-500",
    fields: [
      { id: "name", label: "Nome completo", type: "input", placeholder: "Seu nome" },
      { id: "profession", label: "Profissão", type: "input", placeholder: "Ex: Designer Gráfico" },
      { id: "experience", label: "Experiência (opcional)", type: "textarea", placeholder: "Descreva sua experiência profissional" },
      { id: "skills", label: "Habilidades (opcional)", type: "input", placeholder: "Ex: Photoshop, Illustrator" }
    ],
    apiEndpoint: "/api/ai/generate-resume"
  },
  "workout": {
    name: "Plano de Treino",
    description: "Treinos personalizados para os teus objetivos",
    icon: Dumbbell,
    gradient: "from-green-500 to-emerald-500",
    fields: [
      { id: "goal", label: "Objetivo", type: "input", placeholder: "Ex: Perder peso, Ganhar massa" },
      { id: "level", label: "Nível", type: "input", placeholder: "Ex: Iniciante, Intermediário" },
      { id: "duration", label: "Duração (opcional)", type: "input", placeholder: "Ex: 30 minutos" }
    ],
    apiEndpoint: "/api/ai/generate-workout"
  },
  "bio": {
    name: "Bio Social",
    description: "Bios criativas que atraem seguidores",
    icon: User,
    gradient: "from-purple-500 to-pink-500",
    fields: [
      { id: "description", label: "Descreva seu perfil", type: "textarea", placeholder: "Ex: Fotógrafo de viagens, amante de café" },
      { id: "style", label: "Estilo (opcional)", type: "input", placeholder: "Ex: Profissional, Divertido" },
      { id: "platform", label: "Plataforma", type: "select", options: ["instagram", "twitter", "linkedin"] }
    ],
    apiEndpoint: "/api/ai/generate-bio"
  },
  "post-ideas": {
    name: "Ideias de Posts",
    description: "Nunca mais fiques sem ideias para publicar",
    icon: Lightbulb,
    gradient: "from-cyan-500 to-blue-500",
    fields: [
      { id: "niche", label: "Seu nicho", type: "input", placeholder: "Ex: Marketing digital, Fitness" },
      { id: "quantity", label: "Quantidade de ideias", type: "select", options: ["5", "10", "20"] }
    ],
    apiEndpoint: "/api/ai/generate-post-ideas"
  },
  "whatsapp": {
    name: "Resposta WhatsApp",
    description: "Respostas inteligentes para qualquer mensagem",
    icon: Phone,
    gradient: "from-green-500 to-teal-500",
    fields: [
      { id: "message", label: "Mensagem recebida", type: "textarea", placeholder: "Cole a mensagem que recebeu" },
      { id: "tone", label: "Tom da resposta (opcional)", type: "input", placeholder: "Ex: Formal, Amigável" },
      { id: "context", label: "Contexto (opcional)", type: "input", placeholder: "Ex: Cliente perguntando sobre produto" }
    ],
    apiEndpoint: "/api/ai/generate-whatsapp-reply"
  },
  "sales": {
    name: "Mensagem Comercial",
    description: "Mensagens de vendas que convertem",
    icon: Megaphone,
    gradient: "from-red-500 to-pink-500",
    fields: [
      { id: "product", label: "Produto/Serviço", type: "input", placeholder: "Ex: Curso de marketing digital" },
      { id: "target", label: "Público-alvo", type: "input", placeholder: "Ex: Empreendedores iniciantes" },
      { id: "tone", label: "Tom (opcional)", type: "input", placeholder: "Ex: Persuasivo, Educativo" }
    ],
    apiEndpoint: "/api/ai/generate-sales-message"
  },
  "ebook": {
    name: "Criador de Ebook",
    description: "Ebooks completos gerados automaticamente",
    icon: BookOpen,
    gradient: "from-indigo-500 to-purple-500",
    fields: [
      { id: "topic", label: "Tema do ebook", type: "input", placeholder: "Ex: Guia completo de SEO" },
      { id: "chapters", label: "Número de capítulos", type: "select", options: ["3", "5", "7", "10"] }
    ],
    apiEndpoint: "/api/ai/generate-ebook"
  }
};

export default function FerramentaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const ferramenta = ferramentasConfig[id as keyof typeof ferramentasConfig];

  if (!ferramenta) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ferramenta não encontrada</h1>
          <Button onClick={() => router.push("/")}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  const Icon = ferramenta.icon;

  const handleSubmit = async () => {
    // Validação básica
    const requiredFields = ferramenta.fields.filter(f => !f.label.includes("opcional"));
    const missingFields = requiredFields.filter(f => !formData[f.id]?.trim());
    
    if (missingFields.length > 0) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch(ferramenta.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostrar erro específico da API
        const errorMsg = data.error || `Erro na API: ${response.status}`;
        toast.error(errorMsg);
        setResult("");
        return;
      }
      
      if (data.result) {
        setResult(data.result);
        toast.success("Conteúdo gerado com sucesso!");
      } else {
        toast.error("Resposta da API não contém resultado");
        setResult("");
      }
    } catch (error: any) {
      const errorMsg = error?.message || "Erro ao processar. Tente novamente!";
      toast.error(errorMsg);
      console.error("Erro detalhado:", error);
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copiado para área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900">
        <div className="container mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ferramenta.gradient} flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl mb-2">{ferramenta.name}</CardTitle>
                <CardDescription className="text-base">{ferramenta.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Formulário Dinâmico */}
            {ferramenta.fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.type === "input" && (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}
                {field.type === "textarea" && (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    rows={4}
                  />
                )}
                {field.type === "select" && field.options && (
                  <Select 
                    value={formData[field.id] || field.options[0]} 
                    onValueChange={(value) => handleInputChange(field.id, value)}
                  >
                    <SelectTrigger id={field.id}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}

            {/* Botão de Gerar */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-gradient-to-r ${ferramenta.gradient} hover:opacity-90 text-white text-lg py-6`}
            >
              {loading ? "Gerando..." : "Gerar Conteúdo"}
            </Button>
          </CardContent>
        </Card>

        {/* Área de Resultado - SEMPRE VISÍVEL QUANDO TEM CONTEÚDO */}
        {result && (
          <Card className="mt-8 border-2 border-green-200 dark:border-green-900 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <CardTitle className="text-xl text-green-900 dark:text-green-100">
                    Resultado Gerado
                  </CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                    {result}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
