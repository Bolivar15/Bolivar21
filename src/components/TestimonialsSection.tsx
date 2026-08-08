import React from 'react';
import { TESTIMONIALS } from '../data/clinicData';
import { Star, Quote, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-[#5A6750]" />
            <span>Depoimentos & Experiências</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#2C2C2C]">
            Relatos de Quem <span className="italic text-[#5A6750] font-normal">Já Passou Por Aqui</span>
          </h2>
          <p className="text-[#6A675E] text-sm sm:text-base leading-relaxed">
            Acompanhe o impacto da psicoterapia humanizada na vida de pacientes atendidos presencialmente e online.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F5F2EA] p-6 sm:p-8 rounded-[32px] border border-[#E8E4D9] space-y-4 flex flex-col justify-between relative shadow-xs"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#A3B18A]" />
                
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E4D9] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#2C2C2C]">{t.author}</span>
                  {t.age && <span className="text-[#7A766C]">, {t.age} anos</span>}
                </div>
                <span className="text-[11px] font-bold text-[#5A6750] bg-white px-3 py-1 rounded-full border border-[#E8E4D9]">
                  {t.modality}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
