import React, { useState, useEffect } from 'react';
import { MoodEntry, SessionReport } from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import { 
  Heart, 
  Plus, 
  Calendar, 
  Download, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Send, 
  Check, 
  Copy, 
  X, 
  User, 
  MessageSquare, 
  Flame, 
  Smile, 
  Activity,
  Share2
} from 'lucide-react';

export const MoodTracker: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Daily Form states
  const [score, setScore] = useState<number>(4); // 1 to 5
  const [anxietyLevel, setAnxietyLevel] = useState<number>(3); // 1 to 10
  const [anguishLevel, setAnguishLevel] = useState<number>(2); // 1 to 10
  const [happinessLevel, setHappinessLevel] = useState<number>(7); // 1 to 10
  const [primaryEmotion, setPrimaryEmotion] = useState<string>('Calmo / Tranquilo');
  const [notes, setNotes] = useState<string>('');
  const [gratitude, setGratitude] = useState<string>('');

  // Session Report Form states
  const [reportPatientName, setReportPatientName] = useState<string>('');
  const [reportEmotions, setReportEmotions] = useState<string[]>(['Ansioso(a)', 'Calmo(a)']);
  const [customEmotionInput, setCustomEmotionInput] = useState<string>('');
  const [reportAnxiety, setReportAnxiety] = useState<number>(4); // 0 to 10
  const [reportAnguish, setReportAnguish] = useState<number>(3); // 0 to 10
  const [reportHappiness, setReportHappiness] = useState<number>(7); // 0 to 10
  const [reportTopics, setReportTopics] = useState<string>('');

  const emotionPresets = [
    'Ansioso(a)',
    'Calmo(a)',
    'Angustiado(a)',
    'Esperançoso(a)',
    'Triste',
    'Alegre',
    'Sobrecarregado(a)',
    'Irritado(a)',
    'Cansado(a)',
    'Grato(a)',
    'Empolgado(a)',
    'Inseguro(a)'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('debora_costa_mood') || localStorage.getItem('debora_costa_pwa_mood');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar diário:", e);
      }
    } else {
      // Initial sample entry
      const initialSample: MoodEntry[] = [
        {
          id: 'entry-1',
          date: new Date().toISOString().split('T')[0],
          time: '18:30',
          score: 4,
          anxietyLevel: 3,
          anguishLevel: 2,
          happinessLevel: 8,
          primaryEmotion: 'Esperançoso',
          notes: 'Consegui realizar o exercício de respiração guiada hoje antes do trabalho. Senti uma melhora significativa!',
          gratitude: 'Agradeço pelo tempo de calma e clareza mental.'
        }
      ];
      setEntries(initialSample);
      localStorage.setItem('debora_costa_mood', JSON.stringify(initialSample));
    }
  }, []);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: MoodEntry = {
      id: `mood-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score,
      anxietyLevel,
      anguishLevel,
      happinessLevel,
      primaryEmotion,
      notes,
      gratitude
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('debora_costa_mood', JSON.stringify(updated));

    // Reset form
    setNotes('');
    setGratitude('');
    setShowAddModal(false);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Deseja realmente apagar este registro do seu diário?')) {
      const updated = entries.filter((item) => item.id !== id);
      setEntries(updated);
      localStorage.setItem('debora_costa_mood', JSON.stringify(updated));
    }
  };

  const toggleEmotionSelection = (emotion: string) => {
    if (reportEmotions.includes(emotion)) {
      setReportEmotions(reportEmotions.filter((e) => e !== emotion));
    } else {
      setReportEmotions([...reportEmotions, emotion]);
    }
  };

  const addCustomEmotion = () => {
    if (customEmotionInput.trim() && !reportEmotions.includes(customEmotionInput.trim())) {
      setReportEmotions([...reportEmotions, customEmotionInput.trim()]);
      setCustomEmotionInput('');
    }
  };

  // Generate formatted report text
  const generateFormattedReportText = () => {
    const dateStr = new Date().toLocaleDateString('pt-BR');
    const nameStr = reportPatientName.trim() || 'Paciente (Não identificado)';
    const emotionsStr = reportEmotions.length > 0 ? reportEmotions.join(', ') : 'Não especificadas';

    let text = `=======================================\n`;
    text += `RELATÓRIO DE ACOMPANHAMENTO PARA SESSÃO\n`;
    text += `Dra. Débora Costa - Psicóloga Clinica (${CLINIC_INFO.crp})\n`;
    text += `=======================================\n\n`;
    text += `• Paciente: ${nameStr}\n`;
    text += `• Data do Relatório: ${dateStr}\n\n`;
    text += `--- EMOÇÕES E SENTIMENTOS ---\n`;
    text += `• Emoções relativas ao período: ${emotionsStr}\n\n`;
    text += `--- TERMÔMETROS EMOCIONAIS (0 a 10) ---\n`;
    text += `• Termômetro de Ansiedade: ${reportAnxiety}/10 (${getAnxietyStatus(reportAnxiety)})\n`;
    text += `• Termômetro de Angústia: ${reportAnguish}/10 (${getAnguishStatus(reportAnguish)})\n`;
    text += `• Termômetro de Felicidade & Bem-Estar: ${reportHappiness}/10 (${getHappinessStatus(reportHappiness)})\n\n`;
    if (reportTopics.trim()) {
      text += `--- TÓPICOS PARA A SESSÃO ---\n`;
      text += `${reportTopics.trim()}\n\n`;
    }
    text += `=======================================`;
    return text;
  };

  const getAnxietyStatus = (val: number) => {
    if (val <= 2) return 'Ansiedade Baixa / Tranquilidade';
    if (val <= 5) return 'Ansiedade Moderada';
    if (val <= 8) return 'Ansiedade Elevada';
    return 'Ansiedade Intensa / Alerta';
  };

  const getAnguishStatus = (val: number) => {
    if (val <= 2) return 'Sem/Leve Angústia';
    if (val <= 5) return 'Angústia Intermediária';
    if (val <= 8) return 'Angústia Significativa';
    return 'Angústia Severa';
  };

  const getHappinessStatus = (val: number) => {
    if (val <= 2) return 'Baixo Bem-Estar / Tristeza';
    if (val <= 5) return 'Bem-Estar Moderado';
    if (val <= 8) return 'Bom Nível de Felicidade';
    return 'Pleno Bem-Estar / Muito Feliz';
  };

  // WhatsApp send
  const sendReportToWhatsApp = () => {
    const reportText = generateFormattedReportText();
    const url = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(reportText)}`;
    window.open(url, '_blank');
  };

  // Copy report
  const copyReportToClipboard = () => {
    const reportText = generateFormattedReportText();
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download report TXT
  const downloadReportTxt = () => {
    const reportText = generateFormattedReportText();
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatorio-Sessao-${reportPatientName ? reportPatientName.replace(/\s+/g, '_') : 'Paciente'}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getEmojiForScore = (s: number) => {
    switch (s) {
      case 5: return { label: 'Muito Bem', color: 'text-[#5A6750] bg-[#A3B18A]/15 border-[#A3B18A]', icon: '😄' };
      case 4: return { label: 'Bem / Tranquilo', color: 'text-[#5A6750] bg-[#F2EFE9] border-[#E8E4D9]', icon: '🙂' };
      case 3: return { label: 'Neutro / Ok', color: 'text-[#8C7A6B] bg-[#F2EFE9] border-[#E8E4D9]', icon: '😐' };
      case 2: return { label: 'Chateado / Triste', color: 'text-[#D4A373] bg-[#D4A373]/10 border-[#D4A373]', icon: '🙁' };
      case 1: return { label: 'Muito Sobrecarregado', color: 'text-rose-700 bg-rose-50 border-rose-200', icon: '😫' };
      default: return { label: 'Ok', color: 'text-[#7A766C] bg-[#F2EFE9] border-[#E8E4D9]', icon: '😐' };
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8] border-b border-[#E8E4D9]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-[#5A6750]" />
            <span>Autoconhecimento & Acompanhamento</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#2C2C2C]">
            Diário & <span className="italic text-[#5A6750] font-normal">Relatório para Sessão</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6A675E] max-w-xl mx-auto">
            Acompanhe seu humor diariamente e gere o relatório completo com termômetros de ansiedade, angústia e felicidade para apresentar na sua próxima consulta com a Dra. Débora Costa.
          </p>
        </div>

        {/* Action Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F5F2EA] p-4 sm:p-5 rounded-[28px] border border-[#E8E4D9] shadow-xs">
          
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md shadow-[#5A6750]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Sentimento Diário</span>
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F2EFE9] text-[#2C2C2C] border border-[#5A6750] rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4 text-[#5A6750]" />
            <span>Preencher Relatório para a Sessão</span>
          </button>

        </div>

        {/* Banner Explanatory Callout */}
        <div className="bg-[#F2EFE9]/70 border border-[#E8E4D9] rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2C2C2C]">
              <Activity className="w-4 h-4 text-[#5A6750]" />
              <span>Sua próxima sessão está chegando?</span>
            </div>
            <p className="text-xs text-[#6A675E]">
              Preencha seus termômetros emocionais (Ansiedade, Angústia e Felicidade) na janela de relatório e envie direto para a psicóloga.
            </p>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer"
          >
            Abrir Relatório
          </button>
        </div>

        {/* Daily Entries List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-[#2C2C2C] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#5A6750]" />
              <span>Histórico de Registros Diários ({entries.length})</span>
            </h3>
          </div>

          {entries.length === 0 ? (
            <div className="bg-[#F5F2EA] rounded-[36px] p-10 text-center border border-[#E8E4D9] text-[#7A766C] space-y-3">
              <BookOpen className="w-10 h-10 text-[#A3B18A] mx-auto" />
              <p className="text-sm font-semibold text-[#2C2C2C]">Seu diário ainda não possui registros.</p>
              <p className="text-xs text-[#7A766C]">Clique no botão acima para registrar seu primeiro sentimento.</p>
            </div>
          ) : (
            entries.map((item) => {
              const moodInfo = getEmojiForScore(item.score);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-[#E8E4D9] shadow-2xs space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{moodInfo.icon}</span>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${moodInfo.color}`}>
                          {moodInfo.label}
                        </span>
                        <div className="text-[11px] text-[#7A766C] mt-1">
                          {item.date.split('-').reverse().join('/')} às {item.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-3 text-xs bg-[#F5F2EA] px-3 py-1.5 rounded-full border border-[#E8E4D9]">
                        <span className="text-[#3A3A3A]">Ansiedade: <strong>{item.anxietyLevel}/10</strong></span>
                        {item.anguishLevel !== undefined && (
                          <span className="text-[#3A3A3A]">Angústia: <strong>{item.anguishLevel}/10</strong></span>
                        )}
                        {item.happinessLevel !== undefined && (
                          <span className="text-[#5A6750]">Felicidade: <strong>{item.happinessLevel}/10</strong></span>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteEntry(item.id)}
                        className="p-1.5 text-[#7A766C] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Excluir este registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Thermometers Pill */}
                  <div className="sm:hidden flex items-center justify-between text-[11px] bg-[#F5F2EA] p-2.5 rounded-xl border border-[#E8E4D9] text-[#3A3A3A]">
                    <span>Ansiedade: <strong>{item.anxietyLevel}/10</strong></span>
                    <span>Angústia: <strong>{item.anguishLevel ?? 0}/10</strong></span>
                    <span>Felicidade: <strong className="text-[#5A6750]">{item.happinessLevel ?? 0}/10</strong></span>
                  </div>

                  {item.primaryEmotion && (
                    <div className="text-xs text-[#6A675E]">
                      <strong>Emoção em Destaque:</strong> <span className="text-[#5A6750] font-bold">{item.primaryEmotion}</span>
                    </div>
                  )}

                  {item.notes && (
                    <p className="text-xs text-[#3A3A3A] bg-[#FDFCF8] p-3.5 rounded-2xl border border-[#E8E4D9] leading-relaxed italic">
                      "{item.notes}"
                    </p>
                  )}

                  {item.gratitude && (
                    <div className="text-xs text-[#5A6750] bg-[#F2EFE9] p-3 rounded-2xl border border-[#E8E4D9] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                      <span><strong>Gratidão:</strong> {item.gratitude}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 1. JANELA / MODAL DE RELATÓRIO PARA A SESSÃO (SOLICITADO) */}
      {/* ========================================================= */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-[#FDFCF8] rounded-[36px] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#E8E4D9] my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#5A6750]/15 flex items-center justify-center text-[#5A6750]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2C2C2C]">
                    Relatório Pré-Sessão Terapêutica
                  </h3>
                  <p className="text-xs text-[#7A766C]">
                    Preencha e envie suas percepções para a Dra. Débora Costa
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 text-[#7A766C] hover:text-[#2C2C2C] rounded-full hover:bg-[#F2EFE9] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              
              {/* Nome do Paciente */}
              <div className="space-y-1.5">
                <label className="block font-bold text-[#2C2C2C] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#5A6750]" />
                  <span>Seu Nome Completo:</span>
                </label>
                <input
                  type="text"
                  value={reportPatientName}
                  onChange={(e) => setReportPatientName(e.target.value)}
                  placeholder="Digite seu nome para identificar o relatório..."
                  className="w-full p-3.5 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-xs font-medium focus:outline-hidden focus:border-[#5A6750]"
                />
              </div>

              {/* Suas Emoções */}
              <div className="space-y-2 pt-2 border-t border-[#E8E4D9]">
                <label className="block font-bold text-[#2C2C2C] uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#5A6750]" />
                  <span>Suas Emoções e Sentimentos Atuais:</span>
                </label>
                <p className="text-[11px] text-[#7A766C]">
                  Selecione as emoções que definem como você tem se sentido nos últimos dias:
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {emotionPresets.map((emo) => {
                    const isSelected = reportEmotions.includes(emo);
                    return (
                      <button
                        key={emo}
                        type="button"
                        onClick={() => toggleEmotionSelection(emo)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#5A6750] text-white border-[#5A6750] shadow-xs'
                            : 'bg-white text-[#555248] border-[#E8E4D9] hover:bg-[#F2EFE9]'
                        }`}
                      >
                        {isSelected ? `✓ ${emo}` : `+ ${emo}`}
                      </button>
                    );
                  })}
                </div>

                {/* Adicionar emoção personalizada */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={customEmotionInput}
                    onChange={(e) => setCustomEmotionInput(e.target.value)}
                    placeholder="Outra emoção específica..."
                    className="flex-1 p-2.5 rounded-xl border border-[#E8E4D9] bg-white text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomEmotion();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addCustomEmotion}
                    className="px-4 py-2.5 bg-[#F2EFE9] border border-[#E8E4D9] hover:bg-[#E8E4D9] text-[#2C2C2C] rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>
              </div>

              {/* Termômetros de Medição */}
              <div className="space-y-4 pt-3 border-t border-[#E8E4D9]">
                <div className="font-bold text-[#2C2C2C] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#D4A373]" />
                  <span>Termômetros de Medição Emocional (0 a 10):</span>
                </div>

                {/* Termômetro 1: Ansiedade */}
                <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E4D9] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2C2C2C] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      Termômetro de Ansiedade:
                    </span>
                    <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full text-xs">
                      {reportAnxiety} / 10 ({getAnxietyStatus(reportAnxiety)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={reportAnxiety}
                    onChange={(e) => setReportAnxiety(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7A766C]">
                    <span>0 - Nenhuma</span>
                    <span>5 - Moderada</span>
                    <span>10 - Ansiedade Máxima</span>
                  </div>
                </div>

                {/* Termômetro 2: Angústia */}
                <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E4D9] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2C2C2C] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      Termômetro de Angústia:
                    </span>
                    <span className="font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full text-xs">
                      {reportAnguish} / 10 ({getAnguishStatus(reportAnguish)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={reportAnguish}
                    onChange={(e) => setReportAnguish(parseInt(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7A766C]">
                    <span>0 - Nenhuma</span>
                    <span>5 - Moderada</span>
                    <span>10 - Angústia Severa</span>
                  </div>
                </div>

                {/* Termômetro 3: Felicidade / Bem-Estar */}
                <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E4D9] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2C2C2C] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5A6750] inline-block" />
                      Termômetro de Felicidade & Bem-Estar:
                    </span>
                    <span className="font-bold text-[#5A6750] bg-[#A3B18A]/20 px-2.5 py-0.5 rounded-full text-xs">
                      {reportHappiness} / 10 ({getHappinessStatus(reportHappiness)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={reportHappiness}
                    onChange={(e) => setReportHappiness(parseInt(e.target.value))}
                    className="w-full accent-[#5A6750] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7A766C]">
                    <span>0 - Muito Baixo</span>
                    <span>5 - Moderado</span>
                    <span>10 - Plena Felicidade</span>
                  </div>
                </div>

              </div>

              {/* Tópicos para a Sessão */}
              <div className="space-y-1.5 pt-2 border-t border-[#E8E4D9]">
                <label className="block font-bold text-[#2C2C2C] uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#5A6750]" />
                  <span>O que você gostaria de abordar na consulta com a Dra. Débora?</span>
                </label>
                <textarea
                  rows={3}
                  value={reportTopics}
                  onChange={(e) => setReportTopics(e.target.value)}
                  placeholder="Escreva situações, dúvidas, pensamentos ou acontecimentos recentes que queira conversa na sessão..."
                  className="w-full p-3.5 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-xs resize-none focus:outline-hidden focus:border-[#5A6750]"
                />
              </div>

              {/* Pre visualização do Relatório Formatado */}
              <div className="p-4 bg-white border border-[#E8E4D9] rounded-2xl space-y-2">
                <div className="font-bold text-[#2C2C2C] text-xs flex items-center justify-between">
                  <span>Prévia do Relatório Formatado:</span>
                  <button
                    type="button"
                    onClick={copyReportToClipboard}
                    className="text-[11px] text-[#5A6750] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>
                <pre className="text-[11px] text-[#555248] bg-[#FDFCF8] p-3 rounded-xl border border-[#E8E4D9] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
                  {generateFormattedReportText()}
                </pre>
              </div>

              {/* Botões de Ação */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={sendReportToWhatsApp}
                  className="flex-1 py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full font-bold transition-all shadow-md shadow-[#5A6750]/20 flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar para Dra. Débora no WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={downloadReportTxt}
                  className="px-5 py-3.5 bg-white border border-[#E8E4D9] text-[#2C2C2C] hover:bg-[#F2EFE9] rounded-full font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <Download className="w-4 h-4 text-[#5A6750]" />
                  <span>Baixar TXT</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. REGISTRO DIÁRIO DE HUMOR (COM OS TRÊS TERMÔMETROS) */}
      {/* ========================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-[#FDFCF8] rounded-[36px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#E8E4D9] my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-4">
              <h3 className="font-serif font-bold text-lg text-[#2C2C2C] flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#5A6750]" />
                <span>Novo Registro do Diário</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-[#7A766C] hover:text-[#2C2C2C] cursor-pointer"
              >
                Cancelar
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4 text-xs">
              
              {/* Mood Scale 1 to 5 */}
              <div className="space-y-2">
                <label className="block font-bold text-[#2C2C2C] uppercase tracking-wider">
                  Como você avalia seu humor hoje? (1 a 5)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { score: 1, emoji: '😫', label: 'Muito Ruim' },
                    { score: 2, emoji: '🙁', label: 'Ruim' },
                    { score: 3, emoji: '😐', label: 'Neutro' },
                    { score: 4, emoji: '🙂', label: 'Bem' },
                    { score: 5, emoji: '😄', label: 'Excelente' }
                  ].map((item) => (
                    <button
                      key={item.score}
                      type="button"
                      onClick={() => setScore(item.score)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        score === item.score
                          ? 'border-[#5A6750] bg-white ring-2 ring-[#5A6750]/20'
                          : 'border-[#E8E4D9] bg-[#F2EFE9] hover:bg-white'
                      }`}
                    >
                      <div className="text-2xl">{item.emoji}</div>
                      <div className="text-[10px] font-bold text-[#3A3A3A] mt-1">{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Termômetros do Registro Diário */}
              <div className="space-y-3 pt-2 border-t border-[#E8E4D9]">
                
                {/* Ansiedade */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#2C2C2C] uppercase tracking-wider">
                      Termômetro de Ansiedade:
                    </label>
                    <span className="font-bold text-[#5A6750] text-xs">{anxietyLevel} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={anxietyLevel}
                    onChange={(e) => setAnxietyLevel(parseInt(e.target.value))}
                    className="w-full accent-[#5A6750]"
                  />
                </div>

                {/* Angústia */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#2C2C2C] uppercase tracking-wider">
                      Termômetro de Angústia:
                    </label>
                    <span className="font-bold text-rose-700 text-xs">{anguishLevel} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={anguishLevel}
                    onChange={(e) => setAnguishLevel(parseInt(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>

                {/* Felicidade */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#2C2C2C] uppercase tracking-wider">
                      Termômetro de Felicidade & Bem-Estar:
                    </label>
                    <span className="font-bold text-[#5A6750] text-xs">{happinessLevel} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={happinessLevel}
                    onChange={(e) => setHappinessLevel(parseInt(e.target.value))}
                    className="w-full accent-[#5A6750]"
                  />
                </div>

              </div>

              {/* Emoção Principal */}
              <div className="space-y-1 pt-2">
                <label className="block font-bold text-[#2C2C2C] uppercase tracking-wider">
                  Emoção Principal do Dia:
                </label>
                <select
                  value={primaryEmotion}
                  onChange={(e) => setPrimaryEmotion(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-xs font-medium"
                >
                  <option value="Calmo / Tranquilo">Calmo / Tranquilo</option>
                  <option value="Ansioso / Inquieto">Ansioso / Inquieto</option>
                  <option value="Angustiado / Sensível">Angustiado / Sensível</option>
                  <option value="Triste / Desanimado">Triste / Desanimado</option>
                  <option value="Sobrecarregado / Cansado">Sobrecarregado / Cansado</option>
                  <option value="Esperançoso / Animado">Esperançoso / Animado</option>
                  <option value="Alegre / Feliz">Alegre / Feliz</option>
                  <option value="Irritado / Impaciente">Irritado / Impaciente</option>
                </select>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="block font-bold text-[#2C2C2C] uppercase tracking-wider">
                  O que aconteceu hoje? (Pensamentos/Fatos)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Escreva brevemente o que marcou seu dia..."
                  className="w-full p-3 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-xs resize-none"
                />
              </div>

              {/* Gratitude */}
              <div className="space-y-1">
                <label className="block font-bold text-[#2C2C2C] uppercase tracking-wider">
                  Uma coisa pela qual você é grato(a) hoje:
                </label>
                <input
                  type="text"
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  placeholder="Ex: Um café em paz, o apoio da minha família..."
                  className="w-full p-3 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full font-bold transition-all shadow-md shadow-[#5A6750]/20 cursor-pointer"
                >
                  Salvar no Diário
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3.5 bg-white border border-[#E8E4D9] text-[#3A3A3A] hover:bg-[#F2EFE9] rounded-full font-bold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </section>
  );
};
