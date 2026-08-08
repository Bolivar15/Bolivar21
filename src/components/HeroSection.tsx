import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { NavigationTab } from '../types';
import { Calendar, Heart, ShieldCheck, Video, Sparkles, Award } from 'lucide-react';
import { useDoctorPhoto } from '../hooks/useDoctorPhoto';

interface HeroSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab
}) => {
  const { photoUrl, uploadPhoto, isAdminMode } = useDoctorPhoto();

  return (
    <section className="relative overflow-hidden bg-[#FDFCF8] text-[#3A3A3A] pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E8E4D9]">
      
      {/* Decorative subtle background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#A3B18A]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-[#D4A373]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badges */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#5A6750]" />
              <span>Psicoterapia 100% Online • TCC & Psicanálise</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-[#2C2C2C] leading-[1.1]">
              Um refúgio para o seu <span className="italic text-[#5A6750] font-normal">crescimento</span> e transformação pessoal.
            </h1>

            <p className="text-base sm:text-lg text-[#6A675E] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Acompanhamento psicológico humanizado focado no acolhimento e na resiliência emocional. Atendimento 100% online individual para ansiedade, depressão e conflitos no conforto e privacidade do seu ambiente.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setActiveTab('booking')}
                className="px-8 py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full font-bold text-sm shadow-lg shadow-[#5A6750]/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta Online</span>
              </button>

              <button
                onClick={() => setActiveTab('mood')}
                className="px-6 py-3.5 bg-[#F2EFE9] hover:bg-[#E8E4D9] border border-[#E8E4D9] text-[#5A6750] rounded-full font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#D4A373]" />
                <span>Diário de Emoções</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-[#E8E4D9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/30">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C2C2C]">Atendimento 100% Online</div>
                  <div className="text-[11px] text-[#7A766C]">Videoconferência segura (Brasil e Exterior)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#8C7A6B]/20 text-[#8C7A6B] border border-[#8C7A6B]/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C2C2C]">Ética & Acolhimento</div>
                  <div className="text-[11px] text-[#7A766C]">Sigilo total CFP</div>
                </div>
              </div>
            </div>

          </div>

          {/* Natural Tones Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#F5F2EA] rounded-[36px] sm:rounded-[48px] p-6 sm:p-8 border border-[#E8E4D9] shadow-inner space-y-6">
              
              {/* Profile Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#D4A373] shadow-md shrink-0 bg-[#5A6750]">
                      <img
                        src={photoUrl}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== '/dra-debora.jpg') {
                            target.src = '/dra-debora.jpg';
                          }
                        }}
                        alt={CLINIC_INFO.name}
                        className="w-full h-full object-cover object-[center_15%]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#2C2C2C]">
                      {CLINIC_INFO.name}
                    </h3>
                    <p className="text-xs text-[#5A6750] font-bold uppercase tracking-wider">{CLINIC_INFO.crp}</p>
                    <p className="text-xs text-[#7A766C]">Psicologia Clínica & Saúde Mental</p>
                  </div>
                </div>

                {/* Direct Upload Button (Always accessible) */}
                <div className="shrink-0">
                  <input
                    type="file"
                    id="hero-photo-upload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        uploadPhoto(e.target.files[0]);
                      }
                    }}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="hero-photo-upload"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#5A6750] hover:bg-[#47533E] text-white text-xs font-semibold rounded-full shadow-sm cursor-pointer transition-all hover:scale-105"
                    title="Trocar a foto exibida no site"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>Trocar Foto</span>
                  </label>
                </div>
              </div>

              {/* Stat pills */}
              <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-3xl border border-[#E8E4D9] text-center shadow-xs">
                <div>
                  <div className="text-xl font-bold text-[#5A6750] font-serif">{CLINIC_INFO.sessionsCount}</div>
                  <div className="text-[11px] text-[#7A766C] font-semibold">Sessões Realizadas</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#D4A373] font-serif">{CLINIC_INFO.experienceYears} Anos</div>
                  <div className="text-[11px] text-[#7A766C] font-semibold">Prática Clínica</div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#3A3A3A] bg-white p-4 rounded-3xl border border-[#E8E4D9]">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#5A6750] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Abordagem baseada em evidências, com escuta atenta, autocompaixão e reestruturação cognitiva.
                  </span>
                </div>
              </div>

              {/* Horários disponíveis badge */}
              <div className="pt-2 border-t border-[#E8E4D9] flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
                <span className="text-[11px] font-bold text-[#5A6750] uppercase tracking-wider">Horários disponíveis para consulta online</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
