import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { NavigationTab } from '../types';
import { Heart, ShieldCheck, CheckCircle2, Award, Clock, Calendar, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ setActiveTab }) => {

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8] text-[#3A3A3A] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#5A6750]" />
            <span>Sobre a Profissional</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#2C2C2C]">
            Conheça a <span className="italic text-[#5A6750] font-normal">Dra. Débora Costa</span>
          </h2>
          <p className="text-[#6A675E] text-sm sm:text-base leading-relaxed">
            Dedicação constante à saúde mental, oferecendo psicoterapias fundamentadas na ética, no respeito às singularidades e em evidências científicas.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Credentials Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#F5F2EA] p-6 sm:p-8 rounded-[36px] border border-[#E8E4D9] shadow-inner space-y-6">
              
              {/* Doctor Photo Card */}
              <div className="relative overflow-hidden rounded-[28px] border-2 border-[#D4A373]/40 shadow-md bg-[#5A6750]">
                <img
                  src="/dra-debora.jpg"
                  alt={CLINIC_INFO.name}
                  className="w-full aspect-[4/5] object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2C2C2C]/90 via-[#2C2C2C]/50 to-transparent p-5 text-white">
                  <h3 className="text-xl font-serif font-bold text-[#FDFCF8]">
                    {CLINIC_INFO.name}
                  </h3>
                  <p className="text-xs font-bold text-[#A3B18A] uppercase tracking-wider mt-0.5">{CLINIC_INFO.crp}</p>
                  <p className="text-xs text-[#D8D4C8] mt-0.5">{CLINIC_INFO.title}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#3A3A3A] pt-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5A6750] shrink-0" />
                  <span>Especialista em Terapia Cognitivo-Comportamental</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5A6750] shrink-0" />
                  <span>Técnicas Práticas de Reestruturação Cognitiva</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5A6750] shrink-0" />
                  <span>Atendimento Clínico 100% Online com Sigilo CFP</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('booking')}
                className="w-full py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md shadow-[#5A6750]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta Com a Dra. Débora</span>
              </button>
            </div>
          </div>

          {/* Philosophy & Approach Details */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4 text-[#6A675E] text-sm leading-relaxed">
              <h3 className="text-xl font-serif font-light text-[#2C2C2C] flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#5A6750]" />
                <span>O Propósito do Meu Trabalho</span>
              </h3>
              <p>
                {CLINIC_INFO.bio}
              </p>
              <p>
                Iniciar a psicoterapia é um ato de coragem e autocuidado. Muitas vezes nos sentimos paralisados por pensamentos repetitivos de ansiedade, sobrecarregados pelas exigências do cotidiano ou sem clareza sobre nossas próprias vontades.
              </p>
              <p>
                O meu compromisso como psicóloga é proporcionar um ambiente seguro, acolhedor e neutro — livre de julgamentos — para que você possa expressar suas dores, compreender suas emoções e construir estratégias práticas de enfrentamento.
              </p>
            </div>

            {/* Core Values / Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-3xl bg-white border border-[#E8E4D9] space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#2C2C2C] text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#5A6750]" />
                  <span>Sigilo & Ética Profissional</span>
                </div>
                <p className="text-xs text-[#7A766C] leading-relaxed">
                  Todas as sessões seguem rigorosamente o Código de Ética Profissional do Psicólogo (CFP), garantindo confidencialidade absoluta.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#E8E4D9] space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#2C2C2C] text-sm">
                  <Clock className="w-4 h-4 text-[#D4A373]" />
                  <span>Sessões de 50 Minutos</span>
                </div>
                <p className="text-xs text-[#7A766C] leading-relaxed">
                  Tempo estruturado para focar na sua demanda, garantindo escuta atenta e encaminhamentos práticos a cada encontro.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
