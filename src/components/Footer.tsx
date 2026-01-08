import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-400 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Brand */}
          <div className="space-y-6 max-w-xs">
             <a href="#" className="flex items-center gap-2 group">
              <div className="w-6 h-6 border border-stone-500 rounded-sm flex items-center justify-center rotate-45">
                <div className="w-3 h-3 bg-stone-500 rounded-full" />
              </div>
              <span className="font-serif text-xl tracking-widest font-bold text-stone-200">
                ATELYA
              </span>
            </a>
            <p className="text-sm leading-relaxed">
              Créateurs d'espaces intemporels. Nous allions esthétique et fonction pour façonner des lieux de vie qui inspirent.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12 md:gap-24 text-sm">
            <div>
              <h4 className="text-stone-200 font-medium mb-4">Bureau</h4>
              <p>15 Avenue des Champs</p>
              <p>75008 Paris, France</p>
              <p className="mt-4">+33 1 23 45 67 89</p>
              <p>contact@atelya-arch.com</p>
            </div>
            <div>
              <h4 className="text-stone-200 font-medium mb-4">Menu</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#configurator" className="hover:text-white transition-colors">Estimation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">&copy; {new Date().getFullYear()} Atelya Architecture. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;