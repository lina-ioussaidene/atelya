import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Configurator from './components/Configurator';
import Footer from './components/Footer';
import { Phone } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-rose-200 selection:text-stone-900">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About Section Teaser */}
        <section id="about" className="py-24 px-6 container mx-auto text-center max-w-3xl">
          <p className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase mb-4">Notre Philosophie</p>
          <h3 className="font-serif text-3xl md:text-4xl text-stone-800 leading-snug">
            "L'architecture n'est pas seulement une question de murs et de toits, mais de la manière dont la lumière et l'espace influencent nos vies."
          </h3>
        </section>

        <Services />
        <Configurator />
        
        {/* Call To Action Strip */}
        <section className="bg-white py-20 border-t border-stone-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Prêt à concrétiser votre vision ?</h2>
            <p className="text-stone-500 mb-8 max-w-xl mx-auto">
              Discutons de votre projet lors d'un premier rendez-vous gratuit.
            </p>
            <a 
              href="tel:+33123456789"
              className="inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-all hover:scale-105"
            >
              <Phone size={20} />
              <span>Appeler pour un rendez-vous</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;