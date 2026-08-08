import React, { useState, useEffect } from 'react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { BookingSection } from './components/BookingSection';
import { MoodTracker } from './components/MoodTracker';
import { BreathingExercise } from './components/BreathingExercise';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { OfflineBanner } from './components/OfflineBanner';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedSpecialtyForBooking, setSelectedSpecialtyForBooking] = useState<string>('Ansiedade e Síndrome do Pânico');
  
  // Connectivity state
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    // 1. Register Service Worker for offline capability
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('ServiceWorker registrado no escopo:', reg.scope);
          })
          .catch((err) => {
            console.error('Erro ao registrar ServiceWorker:', err);
          });
      });
    }

    // 2. Online/Offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 3. Handle URL tab parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab') as NavigationTab;
    if (tabParam) {
      setActiveTab(tabParam);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSelectSpecialtyForBooking = (specialtyTitle: string) => {
    setSelectedSpecialtyForBooking(specialtyTitle);
    setActiveTab('booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Offline Connectivity Status Bar */}
      <OfflineBanner isOnline={isOnline} />

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOnline={isOnline}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              setActiveTab={setActiveTab}
            />
            <AboutSection setActiveTab={setActiveTab} />
            <SpecialtiesSection
              setActiveTab={setActiveTab}
              onSelectSpecialtyForBooking={handleSelectSpecialtyForBooking}
            />
            <TestimonialsSection />
            <FaqSection />
          </>
        )}

        {activeTab === 'about' && (
          <>
            <AboutSection setActiveTab={setActiveTab} />
            <TestimonialsSection />
          </>
        )}

        {activeTab === 'specialties' && (
          <SpecialtiesSection
            setActiveTab={setActiveTab}
            onSelectSpecialtyForBooking={handleSelectSpecialtyForBooking}
          />
        )}

        {activeTab === 'booking' && (
          <BookingSection initialSpecialty={selectedSpecialtyForBooking} />
        )}

        {activeTab === 'mood' && <MoodTracker />}

        {activeTab === 'breathing' && <BreathingExercise />}

        {activeTab === 'faq' && <FaqSection />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
