import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { NavigationTab } from '../types';
import {
  Calendar,
  Heart,
  Bot,
  Compass,
  FileText,
  HelpCircle,
  Download,
  Wifi,
  WifiOff,
  UserCheck,
  Menu,
  X,
  Wind
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isOnline
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Início', icon: <Heart className="w-4 h-4" /> },
    { id: 'about', label: 'Dra. Débora', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'specialties', label: 'Especialidades', icon: <Compass className="w-4 h-4" /> },
    { id: 'booking', label: 'Agendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'mood', label: 'Diário de Emoções', icon: <Heart className="w-4 h-4" /> },
    { id: 'breathing', label: 'Respiração Guiada', icon: <Wind className="w-4 h-4" /> },
    { id: 'faq', label: 'Dúvidas', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  const handleTabClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#E8E4D9] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & CRP */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-[#5A6750] flex items-center justify-center text-white shadow-md shadow-[#5A6750]/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-serif italic text-xl tracking-tight">D</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#2C2C2C] tracking-tight">
                  {CLINIC_INFO.name}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A6750] bg-[#F2EFE9] border border-[#E8E4D9] rounded-full">
                  {CLINIC_INFO.crp}
                </span>
              </div>
              <p className="text-xs text-[#7A766C] font-medium">
                {CLINIC_INFO.title}
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F5F2EA] p-1.5 rounded-full border border-[#E8E4D9]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#5A6750] text-white shadow-xs'
                      : 'text-[#555248] hover:text-[#2C2C2C] hover:bg-[#E8E4D9]/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Online Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Online / Offline status badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isOnline
                  ? 'bg-[#F2EFE9] text-[#5A6750] border-[#A3B18A]/50'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={isOnline ? 'Conectado à internet' : 'Modo Offline Ativo'}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-[#5A6750] animate-pulse" />
                  <span className="hidden sm:inline text-[11px] font-bold">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline text-[11px] font-bold">Offline</span>
                </>
              )}
            </div>

            {/* WhatsApp Direct CTA */}
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Olá Dra. Débora Costa, gostaria de agendar uma consulta online.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md shadow-[#5A6750]/20 transition-all cursor-pointer"
            >
              WhatsApp
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#3A3A3A] hover:text-[#2C2C2C] rounded-xl hover:bg-[#F2EFE9] transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E4D9] bg-[#FDFCF8] px-4 pt-3 pb-6 space-y-1 shadow-lg">
          <div className="px-2 pb-2 text-[10px] font-bold text-[#5A6750] uppercase tracking-wider">
            Navegação do Aplicativo
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#5A6750] text-white'
                    : 'text-[#3A3A3A] hover:bg-[#F2EFE9]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-[#E8E4D9] flex flex-col gap-2">
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Olá Dra. Débora Costa, gostaria de informações sobre agendamento.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs"
            >
              Falar via WhatsApp Direct
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
