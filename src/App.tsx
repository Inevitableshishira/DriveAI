import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Models } from './components/Models';
import { Features } from './components/Features';
import { Comparison } from './components/Comparison';
import { Pricing } from './components/Pricing';
import { Booking } from './components/Booking';
import { Contact, Footer } from './components/Contact';
import { AIAssistant } from './components/AIAssistant';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [highlightedCar, setHighlightedCar] = useState<string | null>(null);
  const [recommendedCar, setRecommendedCar] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [carFilter, setCarFilter] = useState<{ type?: string; maxPrice?: number }>({});
  const [compareCars, setCompareCars] = useState<string[]>([]);
  const [prefillForm, setPrefillForm] = useState<{ model?: string; city?: string; date?: string }>({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'models', 'features', 'comparison', 'pricing', 'booking', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigate = (section: string) => {
    scrollToSection(section);
  };

  const handleFilterCars = (filter: { type?: string; maxPrice?: number }) => {
    setCarFilter(filter);
    setHighlightedCar(null);
    setRecommendedCar(null);
  };

  const handleCompareCars = (carIds: string[]) => {
    setCompareCars(carIds);
  };

  const handlePrefillForm = (data: { model?: string; city?: string; date?: string }) => {
    setPrefillForm(data);
  };

  const handleChangeCurrency = (newCurrency: 'INR' | 'USD') => {
    setCurrency(newCurrency);
  };

  const handleHighlightCar = (carId: string | null) => {
    setHighlightedCar(carId);
    setRecommendedCar(null);
    setCarFilter({});
  };

  const handleRecommendCar = (carId: string | null) => {
    setRecommendedCar(carId);
    setHighlightedCar(null);
    setCarFilter({});
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation activeSection={activeSection} />
      
      <Hero onExplore={() => scrollToSection('models')} />
      <Models 
        highlightedCar={highlightedCar}
        recommendedCar={recommendedCar}
        currency={currency}
        filter={carFilter}
      />
      <Features />
      <Comparison compareCars={compareCars} currency={currency} />
      <Pricing currency={currency} onCurrencyChange={handleChangeCurrency} />
      <Booking prefillData={prefillForm} />
      <Contact />
      <Footer />

      <AIAssistant
        onNavigate={handleNavigate}
        onFilterCars={handleFilterCars}
        onCompareCars={handleCompareCars}
        onPrefillForm={handlePrefillForm}
        onChangeCurrency={handleChangeCurrency}
        onHighlightCar={handleHighlightCar}
        onRecommendCar={handleRecommendCar}
      />
    </div>
  );
}

export default App;
