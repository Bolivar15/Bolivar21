import { SpecialtyItem, Testimonial, FaqItem } from '../types';

export const CLINIC_INFO = {
  name: "Dra. Débora Costa",
  title: "Psicóloga Clínica & Psicoterapeuta",
  crp: "CRP 03/24682",
  bio: "Especialista em Terapia Cognitivo-Comportamental (TCC). Com ampla experiência clínica, meu trabalho é fundamentado na escuta ética, acolhedora e personalizada, auxiliando cada paciente na busca pelo autoconhecimento, superação da ansiedade e equilíbrio emocional através do atendimento online.",
  experienceYears: "8+",
  sessionsCount: "+2.500",
  address: "Atendimento 100% Online (Brasil e Exterior)",
  phone: "(77) 98117-4262",
  whatsappNumber: "5577981174262",
  email: "deborasilvacosta2021@gmail.com",
  instagram: "@deborapsi_costa",
  instagramUrl: "https://www.instagram.com/deborapsi_costa",
  emergencyNotice: "Em caso de crise grave imediata ou urgência emocional, ligue para o CVV (188) ou procure o pronto atendimento mais próximo (SAMU 192 / UPA)."
};

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'ansiedade',
    title: 'Ansiedade e Síndrome do Pânico',
    shortDesc: 'Tratamento especializado para desacelerar pensamentos obsessivos, sintomas físicos de pânico e inquietação.',
    fullDesc: 'A ansiedade excessiva pode travar a rotina, gerar sintomas físicos (taquicardia, falta de ar, aperto no peito) e constante medo do futuro. Através da TCC e de técnicas de reestruturação cognitiva e respiração, identificamos os gatilhos e devolvemos o controle da sua vida.',
    iconName: 'Activity',
    symptoms: ['Taquicardia e aperto no peito', 'Pensamentos acelerados e catastróficos', 'Dificuldade para dormir e relaxar', 'Medo constante de perder o controle'],
    benefits: ['Raciocínio mais claro e calmo', 'Desenvolvimento de ferramentas antiansiedade', 'Retomada de atividades sociais e profissionais com segurança']
  },
  {
    id: 'depressao',
    title: 'Depressão e Transtornos do Humor',
    shortDesc: 'Acolhimento para momentos de desânimo profundo, perda de prazer, cansaço extremo e sensação de vazio.',
    fullDesc: 'A depressão afeta a energia física, a autopercepção e a esperança no amanhã. Na psicoterapia, criamos um ambiente seguro para ressignificar dores do passado, reativar gradualmente atividades prazerosas e reconstruir o sentido da vida.',
    iconName: 'Sun',
    symptoms: ['Sensação constante de cansaço ou vazio', 'Perda do interesse em hobbys e relacionamentos', 'Alterações no sono e no apetite', 'Autocrítica excessiva e sentimento de culpa'],
    benefits: ['Resgate da vitalidade e motivação', 'Ressignificação de dores emocionais', 'Construção de uma rede de autocuidado sustentável']
  },
  {
    id: 'autoestima',
    title: 'Autoestima e Autoconhecimento',
    shortDesc: 'Fortalecimento da autoconfiança, superação da síndrome da impostora e aceitação pessoal.',
    fullDesc: 'Uma autoestima fragilizada leva à busca incessante por aprovação externa e ao medo de errar. A terapia ajuda a reconhecer seus próprios valores, estabelecer limites saudáveis e desenvolver uma relação de amor e respeito consigo.',
    iconName: 'Heart',
    symptoms: ['Comparação constante com outras pessoas', 'Medo excessivo da rejeição ou julgamento', 'Dificuldade para dizer "não"', 'Sensação contínua de não ser bom o suficiente'],
    benefits: ['Maior clareza sobre suas qualidades e limites', 'Comunicação assertiva nas relações', 'Liberdade emocional para tomar decisões autênticas']
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos e Conflitos Familiares',
    shortDesc: 'Mediação emocional de vínculos amorosos, dependência emocional e dinâmicas familiares complexas.',
    fullDesc: 'Relações afetivas e familiares são fontes profundas de aprendizado, mas também de mágoas e ruídos de comunicação. Trabalhamos para identificar padrões repetitivos, curar feridas emocionais e construir vínculos mais saudáveis e transparentes.',
    iconName: 'Users',
    symptoms: ['Brigas frequentes e desgaste na comunicação', 'Sensação de dependência ou ciúmes excessivo', 'Dificuldade de impor limites e manter a individualidade', 'Luto por términos ou rupturas dolorosas'],
    benefits: ['Diálogos mais maduros e sem acusações', 'Autonomia emocional e autoproteção', 'Relacionamentos baseados no respeito mútuo']
  },
  {
    id: 'burnout',
    title: 'Estresse Ocupacional e Burnout',
    shortDesc: 'Acompanhamento para exaustão no trabalho, sobrecarga mental e transição de carreira.',
    fullDesc: 'O ambiente corporativo acelerado pode levar ao esgotamento físico e mental extremo. A psicoterapia oferece suporte para reorganizar prioridades, tratar a ansiedade de desempenho e estabelecer um equilíbrio saudável entre vida pessoal e profissional.',
    iconName: 'Briefcase',
    symptoms: ['Exaustão física e mental ao acordar', 'Irritabilidade constante e apatia no trabalho', 'Sensação de ineficiência e sobrecarga contínua', 'Dores de cabeça tensionais e insônia'],
    benefits: ['Prevenção e tratamento da Síndrome de Burnout', 'Estratégias de gestão do tempo e estresse', 'Alinhamento da carreira com valores pessoais']
  },
  {
    id: 'luto',
    title: 'Luto e Transições de Vida',
    shortDesc: 'Suporte no processo de perda, mudança de cidade/emprego e novas fases da vida.',
    fullDesc: 'Lidar com rupturas, mortes de entes queridos, divórcios ou grandes mudanças exige tempo e acolhimento. A terapia oferece um refúgio para vivenciar a dor no seu próprio ritmo, sem julgamentos, encontrando novas perspectivas.',
    iconName: 'Compass',
    symptoms: ['Sensação de desorientação e choque', 'Tristeza profunda e choro frequente', 'Dificuldade de aceitar o novo cenário de vida', 'Isolamento social e medo do futuro'],
    benefits: ['Elaboração saudável do luto', 'Integração de memórias sem dor paralisante', 'Força interna para recomeçar com serenidade']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Mariana S.',
    age: 32,
    modality: 'Atendimento Online',
    text: 'Iniciei a terapia online com a Dra. Débora num momento de forte crise de ansiedade e insônia. Sua escuta calma e objetiva me ajudou imensamente, tudo no conforto da minha casa.',
    rating: 5
  },
  {
    id: '2',
    author: 'Rodrigo M.',
    age: 41,
    modality: 'Atendimento Online',
    text: 'Profissional extremamente ética, pontual e acolhedora. A TCC em formato online me deu ferramentas práticas para lidar com o estresse do trabalho. Recomendo de olhos fechados!',
    rating: 5
  },
  {
    id: '3',
    author: 'Camila P.',
    age: 28,
    modality: 'Atendimento Online',
    text: 'Fazer psicoterapia online com a Dra. Débora fez toda a diferença para minha saúde mental. A praticidade da sessão por vídeo com total sigilo me trouxe muita segurança e praticidade.',
    rating: 5
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'primeira-sessao',
    question: 'Como funciona a primeira sessão de psicoterapia?',
    answer: 'A primeira sessão é um momento de acolhimento e escuta inicial por videoconferência. Conheceremos os motivos que o trouxeram à terapia, seus objetivos e histórico. É também uma oportunidade para tirar todas as suas dúvidas sobre o formato de trabalho e sentir como se conecta com a profissional.'
  },
  {
    id: 'faq-2',
    category: 'online',
    question: 'Como funciona o atendimento de psicoterapia 100% online?',
    answer: 'As sessões ocorrem via videochamada individual e segura (Google Meet / Zoom). É realizada com total sigilo, comodidade e flexibilidade para você realizar de onde estiver no Brasil ou exterior.'
  },
  {
    id: 'faq-4',
    category: 'abordagem',
    question: 'O que é a Terapia Cognitivo-Comportamental (TCC)?',
    answer: 'A TCC (Terapia Cognitivo-Comportamental) é uma abordagem científica e estruturada focada na relação entre pensamentos, emoções e comportamentos. Trabalhamos com técnicas práticas para identificar distorções cognitivas e desenvolver ferramentas de enfrentamento para que o paciente conquiste maior autonomia e bem-estar emocional.'
  },
  {
    id: 'faq-5',
    category: 'primeira-sessao',
    question: 'Qual é a duração e frequência das sessões?',
    answer: 'Cada sessão individual tem a duração média de 50 minutos. A frequência recomendada para o início do tratamento costuma ser semanal, podendo ser espaçada conforme a evolução e ganho de autonomia do paciente.'
  }
];
