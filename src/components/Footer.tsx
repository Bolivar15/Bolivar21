import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { NavigationTab } from '../types';
import { Heart, MapPin, Phone, Mail, Instagram, ShieldCheck, AlertCircle, Calendar, Settings, Lock } from 'lucide-react';
import { useDoctorPhoto } from '../hooks/useDoctorPhoto';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { isAdminMode, toggleAdminMode } = useDoctorPhoto();

  return (
    <footer className="bg-[#2C2C2C] text-[#A8A498] text-xs border-t border-[#3A3A3A]">
      
      {/* Top emergency warning bar */}
      <div className="bg-[#232323] border-b border-[#3A3A3A] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#D4A373] font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{CLINIC_INFO.emergencyNotice}</span>
          </div>
          <a
            href="tel:188"
            className="px-3.5 py-1 bg-[#D4A373]/20 hover:bg-[#D4A373]/30 text-[#D4A373] border border-[#D4A373]/30 rounded-full font-bold transition-colors shrink-0"
          >
            Ligar CVV 188
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5A6750] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
                DC
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#FDFCF8]">{CLINIC_INFO.name}</h3>
                <p className="text-[#A3B18A] font-semibold">{CLINIC_INFO.crp}</p>
              </div>
            </div>

            <p className="text-[#A8A498] leading-relaxed max-w-sm">
              {CLINIC_INFO.bio}
            </p>

            <div className="flex items-center gap-2 text-[#D8D4C8]">
              <ShieldCheck className="w-4 h-4 text-[#A3B18A] shrink-0" />
              <span>Atendimento pautado pelo Código de Ética Profissional do Psicólogo (CFP).</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-[#FDFCF8] text-sm uppercase tracking-wider">Acesso Rápido</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#FDFCF8] transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#FDFCF8] transition-colors cursor-pointer">
                  Sobre a Dra. Débora
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('specialties')} className="hover:text-[#FDFCF8] transition-colors cursor-pointer">
                  Áreas de Atuação
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('booking')} className="hover:text-[#FDFCF8] transition-colors cursor-pointer">
                  Agendar Consulta
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('mood')} className="hover:text-[#FDFCF8] transition-colors cursor-pointer">
                  Diário de Emoções
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-[#FDFCF8] text-sm uppercase tracking-wider">Contatos e Atendimento</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A3B18A] shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <a 
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#FDFCF8] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#A3B18A] shrink-0" />
                <span>{CLINIC_INFO.phone} (WhatsApp)</span>
              </a>
              <a 
                href={`mailto:${CLINIC_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-[#FDFCF8] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#A3B18A] shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </a>
              <a 
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#FDFCF8] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>{CLINIC_INFO.instagram}</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('booking')}
                className="px-5 py-2.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full font-bold transition-all flex items-center gap-2 shadow-md shadow-[#5A6750]/20 cursor-pointer text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Sessão</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#3A3A3A] text-center text-[11px] text-[#7A766C] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} {CLINIC_INFO.name} ({CLINIC_INFO.crp}). Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Plataforma de Saúde Mental.</span>
            <button
              onClick={toggleAdminMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                isAdminMode
                  ? 'bg-[#D4A373] text-[#2C2C2C] font-bold'
                  : 'bg-[#232323] text-[#A8A498] hover:text-white hover:bg-[#383838]'
              }`}
              title={isAdminMode ? 'Modo de Edição Ativo (Clique para Ocultar Botoes)' : 'Ativar Modo de Edição/Troca de Foto'}
            >
              {isAdminMode ? <Settings className="w-3 h-3 animate-spin" /> : <Lock className="w-3 h-3" />}
              <span>{isAdminMode ? 'Modo Edição ON' : 'Área do Profissional'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
