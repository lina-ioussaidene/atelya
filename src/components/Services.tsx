import React from 'react';
import { Layers, Home, Ruler, PenTool } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Architecture Résidentielle",
      description: "Conception de villas et maisons individuelles sur mesure, intégrant les dernières normes écologiques."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Design d'Intérieur",
      description: "Harmonisation des espaces, choix des matériaux nobles et création d'ambiances uniques."
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "Rénovation & Extension",
      description: "Transformation de l'existant pour révéler le potentiel caché de vos biens immobiliers."
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Étude de Faisabilité",
      description: "Analyse technique et urbanistique pour sécuriser vos investissements avant construction."
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Nos expertises</h2>
            <div className="w-20 h-1 bg-rose-200 mb-6 rounded-full" />
            <p className="text-stone-500 text-lg">
              De l'esquisse à la remise des clés, nous vous accompagnons à chaque étape pour donner vie à votre vision.
            </p>
          </div>
          <a href="#contact" className="hidden md:block text-stone-900 font-medium border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
            Voir tous les services
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 border border-stone-100 bg-stone-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-stone-800 shadow-sm mb-6 group-hover:bg-rose-50 group-hover:text-rose-400 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-3">{service.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;