import React, { useState, useEffect, useRef } from 'react';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, icon, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`card-glow bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50 transform group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:-rotate-1 ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 -rotate-3'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-black font-orbitron font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
          {step}
        </div>
        <div className="ml-4 text-amber-500 group-hover:glow-gold transition-all duration-300">
          {icon}
        </div>
      </div>
      <h3 className="font-orbitron text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 font-montserrat">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    { step: '01', title: 'Inscription Simple', description: 'Choisissez entre 1 à 3 packages sans aucun paiement requis. Votre engagement est gratuit.', icon: <ClipboardListIcon /> },
    { step: '02', title: 'Parcours Éducatif', description: 'Recevez une série d’emails clairs et concis vous expliquant chaque détail du processus.', icon: <MailIcon /> },
    { step: '03', title: 'Seuil d’Activation', description: 'Le service démarre automatiquement dès que le nombre critique d’inscriptions est atteint.', icon: <UsersIcon /> },
    { step: '04', title: 'Accès au Service', description: 'Une webapp dédiée s’ouvre pour gérer vos requêtes et suivre l’avancement de votre véhicule.', icon: <AppWindowIcon /> },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 snap-start">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Comment <span className="text-amber-500 glow-gold">ça marche</span> ?
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Un processus en 4 étapes, conçu pour être simple, transparent et sécurisé.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <StepCard key={i} step={s.step} title={s.title} description={s.description} icon={s.icon} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};


// SVG Icons
const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const AppWindowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default HowItWorks;