"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Check } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  currentPlan: "free" | "pro" | "premium";
  onUpgrade: (plan: "pro" | "premium") => void;
}

export function UpgradeModal({ open, onClose, message, currentPlan, onUpgrade }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            Upgrade Necessário
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Plano Pro */}
          {currentPlan === "free" && (
            <div className="border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">R$ 29</div>
                <p className="text-sm text-gray-500">por mês</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gerações ilimitadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Todas ferramentas básicas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sem anúncios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suporte prioritário</span>
                </li>
              </ul>
              <Button
                onClick={() => {
                  onUpgrade("pro");
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                Assinar Pro
              </Button>
            </div>
          )}

          {/* Plano Premium */}
          <div className="border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              RECOMENDADO
            </div>
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Premium</h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">R$ 79</div>
              <p className="text-sm text-gray-500">por mês</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Tudo do Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">10 ferramentas exclusivas</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Acesso total sem limites</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Suporte 24/7</span>
              </li>
            </ul>
            <Button
              onClick={() => {
                onUpgrade("premium");
                onClose();
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
            >
              Assinar Premium
            </Button>
          </div>
        </div>

        <div className="text-center mt-4">
          <Button variant="ghost" onClick={onClose}>
            Agora não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
