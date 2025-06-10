import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';

function App() {
  const { language, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  // Set document direction and language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update page title
    const titles = {
      ar: 'بيداكونيكت - منصة إدارة المدارس الشاملة',
      en: 'PedaConnect - Comprehensive School Management Platform',
      fr: 'PedaConnect - Plateforme de Gestion Scolaire Complète'
    };
    document.title = titles[language];
  }, [language, isRTL]);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;