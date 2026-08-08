import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Heart, ShieldCheck, Volume2, VolumeX } from 'lucide-react';

export const BreathingExercise: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // 4-7-8 Technique timing
  const INHALE_TIME = 4;
  const HOLD_TIME = 7;
  const EXHALE_TIME = 8;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Transition phases
            if (phase === 'inhale') {
              setPhase('hold');
              return HOLD_TIME;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return EXHALE_TIME;
            } else {
              setPhase('inhale');
              setCyclesCompleted((c) => c + 1);
              return INHALE_TIME;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, phase]);

  const handleReset = () => {
    setIsRunning(false);
    setPhase('inhale');
    setSeconds(INHALE_TIME);
    setCyclesCompleted(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inspire profundamente pelo nariz...';
      case 'hold': return 'Segure o ar suavemente...';
      case 'exhale': return 'Solte o ar devagar pela boca...';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 'scale-125 bg-[#5A6750]/20 border-[#5A6750]';
      case 'hold': return 'scale-125 bg-[#D4A373]/30 border-[#D4A373]';
      case 'exhale': return 'scale-90 bg-[#A3B18A]/20 border-[#A3B18A]';
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8] border-b border-[#E8E4D9]">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
            <Wind className="w-3.5 h-3.5 text-[#5A6750]" />
            <span>Técnica TCC Antiansiedade</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#2C2C2C]">
            Exercício de <span className="italic text-[#5A6750] font-normal">Respiração Guiada (4-7-8)</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6A675E] max-w-lg mx-auto">
            A respiração ritmada ativa o sistema nervoso parassimpático, reduzindo rapidamente o ritmo cardíaco, a ansiedade e a tensão muscular.
          </p>
        </div>

        {/* Breathing Visual Stage */}
        <div className="bg-[#F5F2EA] rounded-[36px] p-8 sm:p-12 border border-[#E8E4D9] shadow-inner relative overflow-hidden flex flex-col items-center justify-center space-y-8">
          
          {/* Animated Circle */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            {/* Outer Expanding Aura */}
            <div
              className={`absolute inset-0 rounded-full border-2 transition-all duration-[1000ms] ease-in-out ${getCircleScale()}`}
            />

            {/* Inner Core */}
            <div className="w-48 h-48 rounded-full bg-[#5A6750] text-white flex flex-col items-center justify-center shadow-xl space-y-1 transition-transform duration-700">
              <span className="text-4xl font-bold font-serif">{seconds}s</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#A3B18A]">
                {phase === 'inhale' ? 'Inspire' : phase === 'hold' ? 'Segure' : 'Expire'}
              </span>
            </div>

          </div>

          {/* Guidance Message */}
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-[#2C2C2C]">
              {getPhaseText()}
            </h3>
            <p className="text-xs text-[#7A766C]">
              Ciclos Concluídos: <strong className="text-[#5A6750] font-bold">{cyclesCompleted}</strong>
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md shadow-[#5A6750]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pausar' : 'Iniciar Respiração'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-3.5 bg-white border border-[#E8E4D9] hover:bg-[#F2EFE9] text-[#3A3A3A] rounded-full transition-colors cursor-pointer"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4 text-[#5A6750]" />
            </button>
          </div>

        </div>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-left">
          <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] space-y-1">
            <div className="font-bold text-[#2C2C2C]">1. Inspire (4s)</div>
            <p className="text-[#7A766C]">Pelo nariz, de forma suave e contínua, enchendo o diafragma.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] space-y-1">
            <div className="font-bold text-[#2C2C2C]">2. Segure (7s)</div>
            <p className="text-[#7A766C]">Mantenha os pulmões cheios sem forçar a garganta.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] space-y-1">
            <div className="font-bold text-[#2C2C2C]">3. Expire (8s)</div>
            <p className="text-[#7A766C]">Solte o ar lentamente entre os lábios com um sopro sutil.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
