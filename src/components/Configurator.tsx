import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, Info } from 'lucide-react';
import { ProjectType, ProjectStyle, ProjectFinish, ProjectState } from '../../types';
import { calculatePrice, formatCurrency } from '../data/pricing';
import { generatePDF } from '../utils/pdfGenerator';

// --- Sub-Components defined locally for modularity in one file ---

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  image?: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ 
  label, 
  selected, 
  onClick, 
  image 
}) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 w-full text-left group
      ${selected 
        ? 'border-stone-800 bg-stone-50 shadow-md' 
        : 'border-stone-200 bg-white hover:border-stone-400'
      }`}
  >
    {image && (
      <div className="h-32 w-full overflow-hidden">
        <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
    )}
    <div className="p-4 flex items-center justify-between">
      <span className={`font-medium ${selected ? 'text-stone-900' : 'text-stone-600'}`}>{label}</span>
      {selected && <div className="bg-stone-900 text-white p-1 rounded-full"><Check size={12} /></div>}
    </div>
  </button>
);

const RangeSlider = ({ 
  value, 
  onChange, 
  min, 
  max 
}: { 
  value: number; 
  onChange: (val: number) => void; 
  min: number; 
  max: number 
}) => (
  <div className="w-full py-4">
    <div className="flex justify-between items-center mb-4">
      <span className="text-stone-500 font-medium">Surface du projet</span>
      <span className="text-3xl font-serif text-stone-900">{value} <span className="text-lg text-stone-500 font-sans">m²</span></span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
    />
    <div className="flex justify-between text-xs text-stone-400 mt-2 font-mono">
      <span>{min} m²</span>
      <span>{max} m²</span>
    </div>
  </div>
);

// --- Main Configurator Component ---

const Configurator: React.FC = () => {
  const [project, setProject] = useState<ProjectState>({
    type: ProjectType.MAISON,
    style: ProjectStyle.MODERNE,
    finish: ProjectFinish.STANDARD,
    surface: 120,
  });

  const estimatedPrice = calculatePrice(project);

  const typeImages: Record<ProjectType, string> = {
    [ProjectType.MAISON]: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDI%3D",
    [ProjectType.BUREAU]: "https://images.unsplash.com/photo-1705909770198-7e83c24e1616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW50ZXJpb3IlMjBkZXNpZ24lMjBvZmZpY2V8ZW58MHx8MHx8fDI%3D",
    [ProjectType.IMMEUBLE]: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFyY2hpdGVjdHVyZXxlbnwwfHwwfHx8Mg%3D%3D",
    [ProjectType.RENOVATION]: "https://media.istockphoto.com/id/486565100/photo/female-architect.webp?a=1&b=1&s=612x612&w=0&k=20&c=2YOigh6aE6yZtF09q94yPHjR7UYWD9mqL0JLzG5B3Ok=",
  };

  return (
    <section id="configurator" className="py-24 bg-stone-50 relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-100/50 pointer-events-none hidden lg:block" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 max-w-2xl">
          <span className="text-rose-400 font-bold tracking-widest uppercase text-sm mb-2 block">Estimation</span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Configurez votre projet</h2>
          <p className="text-stone-600 text-lg">
            Utilisez notre outil interactif pour obtenir une première estimation budgétaire de votre futur espace architectural.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Controls Column */}
          <div className="flex-1 space-y-12">
            
            {/* 1. Project Type */}
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">1</span>
                Type de bien
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(ProjectType).map((type) => (
                  <OptionCard
                    key={type}
                    label={type}
                    image={typeImages[type]}
                    selected={project.type === type}
                    onClick={() => setProject({ ...project, type })}
                  />
                ))}
              </div>
            </div>

            {/* 2. Surface */}
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">2</span>
                Surface habitable
              </h3>
              <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                <RangeSlider 
                  value={project.surface} 
                  onChange={(val) => setProject({ ...project, surface: val })}
                  min={20}
                  max={500}
                />
              </div>
            </div>

            {/* 3. Style & Finish */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">3</span>
                  Style
                </h3>
                <div className="space-y-3">
                  {Object.values(ProjectStyle).map((style) => (
                    <OptionCard
                      key={style}
                      label={style}
                      selected={project.style === style}
                      onClick={() => setProject({ ...project, style })}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">4</span>
                  Finition
                </h3>
                <div className="space-y-3">
                  {Object.values(ProjectFinish).map((finish) => (
                    <OptionCard
                      key={finish}
                      label={finish}
                      selected={project.finish === finish}
                      onClick={() => setProject({ ...project, finish })}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Summary Column (Sticky) */}
          <div className="lg:w-[400px] relative">
            <div className="sticky top-24">
              <motion.div 
                layout
                className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-2xl text-stone-900">Résumé</h3>
                  <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                </div>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Projet</span>
                    <span className="font-medium text-stone-800 text-right">{project.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Surface</span>
                    <span className="font-medium text-stone-800">{project.surface} m²</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Style</span>
                    <span className="font-medium text-stone-800">{project.style}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Finition</span>
                    <span className="font-medium text-stone-800">{project.finish}</span>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-xl p-6 mb-6 text-center">
                  <p className="text-stone-500 text-xs uppercase tracking-wider mb-2">Estimation TTC</p>
                  <motion.div 
                    key={estimatedPrice}
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl md:text-4xl font-serif text-stone-900 font-bold"
                  >
                    {formatCurrency(estimatedPrice)}
                  </motion.div>
                </div>

                <button 
                  onClick={() => generatePDF(project)}
                  className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group mb-4"
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  <span>Télécharger le devis PDF</span>
                </button>

                <div className="flex items-start gap-2 text-xs text-stone-400">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Cette estimation est fournie à titre indicatif et ne constitue pas une offre contractuelle.</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Configurator;