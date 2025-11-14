"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserPlan = "free" | "pro" | "premium";

interface UsageCount {
  [toolId: string]: {
    count: number;
    lastReset: string;
  };
}

interface PlanContextType {
  userPlan: UserPlan;
  setUserPlan: (plan: UserPlan) => void;
  canUseTool: (toolId: string, isPremiumOnly: boolean) => { allowed: boolean; reason?: string };
  incrementUsage: (toolId: string) => void;
  getUsageCount: (toolId: string) => number;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const DAILY_LIMIT_FREE = 3;
const STORAGE_KEY_PLAN = "userPlan";
const STORAGE_KEY_USAGE = "toolUsage";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlanState] = useState<UserPlan>("free");
  const [usageCount, setUsageCount] = useState<UsageCount>({});

  // Carregar plano do localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem(STORAGE_KEY_PLAN) as UserPlan;
    if (savedPlan && ["free", "pro", "premium"].includes(savedPlan)) {
      setUserPlanState(savedPlan);
    }

    const savedUsage = localStorage.getItem(STORAGE_KEY_USAGE);
    if (savedUsage) {
      try {
        setUsageCount(JSON.parse(savedUsage));
      } catch (e) {
        console.error("Erro ao carregar contagem de uso:", e);
      }
    }
  }, []);

  // Salvar plano no localStorage
  const setUserPlan = (plan: UserPlan) => {
    setUserPlanState(plan);
    localStorage.setItem(STORAGE_KEY_PLAN, plan);
  };

  // Resetar contagem se passou 24h
  const resetIfNeeded = (toolId: string) => {
    const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const toolUsage = usageCount[toolId];

    if (!toolUsage || toolUsage.lastReset !== now) {
      return { count: 0, lastReset: now };
    }

    return toolUsage;
  };

  // Verificar se pode usar ferramenta
  const canUseTool = (toolId: string, isPremiumOnly: boolean): { allowed: boolean; reason?: string } => {
    // Premium pode usar tudo
    if (userPlan === "premium") {
      return { allowed: true };
    }

    // Ferramentas premium_only bloqueadas para free e pro
    if (isPremiumOnly) {
      if (userPlan === "free") {
        return { 
          allowed: false, 
          reason: "Esta ferramenta é exclusiva. Faz upgrade para Pro ou Premium para desbloquear mais funcionalidades." 
        };
      }
      if (userPlan === "pro") {
        return { 
          allowed: false, 
          reason: "Ferramenta exclusiva para o plano Premium. Faz upgrade para desbloquear tudo." 
        };
      }
    }

    // Pro pode usar ferramentas normais sem limite
    if (userPlan === "pro") {
      return { allowed: true };
    }

    // Free: verificar limite diário
    if (userPlan === "free") {
      const usage = resetIfNeeded(toolId);
      if (usage.count >= DAILY_LIMIT_FREE) {
        return { 
          allowed: false, 
          reason: "Limite diário atingido nesta ferramenta. Volta amanhã ou faz upgrade para Pro/Premium." 
        };
      }
      return { allowed: true };
    }

    return { allowed: true };
  };

  // Incrementar uso
  const incrementUsage = (toolId: string) => {
    if (userPlan !== "free") return; // Só conta para free

    const usage = resetIfNeeded(toolId);
    const newUsage = {
      ...usageCount,
      [toolId]: {
        count: usage.count + 1,
        lastReset: usage.lastReset,
      },
    };

    setUsageCount(newUsage);
    localStorage.setItem(STORAGE_KEY_USAGE, JSON.stringify(newUsage));
  };

  // Obter contagem atual
  const getUsageCount = (toolId: string): number => {
    if (userPlan !== "free") return 0;
    const usage = resetIfNeeded(toolId);
    return usage.count;
  };

  return (
    <PlanContext.Provider value={{ userPlan, setUserPlan, canUseTool, incrementUsage, getUsageCount }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan deve ser usado dentro de PlanProvider");
  }
  return context;
}
