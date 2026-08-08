import React, { useState } from 'react';
import { FAQS } from '../data/clinicData';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [search, setSearch] = useState<string>('');

  const filteredFaqs = FAQS.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8] border-b border-[#E8E4D9]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-[#5A6750]" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#2C2C2C]">
            Dúvidas Comuns <span className="italic text-[#5A6750] font-normal">Sobre Psicoterapia</span>
          </h2>
          <p className="text-[#6A675E] text-sm max-w-lg mx-auto">
            Encontre respostas para as principais questões sobre os atendimentos e a primeira sessão.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#7A766C] absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar dúvida por palavra-chave (ex: sigilo, primeira sessão)..."
            className="w-full pl-11 pr-4 py-3 bg-[#F5F2EA] border border-[#E8E4D9] rounded-2xl text-xs text-[#2C2C2C] focus:outline-hidden focus:border-[#5A6750]"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#7A766C]">
              Nenhuma pergunta encontrada com o termo "{search}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#F5F2EA] rounded-3xl border border-[#E8E4D9] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-[#2C2C2C] text-sm flex items-center justify-between gap-4 hover:bg-[#E8E4D9]/40 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#5A6750] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7A766C] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-[#3A3A3A] leading-relaxed border-t border-[#E8E4D9] pt-3 bg-white/70">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
