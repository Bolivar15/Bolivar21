export type NavigationTab = 
  | 'home'
  | 'about'
  | 'specialties'
  | 'booking'
  | 'mood'
  | 'breathing'
  | 'faq';

export interface AppointmentBooking {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  modality: 'online';
  specialty: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  score: number; // 1 to 5
  anxietyLevel: number; // 1 to 10 (Ansiedade)
  anguishLevel?: number; // 1 to 10 (Angústia)
  happinessLevel?: number; // 1 to 10 (Felicidade/Bem-Estar)
  primaryEmotion: string;
  notes: string;
  gratitude: string;
}

export interface SessionReport {
  id: string;
  patientName: string;
  date: string;
  emotions: string[];
  anxietyLevel: number; // 0 to 10 (Termômetro de Ansiedade)
  anguishLevel: number; // 0 to 10 (Termômetro de Angústia)
  happinessLevel: number; // 0 to 10 (Termômetro de Felicidade)
  topicsToDiscuss: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface SpecialtyItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  symptoms: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  age?: number;
  modality: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'primeira-sessao' | 'online' | 'abordagem';
}
