import React, { useState, useEffect } from 'react';
import { CLINIC_INFO, SPECIALTIES } from '../data/clinicData';
import { AppointmentBooking } from '../types';
import { Calendar, Clock, Video, User, Phone, Mail, CheckCircle2, Download, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';

interface BookingSectionProps {
  initialSpecialty?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ initialSpecialty }) => {
  const [step, setStep] = useState<number>(1);
  const modality = 'online' as const;
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(initialSpecialty || 'Ansiedade e Síndrome do Pânico');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [myBookings, setMyBookings] = useState<AppointmentBooking[]>([]);

  useEffect(() => {
    // Load existing bookings from local storage
    const saved = localStorage.getItem('debora_costa_bookings') || localStorage.getItem('debora_costa_pwa_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar agendamentos:", e);
      }
    }

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Por favor, informe seu nome e telefone/WhatsApp.');
      return;
    }

    const newBooking: AppointmentBooking = {
      id: `book-${Date.now()}`,
      patientName,
      patientEmail,
      patientPhone,
      modality,
      specialty: selectedSpecialty,
      date: selectedDate,
      timeSlot: selectedTimeSlot || '14:00',
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('debora_costa_bookings', JSON.stringify(updated));

    setConfirmedBooking(newBooking);
    setStep(3); // Success step
  };

  // Generate .ics calendar invite
  const downloadIcsFile = (booking: AppointmentBooking) => {
    const dateFormatted = booking.date.replace(/-/g, '');
    const startTimeStr = booking.timeSlot.replace(':', '');
    const endHour = parseInt(booking.timeSlot.split(':')[0]) + 1;
    const endTimeStr = `${endHour < 10 ? '0' + endHour : endHour}${booking.timeSlot.split(':')[1]}`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Psicologa Debora Costa//PT
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
SUMMARY:Sessão de Psicoterapia Online - Dra. Débora Costa
DESCRIPTION:Consulta de Psicoterapia 100% Online com Dra. Débora Costa (${CLINIC_INFO.crp}).\\nEspecialidade: ${booking.specialty}
LOCATION:Link de Videoconferência Segura (Google Meet / Zoom)
DTSTART:${dateFormatted}T${startTimeStr}00
DTEND:${dateFormatted}T${endTimeStr}00
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sessao-Psi-DeboraCosta-${booking.date}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getWhatsAppMessage = (booking: AppointmentBooking) => {
    const text = `Olá Dra. Débora Costa, realizei meu agendamento de consulta online:
• Nome: ${booking.patientName}
• Modalidade: Atendimento 100% Online (Videoconferência)
• Demanda: ${booking.specialty}
• Data: ${booking.date.split('-').reverse().join('/')} às ${booking.timeSlot}
• Telefone: ${booking.patientPhone}
${booking.notes ? `• Observações: ${booking.notes}` : ''}

Gostaria de confirmar o agendamento!`;

    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8] border-b border-[#E8E4D9]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E8E4D9] text-[#5A6750] text-xs font-black uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-[#5A6750]" />
            <span>Agendamento de Consulta</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#2C2C2C]">
            Agende Sua <span className="italic text-[#5A6750] font-normal">Consulta Online</span>
          </h2>
          <p className="text-[#6A675E] text-sm max-w-xl mx-auto">
            Selecione a especialidade desejada, o melhor dia e horário para o atendimento online por vídeo e receba a confirmação.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-[#F5F2EA] rounded-[36px] p-6 sm:p-8 border border-[#E8E4D9] shadow-inner space-y-6">
          
          {/* Progress Indicators */}
          {step < 3 && (
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E8E4D9] text-xs font-semibold text-[#7A766C]">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#5A6750] font-bold' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#5A6750] text-white' : 'bg-[#E8E4D9] text-[#7A766C]'}`}>1</span>
                <span>Especialidade e Data</span>
              </div>
              <div className="w-8 h-px bg-[#E8E4D9]" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#5A6750] font-bold' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#5A6750] text-white' : 'bg-[#E8E4D9] text-[#7A766C]'}`}>2</span>
                <span>Seus Dados</span>
              </div>
            </div>
          )}

          {/* STEP 1: Specialty, Date & Time */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif font-bold text-lg text-[#2C2C2C]">
                1. Selecione a Especialidade e Horário:
              </h3>

              <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9] flex items-center gap-3">
                <Video className="w-5 h-5 text-[#5A6750] shrink-0" />
                <div className="text-xs text-[#3A3A3A]">
                  <span className="font-bold block text-[#2C2C2C]">Atendimento 100% Online</span>
                  <span>Videoconferência individual e segura (Google Meet / Zoom)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider">
                  Qual sua principal motivação ou área de busca?
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-sm focus:outline-hidden focus:border-[#5A6750] font-medium"
                >
                  {SPECIALTIES.map((spec) => (
                    <option key={spec.id} value={spec.title}>
                      {spec.title}
                    </option>
                  ))}
                  <option value="Primeira Consulta / Avaliação Geral">Primeira Consulta / Avaliação Geral</option>
                  <option value="Outras Demandas">Outras Demandas</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Data da Consulta:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-sm focus:outline-hidden focus:border-[#5A6750] font-medium"
                  />
                  <p className="text-[11px] text-[#7A766C]">Atendimentos de Segunda a Sexta-feira.</p>
                </div>

                {/* Time Slots */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Horários Disponíveis (Duração 50 min):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'border-[#5A6750] bg-[#5A6750] text-white shadow-xs'
                            : 'border-[#E8E4D9] hover:border-[#A3B18A] bg-white text-[#3A3A3A]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <button
                onClick={() => {
                  if (!selectedTimeSlot) {
                    setSelectedTimeSlot('14:00');
                  }
                  setStep(2);
                }}
                className="w-full py-4 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md shadow-[#5A6750]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Avançar para Seus Dados</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Patient Information Form */}
          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#2C2C2C]">
                  2. Informe Seus Dados para Contato:
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#5A6750] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 bg-white border border-[#E8E4D9] rounded-2xl text-xs text-[#3A3A3A] space-y-1">
                <div className="font-bold text-[#5A6750] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#5A6750]" />
                  <span>Resumo do Agendamento Online:</span>
                </div>
                <p>
                  <strong>Atendimento:</strong> 100% Online por Vídeo | <strong>Área:</strong> {selectedSpecialty}
                </p>
                <p>
                  <strong>Data:</strong> {selectedDate.split('-').reverse().join('/')} às {selectedTimeSlot || '14:00'}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C2C2C] mb-1">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7A766C] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Seu nome e sobrenome"
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-sm focus:outline-hidden focus:border-[#5A6750]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2C2C2C] mb-1">
                      WhatsApp / Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#7A766C] absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="(41) 99999-9999"
                        className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-sm focus:outline-hidden focus:border-[#5A6750]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C2C2C] mb-1">
                      E-mail (opcional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#7A766C] absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-sm focus:outline-hidden focus:border-[#5A6750]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C2C2C] mb-1">
                    Mensagem ou Observações (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Conte um pouco sobre o que tem vivido ou o motivo da sua busca..."
                    className="w-full p-3.5 rounded-2xl border border-[#E8E4D9] bg-white text-[#2C2C2C] text-sm focus:outline-hidden focus:border-[#5A6750] resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md shadow-[#5A6750]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirmar Agendamento</span>
              </button>
            </form>
          )}

          {/* STEP 3: Success & Confirmation */}
          {step === 3 && confirmedBooking && (
            <div className="text-center space-y-6 animate-fade-in py-4">
              
              <div className="w-16 h-16 bg-[#A3B18A]/20 text-[#5A6750] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#A3B18A]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-2xl text-[#2C2C2C]">
                  Agendamento Concluído com Sucesso!
                </h3>
                <p className="text-xs text-[#6A675E] max-w-md mx-auto">
                  Sua solicitação foi gravada. Para garantir seu horário imediatamente, envie a mensagem de confirmação para a Dra. Débora no WhatsApp abaixo.
                </p>
              </div>

              {/* Confirmation details card */}
              <div className="p-6 bg-white border border-[#E8E4D9] rounded-3xl text-left max-w-md mx-auto text-xs space-y-2 shadow-xs">
                <div className="font-bold text-sm text-[#2C2C2C] pb-2 border-b border-[#E8E4D9] flex justify-between">
                  <span>Sessão com Dra. Débora Costa</span>
                  <span className="text-[#5A6750] font-bold">Confirmada</span>
                </div>
                <p><strong>Paciente:</strong> {confirmedBooking.patientName}</p>
                <p><strong>Modalidade:</strong> Atendimento 100% Online (Videoconferência)</p>
                <p><strong>Especialidade:</strong> {confirmedBooking.specialty}</p>
                <p><strong>Data & Horário:</strong> {confirmedBooking.date.split('-').reverse().join('/')} às {confirmedBooking.timeSlot}</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <a
                  href={getWhatsAppMessage(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 bg-[#5A6750] hover:bg-[#47533E] text-white rounded-full text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar no WhatsApp</span>
                </a>

                <button
                  onClick={() => downloadIcsFile(confirmedBooking)}
                  className="px-5 py-3.5 bg-white hover:bg-[#F2EFE9] border border-[#E8E4D9] text-[#3A3A3A] rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#5A6750]" />
                  <span>Baixar Calendário (.ics)</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setConfirmedBooking(null);
                  }}
                  className="text-xs font-bold text-[#5A6750] hover:underline cursor-pointer"
                >
                  Realizar outro agendamento
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Existing Bookings List in Local Storage */}
        {myBookings.length > 0 && (
          <div className="bg-[#F5F2EA] rounded-[36px] p-6 border border-[#E8E4D9] space-y-4">
            <h3 className="font-serif font-bold text-base text-[#2C2C2C] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5A6750]" />
              <span>Meus Agendamentos Salvos ({myBookings.length})</span>
            </h3>
            
            <div className="space-y-3">
              {myBookings.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl bg-white border border-[#E8E4D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#2C2C2C] text-sm">{b.specialty}</div>
                    <div className="text-[#7A766C]">
                      {b.date.split('-').reverse().join('/')} às {b.timeSlot} • Online
                    </div>
                  </div>
                  
                  <a
                    href={getWhatsAppMessage(b)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#F2EFE9] hover:bg-[#E8E4D9] border border-[#E8E4D9] text-[#5A6750] rounded-full font-bold flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Confirmar no WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
