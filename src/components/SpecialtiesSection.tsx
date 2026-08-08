import React, { useState } from 'react';
import { SPECIALTIES } from '../data/clinicData';
import { SpecialtyItem, NavigationTab } from '../types';
import { Activity, Sun, Heart, Users, Briefcase, Compass, ChevronRight, X, Calendar, CheckCircle2 } from 'lucide-react';

interface SpecialtiesSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  onSelectSpecialtyForBooking?: (specialtyTitle: string) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  setActiveTab,
  onSelectSpecialtyForBooking
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-[#5A6750]" />;
      case 'Sun': return <Sun className="w-6 h-6 text-[#D4A373]" />;
      case 'Heart': return <Heart className="w-6 h-6 text-[#8C7A6B]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#5A6750]" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#A3B18A]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#D4A373]" />;
      default: return <Heart className="w-6 h-6 text-[#5A6750]" />;
    }
  };

  const handleBookSpecialty = (specialtyTitle: string) => {
    if (onSelectSpecialtyForBooking) {
      onSelectSpecialtyForBooking(specialtyTitle);
    }
    setSelectedSpecialty(null);
    setActiveTab('booking');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EA] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#5A6750]" />
            <span>Áreas de Atuação</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#2C2C2C]">
            Como Posso <span className="italic text-[#5A6750] font-normal">Te Ajudar?</span>
          </h2>
          <p className="text-[#6A675E] text-sm sm:text-base leading-relaxed">
            Conheça as principais demandas atendidas na clínica. Clique em cada área para entender os sintomas e benefícios da psicoterapia.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALTIES.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedSpecialty(item)}
              className="bg-white rounded-3xl p-7 border border-[#E8E4D9] hover:border-[#5A6750]/50 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F2EFE9] group-hover:bg-[#E8E4D9] border border-[#E8E4D9] flex items-center justify-center transition-colors">
                  {getIcon(item.iconName)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2C2C2C] group-hover:text-[#5A6750] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6A675E] mt-2 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E4D9] flex items-center justify-between text-xs font-bold text-[#5A6750] group-hover:text-[#47533E]">
                <span>Ver detalhes e sintomas</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Specialty Detail Modal */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FDFCF8] rounded-[36px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#E8E4D9]">
            
            <button
              onClick={() => setSelectedSpecialty(null)}
              className="absolute top-5 right-5 p-2 text-[#7A766C] hover:text-[#2C2C2C] rounded-full hover:bg-[#F2EFE9] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] flex items-center justify-center">
                {getIcon(selectedSpecialty.iconName)}
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#2C2C2C]">
                  {selectedSpecialty.title}
                </h3>
                <p className="text-xs text-[#5A6750] font-bold uppercase tracking-wider">Psicoterapia Especializada</p>
              </div>
            </div>

            <p className="text-sm text-[#6A675E] leading-relaxed">
              {selectedSpecialty.fullDesc}
            </p>

            {/* Symptoms list */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#2C2C2C] uppercase tracking-wider">
                Sinais e Sintomas Frequentes:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSpecialty.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#3A3A3A] bg-white p-3 rounded-2xl border border-[#E8E4D9]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A373] shrink-0" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits list */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#2C2C2C] uppercase tracking-wider">
                Ganhos com a Psicoterapia:
              </h4>
              <div className="space-y-2">
                {selectedSpecialty.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#3A3A3A] bg-[#F2EFE9] p-3 rounded-2xl border border-[#E8E4D9]">
                    <CheckCircle2 className="w-4 h-4 text-[#5A6750] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="pt-4 border-t border-[#E8E4D9] flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleBookSpecialty(selectedSpecialty.title)}
                className="flex-1 py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md shadow-[#5A6750]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Sessão Para {selectedSpecialty.title}</span>
              </button>

              <button
                onClick={() => setSelectedSpecialty(null)}
                className="px-6 py-3.5 bg-[#F2EFE9] hover:bg-[#E8E4D9] text-[#3A3A3A] rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
