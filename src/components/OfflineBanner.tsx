import React from 'react';
import { WifiOff, ShieldCheck } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="bg-[#D4A373] text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 text-center shadow-inner">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>
        Você está navegando em modo offline. O aplicativo continua funcional para o seu Diário de Emoções, Exercício de Respiração e Agendamento Local.
      </span>
    </div>
  );
};
